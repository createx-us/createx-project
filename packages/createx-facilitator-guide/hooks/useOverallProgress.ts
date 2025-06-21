import { useState, useEffect, useCallback } from 'react';
import { MODULE_CONFIG, type ModuleId } from '@/lib/moduleConfig';

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  progress: number;
  sectionsCompleted: Set<number>;
  lastAccessed: string;
  timeSpent: number;
  currentSection: number;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  totalTimeSpent: number;
  lastActivity: string;
  version: string;
}

const STORAGE_KEY = 'createx-facilitator-progress';

export const useOverallProgress = () => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage (read-only)
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoaded(false);
      return;
    }
    
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed: UserProgress = JSON.parse(savedProgress);
        // Convert arrays back to Sets for consistency
        if (parsed.modules) {
          Object.keys(parsed.modules).forEach(key => {
            const module = parsed.modules[key];
            if (Array.isArray(module.sectionsCompleted)) {
              module.sectionsCompleted = new Set(module.sectionsCompleted);
            } else if (module.sectionsCompleted && typeof module.sectionsCompleted === 'object') {
              module.sectionsCompleted = new Set(Object.values(module.sectionsCompleted));
            } else {
              module.sectionsCompleted = new Set<number>();
            }
          });
        }
        setUserProgress(parsed);
      }
    } catch (error) {
      console.error('Error loading overall progress:', error);
      setUserProgress(null);
    }
    setIsLoaded(true);
  }, []);

  // Listen for localStorage changes to update the overview when module pages make changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed: UserProgress = JSON.parse(e.newValue);
          if (parsed.modules) {
            Object.keys(parsed.modules).forEach(key => {
              const module = parsed.modules[key];
              if (Array.isArray(module.sectionsCompleted)) {
                module.sectionsCompleted = new Set(module.sectionsCompleted);
              } else if (module.sectionsCompleted && typeof module.sectionsCompleted === 'object') {
                module.sectionsCompleted = new Set(Object.values(module.sectionsCompleted));
              } else {
                module.sectionsCompleted = new Set<number>();
              }
            });
          }
          setUserProgress(parsed);
        } catch (error) {
          console.error('Error parsing storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Safe accessor for userProgress.modules to prevent SSR errors
  const getModules = useCallback(() => {
    try {
      return userProgress?.modules || {};
    } catch (error) {
      console.error('Error accessing modules:', error);
      return {};
    }
  }, [userProgress]);

  // Get module progress by ID
  const getModuleProgressById = useCallback((moduleId: string) => {
    try {
      const modules = getModules();
      return modules[moduleId as ModuleId] || null;
    } catch (error) {
      console.error('Error getting module progress:', error);
      return null;
    }
  }, [getModules]);

  // Calculate overall statistics
  const getOverallStats = useCallback(() => {
    try {
      const modules = getModules();
      if (!modules || Object.keys(modules).length === 0) {
        return {
          completedModules: 0,
          totalModules: Object.keys(MODULE_CONFIG).length,
          overallProgress: 0,
          totalTimeSpent: 0,
          lastActivity: new Date().toISOString()
        };
      }

      const moduleValues = Object.values(modules);
      const completedModules = moduleValues.filter(m => m && m.completed).length;
      const totalModules = Object.keys(MODULE_CONFIG).length;
      const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

      return {
        completedModules,
        totalModules,
        overallProgress,
        totalTimeSpent: userProgress?.totalTimeSpent || 0,
        lastActivity: userProgress?.lastActivity || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error calculating overall stats:', error);
      return {
        completedModules: 0,
        totalModules: Object.keys(MODULE_CONFIG).length,
        overallProgress: 0,
        totalTimeSpent: 0,
        lastActivity: new Date().toISOString()
      };
    }
  }, [getModules, userProgress]);

  // Get module status for display
  const getModuleStatus = useCallback((moduleId: string) => {
    const moduleProgress = getModuleProgressById(moduleId);
    const config = MODULE_CONFIG[moduleId as ModuleId];
    
    if (!moduleProgress || !config) {
      return {
        status: 'not-started' as const,
        progress: 0,
        sectionsCompleted: 0,
        totalSections: config?.totalSections || 0,
        timeSpent: 0,
        lastAccessed: null
      };
    }

    let status: 'not-started' | 'in-progress' | 'completed' = 'not-started';
    if (moduleProgress.completed) {
      status = 'completed';
    } else if (moduleProgress.sectionsCompleted.size > 0) {
      status = 'in-progress';
    }

    return {
      status,
      progress: moduleProgress.progress,
      sectionsCompleted: moduleProgress.sectionsCompleted.size,
      totalSections: config.totalSections,
      timeSpent: moduleProgress.timeSpent,
      lastAccessed: moduleProgress.lastAccessed
    };
  }, [getModuleProgressById]);

  return {
    userProgress,
    isLoaded,
    getModuleProgressById,
    getOverallStats,
    getModuleStatus
  };
};

export default useOverallProgress;
