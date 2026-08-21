'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Country, TriggerType } from '../../lib/types';
import { ScoreBadge } from '../../components/shared/ScoreBadge';
import { 
  Radar, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Filter, 
  Search,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function SignalDiscoveryPage() {
  const { signals, runDailyScan, isScanning, qualifySignalAsLead } = useApp();

  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedTrigger, setSelectedTrigger] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSignalId, setExpandedSignalId] = useState<string | null>(null);
  const [watchedSignals, setWatchedSignals] = useState<Record<string, boolean>>({});

  // Filter signals
  const filteredSignals = signals.filter((signal) => {
    if (selectedCountry !== 'All' && signal.country !== selectedCountry) return false;
    if (selectedTrigger !== 'All' && signal.triggerType !== selectedTrigger) return false;
    if (selectedSector !== 'All' && signal.sector !== selectedSector) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchCompany = signal.company.toLowerCase().includes(q);
      const matchSnippet = signal.snippet.toLowerCase().includes(q);
      if (!matchCompany && !matchSnippet) return false;
    }
    return true;
  });

  // Extract unique sectors for dropdown
  const sectors = Array.from(new Set(signals.map((s) => s.sector)));

  const toggleWatch = (id: string, company: string) => {
    setWatchedSignals((prev) => {
      const next = !prev[id];
      if (next) {
        toast.info(`Added ${company} to Watchlist`);
      } else {
        toast.info(`Removed ${company} from Watchlist`);
      }
      return { ...prev, [id]: next };
    });
  };

  const toggleExpandRow = (id: string) => {
    setExpandedSignalId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Signal Discovery Engine</h1>
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Real-Time Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {signals.length} buying signals detected across target Middle East & EU enterprise markets.
          </p>
        </div>

        <button
          onClick={runDailyScan}
          disabled={isScanning}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-75"
        >
          <Radar className={`w-4 h-4 text-white ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Feeds...' : 'Run Intelligence Scan'}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filter Signals</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search company or signal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country Filter */}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="All">All Countries (UAE, KSA, IN, PL)</option>
              <option value="UAE">UAE 🇦🇪</option>
              <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
              <option value="India">India 🇮🇳</option>
              <option value="Poland">Poland 🇵🇱</option>
            </select>
          </div>

          {/* Trigger Type Filter */}
          <div>
            <select
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="All">All Trigger Types</option>
              <option value="EPC Award">EPC Award</option>
              <option value="Market Entry">Market Entry</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Shutdown">Shutdown</option>
              <option value="Tender">Tender</option>
              <option value="Hiring">Hiring</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="All">All Sectors</option>
              {sectors.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Signal Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 w-8"></th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Trigger Type</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Signal Date</th>
                <th className="py-3 px-4">Signal Strength</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSignals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 italic font-sans">
                    No signals found matching your filter criteria — click "Run Intelligence Scan" to refresh feeds.
                  </td>
                </tr>
              ) : (
                filteredSignals.map((signal) => {
                  const isExpanded = expandedSignalId === signal.id;
                  const isWatched = watchedSignals[signal.id];

                  return (
                    <React.Fragment key={signal.id}>
                      <tr className={`hover:bg-slate-50/80 transition-colors ${isExpanded ? 'bg-slate-50/90' : ''}`}>
                        {/* Chevron Expand Toggle */}
                        <td className="py-3 px-4 text-slate-400">
                          <button
                            onClick={() => toggleExpandRow(signal.id)}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500 cursor-pointer"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </td>

                        {/* Company */}
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span>{signal.company}</span>
                            {signal.isNew && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500" title="New Signal" />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono font-normal block">{signal.sector}</span>
                        </td>

                        {/* Country */}
                        <td className="py-3 px-4 font-medium text-slate-700">
                          <span className="mr-1.5 text-base">{signal.flag}</span>
                          {signal.country}
                        </td>

                        {/* Trigger Type Badge */}
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {signal.triggerType}
                          </span>
                        </td>

                        {/* Source */}
                        <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                          {signal.source}
                        </td>

                        {/* Signal Date */}
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                          {signal.signalDate}
                        </td>

                        {/* Confidence / Signal Strength */}
                        <td className="py-3 px-4">
                          <ScoreBadge score={signal.confidence} size="sm" showTierLabel={false} />
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleWatch(signal.id, signal.company)}
                              className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                                isWatched
                                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                              }`}
                              title={isWatched ? 'Unwatch Company' : 'Watch Company'}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => qualifySignalAsLead(signal.id)}
                              className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              Qualify Lead
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Monospace Row */}
                      {isExpanded && (
                        <tr className="bg-slate-900 text-white border-b border-slate-800">
                          <td colSpan={8} className="p-4">
                            <div className="space-y-2 font-mono text-xs">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                                <span>RAW SIGNAL EXCERPT • ID: {signal.id}</span>
                                <a
                                  href={signal.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                                >
                                  Verify Source Link <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                              <p className="text-emerald-300 leading-relaxed pt-1">
                                "{signal.snippet}"
                              </p>
                              <div className="text-[11px] text-slate-400 pt-2 flex items-center gap-4">
                                <span>Sector: <strong className="text-white">{signal.sector}</strong></span>
                                <span>Signal Confidence: <strong className="text-emerald-400">{signal.confidence}%</strong></span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
