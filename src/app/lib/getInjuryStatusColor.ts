import { InjuryStatus } from '../types/InjuryStatus';

export const getInjuryStatusColor = (status?: InjuryStatus) => {
  switch (status) {
    case InjuryStatus.HEALTHY:
      return 'text-green-400';
    case InjuryStatus.QUESTIONABLE:
      return 'text-yellow-300';
    case InjuryStatus.DOUBTFUL:
      return 'text-yellow-300';
    case InjuryStatus.OUT:
      return 'text-red-500';
    default:
      return 'text-green-400';
  }
};
