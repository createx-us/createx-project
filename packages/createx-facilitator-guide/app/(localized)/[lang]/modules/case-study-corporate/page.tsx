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

function CaseStudyCorporateComponent({
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
      id: "section-21-0",
      title: "21.0 Snapshot",
      type: "content",
      content: "| Item | Detail |\n|------|---------|\n| **Client** | Acme Logistics — Fortune 500 supply-chain operator |\n| **Location / Format** | Montréal HQ · 4-day hybrid sprint (onsite + remote) |\n| **Challenge** | Cut last-mile delivery carbon emissions 12% within 12 months while preserving SLA speed |\n| **Participants** | 26 (drivers, route planners, data scientists, operations VPs, customer-success reps) |\n| **Facilitators** | 2 CreateX leads + 1 remote champion |\n| **Outcome Highlights** | • AI-enabled route-optimizer prototype → pilot ROI $1.4M < 6 mo<br>• Creative Confidence +2.6 (CCS-10)<br>• Workshop NPS +68 |"
    },
    {
      id: "section-21-1",
      title: "21.1 Context & Pre-Sprint Scoping",
      type: "content",
      content: "**Regulatory Push:** Québec set aggressive CO₂ targets; Acme faced potential fines  \n**Data Wealth, Insight Scarcity:** Tera-bytes of telematics logs yet no actionable dashboards  \n**Sponsor Goal:** Deliver a board-ready pilot plan in 4 days; secure budget at next QBR\n\n**CreateX Scoping Moves:**\n\n1. **Problem Statement (T-30 d)**  \n   \"How might we redesign last-mile operations so that Acme reduces CO₂ per parcel without lengthening delivery windows?\"\n\n2. **Stakeholder Map** identified municipal regulators and parcel recipients as silent but high-impact voices—two were invited to Day-2 testing\n\n3. **AI Tool Pre-Check** — Legal approved GPT-4o use on anonymized route data; Whisper-Live for bilingual (EN/FR) transcription"
    },
    {
      id: "section-21-2",
      title: "21.2 Sprint Agenda (4 × 90 min × 4 days)",
      type: "content",
      content: "| Day | Diamond Stage | Key Activities | AI Assist |\n|-----|---------------|----------------|-----------|\n| **1 AM** | Discover | Ride-along video playback · AEIOU tag storm | Whisper transcription |\n| **1 PM** | Define | Affinity + Journey Map · HMW framing | GPT-theme cluster |\n| **2 AM** | Develop | Brainwriting 6-3-5 · Crazy 8s | Gemini metaphor seed |\n| **2 PM** | Develop | SCAMPER remix · Dot-vote | Heat-map overlay |\n| **3 AM** | Prototype | Storyboards · Paper UI for Driver App | Galileo prompt-to-UI |\n| **3 PM** | Test | Think-aloud (drivers) · Heuristic review | Sentiment timeline |\n| **4 AM** | Deliver | Pilot Canvas · RACI · KPI board | GPT KPI auto-calc |\n| **4 PM** | Reflection | AAR · Highlight reel edit | Auto-subtitles |"
    },
    {
      id: "section-21-3",
      title: "21.3 Prototype & Pilot",
      type: "content",
      content: "**Concept:** \"Eco-Flex Route Optimizer\" (EFR): dynamic geo-fencing redirects drivers to micro-hubs + e-bike couriers during urban congestion peaks\n\n**Wizard-of-Oz:** Operations analyst manually pushed reroutes via SMS; simulated AI decisions\n\n**Metrics Tested (n = 10 vans, 3 days):**\n\n| Metric | Baseline | Pilot | Δ |\n|--------|----------|-------|---|\n| **Avg CO₂ / parcel** | 540 g | 468 g | -13.3% |\n| **On-time rate** | 96.2% | 95.7% | -0.5 pp |\n| **Driver satisfaction (1-5)** | 3.6 | 4.1 | +0.5 |"
    },
    {
      id: "section-21-4",
      title: "21.4 Impact & ROI",
      type: "content",
      content: "| Category | Detail |\n|----------|---------|\n| **Cost Saved** | Fuel -$740k / yr (projected) |\n| **Revenue Protection** | Avoided CO₂ surcharge $300k |\n| **Total ROI** | $1.4M within 6 months (investment $220k) |\n| **AoCC Added** | 482 (ideas, prototypes, user tests logged) |\n\n**Board approved scaling EFR to 5 cities; internal green-ops team formed (4 FTE).**"
    },
    {
      id: "section-21-5",
      title: "21.5 Creative Confidence Gains",
      type: "content",
      content: "| Measure | Pre | Post | Δ |\n|---------|-----|------|---|\n| **CCS-10 (avg)** | 5.7 | 8.3 | +2.6 |\n| **Workshop NPS** | — | +68 | — |\n\n**Qual quotes:**\n- **\"I never thought a driver's hunch could drive an AI model—now I do.\"** — Data Scientist\n- **\"The paper-app test showed me how fast we can pilot without code.\"** — Product VP"
    },
    {
      id: "section-21-6",
      title: "21.6 Lessons Learned",
      type: "content",
      content: "| Domain | Insight | Action |\n|--------|---------|--------|\n| **Hybrid Ops** | Remote planners felt sidelined during paper protos | Added live doc cam feed + remote scribes next sprint |\n| **Data Quality** | GPS jitter skewed CO₂ calc | Implemented sensor fusion pre-processing |\n| **Change Mgmt** | Driver union wary of \"AI replacement\" | Co-created training + incentive scheme; union rep on pilot team |"
    },
    {
      id: "section-21-7",
      title: "21.7 Replication Tips",
      type: "content",
      content: "1. **Ride-Along Videos** trump slide decks—sensory empathy accelerates urgency\n2. **Wizard-of-Oz SMS** is cheap, controllable, and driver-friendly\n3. **KPI Dashboard Scaffold** in Looker reduced analytics setup from weeks → hours\n4. **Bilingual Transcripts** preserve nuance; FR-only jokes revealed morale levers"
    },
    {
      id: "section-21-8",
      title: "21.8 Toolkit Links",
      type: "interactive",
      content: "- **Pilot Canvas example** (redacted)\n- **Figma file of EFR clickable demo**\n- **GPT route-cluster prompt** (C-T-E-C-O format)\n- **Looker dashboard template** (.json)\n\n**(All files: createx.us/case-acme-bundle)**\n\n## Key Takeaways\n\n- **Cross-functional immersion + AI acceleration** enabled a 4-day concept-to-pilot hand-off\n- **Early Wizard-of-Oz** validated desirability before heavy algorithm build\n- **Clear ROI story** secured executive buy-in, turning workshop buzz into funded roadmap\n\n## Facilitator Checklist Extract\n\n☐ Sponsor brief aligned to KPI  \n☐ Ride-along footage captured  \n☐ Bilingual transcription ready  \n☐ Wizard-of-Oz script rehearsed  \n☐ Pilot Canvas approved\n\n## Reflection Questions\n\n1. How can you adapt the 4-day sprint format to your organization's decision-making cycles and stakeholder availability?\n2. What specific methods would you use to build empathy and urgency around sustainability challenges in your context?\n3. How will you balance rapid prototyping with the validation rigor needed for business case development?\n\n## Further Resources\n\n- **Sprint Design:** 4-day hybrid agenda templates, Stakeholder mapping tools, Pre-sprint scoping frameworks\n- **Validation Methods:** Wizard-of-Oz prototyping, Pilot testing protocols, ROI calculation templates\n- **Corporate Integration:** Executive briefing formats, Business case development, Change management strategies"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      id: "section-21-0",
      title: "21.0 概况",
      type: "content",
      content: "| 项目 | 详情 |\n|------|---------|\n| **客户** | Acme物流 — 财富500强供应链运营商 |\n| **地点/形式** | 蒙特利尔总部 · 4天混合冲刺（现场+远程） |\n| **挑战** | 在12个月内削减最后一英里配送碳排放12%，同时保持SLA速度 |\n| **参与者** | 26人（司机、路线规划师、数据科学家、运营副总裁、客户成功代表） |\n| **引导师** | 2名CreateX负责人 + 1名远程冠军 |\n| **成果亮点** | • AI启用的路线优化器原型 → 试点ROI $1.4M < 6个月<br>• 创意信心+2.6（CCS-10）<br>• 工作坊NPS +68 |"
    },
    {
      id: "section-21-1",
      title: "21.1 背景与冲刺前范围界定",
      type: "content",
      content: "**监管推动：**魁北克设定了激进的CO₂目标；Acme面临潜在罚款  \n**数据财富，洞察稀缺：**TB级远程信息处理日志，但没有可操作的仪表板  \n**赞助商目标：**在4天内交付一个董事会就绪的试点计划；在下次QBR获得预算\n\n**CreateX范围界定行动：**\n\n1. **问题陈述（T-30天）**  \n   我们如何重新设计最后一英里运营，使Acme在不延长配送时间的情况下减少每包裹CO₂？\n\n2. **利益相关者地图**识别市政监管者和包裹接收者为沉默但高影响力的声音——两人受邀参加第2天测试\n\n3. **AI工具预检**——法务批准在匿名路线数据上使用GPT-4o；Whisper-Live用于双语（英语/法语）转录"
    },
    {
      id: "section-21-2",
      title: "21.2 冲刺议程（4 × 90分钟 × 4天）",
      type: "content",
      content: "| 天 | 钻石阶段 | 关键活动 | AI辅助 |\n|-----|---------------|----------------|-----------|\n| **第1天上午** | 发现 | 跟车视频回放 · AEIOU标签风暴 | Whisper转录 |\n| **第1天下午** | 定义 | 亲和+旅程地图 · HMW框架 | GPT主题聚类 |\n| **第2天上午** | 发展 | 脑书写6-3-5 · 疯狂8 | Gemini隐喻种子 |\n| **第2天下午** | 发展 | SCAMPER重混 · 点投票 | 热图叠加 |\n| **第3天上午** | 原型 | 故事板 · 司机应用纸质UI | Galileo提示到UI |\n| **第3天下午** | 测试 | 思考发声（司机） · 启发式审查 | 情感时间线 |\n| **第4天上午** | 交付 | 试点画布 · RACI · KPI板 | GPT KPI自动计算 |\n| **第4天下午** | 反思 | AAR · 亮点剪辑编辑 | 自动字幕 |"
    },
    {
      id: "section-21-3",
      title: "21.3 原型与试点",
      type: "content",
      content: "**概念：**生态灵活路线优化器（EFR）：动态地理围栏在城市拥堵高峰期将司机重定向到微枢纽+电动自行车快递员\n\n**绿野仙踪：**运营分析师通过SMS手动推送重新路由；模拟AI决策\n\n**测试指标（n = 10辆货车，3天）：**\n\n| 指标 | 基线 | 试点 | Δ |\n|--------|----------|-------|---|\n| **平均CO₂/包裹** | 540克 | 468克 | -13.3% |\n| **准时率** | 96.2% | 95.7% | -0.5个百分点 |\n| **司机满意度（1-5）** | 3.6 | 4.1 | +0.5 |"
    },
    {
      id: "section-21-4",
      title: "21.4 影响与ROI",
      type: "content",
      content: "| 类别 | 详情 |\n|----------|---------|\n| **节省成本** | 燃料-$740k/年（预计） |\n| **收入保护** | 避免CO₂附加费$300k |\n| **总ROI** | 6个月内$1.4M（投资$220k） |\n| **增加的AoCC** | 482（记录的想法、原型、用户测试） |\n\n**董事会批准将EFR扩展到5个城市；成立内部绿色运营团队（4名全职员工）。**"
    },
    {
      id: "section-21-5",
      title: "21.5 创意信心增长",
      type: "content",
      content: "| 测量 | 前 | 后 | Δ |\n|---------|-----|------|---|\n| **CCS-10（平均）** | 5.7 | 8.3 | +2.6 |\n| **工作坊NPS** | — | +68 | — |\n\n**定性引用：**\n- **我从未想过司机的直觉能驱动AI模型——现在我相信了。** — 数据科学家\n- **纸质应用测试显示了我们在不编码的情况下试点的速度。** — 产品副总裁"
    },
    {
      id: "section-21-6",
      title: "21.6 经验教训",
      type: "content",
      content: "| 领域 | 洞察 | 行动 |\n|--------|---------|--------|\n| **混合运营** | 远程规划师在纸质原型期间感到被边缘化 | 下次冲刺增加实时文档摄像头+远程记录员 |\n| **数据质量** | GPS抖动歪曲了CO₂计算 | 实施传感器融合预处理 |\n| **变更管理** | 司机工会担心 AI替代 | 共同创建培训+激励方案；工会代表加入试点团队 |"
    },
    {
      id: "section-21-7",
      title: "21.7 复制技巧",
      type: "content",
      content: "1. **跟车视频**胜过幻灯片——感官共情加速紧迫感\n2. **绿野仙踪SMS**便宜、可控且司机友好\n3. **Looker中的KPI仪表板支架**将分析设置从几周缩短到几小时\n4. **双语转录**保留细微差别；仅法语笑话揭示士气杠杆"
    },
    {
      id: "section-21-8",
      title: "21.8 工具包链接",
      type: "interactive",
      content: "- **试点画布示例**（已编辑）\n- **EFR可点击演示的Figma文件**\n- **GPT路线聚类提示**（C-T-E-C-O格式）\n- **Looker仪表板模板**（.json）\n\n**（所有文件：createx.us/case-acme-bundle）**\n\n## 关键要点\n\n- **跨职能沉浸+AI加速**实现了4天从概念到试点的交接\n- **早期绿野仙踪**在大量算法构建之前验证了可取性\n- **清晰的ROI故事**获得了高管支持，将工作坊热议转化为资助路线图\n\n## 引导师检查清单摘录\n\n☐ 赞助商简报与KPI一致  \n☐ 跟车镜头已捕获  \n☐ 双语转录就绪  \n☐ 绿野仙踪脚本已排练  \n☐ 试点画布已批准\n\n## 反思问题\n\n1. 你如何将4天冲刺格式适应到你组织的决策周期和利益相关者可用性？\n2. 你会使用什么具体方法来建立对你环境中可持续性挑战的共情和紧迫感？\n3. 你将如何平衡快速原型制作与商业案例开发所需的验证严谨性？\n\n## 进一步资源\n\n- **冲刺设计：**4天混合议程模板、利益相关者映射工具、冲刺前范围界定框架\n- **验证方法：**绿野仙踪原型制作、试点测试协议、ROI计算模板\n- **企业整合：**高管简报格式、商业案例开发、变更管理策略"
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
    moduleTitle: '案例研究：企业',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个',
    track: '案例研究'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Case Study: Corporate',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next',
    track: 'Case Studies'
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
                    {uiText.chapter} 21
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{uiText.track}</span>
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
              <span>35 {uiText.minutes}</span>
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
                    href={`/${params.lang}/modules/case-study-nonprofit`}
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

const CaseStudyCorporatePage = withModuleProgress(
  CaseStudyCorporateComponent,
  'case-study-corporate',
  7
);

export default CaseStudyCorporatePage;
