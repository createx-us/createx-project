'use client';

import { useState } from 'react';
import { Settings, Download, Globe, Zap } from 'lucide-react';
import AdminPanel from './AdminPanel';
import { useBuildSystem, useTranslation } from '../lib/hooks';

interface ToolbarProps {
    // Optional module ID that is currently being viewed
    currentModule?: string;
}

export default function ContentToolbar(_props: ToolbarProps) {
    const [showAdmin, setShowAdmin] = useState(false);
    const { buildSite, buildStatus, buildLog } = useBuildSystem();
    const { currentLanguage, setCurrentLanguage } = useTranslation();

    const handleBuild = async () => {
        try {
            await buildSite({ language: currentLanguage });
        } catch (error) {
            console.error('Build failed:', error);
        }
    };

    const handleExport = async (format: 'html' | 'pdf') => {
        try {
            if (format === 'pdf') {
                // Trigger PDF export
                window.print();
            } else {
                // Download HTML
                const response = await fetch('/api/content/export');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `facilitator-guide-${currentLanguage}.zip`;
                a.click();
            }
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                    <div className="flex space-x-2">
                        {/* Language Selector */}
                        <div className="relative">
                            <select
                                value={currentLanguage}
                                onChange={(e) => setCurrentLanguage(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
                            >
                                <option value="en">🇺🇸 EN</option>
                                <option value="es">🇪🇸 ES</option>
                                <option value="fr">🇫🇷 FR</option>
                                <option value="de">🇩🇪 DE</option>
                                <option value="zh">🇨🇳 ZH</option>
                            </select>
                            <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Build Button */}
                        <button
                            onClick={handleBuild}
                            disabled={buildStatus === 'building'}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${buildStatus === 'building'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                                }`}
                            title="Build static site"
                        >
                            <Zap className="h-4 w-4" />
                            <span>{buildStatus === 'building' ? 'Building...' : 'Build'}</span>
                        </button>

                        {/* Export Menu */}
                        <div className="relative group">
                            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                <Download className="h-4 w-4" />
                                <span>Export</span>
                            </button>

                            <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="p-2 w-32">
                                    <button
                                        onClick={() => handleExport('html')}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                    >
                                        HTML Site
                                    </button>
                                    <button
                                        onClick={() => handleExport('pdf')}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                                    >
                                        PDF Guide
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Admin Panel */}
                        <button
                            onClick={() => setShowAdmin(true)}
                            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            title="Content Management"
                        >
                            <Settings className="h-4 w-4" />
                            <span>Manage</span>
                        </button>
                    </div>

                    {/* Build Status */}
                    {buildStatus !== 'idle' && (
                        <div className="mt-2 p-2 bg-gray-50 rounded border-t">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Build Status</span>
                                <span className={`text-xs font-medium ${buildStatus === 'building' ? 'text-blue-600' :
                                        buildStatus === 'success' ? 'text-green-600' :
                                            'text-red-600'
                                    }`}>
                                    {buildStatus}
                                </span>
                            </div>
                            {buildLog.length > 0 && (
                                <div className="mt-1 text-xs text-gray-500 max-h-20 overflow-y-auto">
                                    {buildLog.slice(-3).map((log, index) => (
                                        <div key={index}>{log}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Admin Panel Modal */}
            {showAdmin && (
                <AdminPanel onClose={() => setShowAdmin(false)} />
            )}
        </>
    );
}