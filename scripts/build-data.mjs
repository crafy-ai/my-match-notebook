import { writeFile } from "node:fs/promises";

const MATCHTIMES_URL = "https://matchtimes.app/schedule";

function hydrateNuxtData(html) {
  const match = html.match(/<script[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error("Could not find __NUXT_DATA__ in MatchTimes page");
  }

  const table = JSON.parse(match[1]);
  const seen = new Map();

  function fromIndex(index) {
    return hydrateValue(table[index]);
  }

  function hydrateValue(value) {
    if (value === null || typeof value !== "object") return value;
    if (seen.has(value)) return seen.get(value);

    if (Array.isArray(value)) {
      if (value[0] === "ShallowReactive" || value[0] === "Reactive") {
        return fromIndex(value[1]);
      }

      const output = [];
      seen.set(value, output);
      for (const item of value) {
        output.push(typeof item === "number" ? fromIndex(item) : hydrateValue(item));
      }
      return output;
    }

    const output = {};
    seen.set(value, output);
    for (const [key, item] of Object.entries(value)) {
      output[key] = typeof item === "number" ? fromIndex(item) : hydrateValue(item);
    }
    return output;
  }

  return fromIndex(0);
}

function toWorldCupEvent(match) {
  const home = match.homeTeam?.name || match.homeLabel || "TBD";
  const away = match.awayTeam?.name || match.awayLabel || "TBD";
  const id = `wc-${String(match.matchNumber).padStart(3, "0")}`;

  return {
    id,
    tournament: "worldcup",
    title: `${home} vs ${away}`,
    matchNo: match.matchNumber,
    stage: match.stage?.name || "World Cup",
    group: match.groupId || "",
    home,
    away,
    utc: match.kickoffUtc,
    venue: match.venue?.name || "",
    city: match.venue?.city || "",
    country: match.venue?.country || "",
    status: home.includes("Match ") || away.includes("Match ") ? "待定晋级路径" : "已公布",
    source: "MatchTimes / FIFA schedule",
  };
}

const cs2Events = [
  ["2026-06-02T10:30:00.000Z", "Stage 1 Round 1", "M80", "Lynn Vision", "Opening best-of-one"],
  ["2026-06-02T10:30:00.000Z", "Stage 1 Round 1", "SINNERS", "FlyQuest", "Opening best-of-one"],
  ["2026-06-02T11:30:00.000Z", "Stage 1 Round 1", "B8", "TYLOO", "Opening best-of-one"],
  ["2026-06-02T11:30:00.000Z", "Stage 1 Round 1", "MIBR", "THUNDER dOWNUNDER", "Opening best-of-one"],
  ["2026-06-02T12:30:00.000Z", "Stage 1 Round 1", "GamerLegion", "NRG", "Opening best-of-one"],
  ["2026-06-02T12:30:00.000Z", "Stage 1 Round 1", "HEROIC", "Sharks", "Opening best-of-one"],
  ["2026-06-02T13:30:00.000Z", "Stage 1 Round 1", "BetBoom", "Gaimin Gladiators", "Opening best-of-one"],
  ["2026-06-02T13:30:00.000Z", "Stage 1 Round 1", "BIG", "Liquid", "Opening best-of-one"],
  ["2026-06-02T15:30:00.000Z", "Stage 1 Round 2", "TBD 1-0 / 0-1", "TBD 1-0 / 0-1", "Swiss pairings after Round 1"],
  ["2026-06-02T16:30:00.000Z", "Stage 1 Round 2", "TBD 1-0 / 0-1", "TBD 1-0 / 0-1", "Swiss pairings after Round 1"],
  ["2026-06-02T17:30:00.000Z", "Stage 1 Round 2", "TBD 1-0 / 0-1", "TBD 1-0 / 0-1", "Swiss pairings after Round 1"],
  ["2026-06-02T18:30:00.000Z", "Stage 1 Round 2", "TBD 1-0 / 0-1", "TBD 1-0 / 0-1", "Swiss pairings after Round 1"],
  ["2026-06-03T12:30:00.000Z", "Stage 1 Round 3", "TBD 1-1", "TBD 1-1", "Swiss middle bracket"],
  ["2026-06-03T13:30:00.000Z", "Stage 1 Round 3", "TBD 1-1", "TBD 1-1", "Swiss middle bracket"],
  ["2026-06-03T14:30:00.000Z", "Stage 1 Round 3", "TBD 1-1", "TBD 1-1", "Swiss middle bracket"],
  ["2026-06-03T17:00:00.000Z", "Stage 1 Round 3", "TBD 2-0", "TBD 2-0", "Qualification match"],
  ["2026-06-03T17:00:00.000Z", "Stage 1 Round 3", "TBD 0-2", "TBD 0-2", "Elimination match"],
  ["2026-06-04T12:00:00.000Z", "Stage 1 Round 4", "TBD 2-1", "TBD 2-1", "Qualification match 1/2"],
  ["2026-06-04T14:30:00.000Z", "Stage 1 Round 4", "TBD 2-1", "TBD 2-1", "Qualification match 3"],
  ["2026-06-04T14:30:00.000Z", "Stage 1 Round 4", "TBD 1-2", "TBD 1-2", "Elimination match 1"],
  ["2026-06-04T17:00:00.000Z", "Stage 1 Round 4", "TBD 1-2", "TBD 1-2", "Elimination match 2/3"],
  ["2026-06-05T12:00:00.000Z", "Stage 1 Round 5", "TBD 2-2", "TBD 2-2", "Decider match 1"],
  ["2026-06-05T14:30:00.000Z", "Stage 1 Round 5", "TBD 2-2", "TBD 2-2", "Decider match 2"],
  ["2026-06-05T17:00:00.000Z", "Stage 1 Round 5", "TBD 2-2", "TBD 2-2", "Decider match 3"],
  ["2026-06-06T10:30:00.000Z", "Stage 2 Round 1", "Spirit", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T10:30:00.000Z", "Stage 2 Round 1", "Astralis", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T11:30:00.000Z", "Stage 2 Round 1", "G2", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T11:30:00.000Z", "Stage 2 Round 1", "FUT", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T12:30:00.000Z", "Stage 2 Round 1", "Legacy", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T12:30:00.000Z", "Stage 2 Round 1", "9z", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T13:30:00.000Z", "Stage 2 Round 1", "paiN", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T13:30:00.000Z", "Stage 2 Round 1", "Monte", "TBD Stage 1 qualifier", "Opening best-of-one"],
  ["2026-06-06T15:30:00.000Z", "Stage 2 Round 2", "TBD 1-0", "TBD 1-0", "Swiss high bracket"],
  ["2026-06-06T17:30:00.000Z", "Stage 2 Round 2", "TBD 0-1", "TBD 0-1", "Swiss low bracket"],
  ["2026-06-07T12:30:00.000Z", "Stage 2 Round 3", "TBD 1-1", "TBD 1-1", "Swiss middle bracket"],
  ["2026-06-07T14:30:00.000Z", "Stage 2 Round 3", "TBD 2-0", "TBD 2-0", "Qualification match"],
  ["2026-06-07T17:00:00.000Z", "Stage 2 Round 3", "TBD 0-2", "TBD 0-2", "Elimination match"],
  ["2026-06-08T12:00:00.000Z", "Stage 2 Round 4", "TBD 2-1", "TBD 2-1", "Qualification match"],
  ["2026-06-08T14:30:00.000Z", "Stage 2 Round 4", "TBD 1-2", "TBD 1-2", "Elimination match"],
  ["2026-06-09T12:00:00.000Z", "Stage 2 Round 5", "TBD 2-2", "TBD 2-2", "Decider matches"],
  ["2026-06-11T09:00:00.000Z", "Stage 3 Round 1", "Vitality", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T09:00:00.000Z", "Stage 3 Round 1", "Falcons", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T11:30:00.000Z", "Stage 3 Round 1", "NAVI", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T11:30:00.000Z", "Stage 3 Round 1", "FURIA", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T14:00:00.000Z", "Stage 3 Round 1", "Aurora", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T14:00:00.000Z", "Stage 3 Round 1", "PARIVISION", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T16:30:00.000Z", "Stage 3 Round 1", "The MongolZ", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-11T16:30:00.000Z", "Stage 3 Round 1", "MOUZ", "TBD Stage 2 qualifier", "Opening best-of-one"],
  ["2026-06-12T09:00:00.000Z", "Stage 3 Round 2", "TBD 1-0", "TBD 1-0", "Swiss high bracket"],
  ["2026-06-12T14:00:00.000Z", "Stage 3 Round 2", "TBD 0-1", "TBD 0-1", "Swiss low bracket"],
  ["2026-06-13T09:00:00.000Z", "Stage 3 Round 3", "TBD 1-1", "TBD 1-1", "Swiss middle bracket"],
  ["2026-06-13T14:00:00.000Z", "Stage 3 Round 3", "TBD 2-0", "TBD 2-0", "Qualification match"],
  ["2026-06-13T16:30:00.000Z", "Stage 3 Round 3", "TBD 0-2", "TBD 0-2", "Elimination match"],
  ["2026-06-14T12:00:00.000Z", "Stage 3 Round 4", "TBD 2-1", "TBD 2-1", "Qualification match"],
  ["2026-06-14T14:30:00.000Z", "Stage 3 Round 4", "TBD 1-2", "TBD 1-2", "Elimination match"],
  ["2026-06-15T12:00:00.000Z", "Stage 3 Round 5", "TBD 2-2", "TBD 2-2", "Decider matches"],
  ["2026-06-18T13:45:00.000Z", "Playoffs Quarter-final", "TBD", "TBD", "Quarter-final 1"],
  ["2026-06-18T17:00:00.000Z", "Playoffs Quarter-final", "TBD", "TBD", "Quarter-final 2"],
  ["2026-06-19T13:45:00.000Z", "Playoffs Quarter-final", "TBD", "TBD", "Quarter-final 3"],
  ["2026-06-19T17:00:00.000Z", "Playoffs Quarter-final", "TBD", "TBD", "Quarter-final 4"],
  ["2026-06-20T13:45:00.000Z", "Playoffs Semi-final", "TBD", "TBD", "Semi-final 1"],
  ["2026-06-20T17:00:00.000Z", "Playoffs Semi-final", "TBD", "TBD", "Semi-final 2"],
  ["2026-06-21T15:00:00.000Z", "Playoffs Grand Final", "TBD", "TBD", "Grand final"],
].map(([utc, stage, home, away, note], index) => ({
  id: `cs2-${String(index + 1).padStart(3, "0")}`,
  tournament: "cs2",
  title: `${home} vs ${away}`,
  matchNo: index + 1,
  stage,
  group: "",
  home,
  away,
  utc,
  venue: stage.startsWith("Playoffs") ? "LANXESS Arena" : "IEM Cologne Major studio stage",
  city: "Cologne",
  country: "Germany",
  status: home.includes("TBD") || away.includes("TBD") ? "待定对阵" : "已公布",
  note,
  source: "CS2 Major / HLTV / Strafe schedule",
}));

async function main() {
  const response = await fetch(MATCHTIMES_URL, {
    headers: { "user-agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch MatchTimes: ${response.status}`);
  }

  const root = hydrateNuxtData(await response.text());
  const dataKey = Object.keys(root.data).find((key) => Array.isArray(root.data[key]));
  const worldCupEvents = root.data[dataKey].map(toWorldCupEvent);

  const generated = {
    generatedAt: new Date().toISOString(),
    timezone: "Asia/Shanghai",
    sources: [
      {
        name: "FIFA World Cup 2026",
        url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
      },
      {
        name: "MatchTimes World Cup schedule",
        url: MATCHTIMES_URL,
      },
      {
        name: "CS2 Major Cologne",
        url: "https://cs2major.com/",
      },
      {
        name: "HLTV IEM Cologne Major matches",
        url: "https://www.hltv.org/major/matches",
      },
      {
        name: "Strafe IEM Cologne Major viewer guide",
        url: "https://www.strafe.com/news/read/iem-cologne-major-2026-viewers-guide-schedule-where-to-watch-and-more",
      },
    ],
    events: [...worldCupEvents, ...cs2Events].sort((a, b) => new Date(a.utc) - new Date(b.utc)),
  };

  await writeFile("data.js", `window.SCHEDULE_DATA = ${JSON.stringify(generated, null, 2)};\n`, "utf8");
  console.log(`Wrote data.js with ${generated.events.length} events`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
