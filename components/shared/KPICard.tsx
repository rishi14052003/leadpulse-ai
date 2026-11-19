import React, { ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  accentColor?: 'indigo' | 'blue' | 'green' | 'amber' | 'emerald';
  icon?: ReactNode;
}

export function KPICard({ title, value, change, accentColor = 'indigo', icon }: KPICardProps) {
  const accentClasses = {
    indigo: 'border-l-indigo-500 text-indigo-600 bg-indigo-50/50',
    blue: 'border-l-blue-500 text-blue-600 bg-blue-50/50',
    green: 'border-l-emerald-500 text-emerald-600 bg-emerald-50/50',
    amber: 'border-l-amber-500 text-amber-600 bg-amber-50/50',
    emerald: 'border-l-emerald-500 text-emerald-600 bg-emerald-50/50',
  }[accentColor];

  return (
    <div className={`min-h-[148px] bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${accentClasses}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="min-w-0 text-xs font-semibold uppercase tracking-wider leading-snug text-slate-500 font-sans">
          {title}
        </span>
        {icon && <div className="shrink-0 p-2 rounded-lg bg-slate-50 text-slate-600">{icon}</div>}
      </div>

      <div className="mt-4 flex flex-col items-start">
        <span className="text-3xl font-bold font-mono tracking-tight text-slate-900">
          {value}
        </span>
        {change && (
          <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3 shrink-0" />
            <span className="truncate">{change}</span>
          </span>
        )}
      </div>
    </div>
  );
}
