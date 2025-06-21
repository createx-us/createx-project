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

function CaseStudyEducationComponent({
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
      "id": "section-23-0",
      "title": "23.0 Snapshot",
      "type": "content",
      "content": "| Item | Detail |\n|------|---------|\n| **Institution** | TechU — Mid-sized polytechnic university (Michigan, USA) |\n| **Course** | \"Applied Design Thinking & AI\" — 14-week, 3-credit studio (Junior/Senior) |\n| **Enrollment** | 48 students (CS, Business, Industrial Design, Education majors) |\n| **Facilitators** | 1 professor of practice + 2 CreateX co-facilitators (weekly labs) |\n| **Pedagogy Model** | Flipped classroom lectures (+) weekly CreateX micro-sprints |\n| **Outcome Highlights** | • 12 team prototypes → 4 campus pilots → 1 spin-out startup<br>• Average Creative Confidence (CCS-10) 5.8 → 8.2 (+2.4)<br>• Course NPS +74, cited in accreditation review as \"signature experience\" |"
    },
    {
      "id": "section-23-1",
      "title": "23.1 Program Design",
      "type": "content",
      "content": "| Component | Design Choice | Rationale |\n|-----------|---------------|-----------|\n| **Semester Arc** | Two Double-Diamonds (7 weeks each) | Mirrors industry sprint cadence |\n| **Teams** | 4 × interdisciplinary teams of 12 | Cross-pollination & manageable advising load |\n| **Brief Sources** | Real campus challenges (food waste, mental-health triage, energy usage) | Authentic stake motivates students |\n| **AI Toolkit** | Campus-licensed ChatGPT Edu + open-source Mistral for code | Cost-effective, ethical training |"
    },
    {
      "id": "section-23-2",
      "title": "23.2 Week-By-Week Agenda (High-Level)",
      "type": "content",
      "content": "| Week | Focus & Key Deliverable | AI Integration |\n|------|-------------------------|----------------|\n| **1** | Kickoff · Empathy Interviews planned | Whisper Live demo |\n| **2** | Field Research · AEIOU docs | GPT auto-theme homework |\n| **3** | Affinity & Insight · HMW list | LLM cluster assist |\n| **4** | Ideation Marathon (Brainwriting, Crazy 8s) | Gemini idea seeds |\n| **5** | Prototype #1 (Paper + Figma) | Galileo prompt-to-UI tutorial |\n| **6** | User Testing Round 1 · AAR | Sentiment dashboard |\n| **7** | Mid-term Critique · Pivot / Persevere | GPT feedback digest |\n| **8–13** | Repeat Diamond #2 (refined scope) | Ongoing AI pairing |\n| **14** | Final Demo Day · Pilot Canvas & KPI board | Auto-subtitled highlight reels |\n\n**All sessions delivered as 3-hour Friday labs; lectures pre-recorded (flipped model).**"
    },
    {
      "id": "section-23-3",
      "title": "23.3 Sample Team Outcome — \"PeerPal\"",
      "type": "content",
      "content": "| Category | Detail |\n|----------|---------|\n| **Problem** | Rising freshman anxiety, counseling backlog 3 weeks |\n| **Solution** | Peer-support matching app → triage chatbot → warm hand-off |\n| **Prototype** | Click-through Figma + Wizard-of-Oz GPT chat |\n| **Pilot** | 60 volunteers, 4 weeks, 1,200 messages |\n| **Metrics** | Avg wait for chat: 3 min vs 3 weeks; 92% helpful rating |\n| **Next Step** | University innovation fund seed $25k (Jan 2026 launch) |"
    },
    {
      "id": "section-23-4",
      "title": "23.4 Creative Confidence & Skill Gains",
      "type": "content",
      "content": "| Metric | Pre-Course | Post-Midterm | Final | Δ |\n|--------|------------|--------------|-------|---|\n| **CCS-10 (avg)** | 5.8 | 7.3 | 8.2 | +2.4 |\n| **AI Prompting Self-Efficacy¹ (1-10)** | 3.1 | — | 7.4 | +4.3 |\n| **Team NPS** | — | +48 | +67 | — |\n\n**¹ Custom mini-survey (3 items).**\n\n**\"I now treat AI like a sketch partner, not a vending machine.\"** — Design major"
    },
    {
      "id": "section-23-5",
      "title": "23.5 Assessment & Grading Schema",
      "type": "interactive",
      "content": "| Weight | Artifact | Rubric Key |\n|--------|----------|------------|\n| **25%** | Research Insight Report | Depth, evidence, empathy |\n| **25%** | Prototype & Test Cycles | Fidelity matched to question, learning loops |\n| **20%** | Reflection Journals (weekly) | Honesty, insight, growth mindset |\n| **15%** | Peer Evaluation | Contribution, collaboration |\n| **15%** | Final Demo & Pilot Plan | Storytelling, feasibility, KPI clarity |\n\n**Rubric aligned with ABET soft-skill outcomes (teamwork, communication, ethics).**"
    },
    {
      "id": "section-23-6",
      "title": "23.6 Faculty & Stakeholder Feedback",
      "type": "content",
      "content": "| Quote | Stakeholder |\n|-------|-------------|\n| **\"This studio produced the most market-ready ideas I've seen in 20 years.\"** | TechU Entrepreneurship Director |\n| **\"Students who took the course perform better in capstone collaboration.\"** | CS Dept Chair |\n| **\"The AI ethics checklist became a template for our whole innovation office.\"** | University Counsel |"
    },
    {
      "id": "section-23-7",
      "title": "23.7 Lessons Learned & Adjustments",
      "type": "content",
      "content": "| Dimension | Insight | Next Iteration |\n|-----------|---------|----------------|\n| **Time-Zone Inclusion (Intl students)** | Late-night Friday lab for some | Offer alt Tuesday AM section |\n| **Tool Fatigue** | Students toggled 5 apps | Consolidate into BoardX + Figma only |\n| **AI Over-reliance** | Early Shallow ideation in Week 2 | Mandate \"manual first, AI second\" rule |"
    },
    {
      "id": "section-23-8",
      "title": "23.8 Replication Guide",
      "type": "content",
      "content": "1. **Secure Real-World Briefs** — Partner with campus ops or local NGOs for authentic challenges\n2. **Flip Lectures** — Free studio time for hands-on sprints\n3. **Leverage Peer Teaching** — Student \"method leads\" run warm-ups, reducing facilitator load\n4. **Integrate Ethics Early** — Dedicated Week 2 module on AI bias & privacy builds critical lens"
    },
    {
      "id": "section-23-9",
      "title": "23.9 Toolkit Links",
      "type": "interactive",
      "content": "- **Syllabus template** (.docx)\n- **14-week slide deck master** (.pptx)\n- **Rubric sheets** (Research, Prototype, Reflection)\n- **GPT prompt bank** for student reference\n\n**(Bundle: createx.us/case-techu)**\n\n## Key Takeaways\n\n- **Semester-long immersion** with Double-Diamond + AI fosters sustained creative confidence and tangible pilots\n- **Flipped content plus weekly micro-sprints** maximize hands-on learning\n- **Authentic university problems** create stakeholder ownership and funding pathways\n- **Structured reflection & peer assessment** deepen metacognition and collaboration skills\n\n## Facilitator Checklist Extract\n\n☐ Real briefs confirmed with campus partners  \n☐ Flipped videos uploaded before Week 1  \n☐ AI ethics module prepared  \n☐ Weekly journal prompts scheduled  \n☐ Demo Day stakeholders invited\n\n## Reflection Questions\n\n1. How can you adapt the flipped classroom model to your educational or training context?\n2. What authentic, real-world challenges could provide meaningful learning opportunities for your participants?\n3. How will you balance AI integration with developing fundamental human-centered design skills?\n\n## Further Resources\n\n- **Academic Integration:** Semester arc design, Assessment rubrics, Peer evaluation frameworks\n- **Pedagogical Tools:** Flipped classroom resources, Micro-sprint templates, Reflection journal prompts\n- **Partnership Development:** Campus stakeholder engagement, Real-world brief sourcing, Pilot funding pathways"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-23-0",
      "title": "23.0 概况",
      "type": "content",
      "content": "| 项目 | 详情 |\n|------|---------|\n| **机构** | TechU — 中型理工大学（美国密歇根州） |\n| **课程** | 应用设计思维与AI — 14周，3学分工作室（大三/大四） |\n| **注册人数** | 48名学生（计算机科学、商业、工业设计、教育专业） |\n| **引导师** | 1名实践教授 + 2名CreateX联合引导师（每周实验室） |\n| **教学模式** | 翻转课堂讲座 (+) 每周CreateX微冲刺 |\n| **成果亮点** | • 12个团队原型 → 4个校园试点 → 1个分拆创业公司<br>• 平均创意信心（CCS-10）5.8 → 8.2 (+2.4)<br>• 课程NPS +74，在认证审查中被称为标志性体验 |"
    },
    {
      "id": "section-23-1",
      "title": "23.1 项目设计",
      "type": "content",
      "content": "| 组成部分 | 设计选择 | 理由 |\n|-----------|---------------|-----------|\n| **学期弧线** | 两个双钻石（各7周） | 镜像行业冲刺节奏 |\n| **团队** | 4 × 12人跨学科团队 | 交叉授粉和可管理的指导负荷 |\n| **简报来源** | 真实校园挑战（食物浪费、心理健康分诊、能源使用） | 真实利益激励学生 |\n| **AI工具包** | 校园授权ChatGPT Edu + 开源Mistral用于代码 | 成本效益、伦理培训 |"
    },
    {
      "id": "section-23-2",
      "title": "23.2 逐周议程（高层次）",
      "type": "content",
      "content": "| 周次 | 重点与关键交付物 | AI整合 |\n|------|-------------------------|----------------|\n| **1** | 启动·共情访谈计划 | Whisper Live演示 |\n| **2** | 实地研究·AEIOU文档 | GPT自动主题作业 |\n| **3** | 亲和与洞察·HMW列表 | LLM聚类辅助 |\n| **4** | 创意马拉松（脑书写，疯狂8） | Gemini创意种子 |\n| **5** | 原型#1（纸质+Figma） | Galileo提示到UI教程 |\n| **6** | 用户测试第1轮·AAR | 情感仪表板 |\n| **7** | 期中评判·转向/坚持 | GPT反馈摘要 |\n| **8–13** | 重复钻石#2（精炼范围） | 持续AI配对 |\n| **14** | 最终演示日·试点画布和KPI板 | 自动字幕亮点视频 |\n\n**所有会议以3小时周五实验室形式交付；讲座预录（翻转模式）。**"
    },
    {
      "id": "section-23-3",
      "title": "23.3 样本团队成果 — PeerPal",
      "type": "content",
      "content": "| 类别 | 详情 |\n|----------|---------|\n| **问题** | 新生焦虑上升，咨询积压3周 |\n| **解决方案** | 同伴支持匹配应用 → 分诊聊天机器人 → 温暖交接 |\n| **原型** | 点击通过Figma + 绿野仙踪GPT聊天 |\n| **试点** | 60名志愿者，4周，1,200条消息 |\n| **指标** | 平均聊天等待：3分钟vs 3周；92%有用评级 |\n| **下一步** | 大学创新基金种子资金$25k（2026年1月启动） |"
    },
    {
      "id": "section-23-4",
      "title": "23.4 创意信心与技能增长",
      "type": "content",
      "content": "| 指标 | 课前 | 期中后 | 最终 | Δ |\n|--------|------------|--------------|-------|---|\n| **CCS-10（平均）** | 5.8 | 7.3 | 8.2 | +2.4 |\n| **AI提示自我效能¹（1-10）** | 3.1 | — | 7.4 | +4.3 |\n| **团队NPS** | — | +48 | +67 | — |\n\n**¹ 定制迷你调查（3项）。**\n\n**我现在把AI当作素描伙伴，而不是自动售货机。** — 设计专业学生"
    },
    {
      "id": "section-23-5",
      "title": "23.5 评估与评分方案",
      "type": "interactive",
      "content": "| 权重 | 产出物 | 评分标准关键 |\n|--------|----------|------------|\n| **25%** | 研究洞察报告 | 深度、证据、共情 |\n| **25%** | 原型与测试循环 | 保真度匹配问题、学习循环 |\n| **20%** | 反思日志（每周） | 诚实、洞察、成长心态 |\n| **15%** | 同伴评价 | 贡献、协作 |\n| **15%** | 最终演示与试点计划 | 叙事、可行性、KPI清晰度 |\n\n**评分标准与ABET软技能成果一致（团队合作、沟通、伦理）。**"
    },
    {
      "id": "section-23-6",
      "title": "23.6 教职员工与利益相关者反馈",
      "type": "content",
      "content": "| 引用 | 利益相关者 |\n|-------|-------------|\n| **这个工作室产生了我20年来见过的最具市场准备度的想法。** | TechU创业总监 |\n| **选修这门课的学生在毕业设计协作中表现更好。** | 计算机系主任 |\n| **AI伦理检查清单成为我们整个创新办公室的模板。** | 大学法律顾问 |"
    },
    {
      "id": "section-23-7",
      "title": "23.7 经验教训与调整",
      "type": "content",
      "content": "| 维度 | 洞察 | 下次迭代 |\n|-----------|---------|----------------|\n| **时区包容性（国际学生）** | 对一些人来说周五晚上实验室太晚 | 提供替代周二上午课程 |\n| **工具疲劳** | 学生切换5个应用 | 仅整合到BoardX + Figma |\n| **AI过度依赖** | 第2周早期浅层创意 | 强制手动优先，AI次之规则 |"
    },
    {
      "id": "section-23-8",
      "title": "23.8 复制指南",
      "type": "content",
      "content": "1. **确保真实世界简报** — 与校园运营或本地NGO合作进行真实挑战\n2. **翻转讲座** — 为动手冲刺释放工作室时间\n3. **利用同伴教学** — 学生方法负责人运行热身，减少引导师负荷\n4. **早期整合伦理** — 专门的第2周AI偏见和隐私模块建立批判性视角"
    },
    {
      "id": "section-23-9",
      "title": "23.9 工具包链接",
      "type": "interactive",
      "content": "- **教学大纲模板**（.docx）\n- **14周幻灯片组大师版**（.pptx）\n- **评分表**（研究、原型、反思）\n- **GPT提示库**供学生参考\n\n**（捆绑包：createx.us/case-techu）**\n\n## 关键要点\n\n- **学期沉浸式**与双钻石+AI培养持续的创意信心和有形试点\n- **翻转内容加每周微冲刺**最大化动手学习\n- **真实大学问题**创造利益相关者所有权和资金路径\n- **结构化反思和同伴评估**深化元认知和协作技能\n\n## 引导师检查清单摘录\n\n☐ 与校园合作伙伴确认真实简报  \n☐ 第1周前上传翻转视频  \n☐ 准备AI伦理模块  \n☐ 安排每周日志提示  \n☐ 邀请演示日利益相关者\n\n## 反思问题\n\n1. 你如何将翻转课堂模式适应到你的教育或培训环境？\n2. 什么真实的、现实世界的挑战能为你的参与者提供有意义的学习机会？\n3. 你将如何平衡AI整合与发展基本以人为中心的设计技能？\n\n## 进一步资源\n\n- **学术整合：**学期弧线设计、评估评分标准、同伴评价框架\n- **教学工具：**翻转课堂资源、微冲刺模板、反思日志提示\n- **合作伙伴发展：**校园利益相关者参与、现实世界简报来源、试点资金路径"
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
    moduleTitle: '案例研究：教育',
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
    moduleTitle: 'Case Study: Education',
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
                    {uiText.chapter} 23
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
              <span>40 {uiText.minutes}</span>
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
                    href={`/${params.lang}/modules/analytics-kpis`}
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

const CaseStudyEducationPage = withModuleProgress(
  CaseStudyEducationComponent,
  'case-study-education',
  7
);

export default CaseStudyEducationPage;
