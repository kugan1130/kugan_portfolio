import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { ProjectModal } from '../case-study/ProjectModal';
import { ProjectArchitectureModal } from '../architecture/ProjectArchitectureModal';
import { Github, ExternalLink, Cpu, Eye, ShieldAlert, ArrowRight, Layers, CheckCircle2, Sparkles, FolderGit2, Activity, Video, Trash2, FileVideo } from 'lucide-react';

interface ProjectsProps {
  projects: ProjectItem[];
  onUpdateProjects?: (updatedProjects: ProjectItem[]) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [architectureProject, setArchitectureProject] = useState<ProjectItem | null>(null);
  const [expandedTechMap, setExpandedTechMap] = useState<Record<string, boolean>>({});

  const toggleTechExpand = (projectId: string) => {
    setExpandedTechMap(prev => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const getProjectCategoryBadge = (category: string) => {
    switch (category) {
      case 'Agentic AI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
            ENTERPRISE AGENTIC AI
          </span>
        );
      case 'Computer Vision':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F172A]/10 text-[#0F172A] border border-[#0F172A]/20 text-xs font-mono font-semibold">
            <Eye className="w-3.5 h-3.5 text-[#0F172A]" />
            HERO PROJECT • MULTI-AGENT VISION
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300 text-xs font-mono font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-700" />
            DEEP SURVEILLANCE CV
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED ENGINEERING PROJECTS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Production AI & <span className="text-[#2563EB]">Agentic Systems</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base">
            Detailed case studies demonstrating multi-agent routing, RAG retrieval, real-time Computer Vision tracking, and FastAPI backends.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => {
            const isExpanded = !!expandedTechMap[project.id];
            const visibleTech = isExpanded ? project.technologies : project.technologies.slice(0, 8);

            return (
              <div
                key={project.id}
                className="glass-panel rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/40 transition-all p-6 sm:p-8 relative overflow-hidden shadow-md group"
              >
                {/* Background gradient accent */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#2563EB]/10 transition-colors" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Column - Core Information */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      {getProjectCategoryBadge(project.category)}
                      <span className="text-[11px] font-mono text-[#4B5563] font-semibold">PROJECT 0{index + 1}</span>
                    </div>

                    <div>
                      <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#111827] group-hover:text-[#2563EB] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#4B5563] text-sm font-medium mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Problem & Solution Compact */}
                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#FFF1F2] border border-[#FECDD3]">
                        <span className="text-[11px] font-mono font-bold text-rose-600 uppercase tracking-wider block mb-1">
                          PROBLEM
                        </span>
                        <p className="text-xs text-[#111827] leading-relaxed">{project.problem}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
                        <span className="text-[11px] font-mono font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                          SOLUTION
                        </span>
                        <p className="text-xs text-[#111827] leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Key Tech Badges with Expand/Collapse */}
                    <div>
                      <span className="text-[11px] font-mono text-[#4B5563] block mb-2 font-semibold">TECHNOLOGY STACK:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {visibleTech.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-[#F8F9FA] text-[11px] font-mono text-[#111827] border border-[#E5E7EB]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 8 && (
                          <button
                            onClick={() => toggleTechExpand(project.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#2563EB]/10 hover:bg-[#2563EB] text-[11px] font-mono text-[#2563EB] hover:text-white border border-[#2563EB]/30 font-bold transition-all cursor-pointer"
                            title={isExpanded ? 'Show fewer technologies' : 'Show all technologies'}
                          >
                            {isExpanded ? 'Show less' : `+${project.technologies.length - 8} more`}
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Right Column - Sample Video Demo, Architecture Flow & Actions */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
                    
                    {/* Sample Video Demo Box */}
                    {(() => {
                      const videoUrl = project.videoUrl || (
                        project.id === 'nexa-ai' || index === 0
                          ? '/assets/videos/Enterprise Multi-Agent AI Assistant - Google Chrome 2026-08-11 13-05-19-esv1-50p.mp4'
                          : project.id === 'ai-security-perimeter' || index === 1
                          ? '/assets/videos/frontend - Google Chrome 2026-08-11 13-53-14-esv2-50p-bg-10p-music-10p.mp4'
                          : '/assets/videos/VID20260311140230.mp4'
                      );

                      return (
                        <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#2563EB] font-bold flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>SAMPLE VIDEO DEMO</span>
                            </span>
                            {videoUrl && (
                              <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-semibold">
                                VIDEO READY
                              </span>
                            )}
                          </div>

                          {videoUrl ? (
                            <div className="space-y-2">
                              <div className="relative rounded-xl overflow-hidden bg-black border border-[#2563EB]/30 group/video">
                                <video
                                  src={videoUrl}
                                  controls
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-44 object-cover rounded-xl"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white transition-all flex flex-col items-center justify-center text-center space-y-2">
                              <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
                                <FileVideo className="w-5 h-5" />
                              </div>
                              
                              <div>
                                <p className="text-xs font-bold text-[#111827]">No Sample Video Attached</p>
                                <p className="text-[10px] text-[#4B5563] mt-0.5">Project video stream preview</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Architecture Diagram Preview for All Projects */}
                    <div className="p-3 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#4B5563] font-semibold uppercase">SYSTEM ARCHITECTURE &amp; WORKFLOW</span>
                        <button
                          onClick={() => setArchitectureProject(project)}
                          className="text-[#2563EB] font-bold hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Expand</span>
                        </button>
                      </div>
                      <div 
                        onClick={() => setArchitectureProject(project)}
                        className="p-1.5 rounded-xl bg-white border border-[#E5E7EB] cursor-pointer hover:border-[#2563EB]/60 transition-all group overflow-hidden shadow-sm"
                      >
                        <img 
                          src={project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa') ? "/assets/projects/nexa_ai_architecture.svg" : "/assets/projects/ai_catcher_architecture.svg"} 
                          alt={`${project.title} Architecture Diagram`} 
                          className="w-full h-36 object-contain rounded-lg bg-[#f0f4f8] p-1 group-hover:scale-[1.01] transition-transform duration-200"
                        />
                      </div>
                    </div>

                    {/* Key Technical Highlights Box */}
                    <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#4B5563] font-semibold uppercase">TECHNICAL HIGHLIGHTS</span>
                      </div>

                      <div className="space-y-2 pt-0.5">
                        {project.technicalHighlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#111827]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs shadow-md shadow-[#2563EB]/20 transition-all cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setArchitectureProject(project)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white hover:bg-slate-800 font-bold text-xs font-mono transition-all shadow-md cursor-pointer"
                      >
                        <Activity className="w-4 h-4 text-[#2563EB] animate-pulse" />
                        <span>Architecture View</span>
                      </button>

                      {project.githubAvailable ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white text-[#111827] border border-[#E5E7EB] hover:border-[#2563EB]/50 hover:text-[#2563EB] font-medium text-xs transition-all shadow-xs"
                        >
                          <Github className="w-4 h-4 text-[#111827]" />
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3 text-[#4B5563]" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-[#4B5563] bg-[#F8F9FA] px-3 py-2 rounded-xl border border-[#E5E7EB]">
                          GitHub soon
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Expanded Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenArchitecture={(proj) => setArchitectureProject(proj)}
      />

      {/* Dedicated Interactive Architecture Graph Modal */}
      <ProjectArchitectureModal
        project={architectureProject}
        onClose={() => setArchitectureProject(null)}
      />
    </section>
  );
};
