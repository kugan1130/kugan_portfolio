import React from 'react';
import { CandidateInfo } from '../../types';
import { GraduationCap, Brain, Shield, Layers, Database, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

interface AboutProps {
  candidate: CandidateInfo;
}

export const About: React.FC<AboutProps> = ({ candidate }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>PROFESSIONAL SUMMARY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            About <span className="text-[#2563EB]">{candidate.name}</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base">
            Specialized AI Engineer trained in designing production-ready Agentic AI workflows, Computer Vision pipelines, and high-concurrency backends.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Portrait Photo Spotlight & Key Bio */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-[#E5E7EB] shadow-lg relative overflow-hidden group">
              {/* Photo */}
              <div 
                className="relative aspect-square rounded-xl overflow-hidden mb-6 border border-[#E5E7EB] bg-[#F8F9FA]"
              >
                {candidate.photoUrl ? (
                  <img
                    src={candidate.photoUrl}
                    alt={candidate.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#2563EB] font-bold bg-gradient-to-br from-[#2563EB]/10 to-slate-100">
                    <span className="text-6xl font-mono">K</span>
                    <span className="text-xs font-mono tracking-widest text-[#4B5563] mt-2">KUGAN K</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

                {/* Photo Badge Overlay */}
                <div className="absolute bottom-3 right-3 flex items-center justify-end">
                  <span className="text-[10px] font-mono text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {candidate.location}
                  </span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-2xl text-[#111827] mb-1">
                {candidate.name}
              </h3>
              <p className="text-xs font-mono text-[#2563EB] mb-3 font-semibold">
                {candidate.title}
              </p>
              <p className="text-xs text-[#4B5563] leading-relaxed font-sans">
                {candidate.education.degree} in {candidate.education.field} from {candidate.education.college}
              </p>
            </div>
          </div>

          {/* Main Professional Bio Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-md space-y-6">
            <h3 className="font-heading font-bold text-xl text-[#111827] flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span>Background & Engineering Focus</span>
            </h3>

            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed font-sans">
              {candidate.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E5E7EB]">
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0 border border-[#2563EB]/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#4B5563] font-mono uppercase tracking-widest">DEGREE & COLLEGE</h4>
                  <p className="text-xs font-bold text-[#111827] mt-1">{candidate.education.degree} in {candidate.education.field}</p>
                  <p className="text-xs text-[#2563EB] font-semibold mt-0.5">{candidate.education.college}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0 border border-[#2563EB]/20">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#4B5563] font-mono uppercase tracking-widest">PRIMARY STACK</h4>
                  <p className="text-xs font-bold text-[#111827] mt-1">LangGraph • YOLOv11 • FastAPI</p>
                  <p className="text-xs text-[#4B5563] mt-0.5 font-mono">Python, Redis, PostgreSQL, Docker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="glass-panel p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                  <Brain className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-[#111827] text-base">Agentic AI & Multi-Agent Systems</h4>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Multi-agent state machines, LangGraph graph workflows, intent routing, tool integration, and human-in-the-loop fallback.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-[#111827] text-base">Computer Vision & Object Tracking</h4>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Real-time YOLOv8/v11 detection, ByteTrack tracking, spatial Shapely polygon perimeters, and automated threat event scoring.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-[#111827] text-base">RAG & Enterprise Knowledge Retrieval</h4>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                ChromaDB vector embedding stores, PDF ingestion pipelines, schema-aware SQL agents, and hybrid contextual search.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-[#111827] text-base">Production Backends & Infrastructure</h4>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                FastAPI REST endpoints, PostgreSQL relational schemas, Redis session caches, Docker containerization, and LangSmith traces.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
