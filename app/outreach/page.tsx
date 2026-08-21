'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Channel, Tone, TriggerType } from '../../lib/types';
import { generateOutreachMessage, GeneratedMessage } from '../../lib/message-templates';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Sparkles, 
  Check, 
  Copy, 
  Info, 
  Clock, 
  FileText,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

function OutreachContent() {
  const searchParams = useSearchParams();
  const initialCompany = searchParams?.get('company') || '';
  const initialContact = searchParams?.get('contact') || '';

  const { leads, contacts, addOutreachToQueue } = useApp();

  // Selected Lead state
  const [selectedLeadId, setSelectedLeadId] = useState<string>(() => {
    if (initialCompany) {
      const match = leads.find((l) => l.company.toLowerCase() === initialCompany.toLowerCase());
      if (match) return match.id;
    }
    return leads[0]?.id || '';
  });

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  // Available decision makers for this company
  const companyContacts = contacts.filter((c) => c.companyId === selectedLead?.id);
  
  const [selectedContactName, setSelectedContactName] = useState<string>(() => {
    if (initialContact) return initialContact;
    return companyContacts[0]?.name || 'James Harrington';
  });

  const selectedContact = companyContacts.find((c) => c.name === selectedContactName) || companyContacts[0] || {
    name: selectedContactName || 'James Harrington',
    title: selectedLead?.decisionMakerRole || 'Project Director',
    email: 'contact@company.com',
  };

  useEffect(() => {
    if (companyContacts.length > 0 && !companyContacts.some(c => c.name === selectedContactName)) {
      setSelectedContactName(companyContacts[0].name);
    }
  }, [selectedLeadId]);

  const [channel, setChannel] = useState<Channel>('Email');
  const [tone, setTone] = useState<Tone>('Professional');
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate Message Output
  const messageData: GeneratedMessage = generateOutreachMessage({
    company: selectedLead?.company || 'AlphaSteel Industries',
    contactName: selectedContact?.name || 'James Harrington',
    contactTitle: selectedContact?.title || 'Project Director',
    triggerType: selectedLead?.triggerType || 'EPC Award',
    serviceMatch: selectedLead?.serviceMatch || 'Passive Fire (PFP)',
    channel,
    tone,
  });

  const handleCopy = () => {
    const fullText = messageData.subject 
      ? `Subject: ${messageData.subject}\n\n${messageData.body}` 
      : messageData.body;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    toast.success('Message copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendNow = () => {
    addOutreachToQueue(selectedLead.company, channel, messageData.body);
  };

  const handleAddToQueue = () => {
    addOutreachToQueue(selectedLead.company, channel, messageData.body);
  };

  // Helper function to render body text with blue inline token chips
  const renderMessageBodyWithChips = (bodyText: string) => {
    const tokenList = [
      { placeholder: '[Company Name]', value: selectedLead?.company || 'AlphaSteel Industries' },
      { placeholder: '[Trigger Event]', value: selectedLead?.triggerSnippet || 'recent EPC package award' },
      { placeholder: '[Service Match]', value: selectedLead?.serviceMatch || 'Passive Fire (PFP)' },
      { placeholder: '[Decision Maker Title]', value: selectedContact?.title || 'Project Director' },
    ];

    // Split paragraphs
    const paragraphs = bodyText.split('\n');

    return paragraphs.map((para, pIdx) => {
      if (!para.trim()) return <br key={pIdx} />;

      let parts: (string | React.ReactNode)[] = [para];

      tokenList.forEach((t) => {
        const nextParts: (string | React.ReactNode)[] = [];
        parts.forEach((part) => {
          if (typeof part !== 'string') {
            nextParts.push(part);
            return;
          }

          const splitArr = part.split(t.placeholder);
          splitArr.forEach((str, sIdx) => {
            nextParts.push(str);
            if (sIdx < splitArr.length - 1) {
              nextParts.push(
                <span
                  key={`${t.placeholder}-${sIdx}`}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300 font-mono mx-1 shadow-2xs"
                  title={`Token: ${t.placeholder}`}
                >
                  {t.value}
                </span>
              );
            }
          });
        });
        parts = nextParts;
      });

      return (
        <p key={pIdx} className="mb-3 text-slate-800 leading-relaxed">
          {parts}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Multi-Channel Outreach Generator</h1>
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200 font-mono">
              Smart Personalization Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate high-conversion touchpoints tailored by trigger event, decision maker role, channel, and tone.
          </p>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel — Controls */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Outreach Parameters
          </h2>

          {/* Target Lead Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 font-mono mb-1.5 uppercase">
              1. Target Client Lead
            </label>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.flag} {l.company} ({l.serviceMatch} • {l.score}% Fit)
                </option>
              ))}
            </select>
          </div>

          {/* Target Decision Maker Contact Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 font-mono mb-1.5 uppercase">
              2. Target Decision Maker Contact
            </label>
            {companyContacts.length > 0 ? (
              <select
                value={selectedContactName}
                onChange={(e) => setSelectedContactName(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {companyContacts.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.title}) — {c.emailStatus}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={selectedContactName}
                onChange={(e) => setSelectedContactName(e.target.value)}
                placeholder="Enter contact name"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Channel Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 font-mono mb-1.5 uppercase">
              3. Channel Selector
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setChannel('Email')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  channel === 'Email' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('WhatsApp')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  channel === 'WhatsApp' ? 'bg-white text-emerald-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('LinkedIn')}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  channel === 'LinkedIn' ? 'bg-white text-indigo-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 font-mono mb-1.5 uppercase">
              4. Communication Tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Professional', 'Direct', 'Warm'] as Tone[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    tone === t
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Context Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="text-slate-500 block font-mono font-semibold uppercase text-[10px]">
              AI Trigger Context
            </span>
            <div className="font-semibold text-slate-800">
              {selectedLead?.triggerType} • {selectedLead?.country}
            </div>
            <p className="text-slate-600 italic line-clamp-2 text-[11px]">
              "{selectedLead?.triggerSnippet}"
            </p>
          </div>
        </div>

        {/* Right Panel — Live Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
            <div>
              {/* Channel Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg text-white ${
                    channel === 'Email' ? 'bg-blue-600' : channel === 'WhatsApp' ? 'bg-emerald-600' : 'bg-indigo-600'
                  }`}>
                    {channel === 'Email' ? <Mail className="w-4 h-4" /> : channel === 'WhatsApp' ? <MessageSquare className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{channel} Preview</h3>
                    <span className="text-xs text-slate-500">Tone: {tone} • Recipient: {selectedContact?.name} ({selectedContact?.title})</span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Copy'}</span>
                </button>
              </div>

              {/* Subject Line (if Email) */}
              {messageData.subject && (
                <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-500 block mb-0.5">
                    Subject Line
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    {messageData.subject}
                  </p>
                </div>
              )}

              {/* Message Body preview with Token Chips */}
              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 text-xs font-sans">
                {renderMessageBodyWithChips(messageData.body)}
              </div>
            </div>

            {/* Bottom Meta & Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  Word Count: <strong className="text-slate-800">{messageData.wordCount} words</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Est. Read Time: <strong className="text-slate-800">~{messageData.readTimeSeconds} sec</strong>
                </span>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleAddToQueue}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Add to Queue
                </button>

                <button
                  onClick={handleSendNow}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Now
                </button>
              </div>
            </div>
          </div>

          {/* Accordion: Why this message? */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full p-4 flex items-center justify-between bg-slate-50 text-left cursor-pointer hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 font-mono">Why this message? (AI Personalization Logic)</span>
              </div>
              {isAccordionOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {isAccordionOpen && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-600 space-y-2">
                <p className="leading-relaxed font-sans">
                  {messageData.rationale}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                  <span>Tokens substituted:</span>
                  <span className="text-blue-600 font-semibold">{messageData.tokens.join(' • ')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OutreachGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-mono text-xs">Loading Outreach Generator...</div>}>
      <OutreachContent />
    </Suspense>
  );
}
