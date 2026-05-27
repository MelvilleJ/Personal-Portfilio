import project1Img from "../assets/projectimages/project1.png";
import project2Img from "../assets/hrms/employeeview.png";
import project3Img from "../assets/projectimages/project3.png";
import project4Img from "../assets/leasetracking/search.png";
import project5Img from "../assets/projectimages/project5.png";
import project6Img from "../assets/projectimages/project6.png";
import project7Img from "../assets/td4/dashboard.png";
import project8Img from "../assets/n8n/workflow.png";
import project9Img from "../assets/post-it/main.png";
import project10Img from "../assets/helpdesk/queue.png";
import project11Img from "../assets/patthub/main.png";
export const projects = [
  {
    id: 1,
    title: "Human Resources Management System",
    summary:
      "Human Resources Management System for managing employee data and HR processes at the Port Authourity of Trinidad and Tobago.",
    category: "Full Stack",
    technologies: [
      "Node.js",
      "HTML/CSS",
      "JavaScript",
      "MS SQL Server",
      "Docker",
    ],
    features: [
      "Centralized Employee Database",
      "Onboarding & Offboarding Automation",
      "Training & Certification Tracking",
      "Email Notifications & Alerts",
      "Leave Management System",
      "Role-Based Access Control",
      "Custom Organizational Chart Builder",
      "Medical & Emergency Contact Management",
      "Performance Review Module",
      "Payment & Payroll Integration",
      "Excel Styled Pivot Table Report Builder",
    ],
    challenges: [
      "Understaning and modeling complex HR processes and data relationships required close collaboration with HR stakeholders to ensure the system met real-world needs.",
      "Converting legacy paper-based workflows into efficient digital processes involved careful UI/UX design and iterative testing to ensure user adoption.",
      "Creating a secure, scalable database schema to handle sensitive employee data while maintaining performance was a critical aspect of the project.",
      "Integrating email notifications and alerts required building a reliable messaging system that could handle various HR events and trigger appropriate communications.",
    ],
    outcome:
      "The final HRMS provided a comprehensive solution for managing employee data and HR processes, significantly improving efficiency and accuracy. The system is now a core tool for the Port Authority's HR department, streamlining operations and enhancing employee management.",
    description:
      "This project involved building a full-stack Human Resources Management System tailored to the needs of the Port Authority of Trinidad and Tobago. The system features a centralized employee database, automated onboarding/offboarding workflows, training tracking, and performance review modules. Built with Node.js and MS SQL Server, the application is deployed using Docker for scalability and ease of maintenance. The HRMS has become an essential tool for managing employee data and streamlining HR processes within the organization.",
    duration: "Ongoing",
    year: "2025",
    image: project2Img,
  },
  {
    id: 10,
    title: "IT Help Desk Ticketing and Task Management System",
    summary:
      "Full Web-based System for IT Help Desk Ticketing and Task Management.",
    category: "Full Stack",
    technologies: [
      "Node.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MS SQL Server",
      "Docker",
    ],
    features: [
      "Ticket Creation, Assignment & Management",
      "Priority & Category Classification",
      "Technician Task Assignment & Workload Tracking",
      "Real-Time Status Updates",
      "Email Notifications for Ticket Events",
      "SLA Tracking & Escalation Alerts",
      "Analytics & Reporting Dashboard",
      "Role-Based Access Control",
    ],
    challenges: [
      "Designing a flexible ticketing schema that could accommodate various IT issue categories and workflows required multiple iterations with IT staff to capture real-world needs.",
      "Building an SLA tracking system that accurately calculated response and resolution times across business hours required complex time-handling logic.",
      "Implementing real-time ticket status updates and notifications without full WebSocket support required efficient polling strategies and careful state management.",
      "Ensuring role-based access control was correctly enforced across all views and actions required thorough testing of permission logic at both the UI and API level.",
    ],
    outcome:
      "The Help Desk system centralized IT request management, significantly reducing response times and improving visibility into technician workloads. The system is now in active use, streamlining IT support operations across the organization.",
    description:
      "This full-stack IT Help Desk system provides a centralized platform for managing IT support tickets and tasks. Users can submit tickets with priority levels and categories, while technicians receive assignments and track tasks through a personal dashboard. Administrators have oversight of the full queue, technician performance, and SLA compliance. Built with Node.js and MS SQL Server and containerized with Docker, the system is designed for reliability and ease of deployment within an enterprise environment.",
    duration: "2 months",
    year: "2025",
    image: project10Img,
  },
  {
    id: 11,
    title: "PATT Hub",
    summary:
      "Web dashboard for managing and organizing internal web-applications.",
    category: "Full Stack",
    technologies: [
      "Node.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
    ],
    features: [
      "Centralized Internal Application Dashboard",
      "Quick-Access Tiles for Internal Systems",
      "Application Status Monitoring",
      "Role-Based Application Visibility",
      "Search & Filter Functionality",
      "Administrative App Management Interface",
    ],
    challenges: [
      "Designing a dashboard that could surface a wide variety of internal applications in a clear, organized layout required close collaboration with department stakeholders.",
      "Implementing role-based visibility to ensure users only see applications relevant to their department required a flexible permissions model.",
      "Maintaining up-to-date application status indicators required integrating lightweight health-check mechanisms for each registered system.",
    ],
    outcome:
      "PATT Hub became the central entry point for staff accessing internal web applications, reducing navigation time and improving awareness of available tools across departments.",
    description:
      "PATT Hub is an internal web dashboard built to consolidate access to the Port Authority's suite of internal web applications. Rather than staff navigating directly to individual systems, PATT Hub provides a single organized landing page with quick-access tiles, status indicators, and role-filtered visibility. Administrators can register new applications, update links, and manage access controls. The system is built with Node.js and deployed via Docker, providing a reliable and easily maintainable internal portal.",
    duration: "1 month",
    year: "2025",
    image: project11Img,
  },
  {
    id: 4,
    title: "Enterprise Lease Management System (NDA-Protected)",
    summary:
      "A full-stack web application developed for an enterprise client to streamline internal lease management workflows. Due to a Non-Disclosure Agreement, all technical and operational details have been redacted.",
    category: "Full Stack",
    technologies: [],
    features: ["Features redacted due to NDA"],
    challenges: [
      "Details regarding development challenges are confidential under an NDA agreement and cannot be shared.",
    ],
    outcome:
      "Successfully delivered a secure, scalable internal system. Specific outcomes, metrics, and client processes are withheld in compliance with NDA requirements.",
    description:
      "This project involved building a proprietary enterprise-grade system. The architecture, workflow logic, and integration points are not publicly shareable. Only high-level information can be disclosed to respect the client's confidentiality obligations.",
    duration: "3 months",
    year: "2025",
    image: project4Img,
  },
  {
    id: 5,
    title: "Enterprise Document Digitization System (NDA-Protected)",
    summary:
      "A secure, internal-use digitization platform created for a government agency. All functional details, integrations, and workflow descriptions have been redacted due to an active NDA.",
    category: "Full Stack",
    technologies: [],
    features: ["Redacted due to NDA"],
    challenges: ["Redacted due to NDA"],
    outcome:
      "Delivered a production-ready system that modernized internal document handling processes. Specific implementation details and performance results cannot be publicly disclosed.",
    description:
      "This system was designed to digitize and manage sensitive internal documentation. Technical architecture, database structure, and operational behavior remain confidential under NDA and cannot be displayed in a public portfolio.",
    duration: "1.5 months",
    year: "2025",
    image: project7Img,
  },
  {
    id: 9,
    title: "Project Post-IT",
    summary:
      "Post meeting AI summary and action item generator. Takes in meeting audio and generates a summary of the meeting as well as action items for attendees.",
    category: "FULL STACK + Generative AI Engineering",
    technologies: [
      "Python",
      "Whisper",
      "Node.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MS SQL Server",
    ],
    features: [
      "Meeting Audio Transcription via Whisper",
      "AI-Generated Meeting Summaries",
      "Automatic Action Item Extraction",
      "Attendee-Specific Action Item Assignment",
      "Meeting History & Archive",
      "PDF/Document Export",
      "Secure Audio File Upload",
    ],
    challenges: [
      "Accurately transcribing long meetings with multiple speakers required experimenting with Whisper model sizes and pre-processing audio to improve clarity.",
      "Extracting meaningful, attributed action items from unstructured transcripts required careful prompt engineering to distinguish decisions from general discussion.",
      "Handling large audio files efficiently without timeouts required chunked uploads and asynchronous background processing pipelines.",
      "Associating action items to specific attendees from natural conversation required heuristics and LLM reasoning to correctly link statements to individuals.",
    ],
    outcome:
      "Project Post-IT successfully automated the post-meeting workflow, reducing the time spent on manual note-taking and follow-up. The system now generates reliable summaries and action items that attendees can immediately act on.",
    description:
      "Project Post-IT is a full-stack AI-powered tool that transforms meeting recordings into structured summaries and actionable follow-ups. Audio files are uploaded, transcribed using OpenAI's Whisper model, and then processed through an LLM pipeline to extract a clean summary and a list of action items attributed to attendees. The resulting output is stored in a database and can be exported as a formatted document. The system is containerized with Docker for easy deployment and supports multiple meeting audio formats.",
    duration: "1 month",
    year: "2025",
    image: project9Img,
  },
  {
    id: 8,
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
      "Configuring multiple third-party APIs-Google Cloud Platform, Meta Business Suite, and Telegram—required careful handling of OAuth flows, webhook verification, and platform-specific quirks. Meta Business Suite was by far the most challenging due to strict validation rules and messaging policies.",
      "Developing and refining AI tools to deliver consistent, accurate outputs required extensive experimentation across both local and cloud-based models. Tuning prompts, reducing hallucinations, and optimizing responses was an iterative process.",
      "Preventing conversational AI loops or repetitive behavior required implementing guardrails, context checks, and custom logic inside workflows to detect and break infinite conversational cycles.",
    ],
    outcome:
      "The final automation suite significantly reduced manual workload by streamlining email processing, accelerating response times, and centralizing chatbot interactions into a unified automation system. The solution operates reliably in production, enabling efficient multi-platform communication and scalable AI-assisted tasks.",
    description:
      "This project involved building a comprehensive automation ecosystem using n8n, leveraging Docker for isolated and reproducible deployment. I created a series of interconnected workflows that fused AI processing with operational tasks-such as parsing emails, generating responses, triggering alerts, and interacting with chatbots on Meta, Telegram, and custom APIs. Integrations with Google Cloud and Meta Business Suite enabled advanced messaging capabilities, while PostgreSQL provided persistent workflow storage. Through iterative testing, prompt engineering, and API refinement, I delivered a robust automation platform tailored for real-world business needs.",
    duration: "2 months",
    year: "2025",
    image: project8Img,
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
    category: "Networking + Full Stack",
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
    id: 7,
    title: "HRMS Workflow Automation Module (NDA-Protected)",
    summary:
      "A proprietary HR workflow automation extension developed for a corporate Human Resource Management System. All specific project details are withheld as required under NDA.",
    category: "FULL STACK",
    technologies: [],
    features: ["Redacted due to NDA"],
    challenges: ["Redacted due to NDA"],
    outcome:
      "Successfully implemented within the client's internal HR ecosystem. Further information is restricted in compliance with confidentiality obligations.",
    description:
      "This project involved extending an existing HRMS with confidential internal workflows. The logic, data structures, and automation processes cannot be shared due to non-disclosure restrictions.",
    duration: "1 month",
    year: "2025",
    image: project6Img,
  },
];
