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

function CommunityPracticeComponent({
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
      "id": "section-27-0",
      "title": "27.0 Why a Community of Practice (CoP)?",
      "type": "interactive",
      "content": "While the certification path maps individual growth, the CreateX CoP unlocks collective intelligence—a living network where facilitators:\n\n- **Share emerging methods & AI tricks**\n- **Co-solve workshop challenges** in real time\n- **Mentor new explorers** and co-author global initiatives\n\n**Mantra:** \"Learn in public, level-up together.\""
    },
    {
      "id": "section-27-1",
      "title": "27.1 Community Structure",
      "type": "content",
      "content": "| Layer | Purpose | Key Spaces |\n|-------|---------|------------|\n| **Open Commons** | Wide sharing of templates, case studies, public events | createx.us, GitHub, LinkedIn page |\n| **Guild Channels** | Domain-focused rooms (AI-Prompts, Education, Non-Profit, Ops) | Discord server |\n| **Cohorts** | Time-boxed learning or project groups (Guide Camp, AI Ethics Lab) | Zoom / BoardX |\n| **Steward Council** | Elected nine-member body governing standards, ethics, roadmap | Monthly public minutes |"
    },
    {
      "id": "section-27-2",
      "title": "27.2 On-Boarding Path (48-Hour Plan)",
      "type": "content",
      "content": "| Hour | Action | Outcome |\n|------|--------|---------|\n| **0** | Accept invite → createx.us/signup | Account & profile |\n| **1** | Post intro in #welcome (name, super-power, time-zone) | Visibility |\n| **6** | Browse Template Library; clone one canvas | First contribution idea |\n| **12** | Attend 30-min \"Community Walkthrough\" live or recording | System understanding |\n| **24** | Comment helpful feedback on another member's post | Reciprocity |\n| **48** | Share mini-win (#first-share channel) | Positive reinforcement |"
    },
    {
      "id": "section-27-3",
      "title": "27.3 Core Rituals & Cadence",
      "type": "content",
      "content": "| Ritual | Cadence | Description |\n|--------|---------|-------------|\n| **Fac-Lab Live** | Weekly (60 min) | Rotating facilitator demos new technique; live critique |\n| **Prompt Jam** | Bi-weekly (30 min) | Rapid AI-prompt co-creation; votes top three |\n| **Method Hackathon** | Quarterly (48 h async) | Teams remix existing method → publish v1.0 template |\n| **CreateX Summit** | Annual (3 days hybrid) | Keynotes, lightning talks, badge ceremonies |\n| **Retro Circle** | Monthly (45 min) | Community AAR; governance feedback to Council |"
    },
    {
      "id": "section-27-4",
      "title": "27.4 Contribution Pathways",
      "type": "content",
      "content": "| Contribution | Impact Units² | Badge Unlock |\n|--------------|---------------|--------------|\n| **Publish new template (CC-BY-SA)** | 3 | Template Author |\n| **Peer-review another's portfolio** | 2 | Reviewer |\n| **Mentor Explorer for 4 hours** | 2 | Mentor |\n| **Lead a Fac-Lab session** | 4 | Lab Host |\n| **Fix bug / add feature in BoardX open-source repo** | 5 | Open-Source Contributor |\n\n**² \"Impact Units\" feed into annual community recognition & travel-stipend awards.**"
    },
    {
      "id": "section-27-5",
      "title": "27.5 Tools & Tech Stack Overview",
      "type": "interactive",
      "content": "| Need | Tool | Access | Note |\n|------|------|--------|------|\n| **Chat & voice** | Discord | Channels gated by badge level |\n| **Canvas & templates** | BoardX Cloud | Unlimited use, private & shared boards |\n| **Repository** | GitHub (createx-org) | PRs with CC-BY-SA license check |\n| **Async docs** | Notion Wiki | Public read / member edit |\n| **Video hub** | Loom workspace | Recordings auto-synced to Wiki |\n| **Event calendar** | Luma | iCal subscription link |"
    },
    {
      "id": "section-27-6",
      "title": "27.6 Code of Conduct (excerpt)",
      "type": "content",
      "content": "1. **Be Kind, Assume Context Gaps**\n2. **Credit Creators, Cite Sources**\n3. **Flag Bias & Harm Quickly** (use /mod-alert)\n4. **No Promo Spam** (value > ask ratio 3:1)\n5. **Respect Privacy** (no PII in public channels)\n\n**Violations escalate:** Warning → Cooling-off → Council review → Badge suspension."
    },
    {
      "id": "section-27-7",
      "title": "27.7 Mentorship & Buddy Programs",
      "type": "content",
      "content": "| Program | Pairing Logic | Duration |\n|---------|---------------|----------|\n| **Explorer Buddy** | Time-zone + contrasting domain | 4 weeks · weekly 30 min |\n| **Guide Shadow** | Architect shadows Guide's live workshop | 1 workshop cycle |\n| **Architect Circle** | Trio from different regions rotate peer coaching | Ongoing · monthly |"
    },
    {
      "id": "section-27-8",
      "title": "27.8 Funding & Resource Pool",
      "type": "content",
      "content": "- **Open-Source Fund** — 10% of paid workshop revenue funds tooling bounties\n- **Travel Scholarships** — Cover up to 60% airfare for Summit speakers from under-represented regions\n- **Micro-grants ($500-$2,000)** — Prototype new methods; decided by community vote (Quadratic Funding model)"
    },
    {
      "id": "section-27-9",
      "title": "27.9 Growth Metrics (Community Health 2025 Q1)",
      "type": "content",
      "content": "| Metric | Value | Target |\n|--------|-------|--------|\n| **Active weekly members** | 1,820 | 2,000 |\n| **Avg posts / member / month** | 3.7 | 4.0 |\n| **Content reuse downloads / month** | 9,400 | 10,000 |\n| **Peer-review turnaround (days)** | 5.2 | ≤ 5 |\n| **Code-of-conduct incidents** | 0 major | Maintain 0 |"
    },
    {
      "id": "section-27-10",
      "title": "27.10 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Symptom | Mitigation |\n|---------|---------|------------|\n| **Lurker Plateau** | Many sign-ups, low posts | Launch monthly \"First-Share\" sprint; reward tokens |\n| **Time-Zone Silos** | Americas chat quiet during APAC | Rotate event times; asynchronous thread recaps |\n| **Contribution Overwhelm** | Newcomers unsure where to start | On-boarding wizard suggests top 3 quick actions |\n| **Knowledge Duplication** | Similar templates proliferate | Search before post reminder; curator merges |\n\n## Key Takeaways\n\n- **The CreateX CoP turns individual facilitators into a global learning engine**\n- **Clear layers**—Commons, Guilds, Cohorts, Council—balance openness with focus\n- **Contribution Impact Units and badges** drive recognition without gamification excess\n- **Strong rituals, robust tooling, and a firm Code of Conduct** keep the space vibrant and inclusive"
    },
    {
      "id": "section-27-12",
      "title": "27.12 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"Cultivating Communities of Practice\" (Wenger, McDermott & Snyder)\n- **Paper:** Gitcoin (2025) \"Quadratic Funding in Learning Networks\"\n- **Toolkit:** createx.us/toolkit/community-onboarding (intro deck, welcome bot script, badge guide)\n- **Podcast:** Community Pulse — Ep. 102 \"Designing Rituals for Distributed Creators\"\n\n## Facilitator Checklist\n\n☐ Sign-up complete  \n☐ Intro posted in #welcome  \n☐ Template cloned  \n☐ First feedback given  \n☐ Community walkthrough attended\n\n## Reflection Questions\n\n1. Which contribution pathways align best with your current skills and interests?\n2. How will you balance individual growth with community contribution?\n3. What specific value can you bring to the CreateX community based on your unique experience?\n\n## Further Resources\n\n- **Community Platforms:** Discord guilds, GitHub repositories, Notion Wiki, Loom video hub\n- **Learning Pathways:** Explorer Buddy program, Guide Shadow opportunities, Architect Circles\n- **Recognition Systems:** Impact Units tracking, Badge system, Travel scholarships, Micro-grants"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-27-0",
      "title": "27.0 为什么要建立实践共同体？",
      "type": "interactive",
      "content": "虽然认证路径映射个人成长，CreateX实践共同体解锁集体智慧——一个活跃的网络，引导师可以：\n\n- **分享新兴方法和AI技巧**\n- **实时共同解决工作坊挑战**\n- **指导新探索者**并共同撰写全球倡议\n\n**座右铭：**公开学习，共同升级。"
    },
    {
      "id": "section-27-1",
      "title": "27.1 社区结构",
      "type": "content",
      "content": "| 层级 | 目的 | 关键空间 |\n|-------|---------|------------|\n| **开放共享区** | 广泛分享模板、案例研究、公共活动 | createx.us、GitHub、LinkedIn页面 |\n| **行会频道** | 领域聚焦房间（AI提示、教育、非营利、运营） | Discord服务器 |\n| **队列** | 时间限定的学习或项目小组（指导营、AI伦理实验室） | Zoom / BoardX |\n| **管理委员会** | 选举产生的九成员机构，管理标准、伦理、路线图 | 每月公开会议纪要 |"
    },
    {
      "id": "section-27-2",
      "title": "27.2 入门路径（48小时计划）",
      "type": "content",
      "content": "| 小时 | 行动 | 结果 |\n|------|--------|---------|\n| **0** | 接受邀请 → createx.us/signup | 账户和档案 |\n| **1** | 在#welcome发布介绍（姓名、超能力、时区） | 可见性 |\n| **6** | 浏览模板库；克隆一个画布 | 第一个贡献想法 |\n| **12** | 观看30分钟 社区导览 直播或录像 | 系统理解 |\n| **24** | 对另一成员的帖子发表有用反馈 | 互惠性 |\n| **48** | 分享小胜利（#first-share频道） | 积极强化 |"
    },
    {
      "id": "section-27-3",
      "title": "27.3 核心仪式和节奏",
      "type": "content",
      "content": "| 仪式 | 频率 | 描述 |\n|--------|---------|-------------|\n| **引导师实验室直播** | 每周（60分钟） | 轮流引导师演示新技术；现场批评 |\n| **提示果酱** | 双周（30分钟） | 快速AI提示共创；投票选出前三名 |\n| **方法黑客马拉松** | 季度（48小时异步） | 团队重新混合现有方法→发布v1.0模板 |\n| **CreateX峰会** | 年度（3天混合） | 主题演讲、闪电演讲、徽章仪式 |\n| **复盘圈** | 月度（45分钟） | 社区AAR；向委员会提供治理反馈 |"
    },
    {
      "id": "section-27-4",
      "title": "27.4 贡献路径",
      "type": "content",
      "content": "| 贡献 | 影响单位² | 解锁徽章 |\n|--------------|---------------|--------------|\n| **发布新模板（CC-BY-SA）** | 3 | 模板作者 |\n| **同行评审他人作品集** | 2 | 评审员 |\n| **指导探索者4小时** | 2 | 导师 |\n| **主持引导师实验室会议** | 4 | 实验室主持人 |\n| **在BoardX开源库修复bug/添加功能** | 5 | 开源贡献者 |\n\n**²影响单位 纳入年度社区认可和旅行津贴奖励。**"
    },
    {
      "id": "section-27-5",
      "title": "27.5 工具和技术栈概览",
      "type": "interactive",
      "content": "| 需求 | 工具 | 访问权限 | 备注 |\n|------|------|--------|------|\n| **聊天和语音** | Discord | 按徽章级别划分频道权限 |\n| **画布和模板** | BoardX Cloud | 无限使用，私人和共享板 |\n| **代码库** | GitHub (createx-org) | PR需CC-BY-SA许可检查 |\n| **异步文档** | Notion Wiki | 公开阅读/成员编辑 |\n| **视频中心** | Loom工作区 | 录像自动同步到Wiki |\n| **活动日历** | Luma | iCal订阅链接 |"
    },
    {
      "id": "section-27-6",
      "title": "27.6 行为准则（节选）",
      "type": "content",
      "content": "1. **友善待人，假设语境差异**\n2. **归功创作者，引用来源**\n3. **快速标记偏见和伤害**（使用/mod-alert）\n4. **禁止推广垃圾信息**（价值>要求比例3:1）\n5. **尊重隐私**（公共频道无个人信息）\n\n**违规升级：**警告→冷静期→委员会审查→徽章暂停。"
    },
    {
      "id": "section-27-7",
      "title": "27.7 导师制和伙伴计划",
      "type": "content",
      "content": "| 计划 | 配对逻辑 | 持续时间 |\n|---------|---------------|----------|\n| **探索者伙伴** | 时区+对比领域 | 4周·每周30分钟 |\n| **指导跟随** | 架构师跟随引导师的现场工作坊 | 1个工作坊周期 |\n| **架构师圈** | 来自不同地区的三人组轮流同伴指导 | 持续·月度 |"
    },
    {
      "id": "section-27-8",
      "title": "27.8 资金和资源池",
      "type": "content",
      "content": "- **开源基金**——付费工作坊收入的10%资助工具赏金\n- **旅行奖学金**——为来自代表性不足地区的峰会演讲者承担高达60%的机票费用\n- **微型赠款（$500-$2,000）**——原型新方法；由社区投票决定（二次融资模型）"
    },
    {
      "id": "section-27-9",
      "title": "27.9 增长指标（2025年Q1社区健康）",
      "type": "content",
      "content": "| 指标 | 数值 | 目标 |\n|--------|-------|--------|\n| **每周活跃成员** | 1,820 | 2,000 |\n| **平均每成员每月帖子数** | 3.7 | 4.0 |\n| **内容重用下载/月** | 9,400 | 10,000 |\n| **同行评审周转时间（天）** | 5.2 | ≤ 5 |\n| **行为准则事件** | 0严重 | 保持0 |"
    },
    {
      "id": "section-27-10",
      "title": "27.10 常见陷阱和解决方案",
      "type": "content",
      "content": "| 陷阱 | 症状 | 缓解措施 |\n|---------|---------|------------|\n| **潜水者高原** | 注册多，发帖少 | 启动月度 首次分享 冲刺；奖励代币 |\n| **时区孤岛** | 亚太地区聊天时美洲聊天冷清 | 轮换活动时间；异步主题回顾 |\n| **贡献压力** | 新人不确定从哪开始 | 入门向导建议前3个快速行动 |\n| **知识重复** | 类似模板激增 | 发帖前搜索提醒；策展人合并 |\n\n## 关键要点\n\n- **CreateX实践共同体将个人引导师转变为全球学习引擎**\n- **清晰层级**——共享区、行会、队列、委员会——平衡开放性与专注性\n- **贡献影响单位和徽章**推动认可而不过度游戏化\n- **强有力的仪式、强大的工具和严格的行为准则**保持空间活跃和包容"
    },
    {
      "id": "section-27-12",
      "title": "27.12 实地笔记和进一步阅读",
      "type": "content",
      "content": "- **书籍：**《培育实践共同体》（Wenger, McDermott & Snyder）\n- **论文：**Gitcoin (2025) 学习网络中的二次融资 \n- **工具包：**createx.us/toolkit/community-onboarding（介绍幻灯片、欢迎机器人脚本、徽章指南）\n- **播客：**Community Pulse——第102集 为分布式创作者设计仪式 \n\n## 引导师检查清单\n\n☐ 注册完成  \n☐ 在#welcome发布介绍  \n☐ 克隆模板  \n☐ 给出第一个反馈  \n☐ 参加社区导览\n\n## 反思问题\n\n1. 哪些贡献路径最符合你当前的技能和兴趣？\n2. 你将如何平衡个人成长与社区贡献？\n3. 基于你的独特经验，你能为CreateX社区带来什么特定价值？\n\n## 进一步资源\n\n- **社区平台：**Discord行会、GitHub仓库、Notion Wiki、Loom视频中心\n- **学习路径：**探索者伙伴计划、指导跟随机会、架构师圈\n- **认可系统：**影响单位跟踪、徽章系统、旅行奖学金、微型赠款"
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
    moduleTitle: '实践共同体',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个',
    courseComplete: '课程完成'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Community of Practice',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next',
    courseComplete: 'Course Complete'
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
                    {uiText.chapter} 27
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
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-400 text-white rounded-lg font-medium">
                    <span>{uiText.courseComplete}</span>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>    );
}

const CommunityPracticePage = withModuleProgress(
  CommunityPracticeComponent,
  'community-practice',
  8
);

export default CommunityPracticePage;
