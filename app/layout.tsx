import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { AppShell } from '../components/layout/AppShell';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LeadPulse AI | B2B Sales Intelligence Platform',
  description: 'AI B2B Lead Generation & Sales Intelligence Platform for NexaGroup',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-slate-900 antialiased font-sans">
        <AppProvider>
          <AppShell>
            {children}
          </AppShell>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#0F172A',
                color: '#FFFFFF',
                border: '1px solid #1E293B',
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
