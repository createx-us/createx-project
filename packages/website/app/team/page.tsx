import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { TeamMember } from '../../types/strapi';
import strapi from '../../lib/strapi';

export const metadata: Metadata = {
    title: 'Team - CreateX Protocol',
    description: 'Meet the innovative team behind CreateX Protocol, building the future of decentralized education.',
};

async function getTeamData() {
    try {
        const response = await strapi.getTeamMembers();
        return response.data || [];
    } catch (error) {
        console.error('Error fetching team data:', error);
        return [];
    }
}

export default async function TeamPage() {
    const team = await getTeamData() as TeamMember[];

    return (
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
                            <span className="text-primary-600 font-medium">Team</span>
                            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Blog
                            </Link>
                            <Link href="/workshops" className="text-gray-600 hover:text-gray-900 transition-colors">
                                Workshops
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="container-padding py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Meet the innovative minds building the future of decentralized education.
                        Our diverse team combines expertise in blockchain technology, education, and community building.
                    </p>
                </div>
            </div>

            {/* Team Grid */}
            <div className="container-padding pb-16">
                <div className="max-w-6xl mx-auto">
                    {team.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members yet</h3>
                            <p className="text-gray-600 mb-6">
                                Team member profiles will appear here once they are added to the CMS.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto">
                                <h4 className="font-semibold text-blue-900 mb-2">Getting Started with Strapi CMS</h4>
                                <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
                                    <li>Run <code className="bg-blue-100 px-1 rounded">./setup-strapi.sh</code> to initialize Strapi</li>
                                    <li>Start Strapi with <code className="bg-blue-100 px-1 rounded">cd strapi && npm run develop</code></li>
                                    <li>Access admin panel at <code className="bg-blue-100 px-1 rounded">http://localhost:1337/admin</code></li>
                                    <li>Create your first admin user and add team members</li>
                                </ol>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((member) => (
                                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                                    {/* Avatar */}
                                    <div className="relative w-24 h-24 mx-auto mb-4">
                                        {member.avatar ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.avatar.url}`}
                                                alt={member.name}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                                                <span className="text-2xl font-bold text-primary-600">
                                                    {member.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Name & Role */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary-600 font-medium mb-3">
                                        {member.role}
                                    </p>

                                    {/* Bio */}
                                    {member.bio && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {member.bio}
                                        </p>
                                    )}

                                    {/* Expertise */}
                                    {member.expertise && member.expertise.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {member.expertise.slice(0, 3).map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {member.expertise.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                        +{member.expertise.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                title="Email"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </a>
                                        )}
                                        {member.twitter && (
                                            <a
                                                href={`https://twitter.com/${member.twitter}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                title="Twitter"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        )}
                                        {member.linkedIn && (
                                            <a
                                                href={member.linkedIn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                title="LinkedIn"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        )}
                                        {member.github && (
                                            <a
                                                href={`https://github.com/${member.github}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                title="GitHub"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        )}
                                        {member.walletAddress && (
                                            <div
                                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                                title={`Wallet: ${member.walletAddress}`}
                                                onClick={() => navigator.clipboard.writeText(member.walletAddress!)}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Join Team CTA */}
            <div className="container-padding pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Join Our Mission
                        </h2>
                        <p className="text-lg opacity-90 mb-6">
                            Are you passionate about revolutionizing education through blockchain technology?
                            We're always looking for talented individuals to join our team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/careers" className="btn bg-white text-primary-600 hover:bg-gray-100">
                                View Open Positions
                            </Link>
                            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
