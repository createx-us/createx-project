"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface Progress {
    moduleId: string;
    chapterId: string;
    completed: boolean;
    completedAt?: Date;
    timeSpent?: number;
}

interface ProgressState {
    progress: Progress[];
    markComplete: (moduleId: string, chapterId: string) => void;
    isCompleted: (moduleId: string, chapterId: string) => boolean;
    getModuleProgress: (moduleId: string) => number;
    getTotalProgress: () => number;
    updateTimeSpent: (moduleId: string, chapterId: string, timeSpent: number) => void;
}

const ProgressContext = createContext<ProgressState | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState<Progress[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load progress from localStorage only on client side
        const saved = localStorage.getItem('createx-old-progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setProgress(parsed.map((p: any) => ({
                        ...p,
                        completedAt: p.completedAt ? new Date(p.completedAt) : undefined,
                    })));
                }
            } catch (error) {
                console.error('Failed to parse saved progress:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        // Save progress to localStorage only on client side
        localStorage.setItem('createx-old-progress', JSON.stringify(progress));
    }, [progress, mounted]);

    const markComplete = (moduleId: string, chapterId: string) => {
        setProgress(prev => {
            const existing = prev.find(p => p.moduleId === moduleId && p.chapterId === chapterId);
            if (existing) {
                return prev.map(p =>
                    p.moduleId === moduleId && p.chapterId === chapterId
                        ? { ...p, completed: true, completedAt: new Date() }
                        : p
                );
            }
            return [...prev, {
                moduleId,
                chapterId,
                completed: true,
                completedAt: new Date(),
            }];
        });
    };

    const isCompleted = (moduleId: string, chapterId: string) => {
        return progress.some(p =>
            p.moduleId === moduleId &&
            p.chapterId === chapterId &&
            p.completed
        );
    };

    const getModuleProgress = (moduleId: string) => {
        // This would need to be calculated based on total chapters in module
        // For now, return a simple percentage
        const moduleProgress = progress.filter(p => p.moduleId === moduleId && p.completed);
        return moduleProgress.length;
    };

    const getTotalProgress = () => {
        const totalCompleted = progress.filter(p => p.completed).length;
        return totalCompleted;
    };

    const updateTimeSpent = (moduleId: string, chapterId: string, timeSpent: number) => {
        setProgress(prev => {
            const existing = prev.find(p => p.moduleId === moduleId && p.chapterId === chapterId);
            if (existing) {
                return prev.map(p =>
                    p.moduleId === moduleId && p.chapterId === chapterId
                        ? { ...p, timeSpent: (p.timeSpent || 0) + timeSpent }
                        : p
                );
            }
            return [...prev, {
                moduleId,
                chapterId,
                completed: false,
                timeSpent,
            }];
        });
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            markComplete,
            isCompleted,
            getModuleProgress,
            getTotalProgress,
            updateTimeSpent,
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
