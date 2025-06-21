// Global progress manager to prevent race conditions
class ProgressManager {
  private static instance: ProgressManager;
  private storage_key = 'createx-facilitator-progress';
  private listeners: ((progress: any) => void)[] = [];

  static getInstance(): ProgressManager {
    if (!ProgressManager.instance) {
      ProgressManager.instance = new ProgressManager();
    }
    return ProgressManager.instance;
  }

  // Load progress from localStorage
  loadProgress() {
    try {
      const savedProgress = localStorage.getItem(this.storage_key);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        
        // Convert arrays back to Sets
        if (parsed.modules) {
          Object.keys(parsed.modules).forEach(key => {
            const module = parsed.modules[key];
            if (Array.isArray(module.sectionsCompleted)) {
              module.sectionsCompleted = new Set(module.sectionsCompleted);
            }
          });
        }
        
        console.log('✅ Loaded progress from localStorage:', {
          moduleCount: Object.keys(parsed.modules || {}).length,
          data: parsed
        });
        
        return parsed;
      }
    } catch (error) {
      console.error('❌ Error loading progress:', error);
    }
    
    return null;
  }

  // Save progress to localStorage
  saveProgress(progress: any) {
    try {
      // Convert Sets to arrays for JSON serialization
      const progressToSave = {
        ...progress,
        modules: Object.keys(progress.modules || {}).reduce((acc, key) => {
          const module = progress.modules[key];
          acc[key] = {
            ...module,
            sectionsCompleted: Array.from(module.sectionsCompleted || [])
          };
          return acc;
        }, {} as Record<string, any>)
      };

      localStorage.setItem(this.storage_key, JSON.stringify(progressToSave));
      console.log('💾 Saved progress to localStorage:', {
        moduleCount: Object.keys(progressToSave.modules || {}).length,
        timestamp: new Date().toISOString()
      });

      // Notify listeners
      this.listeners.forEach(listener => listener(progress));
    } catch (error) {
      console.error('❌ Error saving progress:', error);
    }
  }

  // Subscribe to progress changes
  subscribe(listener: (progress: any) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Clear all progress (for debugging)
  clearProgress() {
    localStorage.removeItem(this.storage_key);
    console.log('🗑️ Cleared all progress data');
  }
}

export const progressManager = ProgressManager.getInstance();

// Add global debug functions for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).progressManager = progressManager;
  (window as any).debugProgress = () => {
    console.log('Current progress state:', progressManager.loadProgress());
  };
  (window as any).clearProgress = () => {
    progressManager.clearProgress();
  };
}
