// Strapi Content Types
export interface StrapiBase {
  id: number;
  attributes: any;
  meta?: {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: StrapiMedia;
  author?: TeamMember;
  categories?: Category[];
  tags?: string[];
  readTime: number;
  seo?: SEO;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  avatar?: StrapiMedia;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  github?: string;
  walletAddress?: string;
  expertise?: string[];
  order: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workshop {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  featuredImage?: StrapiMedia;
  startDate: string;
  endDate?: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  priceToken: string;
  maxParticipants?: number;
  instructor?: TeamMember;
  categories?: Category[];
  requirements?: string[];
  learningOutcomes?: string[];
  isOnline: boolean;
  location?: string;
  meetingLink?: string;
  seo?: SEO;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

export interface SEO {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaImage?: StrapiMedia;
  canonicalURL?: string;
}

// Strapi API Response Types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API Client Types
export interface StrapiQueryParams {
  populate?: string | string[] | object;
  fields?: string[];
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
}
