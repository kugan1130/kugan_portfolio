import React from 'react';
import { CertificationItem } from '../../types';
import { Award, ShieldCheck, CheckCircle2, Star, Sparkles, Building2, Calendar, FileText } from 'lucide-react';

interface CertificateDocumentProps {
  cert: CertificationItem;
  className?: string;
  showFullDetails?: boolean;
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  cert,
  className = '',
  showFullDetails = false,
}) => {
  const isFeatured = cert.category === 'Featured' || cert.isExamBased;

  return (
    <div
      className={`relative w-full aspect-[16/10] bg-gradient-to-br from-[#0D131F] via-[#080B12] to-[#121A2B] border-2 ${
        isFeatured ? 'border-amber-500/40 shadow-amber-500/10' : 'border-white/15'
      } rounded-xl p-5 sm:p-7 flex flex-col justify-between text-center select-none overflow-hidden shadow-2xl ${className}`}
    >
      {/* Ornate Corner Security Flourishes */}
      <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-amber-500/60 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-amber-500/60 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-amber-500/60 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-amber-500/60 rounded-br-sm pointer-events-none" />

      {/* Inner Decorative Hairline Border */}
      <div className="absolute inset-3 border border-amber-500/20 rounded-lg pointer-events-none" />

      {/* Background Watermark Seal */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <Award className="w-72 h-72 text-amber-300" />
      </div>

      {/* Certificate Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>{cert.issuer}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
          <Calendar className="w-3 h-3 text-[#FF3D00]" />
          <span>{cert.date}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="relative z-10 my-auto py-2 space-y-1.5">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400/90 font-semibold">
          {cert.isExamBased ? 'PROCTORED NATIONAL CERTIFICATION' : 'OFFICIAL CERTIFICATE OF COMPLETION'}
        </p>

        <h3 className="font-heading font-extrabold text-base sm:text-lg md:text-xl text-white tracking-wide leading-tight line-clamp-2 px-2">
          {cert.title}
        </h3>

        <div className="pt-1 flex flex-col items-center">
          <p className="text-[10px] font-sans italic text-white/50">PROUDLY PRESENTED TO</p>
          <p className="font-serif font-extrabold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wider mt-0.5">
            KUGAN K
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent my-1" />
        </div>

        <p className="text-[11px] text-white/70 font-sans line-clamp-2 max-w-lg mx-auto px-2">
          {cert.description}
        </p>
      </div>

      {/* Footer / Verification Bar */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-left">
          {cert.score ? (
            <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {cert.score}
            </span>
          ) : cert.certificateId ? (
            <span className="text-white/60">ID: {cert.certificateId}</span>
          ) : (
            <span className="text-white/60">STATUS: VERIFIED</span>
          )}
        </div>

        {/* Golden Emblem Seal */}
        <div className="flex items-center gap-1 text-amber-400 font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="tracking-wider">VERIFIED CREDENTIAL</span>
        </div>
      </div>
    </div>
  );
};
