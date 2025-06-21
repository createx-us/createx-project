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

function AiIntegrationComponent({
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
      "id": "section-18-0",
      "title": "18.0 Why an AI Playbook?",
      "type": "content",
      "content": "Generative AI can slash busy-work, spark unconventional ideas, and surface hidden insights—but mis-applied it creates bias, noise, or dependency. The AI Integration Playbook ensures facilitators employ AI purposefully, transparently, and ethically at every workshop stage."
    },
    {
      "id": "section-18-1",
      "title": "18.1 Tool-Selection Matrix",
      "type": "interactive",
      "content": "| Stage | Job-to-Be-Done | High-Fit Tools (2025) | Offline Fallback |\n|-------|----------------|----------------------|------------------|\n| **Discover** | Transcribe & translate interviews | OpenAI Whisper-Live, DeepL | Human note-taker |\n| **Define** | Cluster themes, draft insights | GPT-4o, Claude 3 Sonnet | Manual affinity |\n| **Ideate** | Generate idea sparks & visuals | ChatGPT, Gemini 1.5, Midjourney v7 | SCAMPER cards |\n| **Prototype** | Prompt-to-UI, code snippets | Galileo AI, Codeium | Paper prototype |\n| **Test** | Sentiment & click-path analytics | Maze AI, VADER | Manual notes grid |\n| **Reflect** | Auto-summarize AAR notes | GPT-4o | Facilitator synthesis |\n\n**Decision Filter (\"3 L\"):** Leverage (10× faster?), Learnability (15 min to onboard?), Licensing (complies with CC-BY-SA?)."
    },
    {
      "id": "section-18-2",
      "title": "18.2 Prompt-Crafting Framework (\"C-T-E-C-O\")",
      "type": "content",
      "content": "1. **Context** — Explain user, stage, objective\n2. **Task** — Imperative verb (\"cluster\", \"rewrite\", \"brainstorm\")\n3. **Exemplars** — Show 1-2 examples of desired output\n4. **Constraints** — Word count, tone, banned jargon\n5. **Output Format** — Bullet list, JSON, Markdown table\n\n**Prompt Template:**\n```\nYou are an AI {role}. Context: {workshop stage & goal}.\nTask: {imperative}. Examples: {if any}.\nConstraints: {list}.\nOutput as {format}.\n```"
    },
    {
      "id": "section-18-3",
      "title": "18.3 Data & Ethics Checklist (run at kickoff + closure)",
      "type": "interactive",
      "content": "| Checkpoint | Question | Action if \"No\" |\n|------------|----------|----------------|\n| **Consent** | Have participants agreed to AI processing & storage? | Obtain digital consent or bypass tool |\n| **PII Scrub** | Does dataset exclude personal identifiers? | Mask / hash fields |\n| **Bias Scan** | Output free of protected-class stereotypes? | Re-prompt with neutrality constraints |\n| **IP Rights** | Is generated content CC-compatible? | Regenerate or license separately |\n| **Audit Trail** | Prompt + output logged? | Save to AI-Trace sheet |"
    },
    {
      "id": "section-18-4",
      "title": "18.4 Integration Recipes by Stage",
      "type": "content",
      "content": "| Stage | Recipe | Time-Save | Quality Gain |\n|-------|--------|-----------|--------------|\n| **Instant Theme Clustering (Define)** | Feed cleaned transcript → GPT: \"Return top 7 themes, quote IDs.\" | 90 → 5 min | Broad coverage |\n| **Wild-Card Ideation Burst (Ideate)** | \"Suggest 20 sci-fi remixes of HMW: {text}.\" | 20 → 3 min | Novelty spike |\n| **Figma JSON Generator (Prototype)** | \"Generate wireframe JSON for mobile flow of {concept}.\" → Import to Figma plugin | 2 h → 10 min | Consistent layout |\n| **Sentiment Timeline (Test)** | Feed user video → Vision + VAD model → CSV valence by second | Manual coding 4 h → auto 15 min | Hidden frustration spots |"
    },
    {
      "id": "section-18-5",
      "title": "18.5 Troubleshooting Guide",
      "type": "content",
      "content": "| Issue | Symptom | Remedy |\n|-------|---------|---------|\n| **Hallucination** | Invented data / sources | Add \"If unsure, say 'unknown'.\" constraint; verify manually |\n| **Prompt Drift** | Outputs lose focus mid-workshop | Re-paste original prompt scaffold; use system role reset |\n| **Rate-Limit** | 429 errors during demo | Local LLM fallback (Mistral 7B) or cached responses |\n| **Latency** | 10-second lag kills flow | Pre-generate examples; switch to narrower model (GPT-3.5) |"
    },
    {
      "id": "section-18-6",
      "title": "18.6 Facilitator Guardrails",
      "type": "content",
      "content": "1. **Human-in-the-Loop** — Participants must review & edit AI outputs before adoption\n2. **Transparency Tag** — Label AI-generated artifacts with ✦ icon\n3. **Skill-Building Balance** — Alternate manual first → AI accelerate to teach underlying method\n4. **Privacy Scope** — Use local LLMs for sensitive corp data; no cloud upload"
    },
    {
      "id": "section-18-7",
      "title": "18.7 Skill-Up Micro-Lessons (5 min each)",
      "type": "content",
      "content": "| Topic | Exercise |\n|-------|----------|\n| **Prompt Refinement** | \"Iterate a weak prompt into strong using C-T-E-C-O; compare outputs.\" |\n| **Bias Spotting** | Red-team generated copy for gendered language |\n| **AI + HMW Remix** | Feed HMW, get 10 variants, choose inclusive wording |\n| **Copilot Pairing** | Voice-dictate idea, AI expands to bullet plan; human edits |"
    },
    {
      "id": "section-18-8",
      "title": "18.8 Future-Proofing: Model & Tool Tracking",
      "type": "interactive",
      "content": "| Cadence | Action |\n|---------|--------|\n| **Monthly** | Check model release notes (OpenAI, Anthropic, Google, open-source) |\n| **Quarterly** | Re-evaluate tool-selection matrix with L-L-L filter |\n| **Ad-hoc** | Test emergent multimodal (audio-vis-code) features in sandbox before field |\n\n**Maintain AI-Playbook Changelog in CreateX Wiki; facilitators subscribe for push alerts.**"
    },
    {
      "id": "section-18-9",
      "title": "18.9 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Cause | Fix |\n|---------|-------|-----|\n| **Over-Automation** | Letting AI do empathy tasks | Keep user interviews human-led; AI for summarizing |\n| **Trust Erosion** | Undisclosed AI use | Announce tool, purpose, and review step |\n| **Monoculture Ideas** | Same model bias | Diversify: mix GPT, Claude, open-source; include manual brainstorm |\n\n## Key Takeaways\n\n- **Choose AI tools fit-for-stage** using Leverage · Learnability · Licensing criteria\n- **Craft prompts with C-T-E-C-O** to boost precision, safety, and usable outputs\n- **Run Data & Ethics Checklist** at kickoff and closure; maintain audit trail\n- **AI is a speed & breadth amplifier**—humans retain judgment, empathy, and ethics"
    },
    {
      "id": "section-18-11",
      "title": "18.11 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"Prompt Engineering for Everyone\" (Chen, 2024)\n- **Paper:** Google DeepMind (2024) \"Ethical Frameworks for Generative AI Co-Creation\"\n- **Toolkit:** createx.us/toolkit/ai-playbook (checklists, prompt library, troubleshooting cards)\n- **Podcast:** AI in Facilitation — Ep. 12 \"From Hype to Habit\"\n\n## Facilitator Checklist\n\n☐ Tool-Selection Matrix reviewed  \n☐ Prompts drafted using C-T-E-C-O  \n☐ Consent & ethics forms signed  \n☐ Audit log recording  \n☐ Backup offline flows prepared\n\n## Reflection Questions\n\n1. How will you balance AI efficiency gains with maintaining human-centered design principles?\n2. What specific ethical safeguards are most important for your workshop contexts?\n3. How can you develop your prompt crafting skills to maximize AI tool effectiveness?\n\n## Further Resources\n\n- **Selection Tools:** Tool-Selection Matrix, 3-L Decision Filter, Stage-specific integration recipes\n- **Ethics & Safety:** Data & Ethics Checklist, Bias scanning protocols, Consent frameworks\n- **Skill Development:** C-T-E-C-O framework, Micro-lessons, Troubleshooting guides"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-18-0",
      "title": "18.0 为什么需要AI手册？",
      "type": "content",
      "content": "生成式AI可以减少繁琐工作、激发非常规想法、发现隐藏洞察——但误用会产生偏见、噪音或依赖。AI集成手册确保引导师在每个工作坊阶段都有目的、透明和伦理地使用AI。"
    },
    {
      "id": "section-18-1",
      "title": "18.1 工具选择矩阵",
      "type": "interactive",
      "content": "| 阶段 | 要完成的工作 | 高适配工具 (2025) | 离线备选 |\n|------|-------------|------------------|----------|\n| **发现** | 转录和翻译访谈 | OpenAI Whisper-Live, DeepL | 人工记录员 |\n| **定义** | 聚类主题，起草洞察 | GPT-4o, Claude 3 Sonnet | 手动关联 |\n| **构思** | 生成想法火花和视觉 | ChatGPT, Gemini 1.5, Midjourney v7 | SCAMPER卡片 |\n| **原型** | 提示生成UI，代码片段 | Galileo AI, Codeium | 纸质原型 |\n| **测试** | 情感和点击路径分析 | Maze AI, VADER | 手动笔记网格 |\n| **反思** | 自动总结AAR笔记 | GPT-4o | 引导师综合 |\n\n**决策过滤器（\"3L\"）：** 杠杆化（快10倍？）、可学习性（15分钟上手？）、许可（符合CC-BY-SA？）。"
    },
    {
      "id": "section-18-2",
      "title": "18.2 提示制作框架（\"C-T-E-C-O\"）",
      "type": "content",
      "content": "1. **背景** — 解释用户、阶段、目标\n2. **任务** — 祈使动词（\"聚类\"、\"重写\"、\"头脑风暴\"）\n3. **示例** — 展示1-2个期望输出的例子\n4. **约束** — 字数、语调、禁用术语\n5. **输出格式** — 项目符号列表、JSON、Markdown表格\n\n**提示模板：**\n```\n你是一个AI {角色}。背景：{工作坊阶段和目标}。\n任务：{祈使句}。示例：{如果有}。\n约束：{列表}。\n输出为{格式}。\n```"
    },
    {
      "id": "section-18-3",
      "title": "18.3 数据和伦理检查清单（启动+结束时运行）",
      "type": "interactive",
      "content": "| 检查点 | 问题 | \"否\"时的行动 |\n|--------|------|-------------|\n| **同意** | 参与者是否同意AI处理和存储？ | 获取数字同意或绕过工具 |\n| **PII清理** | 数据集是否排除个人标识符？ | 掩码/哈希字段 |\n| **偏见扫描** | 输出是否没有受保护群体刻板印象？ | 用中性约束重新提示 |\n| **知识产权** | 生成内容是否兼容CC？ | 重新生成或单独许可 |\n| **审计跟踪** | 提示+输出是否已记录？ | 保存到AI-Trace表 |"
    },
    {
      "id": "section-18-4",
      "title": "18.4 按阶段的集成配方",
      "type": "content",
      "content": "| 阶段 | 配方 | 时间节省 | 质量提升 |\n|------|------|----------|----------|\n| **即时主题聚类（定义）** | 输入清理后的转录→GPT：\"返回前7个主题，引用ID。\" | 90→5分钟 | 广泛覆盖 |\n| **通配符构思爆发（构思）** | \"为HMW建议20个科幻重混：{文本}。\" | 20→3分钟 | 新颖性激增 |\n| **Figma JSON生成器（原型）** | \"为{概念}的移动流程生成线框JSON。\"→导入到Figma插件 | 2小时→10分钟 | 一致布局 |\n| **情感时间线（测试）** | 输入用户视频→视觉+VAD模型→按秒CSV效价 | 手动编码4小时→自动15分钟 | 隐藏挫折点 |"
    },
    {
      "id": "section-18-5",
      "title": "18.5 故障排除指南",
      "type": "content",
      "content": "| 问题 | 症状 | 补救措施 |\n|------|------|----------|\n| **幻觉** | 虚构数据/来源 | 添加\"如不确定，说'未知'。\"约束；手动验证 |\n| **提示漂移** | 输出在工作坊中途失焦 | 重新粘贴原始提示脚手架；使用系统角色重置 |\n| **速率限制** | 演示期间429错误 | 本地LLM备选（Mistral 7B）或缓存响应 |\n| **延迟** | 10秒延迟杀死流程 | 预生成示例；切换到较窄模型（GPT-3.5） |"
    },
    {
      "id": "section-18-6",
      "title": "18.6 引导师护栏",
      "type": "content",
      "content": "1. **人在回路中** — 参与者必须在采用前审查和编辑AI输出\n2. **透明标签** — 用✦图标标记AI生成的制品\n3. **技能建设平衡** — 交替手动优先→AI加速来教授基础方法\n4. **隐私范围** — 对敏感企业数据使用本地LLM；无云上传"
    },
    {
      "id": "section-18-7",
      "title": "18.7 技能提升微课程（每个5分钟）",
      "type": "content",
      "content": "| 主题 | 练习 |\n|------|------|\n| **提示优化** | \"使用C-T-E-C-O将弱提示迭代为强提示；比较输出。\" |\n| **偏见发现** | 为生成文案进行性别语言红队测试 |\n| **AI + HMW重混** | 输入HMW，获得10个变体，选择包容性措辞 |\n| **副驾驶配对** | 语音dictate想法，AI扩展为要点计划；人工编辑 |"
    },
    {
      "id": "section-18-8",
      "title": "18.8 面向未来：模型和工具跟踪",
      "type": "interactive",
      "content": "| 频率 | 行动 |\n|------|------|\n| **月度** | 检查模型发布说明（OpenAI、Anthropic、Google、开源） |\n| **季度** | 用L-L-L过滤器重新评估工具选择矩阵 |\n| **临时** | 在实地使用前在沙盒中测试新兴多模态（音频-视觉-代码）功能 |\n\n**在CreateX Wiki中维护AI-手册更新日志；引导师订阅推送提醒。**"
    },
    {
      "id": "section-18-9",
      "title": "18.9 常见陷阱和修复",
      "type": "content",
      "content": "| 陷阱 | 原因 | 修复 |\n|------|------|------|\n| **过度自动化** | 让AI做共情任务 | 保持用户访谈人工引导；AI用于总结 |\n| **信任侵蚀** | 未公开AI使用 | 宣布工具、目的和审查步骤 |\n| **单一文化想法** | 同一模型偏见 | 多样化：混合GPT、Claude、开源；包括手动头脑风暴 |\n\n## 关键要点\n\n- **使用杠杆·可学习性·许可标准选择适合阶段的AI工具**\n- **用C-T-E-C-O制作提示**以提高精确性、安全性和可用输出\n- **在启动和结束时运行数据和伦理检查清单**；维护审计跟踪\n- **AI是速度和广度放大器**——人类保留判断、共情和伦理"
    },
    {
      "id": "section-18-11",
      "title": "18.11 现场笔记和延伸阅读",
      "type": "content",
      "content": "- **书籍：** \"Prompt Engineering for Everyone\" (Chen, 2024)\n- **论文：** Google DeepMind (2024) \"生成式AI共创的伦理框架\"\n- **工具包：** createx.us/toolkit/ai-playbook（检查清单、提示库、故障排除卡片）\n- **播客：** AI in Facilitation — Ep. 12 \"从炒作到习惯\"\n\n## 引导师检查清单\n\n☐ 工具选择矩阵已审查  \n☐ 使用C-T-E-C-O起草提示  \n☐ 同意和伦理表格已签署  \n☐ 审计日志记录  \n☐ 备用离线流程已准备\n\n## 反思问题\n\n1. 您如何平衡AI效率收益与维护以人为中心的设计原则？\n2. 对于您的工作坊环境，哪些特定的伦理保障最重要？\n3. 您如何发展提示制作技能以最大化AI工具效果？\n\n## 延伸资源\n\n- **选择工具：** 工具选择矩阵、3-L决策过滤器、特定阶段集成配方\n- **伦理和安全：** 数据和伦理检查清单、偏见扫描协议、同意框架\n- **技能发展：** C-T-E-C-O框架、微课程、故障排除指南"
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
    moduleTitle: 'AI集成手册',
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
    moduleTitle: 'AI Integration',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Advanced',
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
                    {uiText.chapter} 18
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
              <span>55 {params.lang === 'zh' ? '分钟' : 'minutes'}</span>
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
                    href={`/${params.lang}/modules/troubleshooting`}
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

const AiIntegrationPage = withModuleProgress(
  AiIntegrationComponent,
  'ai-integration',
  9
);

export default AiIntegrationPage;
