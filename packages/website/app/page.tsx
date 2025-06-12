import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CreateX Protocol - Decentralized Innovation Education Platform',
    description: 'CreateX Protocol enables decentralized innovation education through blockchain technology, smart contracts, and community-driven learning.',
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Navigation */}
            <nav className="container-padding py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg"></div>
                        <span className="text-xl font-bold">CreateX</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </Link>
                        <Link href="/team" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Team
                        </Link>
                        <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Blog
                        </Link>
                        <Link href="/workshops" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Workshops
                        </Link>
                        <Link href="/contact" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="container-padding section-padding">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="mb-6 gradient-text">
                        Decentralized Innovation Education Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        CreateX Protocol revolutionizes education through blockchain technology,
                        enabling permissionless learning, credential verification, and community-driven innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/workshops" className="btn-primary">
                            Explore Workshops
                        </Link>
                        <Link href="/about" className="btn-outline">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="card text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Decentralized Learning</h3>
                        <p className="text-gray-600">
                            Blockchain-powered education platform enabling permissionless access to high-quality learning resources.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-12 h-12 bg-secondary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Verified Credentials</h3>
                        <p className="text-gray-600">
                            Immutable, verifiable certificates and badges stored on-chain for lifelong skill validation.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-12 h-12 bg-accent-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                        <p className="text-gray-600">
                            Collaborative governance model where community members shape the educational content and platform direction.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-24 bg-gray-50 rounded-2xl p-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary-600">1,000+</div>
                            <div className="text-gray-600">Active Learners</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary-600">50+</div>
                            <div className="text-gray-600">Expert Instructors</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-accent-600">100+</div>
                            <div className="text-gray-600">Learning Modules</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600">5,000+</div>
                            <div className="text-gray-600">Certificates Issued</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="container-padding py-12 mt-24 border-t border-gray-200">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg"></div>
                                <span className="text-xl font-bold">CreateX</span>
                            </div>
                            <p className="text-gray-600">
                                Empowering the next generation of innovators through decentralized education.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Platform</h4>
                            <div className="space-y-2">
                                <Link href="/workshops" className="block text-gray-600 hover:text-gray-900">
                                    Workshops
                                </Link>
                                <Link href="/team" className="block text-gray-600 hover:text-gray-900">
                                    Team
                                </Link>
                                <Link href="/blog" className="block text-gray-600 hover:text-gray-900">
                                    Blog
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Resources</h4>
                            <div className="space-y-2">
                                <Link href="/documentation" className="block text-gray-600 hover:text-gray-900">
                                    Documentation
                                </Link>
                                <Link href="/whitepaper" className="block text-gray-600 hover:text-gray-900">
                                    Whitepaper
                                </Link>
                                <Link href="/api" className="block text-gray-600 hover:text-gray-900">
                                    API
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Community</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-gray-600 hover:text-gray-900">
                                    Discord
                                </a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900">
                                    Twitter
                                </a>
                                <a href="#" className="block text-gray-600 hover:text-gray-900">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                        <p>&copy; 2025 CreateX Protocol. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
