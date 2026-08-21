'use client';

import React from 'react';
import { Lead } from '../../lib/types';
import { ScoreBadge } from './ScoreBadge';
import { ExternalLink, UserCheck, Zap } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onOpenSheet: (lead: Lead) => void;
}

export function LeadCard({ lead, onOpenSheet }: LeadCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label={lead.country}>{lead.flag}</span>
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
              {lead.company}
            </h3>
          </div>
          <button 
            onClick={() => onOpenSheet(lead)} 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title="View Score Breakdown"
          >
            <ScoreBadge score={lead.score} />
          </button>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            {lead.serviceMatch}
          </span>
          <span className="inline-flex items-center text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
            <Zap className="w-3 h-3 mr-1 text-amber-500" />
            {lead.triggerType}
          </span>
        </div>

        {/* Trigger Snippet */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          "{lead.triggerSnippet}"
        </p>

        {/* Decision Maker Role */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Role: <strong className="text-slate-800 font-semibold">{lead.decisionMakerRole}</strong></span>
        </div>
      </div>

      {/* Bottom Footer & 5-Segment Score Mini-Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {/* 5-segment mini progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
            <span>5-Factor Signal Fit</span>
            <span className="font-bold text-slate-700">{lead.score}/100</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {lead.scoreFactors.map((factor, idx) => {
              const segColor = 
                factor.score >= 85 ? 'bg-emerald-500' :
                factor.score >= 70 ? 'bg-amber-500' :
                factor.score >= 50 ? 'bg-indigo-400' : 'bg-slate-300';
              return (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full ${segColor}`}
                  title={`${factor.name}: ${factor.score}%`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            {lead.status}
          </span>

          <button
            onClick={() => onOpenSheet(lead)}
            className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors cursor-pointer"
          >
            View Full Lead
            <ExternalLink className="w-3 h-3 ml-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
