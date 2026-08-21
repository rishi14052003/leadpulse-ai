'use client';

import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Sidebar />
      <TopBar />
      <main className="pl-60 pt-16 min-h-screen bg-slate-50/50">
        <div className="max-w-[1400px] mx-auto p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
