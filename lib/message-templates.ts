import { Channel, Tone, TriggerType } from './types';

export interface GeneratedMessage {
  subject?: string;
  body: string;
  tokens: string[];
  rationale: string;
  wordCount: number;
  readTimeSeconds: number;
}

export function generateOutreachMessage({
  company,
  contactName,
  contactTitle,
  triggerType,
  serviceMatch,
  channel,
  tone,
}: {
  company: string;
  contactName: string;
  contactTitle: string;
  triggerType: TriggerType;
  serviceMatch: string;
  channel: Channel;
  tone: Tone;
}): GeneratedMessage {
  const firstName = contactName.split(' ')[0] || contactName;

  let subject = '';
  let body = '';
  let rationale = '';

  const tokens = [company, triggerType, serviceMatch, contactTitle];

  if (channel === 'Email') {
    if (tone === 'Professional') {
      subject = `Strategic Inquiry: ${serviceMatch} support for ${company}`;
      body = `Dear ${firstName},

I noticed that ${company} recently logged a critical trigger event regarding [Trigger Event]. Given your position as [Decision Maker Title], I am reaching out on behalf of NexaGroup.

We specialize in [Service Match] for enterprise projects across the region. With recent developments at [Company Name], ensuring seamless delivery and compliance is paramount.

Would you be open to a brief 10-minute briefing next Tuesday to discuss how our certified solutions can optimize your timeline?

Best regards,
Siddharth V.
Director of Client Solutions | NexaGroup`;
      rationale = `Leverages formal executive phrasing tailored for [Decision Maker Title] combined with immediate reference to [Trigger Event] and certified [Service Match].`;
    } else if (tone === 'Direct') {
      subject = `Quick question re: [Service Match] at ${company}`;
      body = `Hi ${firstName},

Congratulations on ${company}'s recent milestone: [Trigger Event]. 

As [Decision Maker Title], you're likely managing technical requirements for this transition. NexaGroup delivers rapid-deployment [Service Match] solutions with guaranteed SLAs.

Are you available for a quick 5-minute call this Thursday at 10 AM GST?

Thanks,
Siddharth V.
NexaGroup`;
      rationale = `High conversion direct approach: minimal preamble, immediate link between [Trigger Event] and rapid [Service Match] ROI.`;
    } else {
      // Warm
      subject = `Congrats on the milestone + quick idea for ${company}`;
      body = `Hi ${firstName},

Great to see the positive updates coming out of ${company} regarding [Trigger Event]! 

Our team at NexaGroup has worked extensively with leaders in your role as [Decision Maker Title] to streamline [Service Match]. I thought it might be helpful to share a 2-page benchmark report on how peer firms handled similar deployments.

Would you be interested if I drop that over to your inbox?

Warm regards,
Siddharth V.
NexaGroup`;
      rationale = `Value-first warm strategy offering benchmark insights tailored to [Decision Maker Title] without high-pressure sales tone.`;
    }
  } else if (channel === 'LinkedIn') {
    if (tone === 'Professional') {
      body = `Hi ${firstName}, saw the update on ${company}'s [Trigger Event]. As [Decision Maker Title], I thought connecting here makes sense given NexaGroup's work in [Service Match]. Looking forward to exchanging insights!`;
      rationale = `Concisely connects [Trigger Event] context with professional peer networking intent for [Decision Maker Title].`;
    } else if (tone === 'Direct') {
      body = `Hi ${firstName} — congrats on the [Trigger Event] at ${company}. We provide specialist [Service Match] for project leads. Open to a brief 5-min intro call next week?`;
      rationale = `Direct value proposition within LinkedIn character limits.`;
    } else {
      body = `Hi ${firstName}, impressive growth at ${company} with your recent [Trigger Event]! Would love to connect and share how we're assisting leaders with [Service Match] across the UAE & Saudi markets.`;
      rationale = `Friendly connection request highlighting market presence and shared interest.`;
    }
  } else {
    // WhatsApp
    if (tone === 'Professional') {
      body = `Good day ${firstName}, Siddharth here from NexaGroup. Following up on ${company}'s announcement regarding [Trigger Event]. We assist teams with [Service Match] — would love to share a short 1-page overview when convenient for you.`;
      rationale = `Polite WhatsApp intro respecting mobile bandwidth while citing [Trigger Event].`;
    } else if (tone === 'Direct') {
      body = `Hi ${firstName}, Siddharth from NexaGroup. Noticed ${company}'s recent [Trigger Event]. We specialize in rapid [Service Match]. Do you have 3 minutes for a quick chat today?`;
      rationale = `Action-oriented mobile message focused on immediate scheduling.`;
    } else {
      body = `Hi ${firstName}! Hope you're having a great week. Saw the exciting news about ${company}'s [Trigger Event]. Whenever you have a moment, I'd love to drop a quick voice note on how NexaGroup supports [Service Match].`;
      rationale = `Conversational mobile touchpoint offering low-friction voice note follow up.`;
    }
  }

  const wordCount = body.trim().split(/\s+/).length;
  const readTimeSeconds = Math.max(5, Math.ceil((wordCount / 200) * 60));

  return {
    subject: subject || undefined,
    body,
    tokens,
    rationale,
    wordCount,
    readTimeSeconds,
  };
}
