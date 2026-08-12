import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../../types';
import {
  X, Cpu, ZoomIn, ZoomOut, RotateCcw, Maximize2, Shield, Layers,
  Database, Layout, ArrowRight, Activity, CheckCircle2, AlertTriangle,
  Server, Eye, Sparkles, Code2, Terminal, Info, ChevronRight, Lock
} from 'lucide-react';

interface ProjectArchitectureModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

interface WorkflowNode {
  id: string;
  title: string;
  category: 'ingestion' | 'processing' | 'orchestration' | 'agent' | 'guardrail' | 'storage' | 'ui' | 'alert';
  tech: string;
  purpose: string;
  details?: string;
  inputs?: string[];
  outputs?: string[];
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'flow' | 'ai_layer' | 'data' | 'output'>('flow');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [viewMode, setViewMode] = useState<'detailed' | 'overview'>('detailed');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isImageArchitecture = project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa') || project.id === 'ai-catcher' || project.title.toLowerCase().includes('catcher');

  // Generate specific workflow nodes based on project ID
  const getWorkflowNodes = (): WorkflowNode[] => {
    if (project.id === 'proj-nexa-ai' || project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa')) {
      return [
        {
          id: 'nexa-1',
          title: 'USER REQUEST',
          category: 'ingestion',
          tech: 'React Web UI / Chat Input',
          purpose: 'Captures natural language prompt and contextual session parameters from the user interface.',
          outputs: ['nexa-2']
        },
        {
          id: 'nexa-2',
          title: 'FASTAPI BACKEND',
          category: 'processing',
          tech: 'FastAPI Gateway & Async Routes',
          purpose: 'Handles CORS, authentication headers, request validation, and forwards payload to orchestrator.',
          inputs: ['nexa-1'],
          outputs: ['nexa-3']
        },
        {
          id: 'nexa-3',
          title: 'LANGGRAPH ORCHESTRATOR',
          category: 'orchestration',
          tech: 'StateGraph Execution Engine',
          purpose: 'Manages stateful execution flow, branching logic, and agent state transitions.',
          inputs: ['nexa-2'],
          outputs: ['nexa-4']
        },
        {
          id: 'nexa-4',
          title: 'LOAD CONTEXT NODE',
          category: 'storage',
          tech: 'Redis Session Cache',
          purpose: 'Fetches conversation history, user preferences, and short-term memory key-values.',
          inputs: ['nexa-3'],
          outputs: ['nexa-5']
        },
        {
          id: 'nexa-5',
          title: 'SUPERVISOR AGENT',
          category: 'agent',
          tech: 'Pydantic Structured RouteDecision',
          purpose: 'Evaluates prompt intent and outputs structured JSON route decision to activate domain agents.',
          inputs: ['nexa-4'],
          outputs: ['nexa-6a', 'nexa-6b', 'nexa-6c']
        },
        {
          id: 'nexa-6a',
          title: 'RAG AGENT',
          category: 'agent',
          tech: 'ChromaDB Document Vector Store',
          purpose: 'Performs semantic similarity search over enterprise PDF/doc embeddings.',
          inputs: ['nexa-5'],
          outputs: ['nexa-7']
        },
        {
          id: 'nexa-6b',
          title: 'WEB AGENT',
          category: 'agent',
          tech: 'Tavily Search API',
          purpose: 'Queries live web search engines for up-to-date internet knowledge.',
          inputs: ['nexa-5'],
          outputs: ['nexa-7']
        },
        {
          id: 'nexa-6c',
          title: 'SQL AGENT',
          category: 'agent',
          tech: 'PostgreSQL Sales Analytics DB',
          purpose: 'Translates natural language to SQL queries and executes analytics against PostgreSQL.',
          inputs: ['nexa-5'],
          outputs: ['nexa-7']
        },
        {
          id: 'nexa-7',
          title: 'CONTEXT BUILDER & LLM NODE',
          category: 'processing',
          tech: 'Groq Llama-3 / Mixtral LLM',
          purpose: 'Synthesizes retrieved vector, web, and SQL results into a cohesive final response.',
          inputs: ['nexa-6a', 'nexa-6b', 'nexa-6c'],
          outputs: ['nexa-8']
        },
        {
          id: 'nexa-8',
          title: 'INPUT / OUTPUT GUARDRAIL',
          category: 'guardrail',
          tech: 'Pydantic Safety & Threat Policy Check',
          purpose: 'Inspects response against safety rules, prompt injection risks, and PII leakage policies.',
          inputs: ['nexa-7'],
          outputs: ['nexa-9a', 'nexa-9b']
        },
        {
          id: 'nexa-9a',
          title: 'SAVE MEMORY & DB LOG (PASSED)',
          category: 'storage',
          tech: 'ChromaDB & PostgreSQL Log Persistence',
          purpose: 'Persists conversation history, session memory, and trace telemetry.',
          inputs: ['nexa-8'],
          outputs: ['nexa-10']
        },
        {
          id: 'nexa-9b',
          title: 'SAFETY REFUSAL (FAILED)',
          category: 'alert',
          tech: 'Security Threat Override',
          purpose: 'Logs policy violation and generates safe security refusal payload.',
          inputs: ['nexa-8'],
          outputs: ['nexa-10']
        },
        {
          id: 'nexa-10',
          title: 'REACT DASHBOARD & LIVE STREAM',
          category: 'ui',
          tech: 'WebSocket / SSE Event Stream & React UI',
          purpose: 'Streams Markdown responses, execution thoughts, and tool traces in real-time to user.',
          inputs: ['nexa-9a', 'nexa-9b']
        }
      ];
    } else if (project.id === 'proj-ai-catcher' || project.id === 'ai-catcher' || project.title.toLowerCase().includes('catcher')) {
      return [
        {
          id: 'catch-1',
          title: 'VIDEO INGESTION',
          category: 'ingestion',
          tech: 'IP Camera / RTSP / HTTP Video Streams',
          purpose: 'Streams raw video frames from security cameras at up to 30 FPS.',
          outputs: ['catch-2']
        },
        {
          id: 'catch-2',
          title: 'CAPTURE & PREPROCESSING',
          category: 'processing',
          tech: 'OpenCV + FFMPEG Engine',
          purpose: 'Handles frame decoding, image rotation, and Auto-ROI crop pre-filtering.',
          inputs: ['catch-1'],
          outputs: ['catch-3']
        },
        {
          id: 'catch-3',
          title: 'DETECTION & TRACKING',
          category: 'agent',
          tech: 'YOLOv8 Person Detection + Pose Keypoints + ByteTrack',
          purpose: 'Detects human bounding boxes, 17-point pose keypoints, and maintains persistent tracking IDs.',
          inputs: ['catch-2'],
          outputs: ['catch-4']
        },
        {
          id: 'catch-4',
          title: 'SPATIAL ENGINE',
          category: 'processing',
          tech: 'Polygon Boundary Collision Check',
          purpose: 'Evaluates bounding box coordinates against configured intrusion zone polygons.',
          inputs: ['catch-3'],
          outputs: ['catch-5']
        },
        {
          id: 'catch-5',
          title: 'THREAT LEVEL CLASSIFIER',
          category: 'guardrail',
          tech: 'L1 SAFE -> L2 WARNING -> L3 INTRUSION',
          purpose: 'Escalates intrusion severity and captures snapshot image + video clip on L3 Intrusion.',
          inputs: ['catch-4'],
          outputs: ['catch-6']
        },
        {
          id: 'catch-6',
          title: 'VIOLENCE ENGINE',
          category: 'agent',
          tech: 'YOLO Class. + Pose Motion Hit Accumulator',
          purpose: 'Triggered when >=2 people are in L3 zone. Accumulates motion energy and temporal decay.',
          inputs: ['catch-5'],
          outputs: ['catch-7']
        },
        {
          id: 'catch-7',
          title: 'RISK & EVENT ENGINE (L4 CRITICAL)',
          category: 'alert',
          tech: 'BEEP / SIREN / Evidence Locker',
          purpose: 'Triggers hardware audio alerts, siren triggers, and saves evidence video artifacts.',
          inputs: ['catch-6'],
          outputs: ['catch-8']
        },
        {
          id: 'catch-8',
          title: 'FLASK + NODE SERVER',
          category: 'storage',
          tech: 'Flask Backend & Node Event Relay',
          purpose: 'Logs security events to persistent storage and relays stream frames to web dashboard.',
          inputs: ['catch-7'],
          outputs: ['catch-9']
        },
        {
          id: 'catch-9',
          title: 'WEB DASHBOARD & DYNAMIC CONFIG',
          category: 'ui',
          tech: 'React Dashboard UI with Hot Reload',
          purpose: 'Displays live feed, event history, and allows admin to reconfigure ROI zones on the fly.',
          inputs: ['catch-8']
        }
      ];
    } else {
      // Default: AI Security Perimeter
      return [
        {
          id: 'sec-1',
          title: 'CAMERA STREAM',
          category: 'ingestion',
          tech: 'RTSP / Web Camera Feed',
          purpose: 'Direct video ingestion from physical RTSP surveillance feeds or USB cameras.',
          outputs: ['sec-2']
        },
        {
          id: 'sec-2',
          title: 'FASTAPI BACKEND',
          category: 'processing',
          tech: 'FastAPI + OpenCV Frame Ingestion',
          purpose: 'Decodes video streams, manages buffer queues, and extracts raw image matrices.',
          inputs: ['sec-1'],
          outputs: ['sec-3']
        },
        {
          id: 'sec-3',
          title: 'YOLO11 DETECTOR & TRACKER',
          category: 'agent',
          tech: 'YOLO11 Object Detector + ByteTrack ID',
          purpose: 'Identifies human targets, bounding boxes, and assigns persistent ByteTrack tracking IDs.',
          inputs: ['sec-2'],
          outputs: ['sec-4']
        },
        {
          id: 'sec-4',
          title: 'PERIMETER ENGINE',
          category: 'processing',
          tech: 'Zone Polygon & Foot Boundary Polygon',
          purpose: 'Calculates spatial geometry collision between person foot points and restricted zone boundaries.',
          inputs: ['sec-3'],
          outputs: ['sec-5']
        },
        {
          id: 'sec-5',
          title: 'LANGGRAPH ORCHESTRATOR',
          category: 'orchestration',
          tech: 'StateGraph Execution Engine',
          purpose: 'Coordinates multi-agent reasoning graphs and maintains event state context across frames.',
          inputs: ['sec-4'],
          outputs: ['sec-6']
        },
        {
          id: 'sec-6',
          title: 'EVENT GUARDRAIL',
          category: 'guardrail',
          tech: 'Validate Event Schema & Payload',
          purpose: 'Ensures detection coordinates, timestamps, and camera IDs match expected security schemas.',
          inputs: ['sec-5'],
          outputs: ['sec-7']
        },
        {
          id: 'sec-7',
          title: 'CONTEXT AGENT',
          category: 'agent',
          tech: 'Zone History & Multi-Frame Memory',
          purpose: 'Maintains temporal history of target movements, previous zone entries, and velocity context.',
          inputs: ['sec-6'],
          outputs: ['sec-8a', 'sec-8b', 'sec-8c']
        },
        {
          id: 'sec-8a',
          title: 'BEHAVIOR AGENT',
          category: 'agent',
          tech: 'Speed & Dwell Trajectory Analytics',
          purpose: 'Analyzes target movement speed, loitering dwell time, and trajectory vectors.',
          inputs: ['sec-7'],
          outputs: ['sec-9']
        },
        {
          id: 'sec-8b',
          title: 'RISK AGENT',
          category: 'agent',
          tech: 'Threat Score Risk Matrix',
          purpose: 'Computes numerical threat index based on zone sensitivity, time-of-day, and target count.',
          inputs: ['sec-7'],
          outputs: ['sec-9']
        },
        {
          id: 'sec-8c',
          title: 'SECURITY AGENT',
          category: 'agent',
          tech: 'SOP Evaluation Zone Severity',
          purpose: 'Cross-references security standard operating procedures (SOPs) for the violated zone.',
          inputs: ['sec-7'],
          outputs: ['sec-9']
        },
        {
          id: 'sec-9',
          title: 'DECISION AGENT',
          category: 'agent',
          tech: 'Action Determination (IGNORE / FLAG / ALARM)',
          purpose: 'Synthesizes specialized agent outputs to select final security action.',
          inputs: ['sec-8a', 'sec-8b', 'sec-8c'],
          outputs: ['sec-10']
        },
        {
          id: 'sec-10',
          title: 'DECISION GUARDRAIL',
          category: 'guardrail',
          tech: 'Policy Safety & Threshold Verification',
          purpose: 'Verifies alarm action against threshold parameters to prevent false positive alarms.',
          inputs: ['sec-9'],
          outputs: ['sec-11a', 'sec-11b']
        },
        {
          id: 'sec-11a',
          title: 'ALERT AGENT (PASSED)',
          category: 'alert',
          tech: 'Payload Assembly & WebSocket Stream',
          purpose: 'Assembles alert payload with snapshot image, bounding box, and threat rating.',
          inputs: ['sec-10'],
          outputs: ['sec-12']
        },
        {
          id: 'sec-11b',
          title: 'SAFETY OVERRIDE (FAILED)',
          category: 'alert',
          tech: 'Log Violation Audit',
          purpose: 'Logs rejected alert event to audit table for model retraining and threshold tuning.',
          inputs: ['sec-10'],
          outputs: ['sec-12']
        },
        {
          id: 'sec-12',
          title: 'REACT DASHBOARD & SQLITE DB',
          category: 'ui',
          tech: 'WebSocket Server & React Live Alerts UI',
          purpose: 'Renders real-time visual bounding boxes, audio siren triggers, and archives events in SQLite.',
          inputs: ['sec-11a', 'sec-11b']
        }
      ];
    }
  };

  const nodes = getWorkflowNodes();

  const getCategoryBadgeStyle = (category: WorkflowNode['category']) => {
    switch (category) {
      case 'ingestion':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
      case 'processing':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/60';
      case 'orchestration':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60';
      case 'agent':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'guardrail':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/60';
      case 'storage':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/60';
      case 'ui':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60';
      case 'alert':
        return 'bg-[#FF3D00]/20 text-[#FF3D00] border-[#FF3D00]/50';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-800';
    }
  };

  const getCategoryIcon = (category: WorkflowNode['category']) => {
    switch (category) {
      case 'ingestion':
        return <Eye className="w-3.5 h-3.5 text-blue-400" />;
      case 'processing':
        return <Code2 className="w-3.5 h-3.5 text-purple-400" />;
      case 'orchestration':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'agent':
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />;
      case 'guardrail':
        return <Shield className="w-3.5 h-3.5 text-rose-400" />;
      case 'storage':
        return <Database className="w-3.5 h-3.5 text-amber-400" />;
      case 'ui':
        return <Layout className="w-3.5 h-3.5 text-indigo-400" />;
      case 'alert':
        return <Activity className="w-3.5 h-3.5 text-[#FF3D00]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-[#0B101D] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col text-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF3D00]/20 text-[#FF3D00] border border-[#FF3D00]/40 text-[10px] font-mono font-bold uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">• ARCHITECTURE & WORKFLOW</span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>{project.title}</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close architecture modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content Area - Image Only */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Action Header Bar */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-cyan-400 font-bold flex items-center gap-2 text-xs sm:text-sm">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="uppercase">{project.title} SYSTEM ARCHITECTURE DIAGRAM</span>
            </span>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand Full Resolution</span>
            </button>
          </div>

          {/* Main Architecture Image Display */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative p-3 sm:p-5 rounded-2xl bg-[#0b101d] border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group shadow-2xl overflow-hidden text-center"
          >
            <img 
              src={project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa') ? "/assets/projects/nexa_ai_architecture.svg" : "/assets/projects/ai_catcher_architecture.svg"} 
              alt={`${project.title} Architecture & Workflow Diagram`}
              className="w-full h-auto rounded-xl object-contain max-h-[680px] group-hover:scale-[1.005] transition-transform duration-300 mx-auto bg-[#f0f4f8] p-2"
            />
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs font-mono shadow-2xl flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                Click to Expand Full Resolution Diagram
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Architecture Diagram */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-7xl w-full max-h-[94vh] flex flex-col bg-[#0b101d] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white font-mono text-xs shrink-0">
              <span className="font-bold text-cyan-400 flex items-center gap-2 text-sm">
                <Cpu className="w-4 h-4 text-cyan-400" />
                {project.title} System Architecture &amp; Workflow Specification
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-auto flex-1 flex items-center justify-center bg-[#f0f4f8]">
              <img 
                src={project.id === 'nexa-ai' || project.title.toLowerCase().includes('nexa') ? "/assets/projects/nexa_ai_architecture.svg" : "/assets/projects/ai_catcher_architecture.svg"} 
                alt={`${project.title} Architecture & Workflow Full Resolution`}
                className="w-full h-auto max-w-full rounded-lg shadow-xl object-contain"
              />
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 text-center text-xs font-mono text-slate-400 shrink-0">
              Click anywhere outside or press ESC / Close to dismiss
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
