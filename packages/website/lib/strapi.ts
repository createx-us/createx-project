import { StrapiQueryParams, StrapiResponse, StrapiCollectionResponse } from '../types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

class StrapiClient {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string = STRAPI_URL, token?: string) {
    this.baseURL = baseURL;
    this.token = token || STRAPI_TOKEN;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private buildQueryString(params: StrapiQueryParams): string {
    const searchParams = new URLSearchParams();

    if (params.populate) {
      if (typeof params.populate === 'string') {
        searchParams.append('populate', params.populate);
      } else if (Array.isArray(params.populate)) {
        params.populate.forEach(field => searchParams.append('populate', field));
      } else {
        searchParams.append('populate', JSON.stringify(params.populate));
      }
    }

    if (params.fields) {
      params.fields.forEach(field => searchParams.append('fields', field));
    }

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }

    if (params.sort) {
      if (Array.isArray(params.sort)) {
        params.sort.forEach(sortField => searchParams.append('sort', sortField));
      } else {
        searchParams.append('sort', params.sort);
      }
    }

    if (params.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(`pagination[${key}]`, String(value));
        }
      });
    }

    if (params.publicationState) {
      searchParams.append('publicationState', params.publicationState);
    }

    if (params.locale) {
      searchParams.append('locale', params.locale);
    }

    return searchParams.toString();
  }

  // Generic methods
  async find<T>(
    endpoint: string,
    params: StrapiQueryParams = {}
  ): Promise<StrapiCollectionResponse<T>> {
    const queryString = this.buildQueryString(params);
    return this.request<StrapiCollectionResponse<T>>(
      `${endpoint}${queryString ? `?${queryString}` : ''}`
    );
  }

  async findOne<T>(
    endpoint: string,
    id: string | number,
    params: StrapiQueryParams = {}
  ): Promise<StrapiResponse<T>> {
    const queryString = this.buildQueryString(params);
    return this.request<StrapiResponse<T>>(
      `${endpoint}/${id}${queryString ? `?${queryString}` : ''}`
    );
  }

  async create<T>(endpoint: string, data: any): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async update<T>(
    endpoint: string,
    id: string | number,
    data: any
  ): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(`${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  async delete<T>(endpoint: string, id: string | number): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
  }

  // Content-specific methods
  async getBlogPosts(params: StrapiQueryParams = {}) {
    return this.find('/blog-posts', {
      populate: ['featuredImage', 'author', 'categories', 'seo'],
      sort: ['publishedAt:desc'],
      ...params,
    });
  }

  async getBlogPost(slug: string, params: StrapiQueryParams = {}) {
    return this.find('/blog-posts', {
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage', 'author', 'categories', 'seo'],
      ...params,
    });
  }

  async getTeamMembers(params: StrapiQueryParams = {}) {
    return this.find('/team-members', {
      populate: ['avatar'],
      sort: ['order:asc'],
      ...params,
    });
  }

  async getWorkshops(params: StrapiQueryParams = {}) {
    return this.find('/workshops', {
      populate: ['featuredImage', 'instructor', 'categories', 'seo'],
      sort: ['startDate:asc'],
      ...params,
    });
  }

  async getWorkshop(slug: string, params: StrapiQueryParams = {}) {
    return this.find('/workshops', {
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage', 'instructor', 'categories', 'seo'],
      ...params,
    });
  }

  async getCategories(params: StrapiQueryParams = {}) {
    return this.find('/categories', {
      sort: ['name:asc'],
      ...params,
    });
  }
}

export const strapi = new StrapiClient();
export default strapi;
