'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Award, CheckCircle, Play } from 'lucide-react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { withModuleProgress, type EnhancedModuleProps, ProgressIndicator, SectionStatus } from '@/components/withModuleProgress';
import '@/lib/debugProgress'; // Enable debug tools

interface Section {
  id: string;
  title: string;
  content: string;
  type: 'content' | 'interactive';
}

function CreativityFundamentalsComponent({
  params,
  moduleProgress
}: EnhancedModuleProps & { params: { lang: string } }) {
  console.log('🏗️ CreativityFundamentals component rendered with:', {
    moduleId: 'creativity-fundamentals',
    moduleProgressState: moduleProgress.moduleProgress,
    completedSections: Array.from(moduleProgress.moduleProgress.sectionsCompleted || new Set()),
    progressPercentage: moduleProgress.moduleProgress.progress
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [processedContent, setProcessedContent] = useState('');

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
      id: 'opening-story',
      title: '1.0 Opening Story',
      content: `# Opening Story

"A blank page is the universe in disguise."

In 1943, engineer Isamu Noguchi was confined in an Arizona internment camp. Deprived of tools, he fashioned sculptures from scavenged wood and clay, turning constraint into catalysis. His story reminds us that creativity is not a luxury of circumstance but a mindset that reframes limits as invitations.

**Reflection:** Think about a time when limitations sparked your creativity. How did constraints actually help rather than hinder your creative process?`,
      type: 'content'
    },
    {
      id: 'defining-creativity',
      title: '1.1 Defining Creativity',
      content: `# Defining Creativity

At its simplest, creativity is the capacity to generate ideas, artifacts, or actions that are simultaneously **novel and appropriate** within a given context.

Each discipline colors the edges of that definition:

## Psychological Lens
Creativity blends divergent thinking (fluency, flexibility, originality, elaboration) with convergent judgment to select promising options. (Guilford, 1950; Runco, 2004)

## Neuroscience Lens  
fMRI studies link creative idea incubation to dynamic switching between the default-mode network (daydreaming) and executive control network (evaluation).

## Anthropological Lens
Creativity is a social contract: Igbo "nkà," Japanese "monozukuri," and Silicon Valley "innovation" valorize different outputs, norms, and success criteria.

**Key Insight:** Creativity = Novelty × Usefulness relative to context.`,
      type: 'content'
    },
    {
      id: 'myths-to-unlearn',
      title: '1.2 Myths We Must Unlearn',
      content: `# Myths We Must Unlearn

Let's debunk some persistent creativity myths:

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
      content: `# Individual vs. Collective Creativity

Individual insight can feel intoxicating, yet research shows cognitive diversity—differences in knowledge, heuristics, and perspectives—produces more adaptive solutions.

| Dimension | Individual | Collective |
|-----------|------------|------------|
| **Strength** | Fast, cohesive vision | Heterogeneous idea pool |
| **Risk** | Blind spots, confirmation bias | Coordination overhead, group-think |
| **CreateX Lever** | Solo reflection blocks | Deliberate techniques: "Yes-And" improv, brainwriting, asynchronous idea boards |

## Technique Spotlight: Brainwriting 6-3-5
- 6 people · 3 ideas each · 5-minute rounds
- Result: 108 idea seeds in 30 minutes
- Use BoardX's timed canvas and an AI summarizer to cluster outputs on the fly`,
      type: 'content'
    },
    {
      id: 'ai-role',
      title: '1.4 The Role of AI in Human Creativity',
      content: `# The Role of AI in Human Creativity

Large-language models, generative imagery, and analytic copilots expand our ideational bandwidth but do not replace human judgment.

## Three Complementarity Modes:

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
      content: `# Putting It into Practice

Complete these three exercises to internalize the concepts:

## Exercise 1: Divergence Drill (5 minutes)
Set a timer for 5 minutes and list as many uses as possible for a coffee mug. Stop at 30 seconds left and ask ChatGPT for five additional, unexpected uses. Observe overlaps and surprises.

## Exercise 2: Constraint Remix (10 minutes)  
Take an existing product idea and force-fit a new constraint (e.g., "must be zero-waste"). Note how the idea shifts.

## Exercise 3: Collective Upgrade (15 minutes)
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
      content: `# Key Takeaways

**Core Principles to Remember:**

• Creativity = Novelty × Usefulness relative to context
• Myths obscure the incremental, democratized nature of creative work  
• Cognitive diversity and structured collaboration outperform lone-genius models
• AI is a lever for sparking, stretching, and sharpening ideas—never a shortcut around human empathy and ethics

**Facilitator Checklist:**
☐ Debunk myths at kickoff
☐ Balance solo/collective exercises  
☐ Introduce at least one AI-augmented task
☐ Close with reflection on constraint benefits`,
      type: 'content'
    }
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          id: 'opening-story',
          title: '1.0 开场故事',
          content: `# 开场故事

"空白的页面是伪装的宇宙。"

1943年，工程师野口勇被关押在亚利桑那州的拘留营中。在工具匮乏的情况下，他用拾来的木头和泥土制作雕塑，将约束转化为催化剂。他的故事提醒我们，创造力不是环境的奢侈品，而是一种将限制重新框架为邀请的心态。

**反思：** 想想有什么时候限制激发了你的创造力。约束是如何帮助而不是阻碍你的创造过程的？`,
          type: 'content'
        },
        {
          id: 'defining-creativity',
          title: '1.1 定义创造力',
          content: `# 定义创造力

简单来说，创造力是在给定背景下产生同时**新颖且适当**的想法、工艺品或行动的能力。

每个学科都为这一定义增添了不同的色彩：

## 心理学视角
创造力结合了发散思维（流畅性、灵活性、原创性、精细化）和聚合判断来选择有前景的选择。（Guilford, 1950; Runco, 2004）

## 神经科学视角
fMRI研究将创造性想法的孵化与默认模式网络（白日梦）和执行控制网络（评估）之间的动态切换联系起来。

## 人类学视角
创造力是一种社会契约：伊博族的"nkà"、日本的"物造り"和硅谷的"创新"赋予不同的产出、规范和成功标准以价值。

**关键洞察：** 创造力 = 新颖性 × 相对于背景的有用性。`,
          type: 'content'
        },
        {
          id: 'myths-to-unlearn',
          title: '1.2 需要摒弃的神话',
          content: `# 需要摒弃的神话

让我们揭穿一些持续存在的创造力神话：

| 神话 | 现实 | 设计含义 |
|------|---------|----------|
| "灵感是瞬间的" | 突破来自迭代孵化和重组 | 在冲刺中建立慢启发时间（如过夜反思） |
| "只有艺术家才有创造力" | 农民发明灌溉技巧；会计师设计巧妙宏 | 使用广泛案例例子激发跨领域洞察 |
| "约束扼杀创造力" | 深思熟虑的限制锐化焦点并激发原创性 | 在创意阶段引入明确的约束卡片 |

理解这些神话有助于创造每个人都能获得创造潜力的环境。`,
          type: 'content'
        },
        {
          id: 'individual-vs-collective',
          title: '1.3 个人创造力 vs 集体创造力',
          content: `# 个人创造力 vs 集体创造力

个人洞察可能令人陶醉，但研究表明认知多样性——知识、启发式和观点的差异——产生更具适应性的解决方案。

| 维度 | 个人 | 集体 |
|-----------|------------|------------|
| **优势** | 快速、连贯的愿景 | 异质化想法池 |
| **风险** | 盲点、确认偏误 | 协调开销、群体思维 |
| **CreateX杠杆** | 独自反思模块 | deliberate 技术："是的，而且..." 即兴、脑文、异步想法板 |

## 技术聚焦：脑文 6-3-5
- 6人 · 每人3个想法 · 5分钟轮次
- 结果：30分钟内108个想法种子
- 使用BoardX的定时画布和AI摘要器即时聚类输出`,
          type: 'content'
        },
        {
          id: 'ai-role',
          title: '1.4 AI在人类创造力中的作用',
          content: `# AI在人类创造力中的作用

大型语言模型、生成式图像和分析副驾驶扩展了我们的思维带宽，但不能替代人类判断。

## 三种互补模式：

1. **启发：** LLM在团队"卡住"时提供挑逗性起点
2. **拉伸：** AI模拟暴露隐藏边缘案例并激发更大胆的原型  
3. **锐化：** 实时批评（可读性评分、偏见标记）加速完善

**伦理观察：** 创作者对AI辅助内容的真实性、偏见缓解和背景适当性保持负责。

**活动：** 在下一节尝试"AI创造力伙伴"练习。`,
          type: 'content'
        },
        {
          id: 'practice-exercises',
          title: '1.5 付诸实践',
          content: `# 付诸实践

完成这三个练习来内化概念：

## 练习1：发散训练（5分钟）
设置5分钟计时器，列出咖啡杯的尽可能多的用途。在剩余30秒时停止，向ChatGPT询问五个额外的、意想不到的用途。观察重叠和惊喜。

## 练习2：约束重混（10分钟）  
拿一个现有的产品想法并强制适应新约束（如"必须零废物"）。注意想法如何转变。

## 练习3：集体升级（15分钟）
在群体中分享你的想法，然后运行"1-2-4-全体"会议来发展它。比较独自 vs 集体输出。

**反思问题：**
- 哪个练习最挑战你的假设？
- 约束如何影响你的思维过程？
- 集体输入有什么让你惊讶的？`,
          type: 'interactive'
        },
        {
          id: 'key-takeaways',
          title: '1.6 关键要点',
          content: `# 关键要点

**要记住的核心原则：**

• 创造力 = 新颖性 × 相对于背景的有用性
• 神话掩盖了创造性工作的增量、民主化本质  
• 认知多样性和结构化协作胜过孤独天才模式
• AI是启发、拉伸和锐化想法的杠杆——永远不是绕过人类同理心和伦理的捷径

**引导师检查清单：**
☐ 在启动时揭穿神话
☐ 平衡独自/集体练习  
☐ 引入至少一个AI增强任务
☐ 以对约束好处的反思结束`,
          type: 'content'
        }
      ];
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
  }, [currentSection]);

  // Calculate progress
  const progress = (moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100;

  // Section toggle logic handled by withModuleProgress HOC

  // UI text based on language
  const uiText = params.lang === 'zh' ? {
    backToModules: '返回模块',
    chapter: '章节',
    moduleTitle: '创造力基础',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '初级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Creativity Fundamentals',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Beginner',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProgressIndicator progress={progress} className="mb-4" />
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
                    {uiText.chapter} 1
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Foundations</span>
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
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>45 minutes</span>
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
                    onClick={() => setCurrentSection(index)}
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
                <button onClick={() => {
                  console.log('🔴 Mark Complete button clicked!', {
                    currentSection,
                    moduleId: 'creativity-fundamentals',
                    isCompleted: moduleProgress.moduleProgress.sectionsCompleted.has(currentSection)
                  });
                  moduleProgress.toggleSectionComplete(currentSection);
                }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${moduleProgress.moduleProgress.sectionsCompleted.has(currentSection)
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {moduleProgress.moduleProgress.sectionsCompleted.has(currentSection) ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>{uiText.completed}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>{uiText.markComplete}</span>
                    </>
                  )}
                </button>
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
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
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
                    onClick={() => setCurrentSection(currentSection + 1)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>{uiText.next}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={`/${params.lang}/modules/design-thinking-history`}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>{uiText.next} Module</span>
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

const CreativityFundamentalsPage = withModuleProgress(
  CreativityFundamentalsComponent,
  'creativity-fundamentals',
  7 // Total sections for this module
);

export default CreativityFundamentalsPage;