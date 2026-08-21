import { ReplyItem } from '../lib/types';

export const INITIAL_REPLIES: ReplyItem[] = [
  {
    id: 'rep-001',
    company: 'ZenithEnergy Co',
    contactName: 'Marcus Vance',
    contactTitle: 'Asset Integrity Manager',
    email: 'marcus.vance@zenithenergy.ae',
    channel: 'Email',
    preview: 'Thanks for reaching out Siddharth. We are currently evaluating hydrocarbon PFP vendors for the ADNOC offshore platform...',
    fullBody: `Hi Siddharth,

Thanks for reaching out. We are currently evaluating hydrocarbon PFP vendors for the ADNOC offshore platform integrity maintenance package.

Your technical compliance documentation and UAE civil defense certifications look solid. Can you and your technical lead jump on a Teams call this Thursday at 2:00 PM GST?

Regards,
Marcus Vance
Asset Integrity Manager | ZenithEnergy Co`,
    classification: 'Meeting Request',
    receivedDate: 'Today, 10:12 AM',
  },
  {
    id: 'rep-002',
    company: 'ApexSafety Works',
    contactName: 'Sultan Al-Damer',
    contactTitle: 'Standards & Compliance VP',
    email: 'sultan.d@apexsafety.sa',
    channel: 'LinkedIn',
    preview: 'Interested in learning more about your UL-listed PFP system. Please send over product data sheets.',
    fullBody: `Hi Siddharth,

Thanks for connecting on LinkedIn. We are indeed looking for UL-listed PFP systems for our Diriyah project. Please email your complete testing portfolio to my assistant and CC me. If the specs match, we can arrange a formal vendor meeting next week.

Sultan Al-Damer
VP Compliance`,
    classification: 'Positive Reply',
    receivedDate: 'Today, 09:45 AM',
  },
  {
    id: 'rep-003',
    company: 'AlphaSteel Industries',
    contactName: 'James Harrington',
    contactTitle: 'Project Director (EPC)',
    email: 'j.harrington@alphasteel-ae.com',
    channel: 'Email',
    preview: 'We have received your intro. Project site office is under setup, we will review vendor files next month...',
    fullBody: `Hello Siddharth,

Thank you for your message regarding the Abu Dhabi greenfield smelting plant project. 

Our main EPC site office is currently under setup. We will be opening vendor pre-qualifications in late September. Please follow up with us in about 3-4 weeks.

Best regards,
James Harrington`,
    classification: 'Not Now',
    receivedDate: 'Today, 08:20 AM',
  },
  {
    id: 'rep-004',
    company: 'StellarEPC Ltd',
    contactName: 'Khalid Al-Ghamdi',
    contactTitle: 'Subcontract & QA Manager',
    email: 'khalid.g@stellarepc.com.sa',
    channel: 'WhatsApp',
    preview: 'Hello Siddharth, I am no longer handling PFP subcontracts. Please contact Tariq in our Jubail office...',
    fullBody: `Good day Siddharth,

Thanks for your message. Note that I have recently transferred to QA Compliance and no longer manage PFP subcontractor procurement for SABIC packages. 

Please reach out directly to Tariq Al-Mansoor (t.mansoor@stellarepc.com.sa) who oversees site subcontracts.

Regards,
Khalid`,
    classification: 'Wrong Person',
    receivedDate: 'Yesterday, 05:40 PM',
  },
  {
    id: 'rep-005',
    company: 'AquaShield Corp',
    contactName: 'Faisal Al-Sabah',
    contactTitle: 'Procurement Specialist',
    email: 'f.sabah@aquashield.ae',
    channel: 'Email',
    preview: 'Please unsubscribe our organization from any automated outreach sequences.',
    fullBody: `To NexaGroup Sales Team,

Please remove my email address from your mailing list. We do not accept unsolicited vendor communications.

Thank you.`,
    classification: 'Opt-Out',
    receivedDate: 'Yesterday, 03:15 PM',
    sequenceStopped: true,
  },
  {
    id: 'rep-006',
    company: 'CrownCivil Contractors',
    contactName: 'Bandar Al-Otaibi',
    contactTitle: 'Technical Projects Director',
    email: 'b.otaibi@crowncivil.sa',
    channel: 'Email',
    preview: 'We would like to request a formal quotation for Riyadh Metro depot workshop PFP coating...',
    fullBody: `Dear Siddharth,

Following up on your message regarding Riyadh Metro Depot workshops. 

We would like to invite NexaGroup to submit a formal quotation for 45,000 sqm of structural steel fireproofing under ASTM E119 specification. Please reply to confirm receipt and we will transmit the BOQ files.

Sincerely,
Eng. Bandar Al-Otaibi`,
    classification: 'Meeting Request',
    receivedDate: 'Aug 19, 04:30 PM',
  },
  {
    id: 'rep-007',
    company: 'OmegaFlow Systems',
    contactName: 'Vikramaditya Shah',
    contactTitle: 'Turnaround Superintendent',
    email: 'v.shah@omegaflow.co.in',
    channel: 'LinkedIn',
    preview: 'Our turnaround vendor list is locked for October, but we can register you for Q1 shutdown...',
    fullBody: `Hi Siddharth,

Thanks for your inquiry. Our vendor mobilization list for the October Gujarat turnaround has already been finalized. However, we have another planned shutdown in Q1 2027. Send your profile to our vendor desk for future inclusion.`,
    classification: 'Not Now',
    receivedDate: 'Aug 19, 02:10 PM',
  }
];
