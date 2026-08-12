import React, { useState } from 'react';
import { CandidateInfo } from '../../types';
import { Mail, Phone, Github, Linkedin, FileText, Send, CheckCircle2, Sparkles, MapPin, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  candidate: CandidateInfo;
}

export const Contact: React.FC<ContactProps> = ({ candidate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = 'kugankugan.tech@gmail.com';

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const resumeUrl = candidate.resumeUrl || '/assets/resume/KUGAN_K_Resume.pdf';
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'KUGAN_K_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim();
    const message = formState.message.trim();

    if (!name) {
      setValidationError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!subject) {
      setValidationError('Please enter a subject.');
      return;
    }

    if (!message) {
      setValidationError('Please enter your message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.mailtoUrl) {
          try {
            const link = document.createElement('a');
            link.href = data.mailtoUrl;
            link.target = '_top';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (err) {
            window.location.href = data.mailtoUrl;
          }
        }
        setSubmitted(true);
        try {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
        } catch (err) {
          // ignore
        }
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setValidationError(data.error || 'Unable to send message. Please try again.');
      }
    } catch (err) {
      setValidationError('Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#2563EB] font-bold mb-2 font-mono">
            Let's Connect & Build
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Building the Next <span className="text-[#2563EB]">Intelligent System?</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base font-sans">
            Actively open to full-time AI Engineer, Agentic AI Engineer, and AI/ML Developer roles. Reach out via email, phone, or LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column - Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="glass-panel p-6 rounded-2xl border border-[#E5E7EB] bg-white space-y-4 shadow-md">
              <h3 className="font-heading font-bold text-lg text-[#111827] mb-2 uppercase tracking-wider">Direct Channels</h3>

              {/* Email Box */}
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-between gap-3">
                <a
                  href={`mailto:${contactEmail}`}
                  target="_top"
                  className="flex items-center gap-3 overflow-hidden group flex-1"
                >
                  <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#4B5563] font-semibold block">EMAIL</span>
                    <span className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] truncate block">
                      {contactEmail}
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(contactEmail, 'email')}
                  className="p-2 rounded-lg bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#2563EB]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Box */}
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#4B5563] font-semibold block">PHONE</span>
                    <a href={`tel:${candidate.phone}`} className="text-xs font-bold text-[#111827] hover:text-[#2563EB]">
                      {candidate.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(candidate.phone, 'phone')}
                  className="p-2 rounded-lg bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] shrink-0"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-[#2563EB]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#4B5563] font-semibold block">LOCATION</span>
                  <span className="text-xs font-bold text-[#111827]">{candidate.location}</span>
                </div>
              </div>
            </div>

            {/* Social Profile Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={candidate.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#2563EB]/40 transition-all flex items-center gap-3 group shadow-xs"
              >
                <div className="p-2 rounded-lg bg-[#F8F9FA] text-[#111827] group-hover:text-[#2563EB]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111827] block">GitHub</span>
                  <span className="text-[10px] text-[#4B5563] font-mono font-semibold">@kugan1130</span>
                </div>
              </a>

              <a
                href={candidate.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#2563EB]/40 transition-all flex items-center gap-3 group shadow-xs"
              >
                <div className="p-2 rounded-lg bg-[#F8F9FA] text-[#2563EB] group-hover:text-[#1D4ED8]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111827] block">LinkedIn</span>
                  <span className="text-[10px] text-[#4B5563] font-mono font-semibold">kugan-k</span>
                </div>
              </a>
            </div>

            {/* Download Resume Box */}
            <div className="glass-panel p-5 rounded-2xl border border-[#2563EB]/30 bg-white text-center space-y-3 shadow-md">
              <FileText className="w-8 h-8 text-[#2563EB] mx-auto" />
              <div>
                <h4 className="font-heading font-bold text-[#111827] text-base">Download Candidate Resume</h4>
                <p className="text-xs text-[#4B5563] mt-0.5">ATS-friendly resume for technical recruiters.</p>
              </div>

              <a
                href={candidate.resumeUrl || '/assets/resume/KUGAN_K_Resume.pdf'}
                download="KUGAN_K_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-[#2563EB]/20 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request / Download Resume</span>
              </a>
            </div>

          </div>

          {/* Right Column - Send Direct Message Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] bg-white shadow-md">
            <h3 className="font-heading font-bold text-xl text-[#111827] mb-1 uppercase tracking-wider">
              Send Direct Message
            </h3>
            <p className="text-xs text-[#4B5563] mb-6 font-sans">
              Inquire about technical roles, interviews, or project collaborations.
            </p>

            {validationError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 font-medium flex items-center justify-between">
                <span>{validationError}</span>
                <button
                  type="button"
                  onClick={() => setValidationError(null)}
                  className="text-xs text-red-500 hover:text-red-700 ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-center space-y-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#2563EB] mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-lg text-[#111827]">Message Sent Successfully!</h4>
                <p className="text-xs text-[#4B5563] font-sans">
                  Thank you for reaching out. Your message has been sent to {contactEmail}. Kugan K will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-[#4B5563] font-semibold block mb-1 uppercase tracking-widest">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] placeholder:text-[#9CA3AF]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#4B5563] font-semibold block mb-1 uppercase tracking-widest">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#4B5563] font-semibold block mb-1 uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. AI Engineer Position Opportunity"
                    value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] placeholder:text-[#9CA3AF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#4B5563] font-semibold block mb-1 uppercase tracking-widest">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Details about the role or project..."
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] placeholder:text-[#9CA3AF]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-[#2563EB]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Kugan K'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
