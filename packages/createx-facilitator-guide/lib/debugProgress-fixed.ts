// Debug utility to monitor localStorage and fix persistence issues
export const debugLocalStorage = () => {
  const STORAGE_KEY = 'createx-facilitator-progress';
  
  // Log current localStorage state
  const logCurrentState = () => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        console.log('📊 Current localStorage state:', {
          moduleCount: Object.keys(parsed.modules || {}).length,
          completedModules: Object.values(parsed.modules || {}).filter((m: any) => m.completed).length,
          totalTimeSpent: parsed.totalTimeSpent,
          lastActivity: parsed.lastActivity,
          modules: parsed.modules
        });
        return parsed;
      } catch (error) {
        console.error('❌ Error parsing localStorage:', error);
        return null;
      }
    } else {
      console.log('📊 No localStorage data found');
      return null;
    }
  };

  // Test localStorage persistence
  const testPersistence = () => {
    const testKey = 'test-persistence';
    const testValue = 'test-' + Date.now();
    
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    if (retrieved === testValue) {
      console.log('✅ localStorage persistence working correctly');
      return true;
    } else {
      console.log('❌ localStorage persistence FAILED');
      return false;
    }
  };

  // Clear all progress data
  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Cleared all progress data');
  };

  // Mark a module as complete for testing
  const markModuleComplete = (moduleId: string, totalSections: number = 7) => {
    let data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      data = JSON.stringify({
        modules: {},
        totalTimeSpent: 0,
        lastActivity: new Date().toISOString(),
        version: '1.0.0'
      });
    }
    
    const parsed = JSON.parse(data);
    const sections = Array.from({length: totalSections}, (_, i) => i);
    
    parsed.modules[moduleId] = {
      moduleId,
      completed: true,
      progress: 100,
      sectionsCompleted: sections,
      lastAccessed: new Date().toISOString(),
      timeSpent: 45,
      currentSection: totalSections - 1
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    console.log(`✅ Marked ${moduleId} as complete with ${totalSections} sections`);
    
    // Verify the save worked
    const verification = localStorage.getItem(STORAGE_KEY);
    if (verification) {
      const verifiedData = JSON.parse(verification);
      console.log('🔍 Verification successful:', verifiedData.modules[moduleId]);
    } else {
      console.error('❌ Verification FAILED - data not saved');
    }
  };

  // Watch for localStorage changes
  const watchChanges = () => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key: string, value: string) {
      if (key === STORAGE_KEY) {
        console.log('💾 localStorage updated:', {
          timestamp: new Date().toISOString(),
          data: JSON.parse(value)
        });
      }
      originalSetItem.call(this, key, value);
    };
    console.log('👀 Now watching localStorage changes');
  };

  return {
    logCurrentState,
    testPersistence,
    clearProgress,
    markModuleComplete,
    watchChanges
  };
};

// Auto-expose to global window for browser console access
if (typeof window !== 'undefined') {
  (window as any).debugProgress = debugLocalStorage();
  console.log('🔧 Debug utilities loaded. Available commands:');
  console.log('  debugProgress.logCurrentState() - Show current data');
  console.log('  debugProgress.clearProgress() - Clear all data');
  console.log('  debugProgress.markModuleComplete("creativity-fundamentals", 7) - Mark module complete');
  console.log('  debugProgress.watchChanges() - Watch localStorage changes');
  console.log('  debugProgress.testPersistence() - Test localStorage works');
}
