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

function ReflectionLearningComponent({
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
        "id": "section-14-0",
        "title": "14.0 Opening Story",
        "type": "content",
        "content": "\"Our biggest insight came after the applause.\"\n\nAt a Nairobi CreateX showcase, Team AgroLink wowed judges with an AI produce-pricing prototype. But during the debrief circle, a quiet farmer noted, \"Prices shift hourly; weekly SMS isn't enough.\" The team pivoted to real-time USSD alerts and later doubled pilot adoption. The moment illustrates a core CreateX belief: learning peaks after the 'finish line'—if we make space for it."
    },
    {
        "id": "section-14-1",
        "title": "14.1 Why Reflection?",
        "type": "interactive",
        "content": "**Core Principles:**\n- **Double-Loop Learning (Argyris):** Revisit governing assumptions, not just actions\n- **Knowledge Transfer (NASA post-mortems):** Reduces repeat errors across teams  \n- **Creative Confidence Flywheel (Kelley):** Reflection consolidates mastery experiences, fueling confidence"
    },
    {
        "id": "section-14-2",
        "title": "14.2 After-Action Review (AAR)",
        "type": "content",
        "content": "| Section | Details |\n|---------|---------|\n| **Purpose** | Structured discussion that compares intended vs. actual outcomes and extracts lessons |\n| **When to Use** | End of each sprint, workshop, or pilot |\n| **Four Core Questions** | 1) What was supposed to happen? 2) What actually happened? 3) Why were there differences? 4) What will we sustain or change? |\n| **Step-by-Step** | Silent self-note (3 min) → Round-robin sharing → Cluster insights → Commit actions |\n| **Remote Tips** | BoardX AAR template auto-populates questions; 5-min timer per section |\n| **AI Prompt Ideas** | \"Summarize AAR sticky notes into themes ranked by frequency.\" |\n| **Pitfalls** | Blame game; enforce blameless language: \"What in the process led to...?\" |\n| **Template** | createx.us/toolkit/aar-canvas |"
    },
    {
        "id": "section-14-3",
        "title": "14.3 Learning Journals",
        "type": "content",
        "content": "| Prompt Type | Example |\n|-------------|---------|\n| **Moment of Surprise** | \"I assumed farmers had smartphones—many only have feature phones.\" |\n| **Quick Win** | \"Storyboarding cut UI debate from 45 to 15 min.\" |\n| **Emerging Question** | \"How might we automate USSD prompts cheaply?\" |\n\n**Method Details:**\n- **Purpose:** Individual reflection to capture tacit insights\n- **Cadence:** 5 minutes at day's end; weekly synthesis\n- **AI Assist:** GPT sentiment & topic tagger → auto-merge team journal themes\n- **Pitfalls:** Turns into status log; anchor prompts to learning, not tasks\n- **Template:** createx.us/toolkit/learning-journal"
    },
    {
        "id": "section-14-4",
        "title": "14.4 Sprint Retrospective (Agile \"Keep / Drop / Try / Amplify\")",
        "type": "content",
        "content": "| Quadrant | Use |\n|----------|-----|\n| **Keep** | Practices that worked well |\n| **Drop** | Wasteful habits |\n| **Try** | New experiments next sprint |\n| **Amplify** | Things to double-down on |\n\n**Remote Tip:** BoardX retro board auto-colors cards by quadrant and tallies votes."
    },
    {
        "id": "section-14-5",
        "title": "14.5 AI Insight Summarizer Workflow",
        "type": "content",
        "content": "1. **Export** all sticky notes, chat logs, transcripts\n2. **GPT-4o** → topic model (+ semantic clusters)\n3. **Rank** themes by frequency & novelty\n4. **Generate** slide deck draft (title, key insight, verbatim quote, action)\n\n**Ethics Note:** Strip PII; double-check quotes for context integrity."
    },
    {
        "id": "section-14-6",
        "title": "14.6 Metrics & Outcome Review",
        "type": "content",
        "content": "| Metric | Board Block | Source | Review Cadence |\n|--------|-------------|--------|----------------|\n| **AoCC Added** | BoardX log | End of each workshop |\n| **Prototype-to-Pilot Rate** | Implementation tracker | Monthly |\n| **User KPI Delta** | Pilot dashboard | Sprint demo |\n| **Creative Confidence Delta (CCD)** | CCS-10 survey | Pre/post workshop |\n\n**Display boards in a public channel—transparency builds trust.**"
    },
    {
        "id": "section-14-7",
        "title": "14.7 Community Knowledge Sharing",
        "type": "content",
        "content": "| Channel | Content | Cadence |\n|---------|---------|---------|\n| **#fac-lab Discord** | 3-slide AAR snapshots | Within 48 h |\n| **CreateX Wiki** | Method tweaks & new templates | Weekly |\n| **Annual Summit** | Lightning \"fail tales\" talks | Yearly |\n\n**AI Prompt:** \"Convert this workshop AAR into a 300-word blog post for the CreateX community site.\""
    },
    {
        "id": "section-14-8",
        "title": "14.8 Archiving & Retrieval Standards",
        "type": "content",
        "content": "1. **File Naming** — YYYY-MM-DD_Project_Method_Version.ext\n2. **Metadata Tags** — method, sector, language, AI tools used\n3. **Repository** — All artefacts pushed to Git-backed CreateX Library (CC-BY-SA)\n4. **Access Levels** — Public by default; redact client secrets"
    },
    {
        "id": "section-14-9",
        "title": "14.9 Common Pitfalls & Fixes",
        "type": "content",
        "content": "| Pitfall | Symptom | Remedy |\n|---------|---------|---------|\n| **Token Retro** | Team skims AAR in 10 min | Schedule 30 min min; facilitator models vulnerability |\n| **Blame Storm** | Defensive language | Use \"I\" statements, process focus rules |\n| **Insight Black-Hole** | Notes never resurface | Assign Insight Librarian to publish digest within 24 h |\n| **AI Summary Over-reach** | Nuance lost in abstraction | Human reviewer edits before circulation |\n\n## Key Takeaways\n\n- **Reflection converts activity into learning** → into future leverage\n- **Blend collective** (AAR, retros) **and individual** (journals) practices\n- **AI cuts synthesis time** but human sense-checking preserves meaning\n- **Publish insights fast**; shared knowledge compounds across the CreateX network"
    },
    {
        "id": "section-14-11",
        "title": "14.11 Field Notes & Further Reading",
        "type": "content",
        "content": "- **Book:** \"The Fifth Discipline\" (Senge) — learning organizations\n- **Paper:** Argyris (1991) \"Teaching Smart People How to Learn\"\n- **Toolkit:** createx.us/toolkit/reflection-pack (AAR canvas, journal prompts, retro board)\n- **Podcast:** Retrospective Radar — Ep. 42 \"Beyond Post-mortems: Continuous Learning\"\n\n## Facilitator Checklist\n\n☐ AAR scheduled & template ready  \n☐ Learning journal prompts sent  \n☐ Retro board set up  \n☐ AI summarizer credentials ok  \n☐ Insight digest published within 24 h\n\n## Reflection Questions\n\n1. How will you integrate both individual and collective reflection practices in your facilitation?\n2. What systems will you create to ensure insights are captured and shared rather than lost?\n3. How can you use AI tools to enhance reflection while preserving the human nuance in insights?\n\n## Further Resources\n\n- **Templates:** AAR Canvas, Learning Journal prompts, Sprint Retrospective board\n- **AI Tools:** GPT-4o topic modeling, sentiment analysis, insight summarization\n- **Community:** #fac-lab Discord, CreateX Wiki, Annual Summit presentations"
    }
];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          "id": "section-14-0",
          "title": "14.0 开场故事",
          "type": "content",
          "content": "\"我们最大的洞察来自掌声之后。\"\n\n在内罗毕的CreateX展示会上，AgroLink团队凭借AI农产品定价原型让评委惊叹不已。但在汇报圈中，一位安静的农民指出：\"价格每小时都在变化；每周的短信远远不够。\"团队转向实时USSD提醒，后来试点采用率翻了一倍。这个时刻说明了CreateX的核心信念：学习在'终点线'之后达到顶峰——如果我们为它创造空间的话。"
        },
        {
          "id": "section-14-1",
          "title": "14.1 为什么要反思？",
          "type": "interactive",
          "content": "**核心原则：**\n- **双环学习（阿吉里斯）：** 重新审视主导假设，不仅仅是行动\n- **知识转移（NASA事后分析）：** 减少团队间的重复错误\n- **创意自信飞轮（凯利）：** 反思巩固精通体验，增强自信"
        },
        {
          "id": "section-14-2",
          "title": "14.2 行动后回顾（AAR）",
          "type": "content",
          "content": "| 部分 | 详情 |\n|---------|----------|\n| **目的** | 比较预期与实际结果并提取经验教训的结构化讨论 |\n| **使用时机** | 每个冲刺、工作坊或试点结束时 |\n| **四个核心问题** | 1）应该发生什么？2）实际发生了什么？3）为什么会有差异？4）我们将保持或改变什么？|\n| **步骤详解** | 安静自省（3分钟）→ 轮流分享 → 聚类洞察 → 承诺行动 |\n| **远程提示** | BoardX AAR模板自动填充问题；每部分5分钟计时器 |\n| **AI提示想法** | \"将AAR便签总结为按频率排序的主题。\" |\n| **陷阱** | 相互指责游戏；强制使用无指责语言：\"流程中的什么导致了...？\" |\n| **模板** | createx.us/toolkit/aar-canvas |"
        },
        {
          "id": "section-14-3",
          "title": "14.3 学习日志",
          "type": "content",
          "content": "| 提示类型 | 示例 |\n|-------------|----------|\n| **惊讶时刻** | \"我以为农民都有智能手机——许多人只有功能手机。\" |\n| **快速获胜** | \"故事板将UI辩论从45分钟减少到15分钟。\" |\n| **新兴问题** | \"我们如何低成本地自动化USSD提示？\" |\n\n**方法详情：**\n- **目的：** 个人反思以捕获隐性洞察\n- **节奏：** 每日结束时5分钟；每周综合\n- **AI辅助：** GPT情感和主题标记器 → 自动合并团队日志主题\n- **陷阱：** 变成状态日志；将提示锚定到学习而非任务\n- **模板：** createx.us/toolkit/learning-journal"
        },
        {
          "id": "section-14-4",
          "title": "14.4 冲刺回顾（敏捷\"保持/放弃/尝试/放大\"）",
          "type": "content",
          "content": "| 象限 | 用途 |\n|----------|-----|\n| **保持** | 运作良好的实践 |\n| **放弃** | 浪费的习惯 |\n| **尝试** | 下次冲刺的新实验 |\n| **放大** | 需要加倍投入的事情 |\n\n**远程提示：** BoardX回顾板按象限自动着色卡片并统计投票。"
        },
        {
          "id": "section-14-5",
          "title": "14.5 AI洞察总结工作流程",
          "type": "content",
          "content": "1. **导出** 所有便签、聊天记录、转录内容\n2. **GPT-4o** → 主题模型（+ 语义聚类）\n3. **排序** 按频率和新颖性排列主题\n4. **生成** 幻灯片草稿（标题、关键洞察、逐字引用、行动）\n\n**伦理说明：** 去除个人身份信息；仔细检查引用的上下文完整性。"
        },
        {
          "id": "section-14-6",
          "title": "14.6 指标与结果审查",
          "type": "content",
          "content": "| 指标 | 板块 | 来源 | 审查节奏 |\n|--------|-------------|--------|----------------|\n| **添加的AoCC** | BoardX日志 | 每个工作坊结束时 |\n| **原型转试点率** | 实施跟踪器 | 每月 |\n| **用户KPI增量** | 试点仪表板 | 冲刺演示 |\n| **创意自信增量（CCD）** | CCS-10调查 | 工作坊前后 |\n\n**在公共频道显示板——透明度建立信任。**"
        },
        {
          "id": "section-14-7",
          "title": "14.7 社区知识分享",
          "type": "content",
          "content": "| 渠道 | 内容 | 节奏 |\n|---------|---------|---------|\n| **#fac-lab Discord** | 3幻灯片AAR快照 | 48小时内 |\n| **CreateX Wiki** | 方法调整和新模板 | 每周 |\n| **年度峰会** | 闪电\"失败故事\"演讲 | 每年 |\n\n**AI提示：** \"将这个工作坊AAR转换为CreateX社区网站的300字博客文章。\""
        },
        {
          "id": "section-14-8",
          "title": "14.8 存档与检索标准",
          "type": "content",
          "content": "1. **文件命名** — YYYY-MM-DD_项目_方法_版本.ext\n2. **元数据标签** — 方法、行业、语言、使用的AI工具\n3. **存储库** — 所有工件推送到Git支持的CreateX库（CC-BY-SA）\n4. **访问级别** — 默认公开；编辑客户机密"
        },
        {
          "id": "section-14-9",
          "title": "14.9 常见陷阱与修复",
          "type": "content",
          "content": "| 陷阱 | 症状 | 补救措施 |\n|---------|---------|---------|\n| **象征性回顾** | 团队10分钟匆匆浏览AAR | 安排至少30分钟；引导师示范脆弱性 |\n| **指责风暴** | 防御性语言 | 使用\"我\"陈述，关注流程规则 |\n| **洞察黑洞** | 笔记永远不再浮现 | 指派洞察管理员在24小时内发布摘要 |\n| **AI总结过度** | 抽象中失去细节 | 人工审阅者在传播前编辑 |\n\n## 关键要点\n\n- **反思将活动转化为学习** → 转化为未来杠杆\n- **融合集体**（AAR、回顾）**和个人**（日志）实践\n- **AI缩短综合时间** 但人工意义检查保留意义\n- **快速发布洞察**；共享知识在CreateX网络中复合增长"
        },
        {
          "id": "section-14-11",
          "title": "14.11 实地笔记与延伸阅读",
          "type": "content",
          "content": "- **书籍：** \"第五项修炼\"（圣吉）— 学习型组织\n- **论文：** 阿吉里斯（1991）\"教聪明人如何学习\"\n- **工具包：** createx.us/toolkit/reflection-pack（AAR画布，日志提示，回顾板）\n- **播客：** 回顾雷达 — 第42集\"超越事后分析：持续学习\"\n\n## 引导师检查清单\n\n☐ AAR安排完毕，模板准备就绪\n☐ 学习日志提示已发送\n☐ 回顾板设置完成\n☐ AI总结器凭证正常\n☐ 24小时内发布洞察摘要\n\n## 反思问题\n\n1. 您将如何在引导中整合个人和集体反思实践？\n2. 您将创建什么系统来确保洞察被捕获和分享而不是丢失？\n3. 您如何使用AI工具增强反思，同时保留洞察中的人性细节？\n\n## 进一步资源\n\n- **模板：** AAR画布，学习日志提示，冲刺回顾板\n- **AI工具：** GPT-4o主题建模，情感分析，洞察总结\n- **社区：** #fac-lab Discord，CreateX Wiki，年度峰会演示"
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
    moduleTitle: '反思与学习',
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
    moduleTitle: 'Reflection & Learning',
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
                    {uiText.chapter} 14
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Workshop Design</span>
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
              <span>35 minutes</span>
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
                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${
                      currentSection === index
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    moduleProgress.moduleProgress.sectionsCompleted.has(currentSection)
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
                    href={`/${params.lang}/modules/scoping-logistics`}
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
  </div>    );
}

const ReflectionLearningPage = withModuleProgress(
  ReflectionLearningComponent,
  'reflection-learning',
  8
);

export default ReflectionLearningPage;
