import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { CandidateInfo } from '../../types';

interface NavbarProps {
  candidate: CandidateInfo;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ candidate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const resumeUrl = candidate.resumeUrl || '/assets/resume/KUGAN_K_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'KUGAN_K_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E7EB] py-2.5 shadow-md shadow-slate-200/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Identity Badge - Single Line */}
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <div className="text-lg sm:text-2xl font-black tracking-tighter text-[#111827] whitespace-nowrap">
              KUGAN<span className="text-[#2563EB]">.</span>AI
            </div>
            <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#4B5563] border border-[#E5E7EB] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              SYSTEM_ACTIVE
            </span>
          </a>

          {/* Navigation Links - Single Horizontal Line */}
          <nav className="flex items-center gap-1 bg-[#FFFFFF] p-1 sm:p-1.5 rounded-full border border-[#E5E7EB] shadow-xs backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30 shadow-xs font-semibold'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right CTA - Single Line RESUME Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={candidate.resumeUrl || '/assets/resume/KUGAN_K_Resume.pdf'}
              download="KUGAN_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] sm:text-xs font-bold tracking-wider transition-all shadow-md shadow-[#2563EB]/20 hover:shadow-[#2563EB]/40 whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
