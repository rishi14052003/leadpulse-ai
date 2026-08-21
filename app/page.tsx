'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { KPICard } from '../components/shared/KPICard';
import { PulseRing } from '../components/shared/PulseRing';
import { ScoreBadge } from '../components/shared/ScoreBadge';
import { LeadSheet } from '../components/shared/LeadSheet';
import { 
  Radar, 
  Target, 
  CalendarCheck, 
  CircleDollarSign, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function DashboardPage() {
  const { signals, leads, openLeadSheet, selectedLeadForSheet, isLeadSheetOpen, closeLeadSheet, qualifySignalAsLead } = useApp();

  // Auto-scroll index for Live Signal Feed
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSignalIndex((prev) => (prev + 1) % Math.min(8, signals.length));
    }, 4000);
    return () => clearInterval(interval);
  }, [signals.length]);

  // Lead Quality Donut Chart Data
  const leadQualityData = [
    { name: 'Hot Leads (80+)', value: 6, color: '#EF4444' },
    { name: 'Warm Leads (65-79)', value: 5, color: '#F59E0B' },
    { name: 'Nurture Queue', value: 2, color: '#6366F1' },
    { name: 'Rejected', value: 1, color: '#94A3B8' },
  ];

  // Outreach Performance Grouped Bar Chart Data
  const outreachPerformanceData = [
    { week: 'Wk 31', Email: 140, WhatsApp: 85, LinkedIn: 110, Calls: 25 },
    { week: 'Wk 32', Email: 185, WhatsApp: 120, LinkedIn: 145, Calls: 40 },
    { week: 'Wk 33', Email: 220, WhatsApp: 160, LinkedIn: 190, Calls: 55 },
    { week: 'Wk 34', Email: 260, WhatsApp: 195, LinkedIn: 230, Calls: 70 },
  ];

  // 7-day strip calendar data
  const weekDays = [
    { day: 'Mon', date: 'Aug 18', meeting: null },
    { day: 'Tue', date: 'Aug 19', meeting: 'CrownCivil Contractors' },
    { day: 'Wed', date: 'Aug 20', meeting: null },
    { day: 'Thu', date: 'Aug 21', meeting: 'ZenithEnergy Co (10:00 AM)' },
    { day: 'Fri', date: 'Aug 22', meeting: 'ApexSafety Works (02:30 PM)' },
    { day: 'Sat', date: 'Aug 23', meeting: null },
    { day: 'Sun', date: 'Aug 24', meeting: null },
  ];

  const visibleSignals = signals.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Top Row: 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Signals Found Today"
          value={47}
          change="+18% vs yesterday"
          accentColor="indigo"
          icon={<Radar className="w-5 h-5 text-indigo-600" />}
        />
        <KPICard
          title="Genuine Leads Accepted"
          value={23}
          change="+12% match rate"
          accentColor="blue"
          icon={<Target className="w-5 h-5 text-blue-600" />}
        />
        <KPICard
          title="Meetings Confirmed"
          value={4}
          change="2 booked today"
          accentColor="emerald"
          icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />}
        />
        <KPICard
          title="Pipeline Value"
          value="$148,500"
          change="+$32k this week"
          accentColor="amber"
          icon={<CircleDollarSign className="w-5 h-5 text-amber-600" />}
        />
      </div>

      {/* Second Row: Live Signal Feed (60%) + Lead Quality Donut (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Signal Feed */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <PulseRing size="md" />
              <h2 className="font-bold text-slate-900 text-base tracking-tight">Live Intelligence Signal Feed</h2>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Auto-Scanning (4s cycle)
            </span>
          </div>

          {/* Scrolling List */}
          <div className="space-y-3 min-h-[360px]">
            {visibleSignals.map((signal, idx) => {
              const isActive = idx === activeSignalIndex;
              return (
                <div
                  key={signal.id}
                  className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isActive || signal.isNew
                      ? 'bg-emerald-50/40 border-emerald-300 shadow-md ring-1 ring-emerald-400/50'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" role="img" aria-label={signal.country}>
                      {signal.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs text-slate-900">{signal.company}</h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {signal.triggerType}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                            PING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1 italic">
                        "{signal.snippet}"
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono block mt-1">
                        {signal.source} • {signal.signalDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <ScoreBadge score={signal.confidence} size="sm" />
                    <button
                      onClick={() => qualifySignalAsLead(signal.id)}
                      className="px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors cursor-pointer"
                    >
                      Qualify
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing top 8 real-time signals</span>
            <a href="/signals" className="font-semibold text-blue-600 hover:underline inline-flex items-center">
              View All 47 Signals <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Lead Quality Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <h2 className="font-bold text-slate-900 text-base tracking-tight">Lead Quality Distribution</h2>
              <span className="text-xs font-mono text-slate-500">14 Active Leads</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadQualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {leadQualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
            {leadQualityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium">{item.name}:</span>
                <span className="font-mono font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row: Outreach Performance (Grouped Bar) + Meetings This Week (Strip Calendar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Outreach Performance */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-base tracking-tight">Outreach Channel Performance</h2>
              <p className="text-xs text-slate-500">Dispatches by channel across August 2026</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
              +24% Response Rate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outreachPerformanceData}>
                <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Email" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="WhatsApp" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="LinkedIn" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Calls" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meetings This Week Calendar */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="font-bold text-slate-900 text-base tracking-tight">Meetings Scheduled This Week</h2>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                4 Booked
              </span>
            </div>

            {/* 7-Day Strip */}
            <div className="grid grid-cols-7 gap-1.5 py-2">
              {weekDays.map((wd) => {
                const hasMeeting = Boolean(wd.meeting);
                return (
                  <div
                    key={wd.day}
                    className={`p-2 rounded-xl text-center border flex flex-col items-center justify-between h-28 relative group transition-all ${
                      hasMeeting 
                        ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400/40' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 block uppercase">{wd.day}</span>
                      <span className="text-xs font-semibold text-slate-800 block">{wd.date.split(' ')[1]}</span>
                    </div>

                    {hasMeeting ? (
                      <div className="my-auto flex flex-col items-center">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-sm" />
                        <span className="text-[10px] text-emerald-700 font-bold mt-1">Booked</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 my-auto">—</span>
                    )}

                    {/* Tooltip on hover */}
                    {hasMeeting && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-20 w-44 p-2 bg-slate-900 text-white rounded-lg shadow-xl text-[11px] font-medium leading-tight">
                        <span className="text-emerald-400 font-bold block mb-0.5">Meeting Confirmed</span>
                        {wd.meeting}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Next meeting: ZenithEnergy Co today</span>
            <a href="/pipeline" className="text-xs font-semibold text-blue-600 hover:underline">
              View CRM Pipeline →
            </a>
          </div>
        </div>
      </div>

      {/* Lead Sheet Slide-Over */}
      <LeadSheet
        lead={selectedLeadForSheet}
        isOpen={isLeadSheetOpen}
        onClose={closeLeadSheet}
      />
    </div>
  );
}
