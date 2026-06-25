import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'src');

const data = {
  hero: {
    name: 'Monching Desierto',
    titles: [
      'Full Stack Software Developer',
      'Java EE / Spring Specialist',
      'React & Vue Frontend Developer',
      'AI-Powered Developer',
      'Performance Optimizer',
      'TOPCIT National Ranker',
      'PhilNITS FE Passer',
    ],
    description: 'Building high-performance backends & AI-powered solutions for your business',
    tags: ['Java', 'Spring', 'React', 'Vue', 'AI', 'TOPCIT Top 10', 'PhilNITS FE'],
    social: {
      email: 'desiertomonchingb@gmail.com',
      linkedin: 'https://www.linkedin.com/in/monchingdesierto',
      github: 'https://github.com/mdasea',
      onlinejobs: 'https://v2.onlinejobs.ph/jobseekers/info/4504838',
      whatsapp: '+639562206467',
    },
  },
  about: {
    paragraphs: [
      'Full Stack Software Developer with 4+ years of experience specializing in high-performance Java backend systems and modern frontend technologies. I excel at architecting and optimizing both new and legacy codebases, with a proven track record in delivering significant performance improvements through algorithm optimization and refactoring.',
      'My expertise spans the entire stack, encompassing Java/Jakarta EE, Spring, and relational databases on the backend, complemented by strong frontend skills in React, Vue, and JavaScript ES6. I am driven by solving complex mathematical, computational, and logical challenges. I ranked Top 10 nationally in the TOPCIT exam and passed the PhilNITS FE examination.',
      'I won 1st Place in the international Trae AI IDE: Zero Limits Hackathon (out of 879 teams) with my global team PathFinders, building an AI-powered job recommendation system. I actively leverage AI coding tools and agents in my hobby projects (e.g., Gemini, Claude, Cursor, Windsurf, Trae, Kiro, Lovable) to accelerate development, enhance problem-solving, and foster a more efficient, AI-powered development workflow.',
    ],
    stats: [
      { value: '4+', label: 'Years Experience' },
      { value: '10', label: 'National Rank TOPCIT' },
      { value: '1st', label: 'AI Hackathon Winner' },
      { value: '15', label: 'Professional Certifications' },
      { value: '193+', label: 'LinkedIn Connections' },
      { value: '3', label: 'Languages Spoken' },
    ],
  },
  experience: [
    {
      company: 'Ease Solutions',
      location: 'Cebu, Philippines',
      period: 'June 2022 — Present',
      roles: [
        {
          title: 'Software Developer',
          duration: 'March 2024 — Present',
          highlights: [
            'Developed and maintained features for easeRequirements Jira Plugin (R4J) — Data Center & Cloud — using Java 8/17, Java/Jakarta EE, Spring, React, Vue, jQuery, Atlassian SDK & Forge',
            'Consistently recognized as a top-performing developer in yearly evaluations; promoted from Junior to Mid-Level on first yearly evaluation',
            'Spearheaded migration of legacy tree structure, achieving 70-80% performance improvement on APIs in both filtered and unfiltered trees',
            'Optimized filtered tree loading time by 20% through backend enhancement before migration',
            'Successfully migrated legacy Maven codebase from Java 8 to Java 17',
            'Owned and resolved multiple backend performance issues for Jira Data Center Plugin',
            'Active participant in Agile (Scrum) — sprint planning, daily stand-ups, retrospectives, PI Planning',
            'Trusted backend developer and active member of the Backend Chapter, contributing to best practices and knowledge sharing',
            'Exposed to Git, Jira Software, BitBucket',
          ],
        },
        {
          title: 'Junior Software Developer',
          duration: 'June 2022 — February 2024',
          highlights: [
            'Developed and maintained features for easeRequirements Jira Plugin (R4J) using Java 8, Java EE, Spring, React, Vue, jQuery, and Atlassian SDK',
            'Consistently recognized as a top-performing developer; promoted to Mid-Level on first yearly evaluation',
            'Optimized filtered tree loading time by 20% through backend enhancement',
            'Active participant in Agile (Scrum) development',
            'Exposed to Git, Jira Software, BitBucket',
          ],
        },
      ],
    },
    {
      company: 'Catalyst Outsourcing Private Limited',
      location: 'Singapore',
      period: 'November 2025 — March 2026',
      roles: [
        {
          title: 'Vibe Coder',
          duration: 'November 2025 — March 2026',
          highlights: [
            'Built and shipped features using AI-powered development tools',
            'Tools: Lovable, Claude Code, Cursor, Playwright MCP, RESEND API, Manus AI, Lark, Tavus AI API, Heygen AI',
          ],
        },
      ],
    },
    {
      company: 'lablab.ai',
      location: 'Remote',
      period: 'June 2025',
      roles: [
        {
          title: 'Agentic AI Developer (Hackathon Project)',
          duration: 'June 2025',
          highlights: [
            'Vibe coded a full web app project with 5 international members using Trae AI IDE and Novita AI API',
            'Led the implementation of AI IDE usage and LLM model integration across the team',
            'Established the vibe coding workflow: git branching, AI-assisted requirements planning, phase-by-phase implementation, bug fixing, and collaborative PR merging',
            'Built the entire frontend and integrated Novita AI API',
            'Demonstrated frontend features and development process to judges',
          ],
        },
      ],
    },
    {
      company: 'Southern Taiwan University of Science and Technology',
      location: 'Taiwan',
      period: 'April 2021 — June 2021',
      roles: [
        {
          title: 'Intern AI Researcher',
          duration: 'April 2021 — June 2021',
          highlights: [
            'Authored and published a research paper on monocular image object-depth estimation on mobile phones',
          ],
        },
      ],
    },
  ],
  projects: [
    {
      title: 'easeRequirements Jira Plugin (R4J)',
      description: 'Performance optimization and migration of a major Jira Data Center & Cloud plugin. Achieved 70-80% API performance improvement through legacy tree structure migration and backend optimization. Successfully migrated the codebase from Java 8 to Java 17.',
      tags: ['Java 17', 'Spring', 'React', 'Vue', 'Atlassian SDK'],
    },
    {
      title: 'AccessJobs — AI-Powered Job Recommendation',
      description: '1st Place winner of the international Trae AI IDE: Zero Limits Hackathon (879 teams). Built an AI-powered job recommendation system with 95% accurate matches, intelligent resume parsing, and personalized career insights. Vibe coded with 4 international teammates.',
      tags: ['Trae AI IDE', 'Novita AI API', 'AI Development', 'React', '1st Place'],
    },
    {
      title: 'Doong Island Hub',
      description: 'The digital hub for everything Doong Island — making life easier for residents and enriching the experience for visitors.',
      tags: ['Windsurf', 'Cursor', 'Community', 'Vibe Coding'],
    },
    {
      title: 'Neutrino AI',
      description: 'Advanced AI that handles your entire project lifecycle while you remain in control. Simply approve or refine AI suggestions for any project type — from software to novels, products to events.',
      tags: ['Gemini API', 'Cursor', 'AI Agents', 'Requirements Engineering'],
    },
    {
      title: 'AI Search',
      description: 'A Google-search-like web app powered by AI, built for intelligent query responses and semantic search.',
      tags: ['Google Gemini', 'Gemini API', 'AI Search', 'Web App'],
    },
    {
      title: 'Doong Express',
      description: 'Online web store built with Vue 3 and Firebase, providing a seamless shopping experience.',
      tags: ['Vue.js', 'Pinia', 'Firebase', 'E-commerce'],
    },
    {
      title: '3D Object Modeling through Phone Scan',
      description: 'Turn a camera-scanned object into a 3D model. Research project associated with Cebu Institute of Technology.',
      tags: ['Point Clouds', 'Android', 'Computer Vision', '3D Modeling'],
    },
    {
      title: 'Drone Speed & Movement Simulation',
      description: 'Application of Fuzzy Logic to Drone Simulation in the .NET Platform. Academic research project at CIT.',
      tags: ['C#', '.NET', 'Fuzzy Logic', 'Simulation'],
    },
    {
      title: 'MobileScan — Depth Estimation',
      description: 'Android app from the STUST internship research: Obstacle Detection and Monocular Distance Estimation on a Mobile Phone for the Visually Impaired and Blind.',
      tags: ['Android', 'Research', 'Computer Vision', 'Deep Learning', 'Python'],
    },
    {
      title: 'Overseer — Flood Mapping App',
      description: 'A flood mapping Android app that guides users to avoid floods. Built with Django backend and Android frontend.',
      tags: ['Python', 'Django', 'Android', 'GIS', 'Flood Mapping'],
    },
    {
      title: 'Monocular Image Depth Estimation',
      description: 'Authored and published a research paper on monocular image object-depth estimation on mobile phones during internship at STUST, Taiwan. Focused on deep learning approaches for single-image depth prediction.',
      tags: ['AI Research', 'Computer Vision', 'Deep Learning', 'Python'],
    },
    {
      title: 'AI Academy',
      description: 'Learn AI concepts with AI-generated courses. Built using AI-first development tools including Windsurf and Cursor to rapidly prototype and deploy educational content.',
      tags: ['Windsurf', 'Cursor', 'AI Education', 'Vibe Coding'],
    },
  ],
  services: [
    {
      title: 'Full Stack Development',
      description: 'End-to-end web application development using Java/Spring on the backend and React/Vue on the frontend. I build scalable, maintainable systems that handle real-world traffic.',
      tags: ['Java 17', 'Spring', 'React', 'Vue', 'REST APIs'],
    },
    {
      title: 'AI Integration & Automation',
      description: 'Integrate AI capabilities into your workflow — from LLM-powered features and intelligent agents to automated pipelines using modern AI tools and APIs.',
      tags: ['Claude', 'OpenAI', 'AI Agents', 'RAG', 'Automation'],
    },
    {
      title: 'Performance Optimization',
      description: 'Identify and fix performance bottlenecks in existing systems. I have a proven track record of achieving 70-80% API performance improvements through algorithmic optimization and migration.',
      tags: ['Profiling', 'Caching', 'Query Optimization', 'Migration'],
    },
    {
      title: 'Custom Software Development',
      description: 'From concept to deployment — I build tailored software solutions including Jira plugins, web stores, AI-powered search tools, and community platforms.',
      tags: ['Full Lifecycle', 'Agile/Scrum', 'CI/CD', 'Cloud Deploy'],
    },
  ],
  skillGroups: [
    {
      category: 'Backend',
      skills: [
        { name: 'Java 8/17', level: 95 },
        { name: 'Java/Jakarta EE', level: 90 },
        { name: 'Spring', level: 88 },
        { name: 'REST APIs', level: 92 },
        { name: 'SQL & JPA/Hibernate', level: 85 },
      ],
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 82 },
        { name: 'Vue', level: 80 },
        { name: 'JavaScript ES6+', level: 88 },
        { name: 'TypeScript', level: 78 },
        { name: 'HTML/CSS', level: 85 },
      ],
    },
    {
      category: 'AI & Tools',
      skills: [
        { name: 'Claude / Opencode', level: 92 },
        { name: 'Cursor / Lovable / Trae / Junie', level: 88 },
        { name: 'Playwright MCP', level: 85 },
        { name: 'Git & Agile/Scrum', level: 90 },
        { name: 'Vibe Coding', level: 88 },
      ],
    },
    {
      category: 'Platforms & APIs',
      skills: [
        { name: 'Atlassian SDK / Forge', level: 88 },
        { name: 'Novita AI API', level: 82 },
        { name: 'RESEND API', level: 78 },
        { name: 'Tavus / Heygen AI', level: 75 },
        { name: 'Lark / Manus AI', level: 75 },
      ],
    },
  ],
  certifications: [
    { name: 'Modern Java: Mastering Features from Java 8 to Java 21', issuer: 'Udemy' },
    { name: 'Lean Six Sigma Foundations', issuer: 'LinkedIn' },
    { name: 'React.js Essential Training', issuer: 'LinkedIn' },
    { name: 'Learning TypeScript', issuer: 'LinkedIn' },
    { name: 'Sustainable Software Architecture', issuer: 'LinkedIn' },
    { name: 'Software Design: Code & Design Smells', issuer: 'LinkedIn' },
    { name: 'Learning Vue.js', issuer: 'LinkedIn' },
    { name: 'Agile Software Development: Clean Coding Practices', issuer: 'LinkedIn' },
    { name: 'Jira and Confluence Together Badge', issuer: 'Atlassian' },
    { name: 'Spring Boot 2.0 Essential Training', issuer: 'LinkedIn' },
    { name: 'Learning Spring with Spring Boot', issuer: 'LinkedIn' },
    { name: 'Java 11+ Essential Training', issuer: 'LinkedIn' },
    { name: 'Advanced Java Programming', issuer: 'LinkedIn' },
    { name: 'Java: Testing with JUnit', issuer: 'LinkedIn' },
    { name: 'Java: Data Structures', issuer: 'LinkedIn' },
  ],
  education: [
    {
      school: 'Mapúa University',
      degree: 'Master of Science in Computer Science',
      year: 'Present',
    },
    {
      school: 'Cebu Institute of Technology - University',
      degree: 'Bachelor of Science in Computer Science',
      honors: 'Cum Laude, DOST Scholar',
      year: '2018 — 2022',
    },
  ],
  awards: [
    { title: 'Top 10', description: 'National Rank TOPCIT Exam' },
    { title: '1st Runner-Up', description: 'Java Programming - IT Olympics' },
    { title: 'Champion', description: 'Region VII Coding Challenge' },
    { title: 'Cum Laude', description: 'Graduation Honors' },
    { title: '1st Place', description: 'AI Hackathon Winner (Global - 879 teams)' },
    { title: 'Passed', description: 'PhilNITS FE Examination' },
    { title: 'Scholar', description: 'DOST Scholarship' },
  ],
  testimonials: [
    {
      quote: 'I wholeheartedly recommend Monching for any professional opportunity. Their skills, attitude, and dedication to their work make them an invaluable asset. I am confident that he will excel in any endeavor he will undertake.',
      author: 'Kent Joshua Nesus',
      role: 'Colleague at Ease Solutions',
    },
    {
      quote: 'I had the pleasure of collaborating with Monching during a recent hackathon, and I was genuinely impressed by his technical expertise and dedication, particularly in frontend development.',
      author: 'Mirza Abdullah Tariq',
      role: 'Teammate, Trae AI Hackathon',
    },
    {
      quote: 'I had the opportunity to work with Monching and he is the best in his role. He has really great knowledge in the tech and I find him very skillful. Not only that he is supportive and was always there to help me and teach the thing that I don\'t know.',
      author: 'Aaryab Panta',
      role: 'Teammate, Trae AI Hackathon',
    },
    {
      quote: 'I had the pleasure of working alongside Monching during the hackathon, where he served as a core frontend developer. His expertise in React.js and seamless integration of APIs played a pivotal role in bringing our solution to life.',
      author: 'Hammad Zaheer',
      role: 'Teammate, Trae AI Hackathon',
    },
  ],
  workflow: [
    { title: 'Discovery Call', description: 'We discuss your project goals, requirements, and timeline. I ask the right questions to understand the scope and suggest the best approach.' },
    { title: 'Planning & Proposal', description: 'I outline the architecture, tech stack, milestones, and deliverables. You get a clear roadmap and fixed-price or hourly estimate before any work begins.' },
    { title: 'Development & Sprints', description: 'I build your solution in iterative sprints with regular demos and check-ins. You see progress weekly and can provide feedback at every stage.' },
    { title: 'Deploy & Support', description: 'I deploy to production, hand over documentation, and provide post-launch support. Your project is live, tested, and ready to scale.' },
  ],
  contact: {
    email: 'desiertomonchingb@gmail.com',
    availability: ['Full-time', 'Contract', 'AI Collabs'],
    links: {
      linkedin: 'https://www.linkedin.com/in/monchingdesierto',
      github: 'https://github.com/mdasea',
      onlinejobs: 'https://v2.onlinejobs.ph/jobseekers/info/4504838',
      whatsapp: 'https://wa.me/639562206467',
    },
  },
  featured: [
    { title: 'Hackathon Champion — TeamPathFinders', description: 'Won an international hackathon with a global team.' },
    { title: 'International Research Collaboration — CIT x STUST', description: 'Research on monocular image object-depth estimation with Southern Taiwan University.' },
    { title: '#CITTopsAgain', description: 'Top-performing student recognized by Cebu Institute of Technology.' },
    { title: 'Coding Challenge Champions', description: 'Champion in the Central Visayas Coding Challenge.' },
    { title: 'Java Programming Champion — IT Olympics', description: 'First Place (First Runner-Up) in Java Programming Competition.' },
  ],
};

function tokenize(text) {
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'can', 'could', 'shall', 'should', 'may', 'might', 'am',
    'it', 'its', 'my', 'your', 'our', 'their', 'his', 'her', 'they',
    'them', 'we', 'he', 'she', 'this', 'that', 'these', 'those', 'not',
    'no', 'nor', 'so', 'if', 'than', 'then', 'also', 'very', 'just',
    'more', 'about', 'up', 'out', 'all', 'each', 'every', 'both', 'some',
    'into', 'over', 'such', 'only', 'other', 'new', 'any', 'after',
  ]);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopWords.has(t));
}

function createChunks() {
  const chunks = [];

  function add(section, heading, content) {
    if (!content || content.length < 10) return;
    chunks.push({
      id: `${section}-${chunks.length}`,
      section,
      heading,
      content,
      tokens: tokenize(content),
    });
  }

  add('hero', 'Introduction', `${data.hero.name} is a ${data.hero.titles.join(', ')}. ${data.hero.description}. Stack: ${data.hero.tags.join(', ')}. Contact: ${data.hero.social.email}.`);

  data.about.paragraphs.forEach(p => add('about', 'About Monching', p));

  add('about', 'About Monching - Stats',
    data.about.stats.map(s => `${s.value} ${s.label}`).join('. ')
  );

  for (const exp of data.experience) {
    for (const role of exp.roles) {
      const content = `At ${exp.company} (${exp.location}, ${exp.period}) as ${role.title} (${role.duration}): ${role.highlights.join('. ')}`;
      add('experience', `${role.title} at ${exp.company}`, content);
    }
  }

  for (const proj of data.projects) {
    add('projects', `Project: ${proj.title}`, `${proj.description} Tags: ${proj.tags.join(', ')}.`);
  }

  for (const svc of data.services) {
    add('services', `Service: ${svc.title}`, `${svc.description} Tags: ${svc.tags.join(', ')}.`);
  }

  for (const group of data.skillGroups) {
    add('skills', `Skills: ${group.category}`, `Proficient in ${group.category}: ${group.skills.map(s => `${s.name} (${s.level}%)`).join(', ')}.`);
  }

  add('skills', 'Certifications',
    `${data.certifications.length} certifications including: ${data.certifications.slice(0, 5).map(c => c.name).join(', ')}.`
  );

  for (const edu of data.education) {
    const honors = edu.honors ? ` - ${edu.honors}` : '';
    add('education', `Education: ${edu.school}`, `${edu.degree} at ${edu.school} (${edu.year})${honors}.`);
  }

  add('education', 'Awards', data.awards.map(a => `${a.title}: ${a.description}`).join('. '));

  for (const t of data.testimonials) {
    add('testimonials', `Testimonial by ${t.author}`, `${t.quote} — ${t.author}, ${t.role}.`);
  }

  for (const wf of data.workflow) {
    add('workflow', `Workflow: ${wf.title}`, wf.description);
  }

  add('contact', 'Contact Information', `Email: ${data.contact.email}. Available for: ${data.contact.availability.join(', ')}. LinkedIn: ${data.contact.links.linkedin}. GitHub: ${data.contact.links.github}.`);

  for (const f of data.featured) {
    add('featured', `Featured: ${f.title}`, `${f.description}`);
  }

  return chunks;
}

const chunks = createChunks();

const output = {
  chunks,
  metadata: {
    totalChunks: chunks.length,
    lastUpdated: new Date().toISOString().split('T')[0],
  },
};

const outPath = join(__dirname, '..', 'public', 'knowledge-base.json');
writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Knowledge base generated: ${chunks.length} chunks → ${outPath}`);
