import React from 'react';
import { getScoreBadgeStyle, getTierFromScore } from '../../lib/score-utils';

interface ScoreBadgeProps {
  score: number;
  showTierLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({ score, showTierLabel = true, size = 'md' }: ScoreBadgeProps) {
  const style = getScoreBadgeStyle(score);
  const tier = getTierFromScore(score);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-mono font-bold',
    lg: 'text-sm px-3 py-1 font-mono font-bold',
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${style} ${sizeClasses}`}>
      <span className="font-mono font-bold">{score}%</span>
      {showTierLabel && <span className="font-sans font-medium opacity-90">• {tier}</span>}
    </span>
  );
}
