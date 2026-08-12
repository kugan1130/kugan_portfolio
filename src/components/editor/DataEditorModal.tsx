import React, { useState } from 'react';
import { PortfolioData, CertificationItem, TimelineEntry } from '../../types';
import { X, Save, RefreshCw, Plus, Trash2, CheckCircle2, Award, Calendar, User, Video, FileVideo } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DataEditorModalProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

export const DataEditorModal: React.FC<DataEditorModalProps> = ({
  data,
  onSave,
  onReset,
  onClose,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'certs' | 'projects' | 'timeline' | 'profile'>('certs');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New certificate state
  const [newCert, setNewCert] = useState<Partial<CertificationItem>>({
    title: '',
    issuer: '',
    date: '',
    category: 'Featured',
    description: '',
    score: '',
    imageUrl: ''
  });

  // Remove project video
  const handleRemoveProjectVideo = (projectId: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? { ...p, videoUrl: undefined } : p)
    }));
  };

  // Add new certificate
  const handleAddCert = () => {
    if (!newCert.title || !newCert.issuer) return;

    const certToAdd: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: newCert.title || 'New Certification',
      issuer: newCert.issuer || 'Issuer Name',
      date: newCert.date || '2026',
      category: (newCert.category as any) || 'Training & Workshop',
      description: newCert.description || '',
      score: newCert.score,
      imageUrl: newCert.imageUrl
    };

    // Also create corresponding timeline entry automatically
    const timelineEntryToAdd: TimelineEntry = {
      id: `tl-${Date.now()}`,
      date: certToAdd.date,
      title: certToAdd.title,
      subtitle: certToAdd.issuer,
      type: certToAdd.category === 'Internship & Experience' ? 'experience' : 'certification',
      category: certToAdd.category,
      details: certToAdd.description,
      badge: certToAdd.score,
      imageUrl: certToAdd.imageUrl
    };

    setFormData(prev => ({
      ...prev,
      certifications: [certToAdd, ...prev.certifications],
      timeline: [timelineEntryToAdd, ...prev.timeline]
    }));

    // Reset form
    setNewCert({
      title: '',
      issuer: '',
      date: '',
      category: 'Featured',
      description: '',
      score: '',
      imageUrl: ''
    });
  };

  // Delete certificate
  const handleDeleteCert = (id: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Delete timeline entry
  const handleDeleteTimeline = (id: string) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter(t => t.id !== id)
    }));
  };

  // Handle Save
  const handleSaveAll = () => {
    onSave(formData);
    setSaveSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header with Window Dots */}
        <div className="p-5 border-b border-[#E5E7EB] bg-[#F8F9FA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] font-mono text-[#4B5563] font-semibold uppercase tracking-widest pl-2 border-l border-[#E5E7EB]">
              Data-Editor v.2.4
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E5E7EB] bg-[#F8F9FA] px-6 font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('certs')}
            className={`flex items-center gap-2 px-5 py-3 text-xs tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'certs'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <Award className="w-4 h-4 text-[#2563EB]" />
            <span>CERTIFICATES ({formData.certifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-3 text-xs tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <Video className="w-4 h-4 text-[#2563EB]" />
            <span>PROJECT VIDEOS ({formData.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-5 py-3 text-xs tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'timeline'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span>TIMELINE EVENTS ({formData.timeline.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 text-xs tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <User className="w-4 h-4 text-[#2563EB]" />
            <span>CANDIDATE INFO</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-[#111827] font-sans">
          
          {/* Certificates Management Tab */}
          {activeTab === 'certs' && (
            <div className="space-y-8">
              
              {/* Add New Certificate Form */}
              <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-4">
                <h3 className="font-heading font-bold text-[#111827] text-sm flex items-center gap-2 uppercase tracking-wider">
                  <Plus className="w-4 h-4 text-[#2563EB]" />
                  <span>Add Certificate or Credential</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Certificate Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior UI & AI Architect Certification"
                      value={newCert.title || ''}
                      onChange={e => setNewCert({ ...newCert, title: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Issuer / Organization *</label>
                    <input
                      type="text"
                      placeholder="e.g. Design Guild / Meta AI"
                      value={newCert.issuer || ''}
                      onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Issue Date / Period</label>
                    <input
                      type="text"
                      placeholder="e.g. June 2025"
                      value={newCert.date || ''}
                      onChange={e => setNewCert({ ...newCert, date: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Category</label>
                    <select
                      value={newCert.category || 'Featured'}
                      onChange={e => setNewCert({ ...newCert, category: e.target.value as any })}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Featured">Featured Credential</option>
                      <option value="Internship & Experience">Internship & Experience</option>
                      <option value="Training & Workshop">Training & Workshop</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Image / Document URL</label>
                    <input
                      type="text"
                      placeholder="https://... (Image or document URL)"
                      value={newCert.imageUrl || ''}
                      onChange={e => setNewCert({ ...newCert, imageUrl: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of skills covered in this certificate..."
                    value={newCert.description || ''}
                    onChange={e => setNewCert({ ...newCert, description: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <button
                  onClick={handleAddCert}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-md shadow-[#2563EB]/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD CERTIFICATE TO TIMELINE</span>
                </button>
              </div>

              {/* Existing Certificates List */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-[#111827] text-sm uppercase tracking-wider">
                  Current Certificates ({formData.certifications.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.certifications.map(cert => (
                    <div key={cert.id} className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded font-bold">
                            {cert.category}
                          </span>
                          <span className="text-[10px] text-[#4B5563] font-mono font-semibold">{cert.date}</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#111827] leading-snug">{cert.title}</h4>
                        <p className="text-[11px] text-[#4B5563]">{cert.issuer}</p>
                      </div>

                      {/* Image Thumbnail Display */}
                      <div className="flex items-center gap-3 pt-2 border-t border-[#E5E7EB]">
                        {cert.imageUrl ? (
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-9 rounded overflow-hidden bg-white border border-[#E5E7EB] shrink-0">
                              <img src={cert.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[10px] font-mono text-emerald-600 font-semibold">Scan Attached</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-[#4B5563]">No Scan Attached</span>
                        )}

                        <div className="ml-auto flex items-center gap-1.5">
                          <button
                            onClick={() => handleDeleteCert(cert.id)}
                            className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 cursor-pointer"
                            title="Delete certificate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Projects & Videos Management Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading font-bold text-[#111827] text-sm uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#2563EB]" />
                  <span>Sample Video Recordings for Projects ({formData.projects.length})</span>
                </h3>
              </div>

              <div className="space-y-4">
                {formData.projects.map(proj => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E5E7EB] pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded font-bold uppercase">
                          {proj.category}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-[#111827] mt-1">{proj.title}</h4>
                        <p className="text-xs text-[#4B5563]">{proj.subtitle}</p>
                      </div>

                      {proj.videoUrl ? (
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Video Attached</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#4B5563] bg-white px-2.5 py-1 rounded-lg border border-[#E5E7EB]">
                          No Video
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      {/* Video Player or Placeholder */}
                      <div>
                        {proj.videoUrl ? (
                          <div className="rounded-xl overflow-hidden bg-black border border-[#E5E7EB] aspect-video relative group">
                            <video
                              src={proj.videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="p-4 h-32 rounded-xl border-2 border-dashed border-[#E5E7EB] bg-white flex flex-col items-center justify-center text-center space-y-1">
                            <FileVideo className="w-6 h-6 text-[#9CA3AF]" />
                            <span className="text-xs text-[#4B5563] font-mono">No Video File</span>
                          </div>
                        )}
                      </div>

                      {/* Video Upload Controls & URL input */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1 font-mono">
                            Video URL or Direct Link
                          </label>
                          <input
                            type="text"
                            placeholder="https://... (MP4 video link or data URL)"
                            value={proj.videoUrl || ''}
                            onChange={e => {
                              const val = e.target.value;
                              setFormData(prev => ({
                                ...prev,
                                projects: prev.projects.map(p => p.id === proj.id ? { ...p, videoUrl: val || undefined } : p)
                              }));
                            }}
                            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>

                        {proj.videoUrl && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRemoveProjectVideo(proj.id)}
                              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-mono cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove Video Link</span>
                            </button>
                          </div>
                        )}
                        <p className="text-[10px] text-[#4B5563]">
                          Supports MP4, WebM, MOV video files or hosted URL strings.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-[#111827] text-sm uppercase tracking-wider">
                  Current Timeline Events ({formData.timeline.length})
                </h3>
              </div>

              <div className="space-y-2">
                {formData.timeline.map((item, idx) => (
                  <div key={item.id || idx} className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono text-[#2563EB] font-bold">{item.date}</span>
                        <span className="text-[10px] font-mono text-[#4B5563]">• {item.category}</span>
                      </div>
                      <h4 className="font-bold text-xs text-[#111827]">{item.title}</h4>
                      <p className="text-[11px] text-[#4B5563]">{item.subtitle}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteTimeline(item.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 cursor-pointer"
                      title="Remove timeline item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidate Profile Info Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Photo Preview & Upload */}
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#E5E7EB] bg-white shrink-0">
                  {formData.candidate.photoUrl ? (
                    <img
                      src={formData.candidate.photoUrl}
                      alt={formData.candidate.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xl text-[#2563EB] font-bold">
                      {formData.candidate.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block font-mono">Profile Photo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.candidate.photoUrl || ''}
                    onChange={e => setFormData({ ...formData, candidate: { ...formData.candidate, photoUrl: e.target.value } })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Full Name</label>
                  <input
                    type="text"
                    value={formData.candidate.name}
                    onChange={e => setFormData({ ...formData, candidate: { ...formData.candidate, name: e.target.value } })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Professional Title</label>
                  <input
                    type="text"
                    value={formData.candidate.title}
                    onChange={e => setFormData({ ...formData, candidate: { ...formData.candidate, title: e.target.value } })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Email Address</label>
                  <input
                    type="email"
                    value={formData.candidate.email}
                    onChange={e => setFormData({ ...formData, candidate: { ...formData.candidate, email: e.target.value } })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Phone Number</label>
                  <input
                    type="text"
                    value={formData.candidate.phone}
                    onChange={e => setFormData({ ...formData, candidate: { ...formData.candidate, phone: e.target.value } })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#4B5563] font-semibold block mb-1.5 font-mono">Professional Summary</label>
                <textarea
                  rows={4}
                  value={formData.candidate.summary}
                  onChange={e => setFormData({ ...formData, candidate: { ...formData.candidate, summary: e.target.value } })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#E5E7EB] bg-[#F8F9FA] flex flex-wrap items-center justify-between gap-4 font-mono">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET DEFAULTS</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] text-xs cursor-pointer"
            >
              CANCEL
            </button>

            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md shadow-[#2563EB]/20 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>SAVED!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>SAVE CHANGES</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
