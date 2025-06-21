import { useState, useEffect, useCallback } from 'react';

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
const PROGRESS_VERSION = '1.0.0';

// Default progress structure
const createDefaultProgress = (): UserProgress => ({
  modules: {},
  totalTimeSpent: 0,
  lastActivity: new Date().toISOString(),
  version: PROGRESS_VERSION
});

// Default module progress
const createDefaultModuleProgress = (moduleId: string): ModuleProgress => ({
  moduleId,
  completed: false,
  progress: 0,
  sectionsCompleted: new Set<number>(),
  lastAccessed: new Date().toISOString(),
  timeSpent: 0,
  currentSection: 0
});

export const useModuleProgress = (moduleId: string, totalSections: number = 1) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(createDefaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Validate totalSections parameter
  useEffect(() => {
    if (totalSections <= 0) {
      console.warn(`⚠️ Invalid totalSections (${totalSections}) for module ${moduleId}. Using 1 as default.`);
    }
  }, [moduleId, totalSections]);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        console.log('🔍 Raw localStorage data:', savedProgress?.substring(0, 200) + '...');
        
        if (savedProgress) {
          const parsed: UserProgress = JSON.parse(savedProgress);
          // Convert arrays back to Sets
          if (parsed.modules) {
            Object.keys(parsed.modules).forEach(key => {
              const module = parsed.modules[key];
              if (Array.isArray(module.sectionsCompleted)) {
                module.sectionsCompleted = new Set(module.sectionsCompleted);
              } else if (module.sectionsCompleted && typeof module.sectionsCompleted === 'object') {
                // Handle case where it might already be a Set-like object
                module.sectionsCompleted = new Set(Object.values(module.sectionsCompleted));
              } else {
                // Fallback to empty Set
                module.sectionsCompleted = new Set<number>();
              }
            });
          }
          console.log('🔄 Loaded existing localStorage data:', { 
            moduleId, 
            moduleCount: Object.keys(parsed.modules || {}).length,
            currentModuleData: parsed.modules[moduleId],
            allModuleIds: Object.keys(parsed.modules || {})
          });
          setUserProgress(parsed);
        } else {
          console.log('🆕 No existing data, using default progress:', { moduleId });
          setUserProgress(createDefaultProgress());
        }
      } catch (error) {
        console.error('❌ Error loading progress from localStorage:', error);
        setUserProgress(createDefaultProgress());
      }
    }
    console.log('🚀 useModuleProgress mounted for:', moduleId, 'totalSections:', totalSections);
    setIsLoaded(true);
  }, []); // Only run once on mount

  // Save progress to localStorage whenever it changes (with debounce)
  useEffect(() => {
    if (!isLoaded) return; // Don't save until we've loaded initial data

    const saveTimeout = setTimeout(() => {
      if (typeof window !== 'undefined' && userProgress.modules) {
        try {
          // Convert Sets to arrays for JSON serialization
          const progressToSave = {
            ...userProgress,
            modules: Object.keys(userProgress.modules).reduce((acc, key) => {
              const module = userProgress.modules[key];
              acc[key] = {
                ...module,
                sectionsCompleted: Array.from(module.sectionsCompleted || new Set())
              };
              return acc;
            }, {} as Record<string, any>)
          };

          console.log('💾 Saving progress to localStorage:', { 
            moduleId, 
            moduleCount: Object.keys(progressToSave.modules).length,
            currentModuleProgress: progressToSave.modules[moduleId],
            sectionsCompleted: progressToSave.modules[moduleId]?.sectionsCompleted,
            allModuleIds: Object.keys(progressToSave.modules)
          });
          
          const progressString = JSON.stringify(progressToSave);
          localStorage.setItem(STORAGE_KEY, progressString);
          
          // Verify the save worked by reading it back immediately
          const verification = localStorage.getItem(STORAGE_KEY);
          if (!verification) {
            console.error('❌ Failed to save to localStorage - verification failed');
          } else {
            try {
              const verifiedData = JSON.parse(verification);
              const verifiedModule = verifiedData.modules[moduleId];
              console.log('✅ Successfully saved and verified localStorage data:', {
                moduleId,
                sectionsInSaved: verifiedModule?.sectionsCompleted?.length || 0,
                progressInSaved: verifiedModule?.progress || 0
              });
            } catch (e) {
              console.error('❌ Verification parse failed:', e);
            }
          }
        } catch (error) {
          console.error('Error saving progress to localStorage:', error);
        }
      }
    }, 100); // Reduced debounce to 100ms for faster response

    return () => clearTimeout(saveTimeout);
  }, [userProgress, isLoaded, moduleId]);

  // Get current module progress
  const getModuleProgress = useCallback((): ModuleProgress => {
    if (!userProgress.modules) {
      return createDefaultModuleProgress(moduleId);
    }
    return userProgress.modules[moduleId] || createDefaultModuleProgress(moduleId);
  }, [userProgress.modules, moduleId]);

  // Update module progress
  const updateModuleProgress = useCallback((updates: Partial<ModuleProgress>) => {
    setUserProgress(prev => {
      // Ensure modules object exists
      const modules = prev.modules || {};
      const currentModule = modules[moduleId] || createDefaultModuleProgress(moduleId);
      const updatedModule = {
        ...currentModule,
        ...updates,
        lastAccessed: new Date().toISOString(),
      };

      // Auto-calculate progress based on sections completed
      if (updates.sectionsCompleted) {
        updatedModule.progress = Math.round((updates.sectionsCompleted.size / totalSections) * 100);
        updatedModule.completed = updates.sectionsCompleted.size === totalSections;
      }

      const newState = {
        ...prev,
        modules: {
          ...modules,
          [moduleId]: updatedModule
        },
        lastActivity: new Date().toISOString()
      };

      console.log('📝 Updating module progress:', {
        moduleId,
        updates,
        newModuleState: updatedModule,
        totalModules: Object.keys(newState.modules).length
      });

      return newState;
    });
  }, [moduleId, totalSections]);

  // Mark section as complete
  const markSectionComplete = useCallback((sectionIndex: number) => {
    const currentModule = getModuleProgress();
    const newCompletedSections = new Set(currentModule.sectionsCompleted);
    newCompletedSections.add(sectionIndex);

    updateModuleProgress({
      sectionsCompleted: newCompletedSections,
      currentSection: Math.min(sectionIndex + 1, totalSections - 1)
    });
  }, [getModuleProgress, updateModuleProgress, totalSections]);

  // Mark section as incomplete
  const markSectionIncomplete = useCallback((sectionIndex: number) => {
    const currentModule = getModuleProgress();
    const newCompletedSections = new Set(currentModule.sectionsCompleted);
    newCompletedSections.delete(sectionIndex);

    updateModuleProgress({
      sectionsCompleted: newCompletedSections
    });
  }, [getModuleProgress, updateModuleProgress]);

  // Force immediate save to localStorage
  const forceSave = useCallback(() => {
    if (typeof window !== 'undefined' && userProgress.modules) {
      try {
        // Convert Sets to arrays for JSON serialization
        const progressToSave = {
          ...userProgress,
          modules: Object.keys(userProgress.modules).reduce((acc, key) => {
            const module = userProgress.modules[key];
            acc[key] = {
              ...module,
              sectionsCompleted: Array.from(module.sectionsCompleted || new Set())
            };
            return acc;
          }, {} as Record<string, any>)
        };

        console.log('🚀 Force saving progress to localStorage:', { 
          moduleId, 
          moduleCount: Object.keys(progressToSave.modules).length,
          currentModuleProgress: progressToSave.modules[moduleId],
          sectionsCompleted: progressToSave.modules[moduleId]?.sectionsCompleted,
          allModuleIds: Object.keys(progressToSave.modules)
        });
        
        const progressString = JSON.stringify(progressToSave);
        localStorage.setItem(STORAGE_KEY, progressString);
        
        // Verify the save worked by reading it back immediately
        const verification = localStorage.getItem(STORAGE_KEY);
        if (!verification) {
          console.error('❌ Failed to force save to localStorage - verification failed');
          return false;
        } else {
          try {
            const verifiedData = JSON.parse(verification);
            const verifiedModule = verifiedData.modules[moduleId];
            console.log('✅ Successfully force saved and verified localStorage data:', {
              moduleId,
              sectionsInSaved: verifiedModule?.sectionsCompleted?.length || 0,
              progressInSaved: verifiedModule?.progress || 0
            });
            return true;
          } catch (e) {
            console.error('❌ Verification parse failed:', e);
            return false;
          }
        }
      } catch (error) {
        console.error('Error force saving progress to localStorage:', error);
        return false;
      }
    }
    return false;
  }, [userProgress, moduleId]);

  // Toggle section completion with immediate save
  const toggleSectionComplete = useCallback((sectionIndex: number) => {
    console.log('🔄 Toggling section completion for:', sectionIndex);
    
    const currentModule = getModuleProgress();
    const newCompletedSections = new Set(currentModule.sectionsCompleted);
    
    if (newCompletedSections.has(sectionIndex)) {
      newCompletedSections.delete(sectionIndex);
      console.log('❌ Removing section:', sectionIndex);
    } else {
      newCompletedSections.add(sectionIndex);
      console.log('✅ Adding section:', sectionIndex);
    }

    // Update state
    updateModuleProgress({
      sectionsCompleted: newCompletedSections,
      currentSection: sectionIndex
    });

    // Immediately save to localStorage with the new state (don't wait for React state update)
    if (typeof window !== 'undefined') {
      try {
        const currentProgress = userProgress;
        const updatedModule = {
          ...currentModule,
          sectionsCompleted: newCompletedSections,
          currentSection: sectionIndex,
          lastAccessed: new Date().toISOString(),
          progress: Math.round((newCompletedSections.size / totalSections) * 100),
          completed: newCompletedSections.size === totalSections
        };

        const newProgressState = {
          ...currentProgress,
          modules: {
            ...currentProgress.modules,
            [moduleId]: updatedModule
          },
          lastActivity: new Date().toISOString()
        };

        // Convert Sets to arrays for JSON serialization
        const progressToSave = {
          ...newProgressState,
          modules: Object.keys(newProgressState.modules).reduce((acc, key) => {
            const module = newProgressState.modules[key];
            acc[key] = {
              ...module,
              sectionsCompleted: Array.from(module.sectionsCompleted || new Set())
            };
            return acc;
          }, {} as Record<string, any>)
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(progressToSave));
        console.log('💾 Immediately saved section completion to localStorage:', {
          sectionIndex,
          totalCompleted: newCompletedSections.size,
          progress: updatedModule.progress
        });
      } catch (error) {
        console.error('❌ Failed to immediately save progress:', error);
      }
    }
  }, [getModuleProgress, updateModuleProgress, moduleId, userProgress, totalSections]);

  // Mark entire module as complete
  const markModuleComplete = useCallback(() => {
    const allSections = new Set(Array.from({ length: totalSections }, (_, i) => i));
    updateModuleProgress({
      completed: true,
      progress: 100,
      sectionsCompleted: allSections
    });
  }, [updateModuleProgress, totalSections]);

  // Add time spent
  const addTimeSpent = useCallback((minutes: number) => {
    const currentModule = getModuleProgress();
    updateModuleProgress({
      timeSpent: currentModule.timeSpent + minutes
    });

    setUserProgress(prev => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + minutes
    }));
  }, [getModuleProgress, updateModuleProgress]);

  // Set current section
  const setCurrentSection = useCallback((sectionIndex: number) => {
    updateModuleProgress({
      currentSection: sectionIndex
    });
  }, [updateModuleProgress]);

  // Reset module progress
  const resetModuleProgress = useCallback(() => {
    setUserProgress(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: createDefaultModuleProgress(moduleId)
      }
    }));
  }, [moduleId]);

  // Get overall statistics
  const getOverallStats = useCallback(() => {
    const modules = Object.values(userProgress.modules || {});
    const completedModules = modules.filter(m => m.completed).length;
    const totalModules = Math.max(modules.length, 27); // Assuming 27 total modules
    const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    return {
      completedModules,
      totalModules,
      overallProgress,
      totalTimeSpent: userProgress.totalTimeSpent,
      lastActivity: userProgress.lastActivity
    };
  }, [userProgress]);

  // Debug methods (for development)
  const debugClearProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      setUserProgress(createDefaultProgress());
      console.log('🗑️ Cleared all progress data');
    }
  }, []);

  const debugShowProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      console.log('🔍 Current localStorage data:', saved ? JSON.parse(saved) : 'No data');
      console.log('🔍 Current state:', userProgress);
    }
  }, [userProgress]);

  return {
    // State
    moduleProgress: getModuleProgress(),
    userProgress,
    isLoaded,

    // Actions
    updateModuleProgress,
    markSectionComplete,
    markSectionIncomplete,
    toggleSectionComplete,
    markModuleComplete,
    addTimeSpent,
    setCurrentSection,
    resetModuleProgress,
    forceSave,

    // Getters
    getOverallStats,
    getModuleProgress,

    // Debug methods (only use in development)
    debugClearProgress,
    debugShowProgress
  };
};

export default useModuleProgress;
