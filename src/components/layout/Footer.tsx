import React from 'react';
import { CandidateInfo } from '../../types';
import { Github, Linkedin, Mail, Terminal, ArrowUp } from 'lucide-react';

interface FooterProps {
  candidate: CandidateInfo;
}

export const Footer: React.FC<FooterProps> = ({ candidate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-white border-t border-[#E5E7EB] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
          
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-mono font-bold text-xs">
              K
            </div>
            <div>
              <span className="font-heading font-extrabold text-[#111827] text-base block tracking-tight">
                {candidate.name}
              </span>
              <span className="text-xs text-[#4B5563] font-mono">
                {candidate.title}
              </span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#4B5563]">
            <a href="#about" className="hover:text-[#2563EB] transition-colors">ABOUT</a>
            <a href="#capabilities" className="hover:text-[#2563EB] transition-colors">CAPABILITIES</a>
            <a href="#projects" className="hover:text-[#2563EB] transition-colors">PROJECTS</a>
            <a href="#architecture" className="hover:text-[#2563EB] transition-colors">ARCHITECTURE</a>
            <a href="#timeline" className="hover:text-[#2563EB] transition-colors">TIMELINE</a>
            <a href="#contact" className="hover:text-[#2563EB] transition-colors">CONTACT</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#F8F9FA] text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9] border border-[#E5E7EB] transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright & status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-[#4B5563] font-mono">
          <p>
            © {new Date().getFullYear()} {candidate.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span>LIGHT PROFESSIONAL THEME ACTIVE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
