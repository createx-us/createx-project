'use client';

import React, { useState, useEffect } from 'react';
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

function DesignThinkingHistoryComponent({
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
      id: 'early-foundations',
      title: 'Early Foundations and Precursors',
      content: `# Early Foundations and Precursors

## The Bauhaus Movement (1919-1933)

The roots of design thinking can be traced back to the Bauhaus school in Germany, founded by Walter Gropius in 1919. The Bauhaus philosophy emphasized:

- **Form follows function** - Design should prioritize utility over decoration
- **Interdisciplinary collaboration** - Breaking down barriers between art, craft, and industry
- **Problem-solving approach** - Using design to address real-world challenges
- **Human-centered focus** - Considering how people interact with designed objects

### Key Bauhaus Principles That Influenced Design Thinking:
- Experimentation and iteration
- Integration of theory and practice
- Collaborative workshops and studios
- Focus on social impact of design

## The HfG Ulm School (1953-1968)

Building on Bauhaus traditions, the Ulm School of Design (Hochschule für Gestaltung Ulm) further developed systematic design methodologies:

- **Design methodology** - Structured approaches to problem-solving
- **Systems thinking** - Understanding design in broader contexts
- **Cybernetics influence** - Feedback loops and iterative processes
- **Social responsibility** - Design's role in society

## Early Design Methods Movement (1960s)

The 1960s saw the emergence of formal design methods:

- **Christopher Alexander** - Pattern Language and systematic design
- **John Chris Jones** - Design Methods and systematic creativity
- **Bruce Archer** - Scientific method applied to design
- **Buckminster Fuller** - Comprehensive anticipatory design science

These pioneers established the foundation for what would become design thinking by emphasizing systematic, human-centered approaches to solving complex problems.`,
      type: 'content'
    },
    {
      id: 'stanford-genesis',
      title: 'Stanford and the Genesis of Design Thinking',
      content: `# Stanford and the Genesis of Design Thinking

## The Stanford Design Program (1958)

Stanford University's design program, founded by Bob McKim, became the crucible for modern design thinking. McKim's approach emphasized:

- **Visual thinking** - Using sketching and visualization in problem-solving
- **Experiential learning** - Learning by doing and making
- **Ambidextrous thinking** - Balancing analytical and creative modes
- **Human factors** - Understanding user needs and behaviors

## David Kelley and the Stanford d.school (2004)

David Kelley, founder of IDEO, established the Hasso Plattner Institute of Design (d.school) at Stanford with several key innovations:

### The Five-Stage Design Thinking Process:
1. **Empathize** - Understand the user and their needs
2. **Define** - Frame the problem based on user insights
3. **Ideate** - Generate a wide range of creative solutions
4. **Prototype** - Build representations of ideas
5. **Test** - Learn from user feedback

### Core Principles Established:
- **Human-centered approach** - Start with people's needs
- **Show don't tell** - Use prototypes to communicate ideas
- **Embrace failure** - Learn quickly through iteration
- **Radical collaboration** - Diverse teams produce better solutions
- **Be mindful of process** - Methodology matters

## The Role of Herbert Simon

Nobel Prize winner Herbert Simon's work in "The Sciences of the Artificial" (1969) provided theoretical foundations:

- **Design as problem-solving** - Systematic approach to wicked problems
- **Artificial vs. natural sciences** - Design creates what ought to be
- **Bounded rationality** - Working within constraints and limitations
- **Satisficing** - Finding good enough solutions rather than optimal ones

Simon's work legitimized design as a valid form of inquiry and established design thinking as a discipline worthy of academic study.`,
      type: 'content'
    },
    {
      id: 'ideo-methodology',
      title: 'IDEO and the Methodology Revolution',
      content: `# IDEO and the Methodology Revolution

## From Products to Process (1980s-1990s)

IDEO, founded by merging David Kelley Design, ID Two, and Matrix Product Design, revolutionized design by making the process as important as the outcome.

### The IDEO Method Toolkit:
- **Ethnographic research** - Deep user observation and interviews
- **Brainstorming rules** - Defer judgment, build on ideas, stay focused
- **Rapid prototyping** - Quick, low-fidelity testing of concepts
- **Storytelling** - Using narratives to communicate insights
- **Journey mapping** - Visualizing user experiences over time

## Making Design Thinking Visible

IDEO's breakthrough came from documenting and sharing their process:

### ABC's Nightline Special (1999)
The famous television episode showed IDEO redesigning a shopping cart in five days, demonstrating:
- Cross-functional team collaboration
- User observation and research
- Rapid ideation and prototyping
- Iterative refinement
- The power of constraints

### "The Art of Innovation" (2001)
Tom Kelley's book codified IDEO's approach and introduced key concepts:
- **The Ten Faces of Innovation** - Different roles in innovation teams
- **Hot teams** - High-performing collaborative groups
- **Prototyping culture** - Making ideas tangible quickly
- **Customer journey mapping** - Understanding end-to-end experiences

## Key IDEO Innovations in Methodology:

### Deep Dive Process:
1. **Understand** - Immerse in the problem space
2. **Observe** - Watch real users in real situations
3. **Visualize** - Map insights and opportunities
4. **Evaluate** - Test and refine concepts
5. **Implement** - Bring solutions to market

### Cultural Contributions:
- **"Fail often to succeed sooner"** - Embracing failure as learning
- **"Enlightened trial and error"** - Systematic experimentation
- **"1% inspiration, 99% perspiration"** - Emphasis on hard work and iteration
- **"Build on the ideas of others"** - Collaborative creativity`,
      type: 'content'
    },
    {
      id: 'business-adoption',
      title: 'Business World Adoption and Expansion',
      content: `# Business World Adoption and Expansion

## From Design Studios to Boardrooms (2000s)

As IDEO's clients achieved remarkable success, business leaders began to see design thinking as more than just product development—it was a new way to approach innovation and strategy.

### Early Corporate Adopters:

#### Procter & Gamble (P&G)
Under CEO A.G. Lafley, P&G embraced design thinking:
- **Consumer-centric innovation** - Starting with unmet needs
- **Connect + Develop** - Open innovation approach
- **Design for delight** - Emotional connection with consumers
- **Prototyping culture** - Testing ideas quickly and cheaply

#### General Electric (GE)
GE integrated design thinking into their innovation process:
- **FastWorks** - Lean startup methodology within a large corporation
- **Customer development** - Direct customer engagement
- **Minimum viable products** - Testing assumptions early
- **Pivot strategies** - Changing direction based on learning

#### IBM
IBM's transformation through design thinking:
- **IBM Design Thinking** - Scaled framework for enterprise
- **Design thinking workshops** - Training thousands of employees
- **User outcomes focus** - Measuring success by user satisfaction
- **Continuous alignment** - Keeping teams focused on user needs

## Roger Martin and "The Design of Business" (2009)

Business scholar Roger Martin articulated how design thinking could transform business strategy:

### The Knowledge Funnel:
1. **Mystery** - Poorly understood phenomena
2. **Heuristic** - Rule of thumb for approaching problems
3. **Algorithm** - Systematic, repeatable process

### Integrative Thinking:
- **Salience** - Considering more features as relevant
- **Causality** - Examining multidirectional and nonlinear relationships
- **Architecture** - Holding creative tension between opposing ideas
- **Resolution** - Creatively resolving tensions without trade-offs

## Design Thinking as Competitive Advantage

### Key Business Benefits:
- **Innovation velocity** - Faster time to market
- **Risk reduction** - Testing assumptions before major investment
- **Employee engagement** - More collaborative and creative culture
- **Customer satisfaction** - Solutions that truly meet needs
- **Differentiation** - Unique value propositions`,
      type: 'content'
    },
    {
      id: 'global-spread',
      title: 'Global Spread and Institutional Adoption',
      content: `# Global Spread and Institutional Adoption

## Academic Institutionalization

### Design Schools Worldwide:
- **Parsons School of Design** - Strategic Design and Management program
- **MIT Sloan** - Integration with business education
- **RISD** - Business and design integration
- **Royal College of Art** - Design leadership programs
- **Design Academy Eindhoven** - Social design thinking

### Business Schools Integration:
- **Harvard Business School** - Design thinking in MBA curriculum
- **Stanford Graduate School of Business** - Joint programs with d.school
- **INSEAD** - European perspective on design thinking
- **Kellogg School** - Innovation and design courses

## Government and Public Sector Adoption

### Policy Lab (UK Government)
- **Design in government** - Applying design thinking to policy
- **Ethnographic policy research** - Understanding citizen experiences
- **Prototyping policies** - Testing interventions before full rollout
- **Data visualization** - Making complex information accessible

### IDEO.org and Social Innovation
- **Human-centered design for social impact** - Addressing global challenges
- **Design kit methodology** - Open-source design thinking tools
- **Field work** - Design thinking in developing countries
- **Systems change** - Addressing root causes of problems

## Corporate Design Thinking Programs

### Scaled Implementation Approaches:

#### Design Thinking Training:
- **Executive workshops** - Leadership alignment and commitment
- **Employee certification** - Building internal capability
- **Innovation labs** - Dedicated spaces for creative work
- **Cross-functional teams** - Breaking down silos

#### Organizational Changes:
- **Chief Design Officers** - Executive-level design leadership
- **Design ops** - Supporting and scaling design practice
- **Innovation metrics** - Measuring creative output and impact
- **Cultural transformation** - Shifting mindsets and behaviors

## Global Variations and Adaptations

### Regional Approaches:
- **Nordic design thinking** - Emphasis on sustainability and social welfare
- **Japanese design thinking** - Integration with lean and kaizen principles
- **Indian jugaad** - Frugal innovation and resourcefulness
- **Brazilian jeitinho** - Creative problem-solving in constraints
- **German engineering** - Systematic and precision-focused adaptation`,
      type: 'content'
    },
    {
      id: 'contemporary-evolution',
      title: 'Contemporary Evolution and Future Directions',
      content: `# Contemporary Evolution and Future Directions

## Digital Transformation and Design Thinking

### Technology-Enhanced Methodologies:
- **Virtual collaboration tools** - Remote design thinking sessions
- **AI-powered insights** - Data-driven empathy and pattern recognition
- **Digital prototyping** - Rapid testing of digital experiences
- **Real-time feedback** - Continuous user input and iteration
- **Global participation** - Inclusive design across cultures and contexts

### Platform-Based Design Thinking:
- **Miro and Figma** - Collaborative design thinking platforms
- **Design thinking apps** - Mobile-first facilitation tools
- **Virtual reality empathy** - Immersive user experience research
- **Blockchain collaboration** - Decentralized innovation networks

## Critiques and Evolution

### Academic and Practical Criticisms:
- **Oversimplification** - Complex problems require more than process
- **Cultural bias** - Western-centric approaches may not translate globally
- **Implementation gaps** - Difficulty scaling from workshops to practice
- **Measurement challenges** - Quantifying creative and innovative outcomes

### Responses and Adaptations:
- **Systems thinking integration** - Addressing root causes and complexity
- **Decolonizing design** - Inclusive and culturally sensitive approaches
- **Evidence-based design** - Research-backed methodologies
- **Continuous improvement** - Iterating on the process itself

## The CreateX Innovation: Next-Generation Design Thinking

### Addressing Contemporary Challenges:
- **Global collaboration** - Distributed teams and diverse perspectives
- **Sustainability focus** - Environmental and social responsibility
- **Ethical AI integration** - Responsible use of artificial intelligence
- **Real-time adaptation** - Continuous learning and improvement
- **Outcome measurement** - Tangible impact assessment

### CreateX Methodology Features:
- **Hybrid physical-digital** - Seamless integration of online and offline experiences
- **Cultural intelligence** - Globally aware and locally relevant solutions
- **Accelerated cycles** - Faster iteration without sacrificing depth
- **Stakeholder ecosystem** - Inclusive participation from all affected parties
- **Impact tracking** - Long-term outcome measurement and optimization

## Future Trends and Directions

### Emerging Developments:
- **Quantum thinking** - Non-linear and paradoxical problem-solving
- **Regenerative design** - Creating positive impact beyond sustainability
- **Inclusive innovation** - Design for accessibility and equity
- **Circular design thinking** - Closed-loop systems and resource efficiency
- **Bioinspired methodologies** - Learning from natural systems

### The Next Decade:
As we look toward the future, design thinking continues to evolve as a fundamental approach to addressing the world's most complex challenges. The CreateX methodology represents this evolution—combining the best of traditional human-centered design with contemporary digital capabilities and global consciousness.

The future of design thinking lies not just in better tools or faster processes, but in our ability to create more inclusive, sustainable, and impactful solutions that truly serve humanity's greatest needs.`,
      type: 'content'
    }
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      return [
        {
          id: 'early-foundations',
          title: '早期基础与先驱',
          content: `# 早期基础与先驱

## 包豪斯运动 (1919-1933)

设计思维的根源可以追溯到1919年由瓦尔特·格罗皮乌斯在德国创立的包豪斯学院。包豪斯哲学强调：

- **形式服务功能** - 设计应优先考虑实用性而非装饰性
- **跨学科协作** - 打破艺术、工艺和工业之间的壁垒
- **问题解决方法** - 使用设计来解决现实世界的挑战
- **以人为中心的焦点** - 考虑人们如何与设计对象互动

### 影响设计思维的关键包豪斯原则：
- 实验和迭代
- 理论与实践的整合
- 协作工作坊和工作室
- 关注设计的社会影响

## HfG乌尔姆学院 (1953-1968)

基于包豪斯传统，乌尔姆设计学院进一步发展了系统化的设计方法论：

- **设计方法论** - 结构化的问题解决方法
- **系统思维** - 在更广泛的背景下理解设计
- **控制论影响** - 反馈循环和迭代过程
- **社会责任** - 设计在社会中的作用

## 早期设计方法运动 (1960年代)

1960年代见证了正式设计方法的出现：

- **克里斯托弗·亚历山大** - 模式语言和系统化设计
- **约翰·克里斯·琼斯** - 设计方法和系统化创造力
- **布鲁斯·阿彻** - 将科学方法应用于设计
- **巴克敏斯特·富勒** - 综合预期设计科学

这些先驱通过强调系统化、以人为中心的方法来解决复杂问题，为后来成为设计思维的方法奠定了基础。`,
          type: 'content'
        },
        {
          id: 'stanford-genesis',
          title: '斯坦福与设计思维的起源',
          content: `# 斯坦福与设计思维的起源

## 斯坦福设计项目 (1958)

由鲍勃·麦金创立的斯坦福大学设计项目成为现代设计思维的熔炉。麦金的方法强调：

- **视觉思维** - 在问题解决中使用草图和可视化
- **体验式学习** - 通过实践和制作来学习
- **双手思维** - 平衡分析和创意模式
- **人因素** - 理解用户需求和行为

## 戴维·凯利和斯坦福d.school (2004)

IDEO创始人戴维·凯利建立了斯坦福哈索·普拉特纳设计学院（d.school），带来了几个关键创新：

### 五阶段设计思维过程：
1. **共情** - 理解用户及其需求
2. **定义** - 基于用户洞察构建问题框架
3. **构思** - 生成广泛的创意解决方案
4. **原型** - 构建想法的表现形式
5. **测试** - 从用户反馈中学习

### 建立的核心原则：
- **以人为中心的方法** - 从人们的需求开始
- **展示不告诉** - 使用原型来传达想法
- **拥抱失败** - 通过迭代快速学习
- **激进协作** - 多元化团队产生更好的解决方案
- **注意过程** - 方法论很重要

## 赫伯特·西蒙的作用

诺贝尔奖获得者赫伯特·西蒙在《人工科学》(1969)中的工作提供了理论基础：

- **设计作为问题解决** - 解决棘手问题的系统方法
- **人工与自然科学** - 设计创造应该存在的东西
- **有限理性** - 在约束和限制内工作
- **满意化** - 寻找足够好的解决方案而非最优解

西蒙的工作使设计作为一种有效的探索形式得到认可，并确立了设计思维作为值得学术研究的学科。`,
          type: 'content'
        },
        {
          id: 'ideo-methodology',
          title: 'IDEO与方法论革命',
          content: `# IDEO与方法论革命

## 从产品到过程 (1980-1990年代)

IDEO由戴维·凯利设计、ID Two和Matrix产品设计合并而成，通过使过程与结果同样重要来革命性地改变了设计。

### IDEO方法工具包：
- **人种学研究** - 深度用户观察和访谈
- **头脑风暴规则** - 延迟判断，建立想法，保持专注
- **快速原型制作** - 快速、低保真度的概念测试
- **讲故事** - 使用叙述来传达洞察
- **旅程映射** - 可视化用户体验的时间过程

## 使设计思维可见

IDEO的突破来自于记录和分享他们的过程：

### ABC夜线特别节目 (1999)
著名的电视节目展示了IDEO在五天内重新设计购物车，展示了：
- 跨功能团队协作
- 用户观察和研究
- 快速构思和原型制作
- 迭代完善
- 约束的力量

### 《创新的艺术》(2001)
汤姆·凯利的书编纂了IDEO的方法并介绍了关键概念：
- **创新的十张面孔** - 创新团队中的不同角色
- **热门团队** - 高绩效协作小组
- **原型文化** - 快速使想法变得有形
- **客户旅程映射** - 理解端到端体验

## IDEO方法论的关键创新：

### 深度潜入过程：
1. **理解** - 沉浸在问题空间中
2. **观察** - 在真实情况下观察真实用户
3. **可视化** - 映射洞察和机会
4. **评估** - 测试和完善概念
5. **实施** - 将解决方案推向市场

### 文化贡献：
- **"经常失败以便更快成功"** - 将失败作为学习来拥抱
- **"开明的试错"** - 系统化实验
- **"1%灵感，99%汗水"** - 强调努力工作和迭代
- **"建立在他人想法基础上"** - 协作创造力`,
          type: 'content'
        },
        {
          id: 'business-adoption',
          title: '商业世界的采用与扩展',
          content: `# 商业世界的采用与扩展

## 从设计工作室到董事会 (2000年代)

随着IDEO客户取得显著成功，商业领袖开始将设计思维视为不仅仅是产品开发——它是一种处理创新和战略的新方式。

### 早期企业采用者：

#### 宝洁公司 (P&G)
在首席执行官雷富礼的领导下，宝洁公司拥抱了设计思维：
- **以消费者为中心的创新** - 从未满足的需求开始
- **连接+发展** - 开放式创新方法
- **设计愉悦** - 与消费者的情感连接
- **原型文化** - 快速廉价地测试想法

#### 通用电气 (GE)
GE将设计思维整合到他们的创新过程中：
- **FastWorks** - 大公司内的精益创业方法论
- **客户开发** - 直接客户参与
- **最小可行产品** - 早期测试假设
- **转向策略** - 基于学习改变方向

#### IBM
IBM通过设计思维的转型：
- **IBM设计思维** - 企业规模化框架
- **设计思维工作坊** - 培训数千名员工
- **用户结果焦点** - 通过用户满意度衡量成功
- **持续对齐** - 保持团队专注于用户需求

## 罗杰·马丁和《商业设计》(2009)

商业学者罗杰·马丁阐述了设计思维如何能够转变商业战略：

### 知识漏斗：
1. **神秘** - 理解不良的现象
2. **启发式** - 处理问题的经验法则
3. **算法** - 系统化、可重复的过程

### 整合思维：
- **显著性** - 考虑更多特征为相关的
- **因果关系** - 检查多向和非线性关系
- **架构** - 在对立想法之间保持创造性张力
- **解决** - 创造性地解决张力而不做权衡

## 设计思维作为竞争优势

### 关键商业好处：
- **创新速度** - 更快的市场投放时间
- **风险降低** - 在重大投资前测试假设
- **员工参与** - 更协作和创造性的文化
- **客户满意度** - 真正满足需求的解决方案
- **差异化** - 独特的价值主张`,
          type: 'content'
        },
        {
          id: 'global-spread',
          title: '全球传播与机构采用',
          content: `# 全球传播与机构采用

## 学术机构化

### 全球设计学院：
- **帕森斯设计学院** - 战略设计与管理项目
- **MIT斯隆** - 与商业教育的整合
- **RISD** - 商业与设计整合
- **皇家艺术学院** - 设计领导力项目
- **埃因霍温设计学院** - 社会设计思维

### 商学院整合：
- **哈佛商学院** - MBA课程中的设计思维
- **斯坦福商学院** - 与d.school的联合项目
- **INSEAD** - 设计思维的欧洲视角
- **凯洛格学院** - 创新与设计课程

## 政府和公共部门采用

### 政策实验室（英国政府）
- **政府中的设计** - 将设计思维应用于政策
- **人种学政策研究** - 理解公民体验
- **政策原型** - 在全面推出前测试干预措施
- **数据可视化** - 使复杂信息易于获取

### IDEO.org和社会创新
- **社会影响的以人为中心设计** - 解决全球挑战
- **设计工具包方法论** - 开源设计思维工具
- **实地工作** - 发展中国家的设计思维
- **系统变革** - 解决问题的根本原因

## 企业设计思维项目

### 规模化实施方法：

#### 设计思维培训：
- **高管工作坊** - 领导层对齐和承诺
- **员工认证** - 建立内部能力
- **创新实验室** - 创意工作的专用空间
- **跨功能团队** - 打破孤岛

#### 组织变革：
- **首席设计官** - 执行级设计领导力
- **设计运营** - 支持和扩展设计实践
- **创新指标** - 衡量创意产出和影响
- **文化转型** - 转变思维和行为

## 全球变化和适应

### 区域方法：
- **北欧设计思维** - 强调可持续性和社会福利
- **日本设计思维** - 与精益和改善原则的整合
- **印度jugaad** - 节约创新和机智
- **巴西jeitinho** - 在约束中的创造性问题解决
- **德国工程** - 系统化和精确的适应`,
          type: 'content'
        },
        {
          id: 'contemporary-evolution',
          title: '当代演进与未来方向',
          content: `# 当代演进与未来方向

## 数字化转型与设计思维

### 技术增强的方法论：
- **虚拟协作工具** - 远程设计思维会议
- **AI驱动的洞察** - 数据驱动的共情和模式识别
- **数字原型** - 数字体验的快速测试
- **实时反馈** - 持续的用户输入和迭代
- **全球参与** - 跨文化和背景的包容性设计

### 基于平台的设计思维：
- **Miro和Figma** - 协作设计思维平台
- **设计思维应用** - 移动优先的促进工具
- **虚拟现实共情** - 沉浸式用户体验研究
- **区块链协作** - 去中心化创新网络

## 批评与演进

### 学术和实践批评：
- **过度简化** - 复杂问题需要的不仅仅是过程
- **文化偏见** - 以西方为中心的方法可能无法全球转化
- **实施差距** - 从工作坊扩展到实践的困难
- **测量挑战** - 量化创意和创新成果

### 回应和适应：
- **系统思维整合** - 解决根本原因和复杂性
- **去殖民化设计** - 包容性和文化敏感的方法
- **循证设计** - 基于研究的方法论
- **持续改进** - 对过程本身的迭代

## CreateX创新：下一代设计思维

### 解决当代挑战：
- **全球协作** - 分布式团队和多元化视角
- **可持续性焦点** - 环境和社会责任
- **道德AI整合** - 负责任地使用人工智能
- **实时适应** - 持续学习和改进
- **结果测量** - 有形的影响评估

### CreateX方法论特征：
- **混合物理-数字** - 在线和离线体验的无缝整合
- **文化智能** - 全球意识和本地相关的解决方案
- **加速循环** - 更快的迭代而不牺牲深度
- **利益相关者生态系统** - 所有受影响方的包容性参与
- **影响跟踪** - 长期结果测量和优化

## 未来趋势和方向

### 新兴发展：
- **量子思维** - 非线性和悖论性问题解决
- **再生设计** - 超越可持续性创造积极影响
- **包容性创新** - 可访问性和公平性设计
- **循环设计思维** - 闭环系统和资源效率
- **生物启发方法论** - 从自然系统学习

### 下一个十年：
展望未来，设计思维继续演进为解决世界最复杂挑战的基本方法。CreateX方法论代表了这种演进——结合传统以人为中心设计的精华与当代数字能力和全球意识。

设计思维的未来不仅在于更好的工具或更快的过程，而在于我们创造更包容、可持续和有影响力的解决方案的能力，真正服务于人类最大的需求。`,
          type: 'content'
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
    moduleTitle: '设计思维历史',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '初级',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Design Thinking History',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: 'Beginner',
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
                    {uiText.chapter} 2
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
                    href={`/${params.lang}/modules/creative-confidence`}
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
  );
}

const DesignThinkingHistoryPage = withModuleProgress(
  DesignThinkingHistoryComponent,
  'design-thinking-history',
  6
);

export default DesignThinkingHistoryPage;
