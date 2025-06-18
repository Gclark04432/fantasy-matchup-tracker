import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

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

function parseQBPlayer(row, id) {
  return {
    id,
    firstname: row.Player?.split(' ')[0] || '',
    surname: row.Player?.split(' ').slice(1).join(' ') || '',
    team: row.Team || '',
    position: 'QB',
    teamColor: teamColors[row.Team] || '#666666',
    photoUrl: '',
    seasonStats: {
      points: parseFloat(row.FPTS || 0),
      projection: parseFloat(row.FPTS || 0),
      passingYards: parseInt(row.YDS?.replace(/,/g, '') || 0),
      touchdowns: parseInt(row.TDS || 0),
      interceptions: parseInt(row.INTS || 0),
      rushingYards: parseInt(row['YDS.1']?.replace(/,/g, '') || 0),
      receivingYards: 0,
    },
    weekStats: {
      points: 0,
      projection: Math.round(parseFloat(row.FPTS || 0) * 0.06 * 100) / 100,
      passingYards: 0,
      touchdowns: 0,
      interceptions: 0,
      rushingYards: 0,
      receivingYards: 0,
    },
    isProjectedToScore: true,
  };
}

function parseRBPlayer(row, id) {
  return {
    id,
    firstname: row.Player?.split(' ')[0] || '',
    surname: row.Player?.split(' ').slice(1).join(' ') || '',
    team: row.Team || '',
    position: 'RB',
    teamColor: teamColors[row.Team] || '#666666',
    photoUrl: '',
    seasonStats: {
      points: parseFloat(row.FPTS || 0),
      projection: parseFloat(row.FPTS || 0),
      passingYards: 0,
      touchdowns:
        parseInt(row['RUSH TD'] || row.TDS || 0) + parseInt(row['REC TD'] || 0),
      interceptions: 0,
      rushingYards: parseInt(row['RUSH YDS']?.replace(/,/g, '') || 0),
      receivingYards: parseInt(row['REC YDS']?.replace(/,/g, '') || 0),
    },
    weekStats: {
      points: 0,
      projection: Math.round(parseFloat(row.FPTS || 0) * 0.06 * 100) / 100,
      passingYards: 0,
      touchdowns: 0,
      interceptions: 0,
      rushingYards: 0,
      receivingYards: 0,
    },
    isProjectedToScore: true,
  };
}

function parseWRPlayer(row, id) {
  return {
    id,
    firstname: row.Player?.split(' ')[0] || '',
    surname: row.Player?.split(' ').slice(1).join(' ') || '',
    team: row.Team || '',
    position: 'WR',
    teamColor: teamColors[row.Team] || '#666666',
    photoUrl: '',
    seasonStats: {
      points: parseFloat(row.FPTS || 0),
      projection: parseFloat(row.FPTS || 0),
      passingYards: 0,
      touchdowns: parseInt(row['REC TD'] || row.TDS || 0),
      interceptions: 0,
      rushingYards: parseInt(row['RUSH YDS']?.replace(/,/g, '') || 0),
      receivingYards: parseInt(row['REC YDS']?.replace(/,/g, '') || 0),
    },
    weekStats: {
      points: 0,
      projection: Math.round(parseFloat(row.FPTS || 0) * 0.06 * 100) / 100,
      passingYards: 0,
      touchdowns: 0,
      interceptions: 0,
      rushingYards: 0,
      receivingYards: 0,
    },
    isProjectedToScore: true,
  };
}

function parseTEPlayer(row, id) {
  return {
    id,
    firstname: row.Player?.split(' ')[0] || '',
    surname: row.Player?.split(' ').slice(1).join(' ') || '',
    team: row.Team || '',
    position: 'TE',
    teamColor: teamColors[row.Team] || '#666666',
    photoUrl: '',
    seasonStats: {
      points: parseFloat(row.FPTS || 0),
      projection: parseFloat(row.FPTS || 0),
      passingYards: 0,
      touchdowns: parseInt(row['REC TD'] || row.TDS || 0),
      interceptions: 0,
      rushingYards: 0,
      receivingYards: parseInt(row['REC YDS']?.replace(/,/g, '') || 0),
    },
    weekStats: {
      points: 0,
      projection: Math.round(parseFloat(row.FPTS || 0) * 0.06 * 100) / 100,
      passingYards: 0,
      touchdowns: 0,
      interceptions: 0,
      rushingYards: 0,
      receivingYards: 0,
    },
    isProjectedToScore: true,
  };
}

async function convertFantasyProsCSV() {
  try {
    console.log('Converting FantasyPros CSV to JSON...');

    const allPlayers = [];
    let playerId = 1;

    // Process each position CSV file
    const positions = [
      { file: 'fantasypros_qb.csv', parser: parseQBPlayer },
      { file: 'fantasypros_rb.csv', parser: parseRBPlayer },
      { file: 'fantasypros_wr.csv', parser: parseWRPlayer },
      { file: 'fantasypros_te.csv', parser: parseTEPlayer },
    ];

    for (const { file, parser } of positions) {
      const csvPath = path.join(__dirname, file);

      if (fs.existsSync(csvPath)) {
        console.log(`Processing ${file}...`);
        const csvContent = fs.readFileSync(csvPath, 'utf8');

        // Parse with more lenient options to handle empty rows
        const records = parse(csvContent, {
          columns: true,
          skip_empty_lines: true,
          relax_column_count: true,
          trim: true,
        });

        const players = records
          .filter(
            (row) =>
              row.Player && row.Player.trim() && row.Team && row.Team.trim(),
          ) // Filter out empty rows
          .map((row) => {
            const player = parser(row, playerId++);
            return player;
          });

        allPlayers.push(...players);
        console.log(`Added ${players.length} players from ${file}`);
      } else {
        console.log(`⚠️  ${file} not found, skipping...`);
      }
    }

    if (allPlayers.length === 0) {
      console.log(
        '❌ No CSV files found. Please download FantasyPros CSV files and place them in the scripts/ directory.',
      );
      console.log(
        'Files needed: fantasypros_qb.csv, fantasypros_rb.csv, fantasypros_wr.csv, fantasypros_te.csv',
      );
      return;
    }

    // Sort by fantasy points
    allPlayers.sort((a, b) => b.seasonStats.points - a.seasonStats.points);

    const outputPath = path.join(__dirname, '../src/app/data/players.json');
    const outputData = { players: allPlayers };

    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log(
      `✅ Successfully converted ${allPlayers.length} players to ${outputPath}`,
    );

    console.log('\nTop 10 players by fantasy points:');
    allPlayers.slice(0, 10).forEach((player, index) => {
      console.log(
        `${index + 1}. ${player.firstname} ${player.surname} (${player.team} ${player.position}): ${player.seasonStats.points} pts`,
      );
    });
  } catch (error) {
    console.error('❌ Error converting CSV:', error);
  }
}

// Run the script
convertFantasyProsCSV();
