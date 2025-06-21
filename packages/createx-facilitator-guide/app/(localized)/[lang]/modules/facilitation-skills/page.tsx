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

function FacilitationSkillsComponent({
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
      "id": "section-17-0",
      "title": "17.0 Facilitator as Guide · Guru · Guardrail",
      "type": "content",
      "content": "A CreateX facilitator juggles three fluid roles:\n\n| Role | Core Question | Hallmark Behaviours |\n|------|---------------|---------------------|\n| **Guide** | \"Where do we go next?\" | Asks catalytic questions, invites participation, redirects energy |\n| **Guru** | \"What knowledge unlocks the block?\" | Injects concise expertise or demo, never monologues |\n| **Guardrail** | \"How do we stay on track and safe?\" | Manages time boxes, maintains psychological safety, enforces ethics |\n\n**Skilful facilitation is knowing when to switch hats—and when to stay silent.**"
    },
    {
      "id": "section-17-1",
      "title": "17.1 Core Communication Micro-Skills",
      "type": "content",
      "content": "| Skill | Description | Quick Drill |\n|-------|-------------|-------------|\n| **Active Listening** | Mirror back essence: \"What I'm hearing is...\" | Partner shares a gripe; reflect without advice |\n| **Powerful Questions** | Open, short, bias-free: \"What makes this important now?\" | Rewrite five prompts, strip out verbs improve/fix/should |\n| **Neutral Re-Voicing** | Depersonalise conflict: \"One perspective we've heard is...\" | Replace pronouns with \"the team\" |\n| **Positive Constraint** | Turn block into challenge: \"Given 15 minutes, what can we test?\" | Time-box random household task to 3 min |\n| **Body-Energy Match** | Align gestures, tone, posture with activity phase | Record a 1-min stand-up & seated reflection, compare energy |"
    },
    {
      "id": "section-17-2",
      "title": "17.2 Psychological Safety Techniques",
      "type": "content",
      "content": "| Technique | When to Use | Implementation |\n|-----------|-------------|----------------|\n| **Check-In Rounds** | Kick-off & post-break | Each shares weather emoji of mind |\n| **Working Agreements** | Start of day | Co-create 5 norms; vote; post visibly |\n| **1-2-4-All** | Divergent discussion | Solo think → pair → foursome → whole group |\n| **Red-Card / Green-Card** | Conflict emerges | Anyone can flag process pause (red) or move on (green) |\n| **Anonymous Input** | Hierarchical groups | Use digital sticky or Sli.do for silent suggestions |\n\n**AI Assist:** Sentiment tracker in BoardX flags sudden polarity drops (> 0.4 change); facilitator investigates."
    },
    {
      "id": "section-17-3",
      "title": "17.3 Managing Group Dynamics",
      "type": "content",
      "content": "| Situation | Symptom | Intervention |\n|-----------|---------|--------------|\n| **Turf Dominance** | One voice dominates | Use \"Two Voices Before Repeat\" rule; pass talking token |\n| **Idea Freeze** | Silence, blank faces | Random-stimulus card, SCAMPER prompt, AI wildcard |\n| **Side-Chats** | Whispering, distracted | Assign listener role to those participants; ask for summary |\n| **Conflict Escalation** | Raised tone, cross-talk | Switch to \"Yes-And\" paraphrase round; focus on data |\n| **Decision Deadlock** | Endless debate | Shift to structured vote; use impact/effort matrix |"
    },
    {
      "id": "section-17-4",
      "title": "17.4 Language Patterns that Unlock Thinking",
      "type": "content",
      "content": "| Instead of... | Say... | Why it Works |\n|---------------|--------|--------------|\n| **\"That won't work.\"** | \"What assumptions would need to change for this to work?\" | Keeps door ajar for iteration |\n| **\"We don't have time.\"** | \"Given 10 minutes, what slice could we test?\" | Time-box reframes |\n| **\"Who's right?\"** | \"What data might resolve this?\" | Moves from ego to evidence |\n| **\"Any ideas?\"** | \"List three wild ideas that would delight our user's grandma.\" | Adds specificity, playful trigger |"
    },
    {
      "id": "section-17-5",
      "title": "17.5 AI-Enhanced Facilitation Moves",
      "type": "content",
      "content": "| Move | Tool | Prompt |\n|------|------|--------|\n| **Real-Time Synth** | GPT-assist | \"Summarise top themes from sticky cluster A in < 60 words.\" |\n| **Bias Spotter** | OpenAI moderation | \"Check this HMW list for exclusionary language.\" |\n| **Energy Poll** | BoardX bot | \"Drop a ⚡ if energised, 💤 if tired.\" Calculates live bar chart |\n| **Silent Brainstorm Booster** | ChatGPT | Provides 5 extra seeds per participant, private DM |\n\n**Guardrail:** Disclose AI role; allow opt-out for privacy."
    },
    {
      "id": "section-17-6",
      "title": "17.6 Time-Box Mastery",
      "type": "content",
      "content": "1. **Visible Timer** — Large screen or physical cube\n2. **Auditory Cue** — Gentle gong vs. jarring buzzer; consistent\n3. **Verbal Foreshadow** — \"Two-minute warning\" cue\n4. **Grace Buffer** — Build 10% slack into agenda for overruns\n5. **Celebratory Cut-Off** — Cheer when timebox ends—makes stopping positive"
    },
    {
      "id": "section-17-7",
      "title": "17.7 Facilitator Self-Management",
      "type": "content",
      "content": "| Domain | Practice |\n|--------|----------|\n| **Physical** | Stretch bands, hydration every 90 min, voice warm-ups |\n| **Cognitive** | Agenda mental rehearsal, \"if-then\" contingency mapping |\n| **Emotional** | Pre-session grounding: 3-breath box breathing; post-session journal dump |\n| **Digital** | Dark-mode tools, notification silencing macros |\n\n**Burnout Sign:** Irritability at small overruns. **Remedy:** Micro-break + peer co-facilitation."
    },
    {
      "id": "section-17-8",
      "title": "17.8 Co-Facilitation Patterns",
      "type": "content",
      "content": "| Pattern | Best When | Tips |\n|---------|-----------|------|\n| **Lead + Producer** | Large hybrid events | Producer handles tech; Lead focuses on flow |\n| **Ping-Pong** | Long sessions | Swap every activity; keeps voices fresh |\n| **Subject + Process** | Technical domain | Expert shares, facilitator guides exercises |\n| **Mentor + Apprentice** | Skill building | Apprentice leads low-risk blocks, debriefs |"
    },
    {
      "id": "section-17-9",
      "title": "17.9 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| Pitfall | Cause | Fix |\n|---------|-------|-----|\n| **Lecture Trap** | Guru overuse | Set 7-minute max talk chunk |\n| **Invisible Remote Participants** | Camera off, silent | Remote Champion call-outs; round-robin responses |\n| **AI Over-Shine** | Model steals limelight | Use AI as sidekick; always human voice finalises |\n| **Process Rigidness** | Guardrail overdrive | Schedule \"flex windows\" for serendipity |\n\n## Key Takeaways\n\n- **Master micro-skills**—listening, questioning, neutral framing—before flashy methods\n- **Protect psychological safety**; creativity wilts under threat\n- **Use AI as augmentation, not authority**; maintain transparency\n- **Self-care and co-facilitation** sustain high-energy presence over marathon sessions\n- **Language shapes reality**—choose words that expand possibility"
    },
    {
      "id": "section-17-11",
      "title": "17.11 Field Notes & Further Reading",
      "type": "content",
      "content": "- **Book:** \"The Facilitator's Pocketbook\" (Kruckenberg)\n- **Paper:** Edmondson (2019) \"Leadership for Team Learning\"\n- **Toolkit:** createx.us/toolkit/facil-skills-deck (phrase cards, energy diagnostics, AI prompt cheats)\n- **Podcast:** Facilitator Forum — Ep. 87 \"AI & EQ in Modern Workshops\"\n\n## Facilitator Checklist\n\n☐ Working agreements set  \n☐ Timer visible  \n☐ AI tools disclosed  \n☐ Sentiment monitoring on  \n☐ Self-care breaks scheduled\n\n## Reflection Questions\n\n1. How will you balance the three facilitator roles (Guide, Guru, Guardrail) in your specific context?\n2. What psychological safety techniques are most needed for your participant groups?\n3. How can you develop your micro-skills through deliberate practice outside of workshop settings?\n\n## Further Resources\n\n- **Skill Development:** Communication micro-skills drills, psychological safety techniques\n- **AI Enhancement:** Real-time synthesis tools, bias spotting, energy polling\n- **Self-Management:** Physical/cognitive/emotional practices, burnout prevention strategies"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      id: "section-17-0",
      title: "17.0 引导者作为向导·大师·护栏",
      type: "content",
      content: "CreateX引导者要灵活转换三个角色：\n\n| 角色 | 核心问题 | 标志性行为 |\n|------|----------|------------|\n| **向导** | \"我们下一步去哪里？\" | 提出催化性问题，邀请参与，重新引导能量 |\n| **大师** | \"什么知识能解除阻塞？\" | 注入简洁的专业知识或演示，绝不独白 |\n| **护栏** | \"我们如何保持正轨和安全？\" | 管理时间盒，维护心理安全，执行伦理规范 |\n\n**熟练的引导是知道何时切换角色——以及何时保持沉默。**"
    },
    {
      id: "section-17-1",
      title: "17.1 核心沟通微技能",
      type: "content",
      content: "| 技能 | 描述 | 快速练习 |\n|------|------|----------|\n| **积极倾听** | 反映要点：\"我听到的是...\" | 伙伴分享抱怨；反映而不建议 |\n| **有力提问** | 开放、简短、无偏见：\"现在什么让这个重要？\" | 重写五个提示，去掉动词改进/修复/应该 |\n| **中性重述** | 去个人化冲突：\"我们听到的一个观点是...\" | 用\"团队\"替换代词 |\n| **积极约束** | 将阻塞转为挑战：\"给定15分钟，我们能测试什么？\" | 将随机家务任务时间盒设为3分钟 |\n| **身体-能量匹配** | 手势、语调、姿态与活动阶段对齐 | 录制1分钟站立和坐着反思，比较能量 |"
    },
    {
      id: "section-17-2",
      title: "17.2 心理安全技巧",
      type: "content",
      content: "| 技巧 | 使用时机 | 实施方法 |\n|------|----------|----------|\n| **签到轮次** | 开始和休息后 | 每人分享心情天气表情 |\n| **工作协议** | 一天开始 | 共创5个规范；投票；可见发布 |\n| **1-2-4-全体** | 发散讨论 | 独自思考→配对→四人组→全组 |\n| **红牌/绿牌** | 出现冲突 | 任何人可标记过程暂停（红）或继续（绿） |\n| **匿名输入** | 等级分明的组 | 使用数字便利贴或Sli.do静默建议 |\n\n**AI辅助：** BoardX情感追踪器标记突然极性下降（>0.4变化）；引导者调查。"
    },
    {
      id: "section-17-3",
      title: "17.3 管理团体动态",
      type: "content",
      content: "| 情况 | 症状 | 干预措施 |\n|------|------|----------|\n| **地盘主导** | 一个声音主导 | 使用\"重复前两个声音\"规则；传递发言权标志 |\n| **想法冻结** | 沉默、茫然表情 | 随机刺激卡、SCAMPER提示、AI通配符 |\n| **边聊** | 窃窃私语、分心 | 给这些参与者分配倾听者角色；要求总结 |\n| **冲突升级** | 提高音调、交叉谈话 | 切换到\"是的，并且\"释义轮；专注数据 |\n| **决策僵局** | 无休止辩论 | 转向结构化投票；使用影响/努力矩阵 |"
    },
    {
      id: "section-17-4",
      title: "17.4 解锁思维的语言模式",
      type: "content",
      content: "| 不要说... | 改为说... | 为什么有效 |\n|-----------|------------|------------|\n| **\"那不会有效。\"** | \"要让这个有效，需要改变什么假设？\" | 为迭代保持门户开放 |\n| **\"我们没有时间。\"** | \"给定10分钟，我们能测试什么片段？\" | 时间盒重新构框 |\n| **\"谁是对的？\"** | \"什么数据可能解决这个问题？\" | 从自我转向证据 |\n| **\"有想法吗？\"** | \"列出三个会让我们用户奶奶高兴的疯狂想法。\" | 增加具体性，有趣的触发器 |"
    },
    {
      id: "section-17-5",
      title: "17.5 AI增强引导动作",
      type: "content",
      content: "| 动作 | 工具 | 提示 |\n|------|------|------|\n| **实时综合** | GPT辅助 | \"用<60字总结便利贴集群A的主要主题。\" |\n| **偏见发现者** | OpenAI审核 | \"检查这个HMW列表是否有排斥性语言。\" |\n| **能量投票** | BoardX机器人 | \"如果有活力投⚡，如果疲倦投💤。\"计算实时条形图 |\n| **静默头脑风暴助推器** | ChatGPT | 为每个参与者提供5个额外种子，私人直信 |\n\n**护栏：** 披露AI角色；允许出于隐私退出。"
    },
    {
      id: "section-17-6",
      title: "17.6 时间盒掌握",
      type: "content",
      content: "1. **可见计时器** — 大屏幕或物理立方体\n2. **听觉提示** — 温和锣声vs刺耳蜂鸣器；一致性\n3. **言语预示** — \"两分钟警告\"提示\n4. **宽限缓冲** — 在议程中为超时建立10%松弛\n5. **庆祝截止** — 时间盒结束时欢呼——让停止变积极"
    },
    {
      id: "section-17-7",
      title: "17.7 引导者自我管理",
      type: "content",
      content: "| 领域 | 实践 |\n|------|------|\n| **身体** | 拉伸带、每90分钟补水、声音热身 |\n| **认知** | 议程心理彩排、\"如果-那么\"应急映射 |\n| **情感** | 会前扎根：3次呼吸方形呼吸；会后日记倾倒 |\n| **数字** | 暗模式工具、通知静音宏 |\n\n**倦怠迹象：** 对小超时易怒。**补救：** 微休息+同伴共同引导。"
    },
    {
      id: "section-17-8",
      title: "17.8 共同引导模式",
      type: "content",
      content: "| 模式 | 最适合时机 | 提示 |\n|------|------------|------|\n| **主导+制作人** | 大型混合活动 | 制作人处理技术；主导者专注流程 |\n| **乒乓** | 长会议 | 每个活动交换；保持声音新鲜 |\n| **学科+过程** | 技术领域 | 专家分享，引导者指导练习 |\n| **导师+学徒** | 技能建设 | 学徒领导低风险块，汇报 |"
    },
    {
      id: "section-17-9",
      title: "17.9 常见陷阱和修复",
      type: "content",
      content: "| 陷阱 | 原因 | 修复 |\n|------|------|------|\n| **讲座陷阱** | 大师过度使用 | 设置7分钟最大谈话块 |\n| **隐形远程参与者** | 摄像头关闭、沉默 | 远程冠军呼叫；轮流响应 |\n| **AI过度闪耀** | 模型抢风头 | 将AI用作助手；始终由人声最终确定 |\n| **过程僵化** | 护栏过度驱动 | 安排\"灵活窗口\"进行偶然发现 |\n\n## 关键要点\n\n- **掌握微技能**——倾听、提问、中性框架——在花哨方法之前\n- **保护心理安全**；创造力在威胁下凋零\n- **将AI用作增强而非权威**；保持透明度\n- **自我照顾和共同引导**在马拉松会议中维持高能量存在\n- **语言塑造现实**——选择扩展可能性的词语"
    },
    {
      id: "section-17-11",
      title: "17.11 实地笔记和延伸阅读",
      type: "content",
      content: "- **书籍：** 《引导者口袋书》（Kruckenberg）\n- **论文：** Edmondson (2019) \"团队学习的领导力\"\n- **工具包：** createx.us/toolkit/facil-skills-deck（短语卡片、能量诊断、AI提示小抄）\n- **播客：** 引导者论坛 — 第87集 \"现代工作坊中的AI与情商\"\n\n## 引导者检查清单\n\n☐ 工作协议已设置  \n☐ 计时器可见  \n☐ AI工具已披露  \n☐ 情感监控已开启  \n☐ 自我照顾休息已安排\n\n## 反思问题\n\n1. 在你的具体情境中，你将如何平衡三个引导者角色（向导、大师、护栏）？\n2. 对于你的参与者群体，哪些心理安全技巧最需要？\n3. 你如何在工作坊环境之外通过刻意练习来发展你的微技能？\n\n## 进一步资源\n\n- **技能发展：** 沟通微技能练习、心理安全技巧\n- **AI增强：** 实时综合工具、偏见发现、能量投票\n- **自我管理：** 身体/认知/情感实践、倦怠预防策略"
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
  moduleTitle: '引导技能',
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
  moduleTitle: 'Facilitation Skills',
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
                  {uiText.chapter} 17
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Workshop Design</span>
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
            <span>55 minutes</span>
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
                  href={`/${params.lang}/modules/ai-integration`}
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

const FacilitationSkillsPage = withModuleProgress(
  FacilitationSkillsComponent,
  'facilitation-skills',
  11
);

export default FacilitationSkillsPage;
