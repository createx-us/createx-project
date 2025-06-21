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

function PrototypingMethodsComponent({
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
      "id": "section-11-0",
      "title": "11.0 Why Prototype?",
      "type": "content",
      "content": "Ideas are hypotheses; prototypes are experiments that turn talk into testable evidence. A prototype's fidelity should match the question you need answered—no higher. Rapid, disposable artifacts accelerate learning, reduce gold‑plating, and create a shared \"third object\" the team can critique without ego.\n\n**Golden Rule:** Prototype to learn, not to validate what you already believe."
    },
    {
      "id": "section-11-1",
      "title": "11.1 Prototype Fidelity Ladder",
      "type": "content",
      "content": "| Fidelity | Typical Question | Time to Build | Example Tool |\n|----------|------------------|---------------|--------------|\n| Sketch / Paper | \"Does the flow make sense?\" | 5–15 min | Pen & Post‑its |\n| Click‑Dummy | \"Can users navigate it?\" | 30–60 min | Figma / BoardX |\n| Wizard‑of‑Oz | \"Will users pay / respond?\" | 1–4 h | Hidden human + scripted UI |\n| Functional MVP | \"Does it deliver value at scale?\" | 1–4 weeks | Bubble, React, low‑code |\n\n**Facilitator Tip:** Start one rung below what the team thinks they need."
    },
    {
      "id": "section-11-2",
      "title": "11.2 Storyboarding",
      "type": "content",
      "content": "**Purpose:** Visualize user journey and uncover missing steps before building interface.\n\n**When to Use:** Immediately after Concept Poster; when flow, emotion, or setting matters.\n\n**Step‑by‑Step:**\n1. 6–8 panels\n2. Stick‑figure sketches\n3. Caption per panel\n4. Group walkthrough\n\n**Remote Tips:** Use BoardX \"Storyboard‑6\" template; paginate left→right.\n\n**AI Prompt Ideas:** \"Generate a one‑sentence caption for each storyboard panel summarizing user intent.\"\n\n**Pitfalls:** Over‑describing text instead of drawing; remind \"pictures first.\"\n\n**Template:** createx.us/toolkit/storyboard‑sheet"
    },
    {
      "id": "section-11-3",
      "title": "11.3 Paper Prototypes",
      "type": "content",
      "content": "**Purpose:** Test layout/content rapidly; invite easy edits.\n\n**Materials:** Index cards, post‑its, scissors, tape.\n\n**Remote Tips:** Draw on tablet camera; use live‑cursor to move PNG \"screens.\"\n\n**AI Prompt Ideas:** \"Suggest microcopy for this login screen text field & error state.\"\n\n**Pitfalls:** Falling into \"pixel‑perfect\" trap; set 10‑min timer per screen.\n\n**Template:** createx.us/toolkit/paper‑ui‑frames"
    },
    {
      "id": "section-11-4",
      "title": "11.4 Wizard‑of‑Oz (WoZ) Prototype",
      "type": "content",
      "content": "**Purpose:** Simulate complex tech (AI, IoT) with hidden human to validate desirability before feasibility.\n\n**When to Use:** Costly algorithms, voice assistants, or hardware.\n\n**Step‑by‑Step:**\n1. Script responses\n2. Hidden \"wizard\" channel\n3. Conduct live session\n4. Debrief\n\n**Remote Tips:** Use Slack or WhatsApp back‑channel; mute notifications on screen‑share.\n\n**AI Prompt Ideas:** \"Draft 10 plausible chatbot responses for a banking FAQ.\"\n\n**Pitfalls:** Wizard latency; rehearse response macro keys.\n\n**Template:** createx.us/toolkit/woz‑script‑sheet"
    },
    {
      "id": "section-11-5",
      "title": "11.5 Low‑Code & AI Mock‑Ups",
      "type": "content",
      "content": "| Approach | Tool | Example | What It Proves |\n|----------|------|---------|----------------|\n| Prompt‑to‑UI | Galileo AI, Uizard | Interface layout | Desirability |\n| Auto‑Backend | Retool, Supabase | Data flow & integration | Feasibility |\n| Voice / Gen‑AI | Voiceflow, GPT Functions | Conversational logic, tone | Usability |\n\n**AI Prompt Ideas:** \"Generate a Figma JSON for a two‑step signup with password strength meter.\"\n\n**Pitfalls:** Over‑engineering; lock build to ≤ 4 h time‑box.\n\n**Template:** createx.us/toolkit/ai‑mock‑brief"
    },
    {
      "id": "section-11-6",
      "title": "11.6 Prototype Testing Quick Loop (30 min)",
      "type": "content",
      "content": "| Minute | Activity |\n|--------|----------|\n| 0‑5 | Explain prototype + think‑aloud rules |\n| 5‑20 | User tasks (3–5 tasks) |\n| 20‑25 | Open Q&A (\"What surprised you?\") |\n| 25‑30 | Team debrief, capture fixes |\n\n**AI Assist:** Live transcription + sentiment gauge flag hesitation spikes."
    },
    {
      "id": "section-11-7",
      "title": "11.7 \"Prototype in a Day\" Agenda (Hybrid)",
      "type": "content",
      "content": "| Time | Activity |\n|------|----------|\n| 09:00 | Storyboard warm‑up |\n| 09:30 | Paper prototype screens |\n| 10:30 | WoZ script rehearsal |\n| 11:00 | Round 1 user tests |\n| 12:00 | Lunch & synthesis |\n| 13:30 | Low‑code clickable build |\n| 15:00 | Round 2 remote tests (5 users) |\n| 16:30 | Prioritize fixes (ICE) |\n| 17:00 | Go / no‑go decision |"
    },
    {
      "id": "section-11-8",
      "title": "11.8 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Symptom | Fix |\n|---------|---------|-----|\n| Too High Fidelity | Team spends hours on colors | Force grayscale palette rule |\n| User Coaching | Facilitator explains during test | Use \"Silent Observer,\" only clarify task |\n| Prototype Hoarding | Team reluctant to discard | Celebrate \"learning per dollar minute,\" archive, move on |\n| AI Hallucination | Generated UI copy misleading | Human review; run bias checker |s\n\n**Track:** Design Process  \n**Duration:** 60 min  \n**Difficulty:** Intermediate  \n**Prerequisites:** Chapter 10\n\n## Learning Objectives\n\n- Master key concepts from prototyping methods\n- Apply frameworks and methods in practice\n- Understand implementation considerations\n\n## Overview\n\nPrototyping Methods provides essential knowledge and practical tools for effective design thinking facilitation.\n\nChapter 11 — Prototyping Methods 74\n11.0 Why Prototype? 74\n11.1 Prototype Fidelity Ladder 75\n11.2 Storyboarding 75\n11.3 Paper Prototypes 76\n11.4 Wizard‑of‑Oz (WoZ) Prototype 76\n11.5 Low‑Code & AI Mock‑Ups 77\n11.6 Prototype Testing Quick Loop (30 min) 78\n11.7 “Prototype in a Day” Agenda (Hybrid) 79\n11.8 Common Pitfalls & Fixes 79\n11.9 Key Takeaways 80\n11.10 Field Notes & Further Reading 80\n8\n\n--- Page 9 ---\n\n## Key Takeaways\n\n- Match fidelity to question; lower is usually faster and clearer\n- Storyboards and paper UI uncover gaps before code\n- Wizard‑of‑Oz lets you test desirability of AI magic without building it\n- Low‑code & gen‑AI tools compress functional MVPs to hours—but guard time‑boxes\n- Always pair prototyping with structured user test loops to lock learning\n\n## Reflection Questions\n\n1. What prototype fidelity level best matches your current project needs?\n2. How can you incorporate Wizard-of-Oz testing for AI-powered features?\n3. Which prototyping method would accelerate learning most in your context?\n\n## Further Resources\n\n- **Book:** Houde & Hill \"What Do Prototypes Prototype?\" (classic Xerox PARC paper)\n- **Paper:** Rettig (1994) \"Prototyping for Tiny Fingers\"\n- **Toolkit:** createx.us/toolkit/prototyping‑suite (storyboard frames, WoZ script, test plan)\n- **Podcast:** Design Better — Ep. 78 \"Rapid Prototyping with AI\"\n\n### Facilitator Checklist\n\n☐ Prototype question defined  \n☐ Fidelity ladder discussed  \n☐ Materials / templates ready  \n☐ User recruit list set  \n☐ AI copy + bias check completed"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      id: "section-11-0",
      title: "11.0 为什么要制作原型？",
      type: "content",
      content: "想法是假设；原型是将谈话转化为可测试证据的实验。原型的保真度应该与你需要回答的问题相匹配——不多不少。快速、可丢弃的原件加速学习，减少过度完善，并创建团队可以批评而不涉及自我的共享\"第三对象\"。\n\n**黄金法则：** 制作原型是为了学习，而不是验证你已经相信的东西。"
    },
    {
      id: "section-11-1",
      title: "11.1 原型保真度阶梯",
      type: "content",
      content: "| 保真度 | 典型问题 | 构建时间 | 示例工具 |\n|--------|----------|----------|----------|\n| 草图/纸质 | \"流程合理吗？\" | 5-15分钟 | 笔和便利贴 |\n| 点击假型 | \"用户能导航吗？\" | 30-60分钟 | Figma / BoardX |\n| 绿野仙踪法 | \"用户会付费/响应吗？\" | 1-4小时 | 隐藏人工+脚本UI |\n| 功能MVP | \"它能大规模提供价值吗？\" | 1-4周 | Bubble, React, 低代码 |\n\n**引导者提示：** 从团队认为需要的低一个层次开始。"
    },
    {
      id: "section-11-2",
      title: "11.2 故事板",
      type: "content",
      content: "**目的：** 可视化用户旅程，在构建界面前发现缺失步骤。\n\n**使用时机：** 概念海报后立即使用；当流程、情感或环境很重要时。\n\n**步骤详解：**\n1. 6-8个面板\n2. 简笔画草图\n3. 每个面板配标题\n4. 小组演示\n\n**远程提示：** 使用BoardX \"故事板-6\"模板；从左到右分页。\n\n**AI提示想法：** \"为每个故事板面板生成一句话标题，总结用户意图。\"\n\n**陷阱：** 过度描述文字而非绘图；提醒\"图片优先\"。\n\n**模板：** createx.us/toolkit/storyboard-sheet"
    },
    {
      id: "section-11-3",
      title: "11.3 纸质原型",
      type: "content",
      content: "**目的：** 快速测试布局/内容；便于编辑修改。\n\n**材料：** 索引卡、便利贴、剪刀、胶带。\n\n**远程提示：** 在平板摄像头上绘制；使用实时光标移动PNG \"屏幕\"。\n\n**AI提示想法：** \"为这个登录屏幕文本字段和错误状态建议微文案。\"\n\n**陷阱：** 陷入\"像素完美\"陷阱；每屏设置10分钟计时器。\n\n**模板：** createx.us/toolkit/paper-ui-frames"
    },
    {
      id: "section-11-4",
      title: "11.4 绿野仙踪(WoZ)原型",
      type: "content",
      content: "**目的：** 用隐藏人工模拟复杂技术(AI、物联网)，在可行性之前验证期望性。\n\n**使用时机：** 昂贵算法、语音助手或硬件。\n\n**步骤详解：**\n1. 编写响应脚本\n2. 隐藏\"巫师\"通道\n3. 进行实时会话\n4. 总结汇报\n\n**远程提示：** 使用Slack或WhatsApp后台通道；屏幕共享时静音通知。\n\n**AI提示想法：** \"为银行常见问题聊天机器人起草10个合理响应。\"\n\n**陷阱：** 巫师延迟；练习响应宏键。\n\n**模板：** createx.us/toolkit/woz-script-sheet"
    },
    {
      id: "section-11-5",
      title: "11.5 低代码和AI模型",
      type: "content",
      content: "| 方法 | 工具 | 示例 | 证明什么 |\n|------|------|------|----------|\n| 提示到UI | Galileo AI, Uizard | 界面布局 | 期望性 |\n| 自动后端 | Retool, Supabase | 数据流和集成 | 可行性 |\n| 语音/生成AI | Voiceflow, GPT功能 | 对话逻辑、语调 | 可用性 |\n\n**AI提示想法：** \"为带密码强度计的两步注册生成Figma JSON。\"\n\n**陷阱：** 过度工程；锁定构建时间≤4小时时间盒。\n\n**模板：** createx.us/toolkit/ai-mock-brief"
    },
    {
      id: "section-11-6",
      title: "11.6 原型测试快速循环(30分钟)",
      type: "content",
      content: "| 分钟 | 活动 |\n|------|------|\n| 0-5 | 解释原型+思考出声规则 |\n| 5-20 | 用户任务(3-5个任务) |\n| 20-25 | 开放问答(\"什么让你惊讶？\") |\n| 25-30 | 团队汇报，捕获修复 |\n\n**AI辅助：** 实时转录+情感计量标记犹豫峰值。"
    },
    {
      id: "section-11-7",
      title: "11.7 \"一天内原型\"议程(混合)",
      type: "content",
      content: "| 时间 | 活动 |\n|------|------|\n| 09:00 | 故事板热身 |\n| 09:30 | 纸质原型屏幕 |\n| 10:30 | WoZ脚本排练 |\n| 11:00 | 第1轮用户测试 |\n| 12:00 | 午餐和综合 |\n| 13:30 | 低代码可点击构建 |\n| 15:00 | 第2轮远程测试(5个用户) |\n| 16:30 | 优先修复(ICE) |\n| 17:00 | 决定进行/停止 |"
    },
    {
      id: "section-11-8",
      title: "11.8 常见陷阱和解决方案",
      type: "content",
      content: "| 陷阱 | 症状 | 解决方案 |\n|------|------|----------|\n| 保真度过高 | 团队花费数小时在颜色上 | 强制灰度调色板规则 |\n| 用户指导 | 引导者在测试期间解释 | 使用\"静默观察者\"，只澄清任务 |\n| 原型囤积 | 团队不愿丢弃 | 庆祝\"每美元分钟的学习\"，归档，继续前进 |\n| AI幻觉 | 生成的UI文案误导 | 人工审查；运行偏见检查器 |\n\n**轨道：** 设计过程  \n**持续时间：** 60分钟  \n**难度：** 中级  \n**先决条件：** 第10章\n\n## 学习目标\n\n- 掌握原型制作方法的关键概念\n- 在实践中应用框架和方法\n- 理解实施考量\n\n## 概述\n\n原型制作方法为有效的设计思维引导提供必要知识和实用工具。\n\n第11章 — 原型制作方法 74\n11.0 为什么要制作原型？ 74\n11.1 原型保真度阶梯 75\n11.2 故事板 75\n11.3 纸质原型 76\n11.4 绿野仙踪(WoZ)原型 76\n11.5 低代码和AI模型 77\n11.6 原型测试快速循环(30分钟) 78\n11.7 \"一天内原型\"议程(混合) 79\n11.8 常见陷阱和解决方案 79\n11.9 关键要点 80\n11.10 现场笔记和进一步阅读 80\n\n## 关键要点\n\n- 保真度与问题匹配；较低通常更快更清楚\n- 故事板和纸质UI在编码前发现差距\n- 绿野仙踪法让你无需构建即可测试AI魔法的期望性\n- 低代码和生成AI工具将功能MVP压缩到数小时——但要守护时间盒\n- 始终将原型制作与结构化用户测试循环配对以锁定学习\n\n## 反思问题\n\n1. 什么原型保真度级别最适合你当前的项目需求？\n2. 如何为AI驱动功能整合绿野仙踪测试？\n3. 哪种原型制作方法在你的环境中最能加速学习？\n\n## 进一步资源\n\n- **书籍：** Houde & Hill \"原型原型什么？\"(经典施乐PARC论文)\n- **论文：** Rettig (1994) \"为小手指原型制作\"\n- **工具包：** createx.us/toolkit/prototyping-suite (故事板框架、WoZ脚本、测试计划)\n- **播客：** Design Better — 第78集 \"AI快速原型制作\"\n\n### 引导者检查清单\n\n☐ 原型问题已定义  \n☐ 保真度阶梯已讨论  \n☐ 材料/模板已准备  \n☐ 用户招募清单已设置  \n☐ AI文案+偏见检查已完成"
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
    moduleTitle: '原型制作方法',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    markAsComplete: '标记为完成',
    markAsIncomplete: '标记为未完成',
    previous: '上一个',
    next: '下一个',
    progress: '进度',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Prototyping Methods',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    markAsComplete: 'Mark as Complete',
    markAsIncomplete: 'Mark as Incomplete',
    previous: 'Previous',
    next: 'Next',
    progress: 'Progress',
    interactiveSectionDescription: 'This is an interactive exercise section, please participate actively.',
    markComplete: 'Mark Complete'
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
                    {uiText.chapter} 11
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Design Process</span>
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
              <span>60 minutes</span>
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
                    href={`/${params.lang}/modules/testing-feedback`}
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

const PrototypingMethodsPage = withModuleProgress(
  PrototypingMethodsComponent,
  'prototyping-methods',
  9
);

export default PrototypingMethodsPage;
