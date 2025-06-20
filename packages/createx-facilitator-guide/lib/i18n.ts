// Supported languages
export const locales = ['en', 'zh'] as const;
export type Locale = typeof locales[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Language names
export const languageNames: Record<Locale, string> = {
  'en': 'English',
  'zh': '中文'
};

// Map locale variants to base dictionaries (for internal use)
export const localeMappings: Record<string, Locale> = {
  'en-US': 'en',
  'en-GB': 'en',
  'zh-CN': 'zh',
  'zh-TW': 'zh'
};

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return defaultLocale;
}

// Remove locale from pathname
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return '/' + segments.slice(2).join('/');
  }
  
  return pathname;
}

// Add locale to pathname
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return pathname;
  }
  
  const cleanPathname = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPathname}`;
}

// Dictionary type
export interface Dictionary {
  navigation: {
    home: string;
    modules: string;
    workshops: string;
    toolkit: string;
    research: string;
    community: string;
    about: string;
    getStarted: string;
  };
  home: {
    title: string;
    subtitle: string;
    description: string;
    outcomePromise: string;
    startLearning: string;
    guideOverview: string;
    whatYoullMaster: string;
    whatYoullMasterDescription: string;
    learningPathOverview: string;
    learningPathDescription: string;
    readyToTransform: string;
    readyToTransformDescription: string;
    startYourJourney: string;
    joinCommunity: string;
    creativeConfidence: {
      title: string;
      description: string;
      exploreChapter: string;
    };
    facilitationSkills: {
      title: string;
      description: string;
      exploreChapter: string;
    };
    aiIntegration: {
      title: string;
      description: string;
      exploreChapter: string;
    };
    learningTracks: string;
    advancedTopics: string;
    track1: {
      title: string;
      description: string;
    };
    track2: {
      title: string;
      description: string;
    };
    track3: {
      title: string;
      description: string;
    };
    track4: {
      title: string;
      description: string;
    };
    track5: {
      title: string;
      description: string;
    };
    track6: {
      title: string;
      description: string;
    };
    facilitatorGuideModules: string;
  };
  modules: {
    title: string;
    description: string;
    startModule: string;
    reviewModule: string;
    learningObjectives: string;
    yourProgress: string;
    progressDescription: string;
    completed: string;
    markComplete: string;
    previous: string;
    next: string;
    nextModule: string;
    backToModules: string;
    resources: string;
    downloadTemplates: string;
    discussionForum: string;
    interactiveSection: string;
    interactiveSectionDescription: string;
    creativityFundamentals: any; // Keeping flexible for complex nested structure
    creativeConfidence: any; // Keeping flexible for complex nested structure
    designThinking: any; // Keeping flexible for complex nested structure
    workshop: any; // Keeping flexible for complex nested structure
  };
  tracks: {
    foundations: string;
    designProcess: string;
    workshopDesign: string;
    aiTechnology: string;
    caseStudies: string;
    professionalGrowth: string;
  };
  common: {
    chapter: string;
    minutes: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    individual: string;
    team: string;
    loading: string;
    error: string;
    retry: string;
    close: string;
    save: string;
    cancel: string;
    continue: string;
    complete: string;
    back: string;
    forward: string;
    menu: string;
    search: string;
    filter: string;
    sort: string;
    view: string;
    edit: string;
    delete: string;
    create: string;
    update: string;
    submit: string;
    reset: string;
    clear: string;
    apply: string;
    confirm: string;
    success: string;
    warning: string;
    info: string;
    help: string;
    support: string;
    contact: string;
    about: string;
    privacy: string;
    terms: string;
    cookies: string;
    settings: string;
    profile: string;
    account: string;
    logout: string;
    login: string;
    register: string;
    forgotPassword: string;
    rememberMe: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    language: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
  };
}

// Load dictionary for locale
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    // Check if we need to map this locale to a base locale
    const dictionaryLocale = localeMappings[locale] || locale;
    
    const dictionary = await import(`../dictionaries/${dictionaryLocale}.json`);
    return dictionary.default;
  } catch (error) {
    // Fallback to default locale if specific locale not found
    if (locale !== defaultLocale) {
      const fallback = await import(`../dictionaries/${defaultLocale}.json`);
      return fallback.default;
    }
    throw new Error(`Dictionary not found for locale: ${locale}`);
  }
}
