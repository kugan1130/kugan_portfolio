import React, { useState } from 'react';
import { Cpu, Eye, Database, ArrowRight, ShieldCheck, Layers, Sparkles, CheckCircle2, RefreshCw, Terminal } from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'multi-cv'>('enterprise');
  const [selectedNode, setSelectedNode] = useState<string | null>('router');

  const enterpriseNodes = [
    {
      id: 'user',
      title: 'User Prompt & Input',
      type: 'Input Layer',
      icon: 'Terminal',
      tech: 'React / FastAPI REST',
      desc: 'User submits text queries, PDF documents, or structured database request commands through the frontend.'
    },
    {
      id: 'router',
      title: 'LangGraph Intent Router',
      type: 'Orchestrator',
      icon: 'Cpu',
      tech: 'LangGraph + Groq Llama 3.3 70B',
      desc: 'Analyzes user intent and routes execution dynamically to RAG, SQL, Web, or Direct Response agent graphs.'
    },
    {
      id: 'rag',
      title: 'RAG Knowledge Agent',
      type: 'Retrieval Engine',
      icon: 'Layers',
      tech: 'LangChain + ChromaDB',
      desc: 'Chunks uploaded PDFs, generates vector embeddings, and performs hybrid similarity search across enterprise documents.'
    },
    {
      id: 'sql',
      title: 'Schema-Aware SQL Agent',
      type: 'Data Analytics',
      icon: 'Database',
      tech: 'PostgreSQL + SQLAlchemy',
      desc: 'Inspects relational DB schemas and constructs parameterized, safety-checked SQL queries to fetch business metrics.'
    },
    {
      id: 'memory',
      title: 'Session & Context Memory',
      type: 'State Storage',
      icon: 'Database',
      tech: 'Redis Session Cache',
      desc: 'Stores conversation history, intermediate tool states, and user context across multi-turn sessions.'
    },
    {
      id: 'guardrails',
      title: 'Human-in-the-Loop & Guardrails',
      type: 'Security Layer',
      icon: 'ShieldCheck',
      tech: 'Pydantic + LangGraph Interrupts',
      desc: 'Validates safety guardrails and triggers human approval interrupts before performing sensitive database writes.'
    }
  ];

  const multiCvNodes = [
    {
      id: 'camera',
      title: 'Live Camera Video Feed',
      type: 'Ingestion Layer',
      icon: 'Eye',
      tech: 'OpenCV / MJPEG Stream',
      desc: 'Captures live frames from IP cameras or webcam streams at 30 FPS for downstream vision processing.'
    },
    {
      id: 'detection',
      title: 'YOLOv11 Person Detector',
      type: 'Vision Model',
      icon: 'Eye',
      tech: 'YOLOv11 PyTorch Model',
      desc: 'Executes fast GPU/CPU bounding box detection to identify people, objects, and spatial locations in each frame.'
    },
    {
      id: 'tracking',
      title: 'ByteTrack Persistent Tracking',
      type: 'Spatial Tracker',
      icon: 'RefreshCw',
      tech: 'ByteTrack Algorithm',
      desc: 'Assigns persistent track IDs across frames to track individual trajectory paths even through temporary occlusions.'
    },
    {
      id: 'zone',
      title: 'Shapely Polygon Perimeter Zone',
      type: 'Spatial Geometry',
      icon: 'ShieldCheck',
      tech: 'Shapely Geometry Engine',
      desc: 'Calculates exact geometric intersections between tracked feet coordinates and restricted polygon zones.'
    },
    {
      id: 'analysis',
      title: 'LangGraph Threat Analyzer',
      type: 'Multi-Agent AI',
      icon: 'Cpu',
      tech: 'LangGraph + Gemini / Groq',
      desc: 'Evaluates severity, computes threat scores, and analyzes incident context using multi-agent reasoning.'
    },
    {
      id: 'evidence',
      title: 'Evidence & Dashboard Alert',
      type: 'Persistence & UI',
      icon: 'Database',
      tech: 'PostgreSQL + Redis + React',
      desc: 'Captures instant image evidence snapshots, logs events in PostgreSQL, and streams alerts to the React security dashboard.'
    }
  ];

  const getCurrentNodes = () => {
    if (activeTab === 'enterprise') return enterpriseNodes;
    return multiCvNodes;
  };

  const currentNodes = getCurrentNodes();
  const activeNodeDetails = currentNodes.find(n => n.id === selectedNode) || currentNodes[0];

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>SYSTEM DESIGN SHOWCASE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            How I Build <span className="text-[#2563EB]">AI Systems</span>
          </h2>
          <p className="mt-3 text-[#4B5563] max-w-2xl text-sm sm:text-base">
            Click nodes in the architectural diagrams below to inspect production design patterns, data flows, and state management strategies.
          </p>

          {/* Architecture Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 p-1.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <button
              onClick={() => {
                setActiveTab('enterprise');
                setSelectedNode('router');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'enterprise'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Multi Agent System</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('multi-cv');
                setSelectedNode('detection');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'multi-cv'
                  ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Multi-Agent Computer Vision</span>
            </button>
          </div>
        </div>

        {/* Diagram + Inspector Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Architecture Flow Canvas / Diagram */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-md relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                <h3 className="font-heading font-bold text-[#111827] text-base">
                  {activeTab === 'enterprise' && 'Multi Agent System Orchestration Topology'}
                  {activeTab === 'multi-cv' && 'Multi-Agent Computer Vision Pipeline Flow'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#2563EB] font-bold px-2.5 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20">
                Interactive Nodes
              </span>
            </div>

            {/* Visual Node Grid Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentNodes.map((node, index) => {
                const isSelected = selectedNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl text-left border transition-all relative group cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB]/10 border-[#2563EB] text-[#111827] shadow-sm shadow-[#2563EB]/10 ring-1 ring-[#2563EB]/30'
                        : 'bg-[#F8F9FA] border-[#E5E7EB] text-[#111827] hover:border-[#2563EB]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#2563EB] font-bold border border-[#E5E7EB]">
                        STEP 0{index + 1}
                      </span>
                      <span className="text-[10px] font-mono text-[#4B5563] font-semibold">{node.type}</span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-[#111827] mb-1 group-hover:text-[#2563EB] transition-colors">
                      {node.title}
                    </h4>

                    <p className="text-[11px] font-mono text-[#4B5563] line-clamp-1">
                      {node.tech}
                    </p>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2563EB] shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Architecture Code/Flow Preview */}
            <div className="mt-6 p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] font-mono text-xs text-[#111827] overflow-x-auto">
              <div className="flex items-center justify-between text-[#4B5563] text-[11px] pb-2 mb-2 border-b border-[#E5E7EB] font-semibold">
                <span>SYSTEM DATA PIPELINE EXECUTION</span>
                <span className="text-[#2563EB] font-bold">STATE: OK</span>
              </div>
              <p className="text-[#2563EB] font-bold">
                {activeTab === 'enterprise' && 'USER_PROMPT -> [INTENT_ROUTER] -> (RAG | SQL | WEB) -> REDIS_CONTEXT -> GUARDRAILS -> OUTPUT'}
                {activeTab === 'multi-cv' && 'STREAM_FRAME -> [YOLOv11] -> BYTETRACK -> SHAPELY_ZONE -> LANGGRAPH_AGENT -> ALERT_STREAM'}
              </p>
            </div>

          </div>

          {/* Node Inspector Detail Panel */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-md relative bg-white">
            <div className="flex items-center gap-2 text-[#2563EB] font-mono text-xs mb-3 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>NODE INSPECTOR</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#111827] mb-1">
              {activeNodeDetails.title}
            </h3>

            <div className="inline-block px-2.5 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono font-semibold mb-6">
              {activeNodeDetails.type} • {activeNodeDetails.tech}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono text-[#4B5563] uppercase tracking-wider mb-1 font-semibold">
                  Architecture Role & Logic
                </h4>
                <p className="text-sm text-[#111827] leading-relaxed bg-[#F8F9FA] p-4 rounded-xl border border-[#E5E7EB]">
                  {activeNodeDetails.desc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#4B5563] uppercase tracking-wider mb-2 font-semibold">
                  Engineering Principles Applied
                </h4>
                <ul className="space-y-2 text-xs text-[#4B5563]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>Strict type validations using Pydantic models & TypeScript interfaces.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>Low-latency state persistence in Redis session cache.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>Full observability traces via LangSmith instrumentation.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
