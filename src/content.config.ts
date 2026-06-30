import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    accent: z.string(),
    icon: z.string().optional(),
    link: z.string().optional(),
    logoSrc: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    initials: z.string(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/experience' }),
  schema: z.object({
    company: z.string(),
    initials: z.string(),
    location: z.string(),
    period: z.string(),
    roles: z.array(z.object({
      title: z.string(),
      duration: z.string(),
      highlights: z.array(z.string()),
    })),
    link: z.string().optional(),
    logoSrc: z.string().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: 'src/content/services' }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/skills' }),
  schema: z.object({
    skillGroups: z.array(z.object({
      category: z.string(),
      skills: z.array(z.object({
        name: z.string(),
        level: z.number(),
        color: z.string(),
      })),
    })),
    certifications: z.array(z.object({
      name: z.string(),
      issuer: z.string(),
      date: z.string(),
      link: z.string().optional(),
    })),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/education' }),
  schema: z.object({
    schools: z.array(z.object({
      name: z.string(),
      degree: z.string(),
      year: z.string(),
      honors: z.string().optional(),
      link: z.string().optional(),
      logoSrc: z.string(),
    })),
    awards: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
  }),
});

const workflow = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/workflow' }),
  schema: z.object({
    steps: z.array(z.object({
      num: z.string(),
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })),
  }),
});

const featured = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/featured' }),
  schema: z.object({
    items: z.array(z.object({
      href: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      sourceLabel: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/tools' }),
  schema: z.object({
    category: z.string(),
    color: z.string(),
    items: z.array(z.object({
      name: z.string(),
      description: z.string().optional(),
      link: z.string().optional(),
    })),
  }),
});

export const collections = {
  projects,
  testimonials,
  experience,
  services,
  skills,
  education,
  workflow,
  featured,
  tools,
};
