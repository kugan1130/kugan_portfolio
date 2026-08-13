import React, { useState } from 'react';
import { CertificationItem } from '../../types';
import { CertificateViewerModal } from './CertificateViewerModal';
import { CertificateDocument } from './CertificateDocument';
import { Award, Eye, Calendar, Building2 } from 'lucide-react';

interface CertificatesGalleryProps {
  certifications: CertificationItem[];
}

export const CertificatesGallery: React.FC<CertificatesGalleryProps> = ({
  certifications,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'internship' | 'workshop' | 'exam'>('all');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const filteredCerts = certifications.filter((cert) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.description && cert.description.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (activeFilter === 'featured') return cert.category === 'Featured';
    if (activeFilter === 'internship') return cert.category === 'Internship & Experience';
    if (activeFilter === 'workshop') return cert.category === 'Training & Workshop';
    if (activeFilter === 'exam') return cert.isExamBased;
    return true;
  });

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            Official <span className="text-[#2563EB]">Certificates & Awards</span>
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E5E7EB] text-xs font-mono shadow-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                ALL ({certifications.length})
              </button>
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeFilter === 'featured'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                FEATURED
              </button>
              <button
                onClick={() => setActiveFilter('internship')}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeFilter === 'internship'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                INTERNSHIPS
              </button>
              <button
                onClick={() => setActiveFilter('workshop')}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeFilter === 'workshop'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                WORKSHOPS
              </button>
              <button
                onClick={() => setActiveFilter('exam')}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeFilter === 'exam'
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9]'
                }`}
              >
                PROCTORED EXAMS
              </button>
            </div>
          </div>
        </div>

        {/* Parallel 2-Column Grid View (Scroll Top to Bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#2563EB]/50 transition-all flex flex-col justify-between shadow-md group relative overflow-hidden"
            >
              {/* Top Image / Document Card Frame */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F8F9FA] border border-[#E5E7EB] mb-4 group-hover:border-[#2563EB]/40 transition-colors flex items-center justify-center">
                {cert.imageUrl && !imgErrorMap[cert.id] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      onError={() => setImgErrorMap(prev => ({ ...prev, [cert.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  /* Elegant Rendered Official Certificate Document Graphic */
                  <CertificateDocument cert={cert} className="w-full h-full" />
                )}

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 backdrop-blur-xs p-4">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-mono font-bold shadow-md shadow-[#2563EB]/30 hover:scale-105 transition-transform"
                  >
                    <Eye className="w-4 h-4" />
                    <span>INSPECT / CHECK CERTIFICATE</span>
                  </button>
                </div>
              </div>

              {/* Certificate Information Below Image */}
              <div className="space-y-2">
                {/* Small Name & Category Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {/* Small Name */}
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#111827] leading-snug group-hover:text-[#2563EB] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-[#4B5563] flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{cert.issuer}</span>
                    </p>
                  </div>

                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#F8F9FA] border border-[#E5E7EB] text-[#4B5563] shrink-0 font-medium">
                    {cert.category}
                  </span>
                </div>

                {/* Details & Description */}
                <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2 font-sans pt-1">
                  {cert.description}
                </p>

                {/* Footer Action Bar */}
                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-[#4B5563] flex items-center gap-1 text-[11px] font-semibold">
                    <Calendar className="w-3 h-3 text-[#2563EB]" />
                    <span>{cert.date}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-[#2563EB]/10 text-[#2563EB] border border-[#E5E7EB] hover:border-[#2563EB]/40 font-bold transition-all text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW CERTIFICATE</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredCerts.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-[#E5E7EB]">
            <Award className="w-12 h-12 text-[#4B5563]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#111827]">No certificates matched your filter.</h3>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-3 text-xs font-mono text-[#2563EB] underline"
            >
              Show all certificates
            </button>
          </div>
        )}

      </div>

      {/* Certificate High-Res Viewer Modal */}
      {selectedCert && (
        <CertificateViewerModal
          certification={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};

