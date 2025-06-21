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

function CaseStudyNonprofitComponent({
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
      "id": "section-22-0",
      "title": "22.0 Snapshot",
      "type": "content",
      "content": "| Item | Detail |\n|------|---------|\n| **Initiative** | Water4All — grass-roots coalition tackling unsafe drinking water in informal settlements |\n| **Format** | 3-day remote-only CreateX sprint across Cape Town, Mumbai, São Paulo & Manila (UTC ± 5 h spread) |\n| **Challenge** | Give 18,000 low-income households actionable, real-time water-quality alerts without smartphones |\n| **Participants** | 32 community volunteers, 6 NGO program leads, 4 municipal engineers, 3 data scientists |\n| **Facilitators** | 3 CreateX leads (rotating time-zone coverage) |\n| **Outcome Highlights** | • Launched SMS/USSD alert pilot → reached 18,213 households in 90 days<br>• CO₂-neutral sprint (100% virtual)<br>• Creative Confidence +3.1 (largest ∆ in 2025 data set) |"
    },
    {
      "id": "section-22-1",
      "title": "22.1 Context & Pre-Sprint Alignment",
      "type": "content",
      "content": "**Problem Nuance:** Many residents rely on feature phones; literacy levels vary  \n**Data Source:** Municipal IoT sensors push hourly turbidity & E. coli metrics  \n**Success KPI:** ≥ 60% households read alert within 2 h of hazard spike\n\n**Scoping Highlights:**\n- **Stakeholder Constellation Call (T-21 d)** set \"water-quality alert within 30 min of threshold breach\" as non-negotiable requirement\n- **Accessibility Audit** ensured SMS content < 160-chars, plain language, dual-language (ENG + local)\n- **Tech Charter** approved use of open-source LLM (Mistral 7B-Instruct) hosted on NGO server → no PII leaves region"
    },
    {
      "id": "section-22-2",
      "title": "22.2 Remote Sprint Agenda (3× 4-h windows)",
      "type": "content",
      "content": "| UTC Block | Major Activities | AI Assist | Output |\n|-----------|------------------|-----------|---------|\n| **Day 1 14:00–18:00** | Empathy mini-docs & AEIOU observation debriefs | Whisper + GPT summariser | 12 insight clusters |\n| **Day 2 05:00–09:00** | HMW reframing · Brainwriting 6-3-5 · SCAMPER | Gemini ideation boost | 96 ideas, top 6 concepts |\n| **Day 2 14:00–18:00** | Paper USSD flow · Quick Figma clickable | Galileo UI prompt-to-mock | 3 prototype paths |\n| **Day 3 05:00–09:00** | Remote think-aloud (community reps) | Sentiment heat-map | Issue log, priority fixes |\n| **Day 3 14:00–18:00** | Pilot Canvas · RACI · AAR recap deck | GPT recap deck | Pilot plan + recap deck |\n\n**Time-Zone Tactic:** Two overlapping cohorts (Asia-Pac AM / Africa-LatAm PM) handed off artefacts via BoardX; asynchronous video diaries filled gaps."
    },
    {
      "id": "section-22-3",
      "title": "22.3 Prototype & Pilot Results",
      "type": "content",
      "content": "**Concept:** USSD + SMS hybrid: users dial *120 code → receive local water risk score (green/yellow/red) plus simple mitigation tips (boil, filter, chlorinate)\n\n**Wizard-of-Oz:** LLM answered USSD queries; NGO ops team sent SMS via Twilio\n\n**90-Day Pilot Data (n = 18,213 households):**\n\n| Metric | Target | Achieved | Notes |\n|--------|--------|----------|-------|\n| **Alert Open Rate (2 h)** | 60% | 74% | Auto-sent repeated SMS for non-opens |\n| **Reported GI Cases (self-report)** | -10% | -14.7% | Correlation, not causal proof |\n| **Cost / Household / yr** | <$0.50 | $0.31 | Bulk SMS discount |\n| **Community Trust Index*** | Baseline 3.2 | 4.6 | Likert 1–5 (*proxy for perception) |"
    },
    {
      "id": "section-22-4",
      "title": "22.4 Creative Confidence Impact",
      "type": "content",
      "content": "| Region | CCS-10 Pre | CCS-10 Post | Δ |\n|--------|------------|-------------|---|\n| **Cape Town** | 5.2 | 8.5 | +3.3 |\n| **Mumbai** | 5.9 | 9.1 | +3.2 |\n| **São Paulo** | 6.1 | 9.0 | +2.9 |\n| **Manila** | 5.4 | 8.6 | +3.2 |\n| **Overall** | 5.7 | 8.8 | +3.1 |\n\n**\"I never guessed I could co-design tech from a rural kiosk.\"** — Community Volunteer, Western Cape"
    },
    {
      "id": "section-22-5",
      "title": "22.5 Lessons Learned",
      "type": "content",
      "content": "| Theme | Insight | Action |\n|-------|---------|--------|\n| **Low-Tech Wins** | USSD outranked smartphone app 4:1 in engagement | Default to lowest common tech early |\n| **Language Simplicity** | Messages ≤ 120 chars had 12% higher open rate | Run readability checker (grade ≤ 5) |\n| **Trust Anchors** | Including local health worker's name in SMS ↑ credibility | Add variable {local_contact} token in template |\n| **Model Choice** | On-prem Mistral kept latency < 500 ms, alleviating privacy concerns | Maintain fine-tuned checkpoint for updates |"
    },
    {
      "id": "section-22-6",
      "title": "22.6 Replication Tips for NGOs",
      "type": "content",
      "content": "1. **Decentralize Facilitation** — Assign Regional Co-Leads to bridge time-zones & culture\n2. **Pre-Translate Assets** — Load bilingual sticky note packs before sprint\n3. **Leverage Community Radio** as backup broadcast; integrate in pilot scope\n4. **Use Airtime Incentives** — Reward survey completion with micro-top-ups; 3× response rate"
    },
    {
      "id": "section-22-7",
      "title": "22.7 Toolkit Links",
      "type": "interactive",
      "content": "- **USSD flow Figma file**\n- **SMS message library (15 languages)**\n- **Mistral fine-tune recipe (.yaml)**\n- **Impact dashboard template (Metabase)**\n\n**(Bundle: createx.us/case-water4all)**\n\n## Key Takeaways\n\n- **Remote-only sprints can deliver high-stakes social impact** when handoff rituals & time-zone overlaps are engineered deliberately\n- **Combining ultra-low-tech channels with on-prem AI** met accessibility and privacy demands simultaneously\n- **Clear, early success metrics** (alert read-rate) kept diverse NGOs laser-focused\n- **Community trust and creative confidence surged** when local volunteers co-led testing and messaging\n\n## Facilitator Checklist Extract\n\n☐ Time-zone hand-off schedule logged  \n☐ Telecom partner pre-configured  \n☐ Bilingual assets imported  \n☐ On-prem model tested  \n☐ Pilot KPI dashboard live\n\n## Reflection Questions\n\n1. How can you adapt remote facilitation techniques to bridge significant time zone and cultural differences?\n2. What low-tech solutions might be more appropriate and accessible than high-tech alternatives in your context?\n3. How will you build community trust and ensure local ownership in social impact initiatives?\n\n## Further Resources\n\n- **Remote Facilitation:** Time-zone coordination strategies, Asynchronous handoff protocols, Global team management\n- **Social Impact Design:** Community-driven development, Trust-building frameworks, Accessible technology approaches\n- **Ethical AI:** On-premises deployment, Privacy-preserving techniques, Community consent protocols"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-22-0",
      "title": "22.0 概况",
      "type": "content",
      "content": "| 项目 | 详情 |\n|------|---------|\n| **倡议** | Water4All — 草根联盟解决非正规定居点的不安全饮用水问题 |\n| **形式** | 跨开普敦、孟买、圣保罗和马尼拉的3天纯远程CreateX冲刺（UTC ± 5小时差） |\n| **挑战** | 在没有智能手机的情况下，为18,000个低收入家庭提供可操作的实时水质警报 |\n| **参与者** | 32名社区志愿者、6名NGO项目负责人、4名市政工程师、3名数据科学家 |\n| **引导师** | 3名CreateX负责人（轮流时区覆盖） |\n| **成果亮点** | • 启动SMS/USSD警报试点 → 90天内触达18,213个家庭<br>• CO₂中性冲刺（100%虚拟）<br>• 创意信心+3.1（2025年数据集中最大增幅） |"
    },
    {
      "id": "section-22-1",
      "title": "22.1 背景与冲刺前协调",
      "type": "content",
      "content": "**问题细节：**许多居民依赖功能手机；识字水平参差不齐  \n**数据源：**市政物联网传感器每小时推送浊度和大肠杆菌指标  \n**成功KPI：**≥ 60%家庭在危险峰值2小时内阅读警报\n\n**范围亮点：**\n- **利益相关者星座电话（T-21天）**将水质警报在阈值突破30分钟内设为不可协商要求\n- **可访问性审计**确保SMS内容<160字符、简单语言、双语（英语+本地语言）\n- **技术章程**批准使用托管在NGO服务器上的开源LLM（Mistral 7B-Instruct）→ 无PII离开区域"
    },
    {
      "id": "section-22-2",
      "title": "22.2 远程冲刺议程（3×4小时窗口）",
      "type": "content",
      "content": "| UTC时段 | 主要活动 | AI辅助 | 输出 |\n|-----------|------------------|-----------|---------|\n| **第1天 14:00–18:00** | 共情微文档和AEIOU观察汇报 | Whisper + GPT摘要器 | 12个洞察聚类 |\n| **第2天 05:00–09:00** | HMW重构·脑书写6-3-5·SCAMPER | Gemini创意助力 | 96个想法，前6个概念 |\n| **第2天 14:00–18:00** | 纸质USSD流程·快速Figma可点击 | Galileo UI提示到模型 | 3个原型路径 |\n| **第3天 05:00–09:00** | 远程思考发声（社区代表） | 情感热图 | 问题日志、优先修复 |\n| **第3天 14:00–18:00** | 试点画布·RACI·AAR回顾幻灯片 | GPT回顾幻灯片 | 试点计划+回顾幻灯片 |\n\n**时区策略：**两个重叠群组（亚太上午/非洲-拉美下午）通过BoardX交接工件；异步视频日记填补空隙。"
    },
    {
      "id": "section-22-3",
      "title": "22.3 原型与试点结果",
      "type": "content",
      "content": "**概念：**USSD + SMS混合：用户拨打*120代码 → 接收本地水风险评分（绿/黄/红）加简单缓解提示（煮沸、过滤、氯化）\n\n**绿野仙踪：**LLM回答USSD查询；NGO运营团队通过Twilio发送SMS\n\n**90天试点数据（n = 18,213个家庭）：**\n\n| 指标 | 目标 | 实现 | 注释 |\n|--------|--------|----------|-------|\n| **警报打开率（2小时）** | 60% | 74% | 未打开者自动重发SMS |\n| **报告胃肠病例（自报）** | -10% | -14.7% | 相关性，非因果证明 |\n| **成本/家庭/年** | <$0.50 | $0.31 | 批量SMS折扣 |\n| **社区信任指数*** | 基线3.2 | 4.6 | 李克特1–5（*感知代理） |"
    },
    {
      "id": "section-22-4",
      "title": "22.4 创意信心影响",
      "type": "content",
      "content": "| 地区 | CCS-10前测 | CCS-10后测 | Δ |\n|--------|------------|-------------|---|\n| **开普敦** | 5.2 | 8.5 | +3.3 |\n| **孟买** | 5.9 | 9.1 | +3.2 |\n| **圣保罗** | 6.1 | 9.0 | +2.9 |\n| **马尼拉** | 5.4 | 8.6 | +3.2 |\n| **总体** | 5.7 | 8.8 | +3.1 |\n\n**我从没想过我能从乡村信息亭共同设计技术。** — 社区志愿者，西开普省"
    },
    {
      "id": "section-22-5",
      "title": "22.5 经验教训",
      "type": "content",
      "content": "| 主题 | 洞察 | 行动 |\n|-------|---------|--------|\n| **低技术胜出** | USSD参与度比智能手机应用高4:1 | 早期默认使用最低通用技术 |\n| **语言简洁性** | ≤120字符消息开放率高12% | 运行可读性检查器（等级≤5） |\n| **信任锚点** | SMS中包含本地医疗工作者姓名↑可信度 | 在模板中添加变量{local_contact}标记 |\n| **模型选择** | 本地Mistral保持延迟<500毫秒，缓解隐私担忧 | 维护微调检查点以备更新 |"
    },
    {
      "id": "section-22-6",
      "title": "22.6 NGO复制技巧",
      "type": "content",
      "content": "1. **分散引导**——指派地区联合负责人桥接时区和文化\n2. **预翻译资产**——冲刺前加载双语便签包\n3. **利用社区广播**作为备用广播；整合到试点范围\n4. **使用话费激励**——用微充值奖励调查完成；3倍响应率"
    },
    {
      "id": "section-22-7",
      "title": "22.7 工具包链接",
      "type": "interactive",
      "content": "- **USSD流程Figma文件**\n- **SMS消息库（15种语言）**\n- **Mistral微调配方（.yaml）**\n- **影响仪表板模板（Metabase）**\n\n**（捆绑包：createx.us/case-water4all）**\n\n## 关键要点\n\n- **当交接仪式和时区重叠经过精心设计时，纯远程冲刺可以产生高风险社会影响**\n- **将超低技术渠道与本地AI结合**同时满足可访问性和隐私需求\n- **清晰的早期成功指标**（警报阅读率）让多样化的NGO保持激光聚焦\n- **当本地志愿者共同领导测试和消息传递时，社区信任和创意信心激增**\n\n## 引导师检查清单摘录\n\n☐ 时区交接时间表已记录  \n☐ 电信合作伙伴预配置  \n☐ 双语资产已导入  \n☐ 本地模型已测试  \n☐ 试点KPI仪表板上线\n\n## 反思问题\n\n1. 你如何调整远程引导技术以桥接显著的时区和文化差异？\n2. 在你的环境中，什么低技术解决方案可能比高技术替代方案更合适和可访问？\n3. 你将如何在社会影响倡议中建立社区信任并确保本地所有权？\n\n## 进一步资源\n\n- **远程引导：**时区协调策略、异步交接协议、全球团队管理\n- **社会影响设计：**社区驱动发展、信任建立框架、可访问技术方法\n- **道德AI：**本地部署、隐私保护技术、社区同意协议"
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
    moduleTitle: '案例研究：非营利组织',
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
    moduleTitle: 'Case Study: Nonprofit',
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
                    {uiText.chapter} 22
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
                    href={`/${params.lang}/modules/case-study-education`}
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

const CaseStudyNonprofitPage = withModuleProgress(
  CaseStudyNonprofitComponent,
  'case-study-nonprofit',
  7
);

export default CaseStudyNonprofitPage;
