import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, Category } from '../../types/strapi';
import strapi from '../../lib/strapi';

interface BlogPageProps {
    posts: BlogPost[];
    categories: Category[];
}

export default function BlogPage({ posts, categories }: BlogPageProps) {
    return (
        <>
            <Head>
                <title>Blog - CreateX Protocol</title>
                <meta
                    name="description"
                    content="Stay updated with the latest insights, tutorials, and announcements from the CreateX Protocol team."
                />
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
                                <span className="text-primary-600 font-medium">Blog</span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                <div className="container-padding py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Stay updated with the latest insights, tutorials, and announcements
                            from the CreateX Protocol team and community.
                        </p>
                    </div>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="container-padding mb-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/blog"
                                    className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium"
                                >
                                    All Posts
                                </Link>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/blog/category/${category.slug}`}
                                        className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-primary-600 hover:text-primary-600 transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Posts */}
                <div className="container-padding pb-16">
                    <div className="max-w-4xl mx-auto">
                        {posts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Blog posts will appear here once they are added to the CMS.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                                    <h4 className="font-semibold text-blue-900 mb-2">Getting Started with Strapi CMS</h4>
                                    <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
                                        <li>Run <code className="bg-blue-100 px-1 rounded">./setup-strapi.sh</code> to initialize Strapi</li>
                                        <li>Start Strapi with <code className="bg-blue-100 px-1 rounded">cd strapi && npm run develop</code></li>
                                        <li>Access admin panel at <code className="bg-blue-100 px-1 rounded">http://localhost:1337/admin</code></li>
                                        <li>Create your first admin user and add blog posts</li>
                                    </ol>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-8">
                                {posts.map((post) => (
                                    <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="md:flex">
                                            {post.featuredImage && (
                                                <div className="md:w-1/3">
                                                    <div className="relative h-48 md:h-full">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.featuredImage.url}`}
                                                            alt={post.featuredImage.alternativeText || post.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className={`p-6 ${post.featuredImage ? 'md:w-2/3' : 'w-full'}`}>
                                                <div className="flex items-center gap-2 mb-3">
                                                    {post.categories?.map((category: Category) => (
                                                        <span
                                                            key={category.id}
                                                            className="px-2 py-1 text-xs font-medium rounded-full"
                                                            style={{
                                                                backgroundColor: `${category.color}20`,
                                                                color: category.color
                                                            }}
                                                        >
                                                            {category.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h2 className="text-xl font-semibold mb-3">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="hover:text-primary-600 transition-colors"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h2>
                                                {post.excerpt && (
                                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                                )}
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <div className="flex items-center gap-4">
                                                        {post.author && (
                                                            <span>By {post.author.name}</span>
                                                        )}
                                                        <span>{post.readTime} min read</span>
                                                    </div>
                                                    {post.publishedAt && (
                                                        <time dateTime={post.publishedAt}>
                                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </time>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        // Fetch blog posts and categories from Strapi
        const [postsResponse, categoriesResponse] = await Promise.all([
            strapi.getBlogPosts({
                pagination: { page: 1, pageSize: 10 }
            }),
            strapi.getCategories()
        ]);

        return {
            props: {
                posts: postsResponse.data || [],
                categories: categoriesResponse.data || [],
            },
            revalidate: 60, // Revalidate every minute
        };
    } catch (error) {
        console.error('Error fetching blog data:', error);

        // Return empty data if Strapi is not available
        return {
            props: {
                posts: [],
                categories: [],
            },
            revalidate: 60,
        };
    }
};
