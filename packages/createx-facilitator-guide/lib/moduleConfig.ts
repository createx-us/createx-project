// Configuration for all modules with their IDs and section counts
const moduleConfigData = {
  'creativity-fundamentals': {
    id: 'creativity-fundamentals',
    name: 'Creativity Fundamentals',
    chapter: 1,
    totalSections: 7
  },
  'design-thinking-history': {
    id: 'design-thinking-history',
    name: 'Design Thinking History',
    chapter: 2,
    totalSections: 6
  },
  'creative-confidence': {
    id: 'creative-confidence',
    name: 'Creative Confidence',
    chapter: 3,
    totalSections: 7
  },
  'mission-principles': {
    id: 'mission-principles',
    name: 'CreateX Mission & Principles',
    chapter: 4,
    totalSections: 9
  },
  'facilitator-mindsets': {
    id: 'facilitator-mindsets', 
    name: 'Facilitator Mindsets',
    chapter: 5,
    totalSections: 12
  },
  'process-overview': {
    id: 'process-overview',
    name: 'Process Overview',
    chapter: 6,
    totalSections: 12
  },
  'research-empathy': {
    id: 'research-empathy',
    name: 'Research & Empathy',
    chapter: 7,
    totalSections: 12
  },
  'sense-making': {
    id: 'sense-making',
    name: 'Sense Making',
    chapter: 8,
    totalSections: 12
  },
  'framing-prioritization': {
    id: 'framing-prioritization',
    name: 'Framing & Prioritization',
    chapter: 9,
    totalSections: 10
  },
  'ideation-methods': {
    id: 'ideation-methods',
    name: 'Ideation Methods',
    chapter: 10,
    totalSections: 9
  },
  'prototyping-methods': {
    id: 'prototyping-methods',
    name: 'Prototyping Methods',
    chapter: 11,
    totalSections: 9
  },
  'testing-feedback': {
    id: 'testing-feedback',
    name: 'Testing & Feedback',
    chapter: 12,
    totalSections: 13
  },
  'implementation-roadmapping': {
    id: 'implementation-roadmapping',
    name: 'Implementation & Roadmapping',
    chapter: 13,
    totalSections: 14
  },
  'reflection-learning': {
    id: 'reflection-learning',
    name: 'Reflection & Learning',
    chapter: 14,
    totalSections: 11
  },
  'scoping-logistics': {
    id: 'scoping-logistics',
    name: 'Scoping & Logistics',
    chapter: 15,
    totalSections: 13
  },
  'agenda-design': {
    id: 'agenda-design',
    name: 'Agenda Design',
    chapter: 16,
    totalSections: 11
  },
  'facilitation-skills': {
    id: 'facilitation-skills',
    name: 'Facilitation Skills',
    chapter: 17,
    totalSections: 11
  },
  'ai-integration': {
    id: 'ai-integration',
    name: 'AI Integration',
    chapter: 18,
    totalSections: 11
  },
  'troubleshooting': {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    chapter: 19,
    totalSections: 9
  },
  'capturing-outcomes': {
    id: 'capturing-outcomes',
    name: 'Capturing Outcomes',
    chapter: 20,
    totalSections: 8
  },
  'case-study-corporate': {
    id: 'case-study-corporate',
    name: 'Case Study: Corporate',
    chapter: 21,
    totalSections: 9
  },
  'case-study-nonprofit': {
    id: 'case-study-nonprofit',
    name: 'Case Study: Nonprofit',
    chapter: 22,
    totalSections: 7
  },
  'case-study-education': {
    id: 'case-study-education',
    name: 'Case Study: Education',
    chapter: 23,
    totalSections: 7
  },
  'analytics-kpis': {
    id: 'analytics-kpis',
    name: 'Analytics & KPIs',
    chapter: 24,
    totalSections: 8
  },
  'competency-certification': {
    id: 'competency-certification',
    name: 'Competency & Certification',
    chapter: 25,
    totalSections: 6
  },
  'personal-brand': {
    id: 'personal-brand',
    name: 'Personal Brand',
    chapter: 26,
    totalSections: 7
  },
  'community-practice': {
    id: 'community-practice',
    name: 'Community of Practice',
    chapter: 27,
    totalSections: 8
  }
};

export const MODULE_CONFIG = moduleConfigData;

export type ModuleId = keyof typeof MODULE_CONFIG;

export const getAllModules = () => Object.values(MODULE_CONFIG);
export const getModuleConfig = (moduleId: string) => MODULE_CONFIG[moduleId as ModuleId];
export const getTotalModules = () => Object.keys(MODULE_CONFIG).length;
