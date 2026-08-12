export interface CandidateInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  summary: string;
  photoUrl?: string;
  resumeUrl?: string;
  education: {
    degree: string;
    field: string;
    college: string;
    years?: string;
  };
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface ProjectArchitectureNode {
  id: string;
  label: string;
  type: 'user' | 'router' | 'agent' | 'tool' | 'database' | 'output' | 'vision';
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Agentic AI' | 'Computer Vision' | 'Surveillance & AI';
  problem: string;
  solution: string;
  architectureDiagramText: string;
  technologies: string[];
  keyFeatures: string[];
  technicalHighlights: string[];
  githubUrl: string;
  githubAvailable: boolean;
  demoUrl?: string;
  videoUrl?: string;
  architectureNodes?: ProjectArchitectureNode[];
  featuredPositioning: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  duration?: string;
  score?: string;
  role?: string;
  course?: string;
  verificationUrl?: string;
  certificateId?: string;
  category: 'Featured' | 'Internship & Experience' | 'Training & Workshop';
  description: string;
  certificateUrl?: string;
  imageUrl?: string;
  isExamBased?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  type: 'Internship' | 'Full-Time' | 'Industrial';
  description?: string;
  highlights?: string[];
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  type: 'education' | 'experience' | 'certification' | 'recognition';
  category: string;
  details: string;
  badge?: string;
  linkUrl?: string;
  imageUrl?: string;
}

export interface PortfolioData {
  candidate: CandidateInfo;
  skills: SkillCategory[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
  timeline: TimelineEntry[];
}
