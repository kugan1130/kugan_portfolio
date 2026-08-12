const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createResumePdf() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions
  const { width, height } = page.getSize();

  let y = height - 40;
  const leftMargin = 40;
  const rightMargin = 40;
  const contentWidth = width - leftMargin - rightMargin;

  function drawText(text, size, isBold = false, color = rgb(0.1, 0.1, 0.1), align = 'left') {
    const activeFont = isBold ? fontBold : font;
    let x = leftMargin;
    if (align === 'center') {
      const textWidth = activeFont.widthOfTextAtSize(text, size);
      x = (width - textWidth) / 2;
    }
    page.drawText(text, {
      x,
      y,
      size,
      font: activeFont,
      color,
    });
  }

  function drawWrappedText(text, size, isBold = false, bullet = false) {
    const activeFont = isBold ? fontBold : font;
    const indent = bullet ? 12 : 0;
    const maxWidth = contentWidth - indent;
    const words = text.split(' ');
    let line = '';
    
    if (bullet) {
      page.drawText('•', {
        x: leftMargin,
        y,
        size,
        font: fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });
    }

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line ? ' ' : '') + words[n];
      const testWidth = activeFont.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && n > 0) {
        page.drawText(line, {
          x: leftMargin + indent,
          y,
          size,
          font: activeFont,
          color: rgb(0.15, 0.15, 0.15),
        });
        y -= (size + 3);
        line = words[n];
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, {
        x: leftMargin + indent,
        y,
        size,
        font: activeFont,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= (size + 3);
    }
  }

  function drawSectionHeader(title) {
    y -= 6;
    drawText(title, 11, true, rgb(0, 0, 0));
    y -= 3;
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: width - rightMargin, y },
      thickness: 1,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 10;
  }

  // Header
  drawText('KUGAN K', 20, true, rgb(0, 0, 0), 'center');
  y -= 16;
  drawText('AI Engineer | Agentic AI Engineer | AI/ML Developer', 10, true, rgb(0.2, 0.2, 0.2), 'center');
  y -= 14;
  drawText('kugankugan.tech@gmail.com | +91 9345726015 | github.com/kugan1130 | linkedin.com/in/kugan-k-51b56b259', 8.5, false, rgb(0.3, 0.3, 0.3), 'center');
  y -= 12;

  // PROFESSIONAL SUMMARY
  drawSectionHeader('PROFESSIONAL SUMMARY');
  drawWrappedText(
    'Results-driven AI Engineer specializing in Agentic AI, Multi-Agent Systems, and Computer Vision. Proficient in designing production-oriented systems utilizing LLMs, RAG, and LangGraph for intelligent orchestration, tool calling, and semantic retrieval. Adept at building scalable backend solutions with Python, FastAPI, PostgreSQL, and ChromaDB, bridging machine learning models with robust architectures.',
    8.5
  );

  // TECHNICAL SKILLS
  drawSectionHeader('TECHNICAL SKILLS');
  drawWrappedText('AI / Machine Learning: LLMs, Generative AI, Agentic AI, Multi-Agent Systems, RAG, Prompt Engineering, Model Inference', 8.5, false, true);
  drawWrappedText('Agentic AI & LLMs: LangGraph, LangChain, Agent Routing, Tool Calling, SQL Agents, Guardrails, Gemini, Groq Llama 3.3 70B', 8.5, false, true);
  drawWrappedText('Computer Vision: YOLOv11, YOLOv8, OpenCV, ByteTrack, Object Detection/Tracking, Polygon Detection, Violence Detection', 8.5, false, true);
  drawWrappedText('Backend / APIs: Python, FastAPI, Flask, REST APIs, SQLAlchemy, Alembic, JWT, OAuth2, Rate Limiting', 8.5, false, true);
  drawWrappedText('Databases / Storage: PostgreSQL, Redis, ChromaDB, Vector Databases, SQL', 8.5, false, true);
  drawWrappedText('Frontend & DevOps: React, TypeScript, JavaScript, Docker, Git, Pytest, LangSmith, MCP, FastMCP', 8.5, false, true);

  // EXPERIENCE
  drawSectionHeader('EXPERIENCE');

  // Exp 1
  page.drawText('MindFulAI Technologies Pvt. Ltd. | AI & ML Developer Intern', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  const d1 = 'July 2025 - August 2025';
  page.drawText(d1, { x: width - rightMargin - fontBold.widthOfTextAtSize(d1, 8.5), y, size: 8.5, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  drawWrappedText('Developed model-based AI/ML applications utilizing Python, focusing on practical implementation and algorithm optimization.', 8.5, false, true);
  y -= 3;

  // Exp 2
  page.drawText('NoviTech Private Limited | Artificial Intelligence Intern', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  const d2 = 'June 2025 - July 2025';
  page.drawText(d2, { x: width - rightMargin - fontBold.widthOfTextAtSize(d2, 8.5), y, size: 8.5, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  drawWrappedText('Contributed to AI development workflows, building and testing practical machine learning applications.', 8.5, false, true);
  y -= 3;

  // Exp 3
  page.drawText('Hyundai Transys Lear Automotive India Pvt. Ltd. | Engineering Intern / Trainee', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  const d3 = 'Sep 2023 - Oct 2023';
  page.drawText(d3, { x: width - rightMargin - fontBold.widthOfTextAtSize(d3, 8.5), y, size: 8.5, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  drawWrappedText('Gained industrial engineering exposure and analyzed automotive manufacturing processes.', 8.5, false, true);

  // PROJECTS
  drawSectionHeader('PROJECTS');

  // Proj 1
  page.drawText('Nexa AI - Enterprise Multi-Agent AI Assistant | github.com/kugan1130/enterprise_agent-t', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  page.drawText('Technologies: Python, FastAPI, LangGraph, LangChain, Groq Llama 3.3 70B, ChromaDB, PostgreSQL, Redis, React, Docker', { x: leftMargin, y, size: 8, font: fontOblique, color: rgb(0.3, 0.3, 0.3) });
  y -= 11;
  drawWrappedText('Engineered a multi-agent AI assistant utilizing LangGraph and LangChain to orchestrate dynamic query routing across RAG, SQL, Web-search, and Direct-response agents.', 8.5, false, true);
  drawWrappedText('Implemented robust PDF ingestion pipelines with chunking and embeddings for semantic retrieval via ChromaDB.', 8.5, false, true);
  drawWrappedText('Developed a PostgreSQL SQL agent for structured data querying and integrated Redis for persistent conversation memory.', 8.5, false, true);
  drawWrappedText('Incorporated LLM guardrails and human-in-the-loop state transitions to ensure safe and deterministic tool execution.', 8.5, false, true);
  drawWrappedText('Built a scalable FastAPI backend and responsive React/TypeScript frontend, containerizing the application using Docker.', 8.5, false, true);
  y -= 3;

  // Proj 2
  page.drawText('AI Security Perimeter - Multi-Agent Computer Vision Security System', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  page.drawText('Technologies: Python, FastAPI, YOLOv11, ByteTrack, OpenCV, LangGraph, Gemini, Redis, PostgreSQL, ChromaDB, React', { x: leftMargin, y, size: 8, font: fontOblique, color: rgb(0.3, 0.3, 0.3) });
  y -= 11;
  drawWrappedText('Developed a real-time computer vision system leveraging YOLOv11 for person detection and ByteTrack for accurate object tracking within polygon-based security zones.', 8.5, false, true);
  drawWrappedText('Designed threat-level classification mechanisms integrated with LangGraph multi-agent threat assessment and Gemini reasoning.', 8.5, false, true);
  drawWrappedText('Architected real-time state management using Redis, event persistence with PostgreSQL, and historical retrieval via ChromaDB.', 8.5, false, true);
  drawWrappedText('Created a React security dashboard for live monitoring, integrating LangSmith for comprehensive system observability.', 8.5, false, true);
  y -= 3;

  // Proj 3
  page.drawText('AI Catcher - AI-Based Deep Surveillance System', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  page.drawText('Technologies: Python, OpenCV, YOLOv8, PyTorch, Flask, JavaScript', { x: leftMargin, y, size: 8, font: fontOblique, color: rgb(0.3, 0.3, 0.3) });
  y -= 11;
  drawWrappedText('Implemented an AI surveillance application using YOLOv8 for continuous person detection, tracking, and violence detection.', 8.5, false, true);
  drawWrappedText('Configured polygon intrusion detection modules with timer-based validation for enhanced threat-level classification.', 8.5, false, true);
  drawWrappedText('Integrated secure multi-admin authentication and real-time evidence capture capabilities within a Flask-based backend.', 8.5, false, true);

  // EDUCATION & CERTIFICATIONS
  drawSectionHeader('EDUCATION & CERTIFICATIONS');
  page.drawText('B.Tech - Artificial Intelligence and Data Science | DMI College of Engineering, Chennai', { x: leftMargin, y, size: 9, font: fontBold, color: rgb(0, 0, 0) });
  y -= 11;
  drawWrappedText('AI & Vision: AI/ML with computer vision training (MSME) | NPTEL Computer Vision (IIT Kharagpur) | AI & ML Developer (MindFulAI) | Artificial Intelligence (NoviTech)', 8.5, false, true);
  drawWrappedText('Tech & Strategy: DevOps (TNATTI) | Quantum AI & HPC Workshop (SIMATS) | Ignite Bootcamp (Wadhwani Foundation)', 8.5, false, true);

  const pdfBytes = await pdfDoc.save();
  const dir = path.join(__dirname, '../public/storage/resume');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'KUGAN_K_Resume.pdf'), pdfBytes);

  const assetsDir = path.join(__dirname, '../public/assets/resume');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(assetsDir, 'KUGAN_K_Resume.pdf'), pdfBytes);

  console.log('Successfully generated public/storage/resume/KUGAN_K_Resume.pdf and public/assets/resume/KUGAN_K_Resume.pdf');
}

createResumePdf().catch(console.error);
