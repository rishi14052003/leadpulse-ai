import { LeadTier } from './types';

export function getTierFromScore(score: number): LeadTier {
  if (score >= 80) return 'Hot';
  if (score >= 65) return 'Warm';
  if (score >= 45) return 'Nurture';
  return 'Rejected';
}

export function getScoreBadgeStyle(score: number): string {
  if (score >= 80) return 'bg-red-50 text-red-600 border-red-200';
  if (score >= 65) return 'bg-amber-50 text-amber-600 border-amber-200';
  if (score >= 45) return 'bg-indigo-50 text-indigo-600 border-indigo-200';
  return 'bg-slate-100 text-slate-600 border-slate-200';
}

export function getScoreProgressColor(score: number): string {
  if (score >= 80) return 'bg-red-500';
  if (score >= 65) return 'bg-amber-500';
  if (score >= 45) return 'bg-indigo-500';
  return 'bg-slate-400';
}

export function getClassificationBadgeStyle(classification: string): string {
  switch (classification) {
    case 'Meeting Request':
      return 'bg-blue-50 text-blue-700 border-blue-200 font-semibold';
    case 'Positive Reply':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
    case 'Not Now':
      return 'bg-amber-50 text-amber-700 border-amber-200 font-semibold';
    case 'Wrong Person':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'Opt-Out':
      return 'bg-red-50 text-red-700 border-red-200 line-through opacity-80';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export function getConfidenceBadgeStyle(confidence: string | number): string {
  if (typeof confidence === 'number') {
    if (confidence >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (confidence >= 70) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }
  switch (confidence) {
    case 'Verified':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Likely':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Uncertain':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
