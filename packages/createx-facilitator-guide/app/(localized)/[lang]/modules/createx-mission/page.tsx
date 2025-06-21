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

function CreatexMissionComponent({
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

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          id: 'origin-story',
          title: '4.0 起源故事',
          content: `CreateX项目源于对未来创造性工作本质的深思熟虑。随着AI工具的快速演变，我们认识到需要重新定义创造过程，将人类洞察力与机器能力无缝结合。
          
我们的创始团队由设计思维从业者、AI研究人员和教育工作者组成，他们共同构想了一种新的创造性实践方法——一种既接受技术进步又坚定地以人为本的方法。

这个平台旨在弥合理论与实践之间的鸿沟，提供研究支持的方法，以应对当代最紧迫的设计挑战。`,
          type: 'content'
        },
        {
          id: 'mission-statement',
          title: '4.1 使命宣言',
          content: `## CreateX使命

**赋能创造者在人工智能时代负责任地推动创新。**

我们通过提供工具、方法和社区来实现这一使命，这些工具、方法和社区将人类创造力与机器能力相结合，以解决复杂问题并创造更美好的未来。

CreateX致力于三个核心目标：

1. **能力提升**：通过实用技能和思维模式培训，提高个人和团队的创造能力
2. **方法创新**：开发和分享适应AI辅助创造时代的新工作方式
3. **负责任设计**：将公平性、可持续性和道德考量纳入创意过程的每个阶段

本指南及其附带资源为实现这一使命奠定了基础。`,
          type: 'content'
        },
        {
          id: 'north-star-metric',
          title: '4.2 北极星指标',
          content: `为衡量我们的影响力，CreateX团队跟踪以下北极星指标：

**"通过我们的方法实施的解决方案的持久影响力"**

我们通过多种维度评估这一指标：

### 创新维度
- 解决方案的新颖性与适用性 
- 创造性合作能力提升
- 从第一个想法到实施的创新周期时间

### 人文维度
- 受益人群的多样性
- 解决方案的可获取性与普及性
- 参与者的创造自信提升

### 可持续维度
- 解决方案面向未来的灵活性
- 环境影响
- 所创造系统的长期韧性

这些指标不仅指导我们的日常工作，还为所有CreateX贡献者提供了理解成功意义的共同框架。`,
          type: 'content'
        },
        {
          id: 'core-principles',
          title: '4.3 五项核心原则',
          content: `CreateX由五项根本原则指导，这些原则贯穿我们所有的工作方法、工具和学习旅程：

### 1. 共同创造，而非单独创造
我们相信创造力蓬勃发展于多样化思想的交叉点，无论是人与人之间还是人与AI之间。我们的方法优先考虑团队协作、跨领域观点和补充性技能。

### 2. 循环而非线性
创造性工作通过反复迭代、积极实验和深思熟虑的反思而蓬勃发展。我们的流程拥抱不确定性，并将失败视为学习的催化剂。

### 3. 工具增强而非替代
技术工具应该放大人类能力而非取代它们。我们开发的方法寻求人类洞察力与AI能力之间的最佳平衡，始终将人置于创造循环的中心。

### 4. 以目的驱动而非以产品为中心
我们追求有影响力的创新，解决真实的人类需求并创造持久的价值。我们的方法超越了单纯的产品开发，关注更广泛的系统影响。

### 5. 包容性而非排他性
创造性实践应该对所有人开放。我们致力于使工具、方法和社区平易近人且易于访问，不受技术熟练程度、行业或背景的限制。`,
          type: 'content'
        },
        {
          id: 'operating-commitments',
          title: '4.4 运营承诺',
          content: `为了实现我们的使命和原则，CreateX团队做出以下具体承诺：

### 开放与透明
- 公开分享我们的方法、研究和学习
- 提供透明的道德框架指导我们的决策
- 诚实面对我们的成功和失败

### 持续实验
- 培养对新方法和视角的好奇心
- 测试我们的假设并根据证据调整方向
- 将学习置于确定性之上

### 沟通领导力
- 简化复杂概念以促进理解
- 讲述激发行动的故事
- 优先考虑明确、同理心和真实性

### 意识到限制
- 认识并积极解决我们方法中的盲点和偏见
- 寻求多样化的观点以扩展我们的理解
- 优先考虑反思和自我批评

这些承诺为我们的日常实践和长期愿景提供了操作指南。`,
          type: 'content'
        },
        {
          id: 'guiding-heuristics',
          title: '4.5 指导启发法',
          content: `以下"经验法则"为应用CreateX原则提供了实用指导：

### 创造性解决问题
- **切换观点**：故意从不同角度审视问题
- **探索极端案例**：想象问题的最小和最大版本
- **质疑假设**：定期审视默认假设

### 工具使用
- **先简单后复杂**：从最简单的工具开始，只在需要时增加复杂性
- **配对是关键**：将人工智能工具与适当的人类技能结合
- **关注增量提升**：寻求10倍的结果改进，而非仅10%

### 团队动态
- **创建心理安全**：培养环境使人们敢于冒险
- **在地图边缘运作**：在舒适区和未知之间的边界推动创新
- **扩大介入**：吸引多样化的贡献者、观点和经验

### 流程管理
- **速度和方向并重**：关注进展速度和前进方向同等重要
- **放大学习循环**：快速尝试、反思并迭代
- **留出空间**：在规划中故意预留时间进行非线性探索

这些启发法则帮助将CreateX原则转化为日常实践，为面对不确定性时的创造性选择提供指导。`,
          type: 'content'
        },
        {
          id: 'principles-workshop',
          title: '4.6 将原则转化为工作坊设计',
          content: `为了将CreateX原则真正融入到工作坊设计中，请考虑以下实践应用：

### 共同创造，而非单独创造
**工作坊应用：**
- 在每个创意阶段包括个人思考、小组合作和全体分享的节奏
- 设计"接力式"活动，参与者在他人的想法基础上继续发展
- 使用数字平台减少发言权力结构，确保每个声音都被听到

### 循环而非线性
**工作坊应用：**
- 设计简短的设计冲刺，每次迭代都有具体的反思时间
- 提供结构化反馈协议，使评论具有建设性而非批判性
- 在工作坊时间线中预留"返回"阶段，重新审视和调整早期决策

### 工具增强而非替代
**工作坊应用：**
- 将AI生成阶段与人类评估阶段交替进行
- 开发"人类优势卡"，提醒参与者人类擅长的领域
- 设计促使参与者拓展AI输出的活动，而非照单全收

### 以目的驱动而非以产品为中心
**工作坊应用：**
- 使用"五个为什么"等技术来深入探究基本目的
- 要求团队创建影响地图，而不仅仅是产品规格
- 建立明确的机制，将伦理考量融入所有决策点

### 包容性而非排他性 
**工作坊应用：**
- 使用参与者可以选择的多种输入方式（视觉、口头、书面）
- 提供材料和指导的多语言版本
- 创建"术语翻译"工具，弥合不同学科和背景的差距

通过这些应用，工作坊引导者可以创造真正体现CreateX原则的体验，构建跨领域和跨人机协作的创造性实践。`,
          type: 'interactive'
        },
        {
          id: 'governance-ethics',
          title: '4.7 治理与伦理',
          content: `随着CreateX方法论和相关技术的发展，我们建立了以下治理和伦理框架：

### 决策结构
CreateX项目由多层级结构引导：
- **指导委员会**：设定整体方向和核心价值观
- **学术顾问**：确保方法论与最新研究保持一致
- **从业者网络**：提供实地反馈和持续改进
- **社区贡献者**：扩展平台的多样性和可达性

### 伦理框架
对于所有CreateX项目，我们采用以下伦理筛选标准：

#### 预防伤害原则
所有设计决策都必须首先考虑降低伤害风险，特别关注弱势群体。工作坊中包括风险评估检查点。

#### 多样性与代表性
团队和解决方案必须反映出他们所服务社区的多样性。我们的包容性指标跟踪参与和表达的公平性。

#### 透明度与可解释性
所有流程、工具和决策必须对所有参与者保持透明，避免"黑盒"式方法。

#### 生态可持续性
创造性解决方案必须考虑环境影响，优先考虑资源效率和减少浪费。

该框架不仅仅是道德遵守清单，而是融入CreateX方法核心的持续对话。我们鼓励所有从业者将这些伦理考量视为创造过程的重要组成部分，而非事后检查。`,
          type: 'content'
        },
        {
          id: 'key-takeaways',
          title: '4.8 关键要点',
          content: `本章节的主要见解包括：

1. **CreateX使命**是在AI时代赋能负责任的创造，通过能力提升、方法创新和负责任设计来实现。

2. **北极星指标**衡量通过我们方法实施的解决方案的持久影响力，跨越创新、人文和可持续维度。

3. **五项核心原则**——共同创造、循环工作、工具增强、目的驱动和包容性——为所有CreateX工作提供基础。

4. **运营承诺**将我们的抱负转化为具体行动，强调开放性、实验、沟通和限制意识。

5. **指导启发法**提供实用的"经验法则"，帮助应用我们的原则解决问题并管理流程。

6. **实际应用**展示了如何将这些原则转化为工作坊设计和引导实践。

7. **治理和伦理框架**确保我们的工作符合负责任的创新标准，并保持对我们所服务社区的问责制。

这些元素共同构成了解释"我们是谁"以及"我们如何工作"的CreateX身份基础，指导我们所有的方法、工具和培训资源。`,
          type: 'content'
        },
        {
          id: 'field-notes',
          title: '4.9 现场笔记与进一步阅读',
          content: `### 从业者观察

"将CreateX原则应用于我的工作，改变了我与技术合作的思维方式。'工具增强而非替代'原则特别有启发性，它帮助我的团队设计了一个流程，在关键决策点保持人类参与，同时利用AI进行繁重的分析工作。我们看到了更快的原型制作和更深思熟虑的最终产品。"
— Mei Lin，服务设计师，新加坡

"指导启发法部分为我提供了可立即应用于工作坊的具体工具。'探索极端案例'策略在突破团队思维定式方面特别有效。"
— Carlos Mendez，创新顾问，墨西哥城

### 推荐资源

#### 书籍
- 《增强创造力：人工智能时代的人类与机器协作》(2024)，Maria Chen著
- 《有原则的创新：技术设计中的道德框架》(2023)，Javier Luque著
- 《共同创造革命》(2022)，Thomas Lee & Sunni Brown著

#### 文章与论文
- "AI辅助设计中的原则与实践：新兴范式"，设计研究期刊，2024
- "循环式工作：打破创新的线性神话"，创意季刊，2023
- "包容性创造的度量与方法"，社会创新评论，2024

#### 在线资源
- CreateX原则播客系列：[createx.org/principles-podcast](http://createx.org/principles-podcast)
- 案例库：[createx.org/case-studies](http://createx.org/case-studies)
- 原则应用工具包：[createx.org/toolkit](http://createx.org/toolkit)

这些资源提供了本章节概念的扩展，并提供了将CreateX原则应用于多种背景的具体例子。`,
          type: 'interactive'
        }
      ];
    } else {
      // English sections
      return [
        {
          id: 'origin-story',
          title: '4.0 Origin Story',
          content: `The CreateX project emerged from a deep contemplation of the future nature of creative work. As AI tools rapidly evolved, we recognized the need to redefine the creative process to seamlessly blend human insight with machine capability.
          
Our founding team of design thinking practitioners, AI researchers, and educators envisioned a new approach to creative practice—one that both embraces technological advancement and remains firmly human-centered.

The platform was designed to bridge the gap between theory and practice, offering research-backed methodologies to tackle the most pressing design challenges of our time.`,
          type: 'content'
        },
        {
          id: 'mission-statement',
          title: '4.1 Mission Statement',
          content: `## The CreateX Mission

**To empower creators to drive innovation responsibly in the age of artificial intelligence.**

We fulfill this mission by providing tools, methodologies, and community that combine human creativity with machine capability to solve complex problems and create a better future.

CreateX is committed to three core objectives:

1. **Capacity Building**: Enhancing individual and team creative capabilities through practical skills and mindset training
2. **Methodological Innovation**: Developing and sharing new ways of working adapted to the AI-assisted creative era
3. **Responsible Design**: Incorporating fairness, sustainability, and ethical considerations into every stage of the creative process

This guide and its accompanying resources lay the foundation for achieving this mission.`,
          type: 'content'
        },
        {
          id: 'north-star-metric',
          title: '4.2 North-Star Metric',
          content: `To measure our impact, the CreateX team tracks the following North Star metric:

**"The lasting impact of solutions implemented through our methodology"**

We assess this metric through multiple dimensions:

### Innovation Dimension
- Novelty and appropriateness of solutions 
- Enhanced capacity for creative collaboration
- Innovation cycle time from first idea to implementation

### Human Dimension
- Diversity of populations benefiting
- Accessibility and inclusivity of solutions
- Increased creative confidence among participants

### Sustainability Dimension
- Future-readiness and adaptability of solutions
- Environmental impact
- Long-term resilience of systems created

These metrics not only guide our day-to-day work but provide a shared framework for understanding what success means for all CreateX contributors.`,
          type: 'content'
        },
        {
          id: 'core-principles',
          title: '4.3 Five Core Principles',
          content: `CreateX is guided by five fundamental principles that inform all our methodologies, tools, and learning journeys:

### 1. Co-creation over Solo Creation
We believe creativity thrives at the intersection of diverse thoughts, whether between humans or humans and AI. Our methods prioritize team collaboration, cross-disciplinary perspectives, and complementary skills.

### 2. Cyclical over Linear
Creative work thrives through repeated iteration, active experimentation, and thoughtful reflection. Our processes embrace uncertainty and treat failure as a catalyst for learning.

### 3. Tool-Augmented over Tool-Replaced
Technology tools should amplify human capabilities rather than replace them. Our methodologies seek the optimal balance between human insight and AI capability, always keeping humans at the center of the creative loop.

### 4. Purpose-Driven over Product-Centered
We pursue impactful innovation that addresses genuine human needs and creates lasting value. Our approach transcends mere product development to focus on broader systemic impact.

### 5. Inclusive over Exclusive
Creative practice should be open to all. We're committed to making tools, methods, and community accessible and approachable regardless of technological fluency, industry, or background.`,
          type: 'content'
        },
        {
          id: 'operating-commitments',
          title: '4.4 Operating Commitments',
          content: `To fulfill our mission and principles, the CreateX team makes the following specific commitments:

### Openness and Transparency
- Sharing our methodologies, research, and learnings openly
- Providing transparent ethical frameworks that guide our decisions
- Being honest about our successes and failures

### Continuous Experimentation
- Cultivating curiosity about new approaches and perspectives
- Testing our assumptions and adjusting direction based on evidence
- Prioritizing learning over certainty

### Communication Leadership
- Simplifying complex concepts to facilitate understanding
- Telling stories that inspire action
- Prioritizing clarity, empathy, and authenticity

### Awareness of Limitations
- Recognizing and actively addressing blind spots and biases in our approaches
- Seeking diverse perspectives to expand our understanding
- Prioritizing reflection and self-critique

These commitments provide operational guidance for our day-to-day practices and long-term vision.`,
          type: 'content'
        },
        {
          id: 'guiding-heuristics',
          title: '4.5 Guiding Heuristics',
          content: `The following "rules of thumb" offer practical guidance for applying CreateX principles:

### Creative Problem-Solving
- **Shift Perspectives**: Deliberately examine problems from different viewpoints
- **Explore Edge Cases**: Imagine the minimal and maximal versions of the problem
- **Question Assumptions**: Regularly revisit default assumptions

### Tool Usage
- **Simple Before Complex**: Start with the simplest tools and add complexity only as needed
- **Pairing Is Essential**: Match AI tools with appropriate human skills
- **Focus on Step-Changes**: Look for 10x result improvements, not just 10%

### Team Dynamics
- **Create Psychological Safety**: Cultivate environments where people feel safe to take risks
- **Operate at the Edge of the Map**: Push innovation at the boundary between comfort and the unknown
- **Expand Involvement**: Engage diverse contributors, perspectives, and experiences

### Process Management
- **Balance Speed and Direction**: Pay equal attention to how fast you're moving and where you're headed
- **Amplify Learning Loops**: Try quickly, reflect, and iterate
- **Leave Room**: Deliberately allocate time in planning for non-linear exploration

These heuristics help translate CreateX principles into everyday practice, offering guidance when making creative choices in the face of uncertainty.`,
          type: 'content'
        },
        {
          id: 'principles-workshop',
          title: '4.6 Translating Principles into Workshop Design',
          content: `To truly embed CreateX principles into workshop design, consider these practical applications:

### Co-creation over Solo Creation
**Workshop Applications:**
- Include rhythms of individual thinking, small group collaboration, and whole-group sharing in each creative phase
- Design "relay" activities where participants build on others' ideas
- Use digital platforms to reduce power structures in speaking and ensure every voice is heard

### Cyclical over Linear
**Workshop Applications:**
- Design short design sprints with specific reflection time after each iteration
- Provide structured feedback protocols that make comments constructive rather than critical
- Include "return" phases in workshop timelines to revisit and adjust earlier decisions

### Tool-Augmented over Tool-Replaced
**Workshop Applications:**
- Alternate AI-generation phases with human evaluation phases
- Develop "human advantage cards" that remind participants of areas where humans excel
- Design activities that prompt participants to extend AI outputs rather than accept them as given

### Purpose-Driven over Product-Centered
**Workshop Applications:**
- Use techniques like "Five Whys" to dig deeper into underlying purpose
- Require teams to create impact maps rather than just product specifications
- Establish explicit mechanisms for incorporating ethical considerations at all decision points

### Inclusive over Exclusive
**Workshop Applications:**
- Use multiple input modes (visual, verbal, written) that participants can choose from
- Provide materials and instructions in multiple languages
- Create "terminology translation" tools to bridge gaps between disciplines and backgrounds

Through these applications, workshop facilitators can create experiences that truly embody CreateX principles, building creative practice across disciplines and human-machine collaboration.`,
          type: 'interactive'
        },
        {
          id: 'governance-ethics',
          title: '4.7 Governance & Ethics',
          content: `As the CreateX methodology and associated technologies evolve, we've established the following governance and ethical framework:

### Decision-Making Structure
The CreateX project is guided by a multi-tiered structure:
- **Steering Committee**: Sets overall direction and core values
- **Academic Advisors**: Ensures methodologies align with current research
- **Practitioner Network**: Provides on-the-ground feedback and continuous improvement
- **Community Contributors**: Extends platform diversity and reach

### Ethical Framework
For all CreateX projects, we apply the following ethical screening criteria:

#### Non-maleficence Principle
All design decisions must first consider minimizing risk of harm, with special attention to vulnerable populations. Risk assessment checkpoints are included in workshops.

#### Diversity and Representation
Teams and solutions must reflect the diversity of the communities they serve. Our inclusivity metrics track equity in participation and expression.

#### Transparency and Explainability
All processes, tools, and decisions must remain transparent to all participants, avoiding "black box" approaches.

#### Ecological Sustainability
Creative solutions must consider environmental impact, prioritizing resource efficiency and waste reduction.

This framework is not merely a checklist for ethical compliance but an ongoing conversation central to the CreateX methodology. We encourage all practitioners to view these ethical considerations as integral to the creative process rather than post-hoc checks.`,
          type: 'content'
        },
        {
          id: 'key-takeaways',
          title: '4.8 Key Takeaways',
          content: `The main insights from this chapter include:

1. **The CreateX mission** is to empower responsible creation in the AI age through capacity building, methodological innovation, and responsible design.

2. **Our North Star metric** measures the lasting impact of solutions implemented through our methodology across innovation, human, and sustainability dimensions.

3. **Five core principles**—co-creation, cyclicality, tool-augmentation, purpose-driven, and inclusivity—provide the foundation for all CreateX work.

4. **Operating commitments** translate our aspirations into concrete actions, emphasizing openness, experimentation, communication, and awareness of limitations.

5. **Guiding heuristics** provide practical "rules of thumb" for applying our principles to problem-solving and process management.

6. **Practical applications** demonstrate how to translate these principles into workshop design and facilitation practices.

7. **Governance and ethical frameworks** ensure our work aligns with responsible innovation standards and maintains accountability to the communities we serve.

Together, these elements form the CreateX identity foundation that explains "who we are" and "how we work," guiding all our methodologies, tools, and training resources.`,
          type: 'content'
        },
        {
          id: 'field-notes',
          title: '4.9 Field Notes & Further Reading',
          content: `### Practitioner Observations

"Applying the CreateX principles to my work transformed how I think about collaborating with technology. The 'tool-augmented over tool-replaced' principle was particularly illuminating, helping my team design a process that maintained human involvement at key decision points while leveraging AI for the heavy analytical lifting. We saw faster prototyping and more thoughtful final products."
— Mei Lin, Service Designer, Singapore

"The guiding heuristics section gave me concrete tools I could immediately apply to workshops. The 'explore edge cases' strategy was particularly effective in breaking through team mental blocks."
— Carlos Mendez, Innovation Consultant, Mexico City

### Recommended Resources

#### Books
- *Augmented Creativity: Human and Machine Collaboration in the AI Era* (2024) by Maria Chen
- *Principled Innovation: Ethical Frameworks in Technological Design* (2023) by Javier Luque
- *The Co-Creation Revolution* (2022) by Thomas Lee & Sunni Brown

#### Articles and Papers
- "Principles and Practices in AI-Assisted Design: Emerging Paradigms," Journal of Design Research, 2024
- "Cyclical Work: Breaking the Linear Myth of Innovation," Creative Quarterly, 2023
- "Metrics and Methods for Inclusive Creation," Social Innovation Review, 2024

#### Online Resources
- CreateX Principles Podcast Series: [createx.org/principles-podcast](http://createx.org/principles-podcast)
- Case Library: [createx.org/case-studies](http://createx.org/case-studies)
- Principles Application Toolkit: [createx.org/toolkit](http://createx.org/toolkit)

These resources provide extensions of the concepts covered in this chapter and offer concrete examples of applying CreateX principles across diverse contexts.`,
          type: 'interactive'
        }
      ];
    }
  };

  const sections = getSections();

  // Process current section content when it changes
  useEffect(() => {
    const processCurrentSection = async () => {
      if (sections[currentSection]) {
        const htmlContent = await processMarkdown(sections[currentSection].content);
        setProcessedContent(htmlContent);
      }
    };
    processCurrentSection();
  }, [currentSection, params.lang]);

  const toggleSectionComplete = (index: number) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSections(newCompleted);
  };

  const progress = (moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100;

  // Dictionary text for UI elements
  const uiText = {
    moduleTitle: params.lang === 'zh' ? 'CreateX使命与原则' : 'CreateX Mission & Principles',
    chapter: params.lang === 'zh' ? '第' : 'Chapter',
    minutes: params.lang === 'zh' ? '分钟' : 'minutes',
    beginner: params.lang === 'zh' ? '初级' : 'Beginner',
    foundations: params.lang === 'zh' ? '基础' : 'Foundations',
    learningObjectives: params.lang === 'zh' ? '学习目标' : 'Learning Objectives',
    modules: params.lang === 'zh' ? '模块' : 'Modules',
    backToModules: params.lang === 'zh' ? '返回模块' : 'Back to Modules',
    next: params.lang === 'zh' ? '下一个' : 'Next',
    previous: params.lang === 'zh' ? '上一个' : 'Previous',
    markComplete: params.lang === 'zh' ? '标记完成' : 'Mark Complete',
    completed: params.lang === 'zh' ? '已完成' : 'Completed',
    interactiveSection: params.lang === 'zh' ? '互动部分' : 'Interactive Section',
    interactiveSectionDescription: params.lang === 'zh' ? '本部分包括实践练习和活动。' : 'This section includes hands-on exercises and activities.',
    moduleSections: params.lang === 'zh' ? '模块部分' : 'Module Sections'
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
                      {uiText.chapter} 4
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{uiText.foundations}</span>
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
                <span>{uiText.beginner}</span>
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
                      href={`/${params.lang}/modules/facilitator-mindsets`}
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

const CreatexMissionPage = withModuleProgress(
  CreatexMissionComponent,
  'createx-mission',
  8
);

export default CreatexMissionPage;
