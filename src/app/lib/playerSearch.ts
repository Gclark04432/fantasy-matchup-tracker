import playersData from '../data/players.json';
import { Player } from '../types/Player';

// Load all players from the JSON file
export const getAllPlayers = (): Player[] => {
  return playersData.players;
};

// Search players by name (firstname, surname, or full name)
export const searchPlayers = (query: string): Player[] => {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const allPlayers = getAllPlayers();

  return allPlayers.filter((player) => {
    const fullName = `${player.firstname} ${player.surname}`.toLowerCase();
    const firstName = player.firstname.toLowerCase();
    const lastName = player.surname.toLowerCase();

    return (
      fullName.includes(searchTerm) ||
      firstName.includes(searchTerm) ||
      lastName.includes(searchTerm)
    );
  });
};

// Search players by position
export const searchPlayersByPosition = (position: string): Player[] => {
  const allPlayers = getAllPlayers();
  return allPlayers.filter(
    (player) => player.position.toLowerCase() === position.toLowerCase(),
  );
};

// Search players by team
export const searchPlayersByTeam = (team: string): Player[] => {
  const allPlayers = getAllPlayers();
  return allPlayers.filter(
    (player) => player.team.toLowerCase() === team.toLowerCase(),
  );
};

// Get player by ID
export const getPlayerById = (id: number): Player | undefined => {
  const allPlayers = getAllPlayers();
  return allPlayers.find((player) => player.id === id);
};

// Get top players by fantasy points
export const getTopPlayers = (limit: number = 10): Player[] => {
  const allPlayers = getAllPlayers();
  return allPlayers
    .sort((a, b) => b.seasonStats.points - a.seasonStats.points)
    .slice(0, limit);
};

// Get players by position with top performers
export const getTopPlayersByPosition = (
  position: string,
  limit: number = 5,
): Player[] => {
  const positionPlayers = searchPlayersByPosition(position);
  return positionPlayers
    .sort((a, b) => b.seasonStats.points - a.seasonStats.points)
    .slice(0, limit);
};

// Get players by array of IDs
export const getPlayersByIds = (playerIds: number[]): Player[] => {
  const allPlayers = getAllPlayers();
  const filteredPlayers = allPlayers.filter((player) =>
    playerIds.includes(player.id),
  );
  return filteredPlayers;
};
