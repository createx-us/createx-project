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

function CreativeConfidenceComponent({
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
          id: 'opening-story',
          title: '3.0 开场故事',
          content: `"我不是有创造力的人。"

当创意总监艾玛·陈问她的团队谁想领导品牌的重新设计时，半数人低头看着自己的笔记本。艾玛开始了一个简单的练习。每个人写下了自己上周解决的一个问题，无论大小。然后他们交换解决方案，使用"这是有创造力的，因为..."开始反馈。

一周后，当她再次询问谁想领导项目时，举手的人数增加了一倍。创造性自信不是魔法，而是通过肯定反馈和小胜利而增长的状态。`,
          type: 'content'
        },
        {
          id: 'what-is-creative-confidence',
          title: '3.1 什么是创造性自信？',
          content: `创造性自信不仅仅是对自己想法感觉良好——它是一种可测量的心理状态，能够预测创造性表现。

研究表明，具有更高创造性自信的人会：
- 在头脑风暴会议中生成更多新颖想法
- 在面临创造性挑战时坚持更久
- 在工作中承担更多创造性风险
- 更有效地建构他人想法
- 从创造性挫折中恢复更快

### 关键组成部分

- **自我效能**：相信自己能够执行创造性任务的能力
- **成长心态**：理解创造能力可以通过发展获得
- **容忍模糊性**：对不确定性和不完整信息感到舒适
- **内在动机**：为个人满足而非外部奖励而创造的驱动力

### 创造性自信思维模式

创造性自信表现为特定的思维模式，特征包括：
- **"我可以学会更有创造力"** 而不是 **"我要么有创造力要么没有"**
- **"失败教会我"** 而不是 **"失败意味着我没有创造力"**
- **"不同的观点丰富了解决方案"** 而不是 **"有一个正确答案"**
- **"创造力是一个过程"** 而不是 **"创造力是灵感"**`,
          type: 'content'
        },
        {
          id: 'psychological-foundations',
          title: '3.2 心理学基础',
          content: `创造性自信建立在引导师必须理解和培养的四个心理支柱之上：

### 支柱1：好奇心与惊奇
探索、质疑假设、寻求新颖视角的驱动力。好奇心是创造性思维的燃料。

**引导师技巧：**
- 提出'如果...会怎样？'和'我们如何能够...？'的问题
- 鼓励探索切线想法
- 创造神秘和不完整信息场景
- 使用挑衅性提示和约束

### 支柱2：容忍模糊性
对不确定性、不完整信息和多种可能解决方案感到舒适。这对创造性探索至关重要。

**引导师技巧：**
- 呈现没有明确解决方案的问题
- 鼓励对相同数据的多种解释
- 练习'是的，并且...'而不是'是的，但是...'
- 将不确定性框架为机会而非威胁

### 支柱3：成长心态
理解创造能力可以通过努力、实践和从失败中学习而发展。

**引导师技巧：**
- 庆祝过程而非结果
- 分享创造性发展的故事
- 规范化奋斗和迭代
- 专注于学习而非证明

### 支柱4：内在动机
为个人满足、学习和表达而创造，而非外部验证。

**引导师技巧：**
- 将挑战与个人价值观联系
- 鼓励对创造性兴趣的自我反思
- 最小化外部压力和比较
- 为个人创造性表达创造空间`,
          type: 'content'
        },
        {
          id: 'neuroscience-snapshots',
          title: '3.3 神经科学快照',
          content: `最新的神经科学研究揭示，创造力涉及三个大脑网络之间的动态切换：

### 执行网络
- **功能**：控制注意力，评估想法，管理工作记忆
- **创造性角色**：筛选和完善想法，保持对目标的关注
- **激活时机**：结构化分析任务，评估阶段

### 默认网络
- **功能**：生成自发想法，连接不相关的概念
- **创造性角色**：新颖关联和洞察的来源
- **激活时机**：放松状态，走神，反思

### 显著性网络
- **功能**：在网络间切换，识别相关信息
- **创造性角色**：从默认网络活动中识别有前景的想法
- **激活时机**：过渡时刻，'啊哈！'体验

### 对引导师的启示

**为网络切换而设计：**
- 在专注工作和放松反思之间交替
- 在不同类型活动之间包含过渡仪式
- 允许个人反思和团体互动
- 使用运动和环境变化来触发网络切换

### 创造性大脑的运作

研究表明，高度创造性的个体擅长：
- **认知灵活性**：在不同概念和视角之间切换
- **远程关联**：连接看似无关的想法
- **开放性体验**：寻求新颖的体验和想法
- **发散性思维**：为问题生成多种解决方案`,
          type: 'content'
        },
        {
          id: 'measuring-creative-confidence',
          title: '3.4 测量创造性自信',
          content: `创造性自信可以通过正式评估和观察指标来测量和跟踪。

### 正式测量工具

#### 创造性自信量表（CCS）
一个经过验证的心理工具，测量四个维度：
- **创造性自我效能**：对创造能力的信心
- **创造性坚持**：通过挑战坚持的意愿
- **创造性冒险**：对创造性不确定性的舒适度
- **社会创造性**：对创造性协作的信心

#### 另类思维评估（ATA）
测量生成新颖解决方案的能力：
- **流畅性**：生成想法的数量
- **灵活性**：想法类别的多样性
- **原创性**：响应的统计稀有性
- **阐述性**：想法的细节和发展

### 可观察的行为指标

#### 在创造性活动期间：
- **参与水平**：对讨论的自愿贡献
- **想法分享**：表达新颖想法的意愿
- **建构行为**：发展他人想法的倾向
- **恢复模式**：从挫折中反弹的速度

#### 要跟踪的前后指标：
- 自报的创造性身份陈述
- 承担创造性挑战的意愿
- 创造性冒险的频率
- 创造性协作的质量

### 引导师评估框架

通过以下方式跟踪进展：
- **入门调查**：基线创造性自信水平
- **会议观察**：随时间的行为变化
- **同伴反馈**：360度创造性自信评估
- **自我反思**：个人成长叙述和洞察`,
          type: 'content'
        },
        {
          id: 'building-individual-confidence',
          title: '3.5 建立个人创造性自信',
          content: `### 技巧1：微成功策略
通过小的、可实现的创造性胜利建立信心。

**实施方法：**
- 从低风险的创造性挑战开始
- 庆祝小的改进和洞察
- 通过作品集记录创造性成长
- 分享个人创造性故事和突破

### 技巧2：失败重新框架
将挫折转化为学习机会。

**重新框架技巧：**
- "这教会了我关于问题的什么？"
- "我如何能够建立在有效的基础上？"
- "下次我会尝试什么不同的方法？"
- "这次失败如何让我更接近解决方案？"

### 技巧3：创造性技能阶梯
系统性地发展创造能力。

**技能进展：**
1. **观察**：注意细节和模式
2. **问题生成**：提出更好的"如果"问题
3. **想法流畅性**：快速生成许多选项
4. **概念混合**：结合不同的想法
5. **快速原型制作**：快速使想法变得有形
6. **迭代掌握**：通过反馈循环改进

### 技巧4：个人创造性仪式
发展触发创造性自信的个人实践。

**仪式元素：**
- **环境**：特定的物理或数字空间
- **热身**：创造力启动活动
- **过程**：个人创造性工作流程
- **反思**：学习捕获和整合

### 技巧5：创造性身份发展
帮助个人将自己视为有创造力的人。

**身份建构活动：**
- 创造性优势评估和庆祝
- 个人创造性历史探索
- 创造性榜样识别
- 未来创造性自我可视化`,
          type: 'content'
        },
        {
          id: 'building-team-confidence',
          title: '3.6 建立团队创造性自信',
          content: `### 技巧1：心理安全基础
建立促进安全创造性冒险的基本规则和仪式。

**安全协议：**
- "没有想法太小或太大"
- "先建构想法再批评"
- "庆祝实验，不仅仅是成功"
- "每个人的视角都增加价值"

**环境设计：**
- 创建专门的创造性空间
- 使用可视化协作工具
- 提供多样化的材料和资源
- 为运动和活力而设计

### 技巧2：集体自信建构
使用团体反思来建立共享的创造性身份。

**团体自信仪式：**
- 每个人分享他们带给团队的一个创造性优势
- 团体识别集体创造性超能力
- 团队创造共享的创造性口号或肯定
- 建立团队创造性目标和承诺

### 技巧3：创造性学徒模式
将不同经验水平的参与者配对进行相互学习。

**学徒结构：**
- 有经验的创造者指导新手
- 新手为有经验的创造者带来新鲜视角
- 定期检查和学习反思
- 在更长程序中的角色轮换

### 技巧4：团队创造性挑战
通过协作解决问题建立信心。

**挑战框架：**
- 提出需要多样化技能的问题
- 鼓励角色灵活性和实验
- 庆祝团队创造性突破
- 反思协作创造性过程

### 技巧5：同伴放大系统
创建团队成员互相提升创造性自信的结构。

**放大方法：**
- 创造性优势发现和分享
- 想法建构和增强实践
- 创造性挑战的同伴指导
- 创造性方法的交叉授粉`,
          type: 'content'
        }
      ];
    } else {
      // English sections
      return [
        {
          id: 'opening-story',
          title: '3.0 Opening Story',
          content: `"I'm not a creative person."

When creative director Emma Chen asked her team who wanted to lead the brand redesign, half the room stared down at their notebooks. Emma began a simple exercise. Each person wrote down a problem they'd solved in the past week, no matter how small. Then they exchanged solutions, beginning feedback with "This was creative because..."

A week later, when she asked again who wanted to lead the project, twice as many hands went up. Creative confidence isn't magic—it's a state that grows through affirming feedback and small wins.`,
          type: 'content'
        },
        {
          id: 'what-is-creative-confidence',
          title: '3.1 What Is Creative Confidence?',
          content: `Creative confidence is not just feeling good about your ideas—it's a measurable psychological state that predicts creative performance.

Research shows that people with higher creative confidence:
- Generate more novel ideas in brainstorming sessions
- Persist longer when facing creative challenges
- Take more creative risks in their work
- Build more effectively on others' ideas
- Recover faster from creative setbacks

### Key Components

- **Self-efficacy**: Belief in one's ability to execute creative tasks
- **Growth mindset**: Understanding that creative ability can be developed
- **Tolerance for ambiguity**: Comfort with uncertainty and incomplete information
- **Intrinsic motivation**: Drive to create for personal fulfillment rather than external rewards

### The Creative Confidence Mindset

Creative confidence manifests as a specific mindset characterized by:
- **"I can learn to be more creative"** rather than "I'm either creative or I'm not"
- **"Failure teaches me"** rather than "Failure means I'm not creative"
- **"Different perspectives enrich solutions"** rather than "There's one right answer"
- **"Creativity is a process"** rather than "Creativity is inspiration"`,
          type: 'content'
        },
        {
          id: 'psychological-foundations',
          title: '3.2 Psychological Foundations',
          content: `Creative confidence is built on four psychological pillars that facilitators must understand and nurture:

### Pillar 1: Curiosity & Wonder
The drive to explore, question assumptions, and seek novel perspectives. Curiosity is the fuel for creative thinking.

**Facilitator Techniques:**
- Ask "What if...?" and "How might we...?" questions
- Encourage exploration of tangential ideas
- Create mystery and incomplete information scenarios
- Use provocative prompts and constraints

### Pillar 2: Tolerance for Ambiguity
Comfort with uncertainty, incomplete information, and multiple possible solutions. This is critical for creative exploration.

**Facilitator Techniques:**
- Present problems without clear solutions
- Encourage multiple interpretations of the same data
- Practice "Yes, and..." rather than "Yes, but..."
- Frame uncertainty as opportunity rather than threat

### Pillar 3: Growth Mindset
Understanding that creative abilities can be developed through effort, practice, and learning from failure.

**Facilitator Techniques:**
- Celebrate process over outcomes
- Share stories of creative development
- Normalize struggle and iteration
- Focus on learning rather than proving

### Pillar 4: Intrinsic Motivation
Creating for personal satisfaction, learning, and expression rather than external validation.

**Facilitator Techniques:**
- Connect challenges to personal values
- Encourage self-reflection on creative interests
- Minimize external pressure and comparison
- Create space for personal creative expression`,
          type: 'content'
        },
        {
          id: 'neuroscience-snapshots',
          title: '3.3 Neuroscience Snapshots',
          content: `Recent neuroscience research reveals that creativity involves dynamic switching between three brain networks:

### Executive Network
- **Function**: Controls attention, evaluates ideas, manages working memory
- **Creative Role**: Filters and refines ideas, maintains focus on goals
- **When Active**: Structured analytical tasks, evaluation phases

### Default Mode Network
- **Function**: Generates spontaneous ideas, connects unrelated concepts
- **Creative Role**: Source of novel associations and insights
- **When Active**: Relaxed states, mind-wandering, reflection

### Salience Network
- **Function**: Switches between networks, identifies relevant information
- **Creative Role**: Identifies promising ideas from default network activity
- **When Active**: Transition moments, "aha!" experiences

### Implications for Facilitators

**Design for Network Switching:**
- Alternate between focused work and relaxed reflection
- Include transition rituals between different types of activities
- Allow for individual reflection and group interaction
- Use movement and environmental changes to trigger network switching

### The Creative Brain in Action

Research shows that highly creative individuals excel at:
- **Cognitive flexibility**: Switching between different concepts and perspectives
- **Remote associations**: Connecting seemingly unrelated ideas
- **Openness to experience**: Seeking out novel experiences and ideas
- **Divergent thinking**: Generating multiple solutions to problems`,
          type: 'content'
        },
        {
          id: 'measuring-creative-confidence',
          title: '3.4 Measuring Creative Confidence',
          content: `Creative confidence can be measured and tracked through both formal assessments and observational indicators.

### Formal Measurement Tools

#### Creative Confidence Scale (CCS)
A validated psychological instrument measuring four dimensions:
- **Creative self-efficacy**: Confidence in creative abilities
- **Persistence in creativity**: Willingness to persist through challenges
- **Risk-taking in creativity**: Comfort with creative uncertainty
- **Social creativity**: Confidence in creative collaboration

#### Alternative Thinking Assessment (ATA)
Measures the ability to generate novel solutions:
- **Fluency**: Number of ideas generated
- **Flexibility**: Variety of categories of ideas
- **Originality**: Statistical rarity of responses
- **Elaboration**: Detail and development of ideas

### Observable Behavioral Indicators

#### During Creative Activities:
- **Participation level**: Voluntary contribution to discussions
- **Idea sharing**: Willingness to voice novel thoughts
- **Building behavior**: Tendency to develop others' ideas
- **Recovery patterns**: How quickly someone bounces back from setbacks

#### Pre/Post Indicators to Track:
- Self-reported creative identity statements
- Willingness to take on creative challenges
- Frequency of creative risk-taking
- Quality of creative collaboration

### Facilitator Assessment Framework

Track progress through:
- **Entry surveys**: Baseline creative confidence levels
- **Session observations**: Behavioral changes over time
- **Peer feedback**: 360-degree creative confidence assessment
- **Self-reflection**: Personal growth narratives and insights`,
          type: 'content'
        },
        {
          id: 'building-individual-confidence',
          title: '3.5 Building Creative Confidence — Individual Level',
          content: `### Technique 1: Micro-Successes Strategy
Build confidence through small, achievable creative wins.

**Implementation:**
- Start with low-stakes creative challenges
- Celebrate small improvements and insights
- Document creative growth through portfolios
- Share personal creative stories and breakthroughs

### Technique 2: Failure Reframing
Transform setbacks into learning opportunities.

**Reframing Techniques:**
- "What did this teach me about the problem?"
- "How can I build on what worked?"
- "What would I try differently next time?"
- "How does this failure move me closer to a solution?"

### Technique 3: Creative Skills Ladder
Systematically develop creative capabilities.

**Skill Progression:**
1. **Observation**: Notice details and patterns
2. **Question Generation**: Ask better "what if" questions
3. **Idea Fluency**: Generate many options quickly
4. **Conceptual Blending**: Combine disparate ideas
5. **Rapid Prototyping**: Make ideas tangible quickly
6. **Iteration Mastery**: Improve through feedback cycles

### Technique 4: Personal Creative Ritual
Develop individual practices that trigger creative confidence.

**Ritual Elements:**
- **Environment**: Specific physical or digital spaces
- **Warm-up**: Creativity priming activities
- **Process**: Personal creative workflow
- **Reflection**: Learning capture and integration

### Technique 5: Creative Identity Development
Help individuals see themselves as creative people.

**Identity Building Activities:**
- Creative strengths assessment and celebration
- Personal creative history exploration
- Creative role model identification
- Future creative self visualization`,
          type: 'content'
        },
        {
          id: 'building-team-confidence',
          title: '3.6 Building Creative Confidence — Team Level',
          content: `### Technique 1: Psychological Safety Foundation
Establish ground rules and rituals that promote safe creative risk-taking.

**Safety Protocols:**
- "No idea is too small or too large"
- "Build on ideas before criticizing"
- "Celebrate experiments, not just successes"
- "Every perspective adds value"

**Environmental Design:**
- Create dedicated creative spaces
- Use visual collaboration tools
- Provide diverse materials and resources
- Design for movement and energy

### Technique 2: Collective Confidence Building
Use group reflection to build shared creative identity.

**Group Confidence Ritual:**
- Each person shares one creative strength they bring to the team
- Group identifies collective creative superpowers
- Team creates shared creative motto or affirmation
- Establish team creative goals and commitments

### Technique 3: Creative Apprenticeship Model
Pair participants with different experience levels for mutual learning.

**Apprenticeship Structure:**
- Experienced creators guide novices
- Novices bring fresh perspective to experienced creators
- Regular check-ins and learning reflections
- Role rotation in longer programs

### Technique 4: Team Creative Challenges
Build confidence through collaborative problem-solving.

**Challenge Framework:**
- Present problems requiring diverse skills
- Encourage role flexibility and experimentation
- Celebrate team creative breakthroughs
- Reflect on collaborative creative process

### Technique 5: Peer Amplification System
Create structures for team members to boost each other's creative confidence.

**Amplification Methods:**
- Creative strengths spotting and sharing
- Idea building and enhancement practices
- Peer coaching for creative challenges
- Cross-pollination of creative approaches`,
          type: 'content'
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

  const progress = (moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100;

  // Dictionary text for UI elements
  const uiText = {
    moduleTitle: params.lang === 'zh' ? '创造性自信的科学' : 'The Science of Creative Confidence',
    chapter: params.lang === 'zh' ? '第' : 'Chapter',
    minutes: params.lang === 'zh' ? '分钟' : 'minutes',
    intermediate: params.lang === 'zh' ? '中级' : 'Intermediate',
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
                      {uiText.chapter} 3
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
                <span>60 {uiText.minutes}</span>
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
                      href={`/${params.lang}/modules/createx-mission`}
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

const CreativeConfidencePage = withModuleProgress(
  CreativeConfidenceComponent,
  'creative-confidence',
  7
);

export default CreativeConfidencePage;
