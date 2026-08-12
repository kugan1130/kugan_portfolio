import React, { useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { getPortfolioData, savePortfolioData } from './data/portfolioData';
import { asyncLoadPortfolioData, asyncSavePortfolioData, asyncResetPortfolioData } from './lib/dbStorage';
import { Background3D } from './components/3d/Background3D';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Skills } from './components/skills/Skills';
import { Projects } from './components/projects/Projects';
import { ArchitectureViewer } from './components/architecture/ArchitectureViewer';
import { CertificatesGallery } from './components/certificates/CertificatesGallery';
import { Timeline } from './components/timeline/Timeline';
import { Experience } from './components/experience/Experience';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/layout/Footer';
import { DataEditorModal } from './components/editor/DataEditorModal';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(getPortfolioData());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Load from IndexedDB on initial mount
  useEffect(() => {
    asyncLoadPortfolioData().then((storedData) => {
      if (storedData) {
        setPortfolioData(storedData);
      }
    });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'capabilities', 'projects', 'architecture', 'certificates', 'timeline', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save updated portfolio data to IndexedDB + localStorage
  const handleSaveData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    savePortfolioData(newData);
    asyncSavePortfolioData(newData);
  };

  // Reset to default portfolio data
  const handleResetData = async () => {
    const defaultData = await asyncResetPortfolioData();
    setPortfolioData(defaultData);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] relative font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] overflow-x-hidden">
      
      {/* Background 3D Radial Grid & Blue Ambient Flare */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none z-0" />
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#2563EB] rounded-full blur-[200px] opacity-[0.06] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#3B82F6] rounded-full blur-[220px] opacity-[0.05] pointer-events-none z-0" />

      {/* 3D WebGL Particle & Agent Mesh Background */}
      <Background3D interactive={true} />

      {/* Main Single-Line Navigation Bar */}
      <Navbar
        candidate={portfolioData.candidate}
        onOpenEditor={() => setIsEditorOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-8">
        {/* 1. Hero Section */}
        <Hero
          candidate={portfolioData.candidate}
          onOpenEditor={() => setIsEditorOpen(true)}
          onUpdatePhoto={(photoUrl) => handleSaveData({ ...portfolioData, candidate: { ...portfolioData.candidate, photoUrl } })}
        />

        {/* 2. About Section */}
        <About
          candidate={portfolioData.candidate}
          onUpdatePhoto={(photoUrl) => handleSaveData({ ...portfolioData, candidate: { ...portfolioData.candidate, photoUrl } })}
        />

        {/* 3. Technical Skills & Capability Matrix */}
        <Skills
          skillCategories={portfolioData.skills}
        />

        {/* 4. Featured Case Study Projects */}
        <Projects
          projects={portfolioData.projects}
          onUpdateProjects={(updatedProjects) => handleSaveData({ ...portfolioData, projects: updatedProjects })}
        />

        {/* 5. System Architecture Interactive Viewer */}
        <ArchitectureViewer />

        {/* 6. Parallel 2-Column Certificates Gallery */}
        <CertificatesGallery
          certifications={portfolioData.certifications}
          onOpenEditor={() => setIsEditorOpen(true)}
          onUpdateCertificates={(certs) => handleSaveData({ ...portfolioData, certifications: certs })}
        />

        {/* 7. Unified Career & Certification Timeline */}
        <Timeline
          timeline={portfolioData.timeline}
          certifications={portfolioData.certifications}
          experiences={portfolioData.experiences}
          onOpenEditor={() => setIsEditorOpen(true)}
          onUpdateCertificates={(certs) => handleSaveData({ ...portfolioData, certifications: certs })}
        />

        {/* 7. Industry Experience & Internships */}
        <Experience
          experiences={portfolioData.experiences}
        />

        {/* 8. Contact & Resume Section */}
        <Contact
          candidate={portfolioData.candidate}
        />
      </main>

      {/* Footer */}
      <Footer
        candidate={portfolioData.candidate}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Live Data & Certificate Editor Modal */}
      {isEditorOpen && (
        <DataEditorModal
          data={portfolioData}
          onSave={handleSaveData}
          onReset={handleResetData}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

    </div>
  );
}
