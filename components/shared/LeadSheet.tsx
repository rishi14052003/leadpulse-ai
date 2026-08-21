'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Lead } from '../../lib/types';
import { ScoreBadge } from './ScoreBadge';
import { X, Sparkles, Clock, CheckCircle2, DollarSign, Building2, MapPin, Tag, ArrowRight } from 'lucide-react';

interface LeadSheetProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadSheet({ lead, isOpen, onClose }: LeadSheetProps) {
  const router = useRouter();

  if (!isOpen || !lead) return null;

  const handleGenerateOutreach = () => {
    onClose();
    router.push(`/outreach?company=${encodeURIComponent(lead.company)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity duration-300">
      <div 
        className="relative w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{lead.flag}</span>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">{lead.country}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-blue-400 font-medium">{lead.industry}</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{lead.company}</h2>
            <div className="mt-3 flex items-center gap-2">
              <ScoreBadge score={lead.score} size="lg" />
              <span className="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                {lead.serviceMatch}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Key Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-500 block">Target Role</span>
                <span className="font-semibold text-slate-800">{lead.decisionMakerRole}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-500 block">Est. Solution Value</span>
                <span className="font-mono font-bold text-emerald-700">{lead.budgetEst || '$350,000'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-500 block">Trigger Event</span>
                <span className="font-semibold text-slate-800">{lead.triggerType}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-500 block">Qualification Status</span>
                <span className="font-semibold text-emerald-600">{lead.status}</span>
              </div>
            </div>
          </div>

          {/* Trigger Context */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Verified Buying Signal Excerpt
            </h4>
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 leading-relaxed font-sans">
              "{lead.triggerSnippet}"
            </div>
          </div>

          {/* 5-Factor Score Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Signal Strength Factor Breakdown (5 Factors)
              </h4>
              <span className="text-xs font-mono font-bold text-slate-700">{lead.score}/100</span>
            </div>

            <div className="space-y-3.5">
              {lead.scoreFactors.map((factor, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-800">{factor.name}</span>
                    <span className="font-mono text-blue-600">{factor.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full ${
                        factor.score >= 85 ? 'bg-emerald-500' :
                        factor.score >= 70 ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600">{factor.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Intelligence Timeline
            </h4>
            <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-1">
              {lead.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-4">
                  <div className="absolute -left-[13px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                  <div className="text-[11px] font-mono text-slate-400">{event.date}</div>
                  <div className="text-xs font-semibold text-slate-800">{event.title}</div>
                  <div className="text-xs text-slate-600">{event.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleGenerateOutreach}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Generate Personalized Outreach
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
