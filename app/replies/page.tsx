'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReplyItem } from '../../lib/types';
import { getClassificationBadgeStyle } from '../../lib/score-utils';
import { AssignHumanModal } from '../../components/shared/AssignHumanModal';
import { 
  MessageSquareReply, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  UserCheck, 
  CheckCircle2, 
  X, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function ReplyIntelligencePage() {
  const { replies, assignHumanToReply } = useApp();

  const [selectedReplyForModal, setSelectedReplyForModal] = useState<ReplyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedReplyForSheet, setSelectedReplyForSheet] = useState<ReplyItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const counts = {
    'Meeting Request': replies.filter((r) => r.classification === 'Meeting Request').length,
    'Positive Reply': replies.filter((r) => r.classification === 'Positive Reply').length,
    'Not Now': replies.filter((r) => r.classification === 'Not Now').length,
    'Opt-Out': replies.filter((r) => r.classification === 'Opt-Out').length,
    'Wrong Person': replies.filter((r) => r.classification === 'Wrong Person').length,
  };

  const handleOpenAssignModal = (reply: ReplyItem) => {
    setSelectedReplyForModal(reply);
    setIsModalOpen(true);
  };

  const handleOpenViewSheet = (reply: ReplyItem) => {
    setSelectedReplyForSheet(reply);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Summary Pills */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reply Intelligence Inbox</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono">
              AI NLP Sentiment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated intent classification for incoming prospect responses across Email, WhatsApp, and LinkedIn.
          </p>
        </div>

        {/* Summary Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            4 Meeting Request
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            12 Positive Reply
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            8 Not Now
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            3 Opt-Out
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            2 Wrong Person
          </span>
        </div>
      </div>

      {/* Replies Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Reply Preview</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {replies.map((reply) => {
                const isOptOut = reply.classification === 'Opt-Out';
                const isHotReply = reply.classification === 'Meeting Request' || reply.classification === 'Positive Reply';

                return (
                  <tr
                    key={reply.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isOptOut ? 'bg-red-50/20 opacity-80' : ''
                    }`}
                  >
                    {/* Channel Icon */}
                    <td className="py-3.5 px-4 text-slate-500">
                      <div className={`p-1.5 rounded-lg inline-flex ${
                        reply.channel === 'Email' ? 'bg-blue-50 text-blue-600' : reply.channel === 'WhatsApp' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        {reply.channel === 'Email' ? <Mail className="w-4 h-4" /> : reply.channel === 'WhatsApp' ? <MessageSquare className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />}
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {reply.company}
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <div>{reply.contactName}</div>
                      <span className="text-[10px] text-slate-400 font-mono block">{reply.contactTitle}</span>
                    </td>

                    {/* Preview (clickable for slide-over) */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      <button
                        onClick={() => handleOpenViewSheet(reply)}
                        className={`text-left line-clamp-2 hover:text-blue-600 cursor-pointer font-sans ${isOptOut ? 'line-through text-slate-400' : ''}`}
                      >
                        "{reply.preview}"
                      </button>
                    </td>

                    {/* Classification Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border ${getClassificationBadgeStyle(reply.classification)}`}>
                        {reply.classification}
                      </span>
                    </td>

                    {/* Received */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {reply.receivedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {reply.sequenceStopped ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Sequence Stopped {reply.assignedOwner ? `(${reply.assignedOwner})` : ''}
                        </span>
                      ) : isHotReply ? (
                        <button
                          onClick={() => handleOpenAssignModal(reply)}
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Assign Human
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenViewSheet(reply)}
                          className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                        >
                          View Full Reply
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Human Modal */}
      <AssignHumanModal
        reply={selectedReplyForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssign={assignHumanToReply}
      />

      {/* View Full Reply Slide-Over */}
      {isSheetOpen && selectedReplyForSheet && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base text-slate-900">Full Reply Transcript</h3>
                <button onClick={() => setIsSheetOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">{selectedReplyForSheet.company}</div>
                  <div className="text-slate-600">{selectedReplyForSheet.contactName} ({selectedReplyForSheet.contactTitle})</div>
                  <div className="text-slate-400 font-mono text-[11px] mt-1">{selectedReplyForSheet.email}</div>
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1">
                    Classification
                  </span>
                  <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border ${getClassificationBadgeStyle(selectedReplyForSheet.classification)}`}>
                    {selectedReplyForSheet.classification}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1">
                    Email Body
                  </span>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
                    {selectedReplyForSheet.fullBody}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setIsSheetOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
