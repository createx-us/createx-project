'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Users, Star, CheckCircle, Play, Download, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function CreativityFundamentalsPage() {
    const [currentSection, setCurrentSection] = useState(0);
    const [completedSections, setCompletedSections] = useState(new Set());

    const sections = [
        {
            id: 'opening-story',
            title: '1.0 Opening Story',
            content: `"A blank page is the universe in disguise."

In 1943, engineer Isamu Noguchi was confined in an Arizona internment camp. Deprived of tools, he fashioned sculptures from scavenged wood and clay, turning constraint into catalysis. His story reminds us that creativity is not a luxury of circumstance but a mindset that reframes limits as invitations.

**Reflection:** Think about a time when limitations sparked your creativity. How did constraints actually help rather than hinder your creative process?`,
            type: 'content'
        },
        {
            id: 'defining-creativity',
            title: '1.1 Defining Creativity',
            content: `At its simplest, creativity is the capacity to generate ideas, artifacts, or actions that are simultaneously **novel and appropriate** within a given context.

Each discipline colors the edges of that definition:

### Psychological Lens
Creativity blends divergent thinking (fluency, flexibility, originality, elaboration) with convergent judgment to select promising options. (Guilford, 1950; Runco, 2004)

### Neuroscience Lens  
fMRI studies link creative idea incubation to dynamic switching between the default-mode network (daydreaming) and executive control network (evaluation).

### Anthropological Lens
Creativity is a social contract: Igbo "nkà," Japanese "monozukuri," and Silicon Valley "innovation" valorize different outputs, norms, and success criteria.

**Key Insight:** Creativity = Novelty × Usefulness relative to context.`,
            type: 'content'
        },
        {
            id: 'myths-to-unlearn',
            title: '1.2 Myths We Must Unlearn',
            content: `Let's debunk some persistent creativity myths:

| Myth | Reality | Design Implication |
|------|---------|-------------------|
| "Eureka is instant" | Breakthroughs emerge from iterative incubation and recombination | Build slow hunch time into sprints (e.g., overnight reflection) |
| "Only artists are creative" | Farmers invent irrigation hacks; accountants design clever macros | Use broad case examples to inspire cross-domain insight |
| "Constraints kill creativity" | Thoughtful limits sharpen focus and spur originality | Introduce explicit constraint cards during ideation |

Understanding these myths helps create environments where everyone can access their creative potential.`,
            type: 'content'
        },
        {
            id: 'individual-vs-collective',
            title: '1.3 Individual vs. Collective Creativity',
            content: `Individual insight can feel intoxicating, yet research shows cognitive diversity—differences in knowledge, heuristics, and perspectives—produces more adaptive solutions.

| Dimension | Individual | Collective |
|-----------|------------|------------|
| **Strength** | Fast, cohesive vision | Heterogeneous idea pool |
| **Risk** | Blind spots, confirmation bias | Coordination overhead, group-think |
| **CreateX Lever** | Solo reflection blocks | Deliberate techniques: "Yes-And" improv, brainwriting, asynchronous idea boards |

### Technique Spotlight: Brainwriting 6-3-5
- 6 people · 3 ideas each · 5-minute rounds
- Result: 108 idea seeds in 30 minutes
- Use BoardX's timed canvas and an AI summarizer to cluster outputs on the fly`,
            type: 'interactive'
        },
        {
            id: 'ai-role',
            title: '1.4 The Role of AI in Human Creativity',
            content: `Large-language models, generative imagery, and analytic copilots expand our ideational bandwidth but do not replace human judgment.

### Three Complementarity Modes:

1. **Spark:** LLMs supply provocative starting points when the team is "stuck"
2. **Stretch:** AI simulations expose hidden edge cases and inspire bolder prototypes  
3. **Sharpen:** Real-time critique (readability scores, bias flags) accelerates refinement

**Ethics Watch:** Creators remain accountable for truthfulness, bias mitigation, and contextual appropriateness of AI-assisted content.

**Activity:** Try the "AI Creativity Partner" exercise in the next section.`,
            type: 'content'
        },
        {
            id: 'practice-exercises',
            title: '1.5 Putting It into Practice',
            content: `Complete these three exercises to internalize the concepts:

### Exercise 1: Divergence Drill (5 minutes)
Set a timer for 5 minutes and list as many uses as possible for a coffee mug. Stop at 30 seconds left and ask ChatGPT for five additional, unexpected uses. Observe overlaps and surprises.

### Exercise 2: Constraint Remix (10 minutes)  
Take an existing product idea and force-fit a new constraint (e.g., "must be zero-waste"). Note how the idea shifts.

### Exercise 3: Collective Upgrade (15 minutes)
Share your idea in a group, then run a "1-2-4-All" session to evolve it. Compare solo vs. collective output.

**Reflection Questions:**
- Which exercise challenged your assumptions most?
- How did constraints affect your thinking process?
- What surprised you about collective input?`,
            type: 'interactive'
        },
        {
            id: 'key-takeaways',
            title: '1.6 Key Takeaways',
            content: `**Core Principles to Remember:**

• Creativity = Novelty × Usefulness relative to context
• Myths obscure the incremental, democratized nature of creative work  
• Cognitive diversity and structured collaboration outperform lone-genius models
• AI is a lever for sparking, stretching, and sharpening ideas—never a shortcut around human empathy and ethics

**Facilitator Checklist:**
☐ Debunk myths at kickoff
☐ Balance solo/collective exercises  
☐ Introduce at least one AI-augmented task
☐ Close with reflection on constraint benefits`,
            type: 'summary'
        },
        {
            id: 'field-notes',
            title: '1.7 Field Notes & Further Reading',
            content: `**Recommended Resources:**

### Books
- "Creative Confidence" (Kelley & Kelley)
- "Wired to Create" (Kaufman & Gregoire)

### Papers  
- Baas et al. (2008) "A meta-analysis on the relationship between mood and creativity"

### Videos
- IDEO's "Deep Dive" (1999) shows early design-thinking practice in action

### Podcast Episode
- Hidden Brain — "Where Creativity Comes From" (Nov 2023)

**Discussion Prompts for Your Community:**
- How does your cultural background shape your definition of creativity?
- What constraints have unexpectedly boosted your creative output?
- Share an example of AI helping (or hindering) your creative process`,
            type: 'resources'
        }
    ];

    const toggleSectionComplete = (index: any) => {
        const newCompleted = new Set(completedSections);
        if (newCompleted.has(index)) {
            newCompleted.delete(index);
        } else {
            newCompleted.add(index);
        }
        setCompletedSections(newCompleted);
    };

    const progress = (completedSections.size / sections.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/modules"
                                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to Modules
                            </Link>
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                        Chapter 1
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Foundations</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    What Is Creativity?
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {Math.round(progress)}% Complete
                            </div>
                            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div
                                    className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Module Info */}
                    <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>45 minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>Beginner</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>Individual & Team</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Module Sections
                            </h3>
                            <nav className="space-y-2">
                                {sections.map((section, index) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setCurrentSection(index)}
                                        className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${currentSection === index
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{section.title}</span>
                                        {completedSections.has(index) && (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        )}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                    Resources
                                </h4>
                                <div className="space-y-2">
                                    <button className="w-full text-left flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
                                        <Download className="h-4 w-4" />
                                        <span>Download Templates</span>
                                    </button>
                                    <button className="w-full text-left flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>Discussion Forum</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {sections[currentSection].title}
                                </h2>
                                <button
                                    onClick={() => toggleSectionComplete(currentSection)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${completedSections.has(currentSection)
                                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {completedSections.has(currentSection) ? (
                                        <>
                                            <CheckCircle className="h-4 w-4" />
                                            <span>Completed</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4" />
                                            <span>Mark Complete</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{
                                    __html: sections[currentSection].content.replace(/\n/g, '<br />')
                                }} />
                            </div>

                            {/* Section Type Indicator */}
                            {sections[currentSection].type === 'interactive' && (
                                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                                        <Play className="h-5 w-5" />
                                        <span className="font-medium">Interactive Section</span>
                                    </div>
                                    <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                                        This section includes hands-on exercises and activities.
                                    </p>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                                    disabled={currentSection === 0}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Previous</span>
                                </button>

                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {currentSection + 1} of {sections.length}
                                </span>

                                {currentSection < sections.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentSection(currentSection + 1)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <span>Next</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <Link
                                        href="/modules/design-thinking-history"
                                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <span>Next Module</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
