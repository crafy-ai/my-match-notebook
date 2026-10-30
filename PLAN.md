# Match Schedule Web Plan

## Goal

Build a locally browsable match schedule page that collects the 2026 World Cup and CS2 IEM Cologne Major 2026 fixtures. All times are displayed in US Eastern Time (ET) so matches can be filtered, favorited, and planned around a North American viewing schedule.

## Data Scope

- World Cup: the full 104-match schedule. Group-stage matches show confirmed teams; knockout matches show the advancement path before results exist, for example `Match 101 Winner`.
- CS2 Cologne Major: official stage format and currently announced start times. First-round and directly invited teams are confirmed; later Swiss-stage pairings are marked `TBD` because they are generated from previous results.

## Data Sources

- FIFA official tournament page: confirms the 2026 World Cup events, stages, and schedule structure.
- MatchTimes World Cup schedule: reads UTC kickoff times, match numbers, teams/advancement paths, venues, and cities match by match.
- FIFA official ranking API: records the current men's national team rankings and points published on 2026-04-01.
- FlagCDN flag SVGs: saves World Cup national flags locally under `assets/teams/worldcup/` to avoid emoji flag rendering issues.
- CS2 Major official site and public ESL/IEM information: confirms IEM Cologne Major 2026 dates, stages, and venues.
- HLTV Valve Global Ranking / Strafe event guide: fills in current CS2 ratings, stage start windows, and announced matchups.
- CS2 Major official team API: downloads official CS2 team logos to `assets/teams/cs2/`.

## Feature Plan

- Homepage overview: total matches, the next upcoming match, favorites count, and late-night match count.
- Tab filters: World Cup, CS2, and All.
- Text search: search by team, stage, venue, or city.
- Quick filters: future matches only, favorites only, and late-night matches after 23:00 ET.
- Favorites: save matches you want to watch in browser `localStorage`.
- Key information: each match shows the ET date, time, weekday, teams, stage, venue, and data status.
- Team information: national teams show flags and FIFA rankings; CS2 teams show logo treatment and current rating rank.
- Tournament picture: a bracket and live standings for the World Cup and CS2 Major below the filter bar; before matches start, the initial 0-point / 0-0 state is shown, with results updated later.
- Bracket visuals: generated images provide the World Cup and CS2 Major bracket backgrounds, while stage labels and standings stay in HTML to avoid overly rigid pure-HTML trees.
- World Cup standings interaction: only group labels are shown by default; hovering or focusing expands the full group table, and it collapses when the pointer leaves.
- Data maintenance: keep `scripts/build-data.mjs` so `data.js` can be regenerated when the schedule changes.

## Execution Steps

1. Fetch the full World Cup schedule and generate a unified data structure.
2. Organize CS2 Cologne Major stage schedules and pending matchups.
3. Build the static UI, filters, search, and favorites.
4. Open the local page in a browser for a basic visual check.
5. Record sources and maintenance notes for future extensions.
