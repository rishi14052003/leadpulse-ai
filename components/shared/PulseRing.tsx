'use client';

import React from 'react';

interface PulseRingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PulseRing({ className = '', size = 'md' }: PulseRingProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }[size];

  return (
    <span className={`relative flex items-center justify-center ${className}`}>
      {/* Outer animated radar ping ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
      {/* Inner solid green core */}
      <span className={`relative inline-flex rounded-full bg-emerald-500 ${sizeClasses}`} />
    </span>
  );
}
