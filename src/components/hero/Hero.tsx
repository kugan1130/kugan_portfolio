import React, { useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail, FileText, Cpu, Eye, Server, Sparkles, Terminal, CheckCircle2, Camera } from 'lucide-react';
import { CandidateInfo } from '../../types';

interface HeroProps {
  candidate: CandidateInfo;
  onOpenEditor: () => void;
  onUpdatePhoto?: (photoUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ candidate, onOpenEditor }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Candidate Profile Photo Container */}
        <div className="flex flex-col items-center mb-8">
          {/* Portrait Photo Container */}
          <div className="relative mb-6 group">
            {/* Outer Glow Effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2563EB] to-slate-800 opacity-30 blur-md group-hover:opacity-70 transition duration-500" />
            
            {/* Avatar Frame */}
            <div 
              onClick={onOpenEditor}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-white border-2 border-[#E5E7EB] shadow-2xl overflow-hidden cursor-pointer group/avatar"
              title="Click to edit profile photo"
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
                  className="w-full h-full object-cover object-top rounded-full group-hover/avatar:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2563EB]/10 to-slate-100 flex flex-col items-center justify-center text-[#2563EB] font-bold">
                  <span className="text-4xl font-mono">K</span>
                  <span className="text-[10px] font-mono tracking-widest text-[#4B5563] mt-1">KUGAN K</span>
                </div>
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-mono p-2 text-center">
                <Camera className="w-5 h-5 mb-1 text-[#2563EB]" />
                <span>EDIT PHOTO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eyebrow Label */}
        <div className="text-xs uppercase tracking-[0.3em] text-[#2563EB] font-bold mb-2 font-mono">
          Agentic AI & Multi-Agent Systems
        </div>

        {/* Candidate Name Heading with Italic Serif Accent */}
        <h1 className="font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111827] mb-6 leading-tight">
          {candidate.name}<br />
          <span className="italic font-serif text-[#2563EB]">AI Systems Architect</span>
        </h1>

        {/* Primary Role Identity Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-mono mb-6 text-[#4B5563]">
          <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full shadow-xs">AI Engineer</span>
          <span className="text-[#2563EB]">•</span>
          <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full shadow-xs">Agentic AI Developer</span>
          <span className="text-[#2563EB]">•</span>
          <span className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full shadow-xs">Computer Vision & RAG Specialist</span>
        </div>

        {/* Supporting Statement / Value Proposition */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#4B5563] leading-relaxed mb-10 font-sans">
          {candidate.subtitle}
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* View Projects CTA */}
          <button
            onClick={() => handleScrollTo('projects')}
            className="flex items-center gap-2 px-7 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-widest uppercase shadow-xl shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 hover:-translate-y-0.5 transition-all group"
          >
            <span>VIEW FEATURED PROJECTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Download Resume / Contact */}
          <a
            href={candidate.resumeUrl || '/assets/resume/KUGAN_K_Resume.pdf'}
            download="KUGAN_K_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white text-[#111827] border border-[#E5E7EB] hover:border-[#2563EB]/50 hover:bg-[#F8F9FA] text-xs font-mono tracking-wider transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#2563EB]" />
            <span>DOWNLOAD RESUME</span>
          </a>

          {/* Social Links */}
          <a
            href={candidate.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-4 rounded-xl bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:text-[#111827] text-xs font-mono transition-all hover:-translate-y-0.5 shadow-xs"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4 text-[#111827]" />
            <span className="hidden sm:inline">GITHUB</span>
          </a>

          <a
            href={candidate.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-4 rounded-xl bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:text-[#111827] text-xs font-mono transition-all hover:-translate-y-0.5 shadow-xs"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-[#2563EB]" />
            <span className="hidden sm:inline">LINKEDIN</span>
          </a>

          <a
            href={`mailto:${candidate.email}`}
            className="flex items-center gap-2 px-4 py-4 rounded-xl bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#2563EB]/40 hover:text-[#111827] text-xs font-mono transition-all hover:-translate-y-0.5 shadow-xs"
            title="Email Candidate"
          >
            <Mail className="w-4 h-4 text-[#2563EB]" />
            <span className="hidden sm:inline">EMAIL</span>
          </a>
        </div>

        {/* Key Core Engineering Pillars Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#E5E7EB]">
          <div className="glass-panel glass-panel-hover p-4 rounded-xl flex items-center gap-3 text-left border border-[#E5E7EB]">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0 border border-[#2563EB]/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-mono text-[#111827] tracking-wider">AGENTIC AI & RAG</h4>
              <p className="text-[11px] text-[#4B5563] leading-tight">LangGraph • Multi-Agent • Tool Calling</p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-4 rounded-xl flex items-center gap-3 text-left border border-[#E5E7EB]">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0 border border-[#2563EB]/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-mono text-[#111827] tracking-wider">COMPUTER VISION</h4>
              <p className="text-[11px] text-[#4B5563] leading-tight">YOLOv11 • OpenCV • ByteTrack</p>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-4 rounded-xl flex items-center gap-3 text-left border border-[#E5E7EB]">
            <div className="p-2.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB] shrink-0 border border-[#2563EB]/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-mono text-[#111827] tracking-wider">AI BACKEND & DATA</h4>
              <p className="text-[11px] text-[#4B5563] leading-tight">FastAPI • PostgreSQL • Redis • Docker</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
