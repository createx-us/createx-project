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

function TroubleshootingComponent({
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
      "id": "section-19-0",
      "title": "19.0 Why a Troubleshooting Playbook?",
      "type": "content",
      "content": "Even the best-scoped, well-timed workshop will hit bumps: tech glitches, energy crashes, conflict spikes. Real-time troubleshooting keeps momentum, trust, and creative confidence intact. A prepared facilitator diagnoses fast, applies the right fix, and turns hiccups into learning moments."
    },
    {
      "id": "section-19-1",
      "title": "19.1 Rapid Diagnosis Grid",
      "type": "content",
      "content": "| Symptom | Likely Root Cause | First Probe Question |\n|---------|-------------------|----------------------|\n| **Awkward Silence** | Cognitive overload, unclear ask, low safety | \"What part of the task feels unclear?\" |\n| **Energy Dip (yawns, phones)** | Long cognitive stretch, low blood sugar | \"Let's rate energy 1-5—where are we?\" |\n| **Tech Freeze (platform crash)** | Bandwidth, browser compatibility | \"Who else sees the error?\" |\n| **Dominating Voice** | Power dynamics, enthusiasm burst | \"Can we hear from someone who hasn't spoken yet?\" |\n| **Scope Spiral** | Brief too broad, stakeholder jumps in | \"Which success metric does this idea serve?\" |\n\n**Tip:** State the observation neutrally (\"I'm noticing silence…\") before intervening."
    },
    {
      "id": "section-19-2",
      "title": "19.2 Troubleshooting Tactics Library",
      "type": "content",
      "content": "| Category | Tactic | Use When | How-To |\n|----------|--------|----------|--------|\n| **Energy** | Lightning Stretch | Post-lunch slump | 90-second guided stretch + upbeat track |\n| | AI Graffiti | Idea stagnation | Shout prompts → Midjourney live generation |\n| **Clarity** | Re-Demo | Task confusion | Facilitator models task for 60 sec |\n| | Stack Questions | Multiple clarifications | Park Qs on board, answer in batch |\n| **Time** | Time-Box Cut | Overrun block | Announce \"2-min wrap-up,\" move to next |\n| | Flex Buffer Use | Major overrun | Consume pre-planned 10% slack |\n| **Conflict** | Yes-And Round | Idea killing | Each speaks starting with \"Yes-and…\" |\n| | Data Recall | Opinion deadlock | Pull original user quote or metric |\n| **Tech** | Link Swap | BoardX lag | Jump to backup BoardX/Figma link |\n| | Offline Shift | Wi-Fi down | Paper stickies + phone photos |"
    },
    {
      "id": "section-19-3",
      "title": "19.3 Real-Time AI Rescue Moves",
      "type": "content",
      "content": "| Scenario | AI Prompt | Outcome |\n|----------|-----------|---------|\n| **Lost Summary** | \"Summarize last 30 chat lines into 5 bullets.\" | Fast recap |\n| **Blank Ideas** | \"Generate 10 playful metaphors for {theme}.\" | Spark novelty |\n| **Scope Check** | \"Which concept aligns best with KPI {X}? Output score 1-5.\" | Objective anchor |\n| **Sentiment Check** | \"Analyze chat for frustration words > 0.6 polarity.\" | Flag hidden tension |\n\n**Guardrail:** Announce AI use; show summary to group for validation."
    },
    {
      "id": "section-19-4",
      "title": "19.4 The Five-Step Recovery Script (\"CALMS\")",
      "type": "content",
      "content": "| Step | Action | Example |\n|------|--------|---------|\n| **C — Context** | Name issue neutrally | \"Our energy dipped after 90 min.\" |\n| **A — Acknowledge** | Validate feeling | \"That's totally normal.\" |\n| **L — Leverage** | Bring objective cue | \"Survey shows avg energy = 2.7/5.\" |\n| **M — Move** | Apply tactic | \"Let's do a 2-min sketch race.\" |\n| **S — Seal** | Reflect outcome | \"Energy now 4/5—great, onward.\" |"
    },
    {
      "id": "section-19-5",
      "title": "19.5 Role Escalation Protocol",
      "type": "content",
      "content": "| Level | Trigger | Escalation |\n|-------|---------|------------|\n| **Facilitator Fix** | Minor confusion | Apply tactic from library |\n| **Co-Facilitator Assist** | Persistent derailing voice | Swap facilitator; co-fac mediates |\n| **Sponsor Ping** | Scope conflict w/ business reality | 5-min sponsor huddle |\n| **Workshop Pause** | Ethical / safety breach | Halt session; code-of-conduct response |\n| **Cancel / Reschedule** | Platform outage > 30 min, critical stakeholder absent | Invoke contingency date |"
    },
    {
      "id": "section-19-6",
      "title": "19.6 Tech Failsafe Kit",
      "type": "content",
      "content": "| Item | Purpose |\n|------|---------|\n| **Portable 4G/5G hotspot** | Internet backup |\n| **HDMI dongles + adapters** | Projector mismatch |\n| **Printed templates (20 sets)** | Canvas offline pivot |\n| **Physical timer** | Digital clock crash |\n| **Spare laptop + power bank** | Hardware failure |"
    },
    {
      "id": "section-19-7",
      "title": "19.7 Psychological Safety First-Aid",
      "type": "content",
      "content": "| Signal | Immediate Action |\n|--------|------------------|\n| **Tearful participant** | Offer break, private check-in |\n| **Heated argument** | Call 2-min pause; separate parties |\n| **Micro-aggression spotted** | Address publicly: restate norm, redirect |\n| **Fatigue overwhelm** | Offer opt-out or silent contribution channel |"
    },
    {
      "id": "section-19-8",
      "title": "19.8 Case-Based Drills (Run with Facil Team)",
      "type": "content",
      "content": "1. **Scenario:** Zoom drops audio intermittently\n   - **Drill:** Switch to phone bridge within 3 min\n\n2. **Scenario:** Sponsor declares mid-session: \"We just need a marketing slogan.\"\n   - **Drill:** Use CALMS to re-scope or park request\n\n3. **Scenario:** AI tool outputs biased persona\n   - **Drill:** Bias scan, rewrite live, discuss learning moment"
    },
    {
      "id": "section-19-9",
      "title": "19.9 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Consequence | Fix |\n|---------|-------------|-----|\n| **Panic Reaction** | Facilitator loses authority | Follow CALMS script; breathe |\n| **Over-Facilitating** | Choke organic dialogue | Apply \"10-second wait\" after asking questions |\n| **Ignoring Tech Signs** | Latency worsens | Announce switch early; don't hope |\n| **Blame Game** | Team morale drops | Use \"process, not person\" language |\n\n## Key Takeaways\n\n- **Prepared tactics + calm mindset = resilient facilitation**\n- **Diagnose via symptom → root cause → probe** before acting\n- **Use AI rescue moves sparingly and transparently**\n- **Apply CALMS framework** to surface, address, and close any disruption\n- **Psychological safety overrides agenda**; always triage human needs first"
    },
    {
      "id": "section-19-11",
      "title": "19.11 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"The Surprising Power of Liberating Structures\"\n- **Paper:** Google SRE (2024) \"Incident Management Techniques for Non-Tech Contexts\"\n- **Toolkit:** createx.us/toolkit/troubleshoot-cards (CALMS cheat-sheet, tech failsafe checklist)\n- **Podcast:** Workshop Resilience — Ep. 07 \"Turning Meltdowns into Momentum\"\n\n## Facilitator Checklist\n\n☐ Troubleshoot library printed  \n☐ Failsafe kit packed  \n☐ AI backup prompts saved  \n☐ CALMS acronym on sticky nearby  \n☐ Escalation protocol agreed with co-fac & sponsor\n\n## Reflection Questions\n\n1. How will you build your confidence in real-time diagnosis and intervention without over-facilitating?\n2. What specific tech failsafe preparations are most critical for your workshop environments?\n3. How can you practice the CALMS framework in low-stakes situations to build muscle memory?\n\n## Further Resources\n\n- **Diagnosis Tools:** Rapid Diagnosis Grid, symptom-to-intervention mapping\n- **Recovery Frameworks:** CALMS script, escalation protocols, psychological safety first-aid\n- **Preparation:** Tech failsafe kit, case-based drill scenarios, troubleshooting tactics library"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-19-0",
      "title": "19.0 为什么需要故障排除手册？",
      "type": "content",
      "content": "即使是最好规划的、时间安排完美的工作坊也会遇到问题：技术故障、精力下降、冲突激化。实时故障排除能保持动力、信任和创意信心完整。有准备的引导师能快速诊断，应用正确的修复方法，将小问题转化为学习机会。"
    },
    {
      "id": "section-19-1",
      "title": "19.1 快速诊断表格",
      "type": "content",
      "content": "| 症状 | 可能的根本原因 | 首次探询问题 |\n|------|---------------|-------------|\n| **尴尬沉默** | 认知超载、要求不明确、安全感低 | \"任务的哪一部分感觉不清楚？\" |\n| **精力下降（打哈欠、看手机）** | 长时间认知紧张、低血糖 | \"让我们评估一下精力1-5分—我们在哪里？\" |\n| **技术冻结（平台崩溃）** | 带宽问题、浏览器兼容性 | \"还有谁看到了这个错误？\" |\n| **主导声音** | 权力动态、热情爆发 | \"我们能听听还没发言的人吗？\" |\n| **范围扩散** | 简报太宽泛、利益相关者插入 | \"这个想法服务于哪个成功指标？\" |\n\n**技巧：** 在干预前中性地陈述观察（\"我注意到沉默...\"）。"
    },
    {
      "id": "section-19-2",
      "title": "19.2 故障排除策略库",
      "type": "content",
      "content": "| 类别 | 策略 | 使用时机 | 操作方法 |\n|------|------|----------|----------|\n| **精力** | 闪电伸展 | 午餐后倦怠 | 90秒引导伸展+动感音乐 |\n| | AI涂鸦 | 想法停滞 | 大声提示→Midjourney实时生成 |\n| **清晰度** | 重新演示 | 任务困惑 | 引导师示范任务60秒 |\n| | 堆叠问题 | 多个澄清需求 | 将问题停放在板上，批量回答 |\n| **时间** | 时间盒切断 | 超时块 | 宣布\"2分钟总结\"，转到下一个 |\n| | 弹性缓冲使用 | 严重超时 | 消耗预计划的10%松弛时间 |\n| **冲突** | 是-并且轮 | 想法杀手 | 每人发言都以\"是-并且...\"开始 |\n| | 数据召回 | 意见僵局 | 拉出原始用户引言或指标 |\n| **技术** | 链接交换 | BoardX延迟 | 跳转到备用BoardX/Figma链接 |\n| | 离线转换 | Wi-Fi断开 | 纸质便签+手机拍照 |"
    },
    {
      "id": "section-19-3",
      "title": "19.3 实时AI救援行动",
      "type": "content",
      "content": "| 场景 | AI提示 | 结果 |\n|------|--------|------|\n| **丢失摘要** | \"将最后30行聊天内容总结为5个要点。\" | 快速回顾 |\n| **想法空白** | \"为{主题}生成10个有趣的隐喻。\" | 激发新颖性 |\n| **范围检查** | \"哪个概念与KPI {X}最匹配？输出1-5分。\" | 客观锚点 |\n| **情绪检查** | \"分析聊天中挫折词汇>0.6极性。\" | 标记隐藏紧张 |\n\n**护栏：** 宣布AI使用；向小组展示摘要以验证。"
    },
    {
      "id": "section-19-4",
      "title": "19.4 五步恢复脚本（\"CALMS\"）",
      "type": "content",
      "content": "| 步骤 | 行动 | 示例 |\n|------|------|------|\n| **C — 背景** | 中性地命名问题 | \"我们的精力在90分钟后下降了。\" |\n| **A — 承认** | 验证感受 | \"这完全正常。\" |\n| **L — 利用** | 带来客观提示 | \"调查显示平均精力=2.7/5。\" |\n| **M — 行动** | 应用策略 | \"让我们做一个2分钟的草图竞赛。\" |\n| **S — 确认** | 反思结果 | \"现在精力4/5—很好，继续。\" |"
    },
    {
      "id": "section-19-5",
      "title": "19.5 角色升级协议",
      "type": "content",
      "content": "| 级别 | 触发器 | 升级 |\n|------|--------|------|\n| **引导师修复** | 轻微困惑 | 从库中应用策略 |\n| **共同引导师协助** | 持续跑题声音 | 交换引导师；共同引导师调解 |\n| **赞助商联系** | 与业务现实的范围冲突 | 5分钟赞助商碰头 |\n| **工作坊暂停** | 伦理/安全违规 | 停止会议；行为准则响应 |\n| **取消/重新安排** | 平台中断>30分钟，关键利益相关者缺席 | 启动应急日期 |"
    },
    {
      "id": "section-19-6",
      "title": "19.6 技术故障安全套件",
      "type": "content",
      "content": "| 物品 | 用途 |\n|------|------|\n| **便携式4G/5G热点** | 互联网备份 |\n| **HDMI适配器+转换器** | 投影仪不匹配 |\n| **打印模板（20套）** | 画布离线转换 |\n| **物理计时器** | 数字时钟崩溃 |\n| **备用笔记本电脑+充电宝** | 硬件故障 |"
    },
    {
      "id": "section-19-7",
      "title": "19.7 心理安全急救",
      "type": "content",
      "content": "| 信号 | 立即行动 |\n|------|----------|\n| **参与者流泪** | 提供休息，私下检查 |\n| **激烈争论** | 呼叫2分钟暂停；分离双方 |\n| **发现微侵犯** | 公开处理：重申规范，重新导向 |\n| **疲劳不堪** | 提供退出或静默贡献渠道 |"
    },
    {
      "id": "section-19-8",
      "title": "19.8 基于案例的演练（与引导团队进行）",
      "type": "content",
      "content": "1. **场景：** Zoom音频间歇性断开\n   - **演练：** 3分钟内切换到电话桥接\n\n2. **场景：** 赞助商在会议中途宣布：\"我们只需要一个营销口号。\"\n   - **演练：** 使用CALMS重新界定范围或暂存请求\n\n3. **场景：** AI工具输出有偏见的人物画像\n   - **演练：** 偏见扫描，实时重写，讨论学习时刻"
    },
    {
      "id": "section-19-9",
      "title": "19.9 常见陷阱和修复",
      "type": "content",
      "content": "| 陷阱 | 后果 | 修复 |\n|------|------|------|\n| **恐慌反应** | 引导师失去权威 | 遵循CALMS脚本；深呼吸 |\n| **过度引导** | 扼杀有机对话 | 提问后应用\"10秒等待\" |\n| **忽视技术信号** | 延迟恶化 | 早期宣布切换；不要抱希望 |\n| **责备游戏** | 团队士气下降 | 使用\"过程，而非个人\"语言 |\n\n## 关键要点\n\n- **准备好的策略+冷静心态=弹性引导**\n- **通过症状→根本原因→探询进行诊断**，然后行动\n- **谨慎透明地使用AI救援行动**\n- **应用CALMS框架**来表面化、处理和关闭任何干扰\n- **心理安全优于议程**；始终优先处理人的需求"
    },
    {
      "id": "section-19-11",
      "title": "19.11 现场笔记和延伸阅读",
      "type": "content",
      "content": "- **书籍：** \"The Surprising Power of Liberating Structures\"\n- **论文：** Google SRE (2024) \"非技术环境的事件管理技术\"\n- **工具包：** createx.us/toolkit/troubleshoot-cards（CALMS速查表，技术故障安全检查清单）\n- **播客：** Workshop Resilience — Ep. 07 \"将崩溃转化为动力\"\n\n## 引导师检查清单\n\n☐ 故障排除库已打印  \n☐ 故障安全套件已打包  \n☐ AI备用提示已保存  \n☐ CALMS首字母缩写便签在附近  \n☐ 与共同引导师和赞助商商定升级协议\n\n## 反思问题\n\n1. 您如何在不过度引导的情况下建立实时诊断和干预的信心？\n2. 对于您的工作坊环境，哪些特定的技术故障安全准备最为关键？\n3. 您如何在低风险情况下练习CALMS框架以建立肌肉记忆？\n\n## 延伸资源\n\n- **诊断工具：** 快速诊断表格、症状到干预映射\n- **恢复框架：** CALMS脚本、升级协议、心理安全急救\n- **准备：** 技术故障安全套件、基于案例的演练场景、故障排除策略库"
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
    moduleTitle: '实时故障排除',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '高级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Troubleshooting',
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
                    {uiText.chapter} 19
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">AI & Technology</span>
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
              <span>45 {params.lang === 'zh' ? '分钟' : 'minutes'}</span>
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
                    href={`/${params.lang}/modules/capturing-outcomes`}
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

const TroubleshootingPage = withModuleProgress(
  TroubleshootingComponent,
  'troubleshooting',
  9
);

export default TroubleshootingPage;
