import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, '..', 'src', 'content');

function readJSON(...paths) {
  const filePath = join(CONTENT, ...paths);
  if (!existsSync(filePath)) {
    console.warn(`Warning: ${filePath} not found, skipping`);
    return null;
  }
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function readDirJSON(dir) {
  const dirPath = join(CONTENT, dir);
  const entries = [];
  if (!existsSync(dirPath)) return entries;
  const files = readdirSync(dirPath).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(dirPath, file), 'utf-8'));
    const id = file.replace(/\.json$/, '');
    entries.push({ id, data });
  }
  return entries;
}

const data = {
  hero: {},
  about: {},
  experience: [],
  projects: [],
  services: [],
  skillGroups: [],
  certifications: [],
  education: [],
  awards: [],
  testimonials: [],
  workflow: [],
  contact: {},
  featured: [],
};

// Read from content collections
const skills = readJSON('skills', 'skills.json');
const education = readJSON('education', 'education.json');
const workflow = readJSON('workflow', 'workflow.json');
const featured = readJSON('featured', 'featured.json');

const projects = readDirJSON('projects');
const testimonials = readDirJSON('testimonials');
const experience = readDirJSON('experience');
const services = readDirJSON('services');
const tools = readDirJSON('tools');

data.projects = projects.map(e => e.data);
data.testimonials = testimonials.map(e => e.data);
data.experience = experience.map(e => e.data);
data.services = services.map(e => e.data);
data.tools = tools.map(e => e.data);

// Pinoy style semi-hardcoded data (hero, about, contact stay here since they're not content-collection-friendly)
data.hero = {
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
};

data.about = {
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
};

if (skills) {
  data.skillGroups = skills.skillGroups;
  data.certifications = skills.certifications;
}

if (education) {
  data.education = education.schools.map(s => ({
    school: s.name,
    degree: s.degree,
    year: s.year,
    honors: s.honors || '',
  }));
  data.awards = education.awards.map(a => ({
    title: a.title,
    description: a.description,
  }));
}

if (workflow) {
  data.workflow = workflow.steps.map(s => ({
    title: s.title,
    description: s.desc,
  }));
}

if (featured) {
  data.featured = featured.items.map(f => ({
    title: f.title,
    description: f.description,
  }));
}

data.contact = {
  email: 'desiertomonchingb@gmail.com',
  availability: ['Full-time', 'Contract', 'AI Collabs'],
  links: {
    linkedin: 'https://www.linkedin.com/in/monchingdesierto',
    github: 'https://github.com/mdasea',
    onlinejobs: 'https://v2.onlinejobs.ph/jobseekers/info/4504838',
    whatsapp: 'https://wa.me/639562206467',
  },
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

  for (const cat of data.tools) {
    add('tools', `Toolkit: ${cat.category}`, `Technologies in ${cat.category}: ${cat.items.map(i => i.name).join(', ')}.`);
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
