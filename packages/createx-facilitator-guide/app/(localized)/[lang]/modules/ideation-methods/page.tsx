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

function IdeationMethodsComponent({
  params,
  moduleProgress
}: EnhancedModuleProps & { params: { lang: string } }) {
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
      "id": "section-10-0",
      "title": "10.0 Why Ideation?",
      "type": "content",
      "content": "Ideation is the creative heart of design thinking, where carefully defined challenges transform into a wide portfolio of potential solutions. Quantity precedes quality: the more ideas generated—and remixed—the higher the odds of discovering breakthrough concepts. CreateX blends classic creativity games with AI co‑ideation to super‑charge output while preserving human originality."
    },
    {
      "id": "section-10-1",
      "title": "10.1 Brainwriting 6‑3‑5",
      "type": "content",
      "content": "**Purpose:** Rapidly harvest ideas from all participants, minimizing group‑think.\n\n**When to Use:** Kick‑off of Ideation; warm‑up for quieter teams.\n\n**Step‑by‑Step:** 6 people · 3 ideas each · 5 min round → pass sheet → repeat × 3 rounds (54 ideas).\n\n**Remote Tips:** BoardX grid auto‑rotates idea cards to next participant.\n\n**AI Prompt Ideas:** \"Expand each idea into a one‑sentence concept description.\"\n\n**Pitfalls:** Illegible handwriting; insist on clear, short phrasing.\n\n**Template:** createx.us/toolkit/brainwriting‑sheet"
    },
    {
      "id": "section-10-2",
      "title": "10.2 Crazy 8s Sketch Storm",
      "type": "content",
      "content": "**Purpose:** Push thinkers past obvious solutions via time‑pressured sketching.\n\n**When to Use:** After Brainwriting, to add visual diversity.\n\n**Step‑by‑Step:** Fold A4 paper to 8 frames → 1 idea per 1 min → 8 ideas in 8 min.\n\n**Remote Tips:** Use BoardX \"8‑up canvas\"; timer overlays each frame.\n\n**AI Prompt Ideas:** \"Generate a 3‑word title for each sketch to aid voting.\"\n\n**Pitfalls:** Over‑polishing; remind \"ugly is fine.\"\n\n**Template:** createx.us/toolkit/crazy‑8s‑canvas"
    },
    {
      "id": "section-10-3",
      "title": "10.3 SCAMPER Remix",
      "type": "content",
      "content": "| Letter | Prompt | Quick Example (Remote Teaching App) |\n|--------|--------|-------------------------------------|\n| **S** Substitute | Swap ingredient or tech | Replace video with low‑bandwidth audio slides |\n| **C** Combine | Merge features | Add real‑time captioning + note syncing |\n| **A** Adapt | Borrow from another field | Use \"story streak\" from Duolingo for lessons |\n| **M** Modify | Intensify / shrink | 5‑min micro‑lessons |\n| **P** Put to Another Use | Re‑purpose | Turn whiteboard into homework tracker |\n| **E** Eliminate | Remove element | No login—magic link per session |\n| **R** Reverse | Flip order | Test before teach (\"pre‑assessment first\") |\n\n**Purpose:** Systematically expand concept space via attribute manipulation.\n\n**When to Use:** Mid‑Ideation when idea pool plateaus.\n\n**Remote Tips:** SCAMPER dropdown menu auto‑cycles prompts every 2 min.\n\n**AI Prompt Ideas:** \"Apply SCAMPER to this concept: remote onboarding kit.\"\n\n**Pitfalls:** Forcing fit; skip any letter that feels irrelevant.\n\n**Template:** createx.us/toolkit/scamper‑cards"
    },
    {
      "id": "section-10-4",
      "title": "10.4 AI Co‑Ideation Blitz (15 min)",
      "type": "content",
      "content": "| Step | Action | Tool |\n|------|--------|------|\n| 1 | Feed top 3 HMWs into ChatGPT/Gemini | LLM |\n| 2 | Ask for 20 wild concepts each (total 60) | — |\n| 3 | Team scans outputs, tags \"intriguing,\" \"meh,\" \"duplicate\" | BoardX tag panel |\n| 4 | Merge intriguing with human ideas | Affinity wall |\n| 5 | Dot‑vote top 10 hybrid concepts | Voting plugin |\n\n**Ethics Reminder:** AI suggestions are raw fodder, not final truth—evaluate feasibility, ethics, and user desirability."
    },
    {
      "id": "section-10-5",
      "title": "10.5 Dot‑Voting & Heat‑Mapping",
      "type": "content",
      "content": "**Purpose:** Narrow a large idea pool democratically.\n\n**When to Use:** After ≥ 40 ideas are surfaced.\n\n**Step‑by‑Step:** Each person gets 3‑5 dots; silent place; cluster high‑density winners.\n\n**Remote Tips:** BoardX heat‑map overlay visualizes vote density.\n\n**AI Prompt Ideas:** \"Summarize top‑voted ideas into a sortable table with key attributes.\"\n\n**Pitfalls:** HiPPO bias—run silent vote before discussion.\n\n**Template:** createx.us/toolkit/dot‑vote‑overlay"
    },
    {
      "id": "section-10-6",
      "title": "10.6 Concept Poster (1‑Pager)",
      "type": "content",
      "content": "| Element | Guideline |\n|---------|-----------|\n| **Name** | Punchy < 4 words |\n| **Problem** | 1‑sentence user POV |\n| **Solution Sketch** | Simple drawing or storyboard |\n| **Value Proposition** | 2‑3 bullet benefits |\n| **Key Assumptions** | List biggest unknowns |\n\nUse posters to crystallize top concepts before prototyping."
    },
    {
      "id": "section-10-7",
      "title": "10.7 Hybrid Ideation Agenda (90 min)",
      "type": "content",
      "content": "| Minute | Activity |\n|--------|----------|\n| 0‑10 | Warm‑up improv game (\"Word‑Ball\") |\n| 10‑25 | Brainwriting 6‑3‑5 |\n| 25‑35 | Crazy 8s |\n| 35‑50 | AI Co‑Ideation Blitz |\n| 50‑60 | Silent dot‑vote |\n| 60‑90 | Teams create Concept Posters for top 3 ideas |"
    },
    {
      "id": "section-10-8",
      "title": "10.8 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Fix |\n|---------|-----|\n| **Idea Saturation** (no fresh angles) | Introduce SCAMPER or random stimulus cards |\n| **Dominator Syndrome** | Silent, written methods (brainwriting) first |\n| **AI Flood** (too many low‑quality ideas) | Pre‑set relevancy filter: ignore ideas lacking user fit |\n\n## Key Takeaways\n\n- Varied methods tap different cognitive pathways—verbal, visual, associative\n- AI acts as an idea multiplier, not replacement; curate ruthlessly\n- Transition from divergence → convergence with objective dot‑votes and concept posters\n- Preserve all ideas in a backlog; today's \"crazy\" may inspire tomorrow's pivot\n\n## Reflection Questions\n\n1. Which ideation method works best for your team's communication style?\n2. How can you balance AI assistance with human creativity in your ideation sessions?\n3. What strategies will you use to manage idea overload while preserving quality insights?\n\n## Further Resources\n\n- **Book:** Michalko \"Thinkertoys\" (ideation classics)\n- **Paper:** Finke, Ward & Smith \"Creative Cognition\" (geneplore model)\n- **Toolkit:** createx.us/toolkit/ideation‑mega‑pack (36 prompt cards + AI macros)\n- **Podcast:** Creative Confidence — Ep. 90 \"AI & Human Brainstorms: Best Practices\"\n\n### Facilitator Checklist\n\n☐ Warm‑up game ready  \n☐ Brainwriting sheets pre‑loaded  \n☐ AI prompt templates set  \n☐ Dot‑vote overlay tested  \n☐ Concept poster frames published"
    }
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          "id": "section-10-0",
          "title": "10.0 为什么需要创意方法？",
          "type": "content",
          "content": "创意是设计思维的创造性核心，精心定义的挑战在这里转化为广泛的潜在解决方案组合。数量先于质量：产生和重新混合的想法越多，发现突破性概念的几率就越高。CreateX将经典创造力游戏与AI共同创意相结合，在保持人类原创性的同时增强输出。"
        },
        {
          "id": "section-10-1",
          "title": "10.1 脑文法 6-3-5",
          "type": "content",
          "content": "**目的：** 快速收集所有参与者的想法，最小化群体思维。\n\n**使用时机：** 创意阶段启动；为较安静的团队热身。\n\n**分步指南：** 6人 · 每人3个想法 · 5分钟轮次 → 传递纸张 → 重复×3轮（54个想法）。\n\n**远程技巧：** BoardX网格自动将想法卡片轮转给下一位参与者。\n\n**AI提示想法：** \"将每个想法扩展为一句话的概念描述。\"\n\n**陷阱：** 字迹难以辨认；坚持要求清晰、简短的措辞。\n\n**模板：** createx.us/toolkit/brainwriting-sheet"
        },
        {
          "id": "section-10-2",
          "title": "10.2 疯狂8速写风暴",
          "type": "content",
          "content": "**目的：** 通过时间压力速写推动思考者超越明显解决方案。\n\n**使用时机：** 脑文法之后，增加视觉多样性。\n\n**分步指南：** 将A4纸折成8个框 → 每1分钟1个想法 → 8分钟8个想法。\n\n**远程技巧：** 使用BoardX \"8宫格画布\"；计时器覆盖每个框架。\n\n**AI提示想法：** \"为每个草图生成3个词的标题以帮助投票。\"\n\n**陷阱：** 过度完善；提醒\"丑陋也没关系。\"\n\n**模板：** createx.us/toolkit/crazy-8s-canvas"
        },
        {
          "id": "section-10-3",
          "title": "10.3 SCAMPER重新组合",
          "type": "content",
          "content": "| 字母 | 提示 | 快速示例（远程教学应用） |\n|--------|--------|-------------------------------------|\n| **S** 替代 | 交换成分或技术 | 用低带宽音频幻灯片替代视频 |\n| **C** 组合 | 合并功能 | 添加实时字幕+笔记同步 |\n| **A** 适应 | 从其他领域借鉴 | 为课程使用Duolingo的\"连续学习\"模式 |\n| **M** 修改 | 强化/缩小 | 5分钟微课程 |\n| **P** 另作他用 | 重新定位 | 将白板变成作业追踪器 |\n| **E** 消除 | 移除元素 | 无需登录—每次会话魔法链接 |\n| **R** 颠倒 | 翻转顺序 | 先测试后教学（\"预评估优先\"） |\n\n**目的：** 通过属性操作系统性扩展概念空间。\n\n**使用时机：** 创意中期当想法池趋于平缓时。\n\n**远程技巧：** SCAMPER下拉菜单每2分钟自动循环提示。\n\n**AI提示想法：** \"将SCAMPER应用于这个概念：远程入职套件。\"\n\n**陷阱：** 强制适应；跳过任何感觉不相关的字母。\n\n**模板：** createx.us/toolkit/scamper-cards"
        },
        {
          "id": "section-10-4",
          "title": "10.4 AI协同创意闪击（15分钟）",
          "type": "content",
          "content": "| 步骤 | 行动 | 工具 |\n|------|--------|------|\n| 1 | 将前3个HMW输入ChatGPT/Gemini | LLM |\n| 2 | 要求每个20个疯狂概念（总计60个） | — |\n| 3 | 团队扫描输出，标记\"有趣\"、\"一般\"、\"重复\" | BoardX标签面板 |\n| 4 | 将有趣的与人类想法合并 | 亲和力墙 |\n| 5 | 点投票前10个混合概念 | 投票插件 |\n\n**伦理提醒：** AI建议是原始素材，不是最终真理——评估可行性、伦理和用户期望性。"
        },
        {
          "id": "section-10-5",
          "title": "10.5 点投票与热力图",
          "type": "content",
          "content": "**目的：** 民主地缩小大量想法池。\n\n**使用时机：** 表面化≥40个想法后。\n\n**分步指南：** 每人获得3-5个点；静默放置；聚集高密度获胜者。\n\n**远程技巧：** BoardX热力图覆盖可视化投票密度。\n\n**AI提示想法：** \"将最高票想法总结为具有关键属性的可排序表格。\"\n\n**陷阱：** HiPPO偏见—在讨论前进行静默投票。\n\n**模板：** createx.us/toolkit/dot-vote-overlay"
        },
        {
          "id": "section-10-6",
          "title": "10.6 概念海报（单页）",
          "type": "content",
          "content": "| 要素 | 指导原则 |\n|---------|-----------|\n| **名称** | 有力度<4个词 |\n| **问题** | 一句话用户POV |\n| **解决方案草图** | 简单绘图或故事板 |\n| **价值主张** | 2-3个要点好处 |\n| **关键假设** | 列出最大未知数 |\n\n使用海报在原型制作前明确顶级概念。"
        },
        {
          "id": "section-10-7",
          "title": "10.7 混合创意议程（90分钟）",
          "type": "content",
          "content": "| 分钟 | 活动 |\n|--------|----------|\n| 0-10 | 热身即兴游戏（\"单词球\"） |\n| 10-25 | 脑文法6-3-5 |\n| 25-35 | 疯狂8 |\n| 35-50 | AI协同创意闪击 |\n| 50-60 | 静默点投票 |\n| 60-90 | 团队为前3个想法创建概念海报 |"
        },
        {
          "id": "section-10-8",
          "title": "10.8 常见陷阱与解决方案",
          "type": "content",
          "content": "| 陷阱 | 解决方案 |\n|---------|-----|\n| **想法饱和**（无新鲜角度） | 引入SCAMPER或随机刺激卡片 |\n| **主导者综合症** | 首先使用静默、书面方法（脑文法） |\n| **AI洪水**（太多低质量想法） | 预设相关性过滤器：忽略缺乏用户适应性的想法 |\n\n## 关键要点\n\n- 多样化方法激发不同认知路径——语言、视觉、联想\n- AI充当想法倍增器，而非替代品；要无情地策划\n- 从发散→收敛，使用客观点投票和概念海报过渡\n- 在积压中保留所有想法；今天的\"疯狂\"可能启发明天的转向\n\n## 反思问题\n\n1. 哪种创意方法最适合你团队的沟通风格？\n2. 如何在创意会议中平衡AI协助与人类创造力？\n3. 你将使用什么策略来管理想法过载同时保持质量洞察？\n\n## 延伸资源\n\n- **书籍：** Michalko \"思维玩具\"（创意经典）\n- **论文：** Finke, Ward & Smith \"创造性认知\"（生成探索模型）\n- **工具包：** createx.us/toolkit/ideation-mega-pack（36张提示卡+AI宏）\n- **播客：** 创造信心 — 第90集 \"AI与人类头脑风暴：最佳实践\"\n\n### 引导师检查清单\n\n☐ 热身游戏准备就绪  \n☐ 脑文法表格预加载  \n☐ AI提示模板设置  \n☐ 点投票覆盖测试  \n☐ 概念海报框架发布"
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

  // Toggle section completion
  // Section toggle logic handled by withModuleProgress HOC

  // UI text based on language
  const uiText = params.lang === 'zh' ? {
    backToModules: '返回模块',
    chapter: '章节',
    moduleTitle: '创意方法',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Ideation Methods',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProgressIndicator progress={Math.round((moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100)} className="mb-4" />
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
                      {uiText.chapter} 10
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
                <span>55 minutes</span>
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
                  <button
                    onClick={() => moduleProgress.toggleSectionComplete(currentSection)}
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
                      href={`/${params.lang}/modules/prototyping-methods`}
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
    </div>);
}

const IdeationMethodsPage = withModuleProgress(
  IdeationMethodsComponent,
  'ideation-methods',
  9
);

export default IdeationMethodsPage;
