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

function CapturingOutcomesComponent({
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
        "id": "section-20-0",
        "title": "20.0 Why Capture Matters",
        "type": "content",
        "content": "A workshop's true value emerges after the session—when insights spread, prototypes evolve, and decisions stick. Systematic capture:\n\n1. **Preserves evidence** for future iterations and stakeholders\n2. **Accelerates hand-offs** to implementation teams\n3. **Multiplies impact** by sharing success stories across the CreateX network"
    },
    {
        "id": "section-20-1",
        "title": "20.1 Outcome Taxonomy",
        "type": "content",
        "content": "| Layer | Example Artifacts | Primary Audience |\n|-------|-------------------|------------------|\n| **Raw Assets** | Video recordings, BoardX canvases, photos, chat logs | Facilitation team |\n| **Structured Summaries** | Insight slide deck, prototype GIFs, KPI tables | Sponsors, project team |\n| **Storytelling Packages** | 1-min highlight reel, blog post, social carousel | Wider org & community |\n| **Knowledge Assets** | New method templates, AI prompt snippets | Global CreateX library |"
    },
    {
        "id": "section-20-2",
        "title": "20.2 Live Capture Tactics",
        "type": "content",
        "content": "| Method | When | Tool | Tip |\n|--------|------|------|-----|\n| **Visual Note-Taking (Scribing)** | Key discussions | iPad + Procreate mirrored to screen |\n| **Screenshot Macro** | Prototyping sprints | BoardX shortcut saves frame to /captures |\n| **QR Check-Point** | End of each phase | QR leads to Google Form quick survey |\n| **Hashtag Thread** | Whole day | Slack #live-feed auto-collates quotes |\n\n**AI Assist:** Auto-label screenshots with timestamp & phase."
    },
    {
        "id": "section-20-3",
        "title": "20.3 BoardX Export Pipeline",
        "type": "content",
        "content": "```\nCanvas → 'Export Snapshot' → PDF bundle (stickies + layers)\n↳ Auto-upload to Workshop Drive /YYYY-MM-DD_Project\n↳ Generate share link with viewer permissions\n↳ Link inserted into Recap Deck slide 2\n```\n\n**Tip:** Name frames 01_Affinity, 02_HMW, … to preserve order."
    },
    {
        "id": "section-20-4",
        "title": "20.4 Post-Workshop Survey (5 min)",
        "type": "interactive",
        "content": "| Question | Metric Captured |\n|----------|-----------------|\n| **\"Rate your creative confidence before vs. after\"** | CCD delta |\n| **\"What was most valuable?\"** | Qual themes |\n| **\"What should we drop or improve?\"** | Backlog input |\n| **NPS (0-10)** | Workshop Net Promoter Score |\n\n**AI Prompt:** \"Cluster open responses into themes; output bar chart data.\""
    },
    {
        "id": "section-20-5",
        "title": "20.5 Recap Deck Structure (≤ 12 slides)",
        "type": "content",
        "content": "1. **Title + photo collage**\n2. **Objectives & AoCC added**\n3. **Key insights (3)**\n4. **HMW shortlist**\n5. **Idea portfolio heat-map**\n6. **Winning concept poster**\n7. **Prototype demo GIF + KPI snapshot**\n8. **User test highlights (quotes + metrics)**\n9. **Next-step action list (RACI table)**\n10. **Risks & support needed**\n11. **Thank-you + credits**\n12. **Appendix links (full assets)**"
    },
    {
        "id": "section-20-6",
        "title": "20.6 Highlight Reel (≤ 90 sec)",
        "type": "content",
        "content": "| Segment (sec) | Clip | Caption |\n|---------------|------|---------|\n| **0-10** | Warm-up laugh moment | \"Psychological safety sparks creativity\" |\n| **11-35** | Sticky explosion timelapse | \"150 insights in 30 min\" |\n| **36-60** | Prototype interaction | \"Testing with real users\" |\n| **61-80** | Stakeholder 'aha' reaction | \"Decision made\" |\n| **81-90** | Call-to-action | \"Join CreateX • createx.us\" |\n\n**Tooling:** CapCut template; auto-subtitles via Whisper."
    },
    {
        "id": "section-20-7",
        "title": "20.7 Knowledge Repository Workflow",
        "type": "content",
        "content": "| Step | Action | Owner | Deadline |\n|------|--------|-------|----------|\n| **1** | Push raw assets to Drive | Tech Producer | +1 day |\n| **2** | Publish recap deck & reel | Facilitator | +3 days |\n| **3** | Extract new template/prompt | Insight Librarian | +5 days |\n| **4** | Post case summary to Wiki | Comms Lead | +7 days |\n\n**All content licensed CC-BY-SA by default; internal embargo ≤ 14 days if NDA.**"
    },
    {
        "id": "section-20-8",
        "title": "20.8 Metrics Dashboard (Live)",
        "type": "content",
        "content": "| Metric | Source | Target | Status |\n|--------|--------|--------|--------|\n| **Acts of Creative Confidence (AoCC)** | BoardX log | +200 | 218 ✅ |\n| **CCD (avg)** | Survey | +2.0 pts | +2.3 ✅ |\n| **Workshop NPS** | Survey | ≥ +50 | +62 ✅ |\n| **Prototype→Pilot Rate** | Impl. tracker | ≥ 1 in 3 | Pending |\n\n**BoardX syncs to Looker Studio; share public link in recap email.**"
    },
    {
        "id": "section-20-9",
        "title": "20.9 Story Distribution Channels",
        "type": "content",
        "content": "| Medium | Audience | Frequency |\n|--------|----------|-----------|\n| **LinkedIn carousel** | Industry peers | +48 h |\n| **Internal newsletter** | Org employees | Next newsletter cycle |\n| **CreateX Showcase Gallery** | Global community | Monthly drop |\n| **Conference CFP** | External | As relevant |\n\n**AI Assist:** \"Rewrite slide 3 key insight for LinkedIn (≤ 180 chars, engaging).\""
    },
    {
        "id": "section-20-10",
        "title": "20.10 Common Pitfalls & Fixes",
        "type": "content",
        "content": "| Pitfall | Impact | Fix |\n|---------|--------|-----|\n| **Asset Scatter** | Hard to find files | Standard naming + single Drive |\n| **Oversized Deck** | Execs glaze over | 12-slide cap; link appendix |\n| **Data Privacy Slip** | Legal risk | Redact PII; NDA check |\n| **Recap Lag** | Momentum loss | Draft deck skeleton before workshop |\n\n## Key Takeaways\n\n- **Capture raw → structured → story → knowledge layers** systematically\n- **Automate with BoardX exports & AI summarizers** but maintain human curation\n- **Deliver a concise recap deck and highlight reel** within 3 days\n- **Log metrics in a transparent dashboard** to sustain accountability and celebrate wins"
    },
    {
        "id": "section-20-12",
        "title": "20.12 Field Notes & Further Reading",
        "type": "content",
        "content": "- **Book:** \"Show Your Work!\" (Austin Kleon)\n- **Paper:** IDEO (2024) \"From Insights to Influence: Sharing Workshop Outcomes\"\n- **Toolkit:** createx.us/toolkit/outcomes-pack (recap deck template, survey form, highlight reel storyboard)\n- **Podcast:** Output Opus — Ep. 19 \"Visual Storytelling for Innovation Workshops\"\n\n## Facilitator Checklist\n\n☐ Visual note-taker booked  \n☐ BoardX export folder created  \n☐ Survey link ready  \n☐ Recap deck shell pre-built  \n☐ Highlight reel storyboard set\n\n## Reflection Questions\n\n1. How will you balance comprehensive capture with participant privacy and data protection?\n2. What specific storytelling formats would resonate most with your stakeholder audiences?\n3. How can you create systems to ensure captured knowledge actually gets reused and improved upon?\n\n## Further Resources\n\n- **Capture Systems:** Live capture tactics, BoardX export workflows, automated archival pipelines\n- **Documentation:** Recap deck templates, survey instruments, highlight reel production guides\n- **Distribution:** Story packaging formats, channel optimization, knowledge repository standards"
    }
];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
        "id": "section-20-0",
        "title": "20.0 为什么要捕获成果",
        "type": "content",
        "content": "工作坊的真正价值在会议结束后才显现——当见解传播、原型演进、决策得以坚持时。系统性捕获的作用：\n\n1. **为未来迭代和利益相关者保存证据**\n2. **加速向实施团队的交接**\n3. **通过在CreateX网络中分享成功故事来倍增影响力**"
    },
    {
        "id": "section-20-1",
        "title": "20.1 成果分类法",
        "type": "content",
        "content": "| 层级 | 示例制品 | 主要受众 |\n|------|---------|----------|\n| **原始资产** | 视频录制、BoardX画布、照片、聊天记录 | 引导团队 |\n| **结构化摘要** | 洞察幻灯片、原型GIF、KPI表格 | 赞助商、项目团队 |\n| **故事包装** | 1分钟精彩回放、博客文章、社交媒体轮播 | 更广泛的组织和社区 |\n| **知识资产** | 新方法模板、AI提示片段 | 全球CreateX库 |"
    },
    {
        "id": "section-20-2",
        "title": "20.2 实时捕获策略",
        "type": "content",
        "content": "| 方法 | 时机 | 工具 | 技巧 |\n|------|------|------|------|\n| **可视化笔记（速记）** | 关键讨论 | iPad + Procreate镜像到屏幕 |\n| **截图宏** | 原型设计冲刺 | BoardX快捷键保存帧到/captures |\n| **二维码检查点** | 每个阶段结束 | 二维码链接到谷歌表单快速调查 |\n| **标签线程** | 全天 | Slack #live-feed自动整理引用 |\n\n**AI辅助：** 自动为截图添加时间戳和阶段标签。"
    },
    {
        "id": "section-20-3",
        "title": "20.3 BoardX导出流程",
        "type": "content",
        "content": "```\n画布 → '导出快照' → PDF包（便签+图层）\n↳ 自动上传到工作坊云盘 /YYYY-MM-DD_Project\n↳ 生成查看权限的分享链接\n↳ 链接插入到回顾幻灯片第2页\n```\n\n**技巧：** 将框架命名为01_关联性、02_HMW...以保持顺序。"
    },
    {
        "id": "section-20-4",
        "title": "20.4 工作坊后调查（5分钟）",
        "type": "interactive",
        "content": "| 问题 | 捕获的指标 |\n|------|----------|\n| **\"评价您工作坊前后的创意信心\"** | CCD差值 |\n| **\"什么最有价值？\"** | 定性主题 |\n| **\"我们应该放弃或改进什么？\"** | 待办事项输入 |\n| **NPS (0-10)** | 工作坊净推荐值 |\n\n**AI提示：** \"将开放式回答聚类成主题；输出条形图数据。\""
    },
    {
        "id": "section-20-5",
        "title": "20.5 回顾幻灯片结构（≤12张）",
        "type": "content",
        "content": "1. **标题+照片拼贴**\n2. **目标和新增的AoCC**\n3. **关键洞察（3个）**\n4. **HMW候选清单**\n5. **创意组合热力图**\n6. **获胜概念海报**\n7. **原型演示GIF + KPI快照**\n8. **用户测试亮点（引用+指标）**\n9. **下一步行动清单（RACI表）**\n10. **风险和所需支持**\n11. **感谢+致谢**\n12. **附录链接（完整资产）**"
    },
    {
        "id": "section-20-6",
        "title": "20.6 精彩回放（≤90秒）",
        "type": "content",
        "content": "| 片段（秒） | 镜头 | 字幕 |\n|-----------|------|------|\n| **0-10** | 热身欢笑时刻 | \"心理安全激发创造力\" |\n| **11-35** | 便签爆炸延时摄影 | \"30分钟内150个洞察\" |\n| **36-60** | 原型交互 | \"与真实用户测试\" |\n| **61-80** | 利益相关者\"啊哈\"反应 | \"决策已做出\" |\n| **81-90** | 行动号召 | \"加入CreateX • createx.us\" |\n\n**工具：** CapCut模板；通过Whisper自动字幕。"
    },
    {
        "id": "section-20-7",
        "title": "20.7 知识库工作流程",
        "type": "content",
        "content": "| 步骤 | 行动 | 负责人 | 截止时间 |\n|------|------|--------|----------|\n| **1** | 将原始资产推送到云盘 | 技术制作人 | +1天 |\n| **2** | 发布回顾幻灯片和回放 | 引导师 | +3天 |\n| **3** | 提取新模板/提示 | 洞察库管理员 | +5天 |\n| **4** | 在Wiki上发布案例摘要 | 传播负责人 | +7天 |\n\n**所有内容默认使用CC-BY-SA许可；如有NDA，内部禁令≤14天。**"
    },
    {
        "id": "section-20-8",
        "title": "20.8 指标仪表板（实时）",
        "type": "content",
        "content": "| 指标 | 来源 | 目标 | 状态 |\n|------|------|------|------|\n| **创意信心行为(AoCC)** | BoardX日志 | +200 | 218 ✅ |\n| **CCD (平均)** | 调查 | +2.0分 | +2.3 ✅ |\n| **工作坊NPS** | 调查 | ≥ +50 | +62 ✅ |\n| **原型→试点率** | 实施跟踪器 | ≥ 1/3 | 待定 |\n\n**BoardX同步到Looker Studio；在回顾邮件中分享公开链接。**"
    },
    {
        "id": "section-20-9",
        "title": "20.9 故事分发渠道",
        "type": "content",
        "content": "| 媒体 | 受众 | 频率 |\n|------|------|------|\n| **LinkedIn轮播** | 行业同行 | +48小时 |\n| **内部通讯** | 组织员工 | 下一期通讯周期 |\n| **CreateX展示画廊** | 全球社区 | 月度发布 |\n| **会议CFP** | 外部 | 视相关性而定 |\n\n**AI辅助：** \"将第3张幻灯片的关键洞察重写为LinkedIn格式（≤180字符，吸引人）。\""
    },
    {
        "id": "section-20-10",
        "title": "20.10 常见陷阱和解决方案",
        "type": "content",
        "content": "| 陷阱 | 影响 | 解决方案 |\n|------|------|----------|\n| **资产分散** | 文件难找 | 标准命名+单一云盘 |\n| **幻灯片过大** | 高管走神 | 12张上限；链接附录 |\n| **数据隐私失误** | 法律风险 | 删除PII；NDA检查 |\n| **回顾滞后** | 失去动力 | 工作坊前起草幻灯片框架 |\n\n## 关键要点\n\n- **系统性地捕获原始→结构化→故事→知识层级**\n- **使用BoardX导出和AI摘要器自动化**，但保持人工策划\n- **在3天内提供简洁的回顾幻灯片和精彩回放**\n- **在透明仪表板中记录指标**以维持问责制并庆祝胜利"
    },
    {
        "id": "section-20-12",
        "title": "20.12 现场笔记和延伸阅读",
        "type": "content",
        "content": "- **书籍：** \"Show Your Work!\" (Austin Kleon)\n- **论文：** IDEO (2024) \"From Insights to Influence: Sharing Workshop Outcomes\"\n- **工具包：** createx.us/toolkit/outcomes-pack（回顾幻灯片模板、调查表单、精彩回放故事板）\n- **播客：** Output Opus — Ep. 19 \"创新工作坊的可视化故事讲述\"\n\n## 引导师检查清单\n\n☐ 已预约可视化记录员  \n☐ 已创建BoardX导出文件夹  \n☐ 调查链接准备就绪  \n☐ 回顾幻灯片框架预构建  \n☐ 精彩回放故事板设置完成\n\n## 反思问题\n\n1. 您如何在全面捕获与参与者隐私和数据保护之间取得平衡？\n2. 什么特定的故事讲述格式最能与您的利益相关者受众产生共鸣？\n3. 您如何创建系统来确保捕获的知识真正得到重用和改进？\n\n## 延伸资源\n\n- **捕获系统：** 实时捕获策略、BoardX导出工作流程、自动化归档管道\n- **文档：** 回顾幻灯片模板、调查工具、精彩回放制作指南\n- **分发：** 故事包装格式、渠道优化、知识库标准"
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
    moduleTitle: '捕获成果',
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
    moduleTitle: 'Capturing Outcomes',
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
                    {uiText.chapter} 20
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
                    className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors ${
                      currentSection === index
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    moduleProgress.moduleProgress.sectionsCompleted.has(currentSection)
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
                    href={`/${params.lang}/modules/case-study-corporate`}
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

const CapturingOutcomesPage = withModuleProgress(
  CapturingOutcomesComponent,
  'capturing-outcomes',
  8
);

export default CapturingOutcomesPage;
