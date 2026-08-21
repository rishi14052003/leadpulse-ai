'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { getConfidenceBadgeStyle } from '../../lib/score-utils';
import { 
  Users, 
  Linkedin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function DecisionMakersPage() {
  const router = useRouter();
  const { contacts, leads } = useApp();

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('All');

  const filteredContacts = contacts.filter((c) => {
    if (selectedCompanyId === 'All') return true;
    return c.companyId === selectedCompanyId;
  });

  const handleGenerateMessage = (company: string, contactName: string) => {
    router.push(`/outreach?company=${encodeURIComponent(company)}&contact=${encodeURIComponent(contactName)}`);
  };

  return (
    <div className="space-y-6">
      {/* Header & Company Selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Decision Maker Intelligence</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono">
              Verified Contacts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mapped executive decision makers and technical leads across qualified client targets.
          </p>
        </div>

        {/* Company Dropdown */}
        <div className="w-full md:w-72">
          <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1">
            Filter by Client Target
          </label>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Companies ({contacts.length} Decision Makers)</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.flag} {lead.company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Decision Makers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Title / Role</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Email Status</th>
                <th className="py-3.5 px-4">Direct Line</th>
                <th className="py-3.5 px-4">Last Action</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                    No mapped decision makers found for this target company.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((dm) => (
                  <tr key={dm.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Name with Mock LinkedIn link */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <a
                        href={dm.linkedIn}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Mock LinkedIn profile for ${dm.name} (${dm.company})`);
                        }}
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        title="View Mock LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{dm.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {dm.company}
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {dm.title}
                    </td>

                    {/* Confidence Pill */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border ${getConfidenceBadgeStyle(dm.confidence)}`}>
                        {dm.confidence}
                      </span>
                    </td>

                    {/* Email Status */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {dm.emailStatus === 'Verified' ? (
                          <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        ) : dm.emailStatus === 'Unverified' ? (
                          <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Unverified
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Bounced
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-400">({dm.email})</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {dm.phone}
                    </td>

                    {/* Last Action */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {dm.lastAction}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleGenerateMessage(dm.company, dm.name)}
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        Generate Message
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
