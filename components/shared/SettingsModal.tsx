'use client';

import React, { useState } from 'react';
import { X, Settings, Sliders, Shield, Zap, Bell, Database, CheckCircle2, Globe, Save } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [scanInterval, setScanInterval] = useState('2');
  const [minScore, setMinScore] = useState('80');
  const [autoQualify, setAutoQualify] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState({
    UAE: true,
    KSA: true,
    India: true,
    Poland: true,
  });

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('NexaGroup Settings Saved!', {
      description: `Scan frequency set to ${scanInterval}m | Min Signal Fit: ${minScore}%`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans animate-fade-in">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">LeadPulse AI Configuration</h3>
              <p className="text-[11px] text-slate-400 font-mono">NexaGroup Sales Intelligence Parameters</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Signal Ingestion Frequency */}
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Intelligence Scanning Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Every 2 Mins (Live)', value: '2' },
                { label: 'Every 15 Mins', value: '15' },
                { label: 'Hourly Batch', value: '60' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setScanInterval(opt.value)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    scanInterval === opt.value
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Qualification Threshold */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                Minimum Hot Lead Fit Threshold
              </label>
              <span className="text-xs font-mono font-bold text-blue-600">{minScore}% Score</span>
            </div>
            <input
              type="range"
              min="60"
              max="90"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>60% (Broad)</span>
              <span>75% (Standard)</span>
              <span>90% (Strict)</span>
            </div>
          </div>

          {/* Target Regional Coverage */}
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              Target Regional Coverage
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { code: 'UAE', label: 'UAE 🇦🇪 (JAFZA, Abu Dhabi)' },
                { code: 'KSA', label: 'Saudi Arabia 🇸🇦 (NEOM, Jubail)' },
                { code: 'India', label: 'India 🇮🇳 (Gujarat, JNPT)' },
                { code: 'Poland', label: 'Poland 🇵🇱 (Katowice, Baltic)' },
              ].map((reg) => (
                <label
                  key={reg.code}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer font-medium text-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={(selectedRegions as any)[reg.code]}
                    onChange={(e) =>
                      setSelectedRegions((prev) => ({ ...prev, [reg.code]: e.target.checked }))
                    }
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>{reg.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Auto-Qualify High Intent Signals</span>
                <span className="text-[11px] text-slate-500">Automatically push 85%+ signals to Qualified queue</span>
              </div>
              <input
                type="checkbox"
                checked={autoQualify}
                onChange={(e) => setAutoQualify(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Slack & Teams Real-Time Alerts</span>
                <span className="text-[11px] text-slate-500">Instant dispatch for Meeting Request replies</span>
              </div>
              <input
                type="checkbox"
                checked={slackAlerts}
                onChange={(e) => setSlackAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
