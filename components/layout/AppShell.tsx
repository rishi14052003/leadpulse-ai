'use client';

import React, { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      <TopBar
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((open) => !open)}
      />
      <main className="min-h-screen bg-slate-50/50 pt-16 md:pl-60">
        <div className="mx-auto max-w-[1400px] space-y-5 p-3 sm:p-4 lg:space-y-6 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
