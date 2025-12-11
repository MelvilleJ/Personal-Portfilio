import project1Img from "../assets/projectimages/project1.png";
import project2Img from "../assets/projectimages/project2.png";
import project3Img from "../assets/projectimages/project3.png";
import project4Img from "../assets/projectimages/project4.png";
import project5Img from "../assets/projectimages/project5.png";
import project6Img from "../assets/projectimages/project6.png";
export const projects = [
  {
    id: 1,
    title: "n8n Business Automations",
    summary:
      "Designed and deployed a fully containerized n8n automation system running on Docker, integrating AI-driven workflows to streamline business communication, automate repetitive tasks, and enhance operational efficiency. Implemented end-to-end solutions including email processing, chatbot interactions, and multi-platform API integrations.",
    category: "AI Automation",
    technologies: ["n8n", "Docker", "JavaScript", "PostgreSql", "Python"],
    features: [
      "AI-Powered Automation Pipelines",
      "Google Cloud Platform Workflow Deployment",
      "Meta Business Suite Automation Integration",
      "Advanced Email Parsing & Email-to-Action Flows",
      "Conversational Chatbot Integration",
      "Key Email Alerts & Real-Time Notifications",
      "REST API Access for External Systems",
    ],
    challenges: [
      "Building secure REST API access points for n8n workflows was one of the most complex components. This included configuring authentication layers, request validation, and ensuring reliable communication between external systems and internal automation pipelines.",
      "Configuring multiple third-party APIs—Google Cloud Platform, Meta Business Suite, and Telegram—required careful handling of OAuth flows, webhook verification, and platform-specific quirks. Meta Business Suite was by far the most challenging due to strict validation rules and messaging policies.",
      "Developing and refining AI tools to deliver consistent, accurate outputs required extensive experimentation across both local and cloud-based models. Tuning prompts, reducing hallucinations, and optimizing responses was an iterative process.",
      "Preventing conversational AI loops or repetitive behavior required implementing guardrails, context checks, and custom logic inside workflows to detect and break infinite conversational cycles.",
    ],
    outcome:
      "The final automation suite significantly reduced manual workload by streamlining email processing, accelerating response times, and centralizing chatbot interactions into a unified automation system. The solution operates reliably in production, enabling efficient multi-platform communication and scalable AI-assisted tasks.",
    description:
      "This project involved building a comprehensive automation ecosystem using n8n, leveraging Docker for isolated and reproducible deployment. I created a series of interconnected workflows that fused AI processing with operational tasks—such as parsing emails, generating responses, triggering alerts, and interacting with chatbots on Meta, Telegram, and custom APIs. Integrations with Google Cloud and Meta Business Suite enabled advanced messaging capabilities, while PostgreSQL provided persistent workflow storage. Through iterative testing, prompt engineering, and API refinement, I delivered a robust automation platform tailored for real-world business needs.",
    duration: "2 months",
    year: "2025",
    image: project2Img,
  },
  {
    id: 2,
    title: "Project: Leslie",
    summary:
      "A personalized AI assistant designed to understand and reason over my personal knowledge base, documents, preferences, and history. Leslie provides context-aware answers, helps automate daily tasks, retrieves information, and performs research using both local and cloud LLMs.",
    category: "FULL STACK + Generative AI Engineering",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Python",
      "PostgreSQL",
      "OpenAI API",
      "Local LLMs",
      "Docker",
    ],
    features: [
      "Personal Knowledge Base Search",
      "Natural Language Querying",
      "Local + Cloud Hybrid LLM Orchestration",
      "Document Indexing & Vector Embeddings",
      "Task & Reminder Automation",
      "Custom REST API for External Integrations",
      "Secure, Private Data Storage",
    ],
    challenges: [
      "Structuring personal data into a vectorized knowledge base required careful text preprocessing, embedding selection, and testing to ensure accurate recall and minimal hallucinations.",
      "Implementing a dual-model (local + cloud) LLM architecture was challenging due to differing capabilities, token limits, and latency considerations.",
      "Ensuring the assistant remained contextually accurate across multiple topics and personal information sources required extensive prompt engineering and guardrails.",
      "Balancing speed with accuracy when running large local models demanded hardware optimization and workflow tuning.",
    ],
    outcome:
      "Leslie successfully serves as a highly capable personal AI assistant that delivers fast, contextually accurate answers across personal knowledge, productivity tasks, and general queries. The system has become a reliable daily tool that streamlines information retrieval and decision-making.",
    description:
      "Project Leslie is a personal AI assistant built as a full-stack system capable of understanding personal context, documents, and preferences. The project integrates multiple LLMs, including local models for privacy-critical tasks and cloud models for complex reasoning. A custom embedding pipeline indexes personal files, notes, history, and structured data, allowing Leslie to retrieve relevant information and answer questions with context. REST APIs expose Leslie to mobile apps, scripts, and automation tools, making it a core component of personal productivity workflows.",
    duration: "Ongoing",
    year: "2025",
    image: project1Img,
  },
  {
    id: 3,
    title: "Local AI Chat Bot Coding Assistant",
    summary:
      "A privacy-focused, locally hosted AI chatbot designed to serve as a secure alternative to cloud-based tools like ChatGPT. Built for coding assistance, document generation, and private AI tasks with full data ownership.",
    category: "Server Deployment + Generative AI Engineering",
    technologies: [
      "Docker",
      "Ollama",
      "Continue",
      "Python",
      "LangChain",
      "PostgreSQL",
      "Node.js",
    ],
    features: [
      "Offline, Local-Only LLM Execution",
      "Code Generation & Debugging",
      "Document Parsing & Summarization",
      "Private Knowledge Base Search",
      "File Upload & Secure Processing",
      "Customizable System Instructions",
      "API Access for Developer Tools",
    ],
    challenges: [
      "Running large local models efficiently required GPU optimization, quantization tuning, and selecting the right model architectures for coding tasks.",
      "Building a fast knowledge retrieval layer for long documents was challenging due to memory constraints and embedding computation.",
      "Ensuring the assistant performed well in coding tasks without the benefit of massive proprietary datasets required experimentation across multiple open-source models.",
      "Designing the system to run offline while still offering ChatGPT-level capabilities demanded careful orchestration of tools and caching.",
    ],
    outcome:
      "The final system performs as a powerful, fully private coding and document assistant. It replaces cloud-based AI tools for most daily development use cases, ensuring data remains entirely on-device with no external dependency.",
    description:
      "This project delivers a secure, local AI assistant optimized for software development. The system runs on top of local LLM runtimes like Ollama and LM Studio, with a custom Node.js server providing a clean API layer. Features include code generation, bug explanations, documentation creation, and private retrieval augmented generation (RAG). Document embeddings enable rapid context-aware responses, while Docker ensures portability and isolation. The assistant is used as a daily development companion with full trust due to its offline design.",
    duration: "1 month",
    year: "2025",
    image: project3Img,
  },
  {
    id: 6,
    title: "NAS and File Server Management System",
    summary:
      "A full-stack web system for monitoring and managing NAS and file servers, equipped with automated backup verification and AI-assisted diagnostics.",
    category: "FULL STACK + Generative AI Engineering",
    technologies: ["Next.js", "Bash", "Python", "Docker"],
    features: [
      "Backup Automation & Validation",
      "Storage Utilization Monitoring",
      "AI-Assisted Log Analysis",
      "Custom Shell Script Integration",
      "Alerting & Health Notifications",
      "Role-Based Administrative Dashboard",
    ],
    challenges: [
      "Integrating custom Bash/Python scripts with a modern web backend required secure sandboxing and job orchestration.",
      "Ensuring reliable backup validation across different NAS devices involved building adaptable modules and fallbacks.",
      "Network performance constraints demanded optimization for polling intervals and system resource usage.",
    ],
    outcome:
      "The system provides administrators with clear visibility into server states, automated maintenance, significantly reducing manual monitoring time and improving reliability.",
    description:
      "This platform centralizes the management of NAS and file servers, integrating directly with shell scripts that perform backups, validate data integrity, and monitor device health making troubleshooting faster. The system serves as a powerful internal tool that automates repetitive IT maintenance and provides real-time oversight through a user-friendly dashboard.",
    duration: "2 months",
    year: "2025",
    image: project5Img,
  },
  {
    id: 5,
    title: "PATT Physical TD4 Digitization System",
    summary:
      "Full Web-based System to Digitize Physical TD4s for the Port Authorities' Human Resource Management System.",
    category: "Full Stack",
    image: project4Img,
  },
  {
    id: 7,
    title: "Project Patience",
    summary:
      "Probation attachment to a HRMS. Sends email notifications, handles supervisor and manager remarks as well as employee onboarding.",
    category: "FULL STACK",
    image: project6Img,
  },
];
