import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Team colors for NFL teams
const teamColors = {
  ARI: '#97233F',
  ATL: '#A71930',
  BAL: '#241773',
  BUF: '#00338D',
  CAR: '#0085CA',
  CHI: '#0B162A',
  CIN: '#FB4F14',
  CLE: '#311D00',
  DAL: '#003594',
  DEN: '#FB4F14',
  DET: '#0076B6',
  GB: '#203731',
  HOU: '#03202F',
  IND: '#002C5F',
  JAX: '#006778',
  KC: '#E31837',
  LAC: '#0080C6',
  LAR: '#003594',
  LV: '#000000',
  MIA: '#008E97',
  MIN: '#4F2683',
  NE: '#002244',
  NO: '#D3BC8D',
  NYG: '#0B2265',
  NYJ: '#125740',
  PHI: '#004C54',
  PIT: '#FFB612',
  SEA: '#69BE28',
  SF: '#AA0000',
  TB: '#D50A0A',
  TEN: '#0C2340',
  WAS: '#5A1414',
};

async function fetchPlayers() {
  try {
    console.log('Fetching players from Sleeper API...');

    // Fetch from Sleeper API
    const response = await fetch('https://api.sleeper.app/v1/players/nfl');
    const players = await response.json();

    // Filter for active players and transform data
    const transformedPlayers = Object.values(players)
      .filter(
        (player) =>
          player.active &&
          player.position &&
          ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].includes(player.position),
      )
      .map((player, index) => ({
        id: index + 1,
        firstname: player.first_name || player.name?.split(' ')[0] || '',
        surname:
          player.last_name || player.name?.split(' ').slice(1).join(' ') || '',
        team: player.team || 'FA',
        position: player.position,
        teamColor: teamColors[player.team] || '#666666',
        photoUrl: player.photo_url || '',
        seasonStats: {
          points: player.fantasy_points_ppr || 0,
          projection: player.fantasy_points_ppr || 0,
          passingYards: player.stats?.passing_yds || 0,
          touchdowns:
            (player.stats?.passing_td || 0) +
            (player.stats?.rushing_td || 0) +
            (player.stats?.receiving_td || 0),
          interceptions: player.stats?.passing_int || 0,
          rushingYards: player.stats?.rushing_yds || 0,
          receivingYards: player.stats?.receiving_yds || 0,
        },
        weekStats: {
          points: 0,
          projection: 0,
          passingYards: 0,
          touchdowns: 0,
          interceptions: 0,
          rushingYards: 0,
          receivingYards: 0,
        },
        isProjectedToScore: true,
      }))
      .slice(0, 200); // Limit to top 200 players for performance

    const outputPath = path.join(__dirname, '../src/app/data/players.json');
    const outputData = { players: transformedPlayers };

    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log(
      `✅ Successfully saved ${transformedPlayers.length} players to ${outputPath}`,
    );
  } catch (error) {
    console.error('❌ Error fetching players:', error);
  }
}

// Run the script
fetchPlayers();
