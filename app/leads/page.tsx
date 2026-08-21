'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadCard } from '../../components/shared/LeadCard';
import { LeadSheet } from '../../components/shared/LeadSheet';
import { Target, Filter, Sparkles } from 'lucide-react';

export default function LeadQualificationPage() {
  const { leads, openLeadSheet, selectedLeadForSheet, isLeadSheetOpen, closeLeadSheet } = useApp();
  const [selectedTier, setSelectedTier] = useState<string>('All');

  const filteredLeads = leads.filter((lead) => {
    if (selectedTier === 'All') return true;
    return lead.tier === selectedTier;
  });

  const counts = {
    All: leads.length,
    Hot: leads.filter((l) => l.tier === 'Hot').length,
    Warm: leads.filter((l) => l.tier === 'Warm').length,
    Nurture: leads.filter((l) => l.tier === 'Nurture').length,
    Rejected: leads.filter((l) => l.tier === 'Rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Qualification Center</h1>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
              AI 5-Factor Scoring
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate lead intent, budget indicators, and decision maker reachability across target markets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['All', 'Hot', 'Warm', 'Nurture', 'Rejected'] as const).map((tier) => {
            const count = counts[tier];
            const isActive = selectedTier === tier;

            const badgeStyles = {
              All: isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              Hot: isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
              Warm: isActive ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
              Nurture: isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
              Rejected: isActive ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200',
            }[tier];

            return (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${badgeStyles}`}
              >
                <span>{tier === 'All' ? 'All Leads' : `${tier} (${tier === 'Hot' ? '80+' : tier === 'Warm' ? '65-79' : tier === 'Nurture' ? '45-64' : '<45'})`}</span>
                <span className="font-mono text-[11px] opacity-90 px-1.5 py-0.2 rounded-full bg-black/10">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Lead Cards (3 columns) */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <p className="italic text-sm">No leads match the selected tier filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onOpenSheet={openLeadSheet}
            />
          ))}
        </div>
      )}

      {/* Slide-over Lead Sheet */}
      <LeadSheet
        lead={selectedLeadForSheet}
        isOpen={isLeadSheetOpen}
        onClose={closeLeadSheet}
      />
    </div>
  );
}
