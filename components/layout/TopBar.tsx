'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { PulseRing } from '../shared/PulseRing';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from 'date-fns';
import { 
  Radar, 
  Bell, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  CheckCheck, 
  Target, 
  CalendarCheck, 
  AlertTriangle, 
  Sparkles,
  X
} from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Executive Dashboard',
  '/signals': 'Signal Discovery',
  '/leads': 'Lead Qualification',
  '/decision-makers': 'Decision Maker Mapping',
  '/outreach': 'AI Outreach Generator',
  '/pipeline': 'CRM Pipeline Kanban',
  '/replies': 'Reply Intelligence Inbox',
  '/report': 'Daily Performance Report',
};

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    runDailyScan, 
    isScanning, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    currentSystemDate,
    updateSystemDate
  } = useApp();

  const title = (pathname && PAGE_TITLES[pathname]) || 'Sales Intelligence';

  // Popover State
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Date Picker month view state
  const [pickerMonth, setPickerMonth] = useState<Date>(currentSystemDate);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Generate calendar days for date picker
  const monthStart = startOfMonth(pickerMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleSelectDate = (date: Date) => {
    updateSystemDate(date);
    setIsDatePickerOpen(false);
  };

  const handleNotificationClick = (notifId: string, link?: string) => {
    markNotificationRead(notifId);
    if (link) {
      setIsNotificationsOpen(false);
      router.push(link);
    }
  };

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-slate-200 z-30 px-6 flex items-center justify-between shadow-2xs font-sans">
      {/* Page Title */}
      <h1 className="text-lg font-bold text-slate-900 tracking-tight">
        {title}
      </h1>

      {/* Center Live Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono shadow-2xs">
        <PulseRing size="sm" />
        <span className="font-semibold text-slate-800">System Active</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500">Last scan: 2 min ago</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date Picker Button / Pill */}
        <div className="relative" ref={datePickerRef}>
          <button
            onClick={() => {
              setIsDatePickerOpen(!isDatePickerOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-98"
            title="System Date Filter (Click to change date)"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{format(currentSystemDate, 'EEE, MMM d, yyyy')}</span>
          </button>

          {/* Interactive Date Picker Popover Dropdown */}
          {isDatePickerOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <span className="text-xs font-mono font-bold uppercase text-slate-500">
                  Select System Date
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPickerMonth(subMonths(pickerMonth, 1))}
                    className="p-1 rounded hover:bg-slate-100 text-slate-600"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-900 font-mono px-1">
                    {format(pickerMonth, 'MMM yyyy')}
                  </span>
                  <button
                    onClick={() => setPickerMonth(addMonths(pickerMonth, 1))}
                    className="p-1 rounded hover:bg-slate-100 text-slate-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-xs">
                {calendarDays.map((day) => {
                  const isSelected = isSameDay(day, currentSystemDate);
                  const isCurrentMonth = isSameMonth(day, pickerMonth);
                  const isTodayDay = isToday(day);

                  return (
                    <button
                      key={day.toString()}
                      onClick={() => handleSelectDate(day)}
                      className={`h-8 w-full rounded-lg text-center font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : isTodayDay
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                          : isCurrentMonth
                          ? 'text-slate-800 hover:bg-slate-100'
                          : 'text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>

              {/* Presets */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleSelectDate(new Date(2026, 7, 21))}
                  className="text-blue-600 hover:underline font-semibold font-mono text-[11px]"
                >
                  Today (Aug 21)
                </button>
                <button
                  onClick={() => handleSelectDate(new Date(2026, 7, 22))}
                  className="text-slate-600 hover:underline font-medium font-mono text-[11px]"
                >
                  Tomorrow
                </button>
                <button
                  onClick={() => handleSelectDate(new Date(2026, 7, 28))}
                  className="text-slate-600 hover:underline font-medium font-mono text-[11px]"
                >
                  Next Week
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell Button */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsDatePickerOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 bg-slate-50 shadow-2xs active:scale-95"
            title="Notifications Center"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
              {/* Header */}
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-xs text-white">System Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-blue-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-blue-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 italic">
                    No system notifications.
                  </div>
                ) : (
                  notifications.map((n) => {
                    const iconMap = {
                      signal: <Radar className="w-3.5 h-3.5 text-indigo-600" />,
                      lead: <Target className="w-3.5 h-3.5 text-blue-600" />,
                      meeting: <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />,
                      alert: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
                    }[n.type];

                    return (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n.id, n.link)}
                        className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                          !n.read ? 'bg-blue-50/40 font-medium' : 'bg-white'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                          {iconMap}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 text-xs">{n.title}</span>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                            {n.description}
                          </p>
                        </div>

                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" title="Unread" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                >
                  Close Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Run Daily Scan Button */}
        <button
          onClick={runDailyScan}
          disabled={isScanning}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-75"
        >
          <Radar className={`w-4 h-4 text-white ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Feeds...' : 'Run Daily Scan'}</span>
        </button>
      </div>
    </header>
  );
}
