'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Signal, 
  Lead, 
  DecisionMaker, 
  PipelineCard, 
  ReplyItem, 
  ActionTask,
  PipelineStage,
  AppNotification
} from '../lib/types';
import { INITIAL_SIGNALS } from '../data/mock-signals';
import { INITIAL_LEADS } from '../data/mock-leads';
import { INITIAL_CONTACTS } from '../data/mock-contacts';
import { INITIAL_PIPELINE_CARDS } from '../data/mock-pipeline';
import { INITIAL_REPLIES } from '../data/mock-replies';
import { INITIAL_ACTION_TASKS } from '../data/mock-report';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    type: 'signal',
    title: '⚡ New Buying Signal Detected',
    description: 'GulfGas Offshore FZE ($64M FPSO conversion package) posted PFP tender.',
    time: '10 mins ago',
    read: false,
    link: '/signals',
  },
  {
    id: 'notif-002',
    type: 'meeting',
    title: '📅 Meeting Confirmed Today',
    description: 'ZenithEnergy Co (Marcus Vance) scheduled technical presentation for 10:00 AM GST.',
    time: '45 mins ago',
    read: false,
    link: '/pipeline',
  },
  {
    id: 'notif-003',
    type: 'lead',
    title: '🎯 Hot Lead Qualified',
    description: 'AlphaSteel Industries (Score 92%) qualified and added to priority sales queue.',
    time: '2 hours ago',
    read: false,
    link: '/leads',
  },
  {
    id: 'notif-004',
    type: 'alert',
    title: '⚠️ Email Verification Failure',
    description: '3 contact lookups failed MX record verification. Action required.',
    time: '3 hours ago',
    read: true,
    link: '/report',
  },
];

interface AppContextType {
  signals: Signal[];
  leads: Lead[];
  contacts: DecisionMaker[];
  pipelineCards: PipelineCard[];
  replies: ReplyItem[];
  tasks: ActionTask[];
  notifications: AppNotification[];
  currentSystemDate: Date;
  isScanning: boolean;
  selectedLeadForSheet: Lead | null;
  isLeadSheetOpen: boolean;
  openLeadSheet: (lead: Lead) => void;
  closeLeadSheet: () => void;
  runDailyScan: () => void;
  qualifySignalAsLead: (signalId: string) => void;
  movePipelineCard: (cardId: string, newStage: PipelineStage) => void;
  assignHumanToReply: (replyId: string, ownerName: string, notes?: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  addOutreachToQueue: (company: string, channel: string, message: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateSystemDate: (date: Date) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [contacts] = useState<DecisionMaker[]>(INITIAL_CONTACTS);
  const [pipelineCards, setPipelineCards] = useState<PipelineCard[]>(INITIAL_PIPELINE_CARDS);
  const [replies, setReplies] = useState<ReplyItem[]>(INITIAL_REPLIES);
  const [tasks, setTasks] = useState<ActionTask[]>(INITIAL_ACTION_TASKS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [currentSystemDate, setCurrentSystemDate] = useState<Date>(new Date(2026, 7, 21)); // Aug 21, 2026
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const [selectedLeadForSheet, setSelectedLeadForSheet] = useState<Lead | null>(null);
  const [isLeadSheetOpen, setIsLeadSheetOpen] = useState<boolean>(false);

  const openLeadSheet = (lead: Lead) => {
    setSelectedLeadForSheet(lead);
    setIsLeadSheetOpen(true);
  };

  const closeLeadSheet = () => {
    setIsLeadSheetOpen(false);
  };

  const updateSystemDate = (date: Date) => {
    setCurrentSystemDate(date);
    toast.success(`System date set to ${format(date, 'EEE, MMM d, yyyy')}`, {
      description: 'System filters & scan timelines synced with selected date.',
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.info('All notifications marked as read');
  };

  const runDailyScan = () => {
    if (isScanning) return;
    setIsScanning(true);

    toast.info('Scanning intelligence feeds across UAE, Saudi, India & Poland...', {
      duration: 1500,
    });

    setTimeout(() => {
      // Inject new realistic signal
      const newScanSignals: Signal[] = [
        {
          id: `sig-scan-${Date.now()}-1`,
          company: 'GulfGas Offshore FZE',
          country: 'UAE',
          flag: '🇦🇪',
          triggerType: 'EPC Award',
          confidence: 97,
          source: 'Dubai Maritime Authority',
          sourceUrl: 'https://dma.gov.ae/press/gulfgas-award',
          signalDate: 'Just Now',
          sector: 'Offshore Processing',
          snippet: 'GulfGas Offshore awarded $64M FPSO conversion package requiring certified passive fire protection.',
          isNew: true,
        },
        {
          id: `sig-scan-${Date.now()}-2`,
          company: 'Al-Farabi Petrochem',
          country: 'Saudi Arabia',
          flag: '🇸🇦',
          triggerType: 'Shutdown',
          confidence: 91,
          source: 'Jubail Industrial Gazette',
          sourceUrl: 'https://jubail.gov.sa/alfarabi-turnaround',
          signalDate: 'Just Now',
          sector: 'Petrochemicals',
          snippet: 'Al-Farabi Petrochem announces 14-day emergency flare stack shutdown & PFP application RFQ.',
          isNew: true,
        }
      ];

      setSignals((prev) => [...newScanSignals, ...prev]);
      
      // Add real-time notification
      const newNotif: AppNotification = {
        id: `notif-scan-${Date.now()}`,
        type: 'signal',
        title: '⚡ Daily Scan Complete',
        description: '2 new signals found (GulfGas Offshore FZE, Al-Farabi Petrochem).',
        time: 'Just now',
        read: false,
        link: '/signals',
      };
      setNotifications((prev) => [newNotif, ...prev]);

      setIsScanning(false);

      toast.success('✅ Scan complete — 47 new signals found, 12 leads qualified!', {
        description: 'Live signal feed & notification center updated.',
        duration: 4000,
      });
    }, 1500);
  };

  const qualifySignalAsLead = (signalId: string) => {
    const signal = signals.find((s) => s.id === signalId);
    if (!signal) return;

    const exists = leads.find((l) => l.company.toLowerCase() === signal.company.toLowerCase());
    if (exists) {
      toast.info(`${signal.company} is already in Lead Qualification queue.`);
      return;
    }

    const newLead: Lead = {
      id: `lead-gen-${Date.now()}`,
      company: signal.company,
      country: signal.country,
      flag: signal.flag,
      serviceMatch: 'Passive Fire (PFP)',
      score: signal.confidence,
      tier: signal.confidence >= 80 ? 'Hot' : 'Warm',
      triggerSnippet: signal.snippet,
      triggerType: signal.triggerType,
      decisionMakerRole: 'Project / Procurement Lead',
      status: 'Qualified',
      industry: signal.sector,
      budgetEst: '$350,000',
      scoreFactors: [
        { name: 'Trigger Recency', score: 98, explanation: 'Signal captured during real-time intelligence scan.' },
        { name: 'Strategic Fit', score: 90, explanation: 'Primary requirement matches NexaGroup certified solutions.' },
        { name: 'Buying Intent', score: 88, explanation: 'Urgent project mobilization announced.' },
        { name: 'DM Reachability', score: 80, explanation: 'Corporate officer lookup pending verification.' },
        { name: 'Budget Signal', score: 85, explanation: 'High-value sector investment verified.' },
      ],
      timeline: [
        { date: 'Just Now', title: 'Manually Qualified', detail: 'Signal converted to Qualified Lead by user.' }
      ],
    };

    setLeads((prev) => [newLead, ...prev]);

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-qual-${Date.now()}`,
      type: 'lead',
      title: `🎯 ${signal.company} Qualified`,
      description: `Signal converted to Lead with ${signal.confidence}% Signal Strength.`,
      time: 'Just now',
      read: false,
      link: '/leads',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    toast.success(`Qualified ${signal.company} as Lead!`, {
      description: `Added to Lead Qualification queue with ${signal.confidence}% Signal Strength.`,
    });
  };

  const movePipelineCard = (cardId: string, newStage: PipelineStage) => {
    setPipelineCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          return { ...card, stage: newStage, daysInStage: 0 };
        }
        return card;
      })
    );
    toast.success(`Moved card to stage: ${newStage}`);
  };

  const assignHumanToReply = (replyId: string, ownerName: string, notes?: string) => {
    setReplies((prev) =>
      prev.map((rep) => {
        if (rep.id === replyId) {
          return {
            ...rep,
            assignedOwner: ownerName,
            sequenceStopped: true,
            notes: notes || 'Assigned to human team member.',
          };
        }
        return rep;
      })
    );
    toast.success(`Assigned lead to ${ownerName} & stopped automated sequence.`, {
      description: 'Handover complete.',
    });
  };

  const toggleTaskCompleted = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addOutreachToQueue = (company: string, channel: string, message: string) => {
    toast.success(`Outreach queued for ${company}!`, {
      description: `Channel: ${channel} | Added to dispatch queue.`,
    });
  };

  return (
    <AppContext.Provider
      value={{
        signals,
        leads,
        contacts,
        pipelineCards,
        replies,
        tasks,
        notifications,
        currentSystemDate,
        isScanning,
        selectedLeadForSheet,
        isLeadSheetOpen,
        openLeadSheet,
        closeLeadSheet,
        runDailyScan,
        qualifySignalAsLead,
        movePipelineCard,
        assignHumanToReply,
        toggleTaskCompleted,
        addOutreachToQueue,
        markNotificationRead,
        markAllNotificationsRead,
        updateSystemDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
