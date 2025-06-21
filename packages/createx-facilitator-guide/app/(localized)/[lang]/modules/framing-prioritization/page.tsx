'use client';

import React, { useState, useEffect } from 'react';
import { getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Award, CheckCircle, Play } from 'lucide-react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { withModuleProgress, type EnhancedModuleProps, ProgressIndicator, SectionStatus } from '@/components/withModuleProgress';

interface Section {
  id: string;
  title: string;
  content: string;
  type: 'content' | 'interactive';
}

function FramingPrioritizationPageBase({
  params,
  moduleProgress
}: EnhancedModuleProps) {
  const [processedContent, setProcessedContent] = useState('');
  const [dictionary, setDictionary] = useState<any>(null);

  // Get current section from moduleProgress
  const currentSection = moduleProgress.moduleProgress.currentSection;

  // Load dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(params.lang as any);
      setDictionary(dict);
    };
    loadDictionary();
  }, [params.lang]);

  // Function to process markdown content to HTML
  const processMarkdown = async (content: string) => {
    try {
      const result = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);
      return result.toString();
    } catch (error) {
      console.error('Error processing markdown:', error);
      return content.replace(/\n/g, '<br/>');
    }
  };

  // English sections data
  const englishSections: Section[] = [
    {
      "id": "section-9-0",
      "title": "9.0 Why Framing Matters",
      "type": "content",
      "content": "### The Foundation for Great Solutions\n\n**Clear Framing:**\n- **Prevents Solution Drift**: Keeps teams focused on the real problem\n- **Aligns Stakeholders**: Creates shared understanding of the challenge  \n- **Guides Resource Allocation**: Ensures effort goes to highest-impact areas\n- **Enables Measurement**: Provides clear success criteria\n\n**Poor Framing Consequences:**\n- Building solutions for symptoms, not root causes\n- Team confusion and competing priorities\n- Wasted resources on low-impact initiatives\n- Difficulty measuring success\n\n### The Prioritization Imperative\n\n**Why Prioritize:**\n- Limited time and resources\n- Multiple competing opportunities\n- Need for stakeholder buy-in\n- Risk management requirements"
    },
    {
      "id": "section-9-1",
      "title": "9.1 Point‑of‑View (POV) Statement",
      "type": "content",
      "content": "### Formula & Example\n\n**Formula**: [User] needs a way to [verb need] because [surprising insight]\n\n**Example**: \"Adjunct professors need a way to keep lesson files synced because campus Wi-Fi cuts out every 15 minutes.\"\n\n### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Translate empathy into a crisp problem frame. |\n| **When to Use** | After insight statements; before HMW brainstorming. |\n| **Step-by-Step** | 1) Draft solo, 2) Pair-share, 3) Refine wording, 4) Quick vote for resonance. |\n| **AI Prompt Ideas** | \"Rewrite this insight into a POV statement, keep < 25 words, highlight causality.\" |\n| **Pitfalls** | Cramming solutions (\"…need a Dropbox-like app\"). |\n| **Template** | createx.us/toolkit/pov-canvas |\n\n### POV Quality Checklist\n\n**Strong POVs:**\n- [ ] Specific user segment identified\n- [ ] Action-oriented need (verb-based)\n- [ ] Surprising or counterintuitive insight\n- [ ] Grounded in research evidence\n- [ ] Under 25 words for clarity\n\n**Weak POVs:**\n- Generic users (\"people need...\")\n- Solution-embedded language\n- Obvious or unsupported insights\n- Too long or complex"
    },
    {
      "id": "section-9-2",
      "title": "9.2 Problem Statement Canvas (5Qs)",
      "type": "interactive",
      "content": "### Interactive Exercise: 5-Question Problem Canvas\n\n**Instructions**: Work through each question to build a comprehensive problem statement.\n\n**Question 1: WHO is affected?**\n- Primary users\n- Secondary stakeholders\n- Indirect beneficiaries\n\n**Question 2: WHAT is the core problem?**\n- Specific pain point\n- Current state vs. desired state\n- Symptoms vs. root cause\n\n**Question 3: WHEN does this problem occur?**\n- Frequency and timing\n- Triggering events\n- Seasonal patterns\n\n**Question 4: WHERE does this problem manifest?**\n- Physical locations\n- Digital touchpoints\n- Process stages\n\n**Question 5: WHY is this problem important?**\n- Business impact\n- User impact\n- Strategic importance\n\n### Practice Template\n\nUse this format to structure your problem statement:\n\n**[WHO]** experiences **[WHAT]** **[WHEN]** **[WHERE]** because **[WHY]**."
    },
    {
      "id": "section-9-3",
      "title": "9.3 How Might We (HMW) Questions",
      "type": "content",
      "content": "### The Art of HMW Questions\n\n**Structure**: \"How might we [action verb] [desired outcome] for [user] in/during [context]?\"\n\n**Examples:**\n- Good: \"How might we reduce prep time for busy teachers during lesson planning?\"\n- Better: \"How might we eliminate file-syncing friction for adjunct professors using public WiFi?\"\n\n### HMW Quality Ladder\n\n| **Level** | **Characteristics** | **Example** |\n|-----------|-------------------|-------------|\n| **Poor** | Too broad, solution-embedded | \"How might we build an app?\" |\n| **Good** | Specific user, clear action | \"How might we help students study?\" |\n| **Great** | Context-rich, insight-driven | \"How might we reduce anxiety for first-gen college students during finals week?\" |\n\n### Brainstorming HMWs\n\n**Process:**\n1. **Start with POV**: Use your POV statement as the foundation\n2. **Generate Quantity**: Aim for 20+ HMW variations\n3. **Ladder Up/Down**: Make questions broader or more specific\n4. **Vote & Prioritize**: Select top 3 for ideation\n\n**AI Assistance**: \"Generate 10 HMW questions from this POV statement, vary the specificity levels.\""
    },
    {
      "id": "section-9-4",
      "title": "9.4 ICE Prioritization Framework",
      "type": "content",
      "content": "### ICE Scoring Method\n\n**Impact**: How much will this solution affect users? (1-10)\n**Confidence**: How sure are we this will work? (1-10)\n**Ease**: How simple is this to implement? (1-10)\n\n**Formula**: ICE Score = (Impact + Confidence + Ease) / 3\n\n### ICE Evaluation Matrix\n\n| **Criteria** | **1-3 (Low)** | **4-6 (Medium)** | **7-10 (High)** |\n|--------------|---------------|------------------|------------------|\n| **Impact** | Minor improvement | Noticeable change | Transformative |\n| **Confidence** | Many assumptions | Some validation | Strong evidence |\n| **Ease** | Major effort | Moderate resources | Quick implementation |\n\n### ICE in Practice\n\n**Step 1**: List all potential solutions\n**Step 2**: Score each solution on I, C, E\n**Step 3**: Calculate average ICE score\n**Step 4**: Rank solutions by ICE score\n**Step 5**: Consider strategic factors\n\n**Pro Tip**: Use ICE for initial filtering, then apply strategic judgment for final decisions."
    },
    {
      "id": "section-9-5",
      "title": "9.5 Impact/Effort Matrix",
      "type": "interactive",
      "content": "### 2x2 Prioritization Grid\n\n**Setup**: Plot solutions on two axes:\n- **X-Axis**: Effort Required (Low → High)\n- **Y-Axis**: Impact Expected (Low → High)\n\n### Four Quadrants\n\n**🎯 Quick Wins** (High Impact, Low Effort)\n- Immediate implementation\n- Build momentum\n- Demonstrate value\n\n**🚀 Major Projects** (High Impact, High Effort)\n- Strategic initiatives\n- Long-term planning\n- Resource allocation\n\n**🍎 Fill-ins** (Low Impact, Low Effort)\n- Nice-to-haves\n- Spare capacity work\n- Learning opportunities\n\n**🗑️ Thankless Tasks** (Low Impact, High Effort)\n- Avoid or eliminate\n- Question necessity\n- Consider alternatives\n\n### Interactive Exercise\n\n1. Write each solution on a sticky note\n2. Place on the matrix grid\n3. Discuss placement with team\n4. Identify your \"Quick Wins\" for immediate action\n5. Plan resource allocation for \"Major Projects\""
    },
    {
      "id": "section-9-6",
      "title": "9.6 RICE Scoring Model",
      "type": "content",
      "content": "### RICE Components\n\n**Reach**: How many users will be affected? (number)\n**Impact**: How much will this affect each user? (0.25, 0.5, 1, 2, 3)\n**Confidence**: How confident are we? (percentage)\n**Effort**: How much time will this take? (person-months)\n\n**Formula**: RICE Score = (Reach × Impact × Confidence) / Effort\n\n### Impact Scale Details\n\n| **Score** | **Meaning** | **Example** |\n|-----------|-------------|-------------|\n| **3** | Massive impact | Revenue increase, major pain relief |\n| **2** | High impact | Significant user satisfaction boost |\n| **1** | Medium impact | Moderate improvement |\n| **0.5** | Low impact | Small enhancement |\n| **0.25** | Minimal impact | Nice-to-have feature |\n\n### RICE Example\n\n**Feature**: Auto-save for forms\n- **Reach**: 1,000 users/month\n- **Impact**: 1 (medium - prevents frustration)\n- **Confidence**: 80%\n- **Effort**: 2 person-months\n\n**RICE Score**: (1,000 × 1 × 0.8) / 2 = 400\n\n### When to Use RICE\n\n**Best for**:\n- Product feature prioritization\n- Data-driven decisions\n- Cross-functional alignment\n\n**Limitations**:\n- Requires good data\n- Can be overly quantitative\n- May miss strategic considerations"
    },
    {
      "id": "section-9-7",
      "title": "9.7 Value vs Complexity Quadrants",
      "type": "content",
      "content": "### Strategic Prioritization Framework\n\n**Axes**:\n- **X-Axis**: Implementation Complexity (Low → High)\n- **Y-Axis**: Business Value (Low → High)\n\n### Quadrant Strategy\n\n**💎 Pearls** (High Value, Low Complexity)\n- **Action**: Do first\n- **Timeline**: Immediate\n- **Resources**: Minimal investment\n\n**⭐ Gems** (High Value, High Complexity)\n- **Action**: Strategic investment\n- **Timeline**: Planned phases\n- **Resources**: Dedicated team\n\n**🥜 Bread & Butter** (Low Value, Low Complexity)\n- **Action**: Do when capacity allows\n- **Timeline**: Flexible\n- **Resources**: Spare cycles\n\n**💸 Money Pits** (Low Value, High Complexity)\n- **Action**: Avoid or redesign\n- **Timeline**: Deprioritize\n- **Resources**: Minimal to none\n\n### Complexity Assessment Factors\n\n**Technical Complexity**:\n- New technology requirements\n- Integration challenges\n- Performance constraints\n\n**Organizational Complexity**:\n- Cross-team dependencies\n- Stakeholder alignment\n- Change management needs\n\n**Market Complexity**:\n- Regulatory requirements\n- Competitive landscape\n- User adoption barriers"
    },
    {
      "id": "section-9-8",
      "title": "9.8 Stakeholder Buy‑in Strategies",
      "type": "content",
      "content": "### Building Consensus\n\n**Pre-Meeting Preparation**:\n- Share framework overview\n- Collect input on criteria\n- Prepare examples and data\n\n**During the Session**:\n- Start with shared understanding\n- Use visual prioritization tools\n- Encourage healthy debate\n- Document decisions and rationale\n\n### Common Stakeholder Concerns\n\n**\"This will take too long\"**\n- Response: Show quick wins alongside long-term projects\n- Tool: Impact/Effort matrix highlighting quick wins\n\n**\"We need to do everything\"**\n- Response: Demonstrate resource constraints visually\n- Tool: Capacity planning exercise\n\n**\"The data isn't perfect\"**\n- Response: Acknowledge uncertainty, use confidence intervals\n- Tool: RICE with explicit confidence percentages\n\n### Facilitation Tips\n\n**For Disagreements**:\n- Ask for specific reasoning\n- Use data to ground discussions\n- Look for compromise solutions\n- Park contentious items for later\n\n**For Decision Paralysis**:\n- Set clear decision deadlines\n- Use timeboxed voting\n- Implement pilot programs\n- Plan regular review cycles"
    },
    {
      "id": "section-9-9",
      "title": "9.9 Common Pitfalls & Solutions",
      "type": "content",
      "content": "### Pitfall Prevention Guide\n\n| **Pitfall** | **Symptoms** | **Solutions** |\n|-------------|--------------|---------------|\n| **Analysis Paralysis** | Endless debate, no decisions | Set time limits, use voting methods |\n| **HiPPO Effect** | Highest paid person's opinion dominates | Use anonymous voting, data-driven criteria |\n| **Scope Creep** | Solutions grow beyond original intent | Regular scope reviews, strict definition |\n| **False Urgency** | Everything marked as \"urgent\" | Implement urgency criteria, challenge assumptions |\n\n### Quality Assurance Checklist\n\n**Before Finalizing Priorities**:\n- [ ] Does this align with business strategy?\n- [ ] Have we considered user impact?\n- [ ] Are resource estimates realistic?\n- [ ] Is there stakeholder consensus?\n- [ ] Have we planned for risks?\n\n**Review Questions**:\n- What would we sacrifice to do this?\n- How will we measure success?\n- What could cause this to fail?\n- Who needs to be involved?\n\n### Recovery Strategies\n\n**When Priorities Change**:\n- Communicate rationale clearly\n- Update stakeholders promptly\n- Reassess resource allocation\n- Document lessons learned\n\n**When Deadlines Slip**:\n- Revisit scope and complexity\n- Consider alternative approaches\n- Communicate early and often\n- Adjust expectations realistically"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-9-0",
      "title": "9.0 为什么框架很重要",
      "type": "content",
      "content": "### 优秀解决方案的基础\n\n**清晰的框架:**\n- **防止解决方案漂移**: 让团队专注于真正的问题\n- **协调利益相关者**: 对挑战建立共同理解\n- **指导资源分配**: 确保努力投入到最高影响的领域\n- **启用测量**: 提供明确的成功标准\n\n**糟糕框架的后果:**\n- 为症状而非根本原因构建解决方案\n- 团队困惑和竞争优先级\n- 在低影响计划上浪费资源\n- 难以衡量成功\n\n### 优先级的必要性\n\n**为什么要优先排序:**\n- 有限的时间和资源\n- 多个竞争机会\n- 需要利益相关者支持\n- 风险管理要求"
    }
    // Add more Chinese sections as needed
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return chineseSections;
    }
    return englishSections;
  };

  const sections = getSections();

  // Process content when section changes
  useEffect(() => {
    if (sections[currentSection]) {
      processMarkdown(sections[currentSection].content)
        .then(setProcessedContent);
    }
  }, [currentSection, sections]);

  // Calculate progress
  const progress = (moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100;

  // Loading state
  if (!dictionary) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading module...</p>
        </div>
      </div>
    );
  }

  // UI text based on language
  const uiText = params.lang === 'zh' ? {
    backToModules: '返回模块',
    chapter: '章节',
    moduleTitle: '框架与优先级',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    markAsComplete: '标记为完成',
    markAsIncomplete: '标记为未完成',
    previous: '上一个',
    next: '下一个',
    progress: '进度',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Framing & Prioritization',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    markAsComplete: 'Mark as Complete',
    markAsIncomplete: 'Mark as Incomplete',
    previous: 'Previous',
    next: 'Next',
    progress: 'Progress',
    interactiveSectionDescription: 'This is an interactive exercise section, please participate actively.',
    markComplete: 'Mark Complete'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/${params.lang}/modules`}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {uiText.backToModules}
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {uiText.chapter} 9
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Design Process</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {uiText.moduleTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(progress)}% {uiText.completed}
              </div>
              <div className="w-32">
                <ProgressIndicator progress={progress} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>75 minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>{uiText.intermediate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {uiText.moduleSections}
              </h3>
              <nav className="space-y-2">
                {sections.map((section: Section, index: number) => (
                  <button
                    key={section.id}
                    onClick={() => moduleProgress.setCurrentSection(index)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${currentSection === index
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    <span className="text-sm font-medium">{section.title}</span>
                    {moduleProgress.moduleProgress.sectionsCompleted.has(index) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sections[currentSection].title}
                </h2>
                <SectionStatus
                  sectionIndex={currentSection}
                  isCompleted={moduleProgress.moduleProgress.sectionsCompleted.has(currentSection)}
                  onToggle={moduleProgress.toggleSectionComplete}
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{
                  __html: processedContent || sections[currentSection].content.replace(/\n/g, '<br />')
                }} />
              </div>

              {/* Section Type Indicator */}
              {sections[currentSection].type === 'interactive' && (
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                    <Play className="h-5 w-5" />
                    <span className="font-medium">{uiText.interactiveSection}</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    {uiText.interactiveSectionDescription}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => moduleProgress.setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{uiText.previous}</span>
                </button>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentSection + 1} of {sections.length}
                </span>

                {currentSection < sections.length - 1 ? (
                  <button
                    onClick={() => moduleProgress.setCurrentSection(currentSection + 1)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>{uiText.next}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={`/${params.lang}/modules/ideation-methods`}
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

// Export with HOC applied
const FramingPrioritizationPage = withModuleProgress(
  FramingPrioritizationPageBase,
  'framing-prioritization',
  10 // Total number of sections
);

export default FramingPrioritizationPage;