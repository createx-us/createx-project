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

function CompetencyCertificationComponent({
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
      "id": "section-25-0",
      "title": "25.0 Opening Story",
      "type": "content",
      "content": "\"I thought I was done after my first big workshop—turns out I'd just unlocked Level 2.\"\n\nWhen CreateX volunteer Leila Barros finished facilitating a 50-person NGO sprint, she expected a polite \"thank you.\" Instead, she received an email: \"Congrats, you've advanced to Guide certification—here's your feedback and next-level challenges.\" The structured path surprised her and lit a new goal: become an Architect by year's end. Leila's journey embodies the CreateX philosophy: facilitation is a craft with clear milestones, feedback loops, and community recognition."
    },
    {
      "id": "section-25-1",
      "title": "25.1 Why a Certification Path?",
      "type": "content",
      "content": "- **Quality Assurance** — Sponsors trust a common competency standard\n- **Growth Road-Map** — Facilitators see tangible progress and next-step skills\n- **Community Currency** — Badges unlock speaking slots, project leads, and revenue-share opportunities"
    },
    {
      "id": "section-25-2",
      "title": "25.2 Competency Framework (6 Skill Domains)",
      "type": "content",
      "content": "| Domain | Description | Key Behaviours |\n|--------|-------------|----------------|\n| **Facilitation Craft** | Methods, time-boxing, group dynamics | Runs Double-Diamond, neutral framing |\n| **AI Fluency** | Prompt design, tool selection, ethics | Applies C-T-E-C-O, bias audit |\n| **Design-Thinking Depth** | Empathy to pilot | Generates POV, leads prototyping |\n| **Impact & Metrics** | Defines KPIs, dashboards | Tracks AoCC, ROI |\n| **Ethics & Inclusion** | Psychological safety, privacy, accessibility | Enforces code-of-conduct, WCAG |\n| **Community Leadership** | Mentoring, knowledge sharing | Publishes templates, coaches peers |\n\n**Each domain scored 0–4 (\"Observer\" → \"Expert\").**"
    },
    {
      "id": "section-25-3",
      "title": "25.3 Certification Levels & Requirements",
      "type": "content",
      "content": "| Level | Competency Band | Evidence Required | Digital Badge |\n|-------|-----------------|-------------------|---------------|\n| **Explorer** | Avg score ≥ 1.5 | • Co-facilitated ≥ 2 workshops<br>• Reflection essay (1,000 words) | 🟢 Explorer |\n| **Guide** | Avg ≥ 2.5 with ≥ 2 domains ≥ 3 | • Solo-led ≥ 5 workshops (≥ 150 participants total)<br>• KPI report showing AoCC ≥ 150 / day<br>• Video snippet (10 min) peer-reviewed | 🔵 Guide |\n| **Architect** | Avg ≥ 3.5 with all domains ≥ 3 | • Designed new method or AI prompt library, CC-BY-SA<br>• Trained ≥ 20 Explorers/Guides (documented)<br>• Impact case study (ROI or social metric) | 🟣 Architect |\n| **Fellow¹** | Avg ≥ 3.8 with ≥ 3 domains = 4 | • Publish peer-reviewed paper or book<br>• Serve on Steward Council 12 m<br>• Lead cross-region initiative | ⭐ Fellow |\n\n**¹ By invitation after Architect; quota ≤ 2% of community.**"
    },
    {
      "id": "section-25-4",
      "title": "25.4 Assessment Workflow",
      "type": "interactive",
      "content": "1. **Self-Assessment** → Portfolio Upload\n2. **Peer Review** (2 certified reviewers)\n3. **Live Practicum** (30-min simulated block)\n4. **Feedback Report** (scorecard + growth plan)\n5. **Council Approval** → Badge issuance on blockchain (ERC-1155)\n\n**Cycle:** Quarterly."
    },
    {
      "id": "section-25-5",
      "title": "25.5 Digital Badges & Perks",
      "type": "content",
      "content": "| Badge | Verifiable On | Perks |\n|-------|---------------|-------|\n| **Explorer** | createx.id, LinkedIn | Access to \"Guide Camp\" cohort |\n| **Guide** | Same + Credly | Eligible for paid client gigs ($700–$1,200 / day) |\n| **Architect** | Same + GitPOAP | Revenue-share on toolkit sales; speaking stipends |\n| **Fellow** | Same | Summit keynote + steering influence |\n\n**Badges contain hashed links to evidence artifacts; revokable on code-of-conduct breach.**"
    },
    {
      "id": "section-25-6",
      "title": "25.6 Continuing Education (CE) Credits",
      "type": "content",
      "content": "| Activity | CE Units |\n|----------|----------|\n| **Facilitate workshop (> 1 day)** | 2 |\n| **Publish method template** | 1 |\n| **Mentor Explorer (4 h)** | 1 |\n| **Present at CreateX Summit** | 3 |\n| **Complete AI ethics course** | 1 |\n\n**Renewal:** Maintain ≥ 6 CE units / year to keep badge active."
    },
    {
      "id": "section-25-7",
      "title": "25.7 Skill-Gap Radar & Growth Plan",
      "type": "content",
      "content": "- **Radar Chart** auto-generated from scorecard\n- **Facilitator chooses** two focus domains/semester\n- **Suggested resources** push to personal dashboard (books, micro-lessons, buddy match)"
    },
    {
      "id": "section-25-8",
      "title": "25.8 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Symptom | Remedy |\n|---------|---------|---------|\n| **\"Badge Chasing\"** | Prioritises numbers over impact | Reviewer emphasises qualitative narrative |\n| **Portfolio Bloat** | 100-page PDF dump | Template cap: 15 pages, highlight reel |\n| **Reviewer Bias** | Inflated scores within friend circle | Dual anonymous review, rotating pool |\n| **Stagnation** | No CE submissions | Quarterly nudges, buddy challenges |\n\n## Key Takeaways\n\n- **Competency map spans 6 domains** anchored in CreateX values\n- **Three main levels** (Explorer, Guide, Architect) + honorary Fellow\n- **Evidence-based portfolio + live practicum** ensures rigour\n- **Digital badges unlock perks and responsibilities**; renewal via CE credits keeps skills fresh"
    },
    {
      "id": "section-25-10",
      "title": "25.10 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"The Career Architect\" (Lombardo & Eichinger) — 70-20-10 model\n- **Paper:** Mozilla Open Badges (2023) \"Verifiable Credentials in Learning Communities\"\n- **Toolkit:** createx.us/toolkit/cert-pack (scorecard, portfolio template, badge guide)\n- **Podcast:** Learning Pathways — Ep. 22 \"Beyond Certificates: Competency-Based Recognition\"\n\n## Facilitator Checklist\n\n☐ Self-assessment complete  \n☐ Portfolio artefacts curated  \n☐ Reviewer pair assigned  \n☐ Live practicum slot booked  \n☐ CE tracker set up\n\n## Reflection Questions\n\n1. Which of the 6 competency domains represent your current strengths and growth opportunities?\n2. What evidence from your facilitation experience could you include in a certification portfolio?\n3. How will you integrate continuing education activities into your professional development routine?\n\n## Further Resources\n\n- **Assessment Tools:** 6-domain competency framework, Self-assessment scorecard, Skill-gap radar\n- **Certification Process:** Portfolio templates, Peer review guidelines, Live practicum preparation\n- **Growth Systems:** CE credit tracking, Badge verification, Community recognition pathways"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-25-0",
      "title": "25.0 开场故事",
      "type": "content",
      "content": "我以为第一次大型工作坊结束后就完成了——结果发现我刚解锁了第2级。\n\n当CreateX志愿者Leila Barros完成一场50人NGO冲刺引导后，她期待的是礼貌的 谢谢。相反，她收到了一封邮件：恭喜，你已晋升为指导师认证——这是你的反馈和下一级挑战。这种结构化路径让她惊讶，并点燃了新目标：年底成为架构师。Leila的旅程体现了CreateX理念：引导是一门有清晰里程碑、反馈循环和社区认可的技艺。"
    },
    {
      "id": "section-25-1",
      "title": "25.1 为什么需要认证路径？",
      "type": "content",
      "content": "- **质量保证**——赞助商信任统一的能力标准\n- **成长路线图**——引导师看到切实进步和下一步技能\n- **社区货币**——徽章解锁演讲机会、项目领导和收入分享机会"
    },
    {
      "id": "section-25-2",
      "title": "25.2 能力框架（6个技能领域）",
      "type": "content",
      "content": "| 领域 | 描述 | 关键行为 |\n|--------|-------------|----------------|\n| **引导技艺** | 方法、时间控制、群体动力学 | 运行双钻模型、中性框架 |\n| **AI能力** | 提示设计、工具选择、伦理 | 应用C-T-E-C-O、偏见审计 |\n| **设计思维深度** | 共情到试点 | 生成观点、引导原型制作 |\n| **影响和指标** | 定义KPI、仪表板 | 跟踪AoCC、ROI |\n| **伦理与包容** | 心理安全、隐私、可访问性 | 执行行为准则、WCAG |\n| **社区领导力** | 指导、知识分享 | 发布模板、指导同伴 |\n\n**每个领域评分0–4（观察者→专家）。**"
    },
    {
      "id": "section-25-3",
      "title": "25.3 认证级别和要求",
      "type": "content",
      "content": "| 级别 | 能力段位 | 所需证据 | 数字徽章 |\n|-------|-----------------|-------------------|---------------|\n| **探索者** | 平均分≥1.5 | • 共同引导≥2个工作坊<br>• 反思文章（1,000字） | 🟢 探索者 |\n| **指导师** | 平均≥2.5且≥2个领域≥3 | • 独立引导≥5个工作坊（≥150参与者总数）<br>• 显示AoCC≥150/天的KPI报告<br>• 同行评审的视频片段（10分钟） | 🔵 指导师 |\n| **架构师** | 平均≥3.5且所有领域≥3 | • 设计新方法或AI提示库，CC-BY-SA<br>• 培训≥20名探索者/指导师（有记录）<br>• 影响案例研究（ROI或社会指标） | 🟣 架构师 |\n| **研究员¹** | 平均≥3.8且≥3个领域=4 | • 发表同行评议论文或书籍<br>• 在管理委员会服务12个月<br>• 领导跨地区倡议 | ⭐ 研究员 |\n\n**¹架构师后受邀；配额≤社区的2%。**"
    },
    {
      "id": "section-25-4",
      "title": "25.4 评估工作流程",
      "type": "interactive",
      "content": "1. **自我评估**→作品集上传\n2. **同行评议**（2名认证评审员）\n3. **现场实践**（30分钟模拟块）\n4. **反馈报告**（记分卡+成长计划）\n5. **委员会批准**→在区块链上颁发徽章（ERC-1155）\n\n**周期：**季度。"
    },
    {
      "id": "section-25-5",
      "title": "25.5 数字徽章和特权",
      "type": "content",
      "content": "| 徽章 | 可验证平台 | 特权 |\n|-------|---------------|-------|\n| **探索者** | createx.id、LinkedIn | 访问指导师训练营队列 |\n| **指导师** | 同上+Credly | 有资格承接付费客户业务（$700–$1,200/天） |\n| **架构师** | 同上+GitPOAP | 工具包销售收入分享；演讲津贴 |\n| **研究员** | 同上 | 峰会主题演讲+指导影响力 |\n\n**徽章包含证据工件的哈希链接；在违反行为准则时可撤销。**"
    },
    {
      "id": "section-25-6",
      "title": "25.6 继续教育（CE）学分",
      "type": "content",
      "content": "| 活动 | CE单位 |\n|----------|----------|\n| **引导工作坊（>1天）** | 2 |\n| **发布方法模板** | 1 |\n| **指导探索者（4小时）** | 1 |\n| **在CreateX峰会演讲** | 3 |\n| **完成AI伦理课程** | 1 |\n\n**续期：**每年保持≥6个CE单位以保持徽章活跃。"
    },
    {
      "id": "section-25-7",
      "title": "25.7 技能差距雷达图和成长计划",
      "type": "content",
      "content": "- **雷达图**从记分卡自动生成\n- **引导师选择**每学期两个重点领域\n- **建议资源**推送到个人仪表板（书籍、微课程、伙伴匹配）"
    },
    {
      "id": "section-25-8",
      "title": "25.8 常见陷阱和解决方案",
      "type": "content",
      "content": "| 陷阱 | 症状 | 补救措施 |\n|---------|---------|---------|\n| **徽章追逐** | 优先考虑数量而非影响 | 评审员强调定性叙述 |\n| **作品集臃肿** | 100页PDF堆砌 | 模板上限：15页，精彩集锦 |\n| **评审员偏见** | 朋友圈内夸大评分 | 双重匿名评审，轮换池 |\n| **停滞不前** | 无CE提交 | 季度提醒，伙伴挑战 |\n\n## 关键要点\n\n- **能力图谱涵盖6个领域**，锚定CreateX价值观\n- **三个主要级别**（探索者、指导师、架构师）+荣誉研究员\n- **基于证据的作品集+现场实践**确保严格性\n- **数字徽章解锁特权和责任**；通过CE学分续期保持技能更新"
    },
    {
      "id": "section-25-10",
      "title": "25.10 实地笔记和进一步阅读",
      "type": "content",
      "content": "- **书籍：**《职业架构师》（Lombardo & Eichinger）——70-20-10模型\n- **论文：**Mozilla开放徽章（2023）学习社区中的可验证凭证\n- **工具包：**createx.us/toolkit/cert-pack（记分卡、作品集模板、徽章指南）\n- **播客：**Learning Pathways——第22集 超越证书：基于能力的认可\n\n## 引导师检查清单\n\n☐ 完成自我评估  \n☐ 策展作品集工件  \n☐ 分配评审员对  \n☐ 预约现场实践时段  \n☐ 建立CE跟踪器\n\n## 反思问题\n\n1. 6个能力领域中哪些代表你当前的优势和成长机会？\n2. 你的引导经验中有哪些证据可以纳入认证作品集？\n3. 你将如何将继续教育活动整合到职业发展例行程序中？\n\n## 进一步资源\n\n- **评估工具：**6领域能力框架、自我评估记分卡、技能差距雷达图\n- **认证流程：**作品集模板、同行评议指南、现场实践准备\n- **成长系统：**CE学分跟踪、徽章验证、社区认可路径"
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
    chapter: '章节',
    moduleTitle: '能力认证',
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
    moduleTitle: 'Competency & Certification',
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
                    {uiText.chapter} 25
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Professional Growth</span>
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
              <span>30 minutes</span>
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
                    href={`/${params.lang}/modules/personal-brand`}
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

const CompetencyCertificationPage = withModuleProgress(
  CompetencyCertificationComponent,
  'competency-certification',
  6
);

export default CompetencyCertificationPage;
