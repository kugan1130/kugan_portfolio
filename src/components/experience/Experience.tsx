import React from 'react';
import { ExperienceItem } from '../../types';
import { Briefcase, Building2, MapPin, Calendar, CheckCircle2, Award, Sparkles, Trophy } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PRACTICAL INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Developer Internships & <span className="text-[#2563EB]">Industry Exposure</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base">
            Verifiable internships in AI/ML development, computer vision applications, and industrial automation.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 font-bold">
                    {exp.type}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#4B5563] font-semibold">
                    <Calendar className="w-3 h-3 text-[#4B5563]" />
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-[#111827] mb-1">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] mb-4">
                  <Building2 className="w-3.5 h-3.5 text-[#4B5563]" />
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-[#4B5563]">• {exp.location}</span>}
                </div>

                {exp.description && (
                  <p className="text-xs text-[#111827] leading-relaxed mb-4 bg-[#F8F9FA] p-3.5 rounded-xl border border-[#E5E7EB]">
                    {exp.description}
                  </p>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#4B5563] block font-semibold">KEY DELIVERABLES:</span>
                    {exp.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#111827]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Placement Recognition Spotlight */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider block font-bold">
                RECOGNITION & EXCELLENCE AWARD
              </span>
              <h4 className="font-heading font-bold text-lg text-[#111827]">Thozhil Placement Excellence Certificate</h4>
              <p className="text-xs text-[#4B5563] mt-1">
                Certificate of Excellence awarded by Thozhil recognizing placement as AI & ML Developing Intern at MindFulAI Technologies Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
