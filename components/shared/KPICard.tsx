import React, { ReactNode } from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

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
    <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${accentClasses}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-sans">
          {title}
        </span>
        {icon && <div className="p-2 rounded-lg bg-slate-50 text-slate-600">{icon}</div>}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-3xl font-bold font-mono tracking-tight text-slate-900">
          {value}
        </span>
        {change && (
          <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
