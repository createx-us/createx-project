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

function ProcessOverviewComponent({
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
      "id": "section-6-0",
      "title": "6.0 Opening Story",
      "type": "content",
      "content": "*\"We finished a whole 'diamond' before lunch.\"*\n\nAt a Montréal civic-tech hackathon, facilitator Sofia Bélanger challenged her cohort to compress a full Discover-to-Define cycle into three hours, powered by live-transcribed street interviews and a GPT-4o clustering bot. By midday, teams had reframed their briefs twice and were already ideating. Sofia's experiment illustrates CreateX's signature rhythm: macro structure with micro speed."
    },
    {
      "id": "section-6-1",
      "title": "6.1 Why a Process Overview?",
      "type": "content",
      "content": "### Benefits of Structured Process\n\n- **Common Language** — Unites multidisciplinary teams in minutes\n- **Predictable Cadence** — Reduces cognitive load so energy focuses on insight, not logistics  \n- **Plug-and-Play** — Allows facilitators to swap methods or AI tools without breaking flow\n\n### Process vs. Chaos\nWhile creativity requires some ambiguity, teams perform better with clear structure:\n- Reduces anxiety about \"what comes next\"\n- Enables better time and energy management\n- Creates accountability and momentum\n- Allows for meaningful progress tracking"
    },
    {
      "id": "section-6-2",
      "title": "6.2 The Classic Double‑Diamond",
      "type": "content",
      "content": "```\nDiscover  ◆  Develop  ◆\n    ◆  Define  ◆  Deliver\n Divergent  ◆  Divergent  ◆\n──────────┼───────────┼──────────\n    ◆  Convergent  ◆\n```\n\n| Phase | Goal | Divergence/Convergence |\n|-------|------|------------------------|\n| **Discover** | Explore the problem space, build empathy | Divergent |\n| **Define** | Synthesize insights, craft POV & HMW | Convergent |\n| **Develop** | Generate and prototype solutions | Divergent |\n| **Deliver** | Test, refine, and launch pilots | Convergent |\n\n### Why Double-Diamond Works\n\n1. **Mirrors Natural Problem-Solving**: Alternates between opening and focusing\n2. **Prevents Premature Solutions**: Forces problem exploration before solution generation\n3. **Balances Creativity and Feasibility**: Structured divergence with disciplined convergence\n4. **Scalable Framework**: Works for 90-minute workshops or 90-day innovation programs"
    },
    {
      "id": "section-6-3",
      "title": "6.3 CreateX Micro‑Sprint Loop (90 minutes)",
      "type": "content",
      "content": "| Minute | Activity | Output | AI Assist |\n|--------|----------|---------|-----------|\n| **0-10** | **Frame** | Sprint goal & KPI card | GPT summary of previous sprint |\n| **10-25** | **Diverge** | 20-30 raw ideas | Idea-spark prompts, image gen |\n| **25-35** | **Cluster & Vote** | Top 3 concepts | LLM clustering, sentiment heat-map |\n| **35-60** | **Prototype** | Click-through, storyboard, or paper mock | Auto-layout, copy suggestions |\n| **60-75** | **Test** | User feedback matrix | Real-time transcription + AI sentiment |\n| **75-90** | **Reflect & Plan** | Decision on next sprint focus | GPT retro: keep, drop, tweak |\n\n**Rule of Thumb**: 4 micro-sprints ≈ 1 diamond half\n\n### Sprint Loop Benefits\n\n- **Rapid Learning Cycles**: Fast feedback and iteration\n- **Sustained Energy**: Variety prevents workshop fatigue\n- **Clear Progress**: Tangible outputs every 90 minutes\n- **AI Integration Points**: Natural moments for tool insertion"
    },
    {
      "id": "section-6-4",
      "title": "6.4 Zoom Out: Combining Diamonds + Sprints",
      "type": "content",
      "content": "| Time Horizon | Artifact | Decision Gate |\n|--------------|----------|---------------|\n| **Day 0 (Kickoff)** | Challenge Canvas | \"Go / refine brief\" |\n| **Day 1-2** | Diamond ① Discover → Define | Locked HMW + success metrics |\n| **Day 3-4** | Diamond ② Develop → Deliver | MVP pilot scope |\n| **Weeks 2-4** | Pilot Experiments | Investment or scale decision |\n\n### Integration Architecture\n\n**Daily Level**: 4-6 sprint loops per day\n**Diamond Level**: 8-12 sprints per diamond half\n**Program Level**: Multiple diamonds for complex challenges\n\nVisual: Swim-lane diagram overlaying diamonds with sprint cycles"
    },
    {
      "id": "section-6-5",
      "title": "6.5 AI Plug‑In Map",
      "type": "content",
      "content": "| Stage | High‑Impact AI Tools | Prompt Template |\n|-------|---------------------|-----------------|\n| **Discover** | Transcription, entity extraction, semantic clustering | \"Summarize top pain points across 12 interviews in 5 bullets.\" |\n| **Define** | Theme clustering, gap analysis | \"Generate 10 HMW statements ranked by novelty & feasibility.\" |\n| **Develop** | LLM ideation, generative imagery, code autopilot | \"Re-skin this concept for elderly users, output Figma JSON.\" |\n| **Deliver** | A/B test simulation, sentiment analysis, AutoML forecasting | \"Predict adoption curve given these persona parameters.\" |\n\n**Ethics Check**: Run bias scan on AI outputs at each hand-off.\n\n### AI Integration Principles\n\n1. **Augment, Don't Replace**: AI accelerates human creativity, doesn't substitute it\n2. **Transparency**: Always disclose AI assistance to participants\n3. **Human Judgment**: Final decisions remain with human facilitators and participants\n4. **Bias Awareness**: Regular checks for algorithmic bias in generated content"
    },
    {
      "id": "section-6-6",
      "title": "6.6 Timing & Energy Management",
      "type": "content",
      "content": "| Block Length | Purpose | Break Suggestion |\n|--------------|---------|------------------|\n| **25 min** | Cognitive sprint max before fatigue | 5-min stretch, hydrate |\n| **90 min** | One complete micro-loop | 10-min \"bio & buffer\" |\n| **180 min** | Half-diamond | 20-min meal / walk |\n\n### Energy Flow Management\n\n**Morning Energy (High)**: Complex problem framing, synthesis work\n**Midday Energy (Medium)**: Collaborative ideation, building activities  \n**Afternoon Energy (Variable)**: Testing, reflection, planning\n\n**Facilitator Tip**: Display a large, visible timer; switch who owns the timer each sprint to share ownership.\n\n### Attention Management\n\n- **Variety**: Mix individual, pair, and group work\n- **Movement**: Include physical activities and spatial changes\n- **Sensory**: Engage multiple senses through materials and methods\n- **Challenge**: Balance difficulty to maintain flow state"
    },
    {
      "id": "section-6-7",
      "title": "6.7 Process Adaptations",
      "type": "content",
      "content": "| Context | Modification |\n|---------|--------------|\n| **Remote-Only** | Add 5 extra minutes per sprint for tech lag; use smaller breakout groups (≤ 5). |\n| **Enterprise Risk-Averse** | Extend Define stage, add \"Compliance Desk Check\" before prototyping. |\n| **Social-Impact Fieldwork** | Discover phase may last days; embed local co-researchers to maintain trust. |\n\n### Additional Adaptations\n\n**Educational Settings**:\n- Slower pace with more reflection time\n- Academic grading integration points\n- Theory-practice connection moments\n\n**Healthcare Contexts**:\n- Patient safety checkpoints\n- Regulatory compliance reviews\n- Clinical evidence requirements\n\n**Startup Environments**:\n- Faster cycles with higher risk tolerance\n- Resource constraint considerations\n- Market validation emphasis"
    },
    {
      "id": "section-6-8",
      "title": "6.8 Common Pitfalls & Safeguards",
      "type": "content",
      "content": "| Pitfall | Symptom | Safeguard |\n|---------|---------|-----------|\n| **Front-Loading Research** | Endless interviews, no synthesis | Time-box Discover; require first insight share by hour 4. |\n| **Prototype Paralysis** | Teams polishing instead of testing | Enforce paper-first rule; user test must occur by sprint 2. |\n| **AI Overwhelm** | Tool hopping derails focus | Pre-select 1-2 AI tools per stage; provide cheat-sheet links. |\n\n### Additional Pitfalls\n\n**Diamond Skipping**:\n- **Symptom**: Jumping directly to solutions without problem exploration\n- **Safeguard**: Mandatory problem validation before ideation begins\n\n**Sprint Rigidity**:\n- **Symptom**: Forcing activities into time boxes regardless of progress\n- **Safeguard**: Build 15% flex time into each sprint for emergence\n\n**Output Obsession**:\n- **Symptom**: Focusing on deliverables rather than learning\n- **Safeguard**: Equal emphasis on insights gained and artifacts created"
    },
    {
      "id": "section-6-9",
      "title": "6.9 Key Takeaways",
      "type": "content",
      "content": "- **Double-Diamond gives macro clarity; 90-min sprints give micro momentum**\n- **AI inserts acceleration, not replacement—human judgment gates each phase**\n- **Time-boxing, visible artifacts, and ethics checks keep velocity aligned with value**\n- **Adapt process length and rigor to context, but never skip the reflection loop**\n\n### Critical Success Factors\n\n1. **Process Discipline**: Follow the framework while remaining flexible\n2. **Energy Awareness**: Read and respond to group energy throughout\n3. **Progress Visibility**: Make learning and decisions transparent\n4. **Reflection Integration**: Regular pause points for synthesis and planning\n5. **Context Adaptation**: Modify timing and methods for specific situations"
    },
    {
      "id": "section-6-10",
      "title": "6.10 Field Notes & Further Reading",
      "type": "content",
      "content": "### Essential Resources\n- **Paper**: Liedtka (2015) \"Perspective: Linking Design Thinking with Innovation Outcomes\"\n- **Toolkit**: createx.us/toolkit/sprint-timers — downloadable timer videos\n- **Podcast**: Sprint Stories Ep. 12 – \"90-min Loops at Google X\"\n- **Template**: Interactive BoardX board \"Double-Diamond End-to-End\" (public link)\n\n### Community Practice\n- Share your sprint adaptations in #process-innovations\n- Contribute to the open-source timer toolkit\n- Join monthly process design workshops\n- Document case studies of successful adaptations"
    },
    {
      "id": "section-6-11",
      "title": "6.11 Practical Implementation",
      "type": "content",
      "content": "### Getting Started Checklist\n\n**Before Workshop:**\n- [ ] Challenge Canvas finalized\n- [ ] Timer & sprint boards ready  \n- [ ] AI tools pre-vetted & bias scan scripts loaded\n- [ ] Reflection slot on agenda every 90 min\n\n**During Workshop:**\n- [ ] Visible timer and progress tracking\n- [ ] Regular energy and engagement checks\n- [ ] Documentation of insights and decisions\n- [ ] AI bias scans at phase transitions\n\n**After Workshop:**\n- [ ] Sprint retrospective completed\n- [ ] Key insights captured and shared\n- [ ] Next steps and commitments documented\n- [ ] Process improvements noted for future sessions\n\n---\n\n### Facilitator Checklist\n\n- [ ] Challenge Canvas finalized\n- [ ] Timer & sprint boards ready\n- [ ] AI tools pre-vetted & bias scan scripts loaded  \n- [ ] Reflection slot on agenda every 90 min\n- [ ] Energy management plan prepared\n- [ ] Context adaptations identified and planned"
    }
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          "id": "section-6-0",
          "title": "6.0 开场故事",
          "type": "content",
          "content": "*\"我们在午餐前就完成了整个'钻石'过程。\"*\n\n在蒙特利尔的一次公民科技黑客马拉松中，引导师Sofia Bélanger挑战她的团队将完整的发现-定义循环压缩到三小时内，通过现场转录的街头访谈和GPT-4o聚类机器人提供支持。到中午时，团队已经重新构思了两次简报，并已开始创意生成。Sofia的实验展示了CreateX的标志性节奏：宏观结构与微观速度。"
        },
        {
          "id": "section-6-1",
          "title": "6.1 为什么需要流程概述？",
          "type": "content",
          "content": "### 结构化流程的好处\n\n- **共同语言** — 在几分钟内团结跨学科团队\n- **可预测的节奏** — 减少认知负荷，使精力专注于洞察而非后勤\n- **即插即用** — 允许引导师在不破坏流程的情况下交换方法或AI工具\n\n### 流程 vs 混乱\n虽然创造力需要一些模糊性，但团队在清晰结构下表现更好：\n- 减少对\"接下来做什么\"的焦虑\n- 能够更好地管理时间和精力\n- 创建责任制和动力\n- 允许有意义的进度跟踪"
        },
        {
          "id": "section-6-2",
          "title": "6.2 经典双钻石模型",
          "type": "content",
          "content": "```\n发现  ◆  发展  ◆\n    ◆  定义  ◆  交付\n 发散  ◆  发散  ◆\n──────────┼───────────┼──────────\n    ◆  收敛  ◆\n```\n\n| 阶段 | 目标 | 发散/收敛 |\n|-------|------|------------------------|\n| **发现** | 探索问题空间，建立同理心 | 发散 |\n| **定义** | 综合洞察，制定POV和HMW | 收敛 |\n| **发展** | 生成和制作原型解决方案 | 发散 |\n| **交付** | 测试、完善和启动试点 | 收敛 |\n\n### 为什么双钻石模型有效\n\n1. **镜像自然问题解决**：在开放和聚焦之间交替\n2. **防止过早解决方案**：在生成解决方案之前强制问题探索\n3. **平衡创造力和可行性**：结构化发散与有纪律的收敛\n4. **可扩展框架**：适用于90分钟工作坊或90天创新项目"
        },
        {
          "id": "section-6-3",
          "title": "6.3 CreateX微冲刺循环（90分钟）",
          "type": "content",
          "content": "| 分钟 | 活动 | 输出 | AI辅助 |\n|--------|----------|---------|-----------|\n| **0-10** | **框架** | 冲刺目标和KPI卡片 | 前一冲刺的GPT摘要 |\n| **10-25** | **发散** | 20-30个原始想法 | 想法启发提示，图像生成 |\n| **25-35** | **聚类和投票** | 前3个概念 | LLM聚类，情感热力图 |\n| **35-60** | **原型制作** | 点击流程、故事板或纸质模型 | 自动布局，文案建议 |\n| **60-75** | **测试** | 用户反馈矩阵 | 实时转录 + AI情感分析 |\n| **75-90** | **反思和计划** | 下一冲刺焦点的决定 | GPT回顾：保持、放弃、调整 |\n\n**经验法则**：4个微冲刺 ≈ 1个钻石半边\n\n### 冲刺循环的好处\n\n- **快速学习循环**：快速反馈和迭代\n- **持续能量**：多样性防止工作坊疲劳\n- **清晰进展**：每90分钟都有具体产出\n- **AI集成点**：工具插入的自然时刻"
        },
        {
          "id": "section-6-4",
          "title": "6.4 放大视角：结合钻石和冲刺",
          "type": "content",
          "content": "| 时间范围 | 产出物 | 决策门 |\n|--------------|----------|---------------|\n| **第0天（启动）** | 挑战画布 | \"继续/完善简报\" |\n| **第1-2天** | 钻石① 发现 → 定义 | 锁定HMW + 成功指标 |\n| **第3-4天** | 钻石② 发展 → 交付 | MVP试点范围 |\n| **第2-4周** | 试点实验 | 投资或扩展决策 |\n\n### 集成架构\n\n**日常级别**：每天4-6个冲刺循环\n**钻石级别**：每个钻石半边8-12个冲刺\n**项目级别**：复杂挑战的多个钻石\n\n视觉：覆盖钻石与冲刺循环的泳道图"
        },
        {
          "id": "section-6-5",
          "title": "6.5 AI插件映射",
          "type": "content",
          "content": "| 阶段 | 高影响AI工具 | 提示模板 |\n|-------|---------------------|-----------------|\n| **发现** | 转录、实体提取、语义聚类 | \"用5个要点总结12次访谈中的主要痛点。\" |\n| **定义** | 主题聚类、差距分析 | \"生成10个按新颖性和可行性排序的HMW陈述。\" |\n| **发展** | LLM创意、生成式图像、代码自动导航 | \"为老年用户重新设计这个概念，输出Figma JSON。\" |\n| **交付** | A/B测试模拟、情感分析、AutoML预测 | \"根据这些人物角色参数预测采用曲线。\" |\n\n**伦理检查**：在每次交接时对AI输出运行偏见扫描。\n\n### AI集成原则\n\n1. **增强，不替代**：AI加速人类创造力，不是替代它\n2. **透明度**：始终向参与者披露AI协助\n3. **人类判断**：最终决策仍由人类引导师和参与者做出\n4. **偏见意识**：定期检查生成内容中的算法偏见"
        },
        {
          "id": "section-6-6",
          "title": "6.6 时间和能量管理",
          "type": "content",
          "content": "| 块长度 | 目的 | 休息建议 |\n|--------------|---------|------------------|\n| **25分钟** | 疲劳前的认知冲刺最大值 | 5分钟伸展、补水 |\n| **90分钟** | 一个完整的微循环 | 10分钟\"生理和缓冲\" |\n| **180分钟** | 半钻石 | 20分钟用餐/散步 |\n\n### 能量流管理\n\n**早晨能量（高）**：复杂问题框架、综合工作\n**中午能量（中等）**：协作创意、构建活动\n**下午能量（可变）**：测试、反思、规划\n\n**引导师提示**：显示大而可见的计时器；每个冲刺轮换计时器拥有者以分享所有权。\n\n### 注意力管理\n\n- **多样性**：混合个人、配对和团体工作\n- **运动**：包括体力活动和空间变化\n- **感官**：通过材料和方法吸引多种感官\n- **挑战**：平衡难度以维持心流状态"
        },
        {
          "id": "section-6-7",
          "title": "6.7 流程适应",
          "type": "content",
          "content": "| 环境 | 修改 |\n|---------|--------------|\n| **仅远程** | 每个冲刺增加5分钟技术延迟；使用更小的分组（≤5人）。|\n| **企业风险规避** | 延长定义阶段，在原型制作前添加\"合规桌面检查\"。|\n| **社会影响实地工作** | 发现阶段可能持续数天；嵌入当地共同研究者以维持信任。|\n\n### 其他适应\n\n**教育环境**：\n- 更慢的节奏，更多反思时间\n- 学术评分集成点\n- 理论-实践连接时刻\n\n**医疗保健环境**：\n- 患者安全检查点\n- 监管合规审查\n- 临床证据要求\n\n**创业环境**：\n- 更快的循环，更高的风险容忍度\n- 资源约束考虑\n- 市场验证重点"
        },
        {
          "id": "section-6-8",
          "title": "6.8 常见陷阱与防护措施",
          "type": "content",
          "content": "| 陷阱 | 症状 | 防护措施 |\n|---------|---------|-----------|\n| **前期研究过载** | 无休止的访谈，缺乏综合 | 限制发现时间；要求在第4小时前分享第一个洞察。|\n| **原型瘫痪** | 团队在打磨而非测试 | 强制纸质原型优先规则；用户测试必须在冲刺2前进行。|\n| **AI过载** | 工具跳跃使焦点偏离 | 每个阶段预选1-2个AI工具；提供备忘单链接。|\n\n### 其他陷阱\n\n**跳过钻石阶段**：\n- **症状**：在没有问题探索的情况下直接跳到解决方案\n- **防护措施**：在创意生成开始前强制进行问题验证\n\n**冲刺僵化**：\n- **症状**：无论进展如何都强制将活动塞进时间盒\n- **防护措施**：在每个冲刺中建立15%弹性时间以应对突发情况\n\n**输出痴迷**：\n- **症状**：关注交付物而非学习\n- **防护措施**：对获得的洞察和创建的工件给予同等重视"
        },
        {
          "id": "section-6-9",
          "title": "6.9 关键要点",
          "type": "content",
          "content": "- **双钻石提供宏观清晰度；90分钟冲刺提供微观动力**\n- **AI插入加速，而非替代——人类判断把控每个阶段**\n- **时间盒、可见工件和伦理检查保持速度与价值的一致性**\n- **根据情境调整流程长度和严格性，但永远不要跳过反思环节**\n\n### 关键成功因素\n\n1. **流程纪律**：遵循框架的同时保持灵活性\n2. **能量意识**：全程解读和响应团队能量\n3. **进展可视化**：使学习和决策透明化\n4. **反思集成**：定期暂停进行综合和规划\n5. **情境适应**：根据具体情况修改时间和方法"
        },
        {
          "id": "section-6-10",
          "title": "6.10 实地笔记与延伸阅读",
          "type": "content",
          "content": "### 必读资源\n- **论文**：Liedtka (2015) \"观点：将设计思维与创新成果联系起来\"\n- **工具包**：createx.us/toolkit/sprint-timers — 可下载的计时器视频\n- **播客**：Sprint Stories 第12集 – \"谷歌X的90分钟循环\"\n- **模板**：交互式BoardX板\"端到端双钻石\"（公共链接）\n\n### 社区实践\n- 在#process-innovations中分享您的冲刺适应\n- 为开源计时器工具包贡献内容\n- 参加每月流程设计工作坊\n- 记录成功适应的案例研究"
        },
        {
          "id": "section-6-11",
          "title": "6.11 实际实施",
          "type": "content",
          "content": "### 入门检查清单\n\n**工作坊前：**\n- [ ] 挑战画布最终确定\n- [ ] 计时器和冲刺板准备就绪\n- [ ] AI工具预审查，偏见扫描脚本加载\n- [ ] 每90分钟在议程上安排反思时间\n\n**工作坊期间：**\n- [ ] 可见计时器和进度跟踪\n- [ ] 定期能量和参与度检查\n- [ ] 洞察和决策的文档记录\n- [ ] 在阶段转换时进行AI偏见扫描\n\n**工作坊后：**\n- [ ] 完成冲刺回顾\n- [ ] 捕获并分享关键洞察\n- [ ] 记录下一步和承诺\n- [ ] 为未来会议记录流程改进\n\n---\n\n### 引导师检查清单\n\n- [ ] 挑战画布最终确定\n- [ ] 计时器和冲刺板准备就绪\n- [ ] AI工具预审查，偏见扫描脚本加载\n- [ ] 每90分钟在议程上安排反思时间\n- [ ] 能量管理计划准备\n- [ ] 识别并规划情境适应"
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
    moduleTitle: '流程概述',
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
    moduleTitle: 'Process Overview',
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
                    {uiText.chapter} 6
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
              <span>45 minutes</span>
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
                    href={`/${params.lang}/modules/research-empathy`}
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

const ProcessOverviewPage = withModuleProgress(
  ProcessOverviewComponent,
  'process-overview',
  10
);

export default ProcessOverviewPage;
