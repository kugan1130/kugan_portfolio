import React, { useState, useEffect } from 'react';
import { CertificationItem } from '../../types';
import { CertificateDocument } from './CertificateDocument';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Award } from 'lucide-react';

interface CertificateViewerModalProps {
  certification: CertificationItem | null;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({ certification, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!certification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden my-4 max-h-[92vh] flex flex-col text-[#111827]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E5E7EB] bg-[#F8F9FA] flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-[10px] font-mono mb-2">
              <Award className="w-3 h-3 text-[#2563EB]" />
              <span>{certification.category.toUpperCase()}</span>
              {certification.isExamBased && <span>• PROCTORED EXAM</span>}
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#111827]">
              {certification.title}
            </h2>
            <p className="text-[#4B5563] text-xs sm:text-sm mt-1">
              Issued by <span className="text-[#2563EB] font-semibold">{certification.issuer}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9] transition-colors shrink-0 cursor-pointer"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Certificate Image or Generated Document Box */}
          <div className="relative rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] p-4 min-h-[280px] flex flex-col items-center justify-center overflow-hidden shadow-inner group">
            
            {/* Zoom controls */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-white border border-[#E5E7EB] backdrop-blur-md shadow-md">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.2))}
                className="p-1.5 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E7EB] text-[#111827] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
                className="p-1.5 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E7EB] text-[#111827] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E7EB] text-[#111827] text-xs font-mono px-2 cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Certificate Preview Element */}
            <div
              className="transition-transform duration-200 w-full flex justify-center origin-center pt-8 sm:pt-4"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {certification.imageUrl && !imgError ? (
                <div className="relative">
                  <img
                    src={certification.imageUrl}
                    alt={certification.title}
                    onError={() => setImgError(true)}
                    className="max-h-[420px] object-contain rounded-xl shadow-md border border-[#E5E7EB]"
                  />
                </div>
              ) : (
                /* Verified Official Document Graphic Preview Frame */
                <div className="w-full max-w-2xl space-y-4">
                  <CertificateDocument cert={certification} showFullDetails={true} />
                </div>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#4B5563] font-semibold uppercase block">Issuing Organization</span>
              <p className="text-[#111827] font-bold mt-0.5">{certification.issuer}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
              <span className="text-[10px] text-[#4B5563] font-semibold uppercase block">Date / Timeline</span>
              <p className="text-[#111827] font-bold mt-0.5">{certification.date}</p>
            </div>

            {certification.score && (
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#4B5563] font-semibold uppercase block">Score / Achievement</span>
                <p className="text-[#2563EB] font-bold mt-0.5">{certification.score}</p>
              </div>
            )}

            {certification.role && (
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#4B5563] font-semibold uppercase block">Candidate Role</span>
                <p className="text-[#2563EB] font-bold mt-0.5">{certification.role}</p>
              </div>
            )}

            {certification.course && (
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#4B5563] font-semibold uppercase block">Course Program</span>
                <p className="text-[#2563EB] font-bold mt-0.5">{certification.course}</p>
              </div>
            )}

            {certification.certificateId && (
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <span className="text-[10px] text-[#4B5563] font-semibold uppercase block">Certificate ID</span>
                <p className="text-[#2563EB] font-bold mt-0.5">{certification.certificateId}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#111827] leading-relaxed">
            <span className="text-[10px] font-mono text-[#4B5563] font-semibold uppercase tracking-widest block mb-1">
              CERTIFICATE OVERVIEW & VERIFICATION NOTES
            </span>
            {certification.description}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E5E7EB] bg-[#F8F9FA] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            {(certification.verificationUrl || certification.certificateUrl) && (
              <a
                href={certification.verificationUrl || certification.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30 text-xs font-mono font-bold hover:bg-[#2563EB]/20 transition-colors"
              >
                <span>Verify Credential Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md transition-colors shadow-[#2563EB]/20 cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};

