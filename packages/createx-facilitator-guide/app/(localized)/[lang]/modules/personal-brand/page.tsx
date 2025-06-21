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

function PersonalBrandComponent({
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
      "id": "section-26-0",
      "title": "26.0 Opening Story",
      "type": "content",
      "content": "\"People hired me before they hired CreateX.\"\n\nIn 2023, facilitator Marco Nguyen began posting 60-second LinkedIn recaps after every workshop—highlight reels, top insights, and a single photo of sticky-note chaos. Within six months he was invited to speak at three conferences and tripled his paid engagements. Marco's takeaway: visibility amplifies competence; a clear personal brand pulls opportunities toward you."
    },
    {
      "id": "section-26-1",
      "title": "26.1 Why a Personal Brand?",
      "type": "content",
      "content": "- **Trust Accelerator** — Clients book humans, not toolkits\n- **Opportunity Magnet** — Speaking, authorship, higher-tier gigs\n- **Impact Multiplier** — Shared stories inspire others to adopt design thinking + AI ethics\n- **Career Resilience** — A portable reputation transcends job titles and geographies"
    },
    {
      "id": "section-26-2",
      "title": "26.2 Brand Building Blocks (4 C's)",
      "type": "content",
      "content": "| Component | Guiding Questions | Quick Exercise |\n|-----------|-------------------|----------------|\n| **Clarity** | What 3 words describe your facilitation super-power? | Ask 5 peers, collect adjectives |\n| **Consistency** | Does your messaging & visual style stay coherent across channels? | Audit last 10 posts; note palette & tone |\n| **Credibility** | What proof-points (case studies, metrics) back your claims? | Draft 3-bullet \"impact snapshot\" |\n| **Community** | Where do your peers & prospects already gather? | Map top 3 platforms (LinkedIn, Discord, local meetup) |"
    },
    {
      "id": "section-26-3",
      "title": "26.3 Signature Content Formats",
      "type": "content",
      "content": "| Format | Cadence | Tips |\n|--------|---------|------|\n| **Workshop Recap Carousel (LinkedIn)** | 48 h post-event | 5 slides max: WHY–HOW–WOW–NEXT–CALL |\n| **Method Explainer Thread (X/Twitter)** | Weekly | 280-char snippets + diagram GIF |\n| **AI Prompt Walkthrough Video (YouTube/IG Reels)** | Monthly | < 90 s; show result before steps |\n| **Case Study Blog (Medium or GhostCMS)** | Quarterly | 1,200–1,500 w · KPI table · download link |\n| **Live AMA (Discord/Spaces)** | Ad-hoc | Collect Qs in advance; reuse clip highlights |\n\n**AI Assist:** Use GPT-rewrite to tailor the same core insight to each channel's voice limit."
    },
    {
      "id": "section-26-4",
      "title": "26.4 Story Bank System",
      "type": "content",
      "content": "1. **Capture** — Immediately after workshop, record a 2-min voice memo (\"What surprised me?\")\n2. **Tag** — Label memo with hashtags (#conflict #airescue #wowmetric)\n3. **Archive** — Store in Notion DB with date, client, theme\n4. **Transform** — At week's end pick 1 memo → convert into LinkedIn carousel\n5. **Recycle** — Quarterly bundle related stories into conference talk deck"
    },
    {
      "id": "section-26-5",
      "title": "26.5 Visual Identity Starter Kit",
      "type": "content",
      "content": "| Element | Recommendation |\n|---------|----------------|\n| **Color Palette** | 2 primaries + 1 accent (align with CreateX if desired) |\n| **Typography** | Readable sans-serif for body; distinctive heading font |\n| **Logo / Mark** | Simple monogram / symbol; optional (badge overlay) |\n| **Imagery** | Real workshop photos > stock; consistent filter or LUT |\n| **Icon Set** | Use Tabler Icons or Feather for consistency in slides |\n\n**Tool:** Canva Brand Kit or Figma design system page."
    },
    {
      "id": "section-26-6",
      "title": "26.6 Proof-Point Portfolio Framework",
      "type": "content",
      "content": "| Section | What to Include | Evidence |\n|---------|-----------------|----------|\n| **About** | 1-paragraph origin + mission | Personal photo |\n| **Case Studies (3)** | Challenge, CreateX method, KPI impact | Recap deck link |\n| **Testimonials (5)** | One-sentence quotes | Screenshot + logo |\n| **Metrics** | AoCC total, average CCD, NPS | Dashboard snippet |\n| **Badges & Certifications** | Explorer → Architect | Blockchain badge URL |\n\n**Host on personal domain or Notion site; QR code on slides.**"
    },
    {
      "id": "section-26-7",
      "title": "26.7 Networking Flywheel",
      "type": "content",
      "content": "```\nPost content ➜ Trigger discussion ➜ DM follow-up ➜\nVirtual coffee ➜ Offer micro-help (template/prompt) ➜\nSecure collaboration ➜ Capture success story ➜ Post again\n```\n\n**Principle:** Give 3 × value before asking."
    },
    {
      "id": "section-26-8",
      "title": "26.8 Thought Leadership Path",
      "type": "content",
      "content": "| Stage | Activity | Goal |\n|-------|----------|------|\n| **Seed** | Curate & comment on industry articles | Build topical awareness |\n| **Grow** | Publish original tutorials & lessons learned | Demonstrate expertise |\n| **Bloom** | Speak at webinars, podcasts | Reach wider audiences |\n| **Harvest** | Write ebook / course | Passive income & authority |\n\n**CreateX supports with Speaker-Pitch templates, CFP trackers, and Summit mentorship slots.**"
    },
    {
      "id": "section-26-9",
      "title": "26.9 Metrics for Personal Brand Health",
      "type": "content",
      "content": "| KPI | Target | Tool |\n|-----|--------|------|\n| **Content Consistency** | ≥ 2 posts / week | Buffer schedule |\n| **Engagement Rate** | > 3% | LinkedIn Shield analytics |\n| **Inbound Collab Inquiries** | ≥ 2 / month | Notion CRM |\n| **Referral Source Diversity** | ≥ 3 channels (web, social, word-of-mouth) | Tag in CRM |\n| **Peer Recommendations** | ≥ 2 new LinkedIn recs / year | Campaign post-project |"
    },
    {
      "id": "section-26-10",
      "title": "26.10 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Symptom | Remedy |\n|---------|---------|---------|\n| **Brand Blur** | Mixed messages, random visuals | Audit & create brand guide (one-pager) |\n| **Inconsistent Posting** | Bursts then silence | Batch-produce content, use schedulers |\n| **Vanity Metrics Obsession** | Chase likes, ignore leads | Track engagement quality & inquiries |\n| **Imposter Syndrome** | Delay publishing | Start with curated posts + quick wins |\n| **Over-Self-Promotion** | Audience fatigue | Apply 70% give / 30% ask rule |\n\n## Key Takeaways\n\n- **Clarity · Consistency · Credibility · Community** form your brand core\n- **Choose signature content formats** you can sustain; repurpose across channels\n- **Build a story bank** to feed relentless content without burnout\n- **A lightweight visual identity** amplifies recognition, but substance trumps polish\n- **Track simple KPIs** to steer efforts and celebrate growth"
    },
    {
      "id": "section-26-12",
      "title": "26.12 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"Show Your Work!\" (Austin Kleon)\n- **Paper:** LinkedIn (2024) \"Creator Engagement Benchmarks\"\n- **Toolkit:** createx.us/toolkit/personal-brand-starter (brand guide template, carousel mock-ups, Notion CRM board)\n- **Podcast:** Brand Builders Lab — Ep. 58 \"Thought Leadership for Facilitators\"\n\n## Facilitator Checklist\n\n☐ 3-word brand essence defined  \n☐ Story bank set up  \n☐ Visual kit drafted  \n☐ Portfolio page live  \n☐ Content schedule loaded in Buffer\n\n## Reflection Questions\n\n1. What unique perspective or expertise can you bring to the facilitation community that others would value?\n2. Which content formats align best with your natural communication style and time availability?\n3. How will you balance authentic sharing with professional positioning?\n\n## Further Resources\n\n- **Brand Development:** 4 C's framework, Visual identity starter kit, Portfolio framework\n- **Content Creation:** Signature formats, Story bank system, Networking flywheel\n- **Growth Tracking:** Brand health metrics, Thought leadership path, Common pitfall remedies"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-26-0",
      "title": "26.0 开场故事",
      "type": "content",
      "content": "人们先雇用我，然后再雇用CreateX。\n\n2023年，引导师Marco Nguyen开始在每次工作坊后发布60秒的LinkedIn回顾——精彩片段、核心见解和一张便签混乱的照片。六个月内，他受邀在三个会议上演讲，付费参与增加了三倍。Marco的心得：可见度放大能力；清晰的个人品牌会将机会拉向你。"
    },
    {
      "id": "section-26-1",
      "title": "26.1 为什么需要个人品牌？",
      "type": "content",
      "content": "- **信任加速器**——客户雇用人，而不是工具包\n- **机会磁铁**——演讲、写作、更高层次的业务\n- **影响倍增器**——分享的故事激励他人采用设计思维+AI伦理\n- **职业韧性**——便携的声誉超越职位头衔和地域"
    },
    {
      "id": "section-26-2",
      "title": "26.2 品牌构建基石（4C）",
      "type": "content",
      "content": "| 组成部分 | 指导问题 | 快速练习 |\n|-----------|-------------------|----------------|\n| **明确性（Clarity）** | 哪三个词描述你的引导超能力？ | 询问5位同事，收集形容词 |\n| **一致性（Consistency）** | 你的信息传递和视觉风格在各渠道保持一致吗？ | 审核最近10个帖子；注意调色板和语调 |\n| **可信度（Credibility）** | 什么证据（案例研究、指标）支持你的主张？ | 草拟3点 影响快照 |\n| **社区（Community）** | 你的同行和潜在客户已经聚集在哪里？ | 映射前3个平台（LinkedIn、Discord、本地聚会） |"
    },
    {
      "id": "section-26-3",
      "title": "26.3 签名内容格式",
      "type": "content",
      "content": "| 格式 | 频率 | 技巧 |\n|--------|---------|------|\n| **工作坊回顾轮播（LinkedIn）** | 活动后48小时 | 最多5张幻灯片：为什么—如何—哇—下一步—呼吁 |\n| **方法解释器线程（X/Twitter）** | 每周 | 280字符片段+图表GIF |\n| **AI提示演练视频（YouTube/IG Reels）** | 每月 | < 90秒；在展示步骤前先显示结果 |\n| **案例研究博客（Medium或GhostCMS）** | 季度 | 1,200–1,500字·KPI表格·下载链接 |\n| **现场问答（Discord/Spaces）** | 临时 | 提前收集问题；重用片段亮点 |\n\n**AI辅助：**使用GPT重写，为每个渠道的语音限制定制相同的核心见解。"
    },
    {
      "id": "section-26-4",
      "title": "26.4 故事库系统",
      "type": "content",
      "content": "1. **捕获**——工作坊结束后立即录制2分钟语音备忘（什么让我惊讶？）\n2. **标记**——用标签标记备忘（#冲突 #AI拯救 #哇指标）\n3. **存档**——存储在Notion数据库中，带有日期、客户、主题\n4. **转换**——周末选择1个备忘→转换为LinkedIn轮播\n5. **回收**——季度将相关故事打包成会议演讲幻灯片"
    },
    {
      "id": "section-26-5",
      "title": "26.5 视觉身份入门套件",
      "type": "content",
      "content": "| 元素 | 建议 |\n|---------|----------------|\n| **调色板** | 2个主色+1个强调色（如需要可与CreateX对齐） |\n| **字体** | 正文用可读无衬线字体；标题用独特字体 |\n| **标志/标记** | 简单字母组合/符号；可选（徽章叠加） |\n| **图像** | 真实工作坊照片>库存照片；一致的滤镜或LUT |\n| **图标集** | 在幻灯片中使用Tabler Icons或Feather保持一致 |\n\n**工具：**Canva品牌套件或Figma设计系统页面。"
    },
    {
      "id": "section-26-6",
      "title": "26.6 证据作品集框架",
      "type": "content",
      "content": "| 部分 | 包含内容 | 证据 |\n|---------|-----------------|----------|\n| **关于** | 1段起源+使命 | 个人照片 |\n| **案例研究（3个）** | 挑战、CreateX方法、KPI影响 | 回顾幻灯片链接 |\n| **推荐信（5个）** | 一句话引用 | 截图+标志 |\n| **指标** | AoCC总数、平均CCD、NPS | 仪表板片段 |\n| **徽章和认证** | 探索者→架构师 | 区块链徽章URL |\n\n**托管在个人域名或Notion网站；幻灯片上的二维码。**"
    },
    {
      "id": "section-26-7",
      "title": "26.7 网络飞轮",
      "type": "content",
      "content": "```\n发布内容 ➜ 引发讨论 ➜ 私信跟进 ➜\n虚拟咖啡 ➜ 提供微帮助（模板/提示） ➜\n确保合作 ➜ 捕获成功故事 ➜ 再次发布\n```\n\n**原则：**在提出要求前给予3倍价值。"
    },
    {
      "id": "section-26-8",
      "title": "26.8 思想领导力路径",
      "type": "content",
      "content": "| 阶段 | 活动 | 目标 |\n|-------|----------|------|\n| **播种** | 策展和评论行业文章 | 建立主题认知 |\n| **成长** | 发布原创教程和经验教训 | 展示专业知识 |\n| **绽放** | 在网络研讨会、播客中演讲 | 触达更广受众 |\n| **收获** | 撰写电子书/课程 | 被动收入和权威 |\n\n**CreateX提供演讲者推介模板、CFP追踪器和峰会指导席位支持。**"
    },
    {
      "id": "section-26-9",
      "title": "26.9 个人品牌健康指标",
      "type": "content",
      "content": "| KPI | 目标 | 工具 |\n|-----|--------|------|\n| **内容一致性** | ≥ 2帖子/周 | Buffer计划 |\n| **参与率** | > 3% | LinkedIn Shield分析 |\n| **入站合作询问** | ≥ 2次/月 | Notion CRM |\n| **推荐来源多样性** | ≥ 3个渠道（网页、社交、口碑） | CRM中标记 |\n| **同行推荐** | ≥ 2个新LinkedIn推荐/年 | 项目后宣传 |"
    },
    {
      "id": "section-26-10",
      "title": "26.10 常见陷阱和解决方案",
      "type": "content",
      "content": "| 陷阱 | 症状 | 补救措施 |\n|---------|---------|---------|\n| **品牌模糊** | 信息混乱、视觉随意 | 审核并创建品牌指南（一页纸） |\n| **发布不一致** | 爆发然后沉默 | 批量制作内容，使用调度器 |\n| **虚荣指标执迷** | 追逐点赞，忽视线索 | 跟踪参与质量和询问 |\n| **冒名顶替综合症** | 延迟发布 | 从策展帖子和快速胜利开始 |\n| **过度自我推销** | 受众疲劳 | 应用70%给予/30%索取规则 |\n\n## 关键要点\n\n- **明确性·一致性·可信度·社区**构成你的品牌核心\n- **选择你能维持的签名内容格式**；在各渠道间重新利用\n- **建立故事库**在不倦怠的情况下提供持续内容\n- **轻量级视觉身份**放大认知度，但实质胜过修饰\n- **跟踪简单KPI**引导努力并庆祝成长"
    },
    {
      "id": "section-26-12",
      "title": "26.12 实地笔记和进一步阅读",
      "type": "content",
      "content": "- **书籍：**《展示你的工作！》（Austin Kleon）\n- **论文：**LinkedIn（2024）创作者参与基准\n- **工具包：**createx.us/toolkit/personal-brand-starter（品牌指南模板、轮播模型、Notion CRM板）\n- **播客：**Brand Builders Lab——第58集 引导师思想领导力\n\n## 引导师检查清单\n\n☐ 定义3词品牌精髓  \n☐ 建立故事库  \n☐ 起草视觉套件  \n☐ 作品集页面上线  \n☐ 在Buffer中加载内容计划\n\n## 反思问题\n\n1. 你能为引导社区带来什么独特视角或专业知识，让他人觉得有价值？\n2. 哪些内容格式最符合你的自然沟通风格和时间可用性？\n3. 你将如何平衡真实分享与专业定位？\n\n## 进一步资源\n\n- **品牌发展：**4C框架、视觉身份入门套件、作品集框架\n- **内容创作：**签名格式、故事库系统、网络飞轮\n- **成长跟踪：**品牌健康指标、思想领导力路径、常见陷阱补救措施"
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
    moduleTitle: '个人品牌建设',
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
    moduleTitle: 'Personal Brand',
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
                    {uiText.chapter} 26
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
              <span>25 minutes</span>
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
                    href={`/${params.lang}/modules/community-practice`}
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

const PersonalBrandPage = withModuleProgress(
  PersonalBrandComponent,
  'personal-brand',
  7
);

export default PersonalBrandPage;
