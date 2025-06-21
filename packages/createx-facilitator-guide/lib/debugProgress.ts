// Debug utilities for progress tracking
// Use these in the browser console to inspect and manipulate progress data

export const debugProgress = {
  // Get current localStorage data
  getStorage: () => {
    const data = localStorage.getItem('createx-facilitator-progress');
    return data ? JSON.parse(data) : null;
  },

  // Get raw localStorage string
  getRawStorage: () => {
    return localStorage.getItem('createx-facilitator-progress');
  },

  // Clear all progress
  clearAll: () => {
    localStorage.removeItem('createx-facilitator-progress');
    console.log('✅ All progress cleared');
  },

  // Clear specific module
  clearModule: (moduleId: string) => {
    const data = debugProgress.getStorage();
    if (data && data.modules && data.modules[moduleId]) {
      delete data.modules[moduleId];
      localStorage.setItem('createx-facilitator-progress', JSON.stringify(data));
      console.log(`✅ Cleared progress for module: ${moduleId}`);
    }
  },

  // Set a section as complete
  markSectionComplete: (moduleId: string, sectionIndex: number) => {
    const data = debugProgress.getStorage() || { modules: {}, totalTimeSpent: 0, lastActivity: new Date().toISOString(), version: "1.0.0" };
    if (!data.modules[moduleId]) {
      data.modules[moduleId] = {
        progress: 0,
        completed: false,
        sectionsCompleted: [],
        timeSpent: 0,
        currentSection: 0,
        lastAccessed: new Date().toISOString()
      };
    }
    
    if (!Array.isArray(data.modules[moduleId].sectionsCompleted)) {
      data.modules[moduleId].sectionsCompleted = [];
    }
    
    if (!data.modules[moduleId].sectionsCompleted.includes(sectionIndex)) {
      data.modules[moduleId].sectionsCompleted.push(sectionIndex);
    }
    
    localStorage.setItem('createx-facilitator-progress', JSON.stringify(data));
    console.log(`✅ Marked section ${sectionIndex} complete for ${moduleId}`);
    console.log('Current data:', data.modules[moduleId]);
  },

  // View specific module progress
  getModule: (moduleId: string) => {
    const data = debugProgress.getStorage();
    return data?.modules?.[moduleId] || null;
  },

  // List all modules with progress
  listAllModules: () => {
    const data = debugProgress.getStorage();
    if (!data || !data.modules) {
      console.log('No modules found');
      return;
    }
    
    console.log('All modules:');
    Object.keys(data.modules).forEach(moduleId => {
      const module = data.modules[moduleId];
      console.log(`- ${moduleId}: ${module.progress}% complete, sections: [${Array.isArray(module.sectionsCompleted) ? module.sectionsCompleted.join(', ') : 'invalid format'}]`);
    });
  },

  // Test localStorage save
  testSave: () => {
    const testData = {
      modules: {
        'test-module': {
          progress: 50,
          completed: false,
          sectionsCompleted: [0, 1],
          timeSpent: 10,
          currentSection: 1,
          lastAccessed: new Date().toISOString()
        }
      },
      totalTimeSpent: 10,
      lastActivity: new Date().toISOString(),
      version: "1.0.0"
    };
    
    localStorage.setItem('createx-facilitator-progress', JSON.stringify(testData));
    console.log('✅ Test data saved');
    
    const retrieved = debugProgress.getStorage();
    console.log('Retrieved data:', retrieved);
    
    // Clean up
    debugProgress.clearModule('test-module');
  }
};

// Make it available globally in browser
if (typeof window !== 'undefined') {
  (window as any).debugProgress = debugProgress;
  console.log('🔧 Debug tools available as window.debugProgress');
  console.log('Available methods:', Object.keys(debugProgress));
}
