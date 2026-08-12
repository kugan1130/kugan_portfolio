import React, { useState } from 'react';
import { TimelineEntry, CertificationItem, ExperienceItem } from '../../types';
import { Calendar, Award, Briefcase, GraduationCap, CheckCircle2, Filter, Plus, ExternalLink, Sparkles, Trophy, Building2, Edit } from 'lucide-react';

interface TimelineProps {
  timeline: TimelineEntry[];
  certifications: CertificationItem[];
  experiences: ExperienceItem[];
  onOpenEditor: () => void;
  onUpdateCertificates?: (updatedCertificates: CertificationItem[]) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  timeline,
  certifications,
  experiences,
  onOpenEditor,
  onUpdateCertificates,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'experience' | 'certification' | 'education'>('all');
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const filteredTimeline = timeline.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'experience') return item.type === 'experience';
    if (activeFilter === 'certification') return item.type === 'certification' || item.type === 'recognition';
    if (activeFilter === 'education') return item.type === 'education';
    return true;
  });

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'experience':
        return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'certification':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'recognition':
        return <Trophy className="w-4 h-4 text-emerald-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      default:
        return <Calendar className="w-4 h-4 text-slate-400" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'experience':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800/50';
      case 'certification':
        return 'bg-amber-950 text-amber-300 border-amber-800/50';
      case 'recognition':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800/50';
      case 'education':
        return 'bg-blue-950 text-blue-300 border-blue-800/50';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-800';
    }
  };

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-[#2563EB] font-bold mb-2 font-mono">
            Experience & Growth
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Interactive <span className="text-[#2563EB]">Timeline</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base font-sans">
            Chronological progression combining AI/ML Developer internships, exam certifications, academic degree, and specialized training.
          </p>

          {/* Filter & Edit Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                ALL ({timeline.length})
              </button>
              <button
                onClick={() => setActiveFilter('experience')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeFilter === 'experience'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                EXPERIENCE ({experiences.length})
              </button>
              <button
                onClick={() => setActiveFilter('certification')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeFilter === 'certification'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                CERTIFICATIONS ({certifications.length})
              </button>
              <button
                onClick={() => setActiveFilter('education')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeFilter === 'education'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                EDUCATION
              </button>
            </div>
          </div>
        </div>

        {/* Chronological Timeline Stream */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-10 border-l border-[#E5E7EB] space-y-10 my-10">
          {filteredTimeline.map((item, index) => (
            <div key={item.id || index} className="relative group">
              
              {/* Glowing Timeline Dot */}
              <div className="absolute -left-[39px] sm:-left-[47px] top-1.5 timeline-dot transition-transform group-hover:scale-125" />

              {/* Timeline Card */}
              <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all shadow-md">
                
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  {item.date && (
                    <span className="text-[10px] font-mono text-[#4B5563] font-semibold block tracking-widest uppercase">
                      {item.date}
                    </span>
                  )}

                  {/* Subordinate Secondary Badges */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-full text-[#4B5563] uppercase tracking-wider font-medium">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Title */}
                <h3 className="font-heading font-extrabold text-xl text-[#111827] mb-1 group-hover:text-[#2563EB] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Subordinate Subtitle */}
                <p className="text-[11px] font-mono font-semibold text-[#4B5563] mb-3">
                  {item.subtitle}
                </p>

                <p className="text-xs text-[#111827] leading-relaxed bg-[#F8F9FA] p-4 rounded-xl border border-[#E5E7EB]">
                  {item.details}
                </p>

                {item.imageUrl && !imgErrorMap[item.id] && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-[#E5E7EB] max-h-48">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      onError={() => setImgErrorMap(prev => ({ ...prev, [item.id]: true }))}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Featured Credentials Spotlight Box */}
        <div className="mt-16 glass-panel p-8 rounded-2xl border border-[#E5E7EB] shadow-md bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-[#E5E7EB] gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-[#111827] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2563EB]" />
                <span>Featured Exam & Internship Credentials</span>
              </h3>
              <p className="text-xs text-[#4B5563] mt-1">High-impact proctored exams and official developer internship verifications.</p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.filter(c => c.category === 'Featured' || c.isExamBased || c.category === 'Internship & Experience').map((cert) => (
              <div key={cert.id} className="p-5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded border border-[#2563EB]/30 font-bold">
                      {cert.score || cert.role || 'VERIFIED CREDENTIAL'}
                    </span>
                    <span className="text-xs font-mono text-[#4B5563] font-semibold">{cert.date}</span>
                  </div>

                  <h4 className="font-heading font-bold text-[#111827] text-base mb-1">{cert.title}</h4>
                  <p className="text-xs font-mono text-[#2563EB] mb-2 font-semibold">{cert.issuer}</p>
                  <p className="text-xs text-[#4B5563] leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
