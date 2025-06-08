export const getPositionColor = (position: string) => {
    switch (position) {
      case 'QB': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'RB': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'WR': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'TE': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'K': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'DEF': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };