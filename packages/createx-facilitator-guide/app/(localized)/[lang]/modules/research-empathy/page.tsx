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

function ResearchEmpathyComponent({
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
      "id": "section-7-0",
      "title": "7.0 Why Research & Empathy?",
      "type": "content",
      "content": "### The Evidence Foundation\n- **Grounds Solutions in Reality**: Prevents building for imaginary users\n- **Challenges Assumptions**: Surfaces insights teams didn't know they needed\n- **Creates Shared Understanding**: Aligns diverse perspectives on real user needs\n- **Guides AI Outputs**: Provides human context for algorithmic generation\n\n### The Speed Imperative\nTraditional research can take months. CreateX methods compress discovery into hours while maintaining rigor through:\n- **Targeted Methods**: High-impact techniques with clear outputs\n- **AI Acceleration**: Automated transcription, clustering, and synthesis\n- **Immediate Synthesis**: Real-time conversion from data to insights"
    },
    {
      "id": "section-7-1",
      "title": "7.1 Empathy Interviews",
      "type": "content",
      "content": "### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Uncover motivations, pain points, and work-arounds straight from users' mouths. |\n| **When to Use** | Early Discover or after a prototype sparks new questions. |\n| **Step-by-Step** | 1) Draft open questions (why, how, tell-me-about). 2) Pair interviewer + note-taker. 3) Record consent. 4) Probe stories, not opinions. 5) Debrief immediately. |\n| **Remote Tips** | Use BoardX's split-screen—live transcript on left, note affinity tags on right. |\n| **AI Prompt Ideas** | \"Summarize this 20-min transcript into key quotes + jobs + pains table.\" |\n| **Pitfalls** | Leading questions; stacking multiple questions; skipping debrief (memory decay hits ~40% in 1h). |\n| **Template** | createx.us/toolkit/empathy-interview-guide |\n\n### Essential Interview Techniques\n\n**Opening Questions:**\n- \"Tell me about the last time you [relevant activity]...\"\n- \"Walk me through a typical [time period] in your [role/context]...\"\n- \"What's most frustrating about [relevant process/tool]?\"\n\n**Probing Questions:**\n- \"Can you show me how you do that?\"\n- \"What do you mean when you say [their term]?\"\n- \"Help me understand why that matters to you...\"\n\n**Story Extraction:**\n- \"Tell me about a time when [situation] went really well...\"\n- \"Describe the worst experience you've had with [topic]...\"\n- \"What workarounds have you developed?\"\n\n### Interview Structure (20 minutes)\n\n1. **Opening (2 min)**: Context setting and permission\n2. **Current State (8 min)**: How they do things now\n3. **Pain Points (5 min)**: Frustrations and challenges\n4. **Ideal Future (3 min)**: What would make their life better\n5. **Closing (2 min)**: Key insights confirmation"
    },
    {
      "id": "section-7-2",
      "title": "7.2 AEIOU Field Observation",
      "type": "content",
      "content": "### Framework Components\n\n| **Component** | **What to Log** | **Example** |\n|---------------|-----------------|-------------|\n| **Activities** | Goal-driven actions | \"Teacher toggles between Zoom & WeChat every 2 min.\" |\n| **Environments** | Physical/digital spaces | \"Lighting glare obscures whiteboard after 3 pm.\" |\n| **Interactions** | People, systems | \"Student asks ChatGPT before raising hand.\" |\n| **Objects** | Tools & artifacts | \"Sticky notes fall off in humid rooms.\" |\n| **Users** | Roles & values | \"IT admin prioritizes security over speed.\" |\n\n### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Capture contextual nuances users often forget to mention. |\n| **When to Use** | On-site or screen-share shadowing sessions. |\n| **Remote Tips** | Ask participant to wear a chest-mounted phone camera, or screen-share full desktop. |\n| **AI Prompt Ideas** | \"Cluster observation notes into repeated patterns; output CSV with frequency.\" |\n| **Pitfalls** | Observer bias. Use two observers when possible; compare notes. |\n| **Template** | createx.us/toolkit/aeiou-canvas |\n\n### Observation Best Practices\n\n**Before Observing:**\n- Set clear observation goals\n- Prepare note-taking system\n- Establish recording permissions\n- Brief participants on natural behavior\n\n**During Observation:**\n- Focus on actions, not interpretations\n- Note exact quotes and behaviors\n- Capture environmental context\n- Track time stamps for patterns\n\n**After Observation:**\n- Debrief within 1 hour\n- Compare notes with co-observer\n- Identify surprises and contradictions\n- Extract behavioral patterns"
    },
    {
      "id": "section-7-3",
      "title": "7.3 Empathy Map (4‑Quadrant Variant)",
      "type": "content",
      "content": "### Quadrant Structure\n\n| **Quadrant** | **Guiding Question** | **Sticky-Note Color** |\n|--------------|----------------------|----------------------|\n| **See** | What does the user see around them? | Yellow |\n| **Hear** | What are they hearing from others/media? | Blue |\n| **Say & Do** | What do they verbally express or do? | Green |\n| **Think & Feel** | What's on their mind or in their heart? | Pink |\n\n### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Synthesize raw research into shared mental model. |\n| **When to Use** | Immediately after interviews/observations. |\n| **Step-by-Step** | 1) Time-box 10 min silent sticky dump. 2) Read out loud clockwise. 3) Star-vote top 3 insights. |\n| **Remote Tips** | BoardX template auto-color-codes by quadrant. |\n| **AI Prompt Ideas** | \"Generate an insight statement (user + need + why) for each top sticky cluster.\" |\n| **Pitfalls** | Guessing feelings; ensure every sticky ties to observed evidence. |\n| **Template** | createx.us/toolkit/empathy-map |\n\n### Empathy Mapping Process\n\n**Preparation (5 minutes):**\n- Set up quadrant template\n- Distribute colored stickies\n- Review research data together\n- Set timer for focused work\n\n**Silent Populate (10 minutes):**\n- Individual sticky writing\n- One insight per sticky\n- Ground in specific evidence\n- Use participant's own words\n\n**Share & Cluster (15 minutes):**\n- Read stickies aloud by quadrant\n- Group similar themes\n- Identify patterns and contradictions\n- Vote on most significant insights"
    },
    {
      "id": "section-7-4",
      "title": "7.4 Jobs‑to‑Be‑Done Quick Canvas",
      "type": "content",
      "content": "### JTBD Framework\n\n| **Field** | **Example** |\n|-----------|-------------|\n| **Job Statement** | \"When onboarding remote staff, I want a single checklist so I feel confident nothing is missed.\" |\n| **Current Hacks** | Manual Google Sheets checklist |\n| **Pains** | \"Version control issues; new hires confused.\" |\n| **Gains** | \"Faster ramp-up, less IT tickets.\" |\n\n### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Frame user needs as progress they seek, detaching from current solutions. |\n| **When to Use** | When solution scope feels predetermined; to widen perspective. |\n| **AI Prompt Ideas** | \"Rewrite these interview quotes into structured JTBD statements with Situation-Motivation-Expected Outcome.\" |\n| **Pitfalls** | Writing vague jobs (\"communicate better\"); test with the swap test (\"Would a different persona have this job?\"). |\n| **Template** | createx.us/toolkit/jtbd-canvas |\n\n### JTBD Statement Formula\n\n**Structure**: \"When [situation], I want [motivation] so I can [expected outcome].\"\n\n**Quality Check Questions:**\n- Is this specific to a situation?\n- Does it focus on progress, not features?\n- Would other personas have different jobs?\n- Can we measure success?"
    },
    {
      "id": "section-7-5",
      "title": "7.5 Stakeholder Mapping Lite",
      "type": "content",
      "content": "### Mapping Framework\n\n- **Axis X**: Influence (Low to High)\n- **Axis Y**: Interest (Low to High)\n- **Focus**: High-influence/high-interest as \"Power Allies\"\n\n**AI Assist**: \"Suggest unseen stakeholders based on domain-specific ontologies.\"\n\n### Stakeholder Categories\n\n**Champions**: High interest, high influence\n**Gatekeepers**: Low interest, high influence  \n**Advocates**: High interest, low influence\n**Observers**: Low interest, low influence"
    },
    {
      "id": "section-7-6",
      "title": "7.6 AI‑Powered Research Ops",
      "type": "content",
      "content": "### Traditional vs. AI-Augmented Workflow\n\n| **Task** | **Traditional** | **AI-Augmented** |\n|----------|-----------------|------------------|\n| **Transcription** | Manual typing (4-6× runtime) | Real-time LLM transcribe + speaker diarization |\n| **Translation** | Human bilingual | LLM zero-shot > 85% accuracy |\n| **Theming** | Sticky clustering | Top 10 topic clusters with confidence scores |\n| **Sentiment** | Manual color-coding | VADER or GPT sentiment + outlier alert |\n\n**Ethics Note**: Secure consent for AI processing; redact PII before cloud upload.\n\n### AI Implementation Guidelines\n\n**Data Privacy:**\n- Explicit consent for AI processing\n- Local processing when possible\n- PII redaction before cloud upload\n- Secure data storage and deletion\n\n**Quality Assurance:**\n- Human validation of AI outputs\n- Bias scanning for generated content\n- Confidence scoring for clusters\n- Manual review of outliers"
    },
    {
      "id": "section-7-7",
      "title": "7.7 Choosing & Sequencing Methods",
      "type": "content",
      "content": "### Time-Based Sequences\n\n| **Constraint** | **Recommended Flow** |\n|----------------|----------------------|\n| **90 min** | 20 min Empathy Interview (live), 10 min Rapid Debrief, 30 min Empathy Map, 20 min JTBD distillation, 10 min break. |\n| **Half-Day** | AEIOU → Stakeholder Map → Empathy Interviews × 3 → Empathy Map → JTBD. |\n| **Budget $0** | Remote interview via WhatsApp + free Otter transcript; BoardX sticky wall. |\n\n### Selection Criteria\n\n**For Deep Understanding**: Empathy Interviews + AEIOU\n**For Quick Validation**: JTBD + Stakeholder Map\n**For Complex Systems**: All methods in sequence\n**For Remote Teams**: Empathy Map + AI-powered synthesis"
    },
    {
      "id": "section-7-8",
      "title": "7.8 Common Pitfalls Across Methods & Fixes",
      "type": "content",
      "content": "| **Pitfall** | **Fix** |\n|-------------|---------|\n| **Data Swamp** (too many notes) | Force synthesis within 24h; use AI summarizer. |\n| **Participant Bias** (social desirability) | Ask for work-arounds and last time stories (\"Describe the last time you…?\"). |\n| **Over-reliance on AI themes** | Manually sanity-check anomalies; compare to raw quotes. |\n\n### Additional Pitfalls\n\n**Leading Questions**: Ask \"Tell me about...\" instead of \"Don't you think...\"\n**Confirmation Bias**: Actively seek disconfirming evidence\n**Sample Bias**: Ensure diverse participant representation\n**Recency Bias**: Weight all evidence equally, not just recent interviews"
    },
    {
      "id": "section-7-9",
      "title": "7.9 Key Takeaways",
      "type": "content",
      "content": "- **Triangulate** — combine at least two methods for richer insight\n- **AI accelerates mechanics**; human curiosity drives depth and ethics\n- **Capture evidence, synthesize fast**, and convert to actionable How-Might-We seeds\n\n### Research Success Factors\n\n1. **Start with Clear Questions**: What do we need to learn?\n2. **Mix Methods Strategically**: Different techniques reveal different insights\n3. **Synthesize Rapidly**: Convert data to insights within 24 hours\n4. **Stay User-Centered**: Focus on real needs, not assumed problems\n5. **Document Everything**: Make insights accessible to the whole team"
    },
    {
      "id": "section-7-10",
      "title": "7.10 Field Notes & Further Reading",
      "type": "content",
      "content": "### Essential Resources\n- **Book**: Beyer & Holtzblatt \"Contextual Design\"\n- **Paper**: Christensen \"What Customers Want from Jobs-to-Be-Done\" (HBR 2016)\n- **Toolkit**: createx.us/toolkit/research-pack (all canvases + AI prompt bank)\n- **Podcast**: UX Research Geeks — Ep. 34 \"AI in Qualitative Synthesis\"\n\n### Community Practice\n- Share research templates in #research-methods\n- Contribute to the AI prompt library\n- Join monthly research coffee chats\n- Document successful method combinations"
    },
    {
      "id": "section-7-11",
      "title": "7.11 Practical Application",
      "type": "content",
      "content": "### Research Planning Template\n\n**Research Questions:**\n1. What job is the user trying to do?\n2. What are their current workarounds?\n3. What context shapes their behavior?\n4. Who else influences their decisions?\n\n**Method Selection:**\n- Primary: [Choose based on time/access]\n- Secondary: [Triangulation method]\n- Synthesis: [Empathy Map or JTBD]\n\n**Success Metrics:**\n- [ ] Clear insight statements generated\n- [ ] User quotes captured\n- [ ] Pain points identified\n- [ ] Opportunities synthesized\n\n---\n\n### Facilitator Checklist\n\n- [ ] Consent forms ready\n- [ ] AI transcription set up\n- [ ] Two observers per field visit\n- [ ] Empathy Map session scheduled within 24h\n- [ ] HMW draft by end of Discover phase\n- [ ] Bias scan process prepared for AI outputs"
    }
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          "id": "section-7-0",
          "title": "7.0 为什么需要研究和同理心？",
          "type": "content",
          "content": "### 证据基础\n- **将解决方案建立在现实基础上**：防止为虚构用户构建产品\n- **挑战假设**：揭示团队不知道需要的洞察\n- **创建共同理解**：在真实用户需求上统一不同观点\n- **指导AI输出**：为算法生成提供人类背景\n\n### 速度要求\n传统研究可能需要数月。CreateX方法将发现压缩到数小时，同时通过以下方式维持严谨性：\n- **针对性方法**：具有明确输出的高影响技术\n- **AI加速**：自动转录、聚类和综合\n- **即时综合**：从数据到洞察的实时转换"
        },
        {
          "id": "section-7-1",
          "title": "7.1 同理心访谈",
          "type": "content",
          "content": "### 方法卡片\n\n| **部分** | **详情** |\n|-------------|-------------|\n| **目的** | 直接从用户口中发现动机、痛点和变通方法。|\n| **使用时机** | 早期发现阶段或原型引发新问题后。|\n| **步骤** | 1) 起草开放性问题（为什么、如何、告诉我关于）。2) 配对访谈者+记录者。3) 记录同意。4) 探索故事，而非观点。5) 立即汇报。|\n| **远程提示** | 使用BoardX的分屏——左侧实时转录，右侧亲和标签注释。|\n| **AI提示想法** | \"将这20分钟的转录总结为关键引言+工作+痛点表格。\" |\n| **陷阱** | 诱导性问题；堆叠多个问题；跳过汇报（记忆衰减在1小时内达到约40%）。|\n| **模板** | createx.us/toolkit/empathy-interview-guide |\n\n### 基本访谈技巧\n\n**开场问题：**\n- \"告诉我上次你[相关活动]的情况...\"\n- \"带我了解你[角色/环境]中典型的[时间段]...\"\n- \"关于[相关流程/工具]最令你沮丧的是什么？\"\n\n**探索问题：**\n- \"你能向我展示你是如何做的吗？\"\n- \"当你说[他们的术语]时，你的意思是什么？\"\n- \"帮我理解为什么这对你很重要...\"\n\n**故事提取：**\n- \"告诉我[情况]进展非常顺利的一次经历...\"\n- \"描述你在[话题]方面最糟糕的经历...\"\n- \"你开发了什么变通方法？\"\n\n### 访谈结构（20分钟）\n\n1. **开场（2分钟）**：设定背景和许可\n2. **现状（8分钟）**：他们现在如何做事\n3. **痛点（5分钟）**：挫折和挑战\n4. **理想未来（3分钟）**：什么会让他们的生活更好\n5. **结束（2分钟）**：关键洞察确认"
        },
        {
          "id": "section-7-2",
          "title": "7.2 AEIOU实地观察",
          "type": "content",
          "content": "### 框架组件\n\n| **组件** | **记录什么** | **示例** |\n|---------------|-----------------|-------------|\n| **活动（Activities）** | 目标驱动的行动 | \"老师每2分钟在Zoom和微信之间切换。\" |\n| **环境（Environments）** | 物理/数字空间 | \"下午3点后光线眩光遮蔽白板。\" |\n| **交互（Interactions）** | 人员、系统 | \"学生在举手前先问ChatGPT。\" |\n| **物体（Objects）** | 工具和工艺品 | \"便利贴在潮湿房间里掉落。\" |\n| **用户（Users）** | 角色和价值观 | \"IT管理员优先考虑安全而非速度。\" |\n\n### 方法卡片\n\n| **部分** | **详情** |\n|-------------|-------------|\n| **目的** | 捕获用户经常忘记提及的背景细微差别。|\n| **使用时机** | 现场或屏幕共享影子会话。|\n| **远程提示** | 请参与者佩戴胸部手机摄像头，或共享整个桌面屏幕。|\n| **AI提示想法** | \"将观察笔记聚类为重复模式；输出带频率的CSV。\" |\n| **陷阱** | 观察者偏见。可能时使用两个观察者；比较笔记。|\n| **模板** | createx.us/toolkit/aeiou-canvas |\n\n### 观察最佳实践\n\n**观察前：**\n- 设定明确的观察目标\n- 准备记录系统\n- 建立录制权限\n- 向参与者说明自然行为\n\n**观察中：**\n- 专注于行动，而非解释\n- 记录确切的引言和行为\n- 捕获环境背景\n- 跟踪时间戳以发现模式\n\n**观察后：**\n- 在1小时内汇报\n- 与共同观察者比较笔记\n- 识别意外和矛盾\n- 提取行为模式"
        },
        {
          "id": "section-7-3",
          "title": "7.3 同理心地图（四象限变体）",
          "type": "content",
          "content": "### 象限结构\n\n| **象限** | **指导问题** | **便利贴颜色** |\n|--------------|----------------------|----------------------|\n| **看到（See）** | 用户在周围看到什么？| 黄色 |\n| **听到（Hear）** | 他们从他人/媒体听到什么？| 蓝色 |\n| **说和做（Say & Do）** | 他们口头表达或做什么？| 绿色 |\n| **想和感受（Think & Feel）** | 他们心中或内心有什么？| 粉色 |\n\n### 方法卡片\n\n| **部分** | **详情** |\n|-------------|-------------|\n| **目的** | 将原始研究综合为共享心理模型。|\n| **使用时机** | 访谈/观察后立即进行。|\n| **步骤** | 1) 设定10分钟静默便利贴倾倒时间。2) 顺时针大声朗读。3) 星号投票前3个洞察。|\n| **远程提示** | BoardX模板按象限自动颜色编码。|\n| **AI提示想法** | \"为每个顶级便利贴集群生成洞察陈述（用户+需求+原因）。\" |\n| **陷阱** | 猜测感受；确保每个便利贴都与观察到的证据相关。|\n| **模板** | createx.us/toolkit/empathy-map |\n\n### 同理心地图过程\n\n**准备（5分钟）：**\n- 设置象限模板\n- 分发彩色便利贴\n- 一起回顾研究数据\n- 为专注工作设置计时器\n\n**静默填充（10分钟）：**\n- 个人便利贴书写\n- 每个便利贴一个洞察\n- 基于具体证据\n- 使用参与者的原话\n\n**分享和聚类（15分钟）：**\n- 按象限大声朗读便利贴\n- 将相似主题分组\n- 识别模式和矛盾\n- 投票选出最重要的洞察"
        },
        {
          "id": "section-7-4",
          "title": "7.4 待完成工作快速画布",
          "type": "content",
          "content": "### JTBD框架\n\n| **字段** | **示例** |\n|-----------|-------------|\n| **工作陈述** | \"当入职远程员工时，我想要一个单一的检查清单，这样我感觉自信没有遗漏任何东西。\" |\n| **当前技巧** | 手动Google表格检查清单 |\n| **痛点** | \"版本控制问题；新员工困惑。\" |\n| **收益** | \"更快上手，更少IT票据。\" |\n\n### 方法卡片\n\n| **部分** | **详情** |\n|-------------|-------------|\n| **目的** | 将用户需求框架为他们寻求的进展，与当前解决方案脱离。|\n| **使用时机** | 当解决方案范围感觉预先确定时；扩展视角。|\n| **AI提示想法** | \"将这些访谈引言重写为结构化的JTBD陈述，包含情况-动机-预期结果。\" |\n| **陷阱** | 编写模糊工作（\"更好沟通\"）；用交换测试测试（\"不同人物角色会有这个工作吗？\"）。|\n| **模板** | createx.us/toolkit/jtbd-canvas |\n\n### JTBD陈述公式\n\n**结构**：\"当[情况]时，我想要[动机]，这样我就能[预期结果]。\"\n\n**质量检查问题：**\n- 这是特定于情况的吗？\n- 它关注进展，而不是功能吗？\n- 其他人物角色会有不同的工作吗？\n- 我们能衡量成功吗？"
        },
        {
          "id": "section-7-5",
          "title": "7.5 利益相关者映射精简版",
          "type": "content",
          "content": "### 映射框架\n\n- **X轴**：影响力（低到高）\n- **Y轴**：兴趣（低到高）\n- **焦点**：高影响力/高兴趣作为\"权力盟友\"\n\n**AI辅助**：\"基于领域特定本体建议未见的利益相关者。\"\n\n### 利益相关者类别\n\n**拥护者**：高兴趣，高影响力\n**守门人**：低兴趣，高影响力  \n**倡导者**：高兴趣，低影响力\n**观察者**：低兴趣，低影响力"
        },
        {
          "id": "section-7-6",
          "title": "7.6 AI驱动的研究运营",
          "type": "content",
          "content": "### AI工具集成\n\n**转录和分析：**\n- 实时转录访谈\n- 自动情感分析\n- 关键主题提取\n- 模式识别\n\n**数据综合：**\n- 跨访谈聚类\n- 洞察优先级排序\n- 引言自动标记\n- 报告生成\n\n**质量保证：**\n- 偏见检测\n- 数据验证\n- 一致性检查\n- 准确性评估"
        }
      ];
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
    moduleTitle: '研究与同理心',
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
    moduleTitle: 'Research & Empathy',
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
                      {uiText.chapter} 7
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
                <span>50 minutes</span>
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
                      href={`/${params.lang}/modules/sense-making`}
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
    </div>);
}

const ResearchEmpathyPage = withModuleProgress(
  ResearchEmpathyComponent,
  'research-empathy',
  12
);

export default ResearchEmpathyPage;
