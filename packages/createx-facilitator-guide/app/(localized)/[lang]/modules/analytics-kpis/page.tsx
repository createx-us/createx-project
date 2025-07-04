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

function AnalyticsKpisComponent({
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
      "id": "section-24-0",
      "title": "24.0 Why Measure?",
      "type": "content",
      "content": "If creativity is the engine, analytics is the dashboard. Data:\n\n1. **Proves impact** to sponsors and skeptics\n2. **Guides iteration** by spotlighting bottlenecks\n3. **Scales learning** across the CreateX network\n\nWell-chosen KPIs balance user value, business value, and learning velocity."
    },
    {
      "id": "section-24-1",
      "title": "24.1 Measurement Pyramid",
      "type": "content",
      "content": "```\n                    Impact\n               (Strategic KPIs)\n            -------------------------\n           Adoption · Revenue · ROI\n          -----------------------------\n         Activation · Satisfaction\n        ---------------------------------\n       Creative Confidence · AoCC · CCD\n      -------------------------------------\n     Process Health (lead/timebox, NPS)\n```\n\n- **Base** = leading indicators you collect during workshops\n- **Mid** = product & user metrics in pilot phase\n- **Top** = organizational outcomes (e.g., ROI, ESG impact)"
    },
    {
      "id": "section-24-2",
      "title": "24.2 Core CreateX Metrics",
      "type": "content",
      "content": "| Acronym | Formula | Lens | Typical Target |\n|---------|---------|------|----------------|\n| **AoCC (Acts of Creative Confidence)** | Count of logged ideas, prototypes, tests | Individual/Team | +200 / workshop day |\n| **CCD (Creative Confidence Delta)** | CCS-10 post – CCS-10 pre | Individual | ≥ +2.0 |\n| **wNPS (Workshop NPS)** | % Promoters – % Detractors | Experience | ≥ +50 |\n| **PPR (Prototype→Pilot Rate)** | # pilots / # top concepts | Delivery | ≥ 33% |\n| **TtI (Time-to-Insight)** | Minutes from research start to first themed cluster | Velocity | –50% vs. baseline |\n| **TtPilot** | Days from workshop end to live pilot | Agility | < 30 days |"
    },
    {
      "id": "section-24-3",
      "title": "24.3 Metric Collection Toolkit",
      "type": "interactive",
      "content": "| Stage | Instrument | Frequency | AI Assist |\n|-------|------------|-----------|-----------|\n| **Kickoff** | CCS-10 survey | Pre | Auto-scoring Google Form |\n| **All Day** | AoCC logger (BoardX) | Real-time | Prompt to name each act |\n| **End of Day** | wNPS + open feedback | Daily | GPT sentiment cluster |\n| **Pilot** | Product analytics (Mixpanel / Metabase) | Continuous | LLM anomaly alerts |\n| **Reflection** | AAR sticky notes | Post | Theme extraction macro |"
    },
    {
      "id": "section-24-4",
      "title": "24.4 Dashboards & Visualisation",
      "type": "content",
      "content": "| Layer | Tool | Best-Practices |\n|-------|------|----------------|\n| **Workshop Live** | BoardX KPI Board widget | Display AoCC & energy polls in room |\n| **Pilot Dashboard** | Looker Studio | Blend SQL + Google Sheets; traffic-light KPI cards |\n| **Portfolio View** | Airtable / Notion | One row per project; roll-up ROI & PPR |\n\n**Quick-Start Template:** createx.us/kpi-dashboard-lookml"
    },
    {
      "id": "section-24-5",
      "title": "24.5 ROI & Business-Case Formulas",
      "type": "content",
      "content": "| Outcome | Formula | Notes |\n|---------|---------|-------|\n| **Hard ROI** | (Δ Revenue + Δ Cost Savings – Program Cost) / Program Cost | Use 6-month horizon default |\n| **Payback Period** | Program Cost / Monthly Net Benefit | < 12 months ideal |\n| **CO₂ Reduction per $** | (Baseline CO₂ – Pilot CO₂) / Pilot Cost | ESG reporting |\n\n**AI Prompt:** \"Given these baseline + pilot figures, calculate ROI, payback, and CO₂/$; output Markdown table.\""
    },
    {
      "id": "section-24-6",
      "title": "24.6 Statistical & Ethical Guardrails",
      "type": "content",
      "content": "| Topic | Guardrail |\n|-------|-----------|\n| **Sample Size** | Power calc: N ≥ 16 per variant for α 0.05, d 0.8 when A/B testing micro-UX |\n| **Data Privacy** | Pseudonymise user IDs; store sensitive logs ≤ 90 days |\n| **Bias Audit** | Compare KPI deltas across demographic slices; flag > 15% gap |\n| **Transparency** | Publish metric definitions and collection scripts in repo |"
    },
    {
      "id": "section-24-7",
      "title": "24.7 AI-Driven Insight Generation Workflow",
      "type": "content",
      "content": "1. **Extract** raw JSON logs (BoardX, Maze, Mixpanel)\n2. **ETL** → cloud warehouse (BigQuery / Snowflake)\n3. **GPT-SQL Agent** queries:\n   - \"List sessions where TtI > 45 min.\"\n   - \"Cluster comments by emotional tone.\"\n4. **Auto-generate** KPI slides → push to Recap deck\n\n**Guardrail:** Read-only service account; manual review before external share."
    },
    {
      "id": "section-24-8",
      "title": "24.8 Benchmark Library (2023-25 CreateX Data)",
      "type": "content",
      "content": "| Metric | 25th % | Median | 75th % | Top 10% |\n|--------|--------|--------|---------|---------|\n| **AoCC/day** | 110 | 180 | 260 | 320 |\n| **CCD** | +1.4 | +2.1 | +2.8 | +3.4 |\n| **wNPS** | +38 | +55 | +68 | +78 |\n| **PPR** | 18% | 34% | 52% | 66% |\n\n**Use benchmarks to set stretch yet realistic targets; update semi-annually.**"
    },
    {
      "id": "section-24-9",
      "title": "24.9 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Symptom | Fix |\n|---------|---------|-----|\n| **Vanity Metrics** | \"Likes\", \"views\" quoted | Tie to behavior or revenue; drop fluff |\n| **Data Cemetery** | Metrics collected, never viewed | Automate daily email digest |\n| **Over-Measuring** | Survey fatigue | Limit to most actionable KPIs; rotate long forms |\n| **Attribution Fog** | Can't link workshop to ROI | Capture baseline before sprint; document assumptions |\n\n## Key Takeaways\n\n- **Align KPIs with pyramid layers**—process, confidence, adoption, impact\n- **Automate capture** via BoardX & AI scripts, but validate edge cases manually\n- **Benchmark against CreateX library** to frame success narratives\n- **Use clear formulas** for ROI & payback to secure executive commitment\n- **Ethical analytics** = privacy + bias monitoring + transparency"
    },
    {
      "id": "section-24-11",
      "title": "24.11 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"Lean Analytics\" (Croll & Yoskovitz)\n- **Paper:** Stanford d.school (2024) \"Measuring Creative Confidence at Scale\"\n- **Toolkit:** createx.us/toolkit/kpi-pack (survey forms, Looker templates, GPT-SQL snippets)\n- **Podcast:** Data-In-Action — Ep. 31 \"From Workshop Buzz to Boardroom Numbers\"\n\n## Facilitator Checklist\n\n☐ Baseline metrics captured pre-workshop  \n☐ AoCC logger activated  \n☐ Dashboard link shared with sponsors  \n☐ ROI calc script templated  \n☐ Privacy & bias audit logged\n\n## Reflection Questions\n\n1. Which metrics from the measurement pyramid are most critical for demonstrating value in your context?\n2. How will you balance comprehensive data collection with participant privacy and workshop flow?\n3. What specific ROI calculations would be most compelling for your stakeholders?\n\n## Further Resources\n\n- **Measurement Framework:** Measurement pyramid, Core CreateX metrics, Benchmark library\n- **Collection Systems:** Metric collection toolkit, Dashboard templates, AI-driven workflows\n- **Business Impact:** ROI formulas, Business case development, Statistical guardrails"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-24-0",
      "title": "24.0 为什么要测量？",
      "type": "content",
      "content": "如果创造力是引擎，分析就是仪表板。数据：\n\n1. **向赞助商和怀疑者证明影响**\n2. **通过突出瓶颈指导迭代**\n3. **在CreateX网络中扩展学习**\n\n精心选择的KPI在用户价值、商业价值和学习速度之间取得平衡。"
    },
    {
      "id": "section-24-1",
      "title": "24.1 测量金字塔",
      "type": "content",
      "content": "```\n                    影响\n               (战略KPI)\n            -------------------------\n           采用率 · 收入 · ROI\n          -----------------------------\n         激活率 · 满意度\n        ---------------------------------\n       创意信心 · AoCC · CCD\n      -------------------------------------\n     流程健康度 (领先/时间盒，NPS)\n```\n\n- **基础** = 工作坊期间收集的领先指标\n- **中层** = 试点阶段的产品和用户指标  \n- **顶层** = 组织成果（如ROI、ESG影响）"
    },
    {
      "id": "section-24-2",
      "title": "24.2 核心CreateX指标",
      "type": "content",
      "content": "| 缩写 | 公式 | 视角 | 典型目标 |\n|---------|---------|------|----------------|\n| **AoCC (创意信心行为)** | 记录的想法、原型、测试数量 | 个人/团队 | +200 / 工作坊日 |\n| **CCD (创意信心差值)** | CCS-10 后测 – CCS-10 前测 | 个人 | ≥ +2.0 |\n| **wNPS (工作坊NPS)** | % 推荐者 – % 批评者 | 体验 | ≥ +50 |\n| **PPR (原型→试点率)** | # 试点 / # 顶级概念 | 交付 | ≥ 33% |\n| **TtI (洞察时间)** | 从研究开始到第一个主题聚类的分钟数 | 速度 | –50% vs. 基线 |\n| **TtPilot** | 从工作坊结束到试点上线的天数 | 敏捷性 | < 30天 |"
    },
    {
      "id": "section-24-3",
      "title": "24.3 指标收集工具包",
      "type": "interactive",
      "content": "| 阶段 | 工具 | 频率 | AI辅助 |\n|-------|------------|-----------|-----------|\n| **启动** | CCS-10调查 | 前测 | 自动评分Google表单 |\n| **全天** | AoCC记录器(BoardX) | 实时 | 提示命名每个行为 |\n| **日终** | wNPS + 开放反馈 | 每日 | GPT情感聚类 |\n| **试点** | 产品分析(Mixpanel / Metabase) | 持续 | LLM异常警报 |\n| **反思** | AAR便签 | 后测 | 主题提取宏 |"
    },
    {
      "id": "section-24-4",
      "title": "24.4 仪表板和可视化",
      "type": "content",
      "content": "| 层级 | 工具 | 最佳实践 |\n|-------|------|----------------|\n| **工作坊实时** | BoardX KPI板块小部件 | 在房间内显示AoCC和能量投票 |\n| **试点仪表板** | Looker Studio | 混合SQL + Google表格；交通灯KPI卡片 |\n| **组合视图** | Airtable / Notion | 每项目一行；汇总ROI和PPR |\n\n**快速启动模板：** createx.us/kpi-dashboard-lookml"
    },
    {
      "id": "section-24-5",
      "title": "24.5 ROI和商业案例公式",
      "type": "content",
      "content": "| 结果 | 公式 | 注释 |\n|---------|---------|-------|\n| **硬ROI** | (Δ收入 + Δ成本节约 – 项目成本) / 项目成本 | 默认使用6个月周期 |\n| **回收期** | 项目成本 / 月净收益 | < 12个月为理想 |\n| **CO₂减排每$** | (基线CO₂ – 试点CO₂) / 试点成本 | ESG报告 |\n\n**AI提示：** 给定这些基线+试点数据，计算ROI、回收期和CO₂/$；输出Markdown表格。"
    },
    {
      "id": "section-24-6",
      "title": "24.6 统计和道德保障",
      "type": "content",
      "content": "| 主题 | 保障措施 |\n|-------|-----------|\n| **样本大小** | 功效计算：A/B测试微用户体验时，α 0.05, d 0.8需要N ≥ 16每变体 |\n| **数据隐私** | 用户ID假名化；敏感日志存储≤ 90天 |\n| **偏见审计** | 比较人口统计切片间的KPI差值；标记 > 15%差距 |\n| **透明度** | 在代码库中发布指标定义和收集脚本 |"
    },
    {
      "id": "section-24-7",
      "title": "24.7 AI驱动洞察生成工作流",
      "type": "content",
      "content": "1. **提取**原始JSON日志（BoardX、Maze、Mixpanel）\n2. **ETL** → 云数据仓库（BigQuery / Snowflake）\n3. **GPT-SQL代理**查询：\n   - 列出TtI > 45分钟的会话。\n   - 按情感语调聚类评论。\n4. **自动生成**KPI幻灯片 → 推送到回顾幻灯片\n\n**保障措施：**只读服务账户；外部分享前手动审核。"
    },
    {
      "id": "section-24-8",
      "title": "24.8 基准库（2023-25 CreateX数据）",
      "type": "content",
      "content": "| 指标 | 25th % | 中位数 | 75th % | 前10% |\n|--------|--------|--------|---------|---------|\n| **AoCC/天** | 110 | 180 | 260 | 320 |\n| **CCD** | +1.4 | +2.1 | +2.8 | +3.4 |\n| **wNPS** | +38 | +55 | +68 | +78 |\n| **PPR** | 18% | 34% | 52% | 66% |\n\n**使用基准设定有挑战性但现实的目标；每半年更新。**"
    },
    {
      "id": "section-24-9",
      "title": "24.9 常见陷阱和解决方案",
      "type": "content",
      "content": "| 陷阱 | 症状 | 解决方案 |\n|---------|---------|-----|\n| **虚荣指标** | 引用点赞、浏览量 | 与行为或收入关联；放弃无意义指标 |\n| **数据墓地** | 收集指标但从不查看 | 自动化每日邮件摘要 |\n| **过度测量** | 调查疲劳 | 限制为最可操作的KPI；轮换长表单 |\n| **归因迷雾** | 无法将工作坊与ROI关联 | 冲刺前捕获基线；记录假设 |\n\n## 关键要点\n\n- **将KPI与金字塔层级对齐**——流程、信心、采用、影响\n- **通过BoardX和AI脚本自动化捕获**，但手动验证边缘情况\n- **与CreateX库进行基准比较**以构建成功叙事\n- **使用清晰公式**计算ROI和回收期以获得高管承诺\n- **道德分析** = 隐私 + 偏见监控 + 透明度"
    },
    {
      "id": "section-24-11",
      "title": "24.11 实地笔记和进一步阅读",
      "type": "content",
      "content": "- **书籍：**《精益分析》（Croll & Yoskovitz）\n- **论文：**斯坦福d.school（2024）大规模测量创意信心\n- **工具包：** createx.us/toolkit/kpi-pack（调查表单、Looker模板、GPT-SQL片段）\n- **播客：**Data-In-Action——第31集从工作坊热议到董事会数字\n\n## 引导师检查清单\n\n☐ 工作坊前捕获基线指标  \n☐ 激活AoCC记录器  \n☐ 与赞助商分享仪表板链接  \n☐ ROI计算脚本模板化  \n☐ 记录隐私和偏见审计\n\n## 反思问题\n\n1. 测量金字塔中的哪些指标对在你的环境中展示价值最为关键？\n2. 你将如何平衡全面的数据收集与参与者隐私和工作坊流程？\n3. 哪些具体的ROI计算对你的利益相关者最有说服力？\n\n## 进一步资源\n\n- **测量框架：**测量金字塔、核心CreateX指标、基准库\n- **收集系统：**指标收集工具包、仪表板模板、AI驱动工作流\n- **商业影响：**ROI公式、商业案例开发、统计保障措施"
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
    moduleTitle: '分析与KPI',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '高级',
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
    moduleTitle: 'Analytics & KPIs',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Advanced',
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
                    {uiText.chapter} 24
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
              <span>45 {uiText.minutes}</span>
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
                    href={`/${params.lang}/modules/competency-certification`}
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

const AnalyticsKpisPage = withModuleProgress(
  AnalyticsKpisComponent,
  'analytics-kpis',
  8
);

export default AnalyticsKpisPage;
