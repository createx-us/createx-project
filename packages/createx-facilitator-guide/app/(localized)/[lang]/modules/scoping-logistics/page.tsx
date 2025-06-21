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

function ScopingLogisticsComponent({
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
      "id": "section-15-0",
      "title": "15.0 Opening Story",
      "type": "content",
      "content": "\"The workshop is where?\"\n\nWhen CreateX facilitator Nadia Patel arrived at a Kuala Lumpur coworking space, she found half her participants stuck in traffic and the air-con broken. Quick pivot: she opened a parallel Zoom room, couriered snack vouchers, and rearranged seats under ceiling fans. The session started 20 minutes late—yet finished on time, with record AoCC scores. The lesson: great facilitation begins days before the first sticky note—in scoping and logistics."
    },
    {
      "id": "section-15-1",
      "title": "15.1 Why Scoping & Logistics?",
      "type": "content",
      "content": "**Core Benefits:**\n- **Right-Size Challenge** avoids vague \"boil-the-ocean\" briefs\n- **Operational Readiness** ensures tools, space, and people mesh smoothly\n- **Stakeholder Alignment** prevents last-minute derailers\n\nSkipping this phase multiplies downstream churn, burns credibility, and bloats budgets."
    },
    {
      "id": "section-15-2",
      "title": "15.2 Challenge Framing Checklist",
      "type": "interactive",
      "content": "| Item | Guiding Prompt | Owner |\n|------|----------------|-------|\n| **Problem Statement** | Does it name a user, need, and context? | Sponsor |\n| **Success Metrics** | At least one quantitative and one qualitative KPI? | PO |\n| **Constraints** | Budget, tech stack, policy rules explicit? | Legal/IT |\n| **Non-Goals** | What's out of scope? | Facilitator |\n| **Why Now** | Urgency clear? | Sponsor |\n\n**Template Link:** createx.us/toolkit/challenge-brief"
    },
    {
      "id": "section-15-3",
      "title": "15.3 Participant Selection Matrix",
      "type": "content",
      "content": "| Role | Ideal % | Rationale |\n|------|---------|-----------|\n| **Core Users / Beneficiaries** | 25–35% | Ground empathy in reality |\n| **Domain Experts** | 10–15% | Provide constraints & depth |\n| **Decision-Makers** | 10% | Fast-track adoption |\n| **Makers (Design, Dev)** | 20–30% | Prototype muscle |\n| **Wild Cards (diverse POVs)** | 10–15% | Cognitive diversity |\n\n**Team Size Sweet Spot:** 10–30 total. More = unwieldy, less = limited idea pool."
    },
    {
      "id": "section-15-4",
      "title": "15.4 Environment & Tooling",
      "type": "interactive",
      "content": "| Dimension | In-Person | Virtual / Hybrid |\n|-----------|-----------|------------------|\n| **Space** | ≥ 1.5 m² per person, movable walls, daylight ideal | Quiet rooms, stable 10 Mbps per attendee |\n| **Surfaces** | Whiteboard ≥ 7 m, sticky-friendly | Digital canvas (BoardX, BoardX) set up |\n| **Audio** | Wireless mic if > 20 people | Quality headsets; echo-cancellation enabled |\n| **Recording** | HD cam on tripod | Screen-record + cloud transcription |\n| **Materials** | Post-its (3 colors), markers, timer, camera | Template links, breakout rooms pre-named |"
    },
    {
      "id": "section-15-5",
      "title": "15.5 Budget Template (USD)",
      "type": "interactive",
      "content": "| Category | % Typical | Note |\n|----------|-----------|------|\n| **Facilitation Fees** | 45% | Incl. prep & synthesis |\n| **Venue / Platform** | 15% | Coworking day-rate or Zoom Pro |\n| **Materials / Tools** | 8% | Post-its, prototyping kits, AI credits |\n| **Catering / Snacks** | 12% | Energy maintenance |\n| **Travel / Lodging** | 10% | If multi-site |\n| **Contingency** | 10% | Unforeseen |\n\n**Rule:** Set aside 15% of total for AI tool usage & cloud storage, adjust with org's existing licenses."
    },
    {
      "id": "section-15-6",
      "title": "15.6 Timeline Back-Plan (T-Minus)",
      "type": "content",
      "content": "| T-Date | Milestone |\n|--------|-----------|\n| **T-30 d** | Finalize challenge brief + budget |\n| **T-21 d** | Secure venue / platform; send Save-the-Date |\n| **T-14 d** | Confirm participants; dispatch pre-reads & CCS-10 survey |\n| **T-10 d** | Tech rehearsal; bias scan AI tools |\n| **T-7 d** | Materials order / template lock |\n| **T-2 d** | Agenda dry-run; backup internet/power plan |\n| **T-0** | Workshop day |\n| **T+1 d** | Immediate AAR + AoCC log |\n| **T+7 d** | Deliver synthesis pack |"
    },
    {
      "id": "section-15-7",
      "title": "15.7 Risk & Contingency Grid",
      "type": "content",
      "content": "| Risk | Likelihood | Impact | Mitigation |\n|------|------------|--------|------------|\n| **Key stakeholder no-show** | Med | High | Record kickoff video; assign proxy decision-maker |\n| **Tech failure (platform outage)** | Low | High | Backup platform link + offline worksheets |\n| **Visa / Travel delay** | Low | Med | Hybrid join option; ship kits |\n| **Participant drop-offs** | Med | Med | Over-invite by 15%; standby list |\n| **Data privacy concern** | Med | High | NDAs; masked transcripts |"
    },
    {
      "id": "section-15-8",
      "title": "15.8 Legal & Ethical Prep",
      "type": "content",
      "content": "1. **Consent Forms** — Cover recording, AI processing, and publication rights\n2. **Data Handling SOP** — Retention period, storage encryption, access control\n3. **Accessibility Checklist** — WCAG 2.2 AA digital assets; wheelchair access, captioning"
    },
    {
      "id": "section-15-9",
      "title": "15.9 Kickoff Communication Pack",
      "type": "content",
      "content": "| Asset | Content | Channel | When |\n|-------|---------|---------|------|\n| **Email 1** | Welcome + brief + logistics | Email | T-14 d |\n| **Slack/Discord** | Channel invite + ice-breaker poll | Chat | T-10 d |\n| **Calendar ICS** | Agenda blocks & Zoom link | Calendar | T-10 d |\n| **Pre-Read Deck** | Design thinking primer (8 slides) | Link | T-10 d |\n| **Reminder SMS** | Start-time + parking/Zoom tips | SMS | T-1 d |"
    },
    {
      "id": "section-15-10",
      "title": "15.10 Hybrid Facilitation Roles",
      "type": "content",
      "content": "| Role | Responsibility |\n|------|----------------|\n| **Room Anchor** | Physical space energy, artifact camera |\n| **Remote Champion** | Monitor chat, flag questions, poll |\n| **Tech Producer** | Recording, breakout management |\n| **Time-Keeper** | Visible timer, session transitions |\n\n**Tip:** Rotate roles daily for skill sharing."
    },
    {
      "id": "section-15-11",
      "title": "15.11 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Symptom | Fix |\n|---------|---------|-----|\n| **Scope Creep** | Sponsor adds extra goals late | Re-validate brief; park list |\n| **No-Shows** | Empty seats, low diversity | Over-invite; virtual backup |\n| **Tool Fatigue** | Participants juggle 5 apps | Limit to 1 canvas + 1 video + 1 chat |\n| **Snack Crash** | Afternoon energy dip | Schedule 15-min stretch & protein snacks |\n\n## Key Takeaways\n\n- **Scoping clarity, participant mix, and environment readiness** are the foundations of workshop success\n- **Back-plan from T-30 days**; lock logistics early to free mental bandwidth for facilitation craft\n- **Budget realistically**—including AI credits—plus 10% contingency\n- **Hybrid setups demand dedicated Remote Champion** to ensure inclusion\n- **Proactive risk planning** avoids last-minute chaos; embrace flexibility when surprises arise"
    },
    {
      "id": "section-15-13",
      "title": "15.13 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"The Art of Gathering\" (Priya Parker) — purposeful convening\n- **Paper:** Hasso Plattner Institute (2022) \"Impact of Pre-Workshop Alignment on Outcome Quality\"\n- **Toolkit:** createx.us/toolkit/logistics-suite (challenge brief, budget sheet, back-plan Gantt, consent forms)\n- **Podcast:** Workshop Workflows — Ep. 29 \"Hybrid Logistics Hacks\"\n\n## Facilitator Checklist\n\n☐ Challenge brief signed  \n☐ Participant matrix filled  \n☐ Venue / platform booked  \n☐ Pre-reads sent  \n☐ Risk grid complete  \n☐ Tech rehearsal passed\n\n## Reflection Questions\n\n1. How will you balance thorough planning with maintaining flexibility for unexpected changes?\n2. What specific strategies will you use to ensure equal participation in hybrid workshop settings?\n3. How can you adapt these logistics frameworks to your organization's specific constraints and culture?\n\n## Further Resources\n\n- **Templates:** Challenge Brief, Participant Selection Matrix, Budget Template, Timeline Back-Plan\n- **Risk Management:** Contingency Grid, Legal & Ethical Prep checklist\n- **Communication:** Kickoff Communication Pack, Hybrid Facilitation role guides"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-15-0",
      "title": "15.0 开场故事",
      "type": "content",
      "content": "\"工作坊在哪里？\"\n\n当CreateX引导师纳迪亚·帕特尔到达吉隆坡的共同工作空间时，她发现一半的参与者被堵在路上，空调还坏了。快速调整：她开启了并行的Zoom会议室，快递零食代金券，并在吊扇下重新安排座位。会议延迟了20分钟开始，但准时结束，AoCC得分创纪录。教训是：优秀的引导始于第一张便利贴之前的几天——在范围界定和物流准备中。"
    },
    {
      "id": "section-15-1",
      "title": "15.1 为什么需要范围界定与物流？",
      "type": "content",
      "content": "**核心益处：**\n- **合适规模挑战** 避免模糊的\"大而全\"简介\n- **运营就绪** 确保工具、空间和人员顺畅配合\n- **利益相关者对齐** 防止最后时刻的阻挠者\n\n跳过这个阶段会成倍增加下游混乱，损害可信度，膨胀预算。"
    },
    {
      "id": "section-15-2",
      "title": "15.2 挑战框架清单",
      "type": "interactive",
      "content": "| 项目 | 指导提示 | 负责人 |\n|------|----------------|-------|\n| **问题陈述** | 是否明确用户、需求和情境？ | 发起人 |\n| **成功指标** | 至少有一个定量和一个定性KPI？ | 产品负责人 |\n| **约束条件** | 预算、技术栈、政策规则是否明确？ | 法务/IT |\n| **非目标** | 哪些超出范围？ | 引导师 |\n| **为什么现在** | 紧迫性是否清晰？ | 发起人 |\n\n**模板链接：** createx.us/toolkit/challenge-brief"
    },
    {
      "id": "section-15-3",
      "title": "15.3 参与者选择矩阵",
      "type": "content",
      "content": "| 角色 | 理想占比 | 理由 |\n|------|---------|-----------|\n| **核心用户/受益者** | 25–35% | 在现实中建立共情 |\n| **领域专家** | 10–15% | 提供约束和深度 |\n| **决策者** | 10% | 快速推进采用 |\n| **制造者（设计、开发）** | 20–30% | 原型制作力量 |\n| **意外之选（多元观点）** | 10–15% | 认知多样性 |\n\n**团队规模黄金区间：** 总共10–30人。更多 = 难以管理，更少 = 想法库有限。"
    },
    {
      "id": "section-15-4",
      "title": "15.4 环境与工具",
      "type": "interactive",
      "content": "| 维度 | 现场 | 虚拟/混合 |\n|-----------|-----------|------------------|\n| **空间** | 每人≥ 1.5平方米，可移动墙面，理想有日光 | 安静房间，每位参与者稳定10 Mbps |\n| **表面** | 白板≥ 7米，便利贴友好 | 数字画布（BoardX等）已设置 |\n| **音频** | 超过20人需无线麦克风 | 优质耳机；启用回音消除 |\n| **录制** | 三脚架高清摄像头 | 屏幕录制 + 云端转录 |\n| **材料** | 便利贴（3色）、马克笔、计时器、相机 | 模板链接，预命名分组会议室 |"
    },
    {
      "id": "section-15-5",
      "title": "15.5 预算模板（美元）",
      "type": "interactive",
      "content": "| 类别 | 典型占比 | 说明 |\n|----------|-----------|------|\n| **引导费用** | 45% | 包括准备和综合 |\n| **场地/平台** | 15% | 共同工作空间日租或Zoom Pro |\n| **材料/工具** | 8% | 便利贴、原型套件、AI积分 |\n| **餐饮/零食** | 12% | 能量维持 |\n| **差旅/住宿** | 10% | 如果多地点 |\n| **应急费用** | 10% | 意外情况 |\n\n**规则：** 为AI工具使用和云存储预留总额的15%，根据组织现有许可证调整。"
    },
    {
      "id": "section-15-6",
      "title": "15.6 时间线倒推计划（T减）",
      "type": "content",
      "content": "| T日期 | 里程碑 |\n|--------|-----------|\n| **T-30天** | 确定挑战简介 + 预算 |\n| **T-21天** | 确保场地/平台；发送保存日期 |\n| **T-14天** | 确认参与者；派发预读材料和CCS-10调查 |\n| **T-10天** | 技术彩排；偏见扫描AI工具 |\n| **T-7天** | 材料订购/模板锁定 |\n| **T-2天** | 议程试运行；备用网络/电源计划 |\n| **T-0** | 工作坊日 |\n| **T+1天** | 立即AAR + AoCC记录 |\n| **T+7天** | 交付综合包 |"
    },
    {
      "id": "section-15-7",
      "title": "15.7 风险与应急网格",
      "type": "content",
      "content": "| 风险 | 可能性 | 影响 | 缓解措施 |\n|------|------------|--------|------------|\n| **关键利益相关者缺席** | 中 | 高 | 录制启动视频；指定代理决策者 |\n| **技术故障（平台中断）** | 低 | 高 | 备用平台链接 + 离线工作表 |\n| **签证/差旅延误** | 低 | 中 | 混合加入选项；邮寄套件 |\n| **参与者退出** | 中 | 中 | 超额邀请15%；候补名单 |\n| **数据隐私担忧** | 中 | 高 | 保密协议；屏蔽转录 |"
    },
    {
      "id": "section-15-8",
      "title": "15.8 法律与道德准备",
      "type": "content",
      "content": "1. **同意书** — 涵盖录制、AI处理和发布权利\n2. **数据处理SOP** — 保留期、存储加密、访问控制\n3. **无障碍清单** — WCAG 2.2 AA数字资产；轮椅通道、字幕"
    },
    {
      "id": "section-15-9",
      "title": "15.9 启动沟通包",
      "type": "content",
      "content": "| 资产 | 内容 | 渠道 | 时间 |\n|-------|---------|---------|------|\n| **邮件1** | 欢迎 + 简介 + 物流 | 邮件 | T-14天 |\n| **Slack/Discord** | 频道邀请 + 破冰投票 | 聊天 | T-10天 |\n| **日历ICS** | 议程模块和Zoom链接 | 日历 | T-10天 |\n| **预读资料** | 设计思维入门（8张幻灯片） | 链接 | T-10天 |\n| **提醒短信** | 开始时间 + 停车/Zoom技巧 | 短信 | T-1天 |"
    },
    {
      "id": "section-15-10",
      "title": "15.10 混合引导角色",
      "type": "content",
      "content": "| 角色 | 职责 |\n|------|----------------|\n| **现场主持** | 物理空间能量，人工制品摄像头 |\n| **远程冠军** | 监控聊天，标记问题，投票 |\n| **技术制片人** | 录制，分组管理 |\n| **计时员** | 可见计时器，会议转换 |\n\n**提示：** 每日轮换角色以分享技能。"
    },
    {
      "id": "section-15-11",
      "title": "15.11 常见陷阱与解决方案",
      "type": "content",
      "content": "| 陷阱 | 症状 | 解决方案 |\n|---------|---------|-----|\n| **范围蔓延** | 发起人后期添加额外目标 | 重新验证简介；停车清单 |\n| **缺席** | 空座位，多样性低 | 超额邀请；虚拟备份 |\n| **工具疲劳** | 参与者需要使用5个应用 | 限制为1个画布 + 1个视频 + 1个聊天 |\n| **零食崩溃** | 下午能量下降 | 安排15分钟伸展和蛋白质零食 |\n\n## 关键要点\n\n- **范围清晰、参与者组合和环境就绪** 是工作坊成功的基础\n- **从T-30天开始倒推计划**；早期锁定物流以释放心理带宽用于引导技巧\n- **实际预算**——包括AI积分——加上10%应急费用\n- **混合设置需要专门的远程冠军** 确保包容性\n- **主动风险规划** 避免最后时刻混乱；在意外出现时拥抱灵活性"
    },
    {
      "id": "section-15-13",
      "title": "15.13 现场笔记与延伸阅读",
      "type": "content",
      "content": "- **书籍：**《聚会的艺术》（普里亚·帕克）— 有目的的召集\n- **论文：** 哈索·普拉特纳研究所（2022）\"工作坊前对齐对结果质量的影响\"\n- **工具包：** createx.us/toolkit/logistics-suite（挑战简介、预算表、倒推甘特图、同意书）\n- **播客：** 工作坊工作流程 — 第29集\"混合物流技巧\"\n\n## 引导师清单\n\n☐ 挑战简介已签署  \n☐ 参与者矩阵已填写  \n☐ 场地/平台已预订  \n☐ 预读材料已发送  \n☐ 风险网格已完成  \n☐ 技术彩排已通过\n\n## 反思问题\n\n1. 您将如何平衡彻底规划与保持意外变化的灵活性？\n2. 您将使用什么具体策略确保混合工作坊环境中的平等参与？\n3. 您如何将这些物流框架适应您组织的特定约束和文化？\n\n## 进一步资源\n\n- **模板：** 挑战简介、参与者选择矩阵、预算模板、时间线倒推计划\n- **风险管理：** 应急网格、法律和道德准备清单\n- **沟通：** 启动沟通包、混合引导角色指南"
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
    moduleTitle: '范围界定与物流',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '中级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个',
    nextModule: '下一模块',
    workshopDesign: '工作坊设计'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Scoping & Logistics',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Intermediate',
    moduleSections: 'Module Sections',
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next',
    nextModule: 'Next Module',
    workshopDesign: 'Workshop Design'
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
                    {uiText.chapter} 15
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{uiText.workshopDesign}</span>
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
                    href={`/${params.lang}/modules/agenda-design`}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>{uiText.nextModule}</span>
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

const ScopingLogisticsPage = withModuleProgress(
  ScopingLogisticsComponent,
  'scoping-logistics',
  9
);

export default ScopingLogisticsPage;
