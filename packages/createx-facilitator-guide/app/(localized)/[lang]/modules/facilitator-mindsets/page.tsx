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

function FacilitatorMindsetsComponent({
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
      "id": "section-5-0",
      "title": "5.0 Opening Story",
      "type": "content",
      "content": "*\"I'm not here to impress you; I'm here to make you impressive.\"*\n\nDuring a 2024 hybrid sprint for a Singapore fintech, facilitator Luis Tan noticed senior managers deferring every decision to him. Mid-session he swapped roles with a junior analyst, letting her steer the whiteboard while he asked clarifying questions. The room relaxed, laughter surfaced, and idea flow doubled. Luis demonstrated the first rule of CreateX facilitation: shift the spotlight from expert to enabler."
    },
    {
      "id": "section-5-1",
      "title": "5.1 The Five Core Mindsets",
      "type": "content",
      "content": "| # | Mindset | Essence | Fast-Action Drill |\n|---|---------|---------|-------------------|\n| 1 | **Bias to Action** | Think by making. Ideas earn the right to live through artifacts. | **\"1-Minute Sketch\"**: Give each participant 60s to visualize their idea before any discussion. |\n| 2 | **Embrace Ambiguity** | Hold questions loosely. Uncertainty is fertile, not fatal. | Write the problem on a sticky, draw a question mark over it, share one thing you don't know yet. |\n| 3 | **Radical Collaboration** | Many lenses, one focus. Diversity is ingredient, alignment is heat. | Pair people who rarely work together for the first exercise. |\n| 4 | **Story-Driven Sense-Making** | Data → narrative → decision. Stories create shared mental models. | Ask teams to pitch insights in a 60-sec user-story arc: \"Once upon a time… then suddenly…\" |\n| 5 | **Ethical AI Stewardship** | Leverage, but verify. AI is a power tool under human values. | Run a \"Bias Hunt\": generate text with ChatGPT, then spend 3 min marking potential biases. |"
    },
    {
      "id": "section-5-2",
      "title": "5.2 Facilitator Roles Triangle",
      "type": "content",
      "content": "```\n        GUIDE\n       /     \\\n      /       \\\n GURU ——————— GUARDRAIL\n```\n\n- **Guide** — Opens paths, asks catalytic questions\n- **Guru** — Shares domain snippets sparingly to unstick teams  \n- **Guardrail** — Holds process integrity and time boxes\n\n**Practice**: At agenda design, tag each activity with your dominant role; balance the triangle across the day."
    },
    {
      "id": "section-5-3",
      "title": "5.3 Presence & Environment",
      "type": "content",
      "content": "| Mode | Presence Moves | Tool Tips |\n|------|----------------|-----------|\n| **In-Person** | Stand at rim, not center; use big gestures to invite energy; remove physical hierarchy (chairs in circle). | Bring erasable timers; use wall-sized canvases. |\n| **Virtual** | High-contrast lighting, close-range webcam; verbalize white-space (\"I'm opening BoardX now\"). | BoardX cursors named \"Guide,\" \"Timer,\" \"Note-Taker.\" |\n| **Hybrid** | Two facilitators: one room-anchor, one remote-champion. | \"Remote-first\" screen share; physical participants type into shared board instead of sticky notes. |"
    },
    {
      "id": "section-5-4",
      "title": "5.4 Emotional Intelligence & Group Dynamics",
      "type": "content",
      "content": "| Signal | Interpretation | Intervention |\n|--------|----------------|--------------|\n| **Long silence after prompt** | Cognitive overload or fear of judgment | Offer a smaller step: \"Write privately first, then share one word.\" |\n| **Laughter → topic drift** | Energy high but focus low | Capture tangent on \"Parking Lot\"; refocus with measurable goal. |\n| **Cross-talk spike** | Competing ideas | Introduce talking token or breakout pairs. |\n\n**Tip**: Use an AI sentiment widget to surface unseen tension—look for polarity > 0.6 or sudden drop > 0.3."
    },
    {
      "id": "section-5-5",
      "title": "5.5 Facilitator Self-Care",
      "type": "content",
      "content": "### Essential Practices\n\n1. **Pre-Flight Ritual** — 3 deep breaths + power-pose + mantra (\"I orchestrate, they create\")\n2. **Energy Cycling** — 5-minute micro-break every 90 minutes (stretch, hydrate, silence)\n3. **Post-Session Dump** — Voice-memo reflections before mental fatigue erases nuance\n4. **Community Debrief** — Share wins and fails in CreateX #fac-lab within 24h\n\n### Sustainable Facilitation\n\n**Physical Care:**\n- Hydrate consistently throughout sessions\n- Wear comfortable shoes for standing/moving\n- Take breaks to rest your voice\n- Maintain good posture while facilitating\n\n**Mental Care:**\n- Set realistic expectations for each session\n- Celebrate small wins and learning moments\n- Separate your worth from session outcomes\n- Maintain boundaries with participants\n\n**Emotional Care:**\n- Process difficult group dynamics with peers\n- Seek supervision for challenging situations\n- Practice self-compassion when things don't go perfectly\n- Maintain your own creative practice"
    },
    {
      "id": "section-5-6",
      "title": "5.6 Common Anti-Patterns & Fixes",
      "type": "content",
      "content": "| Anti-Pattern | Symptom | Remedy |\n|--------------|---------|---------|\n| **Sage on Stage** | Facilitator lectures > 10 min blocks | Flip to question, invite participant demo. |\n| **Process Police** | Rigid adherence kills serendipity | Allow 15% flex buffer in agenda. |\n| **AI Reading Ventriloquism** | AI output verbatim | Ask group to paraphrase or critique before accepting. |\n| **Hero Burnout** | Facilitator multitasks tech, time, notes, energy | Assign rotating roles to participants (time-keeper, scribe). |\n\n### Additional Anti-Patterns\n\n**The Expert Trap**\n- **Symptom**: Participants constantly ask \"What's the right answer?\"\n- **Remedy**: Redirect questions back to group: \"What do you think?\" or \"Let's hear from someone else first.\"\n\n**Technology Overwhelm**\n- **Symptom**: Spending more time managing tools than facilitating\n- **Remedy**: Master 2-3 core tools thoroughly rather than switching between many\n\n**Perfectionism Paralysis**\n- **Symptom**: Over-planning agenda, fear of improvisation\n- **Remedy**: Plan for 70% of time, leave 30% for emergence and adaptation"
    },
    {
      "id": "section-5-7",
      "title": "5.7 Implementation Strategies",
      "type": "content",
      "content": "### Building Your Facilitator Toolkit\n\n**Core Competencies to Develop:**\n1. **Questioning Skills**: Open-ended, assumption-challenging, catalytic\n2. **Listening Skills**: Active, empathetic, pattern-recognition\n3. **Synthesis Skills**: Theme identification, insight extraction, story-building\n4. **Conflict Navigation**: Productive disagreement, tension resolution\n5. **Energy Management**: Reading the room, shifting dynamics, maintaining momentum\n\n### Practice Opportunities\n\n**Low-Stakes Practice:**\n- Facilitate team meetings at work\n- Lead community group discussions\n- Run workshops for friends/family\n- Practice techniques in casual conversations\n\n**Feedback and Reflection:**\n- Video record practice sessions\n- Ask trusted colleagues to observe and provide feedback\n- Keep a facilitation journal with successes and challenges\n- Join facilitator practice groups or communities"
    },
    {
      "id": "section-5-8",
      "title": "5.8 Key Takeaways",
      "type": "content",
      "content": "- **Mindsets are contagious**; model what you wish to multiply\n- **Balance Guide, Guru, Guardrail roles** to meet team needs\n- **Presence—physical or digital—signals psychological safety**\n- **Emotional intelligence + lightweight AI telemetry** keeps group dynamics healthy\n- **Self-care sustains facilitation quality** over marathon workshop runs\n\n### Critical Success Factors\n\n1. **Authentic Presence**: Be genuinely interested in participants and their challenges\n2. **Process Discipline**: Trust the methodology while remaining flexible\n3. **Emotional Awareness**: Read and respond to group energy and dynamics\n4. **Continuous Learning**: Treat every session as a chance to improve\n5. **Community Connection**: Learn from and contribute to the facilitator community"
    },
    {
      "id": "section-5-9",
      "title": "5.9 Field Notes & Further Reading",
      "type": "content",
      "content": "### Essential Resources\n- **Book**: \"Facilitator's Guide to Participatory Decision-Making\" (Kaner)\n- **Paper**: Goleman (2013) \"Emotional Intelligence and Creative Collaboration\"\n- **Toolkit**: createx.us/toolkit/mindset-cards — flashcards for pre-workshop mindfulness\n- **Podcast**: Facilitation Lab Live — Episode 55 \"Hybrid Presence Tricks\"\n\n### Community Practice\n- Join CreateX Slack #facilitator-mindsets channel\n- Attend monthly virtual facilitator circles\n- Share your mindset experiments with #mindset-monday hashtag\n- Contribute to the open-source facilitator toolkit"
    },
    {
      "id": "section-5-10",
      "title": "5.10 Practical Exercises",
      "type": "interactive",
      "content": "### Exercise 1: Mindset Self-Assessment (15 minutes)\nRate yourself (1-5) on each core mindset. Identify your strongest and area for growth. Share with a partner and discuss specific development strategies.\n\n### Exercise 2: Role Triangle Practice (20 minutes)\nPlan a 30-minute workshop segment. Mark each 5-minute block as Guide (G), Guru (U), or Guardrail (R). Aim for balance across the triangle.\n\n### Exercise 3: Presence Experiment (10 minutes)\nPractice the different presence modes: Stand and facilitate for 3 minutes, then sit and facilitate for 3 minutes. Notice the difference in energy and group response."
    },
    {
      "id": "section-5-11",
      "title": "5.11 Reflection Questions",
      "type": "interactive",
      "content": "1. Which of the five core mindsets comes most naturally to you? Which is most challenging?\n\n2. How does your facilitation presence change in different environments (in-person vs. virtual)?\n\n3. What are your early warning signs of facilitator burnout? What self-care practices will you commit to?\n\n4. How can you practice the Guide-Guru-Guardrail balance in your current role?\n\n5. What's one anti-pattern you recognize in your facilitation style? What specific remedy will you try?\n\n---\n\n### Facilitator Checklist\n\n- [ ] Mindset cards reviewed at facilitator stand-up\n- [ ] Role triangle balanced in agenda  \n- [ ] Sentiment widget calibrated\n- [ ] Self-care break scheduled\n- [ ] Anti-pattern awareness shared with co-facilitators\n- [ ] Community debrief scheduled post-session"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      id: "section-5-0",
      title: "5.0 开场故事",
      type: "content",
      content: "*\"我来这里不是为了让你们印象深刻；我来这里是为了让你们变得令人印象深刻。\"*\n\n在2024年新加坡一家金融科技公司的混合冲刺中，引导师Luis Tan注意到高级经理们将每个决定都推给他。会议中途，他与一名初级分析师互换角色，让她掌控白板，而他提出澄清性问题。房间氛围放松了，笑声浮现，创意流动翻倍。Luis展示了CreateX引导的第一法则：将聚光灯从专家转向赋能者。"
    },
    {
      id: "section-5-1",
      title: "5.1 五个核心心态",
      type: "content",
      content: "| # | 心态 | 本质 | 快速行动练习 |\n|---|------|------|-------------|\n| 1 | **行动偏向** | 通过制作来思考。想法通过产出物赢得生存权。 | **\"1分钟草图\"**：在任何讨论前给每个参与者60秒来可视化他们的想法。 |\n| 2 | **拥抱模糊性** | 轻松持有问题。不确定性是肥沃的，不是致命的。 | 在便利贴上写下问题，在上面画一个问号，分享一件你还不知道的事。 |\n| 3 | **激进协作** | 多重视角，一个焦点。多样性是成分，对齐是热源。 | 为第一个练习配对很少一起工作的人。 |\n| 4 | **故事驱动意义构建** | 数据→叙述→决策。故事创造共享心理模型。 | 要求团队以60秒用户故事弧线推介洞察：\"从前…然后突然…\" |\n| 5 | **伦理AI管理** | 利用，但验证。AI是基于人类价值观的强力工具。 | 运行\"偏见搜索\"：用ChatGPT生成文本，然后花3分钟标记潜在偏见。 |"
    },
    {
      id: "section-5-2",
      title: "5.2 引导者角色三角",
      type: "content",
      content: "```\n        向导\n       /     \\\n      /       \\\n 大师 ——————— 护栏\n```\n\n- **向导** — 开辟路径，提出催化性问题\n- **大师** — 谨慎分享领域片段以解除团队阻塞\n- **护栏** — 保持过程完整性和时间盒\n\n**实践**：在议程设计时，为每个活动标记你的主导角色；在一天中平衡三角形。"
    },
    {
      id: "section-5-3",
      title: "5.3 存在感与环境",
      type: "content",
      content: "| 模式 | 存在感动作 | 工具提示 |\n|------|------------|----------|\n| **面对面** | 站在边缘，不是中心；使用大手势邀请能量；移除物理等级制度（椅子围圈）。 | 带可擦除计时器；使用墙面大小画布。 |\n| **虚拟** | 高对比度照明，近距离网络摄像头；言语化空白空间（\"我现在打开BoardX\"）。 | BoardX光标命名为\"引导\"、\"计时器\"、\"记录员\"。 |\n| **混合** | 两名引导师：一个房间锚点，一个远程冠军。 | \"远程优先\"屏幕共享；现场参与者输入到共享板而不是便利贴。 |"
    },
    {
      id: "section-5-4",
      title: "5.4 情商与团体动态",
      type: "content",
      content: "| 信号 | 解释 | 干预 |\n|------|------|------|\n| **提示后长时间沉默** | 认知超载或害怕评判 | 提供更小步骤：\"先私下写，然后分享一个词。\" |\n| **笑声→话题偏移** | 能量高但焦点低 | 在\"停车场\"捕获切线；用可测量目标重新聚焦。 |\n| **交叉对话激增** | 竞争想法 | 引入发言权标志或分组配对。 |\n\n**提示**：使用AI情感小组件来发现看不见的紧张——寻找极性>0.6或突然下降>0.3。"
    },
    {
      id: "section-5-5",
      title: "5.5 引导者自我照护",
      type: "content",
      content: "### 基本实践\n\n1. **起飞前仪式** — 3次深呼吸+力量姿势+口号（\"我协调，他们创造\"）\n2. **能量循环** — 每90分钟5分钟微休息（拉伸、补水、静默）\n3. **会后倾倒** — 在精神疲劳抹去细节前语音备忘反思\n4. **社区汇报** — 在24小时内在CreateX #fac-lab分享成功和失败\n\n### 可持续引导\n\n**身体照护：**\n- 在会议中持续补水\n- 穿舒适的鞋子以便站立/移动\n- 休息以缓解声音疲劳\n- 引导时保持良好姿势\n\n**心理照护：**\n- 为每次会议设定现实期望\n- 庆祝小胜利和学习时刻\n- 将你的价值与会议结果分离\n- 与参与者保持界限\n\n**情感照护：**\n- 与同伴处理困难的团体动态\n- 为挑战性情况寻求督导\n- 当事情不完美时练习自我同情\n- 保持你自己的创造性实践"
    },
    {
      id: "section-5-6",
      title: "5.6 常见反模式与修复",
      type: "content",
      content: "| 反模式 | 症状 | 补救 |\n|--------|------|------|\n| **舞台上的圣人** | 引导师讲座>10分钟块 | 翻转到问题，邀请参与者演示。 |\n| **过程警察** | 僵化坚持杀死偶然性 | 在议程中允许15%灵活缓冲。 |\n| **AI阅读腹语** | AI输出逐字逐句 | 要求小组在接受前解释或批评。 |\n| **英雄倦怠** | 引导师多任务处理技术、时间、笔记、能量 | 分配轮换角色给参与者（计时员、记录员）。 |\n\n### 额外反模式\n\n**专家陷阱**\n- **症状**：参与者不断问\"正确答案是什么？\"\n- **补救**：将问题重新导向小组：\"你们觉得呢？\"或\"让我们先听听别人的意见。\"\n\n**技术压力**\n- **症状**：花在管理工具上的时间比引导更多\n- **补救**：彻底掌握2-3个核心工具，而不是在多个工具间切换\n\n**完美主义瘫痪**\n- **症状**：过度规划议程，害怕即兴发挥\n- **补救**：为70%的时间做计划，留30%给涌现和适应"
    },
    {
      id: "section-5-7",
      title: "5.7 实施策略",
      type: "content",
      content: "### 构建你的引导者工具包\n\n**要发展的核心能力：**\n1. **提问技能**：开放式、挑战假设、催化性\n2. **倾听技能**：积极、共情、模式识别\n3. **综合技能**：主题识别、洞察提取、故事构建\n4. **冲突导航**：生产性分歧、紧张解决\n5. **能量管理**：解读房间、转换动态、保持动力\n\n### 练习机会\n\n**低风险练习：**\n- 引导工作中的团队会议\n- 领导社区小组讨论\n- 为朋友/家人举办工作坊\n- 在日常对话中练习技巧\n\n**反馈与反思：**\n- 录制练习会议视频\n- 请值得信赖的同事观察并提供反馈\n- 保持引导日志记录成功和挑战\n- 加入引导者练习小组或社区"
    },
    {
      id: "section-5-8",
      title: "5.8 关键要点",
      type: "content",
      content: "- **心态是会传染的**；模拟你希望倍增的行为\n- **平衡向导、大师、护栏角色**以满足团队需求\n- **存在感——物理或数字——信号心理安全**\n- **情商+轻量级AI遥测**保持团体动态健康\n- **自我照护维持引导质量**在马拉松工作坊运行中\n\n### 关键成功因素\n\n1. **真实存在感**：真正对参与者及其挑战感兴趣\n2. **过程纪律**：信任方法论同时保持灵活\n3. **情感意识**：解读和回应团体能量和动态\n4. **持续学习**：将每次会议视为改进机会\n5. **社区连接**：从引导者社区学习并做出贡献"
    },
    {
      id: "section-5-9",
      title: "5.9 现场笔记与延伸阅读",
      type: "content",
      content: "### 必需资源\n- **书籍**：《参与式决策制定引导者指南》（Kaner）\n- **论文**：Goleman (2013) \"情商与创造性协作\"\n- **工具包**：createx.us/toolkit/mindset-cards — 工作坊前正念抽认卡\n- **播客**：引导实验室直播 — 第55集\"混合存在感技巧\"\n\n### 社区实践\n- 加入CreateX Slack #facilitator-mindsets频道\n- 参加月度虚拟引导者圈子\n- 用#mindset-monday标签分享你的心态实验\n- 为开源引导者工具包做贡献"
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
    moduleTitle: '引导者心态',
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
    moduleTitle: 'Facilitator Mindsets',
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
                    {uiText.chapter} 5
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Foundations</span>
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
              <span>40 minutes</span>
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
                    href={`/${params.lang}/modules/process-overview`}
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

const FacilitatorMindsetsPage = withModuleProgress(
  FacilitatorMindsetsComponent,
  'facilitator-mindsets',
  9
);

export default FacilitatorMindsetsPage;
