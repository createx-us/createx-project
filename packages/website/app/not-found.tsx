import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                    <p className="text-gray-600">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Go Home
                    </Link>

                    <div className="text-sm text-gray-500">
                        <Link href="/blog" className="hover:text-primary-600">
                            Blog
                        </Link>
                        {' · '}
                        <Link href="/team" className="hover:text-primary-600">
                            Team
                        </Link>
                        {' · '}
                        <Link href="/contact" className="hover:text-primary-600">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
