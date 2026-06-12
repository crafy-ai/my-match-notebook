const DATA = window.SCHEDULE_DATA;
const BJT = "Asia/Shanghai";
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
  Algeria: "阿尔及利亚",
  Argentina: "阿根廷",
  Australia: "澳大利亚",
  Austria: "奥地利",
  Belgium: "比利时",
  "Bosnia and Herzegovina": "波黑",
  Brazil: "巴西",
  "Cabo Verde": "佛得角",
  Canada: "加拿大",
  Colombia: "哥伦比亚",
  "Congo DR": "刚果民主共和国",
  Croatia: "克罗地亚",
  "Curaçao": "库拉索",
  Czechia: "捷克",
  "Côte d'Ivoire": "科特迪瓦",
  Ecuador: "厄瓜多尔",
  Egypt: "埃及",
  England: "英格兰",
  France: "法国",
  Germany: "德国",
  Ghana: "加纳",
  Haiti: "海地",
  Iran: "伊朗",
  Iraq: "伊拉克",
  Japan: "日本",
  Jordan: "约旦",
  "Korea Republic": "韩国",
  Mexico: "墨西哥",
  Morocco: "摩洛哥",
  Netherlands: "荷兰",
  "New Zealand": "新西兰",
  Norway: "挪威",
  Panama: "巴拿马",
  Paraguay: "巴拉圭",
  Portugal: "葡萄牙",
  Qatar: "卡塔尔",
  "Saudi Arabia": "沙特阿拉伯",
  Scotland: "苏格兰",
  Senegal: "塞内加尔",
  "South Africa": "南非",
  Spain: "西班牙",
  Sweden: "瑞典",
  Switzerland: "瑞士",
  Tunisia: "突尼斯",
  Turkey: "土耳其",
  "United States": "美国",
  Uruguay: "乌拉圭",
  Uzbekistan: "乌兹别克斯坦",
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
  "Group Stage": "小组赛",
  "Round of 32": "三十二强赛",
  "Round of 16": "十六强赛",
  "Quarter-final": "四分之一决赛",
  "Semi-final": "半决赛",
  "Third Place": "三四名决赛",
  Final: "决赛",
  "Playoffs Quarter-final": "淘汰赛四分之一决赛",
  "Playoffs Semi-final": "淘汰赛半决赛",
  "Playoffs Grand Final": "淘汰赛总决赛",
};

const VENUES = {
  "IEM Cologne Major studio stage": "科隆大赛演播厅阶段",
  "LANXESS Arena": "朗盛竞技场",
  "Estadio Azteca": "阿兹特克体育场",
  "Estadio Akron": "阿克伦体育场",
  "BMO Field": "多伦多球场",
  "SoFi Stadium": "洛杉矶体育场",
  "Levi's Stadium": "李维斯体育场",
  "MetLife Stadium": "大都会人寿体育场",
  "Gillette Stadium": "吉列体育场",
  "BC Place": "卑诗体育馆",
  "NRG Stadium": "休斯敦体育场",
  "AT&T Stadium": "达拉斯体育场",
  "Lincoln Financial Field": "林肯金融球场",
  "Estadio BBVA": "蒙特雷体育场",
  "Mercedes-Benz Stadium": "梅赛德斯-奔驰体育场",
  "Lumen Field": "流明球场",
  "Hard Rock Stadium": "硬石体育场",
  "Arrowhead Stadium": "箭头体育场",
};

const CITIES = {
  "Mexico City": "墨西哥城",
  Guadalajara: "瓜达拉哈拉",
  Toronto: "多伦多",
  "Los Angeles": "洛杉矶",
  "San Francisco Bay Area": "旧金山湾区",
  "New York/New Jersey": "纽约/新泽西",
  Boston: "波士顿",
  Vancouver: "温哥华",
  Houston: "休斯敦",
  Dallas: "达拉斯",
  Philadelphia: "费城",
  Monterrey: "蒙特雷",
  Atlanta: "亚特兰大",
  Seattle: "西雅图",
  Miami: "迈阿密",
  "Kansas City": "堪萨斯城",
  Cologne: "科隆",
};

const NOTE_NAMES = {
  "Opening best-of-one": "首轮一图制",
  "Swiss pairings after Round 1": "首轮结束后生成瑞士轮对阵",
  "Swiss middle bracket": "瑞士轮同战绩组",
  "Swiss high bracket": "瑞士轮高战绩组",
  "Swiss low bracket": "瑞士轮低战绩组",
  "Qualification match": "晋级赛",
  "Elimination match": "淘汰赛",
  "Qualification match 1/2": "晋级赛第一、第二场",
  "Qualification match 3": "晋级赛第三场",
  "Elimination match 1": "淘汰赛第一场",
  "Elimination match 2/3": "淘汰赛第二、第三场",
  "Decider match 1": "决胜赛第一场",
  "Decider match 2": "决胜赛第二场",
  "Decider match 3": "决胜赛第三场",
  "Decider matches": "决胜赛",
  "Quarter-final 1": "四分之一决赛第一场",
  "Quarter-final 2": "四分之一决赛第二场",
  "Quarter-final 3": "四分之一决赛第三场",
  "Quarter-final 4": "四分之一决赛第四场",
  "Semi-final 1": "半决赛第一场",
  "Semi-final 2": "半决赛第二场",
  "Grand final": "总决赛",
};

const STATUS_NAMES = {
  "已公布": "已公布",
  "待定对阵": "待定对阵",
  "待定晋级路径": "待定晋级路径",
};

const SOURCE_NAMES = {
  "FIFA World Cup 2026": "国际足联官方赛事页",
  "MatchTimes World Cup schedule": "世界杯完整赛程页",
  "CS2 Major Cologne": "CS2 科隆大赛官方站",
  "HLTV IEM Cologne Major matches": "CS2 科隆大赛对阵页",
  "Strafe IEM Cologne Major viewer guide": "CS2 科隆大赛观赛指南",
};

const GROUP_LETTERS = {
  A: "第一",
  B: "第二",
  C: "第三",
  D: "第四",
  E: "第五",
  F: "第六",
  G: "第七",
  H: "第八",
  I: "第九",
  J: "第十",
  K: "第十一",
  L: "第十二",
};

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: BJT,
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

const fullDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: BJT,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: BJT,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  hourCycle: "h23",
});

function bjtParts(event) {
  const date = new Date(event.utc);
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: BJT,
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
  const { hour } = bjtParts(event);
  return hour >= 23 || hour < 6;
}

function isNormalTime(event) {
  const { date, hour } = bjtParts(event);
  const minute = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: BJT,
      minute: "2-digit",
    }).format(date),
  );
  return hour >= 8 || (hour === 0 && minute === 0);
}

function cs2Placeholder(text) {
  if (text === "TBD") return "待定";
  if (text === "TBD Stage 1 qualifier") return "待定：第一阶段晋级队";
  if (text === "TBD Stage 2 qualifier") return "待定：第二阶段晋级队";

  const record = text.match(/^TBD (.+)$/);
  if (record) return `待定：${record[1]} 组`;

  return text;
}

function worldCupPath(text) {
  if (WORLD_CUP_TEAMS[text]) return WORLD_CUP_TEAMS[text];

  const matchPath = text.match(/^Match (\d+) (Winner|Loser)$/);
  if (matchPath) {
    return `第 ${matchPath[1]} 场${matchPath[2] === "Winner" ? "胜者" : "负者"}`;
  }

  const groupPlace = text.match(/^Group ([A-L](?:\/[A-L])*) (Winner|Runner-Up|3rd Place)$/);
  if (groupPlace) {
    const groups = groupPlace[1].split("/").map((group) => `${GROUP_LETTERS[group]}组`).join("、");
    const place = {
      Winner: "第一名",
      "Runner-Up": "第二名",
      "3rd Place": "第三名之一",
    }[groupPlace[2]];
    return `${groups}${place}`;
  }

  return text;
}

function displayTeam(event, team) {
  return event.tournament === "cs2" ? cs2Placeholder(team) : worldCupPath(team);
}

function displayStage(stage) {
  const stageMatch = stage.match(/^Stage (\d+) Round (\d+)$/);
  if (stageMatch) return `第 ${stageMatch[1]} 阶段第 ${stageMatch[2]} 轮`;
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
  if (!ranking) return "排名待定";
  const source = event.tournament === "cs2" ? "积分" : "国际足联";
  return `${source}第 ${ranking.rank} 名 · ${ranking.points} 分`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isChinaCs2Team(team) {
  return ["TYLOO", "Lynn Vision"].includes(team);
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
  if (event.tournament === "cs2" && (isChinaCs2Team(event.home) || isChinaCs2Team(event.away))) return true;
  if (isPortugalMatch(event)) return true;
  if (isStrongMatch(event)) return true;
  if (event.stage === "Final" || event.stage === "Playoffs Grand Final") return true;
  if (event.note && /晋级|淘汰|Grand final|Qualification|Elimination/.test(event.note)) return true;
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
    if (isChinaCs2Team(event.home) || isChinaCs2Team(event.away)) {
      highlights.push("中国战队比赛，建议优先关注开赛时间和赛后结果。");
    }
    if (isStrongMatch(event)) {
      highlights.push("强强对话：双方当前积分排名都在前 25，胜负含金量高。");
    }
    if (event.note && /晋级|Qualification/.test(event.note)) {
      highlights.push("晋级赛：胜者会向下一阶段名额靠近，值得实时看。");
    }
    if (event.note && /淘汰|Elimination/.test(event.note)) {
      highlights.push("淘汰赛：败者出局，比赛压力会很直接。");
    }
    if (event.stage.includes("Stage 1") && Array.isArray(event.score)) {
      highlights.push(`已结束比分 ${event.score[0]} : ${event.score[1]}，胜者是 ${event.winner}。`);
    }
    if (event.stage.includes("Stage") && !Array.isArray(event.score)) {
      highlights.push(`${stage}，当前看点是瑞士轮战绩分组和后续晋级路径。`);
    }
    if (event.stage.startsWith("Playoffs")) {
      highlights.push("淘汰赛阶段，容错率更低，适合重点追直播。");
    }
  } else {
    if (isPortugalMatch(event)) {
      highlights.push("葡萄牙比赛，按你的 Cristiano Ronaldo 偏好优先标记。");
    }
    if (isStrongMatch(event)) {
      highlights.push("强强对话：双方当前国际足联排名都在前 20。");
    } else if (homeRank && awayRank && Math.abs(homeRank - awayRank) <= 8 && Math.min(homeRank, awayRank) <= 35) {
      highlights.push("排名接近，可能是小组或淘汰路径里的胶着场。");
    }
    if (event.group) {
      highlights.push(`${GROUP_LETTERS[event.group] || event.group}组比赛，关注小组积分和出线顺位。`);
    }
    if (event.matchNo === 1) {
      highlights.push("世界杯开幕战，仪式感和揭幕节奏都值得看。");
    }
    if (isKnockoutStage(event)) {
      highlights.push(`${stage}，每一场都会直接影响晋级树走向。`);
    }
    if (event.stage === "Final") {
      highlights.push("决赛，整届赛事最后的答案。");
    }
  }

  if (homeRank && awayRank) {
    const rankName = event.tournament === "cs2" ? "积分排名" : "国际足联排名";
    highlights.push(`${homeName} ${rankName}第 ${homeRank}，${awayName} 第 ${awayRank}。`);
  }

  const { hour } = bjtParts(event);
  if (isNormalTime(event) && hour < 23) {
    highlights.push("北京时间较友好，适合正常时间观看。");
  } else if (isNormalTime(event)) {
    highlights.push("仍在正常时间筛选内，但已经接近午夜。");
  } else if (isLate(event)) {
    highlights.push("深夜场，建议提前决定是否熬夜。");
  }

  if (!highlights.length) {
    highlights.push(`${stage}，对阵或晋级路径待进一步确认。`);
  }

  return highlights;
}

function renderHighlights(event) {
  const highlights = matchHighlights(event);
  const items = highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `
    <span class="highlight-wrap" tabindex="0">
      <span class="pill highlight-trigger">看点</span>
      <span class="highlight-popover" role="tooltip">
        <strong>这场为什么值得留意</strong>
        <ul>${items}</ul>
      </span>
    </span>
  `;
}

function teamInitials(team) {
  if (team.startsWith("TBD")) return "待";
  const compact = team.replace(/[^A-Za-z0-9]/g, "");
  if (!compact) return "队";
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
          <img src="${flag}" alt="${displayTeam(event, team)}国旗" loading="lazy" decoding="async" />
        </span>
      `;
    }
    if (TEAM_FLAGS[team]) return `<span class="team-logo flag">${TEAM_FLAGS[team]}</span>`;
    return `<span class="team-logo pending-logo">晋</span>`;
  }

  const logo = CS2_LOGOS[team];
  if (logo) {
    return `
      <span class="team-logo logo-image">
        <img src="${logo}" alt="${team} 队徽" loading="lazy" decoding="async" />
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
    event.group ? `${event.group}组` : "",
    displayVenue(event.venue),
    displayCity(event.city),
    displayNote(event.note || event.status),
    STATUS_NAMES[event.status],
    rankLabel(event, event.home),
    rankLabel(event, event.away),
    isLikelyInteresting(event) ? "猜我会看 推荐 重点关注" : "",
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
  return event.tournament === "worldcup" ? "世界杯" : "CS2";
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
      <span>第 ${event.matchNo} 场</span>
      <strong>${home}</strong>
      <em>对阵</em>
      <strong>${away}</strong>
    </div>
  `;
}

function renderBracketColumn(title, events, emptyText = "待定") {
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

function renderWorldCupBracket() {
  return `
    <div class="bracket-scroll">
      <div class="bracket-tree">
        ${renderBracketColumn("三十二强赛", stageEvents("worldcup", ["Round of 32"]))}
        ${renderBracketColumn("十六强赛", stageEvents("worldcup", ["Round of 16"]))}
        ${renderBracketColumn("四分之一决赛", stageEvents("worldcup", ["Quarter-final"]))}
        ${renderBracketColumn("半决赛", stageEvents("worldcup", ["Semi-final"]))}
        ${renderBracketColumn("决赛", stageEvents("worldcup", ["Final"]))}
      </div>
    </div>
  `;
}

function renderWorldCupStandingsTable() {
  return worldCupGroupTeams()
    .map(([group, teams]) => {
      const rows = [...teams]
        .sort((a, b) => (FIFA_RANKINGS[a]?.rank || 999) - (FIFA_RANKINGS[b]?.rank || 999))
        .map((team) => `
          <tr>
            <td>${teamLogo({ tournament: "worldcup" }, team)}<span>${displayTeam({ tournament: "worldcup" }, team)}</span></td>
            <td>0</td><td>0</td><td>0</td><td>0</td>
            <td>${rankLabel({ tournament: "worldcup" }, team)}</td>
          </tr>
        `)
        .join("");
      return `
        <div class="standing-group">
          <h4>${GROUP_LETTERS[group] || group}组</h4>
          <table>
            <thead><tr><th>队伍</th><th>赛</th><th>胜</th><th>平</th><th>分</th><th>当前排名</th></tr></thead>
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
      const rows = [...teams]
        .sort((a, b) => (FIFA_RANKINGS[a]?.rank || 999) - (FIFA_RANKINGS[b]?.rank || 999))
        .map((team) => `
          <tr>
            <td>${teamLogo({ tournament: "worldcup" }, team)}<span>${displayTeam({ tournament: "worldcup" }, team)}</span></td>
            <td>0</td><td>0</td><td>0</td><td>0</td>
            <td>${rankLabel({ tournament: "worldcup" }, team)}</td>
          </tr>
        `)
        .join("");

      return `
        <div class="group-chip" tabindex="0">
          <span class="group-chip-label">${GROUP_LETTERS[group] || group}组</span>
          <div class="group-popover">
            <h4>${GROUP_LETTERS[group] || group}组</h4>
            <table>
              <thead><tr><th>队伍</th><th>赛</th><th>胜</th><th>平</th><th>分</th><th>当前排名</th></tr></thead>
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
          <h4>第一阶段</h4>
          <div class="bracket-nodes">
            ${renderCs2FlowNode("瑞士轮", "16 支队伍争夺 8 个晋级名额")}
            ${renderCs2FlowNode("晋级", "8 队进入第二阶段")}
          </div>
        </div>
        <div class="bracket-column">
          <h4>第二阶段</h4>
          <div class="bracket-nodes">
            ${renderCs2FlowNode("瑞士轮", "8 支种子队 + 8 支晋级队")}
            ${renderCs2FlowNode("晋级", "8 队进入第三阶段")}
          </div>
        </div>
        <div class="bracket-column">
          <h4>第三阶段</h4>
          <div class="bracket-nodes">
            ${renderCs2FlowNode("瑞士轮", "8 支种子队 + 8 支晋级队")}
            ${renderCs2FlowNode("晋级", "8 队进入淘汰赛")}
          </div>
        </div>
        ${renderBracketColumn("淘汰赛", stageEvents("cs2", playoffStages))}
      </div>
    </div>
  `;
}

function renderBracketArt(type) {
  const isWorldCup = type === "worldcup";
  const image = isWorldCup ? "assets/brackets/worldcup-bracket-bg.png" : "assets/brackets/cs2-bracket-bg.png";
  const alt = isWorldCup ? "世界杯晋级树视觉图" : "CS2 科隆 Major 晋级树视觉图";
  const tags = isWorldCup
    ? ["小组赛", "三十二强", "十六强", "八强", "半决赛", "决赛"]
    : ["第一阶段瑞士轮", "第二阶段瑞士轮", "第三阶段瑞士轮", "淘汰赛", "总决赛"];

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
        <a href="${item.url}" ${external ? `target="_blank" rel="noreferrer"` : ""}>查看来源</a>
      </div>
    </article>
  `;
}

function renderNewsTicker(type) {
  const items = window.NEWS_DATA?.[type] || [];
  if (!items.length) return `<div class="empty">暂时没有新闻更新。</div>`;
  const loopItems = [...items, ...items];
  return `
    <div class="news-ticker ${type}" aria-label="${type === "worldcup" ? "世界杯新闻滚播" : "CS2 科隆 Major 新闻滚播"}">
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

function chineseStageNumber(stageNumber) {
  return ["零", "一", "二", "三"][stageNumber] || stageNumber;
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
  if (record.wins >= 3) return "已晋级";
  if (record.losses >= 3) return "已淘汰";
  if (record.wins === 2) return `${record.wins}-${record.losses} 晋级赛`;
  if (record.losses === 2) return `${record.wins}-${record.losses} 淘汰赛`;
  if (record.wins === 1 && record.losses === 1) return "1-1 组";
  if (record.wins === 1) return "1-0 组";
  if (record.losses === 1) return "0-1 组";
  return "未开赛";
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
      <h4>第${chineseStageNumber(stageNumber)}阶段瑞士轮</h4>
      <table>
        <thead><tr><th>队伍</th><th>战绩</th><th>状态</th><th>当前积分排名</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderInsightBlock(type) {
  const isWorldCup = type === "worldcup";
  const title = isWorldCup ? "世界杯态势" : "CS2 科隆 Major 态势";
  const note = isWorldCup
    ? "小组赛尚未开赛，积分榜先按 0 分展示；淘汰赛对阵会随晋级结果更新。"
    : `当前显示第${chineseStageNumber(activeCs2StageNumber())}阶段战绩，积分榜已按已结束比赛自动计算胜负。`;
  const news = renderNewsTicker(type);
  const standings = isWorldCup ? renderWorldCupStandings() : renderCs2Standings();

  return `
    <article class="insight-block ${type}">
      <div class="insight-head">
        <div>
          <p class="eyebrow">${isWorldCup ? "实时新闻 · 小组积分" : "实时新闻 · 瑞士轮积分"}</p>
          <h2>${title}</h2>
        </div>
        <p>${note}</p>
      </div>
      <div class="insight-grid">
        <section class="insight-panel">
          <h3>实时新闻滚播</h3>
          ${news}
        </section>
        <section class="insight-panel">
          <h3>实时积分榜</h3>
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
  const parts = bjtParts(event);
  const late = isLate(event);
  const favorite = state.favorites.has(event.id);
  const groupText = event.group ? `${GROUP_LETTERS[event.group] || event.group}组` : "";
  const home = displayTeam(event, event.home);
  const away = displayTeam(event, event.away);
  const location = [displayVenue(event.venue), displayCity(event.city)].filter(Boolean).join(" · ");
  const note = displayNote(event.note || event.status);
  const pending = event.status.includes("待定") || home.includes("待定") || away.includes("待定");
  const scoreText = Array.isArray(event.score) ? `${event.score[0]} : ${event.score[1]}` : "";
  const winnerText = event.winner ? displayTeam(event, event.winner) : "";
  const completed = event.status === "已结束" || Boolean(scoreText && winnerText);
  const matchLabel = event.matchLabel || `第 ${event.matchNo} 场`;
  const recommended = isLikelyInteresting(event);

  return `
    <article class="match ${event.tournament} ${recommended ? "recommended" : ""}">
      <div class="time">
        <strong>${parts.time}</strong>
        <span>北京时间</span>
      </div>
      <div class="teams">
        <h2 class="matchup">
          ${renderTeam(event, event.home)}
          <span class="versus">对阵</span>
          ${renderTeam(event, event.away)}
        </h2>
        <div class="meta">
          <span class="pill tournament ${event.tournament === "cs2" ? "cs2" : ""}">${tournamentName(event)}</span>
          <span class="pill">${displayStage(event.stage)}</span>
          ${groupText ? `<span class="pill">${groupText}</span>` : ""}
          <span class="pill">${matchLabel}</span>
          ${scoreText ? `<span class="pill result">${scoreText}</span>` : ""}
          ${completed ? `<span class="pill done">已结束</span>` : ""}
          ${winnerText ? `<span class="pill win">胜者：${winnerText}</span>` : ""}
          ${recommended ? `<span class="pill recommended-pill">猜我会看</span>` : ""}
          ${late ? `<span class="pill late">深夜场</span>` : ""}
          ${pending ? `<span class="pill warn">${STATUS_NAMES[event.status] || "待定"}</span>` : ""}
        </div>
        <div class="badges">
          ${location ? `<span class="pill">${location}</span>` : ""}
          ${note ? `<span class="pill">${note}</span>` : ""}
          ${renderHighlights(event)}
        </div>
      </div>
      <button class="favorite ${favorite ? "active" : ""}" type="button" aria-label="收藏 ${home} 对阵 ${away}" data-id="${event.id}">
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
    const key = bjtParts(event).dayKey;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }

  if (!groups.size) {
    els.timeline.innerHTML = `<div class="empty">没有符合筛选条件的比赛。</div>`;
    return;
  }

  els.timeline.innerHTML = [...groups.entries()]
    .map(([day, events]) => {
      const count = `${events.length} 场`;
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
els.generatedAt.textContent = `更新数据时间：${new Date(updatedAt).toLocaleString("zh-CN", {
  timeZone: BJT,
})}`;

els.sources.innerHTML = `来源：${DATA.sources
  .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${SOURCE_NAMES[source.name] || source.name}</a>`)
  .join(" · ")}`;

render();
