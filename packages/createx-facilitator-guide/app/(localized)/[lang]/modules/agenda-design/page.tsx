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

function AgendaDesignComponent({
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
      "id": "section-16-0",
      "title": "16.0 Opening Story",
      "type": "content",
      "content": "\"The clock is a creative tool.\"\n\nAt a Bogotá educators' workshop, facilitator Diego Marín noticed energy sagging after lunch. He swapped the next lecture with a five-minute \"AI graffiti\" challenge—participants shouted prompts while Midjourney painted hilarious mash-ups in real time. Laughter spiked, and the group rocketed into prototyping. Diego's agile agenda tweak saved the day and cemented a CreateX principle: design the clock as carefully as the canvas."
    },
    {
      "id": "section-16-1",
      "title": "16.1 Agenda Design Goals",
      "type": "content",
      "content": "1. **Energy Arc** — Alternate high-cognitive and reflective moments to avoid fatigue\n2. **Progressive Fidelity** — Each block outputs an artifact feeding the next\n3. **Inclusive Timing** — Respect global time zones, prayer breaks, caregiving windows\n4. **AI \"Assist Blocks\"** — Strategic moments where automation accelerates flow"
    },
    {
      "id": "section-16-2",
      "title": "16.2 Half-Day Agenda Template (4 h)",
      "type": "interactive",
      "content": "| Time | Block | Purpose | Output | AI Assist |\n|------|-------|---------|--------|-----------|\n| **00:00** | Welcome & Warm-up (10 min) | Psychological safety | Shared norms | Ice-breaker prompt bot |\n| **00:10** | Research Recap (20 min) | Build common context | Insight slide | GPT auto-summary |\n| **00:30** | Affinity Flash (35 min) | Sense-making | 3 key themes | LLM clustering |\n| **01:05** | HMW Sprint (25 min) | Frame challenge | Top 3 HMWs | HMW generator |\n| **01:30** | Break / Stretch (10 min) | Energy reset | — | Pomodoro timer |\n| **01:40** | Brainwriting 6-3-5 (30 min) | Divergent ideas | 54 idea seeds | Idea title generation |\n| **02:10** | Crazy 8s (15 min) | Visual ideation | 8 sketches pp | — |\n| **02:25** | Dot-Vote & Debrief (20 min) | Converge | Top 5 concepts | Heat-map overlay |\n| **02:45** | Concept Poster (30 min) | Solidify ideas | Posters | AI micro-copy |\n| **03:15** | Wrap & Next Steps (15 min) | Close loop | Action list | GPT recap email |"
    },
    {
      "id": "section-16-3",
      "title": "16.3 Flagship 1-Day Agenda (In-Person or Hybrid)",
      "type": "content",
      "content": "| Phase | Block | Duration | Energy | Note |\n|-------|-------|----------|--------|------|\n| **AM** | Welcome & Team Canvas | 30 min | High-energy ice-break |\n| | Field Interviews OR Playback Videos | 60 min | Empathy immersion |\n| | Affinity + Insight | 60 min | Peak cognitive load |\n| | HMW Generation | 30 min | Divergent burst |\n| **Lunch** | Lightning Talk (guest) | 45 min | Passive intake |\n| **Early PM** | Brainwriting + Crazy 8s | 60 min | Fast action |\n| | AI Co-Ideation Blitz | 30 min | Novelty spark |\n| | Dot-Vote & Concept Posters | 30 min | Convergence |\n| **Late PM** | Paper Prototype Build | 60 min | Hands-on flow |\n| | Think-Aloud Tests × 3 | 45 min | User focus |\n| | Reflection & AoCC Log | 20 min | Downshift |\n| **Evening** | Optional Social Hour | — | Bonding |"
    },
    {
      "id": "section-16-4",
      "title": "16.4 Two-Day Deep-Dive Agenda (Distributed Teams)",
      "type": "content",
      "content": "| Day | Focus | Core Outputs |\n|-----|-------|--------------|\n| **Day 1** (4 × 90 min sprints) | Discover → Define | Research capture, Insight themes, POVs, HMW list |\n| **Day 2** (4 × 90 min sprints) | Develop → Deliver | Idea portfolio, Prototype, Test results, Pilot canvas |\n\n**Built-in 12-hour overnight \"slow-hunch\" gap between diamonds.**"
    },
    {
      "id": "section-16-5",
      "title": "16.5 Energy & Break Planning",
      "type": "content",
      "content": "| Clock Zone | Typical Dip | Counter-Move |\n|------------|-------------|--------------|\n| **11:00** | Pre-lunch hunger | Stand-up improv (\"Yes-And Chain\") |\n| **14:00** | Post-meal slump | 5-min cardio burst + upbeat playlist |\n| **16:30** | Cognitive fatigue | Silent reflection / journaling |\n\n**Hydration Stations:** ≥ 1 per 10 participants; plain + electrolytes."
    },
    {
      "id": "section-16-6",
      "title": "16.6 AI \"Assist Block\" Catalog",
      "type": "content",
      "content": "| Stage | Duration | Tool | Objective |\n|-------|----------|------|-----------|\n| **Research Digest** | 5 min | GPT Digest | Auto-summary of transcripts |\n| **Ideation Booster** | 10 min | ChatGPT / Gemini | 20 wildcard concepts |\n| **Copy Polish** | 5 min | GrammarlyGO | Tighten poster text |\n| **Retro Synth** | 5 min | GPT Insight | Draft recap email |"
    },
    {
      "id": "section-16-7",
      "title": "16.7 Agenda Modifiers",
      "type": "content",
      "content": "| Constraint | Adjustment |\n|------------|------------|\n| **Remote-Only Global** | Split 1-day agenda into two 3-hour blocks across time zones; asynchronous affinity via BoardX |\n| **Executive Audience** | Front-load business framing; shorten creative warm-ups; add ROI checkpoint after Concept Posters |\n| **K-12 Classroom** | 45-min class periods; use gamified timers; more physical prototyping |"
    },
    {
      "id": "section-16-8",
      "title": "16.8 Run-Sheet & Roles",
      "type": "content",
      "content": "| Minute Mark | Action | Owner |\n|-------------|--------|-------|\n| **-30** | Set up room / Zoom | Tech Producer |\n| **-10** | Slide deck check | Facilitator |\n| **00** | Start recording | Remote Champion |\n| **30** | Time-box reminder ping | Time-Keeper |\n| **...** | ... | ... |\n\n**Template:** createx.us/toolkit/run-sheet"
    },
    {
      "id": "section-16-9",
      "title": "16.9 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Warning Sign | Fix |\n|---------|--------------|-----|\n| **Agenda Overstuffed** | Constant overruns | Remove 15%; protect breaks |\n| **Flat Energy** | Monotone voices | Inject improv or music |\n| **AI Demo Fail** | Tool latency | Offline backup prompt examples |\n| **Time-Zone Exclusion** | Remote team silent | Rotate agenda start times; record sessions |\n\n## Key Takeaways\n\n- **Agenda is storytelling with minutes**—shape an energy arc\n- **Balance divergent and convergent blocks**, with breaks as neural reset points\n- **Purposeful AI assist blocks** can shave 20–40% off mechanical tasks\n- **Always prepare Plan B** slides and offline activities—flex is mastery"
    },
    {
      "id": "section-16-11",
      "title": "16.11 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"Sprint\" (Knapp) — time-boxing inspiration\n- **Paper:** IDEO (2023) \"Facilitator Energy Patterns\"\n- **Toolkit:** createx.us/toolkit/agenda-builder (interactive generator)\n- **Podcast:** Timeboxers FM — Ep. 14 \"Designing the Perfect 90-Minute Block\"\n\n## Facilitator Checklist\n\n☐ Agenda posted 72 h prior  \n☐ Energy dips planned  \n☐ AI assist scripts queued  \n☐ Run-sheet roles assigned  \n☐ Backup offline exercises ready\n\n## Reflection Questions\n\n1. How will you design energy arcs that account for your participants' natural rhythms and cultural contexts?\n2. What specific AI assist blocks would be most valuable for your typical workshop challenges?\n3. How can you build flexibility into your agenda while maintaining productive momentum?\n\n## Further Resources\n\n- **Templates:** Half-Day, Full-Day, and Two-Day agenda templates, Run-sheet template\n- **AI Tools:** GPT Digest, Ideation Boosters, Copy Polish tools, Insight synthesis\n- **Energy Management:** Break planning guides, engagement techniques, time-boxing tools"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-16-0",
      "title": "16.0 开场故事",
      "type": "content",
      "content": "\"时钟是一个创意工具。\"\n\n在波哥大的一场教育工作者研讨会上，引导师迭戈·马林注意到午餐后大家的精神状态低迷。他将下一个讲座调换为五分钟的\\\"AI涂鸦\\\"挑战——参与者喊提示词，Midjourney实时绘制出搞笑的混搭画作。笑声瞬间响起，团队立刻投入到原型制作中。迭戈灵活的议程调整拯救了那一天，也巩固了CreateX的一个原则：像设计画布一样精心设计时间安排。"
    },
    {
      "id": "section-16-1",
      "title": "16.1 议程设计目标",
      "type": "content",
      "content": "1. **能量弧线** — 在高认知负荷和反思时刻之间交替，避免疲劳\n2. **渐进保真度** — 每个环节产出的成果为下一环节提供素材\n3. **包容性时机** — 考虑全球时区、祈祷休息、看护时间窗口\n4. **AI \"辅助环节\"** — 在战略性时刻让自动化加速流程"
    },
    {
      "id": "section-16-2",
      "title": "16.2 半天议程模板（4小时）",
      "type": "interactive",
      "content": "| 时间 | 环节 | 目的 | 产出 | AI辅助 |\n|------|-------|---------|--------|-----------|\n| **00:00** | 欢迎与热身（10分钟） | 心理安全 | 共享规范 | 破冰机器人 |\n| **00:10** | 研究回顾（20分钟） | 建立共同背景 | 洞察幻灯片 | GPT自动摘要 |\n| **00:30** | 亲和图快闪（35分钟） | 意义构建 | 3个关键主题 | LLM聚类 |\n| **01:05** | HMW冲刺（25分钟） | 框定挑战 | 前3个HMW | HMW生成器 |\n| **01:30** | 休息/伸展（10分钟） | 能量重置 | — | 番茄钟计时器 |\n| **01:40** | 脑写6-3-5（30分钟） | 发散想法 | 54个想法种子 | 想法标题生成 |\n| **02:10** | 疯狂8（15分钟） | 视觉构思 | 每人8个草图 | — |\n| **02:25** | 点投票与汇报（20分钟） | 聚合 | 前5个概念 | 热力图叠加 |\n| **02:45** | 概念海报（30分钟） | 固化想法 | 海报 | AI微文案 |\n| **03:15** | 总结与下一步（15分钟） | 闭环 | 行动清单 | GPT总结邮件 |"
    },
    {
      "id": "section-16-3",
      "title": "16.3 旗舰一日议程（线下或混合）",
      "type": "content",
      "content": "| 阶段 | 环节 | 时长 | 能量状态 | 备注 |\n|-------|-------|----------|--------|------|\n| **上午** | 欢迎与团队画布 | 30分钟 | 高能量破冰 |\n| | 实地访谈或回放视频 | 60分钟 | 同理心沉浸 |\n| | 亲和图+洞察 | 60分钟 | 峰值认知负荷 |\n| | HMW生成 | 30分钟 | 发散爆发 |\n| **午餐** | 闪电演讲（嘉宾） | 45分钟 | 被动接收 |\n| **下午早期** | 脑写+疯狂8 | 60分钟 | 快速行动 |\n| | AI协作构思闪击 | 30分钟 | 新颖性火花 |\n| | 点投票与概念海报 | 30分钟 | 聚合 |\n| **下午晚期** | 纸质原型制作 | 60分钟 | 动手流程 |\n| | 出声思考测试×3 | 45分钟 | 用户焦点 |\n| | 反思与AoCC记录 | 20分钟 | 降速 |\n| **晚上** | 可选社交时间 | — | 联络感情 |"
    },
    {
      "id": "section-16-4",
      "title": "16.4 两日深度议程（分布式团队）",
      "type": "content",
      "content": "| 天数 | 焦点 | 核心产出 |\n|-----|-------|--------------|\n| **第1天**（4×90分钟冲刺） | 发现→定义 | 研究记录、洞察主题、POV、HMW清单 |\n| **第2天**（4×90分钟冲刺） | 开发→交付 | 想法组合、原型、测试结果、试点画布 |\n\n**两个钻石之间内置12小时过夜\\\"慢直觉\\\"间隔。**"
    },
    {
      "id": "section-16-5",
      "title": "16.5 能量与休息规划",
      "type": "content",
      "content": "| 时钟区域 | 典型低潮 | 对策 |\n|------------|-------------|--------------|\n| **11:00** | 午餐前饥饿 | 站立即兴（\\\"是的，并且\\\"链） |\n| **14:00** | 餐后疲劳 | 5分钟有氧爆发+欢快播放列表 |\n| **16:30** | 认知疲劳 | 安静反思/日记 |\n\n**补水站：** 每10名参与者至少1个；白水+电解质。"
    },
    {
      "id": "section-16-6",
      "title": "16.6 AI\\\"辅助环节\\\"目录",
      "type": "content",
      "content": "| 阶段 | 时长 | 工具 | 目标 |\n|-------|----------|------|-----------|\n| **研究摘要** | 5分钟 | GPT摘要 | 转录自动总结 |\n| **构思助推** | 10分钟 | ChatGPT/Gemini | 20个外卡概念 |\n| **文案润色** | 5分钟 | GrammarlyGO | 收紧海报文本 |\n| **回顾综合** | 5分钟 | GPT洞察 | 起草总结邮件 |"
    },
    {
      "id": "section-16-7",
      "title": "16.7 议程修改器",
      "type": "content",
      "content": "| 约束 | 调整 |\n|------------|------------|\n| **仅远程全球** | 将1日议程分为跨时区的两个3小时段；通过BoardX异步亲和图 |\n| **高管听众** | 前置商业框架；缩短创意热身；概念海报后增加ROI检查点 |\n| **K-12课堂** | 45分钟课时；使用游戏化计时器；更多物理原型制作 |"
    },
    {
      "id": "section-16-8",
      "title": "16.8 执行表与角色",
      "type": "content",
      "content": "| 分钟标记 | 行动 | 负责人 |\n|-------------|--------|-------|\n| **-30** | 设置房间/Zoom | 技术制作人 |\n| **-10** | 幻灯片检查 | 引导师 |\n| **00** | 开始录制 | 远程协调员 |\n| **30** | 时间盒提醒 | 计时员 |\n| **...** | ... | ... |\n\n**模板：** createx.us/toolkit/run-sheet"
    },
    {
      "id": "section-16-9",
      "title": "16.9 常见陷阱与修复",
      "type": "content",
      "content": "| 陷阱 | 警告信号 | 修复 |\n|---------|--------------|-----|\n| **议程过载** | 持续超时 | 删除15%；保护休息时间 |\n| **能量平淡** | 单调语调 | 注入即兴或音乐 |\n| **AI演示失败** | 工具延迟 | 离线备用提示示例 |\n| **时区排斥** | 远程团队沉默 | 轮换议程开始时间；录制会话 |\n\n## 关键要点\n\n- **议程是用分钟讲故事**——塑造能量弧线\n- **平衡发散和聚合环节**，以休息作为神经重置点\n- **有目的的AI辅助环节**可以减少20-40%的机械任务\n- **始终准备B计划**幻灯片和离线活动——灵活性就是精通"
    },
    {
      "id": "section-16-11",
      "title": "16.11 实地笔记与延伸阅读",
      "type": "content",
      "content": "- **书籍：**《Sprint》（Knapp）——时间盒激发灵感\n- **论文：** IDEO（2023）\\\"引导师能量模式\\\"\n- **工具包：** createx.us/toolkit/agenda-builder（交互式生成器）\n- **播客：** Timeboxers FM——第14集\\\"设计完美的90分钟环节\\\"\n\n## 引导师检查清单\n\n☐ 议程提前72小时发布  \n☐ 能量低潮已规划  \n☐ AI辅助脚本已就绪  \n☐ 执行表角色已分配  \n☐ 备用离线练习已准备\n\n## 反思问题\n\n1. 你将如何设计能量弧线，以考虑参与者的自然节律和文化背景？\n2. 对于你典型的工作坊挑战，哪些特定的AI辅助环节最有价值？\n3. 你如何在保持生产力动力的同时，在议程中建立灵活性？\n\n## 更多资源\n\n- **模板：** 半天、全天和两天议程模板，执行表模板\n- **AI工具：** GPT摘要、构思助推器、文案润色工具、洞察综合\n- **能量管理：** 休息规划指南、参与技巧、时间盒工具"
    }
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
  }, [currentSection]);

  // Calculate progress
  const progress = (moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100;

  // Toggle section completion
  // Section toggle logic handled by withModuleProgress HOC

  // UI text based on language
  const uiText = params.lang === 'zh' ? {
    backToModules: '返回模块',
    chapter: '第',
    moduleTitle: '议程设计',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    workshopDesign: '工作坊设计',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个',
    nextModule: '下一个模块'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Agenda Design',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    workshopDesign: 'Workshop Design',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next',
    nextModule: 'Next Module'
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
                      {uiText.chapter} 16
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{uiText.workshopDesign}</span>
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
                <span>50 {uiText.minutes}</span>
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
                      href={`/${params.lang}/modules/facilitation-skills`}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <span>{uiText.nextModule}</span>
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

const AgendaDesignPage = withModuleProgress(
  AgendaDesignComponent,
  'agenda-design',
  11
);

export default AgendaDesignPage;
