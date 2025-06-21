import React, { useEffect } from 'react';
import { useModuleProgress } from '@/hooks/useModuleProgress';

export interface ModulePageProps {
    params: { lang: string };
    moduleId: string;
    totalSections: number;
}

export interface EnhancedModuleProps extends ModulePageProps {
    moduleProgress: ReturnType<typeof useModuleProgress>;
}

// HOC that adds progress functionality to any module page
export function withModuleProgress<T extends ModulePageProps>(
    WrappedComponent: React.ComponentType<T & EnhancedModuleProps>,
    moduleId: string,
    totalSections: number
) {
    const EnhancedComponent = (props: T) => {
        const moduleProgress = useModuleProgress(moduleId, totalSections);

        // Track time spent (add 1 minute every 60 seconds)
        useEffect(() => {
            const interval = setInterval(() => {
                moduleProgress.addTimeSpent(1);
            }, 60000); // Every minute

            return () => clearInterval(interval);
        }, [moduleProgress]);

        // Set current section when component mounts
        useEffect(() => {
            if (moduleProgress.isLoaded) {
                // You can customize this logic based on your needs
                const lastSection = moduleProgress.moduleProgress.currentSection;
                if (lastSection > 0) {
                    // Restore to last visited section
                    // This would need to be implemented in the wrapped component
                }
            }
        }, [moduleProgress.isLoaded]);

        if (!moduleProgress.isLoaded) {
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Loading module...</p>
                    </div>
                </div>
            );
        }

        return (
            <WrappedComponent
                {...props}
                moduleId={moduleId}
                totalSections={totalSections}
                moduleProgress={moduleProgress}
            />
        );
    };

    EnhancedComponent.displayName = `withModuleProgress(${WrappedComponent.displayName || WrappedComponent.name})`;

    return EnhancedComponent;
}

// Utility component for rendering progress indicators
export const ProgressIndicator: React.FC<{
    progress: number;
    className?: string;
}> = ({ progress, className = '' }) => (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
        <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
        />
    </div>
);

// Utility component for section completion status
export const SectionStatus: React.FC<{
    sectionIndex: number;
    isCompleted: boolean;
    onToggle: (index: number) => void;
    className?: string;
}> = ({ sectionIndex, isCompleted, onToggle, className = '' }) => (
    <button
        onClick={() => onToggle(sectionIndex)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isCompleted
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            } ${className}`}
    >
        {isCompleted ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        )}
        <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
    </button>
);
