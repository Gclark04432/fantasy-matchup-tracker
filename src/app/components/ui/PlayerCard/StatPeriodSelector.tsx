'use client';

import { BarChart3, Calendar } from 'lucide-react';
import { Button } from '../Button';

interface StatPeriodSelectorProps {
  selected: boolean;
  period: 'Season' | 'This Week';
  handleButtonClick: () => void;
}

export const StatPeriodSelector = ({
  selected,
  period,
  handleButtonClick,
}: StatPeriodSelectorProps) => {
  console.log({ selected });
  const selectableClassNames =
    'hover:cursor-pointer hover:scale-105 bg-transparent hover:bg-white/10';

  return (
    <Button
      onClick={handleButtonClick}
      className={`flex flex-1 items-center justify-center border border-white p-2 transition-all duration-300 ${!selected && selectableClassNames}`}
      disabled={selected}
    >
      {period === 'Season' ? (
        <BarChart3 className='mr-2 h-4 w-4' />
      ) : (
        <Calendar className='mr-2 h-4 w-4' />
      )}
      {period}
    </Button>
  );
};
