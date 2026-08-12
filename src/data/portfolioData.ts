import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  candidate: {
    name: 'KUGAN K',
    title: 'AI Engineer | Agentic AI Engineer | Computer Vision Engineer | AI/ML Developer',
    subtitle: 'Building intelligent AI systems that reason, retrieve knowledge, use tools, analyze visual data, and automate real-world workflows.',
    email: 'kugankugan.tech@gmail.com',
    phone: '+91 9345726015',
    github: 'https://github.com/kugan1130',
    linkedin: 'https://linkedin.com/in/kugan-k-51b56b259',
    location: 'Chennai, Tamil Nadu, India',
    photoUrl: '/assets/profile/kugan_profile.jpeg',
    resumeUrl: '/assets/resume/KUGAN_K_Resume.pdf',
    summary: 'B.Tech Artificial Intelligence & Data Science graduate specializing in Agentic AI, Multi-Agent Systems, AI/ML, Computer Vision, and AI Backend Development. Experienced in designing AI applications that combine LLMs, Multi-Agent workflows, LangGraph, RAG, FastAPI, YOLO, OpenCV, PostgreSQL, Redis, and Docker. Completed AI/ML internships and developed AI systems spanning autonomous agents, Computer Vision, intelligent retrieval, and backend services. Interested in building scalable, production-oriented AI solutions for real-world and enterprise applications.',
    education: {
      degree: 'B.Tech',
      field: 'Artificial Intelligence & Data Science',
      college: 'DMI College of Engineering',
      years: ''
    }
  },
  skills: [
    {
      title: 'AI & LLM Architecture',
      icon: 'Brain',
      skills: [
        'LLMs',
        'Prompt Engineering',
        'Tool Calling',
        'Function Calling',
        'Structured Outputs',
        'AI Agents',
        'Autonomous Agents',
        'Multi-Agent Systems',
        'ReAct Agents',
        'Planning Agents',
        'Reflection Patterns',
        'Memory Management',
        'Human-in-the-Loop',
        'Guardrails'
      ]
    },
    {
      title: 'Agentic AI & RAG Workflows',
      icon: 'Cpu',
      skills: [
        'LangGraph',
        'LangChain',
        'Multi-Agent Workflows',
        'Agent Routing',
        'Agent Orchestration',
        'Tool Integration',
        'RAG (Retrieval-Augmented Gen)',
        'Vector Search',
        'AI Workflows'
      ]
    },
    {
      title: 'Computer Vision & Deep Learning',
      icon: 'Eye',
      skills: [
        'YOLO',
        'YOLOv8',
        'YOLOv11',
        'OpenCV',
        'Object Detection',
        'Object Tracking',
        'ByteTrack',
        'Polygon / Zone Detection',
        'Video Processing',
        'Deep Learning'
      ]
    },
    {
      title: 'Backend Engineering',
      icon: 'Server',
      skills: [
        'Python',
        'FastAPI',
        'Flask',
        'REST APIs',
        'Pydantic',
        'SQLAlchemy',
        'Authentication (JWT, OAuth2)',
        'Background Tasks'
      ]
    },
    {
      title: 'Databases & Infrastructure',
      icon: 'Database',
      skills: [
        'PostgreSQL',
        'Redis',
        'ChromaDB',
        'SQL',
        'Docker',
        'Alembic'
      ]
    },
    {
      title: 'Frontend & UI Engineering',
      icon: 'Layout',
      skills: [
        'React',
        'TypeScript',
        'JavaScript',
        'Vite',
        'HTML5',
        'CSS3 / Tailwind CSS'
      ]
    },
    {
      title: 'AI & Developer Tooling',
      icon: 'Wrench',
      skills: [
        'PyTorch',
        'Gemini API',
        'Groq',
        'Sentence Transformers',
        'MCP / FastMCP',
        'LangSmith',
        'Git & GitHub',
        'Pytest & Vitest'
      ]
    }
  ],
  projects: [
    {
      id: 'nexa-ai',
      title: 'Nexa AI',
      subtitle: 'Enterprise Agentic AI Assistant',
      category: 'Agentic AI',
      featuredPositioning: 'Enterprise Multi-Agent RAG & Business Intelligence System',
      problem: 'Enterprise information is often scattered across PDFs, structured databases, and external sources, making it difficult to retrieve accurate information and perform business queries through a single unified interface.',
      solution: 'Built a multi-agent enterprise assistant that intelligently routes user queries to specialized RAG, SQL, Web, or direct-response agents. Documents are chunked and embedded into ChromaDB, while structured business data is queried through PostgreSQL with Redis context management.',
      architectureDiagramText: 'USER -> AGENT ROUTER -> [RAG Agent | SQL Agent | Web Agent | Direct Response] -> Tools / Databases / Knowledge -> FINAL ANSWER',
      technologies: [
        'Python',
        'FastAPI',
        'LangChain',
        'LangGraph',
        'Groq Llama 3.3 70B',
        'ChromaDB',
        'PostgreSQL',
        'Redis',
        'SQLAlchemy',
        'Docker',
        'React',
        'TypeScript',
        'Vite'
      ],
      keyFeatures: [
        'Multi-agent routing based on intent',
        'RAG-based document search and chunking',
        'Schema-aware SQL agent for PostgreSQL analytics',
        'PDF ingestion and automatic document management',
        'ChromaDB vector search and embedding store',
        'Redis session memory for conversational continuity',
        'Guardrails & Human-in-the-Loop approval for sensitive actions',
        'Live web search integration',
        'Containerized Docker deployment'
      ],
      technicalHighlights: [
        'Engineered graph-based agent orchestration using LangGraph with state persistence in Redis.',
        'Designed schema-aware SQL prompt guards preventing destructive queries and ensuring SQL safety.',
        'Optimized RAG retrieval with hybrid vector search in ChromaDB and re-ranking techniques.'
      ],
      githubUrl: 'https://github.com/kugan1130/enterprise_agent-',
      githubAvailable: true,
      videoUrl: '/assets/videos/Enterprise Multi-Agent AI Assistant - Google Chrome 2026-08-11 13-05-19-esv1-50p.mp4'
    },
    {
      id: 'ai-security-perimeter',
      title: 'AI Security Perimeter',
      subtitle: 'Multi-Agent Computer Vision Security Platform',
      category: 'Computer Vision',
      featuredPositioning: 'Real-Time Threat Detection & Multi-Agent Analysis Engine',
      problem: 'Traditional camera surveillance requires humans to continuously monitor video feeds. It is difficult to automatically detect when a person enters restricted areas, assess security risk, maintain evidence, and alert security personnel in real time.',
      solution: 'Built a real-time AI security monitoring system that uses computer vision (YOLOv11 + ByteTrack) to detect and track people, identify zone violations, generate security events, analyze threats using a multi-agent LangGraph workflow, store evidence, and display everything through a React dashboard.',
      architectureDiagramText: 'CAMERA -> YOLO Detection -> ByteTrack -> Zone Analysis -> Security Event -> Risk Scoring -> LangGraph Analysis -> Redis/PostgreSQL/ChromaDB -> React Security Dashboard',
      technologies: [
        'Python',
        'FastAPI',
        'React',
        'TypeScript',
        'Vite',
        'YOLOv11',
        'ByteTrack',
        'OpenCV',
        'Shapely',
        'LangChain',
        'LangGraph',
        'Gemini',
        'ChromaDB',
        'Sentence Transformers',
        'Redis',
        'PostgreSQL',
        'SQLAlchemy',
        'MCP / FastMCP',
        'LangSmith',
        'Pytest',
        'Vitest',
        'Docker'
      ],
      keyFeatures: [
        'Real-time person detection using YOLOv11',
        'Multi-person tracking using ByteTrack with persistent IDs',
        'Custom restricted/warning/safe perimeter zones via Shapely polygons',
        'Automatic security event generation and alert deduplication',
        'Multi-agent AI threat analysis using LangGraph',
        'Deterministic risk scoring combined with LLM security evaluation',
        'Redis-based state management and ChromaDB historical memory',
        'Automatic evidence snapshot capture and PostgreSQL event persistence',
        'Live MJPEG camera streaming & interactive perimeter setup in React',
        'LangSmith observability & automated testing suite'
      ],
      technicalHighlights: [
        'Combined real-time CV bounding box math (Shapely polygon intersection) with asynchronous LangGraph multi-agent threat assessment.',
        'Implemented alert deduplication using Redis TTL keys to avoid spamming alerts during continuous zone violations.',
        'Built live web dashboard streaming camera feeds with overlaid spatial polygon boundaries and instant evidence playback.'
      ],
      githubUrl: 'https://github.com/kugan1130/cv_agent1',
      githubAvailable: true,
      videoUrl: '/assets/videos/frontend - Google Chrome 2026-08-11 13-53-14-esv2-50p-bg-10p-music-10p.mp4'
    },
    {
      id: 'ai-catcher',
      title: 'AI Catcher',
      subtitle: 'AI-Based Deep Surveillance System',
      category: 'Surveillance & AI',
      featuredPositioning: 'Intrusion & Fight Detection Computer Vision Platform',
      problem: 'Traditional CCTV systems mainly record video and depend on continuous human monitoring, making it difficult to detect unauthorized entry and dangerous activities (like violence or fighting) in real time.',
      solution: 'Developed an AI-powered surveillance system that detects and tracks people, validates intrusion using a virtual boundary and timer, classifies threat levels, detects fight activities, triggers audible/siren alarms, captures evidence, and displays events through a secure multi-admin web dashboard.',
      architectureDiagramText: 'IP CAMERA / WEBCAM -> YOLOv8 Human Detection -> ID Tracking -> Polygon Boundary & Timer Check -> Violence/Fight Classifier -> Threat Alarm -> Evidence Capture -> Flask Dashboard',
      technologies: [
        'Python',
        'OpenCV',
        'YOLOv8',
        'PyTorch',
        'Flask',
        'HTML5',
        'CSS3',
        'JavaScript',
        'Computer Vision',
        'Deep Learning'
      ],
      keyFeatures: [
        'Real-time IP camera and mobile webcam video stream ingestion',
        'YOLOv8-based human detection & persistent ID tracking',
        'Custom virtual polygon boundaries with spatial reasoning',
        'Timer-based intrusion validation (Normal, Warning, Intrusion, Critical)',
        'Fight & violence detection using deep learning features',
        'Automatic image and video evidence snapshot capture',
        'Intrusion audio beep and critical event siren alarm triggers',
        'Secure multi-admin login authentication and event log audit'
      ],
      technicalHighlights: [
        'Engineered temporal intrusion verification algorithms requiring sustained zone presence before escalating threat levels.',
        'Optimized PyTorch vision inference loop to maintain 30 FPS on live camera streams with active tracking.',
        'Integrated automated local video clipping upon threat trigger for instant incident replay.'
      ],
      githubUrl: 'https://github.com/<your-username>/AI_Catcher',
      githubAvailable: false,
      videoUrl: '/assets/videos/VID20260311140230.mp4'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'AI & ML Developer Intern',
      company: 'MindFulAI Technologies Pvt. Ltd.',
      location: 'Coimbatore, Tamil Nadu',
      startDate: '29 July 2025',
      endDate: '28 August 2025',
      type: 'Internship',
      description: 'Worked as an AI & ML Developer focusing on machine learning model development, agentic workflows, and AI solution prototyping for enterprise use cases.',
      highlights: [
        'Developed AI and ML solutions for enterprise projects.',
        'Recognized with Certificate of Excellence from Thozhil for outstanding performance.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Artificial Intelligence Intern',
      company: 'NoviTech Private Limited',
      location: 'Coimbatore, Tamil Nadu',
      startDate: 'June 18, 2025',
      endDate: 'July 18, 2025',
      type: 'Internship',
      description: 'One-month Artificial Intelligence internship alongside a 30 Days MasterClass in Artificial Intelligence (June 18 – July 23, 2025).',
      highlights: [
        'Gained hands-on experience in core AI algorithms, neural network fundamentals, and practical computer vision.',
        'Completed intensive 30 Days AI MasterClass curriculum.'
      ]
    },
    {
      id: 'exp-3',
      role: 'Industrial Intern',
      company: 'Hyundai Transys Lear Automotive India',
      location: 'Tamil Nadu, India',
      startDate: 'September 29, 2023',
      endDate: 'October 6, 2023',
      type: 'Industrial',
      description: 'Industrial internship exploring automated manufacturing processes, industrial sensors, and technology integrations in automotive systems.',
      highlights: [
        'Observed industrial automation workflows and quality control inspection systems.'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-nptel-cv',
      title: 'NPTEL Certification — Computer Vision',
      issuer: 'Indian Institute of Technology Kharagpur (IIT Kharagpur)',
      date: 'Jul – Oct 2024',
      duration: '12-Week Course',
      course: 'Computer Vision (12-Week Proctored)',
      category: 'Featured',
      isExamBased: true,
      certificateId: 'NPTEL24CS113S123',
      description: 'Proctored exam certification covering image processing, feature extraction, object detection, tracking, camera calibration, and deep learning vision architectures.',
      imageUrl: '/assets/certificates/Computer Vision.jpg'
    },
    {
      id: 'cert-mindfulai',
      title: 'AI & ML Developer Internship Certificate',
      issuer: 'MindFulAI Technologies Pvt. Ltd.',
      date: '29 July 2025 – 28 August 2025',
      role: 'AI & ML Developer Intern',
      category: 'Internship & Experience',
      description: 'Certificate awarded for completing the AI & ML Developer Internship in Coimbatore.',
      imageUrl: '/assets/certificates/internmindfulai.png'
    },
    {
      id: 'cert-novitech-intern',
      title: 'Artificial Intelligence Internship Certificate',
      issuer: 'NoviTech Private Limited',
      date: 'June 18, 2025 – July 18, 2025',
      role: 'Artificial Intelligence Intern',
      category: 'Internship & Experience',
      description: 'One-month internship certification in Artificial Intelligence principles and practical machine learning applications.',
      imageUrl: '/assets/certificates/KUGAN K (3)_page-0001.jpg'
    },
    {
      id: 'cert-wadhwani',
      title: 'Ignite Bootcamp: Idea to Plan',
      issuer: 'Wadhwani Foundation',
      date: 'March 19, 2026',
      course: 'Ignite Bootcamp',
      category: 'Training & Workshop',
      description: 'Entrepreneurial bootcamp on business planning, product strategy, and technical viability.',
      imageUrl: '/assets/certificates/Kugan K_69bb8c99996ace3e6a93a31d (1)_page-0001.jpg'
    },
    {
      id: 'cert-reliance',
      title: 'Workplace Ready: Life and Employability Training',
      issuer: 'Reliance Foundation Academy',
      date: 'November 4, 2025',
      course: 'Workplace Employability Program',
      category: 'Training & Workshop',
      description: 'Professional development program focusing on corporate communication, teamwork, and ethics.',
      imageUrl: '/assets/certificates/Certificate _ RF Skilling Academy (2)_page-0001.jpg'
    },
    {
      id: 'cert-connectedcore',
      title: 'AI & ML / Computer Vision Workshop',
      issuer: 'ConnectedCore Technology Solution And MSME [ Ministry of Micro, Small and Medium Enterprises]',
      date: 'September 23–27, 2024',
      course: 'Applied Computer Vision & ML',
      category: 'Training & Workshop',
      description: 'Hands-on training in object detection, OpenCV image pipelines, and PyTorch model inferencing.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.24.33 (2).jpeg'
    },
    {
      id: 'cert-tnatti',
      title: 'DevOps Engineering Training',
      issuer: 'Tamil Nadu Advanced Technical Training Institute / DMI College of Engineering',
      date: 'May 12–17, 2025',
      course: 'DevOps Engineering & Containerization',
      category: 'Training & Workshop',
      description: 'Technical training covering CI/CD pipelines, Docker containerization, and infrastructure basics.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.24.33 (1).jpeg'
    },
    {
      id: 'cert-simats',
      title: 'Quantum AI & High-Performance Computing',
      issuer: 'SIMATS Engineering',
      date: 'April 21–26, 2025',
      course: 'Quantum AI & High-Performance Computing',
      category: 'Training & Workshop',
      description: 'Specialized workshop on quantum computing concepts and high-performance AI compute architectures.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.55.04.jpeg'
    },
    {
      id: 'cert-hyundai',
      title: 'Industrial Internship Certificate',
      issuer: 'Hyundai Transys Lear Automotive India',
      date: 'September 29 – October 6, 2023',
      role: 'Industrial Intern',
      category: 'Internship & Experience',
      description: 'Industrial internship completion certificate in automotive systems.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.24.33.jpeg'
    }
  ],
  timeline: [
    {
      id: 'tl-1',
      date: '',
      title: 'B.Tech in Artificial Intelligence & Data Science',
      subtitle: 'DMI College of Engineering',
      type: 'education',
      category: 'Education',
      details: 'Specialized coursework in Autonomous AI Agents, Deep Learning, Computer Vision, Database Systems, and Distributed Computing.',
      badge: 'Academic Core'
    },
    {
      id: 'tl-2',
      date: 'Sep 29 – Oct 06, 2023',
      title: 'Industrial Internship',
      subtitle: 'Hyundai Transys Lear Automotive India',
      type: 'experience',
      category: 'Industrial Internship',
      details: 'Explored industrial automation, automotive sensor workflows, and assembly monitoring systems.',
      badge: 'Automotive',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.24.33.jpeg'
    },
    {
      id: 'tl-3',
      date: 'Jul – Oct 2024',
      title: 'NPTEL Proctored Certification — Computer Vision',
      subtitle: 'IIT Kharagpur (12-Week Proctored Course)',
      type: 'certification',
      category: 'National Certification',
      details: 'Completed rigorous 12-week course and proctored examination covering advanced computer vision, spatial geometry, and object tracking.',
      badge: 'IIT Kharagpur',
      imageUrl: '/assets/certificates/Computer Vision.jpg'
    },
    {
      id: 'tl-4',
      date: 'Sep 23–27, 2024',
      title: 'AI & ML / Computer Vision Workshop',
      subtitle: 'ConnectedCore Technology Solution And MSME [ Ministry of Micro, Small and Medium Enterprises]',
      type: 'certification',
      category: 'Technical Workshop',
      details: 'Hands-on training in object detection, OpenCV image pipelines, and PyTorch model inferencing.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.24.33 (2).jpeg'
    },
    {
      id: 'tl-6',
      date: 'April 21–26, 2025',
      title: 'Quantum AI & High-Performance Computing',
      subtitle: 'SIMATS Engineering',
      type: 'certification',
      category: 'Advanced Compute',
      details: 'Specialized training on high-performance computing clusters and quantum neural network algorithms.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.55.04.jpeg'
    },
    {
      id: 'tl-7',
      date: 'May 12–17, 2025',
      title: 'DevOps Training',
      subtitle: 'Tamil Nadu Advanced Technical Training Institute / DMI College',
      type: 'certification',
      category: 'Infrastructure',
      details: 'Learned Docker container management, Linux system administration, and deployment scripts.',
      imageUrl: '/assets/certificates/WhatsApp Image 2026-08-11 at 12.24.33 (1).jpeg'
    },
    {
      id: 'tl-8',
      date: 'Jun 18 – Jul 18, 2025',
      title: 'Artificial Intelligence Internship',
      subtitle: 'NoviTech Private Limited (Coimbatore)',
      type: 'experience',
      category: 'AI Internship',
      details: 'Completed 1-month Artificial Intelligence Internship developing machine learning models and computer vision workflows.',
      badge: 'AI Internship',
      imageUrl: '/assets/certificates/KUGAN K (3)_page-0001.jpg'
    },
    {
      id: 'tl-9',
      date: 'Jul 29 – Aug 28, 2025',
      title: 'AI & ML Developer Intern',
      subtitle: 'MindFulAI Technologies Pvt. Ltd. (Coimbatore)',
      type: 'experience',
      category: 'Developer Internship',
      details: 'Engineered AI/ML developer workflows, agentic AI proof-of-concepts, and REST backend services in Python and FastAPI.',
      badge: 'AI Developer',
      imageUrl: '/assets/certificates/internmindfulai.png'
    },
    {
      id: 'tl-11',
      date: 'November 04, 2025',
      title: 'Workplace Ready Training',
      subtitle: 'Reliance Foundation Academy',
      type: 'certification',
      category: 'Professional Skills',
      details: 'Workplace communication, agile collaboration, and leadership fundamentals.',
      imageUrl: '/assets/certificates/Certificate _ RF Skilling Academy (2)_page-0001.jpg'
    },
    {
      id: 'tl-12',
      date: 'March 19, 2026',
      title: 'Ignite Bootcamp: Idea to Plan',
      subtitle: 'Wadhwani Foundation',
      type: 'certification',
      category: 'Technical Strategy',
      details: 'Product design, architecture feasibility analysis, and business execution.',
      imageUrl: '/assets/certificates/Kugan K_69bb8c99996ace3e6a93a31d (1)_page-0001.jpg'
    }
  ]
};

const STORAGE_KEYS = [
  'kugan_portfolio_data_v8',
  'kugan_portfolio_data_v7',
  'kugan_portfolio_data_v6',
  'kugan_portfolio_data_v5',
  'kugan_portfolio_data_v4',
  'kugan_portfolio_data_v3',
  'kugan_portfolio_data_v2',
  'kugan_portfolio_data_v1',
  'kugan_portfolio_data'
];

export function getPortfolioData(): PortfolioData {
  try {
    for (const key of STORAGE_KEYS) {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.candidate && parsed.projects) {
          if (!parsed.candidate.email || parsed.candidate.email === 'kugakugan.tech@gmail.com') {
            parsed.candidate.email = 'kugankugan.tech@gmail.com';
          }
          if (!parsed.candidate.resumeUrl || parsed.candidate.resumeUrl === '/storage/resume/KUGAN_K_Resume.pdf') {
            parsed.candidate.resumeUrl = '/assets/resume/KUGAN_K_Resume.pdf';
          }
          if (!parsed.candidate.photoUrl || parsed.candidate.photoUrl === '/kugan_profile.png' || parsed.candidate.photoUrl === '/assets/profile/kugan_profile.png' || parsed.candidate.photoUrl === '/storage/kugan_profile.jpeg') {
            parsed.candidate.photoUrl = '/assets/profile/kugan_profile.jpeg';
          }
          parsed.candidate.location = 'Chennai, Tamil Nadu, India';
          if (parsed.candidate.education) {
            parsed.candidate.education.years = '';
          }

          // Ensure project videoUrls and certification imageUrls are backfilled if missing in saved state
          if (Array.isArray(parsed.projects)) {
            parsed.projects = parsed.projects.map((p: any) => {
              const defaultProj = initialPortfolioData.projects.find(ip => ip.id === p.id);
              if (defaultProj && defaultProj.videoUrl && (!p.videoUrl || p.videoUrl.trim() === '')) {
                p.videoUrl = defaultProj.videoUrl;
              } else if (p.videoUrl && p.videoUrl.startsWith('/storage/')) {
                p.videoUrl = p.videoUrl.replace('/storage/', '/assets/');
              }
              return p;
            });
          }

          if (Array.isArray(parsed.certifications)) {
            parsed.certifications = parsed.certifications.map((c: any) => {
              const defaultCert = initialPortfolioData.certifications.find(ic => ic.id === c.id);
              if (defaultCert && defaultCert.imageUrl) {
                c.imageUrl = defaultCert.imageUrl;
              }
              return c;
            });
          }

          if (Array.isArray(parsed.timeline)) {
            parsed.timeline = parsed.timeline.map((t: any) => {
              const defaultItem = initialPortfolioData.timeline.find(it => it.id === t.id);
              if (defaultItem && defaultItem.imageUrl) {
                t.imageUrl = defaultItem.imageUrl;
              }
              return t;
            });
          }

          return parsed;
        }
      }
    }
  } catch (err) {
    console.error('Failed to parse portfolio data from localStorage:', err);
  }
  return initialPortfolioData;
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEYS[0], serialized);
  } catch (err) {
    console.warn('LocalStorage quota exceeded for direct save, handled via IndexedDB storage:', err);
  }
}

export function resetPortfolioData(): PortfolioData {
  try {
    for (const key of STORAGE_KEYS) {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.error('Failed to reset portfolio data:', err);
  }
  return initialPortfolioData;
}
