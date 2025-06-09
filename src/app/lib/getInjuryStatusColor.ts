import { InjuryStatus } from '../types/InjuryStatus';

export const getInjuryStatusColor = (status?: InjuryStatus) => {
  switch (status) {
    case InjuryStatus.HEALTHY:
      return 'fantasy-success';
    case InjuryStatus.QUESTIONABLE:
      return 'fantasy-warning';
    case InjuryStatus.DOUBTFUL:
      return 'fantasy-warning';
    case InjuryStatus.OUT:
      return 'fantasy-danger';
    default:
      return 'fantasy-success';
  }
};
