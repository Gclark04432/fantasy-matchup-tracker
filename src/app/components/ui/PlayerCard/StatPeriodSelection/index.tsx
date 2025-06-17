'use client';
import { StatPeriodSelector } from './StatPeriodSelector';

interface StatPeriodSelectionProps {
  currentStatPeriod: 'Season' | 'This Week';
  handleStatPeriodSelectionChange: () => void;
}

export const StatPeriodSelection = ({
  currentStatPeriod,
  handleStatPeriodSelectionChange,
}: StatPeriodSelectionProps) => {
  return (
    <div className='flex gap-2'>
      <StatPeriodSelector
        selected={currentStatPeriod === 'Season'}
        period='Season'
        handleButtonClick={handleStatPeriodSelectionChange}
      />
      <StatPeriodSelector
        selected={currentStatPeriod === 'This Week'}
        period='This Week'
        handleButtonClick={handleStatPeriodSelectionChange}
      />
    </div>
  );
};
