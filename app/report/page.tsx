'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { SYSTEM_ALERTS } from '../../data/mock-report';
import { formatCurrency } from '../../lib/score-utils';
import { ScoreBadge } from '../../components/shared/ScoreBadge';
import { 
  FileText, 
  Radar, 
  Target, 
  Send, 
  MessageSquareReply, 
  CalendarCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  CheckSquare, 
  Square, 
  UserCheck, 
  Building2,
  DollarSign,
  Sparkles
} from 'lucide-react';

export default function DailyReportPage() {
  const { pipelineCards, tasks, toggleTaskCompleted } = useApp();

  // Sort top 5 opportunities by deal value
  const topOpportunities = [...pipelineCards]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Sales Intelligence Report</h1>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
              August 21, 2026 Summary
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Executive digest of real-time signals, qualified leads, active pipeline opportunities, and pending tasks.
          </p>
        </div>
      </div>

      {/* Top: Today's Summary Strip — 5 Horizontal Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm border-l-4 border-l-indigo-500 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">1. Signals Ingested</span>
            <span className="text-2xl font-bold font-mono text-slate-900">47</span>
          </div>
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Radar className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm border-l-4 border-l-blue-500 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">2. Leads Accepted</span>
            <span className="text-2xl font-bold font-mono text-slate-900">23</span>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Target className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">3. Outreach Sent</span>
            <span className="text-2xl font-bold font-mono text-slate-900">184</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <Send className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">4. Replies Classified</span>
            <span className="text-2xl font-bold font-mono text-slate-900">29</span>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <MessageSquareReply className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm border-l-4 border-l-purple-500 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">5. Meetings Booked</span>
            <span className="text-2xl font-bold font-mono text-slate-900">4</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <CalendarCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Middle Row: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Top 5 Opportunities Table */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Top 5 Pipeline Opportunities
            </h2>
            <span className="text-xs font-mono font-bold text-slate-500">Sorted by Est. Value</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Service Scope</th>
                  <th className="py-2.5 px-3">Est. Value</th>
                  <th className="py-2.5 px-3">Pipeline Stage</th>
                  <th className="py-2.5 px-3">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {topOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{opp.flag}</span>
                        <span>{opp.company}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {opp.serviceTag}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                      {formatCurrency(opp.value)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                        {opp.stage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {opp.ownerName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: System Alerts Panel */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                System Alerts & Warnings
              </h2>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {SYSTEM_ALERTS.length} Alerts
              </span>
            </div>

            <div className="space-y-3">
              {SYSTEM_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    alert.type === 'error'
                      ? 'bg-red-50/60 border-red-200 text-red-900'
                      : alert.type === 'warning'
                      ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                      : 'bg-blue-50/60 border-blue-200 text-blue-900'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {alert.type === 'error' ? (
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                    ) : alert.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-0.5">
                      <span>{alert.title}</span>
                      <span className="text-[10px] font-mono opacity-70">{alert.time}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-mono">
            <span>Automated diagnostics normal</span>
            <span className="text-emerald-600 font-bold">Health Score: 98%</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Next Actions Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              Pending Human Action Items
            </h2>
            <p className="text-xs text-slate-500">Tasks requiring sales representative review before dispatch</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            {tasks.filter((t) => !t.completed).length} Pending
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTaskCompleted(task.id)}
              className={`p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                task.completed
                  ? 'bg-slate-50 border-slate-200 text-slate-400 line-through opacity-75'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <button type="button" className="p-0.5 text-blue-600">
                  {task.completed ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                </button>
                <div>
                  <span className={`text-xs font-semibold block ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span className="font-bold text-slate-700">{task.company}</span>
                    <span>•</span>
                    <span>Assignee: {task.assignee}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Due: {task.dueDate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
