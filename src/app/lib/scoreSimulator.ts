import { getAllPlayers } from './playerSearch';

export class ScoreSimulator {
  private static intervals: Map<number, NodeJS.Timeout> = new Map();
  private static isRunning = false;

  // Start simulating score updates for all players
  static startSimulation(
    onScoreUpdate: (playerId: number, newPoints: number) => void,
  ) {
    if (this.isRunning) return;

    this.isRunning = true;
    const allPlayers = getAllPlayers();

    allPlayers.forEach((player) => {
      this.schedulePlayerUpdate(player.id, onScoreUpdate);
    });

    console.log(`Started score simulation for ${allPlayers.length} players`);
  }

  // Stop all simulations
  static stopSimulation() {
    this.isRunning = false;
    this.intervals.forEach((interval) => clearTimeout(interval));
    this.intervals.clear();
    console.log('Stopped score simulation');
  }

  // Schedule a random update for a specific player
  private static schedulePlayerUpdate(
    playerId: number,
    onScoreUpdate: (playerId: number, newPoints: number) => void,
  ) {
    if (!this.isRunning) return;

    // Random timeout between 5 and 30 seconds
    const timeout = Math.random() * 25000 + 5000;

    const interval = setTimeout(() => {
      this.updatePlayerScore(playerId, onScoreUpdate);
      // Schedule next update
      this.schedulePlayerUpdate(playerId, onScoreUpdate);
    }, timeout);

    this.intervals.set(playerId, interval);
  }

  // Update a player's score with a random change
  private static updatePlayerScore(
    playerId: number,
    onScoreUpdate: (playerId: number, newPoints: number) => void,
  ) {
    const allPlayers = getAllPlayers();
    const player = allPlayers.find((p) => p.id === playerId);

    if (!player) return;

    // Generate a random score change (-5 to +10 points)
    const scoreChange = Math.floor(Math.random() * 16) - 5;

    // Update both season and week stats
    const newSeasonPoints = Math.max(
      0,
      player.seasonStats.points + scoreChange,
    );
    const newWeekPoints = Math.max(0, player.weekStats.points + scoreChange);

    // Update the player object
    player.seasonStats.points = Math.round(newSeasonPoints * 100) / 100;
    player.weekStats.points = Math.round(newWeekPoints * 100) / 100;

    // Notify the component about the update
    onScoreUpdate(playerId, player.seasonStats.points);

    console.log(
      `Updated ${player.firstname} ${player.surname}: ${scoreChange > 0 ? '+' : ''}${scoreChange} points`,
    );
  }

  // Get simulation status
  static isSimulationRunning(): boolean {
    return this.isRunning;
  }

  // Get number of active intervals
  static getActiveIntervalsCount(): number {
    return this.intervals.size;
  }
}
