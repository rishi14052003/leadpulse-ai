'use client';

import React, { useState } from 'react';
import { ReplyItem } from '../../lib/types';
import { X, UserCheck, ShieldAlert, CheckCircle } from 'lucide-react';

interface AssignHumanModalProps {
  reply: ReplyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (replyId: string, ownerName: string, notes?: string) => void;
}

export function AssignHumanModal({ reply, isOpen, onClose, onAssign }: AssignHumanModalProps) {
  const [selectedOwner, setSelectedOwner] = useState('Siddharth V.');
  const [notes, setNotes] = useState('');

  if (!isOpen || !reply) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(reply.id, selectedOwner, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base text-white">Assign Lead & Stop Automated Sequence</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Target Reply Context */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-900">
              <span>{reply.company}</span>
              <span className="text-blue-600 font-mono">{reply.classification}</span>
            </div>
            <p className="text-slate-600 font-medium">{reply.contactName} ({reply.contactTitle})</p>
            <p className="text-slate-500 italic line-clamp-2 mt-1 font-sans">"{reply.preview}"</p>
          </div>

          {/* Owner Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-1.5">
              Assign Account Representative
            </label>
            <select
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
              className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Siddharth V.">Siddharth V. (VP Enterprise Sales)</option>
              <option value="Rania Ahmed">Rania Ahmed (Senior Account Exec - KSA)</option>
              <option value="Manish Kumar">Manish Kumar (Regional Lead - India)</option>
              <option value="Kasia Lewandowski">Kasia Lewandowski (EU Commercial Lead)</option>
            </select>
          </div>

          {/* Handover Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-1.5">
              Handover & Strategy Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Lead requested technical BOQ compliance documents. Prepare 10-minute briefing..."
              className="w-full text-xs bg-white border border-slate-300 rounded-lg p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Warning Banner */}
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Submitting this assignment will immediately disengage AI automated follow-up sequences to prevent duplicate messaging.
            </p>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              Assign & Stop Sequence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
