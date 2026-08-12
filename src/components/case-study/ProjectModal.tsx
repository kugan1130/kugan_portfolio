import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { X, Github, ExternalLink, Cpu, Eye, ShieldCheck, CheckCircle2, ArrowRight, Code2, Layers, AlertCircle, FileText, Play, Video, Film, FileVideo } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenArchitecture?: (project: ProjectItem) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenArchitecture }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'architecture' | 'features' | 'tech'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0e1626] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/80 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50 text-[11px] font-mono mb-2">
              <span>{project.category}</span>
              <span>•</span>
              <span>CASE STUDY</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {project.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {project.subtitle} — {project.featuredPositioning}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Problem & Solution
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'video'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sample Video Demo</span>
            {project.videoUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            System Architecture
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Key Features ({project.keyFeatures.length})
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tech'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Tech Stack & Engineering
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="font-heading font-bold text-white text-base mb-2 flex items-center gap-2 text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Problem</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{project.problem}</p>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40">
                <h3 className="font-heading font-bold text-white text-base mb-2 flex items-center gap-2 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Solution</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-white text-sm mb-3">Technical Highlights & Contributions</h4>
                <div className="space-y-2">
                  {project.technicalHighlights.map((hl, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-6">
              {(() => {
                const videoUrl = project.videoUrl || (
                  project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa')
                    ? '/assets/videos/Enterprise Multi-Agent AI Assistant - Google Chrome 2026-08-11 13-05-19-esv1-50p.mp4'
                    : project.id === 'ai-security-perimeter' || project.title.toLowerCase().includes('security')
                    ? '/assets/videos/frontend - Google Chrome 2026-08-11 13-53-14-esv2-50p-bg-10p-music-10p.mp4'
                    : '/assets/videos/VID20260311140230.mp4'
                );

                return (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                        <Video className="w-4 h-4 text-cyan-400" />
                        <span>Project Video Demonstration</span>
                      </h3>
                      {videoUrl && (
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                          Active Sample Video
                        </span>
                      )}
                    </div>

                    {videoUrl ? (
                      <div className="rounded-2xl overflow-hidden bg-black border border-cyan-500/40 shadow-2xl">
                        <video
                          src={videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full max-h-[420px] object-contain bg-black"
                        />
                      </div>
                    ) : (
                      <div className="p-8 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/60 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400">
                          <FileVideo className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-white text-base">No Video Attached</h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-md">
                            Sample video demonstration is not available for this project.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}



          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {(project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa') || project.id === 'ai-catcher' || project.title.toLowerCase().includes('catcher')) ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>{project.title} System Architecture &amp; Workflow Diagram</span>
                    </h3>

                    {onOpenArchitecture && (
                      <button
                        onClick={() => onOpenArchitecture(project)}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs font-mono transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Open Interactive Architecture Graph</span>
                      </button>
                    )}
                  </div>

                  <div 
                    onClick={() => onOpenArchitecture && onOpenArchitecture(project)}
                    className="p-2 sm:p-3 rounded-xl bg-[#0b101d] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group shadow-xl"
                  >
                    <img 
                      src={project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa') ? "/assets/projects/nexa_ai_architecture.svg" : "/assets/projects/ai_catcher_architecture.svg"} 
                      alt={`${project.title} Architecture & Workflow Diagram`}
                      className="w-full h-auto rounded-lg object-contain bg-[#f0f4f8] p-2 max-h-[500px]"
                    />
                    <div className="mt-2 text-center text-xs font-mono text-cyan-400 font-semibold group-hover:underline">
                      Click image to view full screen &amp; inspect interactive graph
                    </div>
                  </div>


                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-heading font-bold text-white text-base flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Visual Pipeline Diagram</span>
                    </h3>

                    {onOpenArchitecture && (
                      <button
                        onClick={() => onOpenArchitecture(project)}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs font-mono transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Open Interactive Architecture Graph</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800 leading-relaxed">
                    {project.architectureDiagramText}
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="font-heading font-bold text-white text-sm">Component Integration Breakdown</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This system decouples state management, agent execution, and storage into modular services. State transitions are governed by graph execution rules, allowing recovery, human intervention interrupts, and full auditability via trace logs.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-heading font-bold text-white text-sm mb-3">Technologies & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-mono font-medium text-cyan-300 border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <p className="text-white font-bold mb-1">Production Readiness Note:</p>
                All services are dockerized, equipped with unit/integration testing suites (Pytest/Vitest), and configured with environment security variables.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4">
          <div>
            {project.githubAvailable ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs border border-slate-700 hover:border-cyan-500 hover:text-cyan-300 transition-all shadow-md"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 text-slate-400 font-mono text-xs border border-slate-800">
                <Github className="w-4 h-4 text-slate-500" />
                <span>GitHub repository coming soon</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-semibold text-xs hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
