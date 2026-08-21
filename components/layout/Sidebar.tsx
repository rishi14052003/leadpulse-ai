'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Radar, 
  Target, 
  Users, 
  Send, 
  Kanban, 
  MessageSquareReply, 
  FileText, 
  Settings,
  Building2,
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Signal Discovery', href: '/signals', icon: Radar },
  { label: 'Lead Qualification', href: '/leads', icon: Target },
  { label: 'Decision Makers', href: '/decision-makers', icon: Users },
  { label: 'Outreach Generator', href: '/outreach', icon: Send },
  { label: 'CRM Pipeline', href: '/pipeline', icon: Kanban },
  { label: 'Reply Intelligence', href: '/replies', icon: MessageSquareReply },
  { label: 'Daily Report', href: '/report', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-60 bg-slate-900 text-white flex flex-col justify-between z-40 border-r border-slate-800 font-sans shadow-xl">
      {/* Top Section */}
      <div>
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block leading-none">
                LeadPulse <span className="text-blue-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase block mt-1">
                Sales Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="py-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname ? (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) : false;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-blue-600/15 text-white border-l-4 border-blue-500 font-bold pl-2.5'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User / Company Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold font-mono text-xs text-slate-200">
              NG
            </div>
            <div>
              <span className="text-xs font-bold text-slate-200 block leading-tight">NexaGroup</span>
              <span className="text-[10px] text-slate-400 block font-mono">Enterprise Portal</span>
            </div>
          </div>

          <button 
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
