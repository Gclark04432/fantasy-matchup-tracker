import { PlayerPositions } from '../types/PlayerPositions';
import { StatCategories } from '../types/StatCategories';

export const getStatCategoriesByPosition = (
  position: PlayerPositions,
): StatCategories[] => {
  switch (position) {
    case PlayerPositions.QB:
      return [
        StatCategories.PASSING_YARDS,
        StatCategories.PASSING_TOUCHDOWNS,
        StatCategories.INTERCEPTIONS,
        StatCategories.RUSHING_YARDS,
      ];
    case PlayerPositions.RB:
      return [
        StatCategories.RUSHING_YARDS,
        StatCategories.RUSHING_TOUCHDOWNS,
        StatCategories.RECEPTIONS,
        StatCategories.RECEIVING_YARDS,
      ];
    case PlayerPositions.WR:
      return [
        StatCategories.RECEPTIONS,
        StatCategories.RECEIVING_YARDS,
        StatCategories.RECEIVING_TOUCHDOWNS,
        StatCategories.TARGETS,
      ];
    case PlayerPositions.TE:
      return [
        StatCategories.RECEPTIONS,
        StatCategories.RECEIVING_YARDS,
        StatCategories.RECEIVING_TOUCHDOWNS,
        StatCategories.TARGETS,
      ];
    case PlayerPositions.K:
      return [];
    case PlayerPositions.DEF:
      return [];
    default:
      return [];
  }
};
