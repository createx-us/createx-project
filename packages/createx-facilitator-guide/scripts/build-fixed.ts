#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { contentManager } from '../lib/content.js';
import { program } from 'commander';
import chalk from 'chalk';

// Build system for static HTML generation
class BuildSystem {
  private outputDir: string;
  private templateDir: string;
  
  constructor(outputDir: string = 'dist') {
    this.outputDir = path.resolve(outputDir);
    this.templateDir = path.resolve('templates');
  }

  // Generate static HTML site
  async buildStaticSite(language: string = 'en') {
    console.log(chalk.blue('🚀 Building static site...'));
    
    // Create output directory
    const buildDir = path.join(this.outputDir, language);
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Load all modules
    const modules = await contentManager.loadAllModules();
    const stats = await contentManager.getModuleStats();
    
    console.log(chalk.green(`📚 Loaded ${modules.length} modules`));

    // Generate index page
    await this.generateIndexPage(modules, stats, buildDir, language);
    
    // Generate module pages
    for (const module of modules) {
      await this.generateModulePage(module, buildDir, language);
    }

    // Generate track pages
    const tracks = Array.from(new Set(modules.map(m => m.track)));
    for (const track of tracks) {
      const trackModules = modules.filter(m => m.track === track);
      await this.generateTrackPage(track, trackModules, buildDir, language);
    }

    // Copy assets
    await this.copyAssets(buildDir);
    
    // Generate search index
    await this.generateSearchIndex(modules, buildDir);

    console.log(chalk.green(`✅ Build completed! Output: ${buildDir}`));
    return buildDir;
  }

  // Generate index.html
  private async generateIndexPage(modules: any[], stats: any, buildDir: string, language: string) {
    const tracks = Object.entries(stats.trackCounts).map(([name, count]) => ({
      name,
      count,
      modules: modules.filter(m => m.track === name)
    }));

    const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CreateX Facilitator Guide</title>
    <link rel="stylesheet" href="./assets/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="title">CreateX Facilitator Guide</h1>
            <p class="subtitle">A comprehensive guide for creative innovation facilitation</p>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <section class="stats">
                <div class="stat-card">
                    <h3>${stats.totalModules}</h3>
                    <p>Total Modules</p>
                </div>
                <div class="stat-card">
                    <h3>${Object.keys(stats.trackCounts).length}</h3>
                    <p>Learning Tracks</p>
                </div>
                <div class="stat-card">
                    <h3>${stats.averageDuration}</h3>
                    <p>Avg Duration</p>
                </div>
            </section>

            <section class="tracks">
                <h2>Learning Tracks</h2>
                <div class="track-grid">
                    ${tracks.map(track => `
                        <div class="track-card">
                            <h3><a href="./tracks/${track.name.toLowerCase().replace(/\\s+/g, '-')}.html">${track.name}</a></h3>
                            <p>${track.count} modules</p>
                            <div class="module-list">
                                ${track.modules.slice(0, 3).map(module => `
                                    <a href="./modules/${module.id}.html" class="module-link">
                                        ${module.chapter}. ${module.title}
                                    </a>
                                `).join('')}
                                ${track.modules.length > 3 ? `<span class="more">+${track.modules.length - 3} more</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="all-modules">
                <h2>All Modules</h2>
                <div class="module-grid">
                    ${modules.map(module => `
                        <div class="module-card">
                            <div class="module-header">
                                <span class="chapter">Chapter ${module.chapter}</span>
                                <span class="difficulty ${module.difficulty.toLowerCase()}">${module.difficulty}</span>
                            </div>
                            <h3><a href="./modules/${module.id}.html">${module.title}</a></h3>
                            <p class="track">${module.track}</p>
                            <p class="duration">${module.duration}</p>
                            <div class="objectives">
                                ${module.learningObjectives.slice(0, 2).map((obj: string) => `
                                    <span class="objective">${obj}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 CreateX Protocol. Licensed under MIT License.</p>
        </div>
    </footer>
    
    <script src="./assets/search.js"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(buildDir, 'index.html'), html);
    console.log(chalk.gray('Generated index.html'));
  }

  // Generate individual module pages
  private async generateModulePage(module: any, buildDir: string, language: string) {
    const modulesDir = path.join(buildDir, 'modules');
    if (!fs.existsSync(modulesDir)) {
      fs.mkdirSync(modulesDir, { recursive: true });
    }

    // Get navigation data
    const navigation = await contentManager.generateNavigation();
    const currentIndex = navigation.findIndex(nav => nav.id === module.id);
    const prev = currentIndex > 0 ? navigation[currentIndex - 1] : null;
    const next = currentIndex < navigation.length - 1 ? navigation[currentIndex + 1] : null;

    const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${module.title} - CreateX Facilitator Guide</title>
    <link rel="stylesheet" href="../assets/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header module-header">
        <div class="container">
            <nav class="breadcrumb">
                <a href="../index.html">Home</a> > 
                <a href="../tracks/${module.track.toLowerCase().replace(/\\s+/g, '-')}.html">${module.track}</a> > 
                <span>${module.title}</span>
            </nav>
            <div class="module-meta">
                <span class="chapter">Chapter ${module.chapter}</span>
                <span class="track">${module.track}</span>
                <span class="duration">${module.duration}</span>
                <span class="difficulty ${module.difficulty.toLowerCase()}">${module.difficulty}</span>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <article class="module-content">
                <header class="article-header">
                    <h1>${module.title}</h1>
                    ${module.prerequisites && module.prerequisites.length > 0 ? `
                        <div class="prerequisites">
                            <h3>Prerequisites:</h3>
                            <ul>
                                ${module.prerequisites.map((prereq: string) => `<li>${prereq}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    <div class="learning-objectives">
                        <h3>Learning Objectives:</h3>
                        <ul>
                            ${module.learningObjectives.map((obj: string) => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>
                </header>

                <div class="content">
                    ${module.html}
                </div>

                <nav class="module-navigation">
                    ${prev ? `<a href="./${prev.id}.html" class="nav-prev">← ${prev.title}</a>` : '<span></span>'}
                    ${next ? `<a href="./${next.id}.html" class="nav-next">${next.title} →</a>` : '<span></span>'}
                </nav>
            </article>

            <aside class="sidebar">
                <div class="progress-tracker">
                    <h3>Progress</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(module.chapter / 27) * 100}%"></div>
                    </div>
                    <p>Module ${module.chapter} of 27</p>
                </div>

                <div class="table-of-contents">
                    <h3>In This Module</h3>
                    <ul>
                        ${this.generateTOC(module.content).map(item => `
                            <li class="toc-${item.level}">
                                <a href="#${item.id}">${item.text}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </aside>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 CreateX Protocol. Licensed under MIT License.</p>
        </div>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(modulesDir, `${module.id}.html`), html);
  }

  // Generate track pages
  private async generateTrackPage(track: string, modules: any[], buildDir: string, language: string) {
    const tracksDir = path.join(buildDir, 'tracks');
    if (!fs.existsSync(tracksDir)) {
      fs.mkdirSync(tracksDir, { recursive: true });
    }

    const trackId = track.toLowerCase().replace(/\\s+/g, '-');
    
    const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${track} - CreateX Facilitator Guide</title>
    <link rel="stylesheet" href="../assets/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="breadcrumb">
                <a href="../index.html">Home</a> > <span>${track}</span>
            </nav>
            <h1>${track}</h1>
            <p class="subtitle">${modules.length} modules in this learning track</p>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <section class="track-modules">
                <div class="module-list">
                    ${modules.map(module => `
                        <div class="module-item">
                            <div class="module-number">${module.chapter}</div>
                            <div class="module-info">
                                <h3><a href="../modules/${module.id}.html">${module.title}</a></h3>
                                <div class="module-meta">
                                    <span class="duration">${module.duration}</span>
                                    <span class="difficulty ${module.difficulty.toLowerCase()}">${module.difficulty}</span>
                                </div>
                                <div class="objectives">
                                    ${module.learningObjectives.slice(0, 3).map((obj: string) => `
                                        <span class="objective">${obj}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 CreateX Protocol. Licensed under MIT License.</p>
        </div>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(tracksDir, `${trackId}.html`), html);
  }

  // Copy static assets
  private async copyAssets(buildDir: string) {
    const assetsDir = path.join(buildDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Generate CSS
    const css = this.generateCSS();
    fs.writeFileSync(path.join(assetsDir, 'styles.css'), css);

    // Generate search JavaScript
    const searchJS = this.generateSearchJS();
    fs.writeFileSync(path.join(assetsDir, 'search.js'), searchJS);

    console.log(chalk.gray('Copied assets'));
  }

  // Generate search index
  private async generateSearchIndex(modules: any[], buildDir: string) {
    const searchIndex = modules.map(module => ({
      id: module.id,
      title: module.title,
      track: module.track,
      content: module.content.substring(0, 500), // First 500 chars for search
      url: `./modules/${module.id}.html`
    }));

    fs.writeFileSync(
      path.join(buildDir, 'assets', 'search-index.json'),
      JSON.stringify(searchIndex, null, 2)
    );

    console.log(chalk.gray('Generated search index'));
  }

  // Generate table of contents from content
  private generateTOC(content: string) {
    const headings = content.match(/^#{1,6}\\s+.+$/gm) || [];
    return headings.map(heading => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\\s+/, '');
      const id = text.toLowerCase().replace(/[^\\w\\s-]/g, '').replace(/\\s+/g, '-');
      return { level, text, id };
    });
  }

  // Generate CSS styles
  private generateCSS() {
    return `
/* CreateX Facilitator Guide Styles */
:root {
  --primary: #8B5CF6;
  --secondary: #06B6D4;
  --accent: #F59E0B;
  --bg: #FFFFFF;
  --surface: #F8FAFC;
  --border: #E2E8F0;
  --text: #1E293B;
  --text-muted: #64748B;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 2rem 0;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
}

/* Navigation */
.breadcrumb {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* Cards */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: var(--shadow);
}

.stat-card h3 {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

/* Track Grid */
.track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.track-card {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.track-card h3 {
  margin-bottom: 1rem;
}

.track-card h3 a {
  color: var(--primary);
  text-decoration: none;
}

/* Module Grid */
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.module-card {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chapter {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty.beginner { background: #dcfce7; color: #166534; }
.difficulty.intermediate { background: #fef3c7; color: #92400e; }
.difficulty.advanced { background: #fecaca; color: #991b1b; }

/* Module Content */
.module-content {
  max-width: 800px;
}

.module-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.module-content h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: var(--text);
}

.module-content h3 {
  font-size: 1.4rem;
  margin: 1.5rem 0 0.5rem;
  color: var(--text);
}

.module-content p {
  margin-bottom: 1rem;
}

.module-content ul, .module-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.module-content blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: var(--text-muted);
}

/* Learning Objectives */
.learning-objectives {
  background: var(--surface);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border-left: 4px solid var(--secondary);
}

.prerequisites {
  background: #fef3c7;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border-left: 4px solid var(--accent);
}

/* Navigation */
.module-navigation {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 1rem 0;
  border-top: 1px solid var(--border);
}

.nav-prev, .nav-next {
  color: var(--primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-prev:hover, .nav-next:hover {
  background: var(--primary);
  color: white;
}

/* Progress */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

/* Footer */
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  margin-top: 4rem;
  text-align: center;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .module-grid {
    grid-template-columns: 1fr;
  }
  
  .track-grid {
    grid-template-columns: 1fr;
  }
}`;
  }

  // Generate search JavaScript
  private generateSearchJS() {
    return `
// Simple search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add search box to header if it doesn't exist
  const header = document.querySelector('.header .container');
  if (header && !document.querySelector('#search-box')) {
    const searchHTML = \`
      <div class="search-container" style="margin-top: 1rem;">
        <input type="text" id="search-box" placeholder="Search modules..." 
               style="padding: 0.5rem 1rem; border: 1px solid var(--border); border-radius: 4px; width: 100%; max-width: 400px;">
        <div id="search-results" style="display: none; position: absolute; background: white; border: 1px solid var(--border); border-radius: 4px; margin-top: 0.25rem; max-width: 400px; z-index: 100;"></div>
      </div>
    \`;
    header.insertAdjacentHTML('beforeend', searchHTML);
    
    // Load search index
    fetch('./assets/search-index.json')
      .then(response => response.json())
      .then(searchIndex => {
        const searchBox = document.getElementById('search-box');
        const searchResults = document.getElementById('search-results');
        
        searchBox.addEventListener('input', function(e) {
          const query = e.target.value.toLowerCase().trim();
          
          if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
          }
          
          const results = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.track.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
          ).slice(0, 5);
          
          if (results.length > 0) {
            searchResults.innerHTML = results.map(item => \`
              <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border);">
                <a href="\${item.url}" style="text-decoration: none; color: var(--text);">
                  <div style="font-weight: 600;">\${item.title}</div>
                  <div style="font-size: 0.9rem; color: var(--text-muted);">\${item.track}</div>
                </a>
              </div>
            \`).join('');
            searchResults.style.display = 'block';
          } else {
            searchResults.style.display = 'none';
          }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
          }
        });
      })
      .catch(error => console.error('Failed to load search index:', error));
  }
});`;
  }
}

// CLI Commands
program
  .name('build-facilitator-guide')
  .description('Build system for CreateX Facilitator Guide')
  .version('1.0.0');

program
  .command('build')
  .description('Build static HTML site')
  .option('-l, --language <lang>', 'target language', 'en')
  .option('-o, --output <dir>', 'output directory', 'dist')
  .action(async (options) => {
    const builder = new BuildSystem(options.output);
    await builder.buildStaticSite(options.language);
  });

program
  .command('serve')
  .description('Build and serve locally')
  .option('-p, --port <port>', 'port number', '3000')
  .option('-l, --language <lang>', 'target language', 'en')
  .action(async (options) => {
    const builder = new BuildSystem();
    const buildDir = await builder.buildStaticSite(options.language);
    
    // Simple static file server
    const express = require('express');
    const app = express();
    
    app.use(express.static(buildDir));
    
    app.listen(options.port, () => {
      console.log(chalk.green(`🌐 Server running at http://localhost:${options.port}`));
    });
  });

program
  .command('validate')
  .description('Validate all module content')
  .action(async () => {
    console.log(chalk.blue('🔍 Validating module content...'));
    
    const modules = await contentManager.loadAllModules();
    let hasErrors = false;
    
    for (const module of modules) {
      const requiredSections = ['Learning Objectives', 'Prerequisites', 'Duration', 'Difficulty'];
      const missing = requiredSections.filter(section => 
        !module.content.includes(section)
      );
      
      if (missing.length > 0) {
        console.log(chalk.red(`❌ ${module.title}: Missing sections - ${missing.join(', ')}`));
        hasErrors = true;
      } else {
        console.log(chalk.green(`✅ ${module.title}`));
      }
    }
    
    if (hasErrors) {
      console.log(chalk.red('\\n❌ Validation failed!'));
      process.exit(1);
    } else {
      console.log(chalk.green('\\n✅ All modules are valid!'));
    }
  });

program
  .command('stats')
  .description('Show content statistics')
  .action(async () => {
    console.log(chalk.blue('📊 Content Statistics'));
    
    const modules = await contentManager.loadAllModules();
    const stats = await contentManager.getModuleStats();
    
    console.log(`\\nTotal Modules: ${stats.totalModules}`);
    console.log(`Average Duration: ${stats.averageDuration}`);
    
    console.log('\\nTracks:');
    Object.entries(stats.trackCounts).forEach(([track, count]) => {
      console.log(`  ${track}: ${count} modules`);
    });
    
    console.log('\\nDifficulty Levels:');
    Object.entries(stats.difficultyLevels).forEach(([difficulty, count]) => {
      console.log(`  ${difficulty}: ${count} modules`);
    });
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse();
}

export default BuildSystem;
