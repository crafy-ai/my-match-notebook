const DATA = window.SCHEDULE_DATA;
const ET = "America/New_York";
const FAVORITE_KEY = "watch-schedule-favorites";

const state = {
  tournament: "all",
  query: "",
  futureOnly: false,
  lateOnly: false,
  normalTimeOnly: false,
  favoritesOnly: false,
  favorites: new Set(JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]")),
};

const els = {
  tournamentInsights: document.querySelector("#tournamentInsights"),
  timeline: document.querySelector("#timeline"),
  generatedAt: document.querySelector("#generatedAt"),
  totalCount: document.querySelector("#totalCount"),
  nextCount: document.querySelector("#nextCount"),
  lateCount: document.querySelector("#lateCount"),
  favoriteCount: document.querySelector("#favoriteCount"),
  searchInput: document.querySelector("#searchInput"),
  futureOnly: document.querySelector("#futureOnly"),
  lateOnly: document.querySelector("#lateOnly"),
  normalTimeOnly: document.querySelector("#normalTimeOnly"),
  favoritesOnly: document.querySelector("#favoritesOnly"),
  sources: document.querySelector("#sources"),
};

const WORLD_CUP_TEAMS = {
  Algeria: "Algeria",
  Argentina: "Argentina",
  Australia: "Australia",
  Austria: "Austria",
  Belgium: "Belgium",
  "Bosnia and Herzegovina": "Bosnia and Herzegovina",
  Brazil: "Brazil",
  "Cabo Verde": "Cabo Verde",
  Canada: "Canada",
  Colombia: "Colombia",
  "Congo DR": "Congo DR",
  Croatia: "Croatia",
  "Curaçao": "Curaçao",
  Czechia: "Czechia",
  "Côte d'Ivoire": "Côte d'Ivoire",
  Ecuador: "Ecuador",
  Egypt: "Egypt",
  England: "England",
  France: "France",
  Germany: "Germany",
  Ghana: "Ghana",
  Haiti: "Haiti",
  Iran: "Iran",
  Iraq: "Iraq",
  Japan: "Japan",
  Jordan: "Jordan",
  "Korea Republic": "Korea Republic",
  Mexico: "Mexico",
  Morocco: "Morocco",
  Netherlands: "Netherlands",
  "New Zealand": "New Zealand",
  Norway: "Norway",
  Panama: "Panama",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Qatar",
  "Saudi Arabia": "Saudi Arabia",
  Scotland: "Scotland",
  Senegal: "Senegal",
  "South Africa": "South Africa",
  Spain: "Spain",
  Sweden: "Sweden",
  Switzerland: "Switzerland",
  Tunisia: "Tunisia",
  Turkey: "Turkey",
  "United States": "United States",
  Uruguay: "Uruguay",
  Uzbekistan: "Uzbekistan",
};

const TEAM_FLAGS = {
  Algeria: "🇩🇿",
  Argentina: "🇦🇷",
  Australia: "🇦🇺",
  Austria: "🇦🇹",
  Belgium: "🇧🇪",
  "Bosnia and Herzegovina": "🇧🇦",
  Brazil: "🇧🇷",
  "Cabo Verde": "🇨🇻",
  Canada: "🇨🇦",
  Colombia: "🇨🇴",
  "Congo DR": "🇨🇩",
  Croatia: "🇭🇷",
  "Curaçao": "🇨🇼",
  Czechia: "🇨🇿",
  "Côte d'Ivoire": "🇨🇮",
  Ecuador: "🇪🇨",
  Egypt: "🇪🇬",
  England: "🏴",
  France: "🇫🇷",
  Germany: "🇩🇪",
  Ghana: "🇬🇭",
  Haiti: "🇭🇹",
  Iran: "🇮🇷",
  Iraq: "🇮🇶",
  Japan: "🇯🇵",
  Jordan: "🇯🇴",
  "Korea Republic": "🇰🇷",
  Mexico: "🇲🇽",
  Morocco: "🇲🇦",
  Netherlands: "🇳🇱",
  "New Zealand": "🇳🇿",
  Norway: "🇳🇴",
  Panama: "🇵🇦",
  Paraguay: "🇵🇾",
  Portugal: "🇵🇹",
  Qatar: "🇶🇦",
  "Saudi Arabia": "🇸🇦",
  Scotland: "🏴",
  Senegal: "🇸🇳",
  "South Africa": "🇿🇦",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Tunisia: "🇹🇳",
  Turkey: "🇹🇷",
  "United States": "🇺🇸",
  Uruguay: "🇺🇾",
  Uzbekistan: "🇺🇿",
};

const TEAM_FLAG_IMAGES = {
  Algeria: "assets/teams/worldcup/dz.svg",
  Argentina: "assets/teams/worldcup/ar.svg",
  Australia: "assets/teams/worldcup/au.svg",
  Austria: "assets/teams/worldcup/at.svg",
  Belgium: "assets/teams/worldcup/be.svg",
  "Bosnia and Herzegovina": "assets/teams/worldcup/ba.svg",
  Brazil: "assets/teams/worldcup/br.svg",
  "Cabo Verde": "assets/teams/worldcup/cv.svg",
  Canada: "assets/teams/worldcup/ca.svg",
  Colombia: "assets/teams/worldcup/co.svg",
  "Congo DR": "assets/teams/worldcup/cd.svg",
  Croatia: "assets/teams/worldcup/hr.svg",
  "Curaçao": "assets/teams/worldcup/cw.svg",
  Czechia: "assets/teams/worldcup/cz.svg",
  "Côte d'Ivoire": "assets/teams/worldcup/ci.svg",
  Ecuador: "assets/teams/worldcup/ec.svg",
  Egypt: "assets/teams/worldcup/eg.svg",
  England: "assets/teams/worldcup/gb-eng.svg",
  France: "assets/teams/worldcup/fr.svg",
  Germany: "assets/teams/worldcup/de.svg",
  Ghana: "assets/teams/worldcup/gh.svg",
  Haiti: "assets/teams/worldcup/ht.svg",
  Iran: "assets/teams/worldcup/ir.svg",
  Iraq: "assets/teams/worldcup/iq.svg",
  Japan: "assets/teams/worldcup/jp.svg",
  Jordan: "assets/teams/worldcup/jo.svg",
  "Korea Republic": "assets/teams/worldcup/kr.svg",
  Mexico: "assets/teams/worldcup/mx.svg",
  Morocco: "assets/teams/worldcup/ma.svg",
  Netherlands: "assets/teams/worldcup/nl.svg",
  "New Zealand": "assets/teams/worldcup/nz.svg",
  Norway: "assets/teams/worldcup/no.svg",
  Panama: "assets/teams/worldcup/pa.svg",
  Paraguay: "assets/teams/worldcup/py.svg",
  Portugal: "assets/teams/worldcup/pt.svg",
  Qatar: "assets/teams/worldcup/qa.svg",
  "Saudi Arabia": "assets/teams/worldcup/sa.svg",
  Scotland: "assets/teams/worldcup/gb-sct.svg",
  Senegal: "assets/teams/worldcup/sn.svg",
  "South Africa": "assets/teams/worldcup/za.svg",
  Spain: "assets/teams/worldcup/es.svg",
  Sweden: "assets/teams/worldcup/se.svg",
  Switzerland: "assets/teams/worldcup/ch.svg",
  Tunisia: "assets/teams/worldcup/tn.svg",
  Turkey: "assets/teams/worldcup/tr.svg",
  "United States": "assets/teams/worldcup/us.svg",
  Uruguay: "assets/teams/worldcup/uy.svg",
  Uzbekistan: "assets/teams/worldcup/uz.svg",
};

const FIFA_RANKINGS = {
  Algeria: { rank: 28, points: 1564.26 },
  Argentina: { rank: 3, points: 1874.81 },
  Australia: { rank: 27, points: 1580.67 },
  Austria: { rank: 24, points: 1593.45 },
  Belgium: { rank: 9, points: 1734.71 },
  "Bosnia and Herzegovina": { rank: 65, points: 1385.84 },
  Brazil: { rank: 6, points: 1761.16 },
  "Cabo Verde": { rank: 69, points: 1366.13 },
  Canada: { rank: 30, points: 1556.48 },
  Colombia: { rank: 13, points: 1693.09 },
  "Congo DR": { rank: 46, points: 1478.35 },
  Croatia: { rank: 11, points: 1717.07 },
  "Curaçao": { rank: 82, points: 1294.65 },
  Czechia: { rank: 41, points: 1501.38 },
  "Côte d'Ivoire": { rank: 34, points: 1532.98 },
  Ecuador: { rank: 23, points: 1594.78 },
  Egypt: { rank: 29, points: 1563.24 },
  England: { rank: 4, points: 1825.97 },
  France: { rank: 1, points: 1877.32 },
  Germany: { rank: 10, points: 1730.37 },
  Ghana: { rank: 74, points: 1346.31 },
  Haiti: { rank: 83, points: 1291.71 },
  Iran: { rank: 21, points: 1615.3 },
  Iraq: { rank: 57, points: 1447.14 },
  Japan: { rank: 18, points: 1660.43 },
  Jordan: { rank: 63, points: 1391.45 },
  "Korea Republic": { rank: 25, points: 1588.66 },
  Mexico: { rank: 15, points: 1681.03 },
  Morocco: { rank: 8, points: 1755.87 },
  Netherlands: { rank: 7, points: 1757.87 },
  "New Zealand": { rank: 85, points: 1281.57 },
  Norway: { rank: 31, points: 1550.94 },
  Panama: { rank: 33, points: 1540.64 },
  Paraguay: { rank: 40, points: 1503.5 },
  Portugal: { rank: 5, points: 1763.83 },
  Qatar: { rank: 55, points: 1454.96 },
  "Saudi Arabia": { rank: 61, points: 1421.43 },
  Scotland: { rank: 43, points: 1498.35 },
  Senegal: { rank: 14, points: 1688.99 },
  "South Africa": { rank: 60, points: 1429.73 },
  Spain: { rank: 2, points: 1876.4 },
  Sweden: { rank: 38, points: 1514.77 },
  Switzerland: { rank: 19, points: 1649.4 },
  Tunisia: { rank: 44, points: 1483.05 },
  Turkey: { rank: 22, points: 1599.04 },
  "United States": { rank: 16, points: 1673.13 },
  Uruguay: { rank: 17, points: 1673.07 },
  Uzbekistan: { rank: 50, points: 1465.34 },
};

const CS2_RANKINGS = {
  Spirit: { rank: 1, points: 2000 },
  Vitality: { rank: 2, points: 2000 },
  Falcons: { rank: 3, points: 1956 },
  NAVI: { rank: 4, points: 1939 },
  "Natus Vincere": { rank: 4, points: 1939 },
  MOUZ: { rank: 5, points: 1865 },
  Legacy: { rank: 6, points: 1840 },
  FUT: { rank: 7, points: 1740 },
  "The MongolZ": { rank: 8, points: 1728 },
  Aurora: { rank: 9, points: 1718 },
  "9z": { rank: 10, points: 1708 },
  BetBoom: { rank: 11, points: 1702 },
  G2: { rank: 12, points: 1696 },
  FURIA: { rank: 13, points: 1692 },
  GamerLegion: { rank: 14, points: 1683 },
  Astralis: { rank: 15, points: 1670 },
  PARIVISION: { rank: 16, points: 1645 },
  B8: { rank: 17, points: 1640 },
  MIBR: { rank: 18, points: 1594 },
  Monte: { rank: 19, points: 1569 },
  paiN: { rank: 21, points: 1533 },
  TYLOO: { rank: 22, points: 1482 },
  M80: { rank: 24, points: 1453 },
  BIG: { rank: 26, points: 1449 },
  "Lynn Vision": { rank: 27, points: 1440 },
  HEROIC: { rank: 33, points: 1370 },
  Liquid: { rank: 36, points: 1345 },
  Sharks: { rank: 40, points: 1333 },
  SINNERS: { rank: 43, points: 1310 },
  NRG: { rank: 48, points: 1279 },
  FlyQuest: { rank: 53, points: 1231 },
  "THUNDER dOWNUNDER": { rank: 58, points: 1197 },
  "Gaimin Gladiators": { rank: 60, points: 1185 },
};

const CS2_LOGO_COLORS = {
  "9z": "#6d3bd1",
  Astralis: "#c63d2d",
  Aurora: "#3c8f6a",
  B8: "#1d1f30",
  BetBoom: "#f0c431",
  BIG: "#111111",
  Falcons: "#198754",
  FlyQuest: "#477a3f",
  FURIA: "#151515",
  FUT: "#e24d2d",
  G2: "#d33f2f",
  GaiminGladiators: "#522d80",
  GamerLegion: "#3154a4",
  HEROIC: "#e0a928",
  Legacy: "#2e9955",
  Liquid: "#244884",
  LynnVision: "#d23838",
  M80: "#e9364a",
  MIBR: "#f2c230",
  Monte: "#d63a37",
  MOUZ: "#d5393d",
  NAVI: "#f2cf28",
  NRG: "#cf2c32",
  paiN: "#1b1b1b",
  PARIVISION: "#6250d8",
  Sharks: "#1d8dbf",
  SINNERS: "#c72a2f",
  Spirit: "#d83a3a",
  TheMongolZ: "#d13b2f",
  THUNDERdOWNUNDER: "#315f9c",
  TYLOO: "#c72d2e",
  Vitality: "#f2d23a",
};

const CS2_LOGOS = {
  "9z": "assets/teams/cs2/9z.png",
  Astralis: "assets/teams/cs2/astralis.png",
  Aurora: "assets/teams/cs2/aurora.png",
  B8: "assets/teams/cs2/b8.png",
  BetBoom: "assets/teams/cs2/betboom.png",
  BIG: "assets/teams/cs2/big.png",
  Falcons: "assets/teams/cs2/falcons.png",
  FlyQuest: "assets/teams/cs2/flyquest.png",
  FURIA: "assets/teams/cs2/furia.png",
  FUT: "assets/teams/cs2/fut.png",
  G2: "assets/teams/cs2/g2.png",
  "Gaimin Gladiators": "assets/teams/cs2/gaimin-gladiators.png",
  GamerLegion: "assets/teams/cs2/gamerlegion.png",
  HEROIC: "assets/teams/cs2/heroic.png",
  Legacy: "assets/teams/cs2/legacy.png",
  Liquid: "assets/teams/cs2/liquid.png",
  "Lynn Vision": "assets/teams/cs2/lynn-vision.png",
  M80: "assets/teams/cs2/m80.png",
  MIBR: "assets/teams/cs2/mibr.png",
  Monte: "assets/teams/cs2/monte.png",
  MOUZ: "assets/teams/cs2/mouz.png",
  NAVI: "assets/teams/cs2/navi.png",
  "Natus Vincere": "assets/teams/cs2/navi.png",
  NRG: "assets/teams/cs2/nrg.png",
  paiN: "assets/teams/cs2/pain.png",
  PARIVISION: "assets/teams/cs2/parivision.png",
  Sharks: "assets/teams/cs2/sharks.png",
  SINNERS: "assets/teams/cs2/sinners.png",
  Spirit: "assets/teams/cs2/spirit.png",
  "The MongolZ": "assets/teams/cs2/the-mongolz.png",
  "THUNDER dOWNUNDER": "assets/teams/cs2/thunder-downunder.png",
  TYLOO: "assets/teams/cs2/tyloo.png",
  Vitality: "assets/teams/cs2/vitality.webp",
};

const STAGE_NAMES = {
  "Group Stage": "Group Stage",
  "Round of 32": "Round of 32",
  "Round of 16": "Round of 16",
  "Quarter-final": "Quarter-final",
  "Semi-final": "Semi-final",
  "Third Place": "Third Place",
  Final: "Final",
  "Playoffs Quarter-final": "Playoffs Quarter-final",
  "Playoffs Semi-final": "Playoffs Semi-final",
  "Playoffs Grand Final": "Playoffs Grand Final",
};

const VENUES = {
  "IEM Cologne Major studio stage": "IEM Cologne Major studio stage",
  "LANXESS Arena": "LANXESS Arena",
  "Estadio Azteca": "Estadio Azteca",
  "Estadio Akron": "Estadio Akron",
  "BMO Field": "BMO Field",
  "SoFi Stadium": "SoFi Stadium",
  "Levi's Stadium": "Levi's Stadium",
  "MetLife Stadium": "MetLife Stadium",
  "Gillette Stadium": "Gillette Stadium",
  "BC Place": "BC Place",
  "NRG Stadium": "NRG Stadium",
  "AT&T Stadium": "AT&T Stadium",
  "Lincoln Financial Field": "Lincoln Financial Field",
  "Estadio BBVA": "Estadio BBVA",
  "Mercedes-Benz Stadium": "Mercedes-Benz Stadium",
  "Lumen Field": "Lumen Field",
  "Hard Rock Stadium": "Hard Rock Stadium",
  "Arrowhead Stadium": "Arrowhead Stadium",
};

const CITIES = {
  "Mexico City": "Mexico City",
  Guadalajara: "Guadalajara",
  Toronto: "Toronto",
  "Los Angeles": "Los Angeles",
  "San Francisco Bay Area": "San Francisco Bay Area",
  "New York/New Jersey": "New York/New Jersey",
  Boston: "Boston",
  Vancouver: "Vancouver",
  Houston: "Houston",
  Dallas: "Dallas",
  Philadelphia: "Philadelphia",
  Monterrey: "Monterrey",
  Atlanta: "Atlanta",
  Seattle: "Seattle",
  Miami: "Miami",
  "Kansas City": "Kansas City",
  Cologne: "Cologne",
};

const NOTE_NAMES = {
  "Opening best-of-one": "Opening best-of-one",
  "Swiss pairings after Round 1": "Swiss pairings after Round 1",
  "Swiss middle bracket": "Swiss middle bracket",
  "Swiss high bracket": "Swiss high bracket",
  "Swiss low bracket": "Swiss low bracket",
  "Qualification match": "Qualification match",
  "Elimination match": "Elimination match",
  "Qualification match 1/2": "Qualification match 1/2",
  "Qualification match 3": "Qualification match 3",
  "Elimination match 1": "Elimination match 1",
  "Elimination match 2/3": "Elimination match 2/3",
  "Decider match 1": "Decider match 1",
  "Decider match 2": "Decider match 2",
  "Decider match 3": "Decider match 3",
  "Decider matches": "Decider matches",
  "Quarter-final 1": "Quarter-final 1",
  "Quarter-final 2": "Quarter-final 2",
  "Quarter-final 3": "Quarter-final 3",
  "Quarter-final 4": "Quarter-final 4",
  "Semi-final 1": "Semi-final 1",
  "Semi-final 2": "Semi-final 2",
  "Grand final": "Grand final",
};

const STATUS_NAMES = {
  "Scheduled": "Scheduled",
  "TBD matchup": "TBD matchup",
  "TBD path": "TBD path",
  "Final": "Final",
  "Live": "Live",
};

const SOURCE_NAMES = {
  "FIFA World Cup 2026": "FIFA World Cup 2026",
  "MatchTimes World Cup schedule": "World Cup schedule",
  "CS2 Major Cologne": "CS2 Major Cologne",
  "HLTV IEM Cologne Major matches": "HLTV match page",
  "Strafe IEM Cologne Major viewer guide": "Strafe viewer guide",
};



const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: ET,
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: ET,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: ET,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  hourCycle: "h23",
});

function etParts(event) {
  const date = new Date(event.utc);
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ET,
      hour: "2-digit",
      hour12: false,
      hourCycle: "h23",
    }).format(date),
  );

  return {
    date,
    dayKey: fullDateFormatter.format(date),
    shortDate: dateFormatter.format(date),
    time: timeFormatter.format(date),
    hour,
  };
}

function isLate(event) {
  const { hour } = etParts(event);
  return hour >= 23 || hour < 6;
}

function isNormalTime(event) {
  const { date, hour } = etParts(event);
  const minute = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ET,
      minute: "2-digit",
    }).format(date),
  );
  return hour >= 8 || (hour === 0 && minute === 0);
}

function cs2Placeholder(text) {
  if (text === "TBD") return "TBD";
  if (text === "TBD Stage 1 qualifier") return "TBD: Stage 1 qualifier";
  if (text === "TBD Stage 2 qualifier") return "TBD: Stage 2 qualifier";

  const record = text.match(/^TBD (.+)$/);
  if (record) return `TBD: ${record[1]} group`;

  return text;
}

function worldCupPath(text) {
  if (WORLD_CUP_TEAMS[text]) return WORLD_CUP_TEAMS[text];

  const matchPath = text.match(/^Match (\d+) (Winner|Loser)$/);
  if (matchPath) {
    return `Match ${matchPath[1]} ${matchPath[2] === "Winner" ? "Winner" : "Loser"}`;
  }

  const groupPlace = text.match(/^Group ([A-L](?:\/[A-L])*) (Winner|Runner-Up|3rd Place)$/);
  if (groupPlace) {
    const groups = groupPlace[1].split("/").map((group) => `Group ${group}`).join(" / ");
    const place = {
      Winner: "Winner",
      "Runner-Up": "Runner-Up",
      "3rd Place": "Third Place",
    }[groupPlace[2]];
    return `${groups} ${place}`;
  }

  return text;
}

function displayTeam(event, team) {
  return event.tournament === "cs2" ? cs2Placeholder(team) : worldCupPath(team);
}

function displayStage(stage) {
  const stageMatch = stage.match(/^Stage (\d+) Round (\d+)$/);
  if (stageMatch) return `Stage ${stageMatch[1]} Round ${stageMatch[2]}`;
  return STAGE_NAMES[stage] || stage;
}

function displayVenue(venue) {
  return VENUES[venue] || venue;
}

function displayCity(city) {
  return CITIES[city] || city;
}

function displayNote(note) {
  return NOTE_NAMES[note] || STATUS_NAMES[note] || note;
}

function teamRanking(event, team) {
  if (event.tournament === "cs2") return CS2_RANKINGS[team] || null;
  return FIFA_RANKINGS[team] || null;
}

function rankLabel(event, team) {
  const ranking = teamRanking(event, team);
  if (!ranking) return "Rank TBD";
  const source = event.tournament === "cs2" ? "Rating" : "FIFA";
  return `${source} rank #${ranking.rank} · ${ranking.points} pts`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



function isPortugalMatch(event) {
  return event.tournament === "worldcup" && [event.home, event.away].includes("Portugal");
}

function isKnockoutStage(event) {
  return [
    "Round of 32",
    "Round of 16",
    "Quarter-final",
    "Semi-final",
    "Third Place",
    "Final",
    "Playoffs Quarter-final",
    "Playoffs Semi-final",
    "Playoffs Grand Final",
  ].includes(event.stage);
}

function isStrongMatch(event) {
  const homeRank = teamRanking(event, event.home)?.rank;
  const awayRank = teamRanking(event, event.away)?.rank;
  if (!homeRank || !awayRank) return false;
  if (event.tournament === "cs2") return homeRank <= 25 && awayRank <= 25;
  return homeRank <= 20 && awayRank <= 20;
}

function isLikelyInteresting(event) {
  if (isPortugalMatch(event)) return true;
  if (isStrongMatch(event)) return true;
  if (event.stage === "Final" || event.stage === "Playoffs Grand Final") return true;
  if (event.note && /Grand final|Qualification|Elimination/i.test(event.note)) return true;
  return false;
}

function matchHighlights(event) {
  const highlights = [];
  const homeName = displayTeam(event, event.home);
  const awayName = displayTeam(event, event.away);
  const homeRank = teamRanking(event, event.home)?.rank;
  const awayRank = teamRanking(event, event.away)?.rank;
  const stage = displayStage(event.stage);
  const note = displayNote(event.note || event.status);

  if (event.tournament === "cs2") {
    if (isStrongMatch(event)) {
      highlights.push("Heavyweight matchup: both teams are ranked in the top 25, so the result carries real weight.");
    }
    if (event.note && /Qualification/i.test(event.note)) {
      highlights.push("Qualification match: the winner moves closer to the next stage. Worth watching live.");
    }
    if (event.note && /Elimination/i.test(event.note)) {
      highlights.push("Elimination match: the loser goes home. High pressure.");
    }
    if (event.stage.includes("Stage 1") && Array.isArray(event.score)) {
      highlights.push(`Final score ${event.score[0]} : ${event.score[1]}; ${event.winner} won.`);
    }
    if (event.stage.includes("Stage") && !Array.isArray(event.score)) {
      highlights.push(`${stage}: the story is the Swiss record groups and the path to the playoffs.`);
    }
    if (event.stage.startsWith("Playoffs")) {
      highlights.push("Playoff stage: less room for error and a better reason to watch live.");
    }
  } else {
    if (isPortugalMatch(event)) {
      highlights.push("Portugal match, prioritized for your Cristiano Ronaldo interest.");
    }
    if (isStrongMatch(event)) {
      highlights.push("Heavyweight matchup: both teams are ranked in the FIFA top 20.");
    } else if (homeRank && awayRank && Math.abs(homeRank - awayRank) <= 8 && Math.min(homeRank, awayRank) <= 35) {
      highlights.push("Close rankings—this could be a tight group or knockout match.");
    }
    if (event.group) {
      highlights.push(`Group ${event.group} match. Watch the group table and qualification order.`);
    }
    if (event.matchNo === 1) {
      highlights.push("World Cup opener—the ceremony and opening pace are worth watching.");
    }
    if (isKnockoutStage(event)) {
      highlights.push(`${stage}: every match directly shapes the bracket.`);
    }
    if (event.stage === "Final") {
      highlights.push("The final—the last answer of the tournament.");
    }
  }

  if (homeRank && awayRank) {
    const rankName = event.tournament === "cs2" ? "Rating" : "FIFA ranking";
    highlights.push(`${homeName} ${rankName} #${homeRank}, ${awayName} #${awayRank}.`);
  }

  const { hour } = etParts(event);
  if (isNormalTime(event) && hour < 23) {
    highlights.push("Kickoff time is friendly for normal viewing.");
  } else if (isNormalTime(event)) {
    highlights.push("Still within normal hours, but close to midnight.");
  } else if (isLate(event)) {
    highlights.push("Late-night match—decide ahead of time whether you are staying up.");
  }

  if (!highlights.length) {
    highlights.push(`${stage}: matchup or qualification path still to be confirmed.`);
  }

  return highlights;
}

function renderHighlights(event) {
  const highlights = matchHighlights(event);
  const items = highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `
    <span class="highlight-wrap" tabindex="0">
      <span class="pill highlight-trigger">Highlights</span>
      <span class="highlight-popover" role="tooltip">
        <strong>Why this match is worth watching</strong>
        <ul>${items}</ul>
      </span>
    </span>
  `;
}

function teamInitials(team) {
  if (team.startsWith("TBD")) return "TBD";
  const compact = team.replace(/[^A-Za-z0-9]/g, "");
  if (!compact) return "T";
  if (/^[0-9]/.test(compact)) return compact.slice(0, 2).toUpperCase();
  const caps = compact.match(/[A-Z0-9]/g);
  return (caps?.slice(0, 3).join("") || compact.slice(0, 3)).toUpperCase();
}

function cs2LogoColor(team) {
  return CS2_LOGO_COLORS[team.replace(/[^A-Za-z0-9]/g, "")] || "#315f9c";
}

function teamLogo(event, team) {
  if (event.tournament === "worldcup") {
    const flag = TEAM_FLAG_IMAGES[team];
    if (flag) {
      return `
        <span class="team-logo flag-image">
          <img src="${flag}" alt="${displayTeam(event, team)} flag" loading="lazy" decoding="async" />
        </span>
      `;
    }
    if (TEAM_FLAGS[team]) return `<span class="team-logo flag">${TEAM_FLAGS[team]}</span>`;
    return `<span class="team-logo pending-logo">TBD</span>`;
  }

  const logo = CS2_LOGOS[team];
  if (logo) {
    return `
      <span class="team-logo logo-image">
        <img src="${logo}" alt="${team} logo" loading="lazy" decoding="async" />
      </span>
    `;
  }

  const label = teamInitials(team);
  const color = cs2LogoColor(team);
  return `<span class="team-logo cs-logo" style="--logo-color: ${color}">${label}</span>`;
}

function renderTeam(event, team) {
  const name = displayTeam(event, team);
  return `
    <span class="team-side">
      ${teamLogo(event, team)}
      <span class="team-copy">
        <span class="team-name">${name}</span>
        <span class="team-rank">${rankLabel(event, team)}</span>
      </span>
    </span>
  `;
}

function eventSearchText(event) {
  const home = displayTeam(event, event.home);
  const away = displayTeam(event, event.away);

  return [
    home,
    away,
    event.home,
    event.away,
    displayStage(event.stage),
    event.stage,
    event.group ? `Group ${event.group}` : "",
    displayVenue(event.venue),
    displayCity(event.city),
    displayNote(event.note || event.status),
    STATUS_NAMES[event.status],
    rankLabel(event, event.home),
    rankLabel(event, event.away),
    isLikelyInteresting(event) ? "recommended must-watch focus" : "",
    ...matchHighlights(event),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function filteredEvents() {
  const now = new Date();
  const query = state.query.trim().toLowerCase();

  return DATA.events.filter((event) => {
    if (state.tournament !== "all" && event.tournament !== state.tournament) return false;
    if (state.futureOnly && new Date(event.utc) < now) return false;
    if (state.lateOnly && !isLate(event)) return false;
    if (state.normalTimeOnly && !isNormalTime(event)) return false;
    if (state.favoritesOnly && !state.favorites.has(event.id)) return false;
    if (query && !eventSearchText(event).includes(query)) return false;
    return true;
  });
}

function statEvents() {
  const now = new Date();
  els.totalCount.textContent = DATA.events.length;
  els.nextCount.textContent = DATA.events.filter((event) => new Date(event.utc) >= now).length;
  els.lateCount.textContent = DATA.events.filter(isLate).length;
  els.favoriteCount.textContent = state.favorites.size;
}

function tournamentName(event) {
  return event.tournament === "worldcup" ? "World Cup" : "CS2";
}

function stageEvents(tournament, stages) {
  return DATA.events
    .filter((event) => event.tournament === tournament && stages.includes(event.stage))
    .sort((a, b) => a.matchNo - b.matchNo);
}

function renderBracketNode(event) {
  const home = displayTeam(event, event.home);
  const away = displayTeam(event, event.away);
  return `
    <div class="bracket-node">
      <span>Match ${event.matchNo}</span>
      <strong>${home}</strong>
      <em>vs</em>
      <strong>${away}</strong>
    </div>
  `;
}

function renderBracketColumn(title, events, emptyText = "TBD") {
  const nodes = events.length
    ? events.map(renderBracketNode).join("")
    : `<div class="bracket-node muted-node"><strong>${emptyText}</strong></div>`;
  return `
    <div class="bracket-column">
      <h4>${title}</h4>
      <div class="bracket-nodes">${nodes}</div>
    </div>
  `;
}

function worldCupGroupTeams() {
  const groups = new Map();
  for (const event of DATA.events) {
    if (event.tournament !== "worldcup" || event.stage !== "Group Stage" || !event.group) continue;
    if (!groups.has(event.group)) groups.set(event.group, new Set());
    if (WORLD_CUP_TEAMS[event.home]) groups.get(event.group).add(event.home);
    if (WORLD_CUP_TEAMS[event.away]) groups.get(event.group).add(event.away);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function worldCupGroupRecords(group, teams) {
  const records = new Map(
    [...teams].map((team) => [team, { team, played: 0, wins: 0, draws: 0, points: 0, goalsFor: 0, goalsAgainst: 0 }]),
  );

  DATA.events
    .filter(
      (event) =>
        event.tournament === "worldcup" &&
        event.stage === "Group Stage" &&
        event.group === group &&
        Array.isArray(event.score),
    )
    .forEach((event) => {
      const home = records.get(event.home);
      const away = records.get(event.away);
      if (!home || !away) return;
      const [homeScore, awayScore] = event.score;
      home.played += 1;
      away.played += 1;
      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;
      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;
      if (homeScore === awayScore) {
        home.draws += 1;
        away.draws += 1;
        home.points += 1;
        away.points += 1;
      } else if (homeScore > awayScore) {
        home.wins += 1;
        home.points += 3;
      } else {
        away.wins += 1;
        away.points += 3;
      }
    });

  return [...records.values()].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const goalDifference = (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
    if (goalDifference) return goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return (FIFA_RANKINGS[a.team]?.rank || 999) - (FIFA_RANKINGS[b.team]?.rank || 999);
  });
}

function renderWorldCupStandingRows(group, teams) {
  return worldCupGroupRecords(group, teams)
    .map((record) => `
      <tr>
        <td>${teamLogo({ tournament: "worldcup" }, record.team)}<span>${displayTeam({ tournament: "worldcup" }, record.team)}</span></td>
        <td>${record.played}</td><td>${record.wins}</td><td>${record.draws}</td><td>${record.points}</td>
        <td>${rankLabel({ tournament: "worldcup" }, record.team)}</td>
      </tr>
    `)
    .join("");
}

function renderWorldCupBracket() {
  return `
    <div class="bracket-scroll">
      <div class="bracket-tree">
        ${renderBracketColumn("Round of 32", stageEvents("worldcup", ["Round of 32"]))}
        ${renderBracketColumn("Round of 16", stageEvents("worldcup", ["Round of 16"]))}
        ${renderBracketColumn("Quarter-finals", stageEvents("worldcup", ["Quarter-final"]))}
        ${renderBracketColumn("Semi-finals", stageEvents("worldcup", ["Semi-final"]))}
        ${renderBracketColumn("Final", stageEvents("worldcup", ["Final"]))}
      </div>
    </div>
  `;
}

function renderWorldCupStandingsTable() {
  return worldCupGroupTeams()
    .map(([group, teams]) => {
      const rows = renderWorldCupStandingRows(group, teams);
      return `
        <div class="standing-group">
          <h4>Group ${group}</h4>
          <table>
            <thead><tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>Pts</th><th>Rank</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    })
    .join("");
}

function renderWorldCupStandings() {
  const groups = worldCupGroupTeams()
    .map(([group, teams]) => {
      const rows = renderWorldCupStandingRows(group, teams);

      return `
        <div class="group-chip" tabindex="0">
          <span class="group-chip-label">Group ${group}</span>
          <div class="group-popover">
            <h4>Group ${group}</h4>
            <table>
              <thead><tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>Pts</th><th>Rank</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      `;
    })
    .join("");

  return `<div class="worldcup-group-hover">${groups}</div>`;
}

function renderCs2FlowNode(title, detail) {
  return `
    <div class="bracket-node">
      <span>${title}</span>
      <strong>${detail}</strong>
    </div>
  `;
}

function renderCs2Bracket() {
  const playoffStages = ["Playoffs Quarter-final", "Playoffs Semi-final", "Playoffs Grand Final"];
  return `
    <div class="bracket-scroll">
      <div class="bracket-tree">
        <div class="bracket-column">
          <h4>Stage 1</h4>
          <div class="bracket-nodes">
            ${renderCs2FlowNode("Swiss Stage", "16 teams compete for 8 playoff spots")}
            ${renderCs2FlowNode("Advance", "8 teams move on to Stage 2")}
          </div>
        </div>
        <div class="bracket-column">
          <h4>Stage 2</h4>
          <div class="bracket-nodes">
            ${renderCs2FlowNode("Swiss Stage", "8 seeded teams + 8 qualifiers")}
            ${renderCs2FlowNode("Advance", "8 teams move on to Stage 3")}
          </div>
        </div>
        <div class="bracket-column">
          <h4>Stage 3</h4>
          <div class="bracket-nodes">
            ${renderCs2FlowNode("Swiss Stage", "8 seeded teams + 8 qualifiers")}
            ${renderCs2FlowNode("Advance", "8 teams move on to the playoffs")}
          </div>
        </div>
        ${renderBracketColumn("Playoffs", stageEvents("cs2", playoffStages))}
      </div>
    </div>
  `;
}

function renderBracketArt(type) {
  const isWorldCup = type === "worldcup";
  const image = isWorldCup ? "assets/brackets/worldcup-bracket-bg.png" : "assets/brackets/cs2-bracket-bg.png";
  const alt = isWorldCup ? "World Cup bracket visual" : "CS2 Cologne Major bracket visual";
  const tags = isWorldCup
    ? ["Group Stage", "Round of 32", "Round of 16", "Quarter-finals", "Semi-finals", "Final"]
    : ["Stage 1 Swiss", "Stage 2 Swiss", "Stage 3 Swiss", "Playoffs", "Grand Final"];

  return `
    <div class="bracket-art ${type}">
      <img src="${image}" alt="${alt}" loading="lazy" decoding="async" />
      <div class="bracket-art-overlay">
        ${tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderNewsMedia(item, type) {
  if (item.image) {
    return `<img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async" />`;
  }

  const tournament = type === "cs2" ? "cs2" : "worldcup";
  const logos = (item.logos || [])
    .map((team) => `<span class="news-logo-item">${teamLogo({ tournament }, team)}</span>`)
    .join("");

  return `<div class="news-logo-board ${type}">${logos}</div>`;
}

function renderNewsCard(item, type, index) {
  const external = !item.url.startsWith("#");
  return `
    <article class="news-card ${type}" style="--tilt: ${index % 2 === 0 ? "-0.45deg" : "0.35deg"}">
      <div class="news-media">${renderNewsMedia(item, type)}</div>
      <div class="news-copy">
        <div class="news-meta">
          <span>${escapeHtml(item.tag)}</span>
          <span>${escapeHtml(item.source)}</span>
          <time>${escapeHtml(item.date)}</time>
        </div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.summary)}</p>
        <a href="${item.url}" ${external ? `target="_blank" rel="noreferrer"` : ""}>View source</a>
      </div>
    </article>
  `;
}

function renderNewsTicker(type) {
  const items = window.NEWS_DATA?.[type] || [];
  if (!items.length) return `<div class="empty">No news updates yet.</div>`;
  const loopItems = [...items, ...items];
  return `
    <div class="news-ticker ${type}" aria-label="${type === "worldcup" ? "World Cup news ticker" : "CS2 Cologne Major news ticker"}">
      <div class="news-track">
        ${loopItems.map((item, index) => renderNewsCard(item, type, index)).join("")}
      </div>
    </div>
  `;
}

function cs2StageTeams(stageNumber) {
  return DATA.events
    .filter((event) => event.tournament === "cs2" && event.stage === `Stage ${stageNumber} Round 1`)
    .flatMap((event) => [event.home, event.away]);
}

function activeCs2StageNumber() {
  return [3, 2, 1].find((stageNumber) =>
    DATA.events.some(
      (event) =>
        event.tournament === "cs2" &&
        event.stage.startsWith(`Stage ${stageNumber}`) &&
        Array.isArray(event.score),
    ),
  ) || 1;
}



function cs2StageRecords(stageNumber) {
  const records = new Map();
  const ensure = (team) => {
    if (!records.has(team)) records.set(team, { team, wins: 0, losses: 0 });
    return records.get(team);
  };

  cs2StageTeams(stageNumber).forEach(ensure);
  DATA.events
    .filter(
      (event) =>
        event.tournament === "cs2" &&
        event.stage.startsWith(`Stage ${stageNumber}`) &&
        Array.isArray(event.score) &&
        event.winner,
    )
    .forEach((event) => {
      const winner = ensure(event.winner);
      const loserTeam = event.winner === event.home ? event.away : event.home;
      const loser = ensure(loserTeam);
      winner.wins += 1;
      loser.losses += 1;
    });

  return [...records.values()].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (a.losses !== b.losses) return a.losses - b.losses;
    return (CS2_RANKINGS[a.team]?.rank || 999) - (CS2_RANKINGS[b.team]?.rank || 999);
  });
}

function cs2RecordStatus(record) {
  if (record.wins >= 3) return "Qualified";
  if (record.losses >= 3) return "Eliminated";
  if (record.wins === 2) return `${record.wins}-${record.losses} qualification match`;
  if (record.losses === 2) return `${record.wins}-${record.losses} elimination match`;
  if (record.wins === 1 && record.losses === 1) return "1-1 group";
  if (record.wins === 1) return "1-0 group";
  if (record.losses === 1) return "0-1 group";
  return "Not started";
}

function renderCs2Standings() {
  const stageNumber = activeCs2StageNumber();
  const rows = cs2StageRecords(stageNumber)
    .map((record) => `
      <tr>
        <td>${teamLogo({ tournament: "cs2" }, record.team)}<span>${record.team}</span></td>
        <td>${record.wins}-${record.losses}</td>
        <td>${cs2RecordStatus(record)}</td>
        <td>${rankLabel({ tournament: "cs2" }, record.team)}</td>
      </tr>
    `)
    .join("");

  return `
    <div class="standing-group">
      <h4>Stage ${stageNumber} Swiss Standings</h4>
      <table>
        <thead><tr><th>Team</th><th>Record</th><th>Status</th><th>Rating</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderInsightBlock(type) {
  const isWorldCup = type === "worldcup";
  const title = isWorldCup ? "World Cup Picture" : "CS2 Cologne Major Picture";
  const note = isWorldCup
    ? "The group stage is underway. Standings are calculated from completed matches; live matches count once they finish."
    : `Showing Stage ${activeCs2StageNumber()} results. Standings are calculated from completed matches.`;
  const news = renderNewsTicker(type);
  const standings = isWorldCup ? renderWorldCupStandings() : renderCs2Standings();

  return `
    <article class="insight-block ${type}">
      <div class="insight-head">
        <div>
          <p class="eyebrow">${isWorldCup ? "Live news · Group standings" : "Live news · Swiss standings"}</p>
          <h2>${title}</h2>
        </div>
        <p>${note}</p>
      </div>
      <div class="insight-grid">
        <section class="insight-panel">
          <h3>Live news ticker</h3>
          ${news}
        </section>
        <section class="insight-panel">
          <h3>Live standings</h3>
          <div class="standings-scroll ${isWorldCup ? "worldcup-standings" : ""}">${standings}</div>
        </section>
      </div>
    </article>
  `;
}

function renderInsights() {
  const types = state.tournament === "all" ? ["worldcup", "cs2"] : [state.tournament];
  els.tournamentInsights.innerHTML = types.map(renderInsightBlock).join("");
  setupWorldCupGroupPopovers();
}

function setupWorldCupGroupPopovers() {
  const chips = [...document.querySelectorAll(".worldcup-group-hover .group-chip")];

  const close = (chip) => {
    chip.classList.remove("open");
    const popover = chip.querySelector(".group-popover");
    if (!popover) return;
    popover.style.removeProperty("visibility");
    popover.style.removeProperty("opacity");
    popover.style.removeProperty("position");
    popover.style.removeProperty("right");
    popover.style.removeProperty("bottom");
    popover.style.removeProperty("pointer-events");
    popover.style.removeProperty("top");
    popover.style.removeProperty("left");
    popover.style.removeProperty("width");
  };

  const open = (chip) => {
    const popover = chip.querySelector(".group-popover");
    if (!popover) return;

    chips.forEach((item) => {
      if (item !== chip) close(item);
    });
    chip.classList.add("open");
    popover.style.visibility = "visible";
    popover.style.opacity = "1";
    popover.style.position = "fixed";
    popover.style.right = "auto";
    popover.style.bottom = "auto";
    popover.style.pointerEvents = "auto";

    const triggerRect = chip.getBoundingClientRect();
    const width = Math.min(520, window.innerWidth - 32);
    popover.style.width = `${width}px`;

    const popoverHeight = popover.getBoundingClientRect().height;
    const left = Math.min(
      Math.max(16, triggerRect.right - width),
      window.innerWidth - width - 16,
    );
    const spaceBelow = window.innerHeight - triggerRect.bottom - 16;
    const top =
      spaceBelow >= popoverHeight + 8
        ? triggerRect.bottom + 8
        : Math.max(16, triggerRect.top - popoverHeight - 8);

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  };

  chips.forEach((chip) => {
    chip.addEventListener("mouseenter", () => open(chip));
    chip.addEventListener("mouseleave", () => close(chip));
    chip.addEventListener("click", () => open(chip));
    chip.addEventListener("focus", () => open(chip));
    chip.addEventListener("focusin", () => open(chip));
    chip.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!chip.contains(document.activeElement)) close(chip);
      });
    });
  });
}

function renderMatch(event) {
  const parts = etParts(event);
  const late = isLate(event);
  const favorite = state.favorites.has(event.id);
  const groupText = event.group ? `Group ${event.group}` : "";
  const home = displayTeam(event, event.home);
  const away = displayTeam(event, event.away);
  const location = [displayVenue(event.venue), displayCity(event.city)].filter(Boolean).join(" · ");
  const note = displayNote(event.note || event.status);
  const pending = event.status.includes("TBD") || home.includes("TBD") || away.includes("TBD");
  const scoreText = Array.isArray(event.score) ? `${event.score[0]} : ${event.score[1]}` : "";
  const winnerText = event.winner ? displayTeam(event, event.winner) : "";
  const completed = event.status === "Final" || Boolean(scoreText && winnerText);
  const matchLabel = event.matchLabel || `Match ${event.matchNo}`;
  const recommended = isLikelyInteresting(event);

  return `
    <article class="match ${event.tournament} ${recommended ? "recommended" : ""}">
      <div class="time">
        <strong>${parts.time}</strong>
        <span>ET</span>
      </div>
      <div class="teams">
        <h2 class="matchup">
          ${renderTeam(event, event.home)}
          <span class="versus">vs</span>
          ${renderTeam(event, event.away)}
        </h2>
        <div class="meta">
          <span class="pill tournament ${event.tournament === "cs2" ? "cs2" : ""}">${tournamentName(event)}</span>
          <span class="pill">${displayStage(event.stage)}</span>
          ${groupText ? `<span class="pill">${groupText}</span>` : ""}
          <span class="pill">${matchLabel}</span>
          ${scoreText ? `<span class="pill result">${scoreText}</span>` : ""}
          ${completed ? `<span class="pill done">Final</span>` : ""}
          ${winnerText ? `<span class="pill win">Winner: ${winnerText}</span>` : ""}
          ${recommended ? `<span class="pill recommended-pill">Recommended</span>` : ""}
          ${late ? `<span class="pill late">Late night</span>` : ""}
          ${pending ? `<span class="pill warn">${STATUS_NAMES[event.status] || "TBD"}</span>` : ""}
        </div>
        <div class="badges">
          ${location ? `<span class="pill">${location}</span>` : ""}
          ${note ? `<span class="pill">${note}</span>` : ""}
          ${renderHighlights(event)}
        </div>
      </div>
      <button class="favorite ${favorite ? "active" : ""}" type="button" aria-label="Favorite ${home} vs ${away}" data-id="${event.id}">
        ${favorite ? "★" : "☆"}
      </button>
    </article>
  `;
}

function render() {
  statEvents();
  renderInsights();

  const groups = new Map();
  for (const event of filteredEvents()) {
    const key = etParts(event).dayKey;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }

  if (!groups.size) {
    els.timeline.innerHTML = `<div class="empty">No matches fit the current filters.</div>`;
    return;
  }

  els.timeline.innerHTML = [...groups.entries()]
    .map(([day, events]) => {
      const count = `${events.length} matches`;
      return `
        <section class="day">
          <div class="day-title"><span>${day} · ${count}</span></div>
          ${events.map(renderMatch).join("")}
        </section>
      `;
    })
    .join("");
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    state.tournament = button.dataset.filter;
    render();
  });
});

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

els.futureOnly.addEventListener("change", (event) => {
  state.futureOnly = event.target.checked;
  render();
});

els.lateOnly.addEventListener("change", (event) => {
  state.lateOnly = event.target.checked;
  render();
});

els.normalTimeOnly.addEventListener("change", (event) => {
  state.normalTimeOnly = event.target.checked;
  render();
});

els.favoritesOnly.addEventListener("change", (event) => {
  state.favoritesOnly = event.target.checked;
  render();
});

els.timeline.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite");
  if (!button) return;

  const id = button.dataset.id;
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }

  localStorage.setItem(FAVORITE_KEY, JSON.stringify([...state.favorites]));
  render();
});

const updatedAt = [window.SCHEDULE_UPDATES?.updatedAt, window.NEWS_DATA?.updatedAt, DATA.generatedAt]
  .filter(Boolean)
  .sort((a, b) => new Date(b) - new Date(a))[0];
els.generatedAt.textContent = `Data updated: ${new Date(updatedAt).toLocaleString("en-US", {
  timeZone: ET,
})}`;

els.sources.innerHTML = `Sources: ${DATA.sources
  .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${SOURCE_NAMES[source.name] || source.name}</a>`)
  .join(" · ")}`;

render();
