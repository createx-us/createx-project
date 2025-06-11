import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../../types/strapi';
import strapi from '../../lib/strapi';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - CreateX Protocol Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        {post.seo?.metaTitle && <title>{post.seo.metaTitle}</title>}
        {post.seo?.metaDescription && <meta name="description" content={post.seo.metaDescription} />}
        {post.seo?.keywords && <meta name="keywords" content={post.seo.keywords} />}
        {post.seo?.canonicalURL && <link rel="canonical" href={post.seo.canonicalURL} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={post.seo?.metaTitle || post.title} />
        <meta property="og:description" content={post.seo?.metaDescription || post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        {post.featuredImage && (
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.featuredImage.url}`} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo?.metaTitle || post.title} />
        <meta name="twitter:description" content={post.seo?.metaDescription || post.excerpt || post.title} />
        {post.featuredImage && (
          <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.featuredImage.url}`} />
        )}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container-padding py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg"></div>
                <span className="text-xl font-bold">CreateX</span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link href="/team" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Team
                </Link>
                <Link href="/workshops" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Workshops
                </Link>
                <Link href="/blog" className="text-primary-600 font-medium">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="container-padding py-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-gray-900">Home</Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/blog" className="hover:text-gray-900">Blog</Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900">{post.title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="container-padding pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  {post.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.slug}`}
                      className="px-3 py-1 text-sm font-medium rounded-full hover:opacity-80 transition-opacity"
                      style={{ 
                        backgroundColor: `${category.color}20`, 
                        color: category.color 
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center justify-between text-gray-600 mb-8">
                <div className="flex items-center gap-6">
                  {post.author && (
                    <div className="flex items-center gap-3">
                      {post.author.avatar && (
                        <div className="relative w-10 h-10">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.author.avatar.url}`}
                            alt={post.author.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{post.author.name}</div>
                        <div className="text-sm">{post.author.role}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.featuredImage.url}`}
                    alt={post.featuredImage.alternativeText || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
              <div 
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author && post.author.bio && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-4">
                  {post.author.avatar && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.author.avatar.url}`}
                        alt={post.author.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {post.author.name}
                    </h3>
                    <p className="text-primary-600 text-sm mb-2">{post.author.role}</p>
                    <p className="text-gray-600">{post.author.bio}</p>
                    {/* Social Links */}
                    <div className="flex items-center gap-3 mt-3">
                      {post.author.twitter && (
                        <a
                          href={`https://twitter.com/${post.author.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                      {post.author.linkedIn && (
                        <a
                          href={post.author.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {post.author.github && (
                        <a
                          href={`https://github.com/${post.author.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <span className="sr-only">GitHub</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link href="/blog" className="btn-outline">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await strapi.getBlogPosts({
      fields: ['slug'],
      pagination: { pageSize: 100 }
    });

    const paths = response.data.map((post) => ({
      params: { slug: post.slug }
    }));

    return {
      paths,
      fallback: 'blocking', // Enable ISR for new posts
    };
  } catch (error) {
    console.error('Error fetching blog post paths:', error);
    
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const response = await strapi.getBlogPost(params?.slug as string);
    
    if (!response.data || response.data.length === 0) {
      return {
        notFound: true,
      };
    }

    const post = response.data[0];

    return {
      props: {
        post,
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    
    return {
      notFound: true,
    };
  }
};
