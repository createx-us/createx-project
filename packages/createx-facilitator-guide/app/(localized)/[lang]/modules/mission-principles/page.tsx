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

function MissionPrinciplesComponent({
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
      "id": "section-4-1",
      "title": "4.1 Mission Statement",
      "type": "content",
      "content": "**Our Mission:** To make creative problem-solving accessible to everyone, everywhere, by developing facilitators who can unlock human creative potential at scale.\n\n### Vision\nA world where creative confidence and collaborative problem-solving skills are as fundamental as literacy and numeracy.\n\n### Theory of Change\n- **Individual Level:** Build creative confidence and practical skills\n- **Community Level:** Develop local facilitation capacity\n- **Systems Level:** Influence education and organizational practices\n- **Global Level:** Create networks of creative problem-solvers"
    },
    {
      "id": "section-4-2",
      "title": "4.2 Core Principles",
      "type": "content",
      "content": "### 1. Creativity is Universal\n**Belief:** Every person has creative capacity that can be developed and expressed.\n\n**Implications:**\n- Design inclusive experiences for all backgrounds and abilities\n- Challenge stereotypes about who is \"naturally creative\"\n- Create multiple pathways for creative expression\n- Celebrate diverse forms of creativity and innovation\n\n**Facilitator Actions:**\n- Use examples from many cultures and domains\n- Provide choice in creative expression methods\n- Acknowledge and build on participants' existing creativity\n- Address barriers to creative confidence explicitly\n\n### 2. Learning Through Making\n**Belief:** Creative skills develop through hands-on practice and experimentation.\n\n**Implications:**\n- Prioritize active learning over passive consumption\n- Provide materials and time for prototyping\n- Design reflection into making experiences\n- Value process learning as much as outcome achievement\n\n**Facilitator Actions:**\n- Include making activities in every session\n- Provide diverse materials for different learning styles\n- Model experimentation and learning from failure\n- Create opportunities for peer learning through making\n\n### 3. Collaboration Multiplies Creativity\n**Belief:** Diverse perspectives and collective intelligence enhance creative outcomes.\n\n**Implications:**\n- Design for meaningful collaboration, not just cooperation\n- Build psychological safety for idea sharing\n- Create structures for building on others' ideas\n- Address power dynamics that inhibit participation\n\n**Facilitator Actions:**\n- Use \"Yes, and...\" protocols consistently\n- Rotate leadership roles within activities\n- Facilitate equitable participation\n- Celebrate collective achievements\n\n### 4. Real Challenges Drive Learning\n**Belief:** Participants learn best when working on problems that matter to them.\n\n**Implications:**\n- Connect activities to participants' lived experiences\n- Address actual community or organizational challenges\n- Make learning immediately applicable\n- Balance skill building with problem solving\n\n**Facilitator Actions:**\n- Understand participants' contexts and challenges\n- Adapt examples and cases to local relevance\n- Provide opportunities to work on real projects\n- Connect learning to participants' goals and aspirations\n\n### 5. Process Matters as Much as Product\n**Belief:** How we create together shapes what we create together.\n\n**Implications:**\n- Pay attention to group dynamics and inclusion\n- Design processes that reflect values of respect and equity\n- Model the creative behaviors we want to develop\n- Create learning communities, not just learning events\n\n**Facilitator Actions:**\n- Establish and maintain inclusive ground rules\n- Address problematic dynamics constructively\n- Share facilitation power when appropriate\n- Build relationships alongside skills"
    },
    {
      "id": "section-4-3",
      "title": "4.3 Facilitation Philosophy",
      "type": "content",
      "content": "### Human-Centered Design for Learning\n\nCreateX applies human-centered design principles to the learning experience itself:\n\n#### Empathize with Learners\n- Understand participants' backgrounds, motivations, and constraints\n- Design for emotional as well as cognitive engagement\n- Recognize and address barriers to participation\n- Adapt to different learning styles and preferences\n\n#### Define Learning Objectives Clearly\n- Articulate specific, measurable learning outcomes\n- Connect learning to participants' goals and contexts\n- Communicate expectations transparently\n- Design assessments aligned with objectives\n\n#### Ideate Learning Experiences\n- Generate multiple approaches to achieve learning objectives\n- Consider various modalities and interaction patterns\n- Design for surprise, delight, and memorable moments\n- Balance challenge with support\n\n#### Prototype and Test Learning Designs\n- Pilot activities with small groups before full implementation\n- Gather feedback on learning experience quality\n- Iterate based on participant responses and outcomes\n- Document what works for future application\n\n### Adult Learning Principles\n\nCreateX facilitation incorporates research-based adult learning principles:\n\n#### Self-Direction\n- Provide choices in learning pathways and activities\n- Encourage participants to set personal learning goals\n- Support autonomous exploration and discovery\n- Respect participants' expertise and experience\n\n#### Experience-Based Learning\n- Build on participants' existing knowledge and skills\n- Use experience as a source of learning for everyone\n- Create opportunities to practice in realistic contexts\n- Encourage reflection on experience to extract learning\n\n#### Problem-Centered Approach\n- Organize learning around problems rather than subjects\n- Make learning immediately applicable\n- Use real challenges as learning vehicles\n- Connect new skills to existing responsibilities\n\n#### Intrinsic Motivation\n- Help participants understand personal benefits of learning\n- Create experiences of competence and autonomy\n- Foster social connection and belonging\n- Design for enjoyment and satisfaction in learning"
    },
    {
      "id": "section-4-4",
      "title": "4.4 Quality Indicators",
      "type": "content",
      "content": "### Excellence in Creative Facilitation\n\n#### Session-Level Indicators\n\n**Engagement:**\n- High participation rates throughout session\n- Diverse voices contributing to discussions\n- Sustained energy and attention\n- Minimal off-task behavior\n\n**Learning:**\n- Visible skill development during session\n- Increased complexity in participant work over time\n- Evidence of insight and \"aha\" moments\n- Transfer of learning between activities\n\n**Creative Output:**\n- Quantity and diversity of ideas generated\n- Building and improvement on initial concepts\n- Integration of different perspectives\n- Novel solutions to presented challenges\n\n**Collaboration:**\n- Effective teamwork and communication\n- Respectful handling of disagreement\n- Shared ownership of group outcomes\n- Mutual support and encouragement\n\n#### Program-Level Indicators\n\n**Retention and Engagement:**\n- Consistent attendance across sessions\n- Active participation in optional activities\n- Positive word-of-mouth and referrals\n- Request for additional learning opportunities\n\n**Application:**\n- Use of learned methods in participants' work/life\n- Implementation of solutions developed during program\n- Teaching of methods to others\n- Integration into organizational practices\n\n**Confidence and Identity:**\n- Increased self-identification as creative person\n- Willingness to take creative risks\n- Seeking out creative challenges\n- Leadership in creative initiatives\n\n**Community Building:**\n- Ongoing collaboration beyond formal program\n- Peer mentoring and support relationships\n- Network formation and knowledge sharing\n- Collective action on shared challenges"
    },
    {
      "id": "section-4-5",
      "title": "4.5 Equity and Inclusion",
      "type": "content",
      "content": "### Designing for All\n\nCreateX is committed to creating learning experiences that are accessible and welcoming to all participants:\n\n#### Universal Design for Learning\n- Multiple means of representation (visual, auditory, kinesthetic)\n- Multiple means of engagement (choice, relevance, challenge level)\n- Multiple means of expression (verbal, visual, physical, digital)\n- Flexible pacing and pathways through content\n\n#### Cultural Responsiveness\n- Acknowledge and celebrate diverse cultural perspectives on creativity\n- Adapt methods to local cultural contexts and values\n- Include examples and case studies from many cultures\n- Address cultural barriers to participation\n\n#### Economic Accessibility\n- Minimize financial barriers to participation\n- Provide materials and resources needed for full participation\n- Offer programs in accessible locations and times\n- Create pathways for economic benefit from creative skills\n\n#### Addressing Systemic Barriers\n- Recognize how oppression affects creative confidence and expression\n- Design processes that counteract bias and discrimination\n- Create brave spaces for discussing difficult topics\n- Support participants in challenging inequitable systems\n\n### Facilitator Development for Equity\n\n#### Self-Awareness\n- Examine personal biases and privileges\n- Understand how identity affects facilitation style\n- Develop cultural humility and learning orientation\n- Commit to ongoing growth and accountability\n\n#### Skill Building\n- Learn inclusive facilitation techniques\n- Develop conflict resolution and mediation skills\n- Practice creating psychological safety across difference\n- Build competence in addressing microaggressions and bias\n\n#### Systemic Analysis\n- Understand how systems of oppression affect creativity and innovation\n- Recognize institutional barriers to creative participation\n- Develop analysis of power dynamics in creative collaboration\n- Learn strategies for systemic change through creative practice"
    },
    {
      "id": "section-4-6",
      "title": "4.6 Sustainability and Impact",
      "type": "content",
      "content": "### Environmental Sustainability\n- Minimize material waste in creative activities\n- Use recyclable and biodegradable materials when possible\n- Consider environmental impact in program design\n- Model sustainable practices in operations\n\n### Economic Sustainability\n- Develop sustainable funding models for programs\n- Create pathways for participants to earn income from creative skills\n- Support local economies through creative initiatives\n- Build organizational capacity for long-term impact\n\n### Social Sustainability\n- Build local capacity for ongoing program delivery\n- Create leadership pathways for program participants\n- Develop partnerships with community organizations\n- Design for long-term community ownership"
    },
    {
      "id": "section-4-7",
      "title": "4.7 Continuous Improvement",
      "type": "content",
      "content": "### Learning Organization Principles\n\nCreateX operates as a learning organization committed to continuous improvement:\n\n#### Data-Driven Decision Making\n- Collect systematic feedback from participants and facilitators\n- Track outcomes and impact over time\n- Use data to refine methods and approaches\n- Share learning transparently with broader community\n\n#### Experimentation and Innovation\n- Encourage facilitators to try new approaches\n- Create safe-to-fail experiments for testing innovations\n- Document and share what works and what doesn't\n- Build innovation capacity throughout organization\n\n#### Knowledge Management\n- Capture and codify effective practices\n- Create systems for sharing knowledge across programs\n- Develop resources and tools for continuous learning\n- Build communities of practice among facilitators\n\n#### External Learning\n- Engage with research community studying creativity and learning\n- Participate in broader conversations about education innovation\n- Learn from other organizations doing similar work\n- Contribute to field knowledge through research and evaluation"
    },
    {
      "id": "section-4-8",
      "title": "4.8 Key Takeaways",
      "type": "content",
      "content": "### For Facilitators\n- CreateX principles should guide all facilitation decisions\n- Quality indicators help assess and improve facilitation practice\n- Equity and inclusion require intentional design and ongoing attention\n- Continuous learning and improvement are professional responsibilities\n\n### For Participants\n- CreateX programs reflect specific values and commitments\n- Your learning experience is designed with care and intention\n- Your feedback helps improve programs for future participants\n- You are part of a global community working toward similar goals\n\n### For Organizations\n- CreateX programs can advance organizational goals around innovation and collaboration\n- Implementation requires commitment to underlying values and principles\n- Success depends on environmental and cultural factors beyond program design\n- Long-term impact requires ongoing support and integration"
    },
    {
      "id": "section-4-9",
      "title": "4.9 Reflection Questions",
      "type": "interactive",
      "content": "### For Personal Practice\n1. How do CreateX principles align with your own values and beliefs?\n2. Which quality indicators are strongest/weakest in your current facilitation?\n3. What barriers to creativity exist in your context, and how might you address them?\n4. How can you continue learning and improving as a facilitator?\n\n### For Program Design\n1. How well do your programs reflect CreateX principles?\n2. What evidence do you have that participants are achieving learning objectives?\n3. How inclusive and accessible are your programs?\n4. What systems support continuous improvement in your work?\n\n### For Organizational Integration\n1. How do organizational policies and practices support or hinder creative development?\n2. What changes would make your organization more aligned with CreateX principles?\n3. How can creative confidence and collaboration be rewarded and recognized?\n4. What role can creative facilitation play in organizational change?\n\n---\n\n*Next: Chapter 5 - Workshop Design Principles*"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-4-1",
      "title": "4.1 使命宣言",
      "type": "content",
      "content": "**我们的使命：** 通过培养能够大规模释放人类创造潜力的引导师，让创造性问题解决对每个人、在任何地方都触手可及。\n\n### 愿景\n一个创造性自信和协作问题解决技能像读写和计算一样基础的世界。\n\n### 变革理论\n- **个人层面：** 建立创造自信和实用技能\n- **社区层面：** 培养本地引导能力\n- **系统层面：** 影响教育和组织实践\n- **全球层面：** 创建创造性问题解决者网络"
    },
    {
      "id": "section-4-2",
      "title": "4.2 核心原则",
      "type": "content",
      "content": "### 1. 创造力是普遍的\n**信念：** 每个人都有可以发展和表达的创造能力。\n\n**含义：**\n- 为所有背景和能力设计包容性体验\n- 挑战关于谁\\\"天生有创造力\\\"的刻板印象\n- 为创造性表达创造多条路径\n- 庆祝多样化的创造力和创新形式\n\n**引导师行动：**\n- 使用来自多种文化和领域的例子\n- 在创造性表达方法上提供选择\n- 承认并建立在参与者现有创造力之上\n- 明确解决创造自信的障碍\n\n### 2. 通过制作学习\n**信念：** 创造性技能通过实践和实验发展。\n\n**含义：**\n- 优先考虑主动学习而非被动消费\n- 为原型制作提供材料和时间\n- 将反思设计到制作体验中\n- 重视过程学习如同结果成就\n\n**引导师行动：**\n- 在每次会议中包含制作活动\n- 为不同学习风格提供多样化材料\n- 示范实验和从失败中学习\n- 创造通过制作进行同伴学习的机会\n\n### 3. 协作倍增创造力\n**信念：** 多样化的视角和集体智慧增强创造性结果。\n\n**含义：**\n- 设计有意义的协作，而非仅仅合作\n- 建立想法分享的心理安全\n- 创造建立在他人想法基础上的结构\n- 解决抑制参与的权力动态\n\n**引导师行动：**\n- 持续使用\\\"是的，而且...\\\"协议\n- 在活动中轮换领导角色\n- 促进公平参与\n- 庆祝集体成就\n\n### 4. 真实挑战驱动学习\n**信念：** 参与者在解决对他们重要的问题时学得最好。\n\n**含义：**\n- 将活动与参与者的生活经验联系起来\n- 解决实际的社区或组织挑战\n- 让学习立即适用\n- 平衡技能建设与问题解决\n\n**引导师行动：**\n- 了解参与者的背景和挑战\n- 将例子和案例适应本地相关性\n- 提供在真实项目上工作的机会\n- 将学习与参与者的目标和愿望联系起来\n\n### 5. 过程与产品同样重要\n**信念：** 我们如何一起创造塑造了我们一起创造什么。\n\n**含义：**\n- 关注群体动态和包容性\n- 设计反映尊重和公平价值观的过程\n- 示范我们想要发展的创造性行为\n- 创建学习社区，而不仅仅是学习活动\n\n**引导师行动：**\n- 建立和维护包容性基本规则\n- 建设性地解决有问题的动态\n- 适当时分享引导权力\n- 在建立技能的同时建立关系"
    },
    {
      "id": "section-4-3",
      "title": "4.3 引导哲学",
      "type": "content",
      "content": "### 学习的以人为中心设计\n\nCreateX将以人为中心的设计原则应用于学习体验本身：\n\n#### 与学习者共情\n- 了解参与者的背景、动机和约束\n- 为情感和认知参与设计\n- 识别和解决参与障碍\n- 适应不同的学习风格和偏好\n\n#### 明确定义学习目标\n- 阐述具体、可测量的学习成果\n- 将学习与参与者的目标和背景联系起来\n- 透明地传达期望\n- 设计与目标一致的评估\n\n#### 构思学习体验\n- 生成实现学习目标的多种方法\n- 考虑各种模式和互动模式\n- 为惊喜、愉悦和难忘时刻设计\n- 平衡挑战与支持\n\n#### 原型和测试学习设计\n- 在全面实施前与小组试点活动\n- 收集学习体验质量反馈\n- 基于参与者回应和结果迭代\n- 记录有效做法以供未来应用\n\n### 成人学习原则\n\nCreateX引导融合了基于研究的成人学习原则：\n\n#### 自主导向\n- 在学习路径和活动中提供选择\n- 鼓励参与者设定个人学习目标\n- 支持自主探索和发现\n- 尊重参与者的专业知识和经验\n\n#### 基于经验的学习\n- 建立在参与者现有知识和技能之上\n- 将经验用作每个人的学习源泉\n- 创造在现实背景中练习的机会\n- 鼓励对经验的反思以提取学习\n\n#### 以问题为中心的方法\n- 围绕问题而非学科组织学习\n- 让学习立即适用\n- 使用真实挑战作为学习载体\n- 将新技能与现有责任联系起来\n\n#### 内在动机\n- 帮助参与者理解学习的个人益处\n- 创造能力和自主性的体验\n- 促进社会联系和归属感\n- 为学习中的享受和满足感设计"
    },
    {
      "id": "section-4-4",
      "title": "4.4 质量指标",
      "type": "content",
      "content": "### 创造性引导中的卓越\n\n#### 会议层面指标\n\n**参与度：**\n- 整个会议期间的高参与率\n- 多样化的声音为讨论做贡献\n- 持续的精力和注意力\n- 最少的偏离任务行为\n\n**学习：**\n- 会议期间可见的技能发展\n- 参与者工作随时间复杂性增加\n- 洞察和\\\"啊哈\\\"时刻的证据\n- 活动间学习的转移\n\n**创造性产出：**\n- 生成想法的数量和多样性\n- 在初始概念基础上的建设和改进\n- 不同视角的整合\n- 对呈现挑战的新颖解决方案\n\n**协作：**\n- 有效的团队合作和沟通\n- 对分歧的尊重处理\n- 对群体结果的共同所有权\n- 相互支持和鼓励\n\n#### 项目层面指标\n\n**保留和参与：**\n- 跨会议的一致出席\n- 对可选活动的积极参与\n- 积极的口碑和推荐\n- 要求额外学习机会\n\n**应用：**\n- 在参与者工作/生活中使用学到的方法\n- 实施项目期间开发的解决方案\n- 向他人教授方法\n- 整合到组织实践中\n\n**信心和身份：**\n- 增强作为创造性人员的自我认同\n- 愿意承担创造性风险\n- 寻求创造性挑战\n- 在创造性举措中的领导\n\n**社区建设：**\n- 正式项目之外的持续协作\n- 同伴指导和支持关系\n- 网络形成和知识分享\n- 对共同挑战的集体行动"
    },
    {
      "id": "section-4-5",
      "title": "4.5 公平与包容",
      "type": "content",
      "content": "### 为所有人设计\n\nCreateX致力于创造对所有参与者都可及和欢迎的学习体验：\n\n#### 学习的通用设计\n- 多种表现手段（视觉、听觉、动觉）\n- 多种参与手段（选择、相关性、挑战水平）\n- 多种表达手段（口头、视觉、身体、数字）\n- 灵活的节奏和通过内容的路径\n\n#### 文化响应性\n- 承认和庆祝关于创造力的多样化文化视角\n- 将方法适应本地文化背景和价值观\n- 包含来自多种文化的例子和案例研究\n- 解决参与的文化障碍\n\n#### 经济可及性\n- 最小化参与的财务障碍\n- 提供完全参与所需的材料和资源\n- 在可及的地点和时间提供项目\n- 为从创造性技能中获得经济利益创造路径\n\n#### 解决系统性障碍\n- 认识压迫如何影响创造自信和表达\n- 设计对抗偏见和歧视的过程\n- 为讨论困难话题创造勇敢空间\n- 支持参与者挑战不公平系统\n\n### 公平引导师发展\n\n#### 自我意识\n- 审视个人偏见和特权\n- 了解身份如何影响引导风格\n- 发展文化谦逊和学习导向\n- 承诺持续成长和问责\n\n#### 技能建设\n- 学习包容性引导技术\n- 发展冲突解决和调解技能\n- 练习在差异中创造心理安全\n- 建立解决微攻击和偏见的能力\n\n#### 系统分析\n- 了解压迫系统如何影响创造力和创新\n- 认识创造性参与的制度障碍\n- 发展对创造性协作中权力动态的分析\n- 学习通过创造性实践进行系统变革的策略"
    },
    {
      "id": "section-4-6",
      "title": "4.6 可持续性与影响",
      "type": "content",
      "content": "### 环境可持续性\n- 在创造性活动中最小化材料浪费\n- 尽可能使用可回收和可生物降解材料\n- 在项目设计中考虑环境影响\n- 在运营中示范可持续实践\n\n### 经济可持续性\n- 为项目开发可持续资金模式\n- 为参与者从创造性技能中赚取收入创造路径\n- 通过创造性举措支持当地经济\n- 建设长期影响的组织能力\n\n### 社会可持续性\n- 建设持续项目交付的本地能力\n- 为项目参与者创造领导路径\n- 与社区组织发展伙伴关系\n- 为长期社区所有权设计"
    },
    {
      "id": "section-4-7",
      "title": "4.7 持续改进",
      "type": "content",
      "content": "### 学习型组织原则\n\nCreateX作为一个致力于持续改进的学习型组织运营：\n\n#### 数据驱动决策制定\n- 从参与者和引导师收集系统性反馈\n- 跟踪随时间的结果和影响\n- 使用数据完善方法和途径\n- 与更广泛社区透明分享学习\n\n#### 实验和创新\n- 鼓励引导师尝试新方法\n- 为测试创新创造安全失败实验\n- 记录和分享有效和无效的做法\n- 在整个组织中建设创新能力\n\n#### 知识管理\n- 捕获和编码有效实践\n- 创建跨项目分享知识的系统\n- 为持续学习开发资源和工具\n- 在引导师中建设实践社区\n\n#### 外部学习\n- 与研究创造力和学习的研究社区互动\n- 参与关于教育创新的更广泛对话\n- 从做类似工作的其他组织学习\n- 通过研究和评估为领域知识做贡献"
    },
    {
      "id": "section-4-8",
      "title": "4.8 关键要点",
      "type": "content",
      "content": "### 对引导师\n- CreateX原则应指导所有引导决策\n- 质量指标帮助评估和改进引导实践\n- 公平和包容需要有意设计和持续关注\n- 持续学习和改进是专业责任\n\n### 对参与者\n- CreateX项目反映特定价值观和承诺\n- 您的学习体验是精心设计的\n- 您的反馈帮助改进未来参与者的项目\n- 您是致力于相似目标的全球社区的一部分\n\n### 对组织\n- CreateX项目可以推进组织在创新和协作方面的目标\n- 实施需要对基本价值观和原则的承诺\n- 成功取决于项目设计之外的环境和文化因素\n- 长期影响需要持续支持和整合"
    },
    {
      "id": "section-4-9",
      "title": "4.9 反思问题",
      "type": "interactive",
      "content": "### 对个人实践\n1. CreateX原则如何与您自己的价值观和信念对齐？\n2. 在您当前的引导中，哪些质量指标最强/最弱？\n3. 在您的背景中存在哪些创造力障碍，您如何解决它们？\n4. 您如何继续学习和改进作为引导师？\n\n### 对项目设计\n1. 您的项目如何很好地反映CreateX原则？\n2. 您有什么证据表明参与者正在实现学习目标？\n3. 您的项目有多包容和可及？\n4. 什么系统支持您工作中的持续改进？\n\n### 对组织整合\n1. 组织政策和实践如何支持或阻碍创造性发展？\n2. 什么变化会使您的组织更符合CreateX原则？\n3. 如何奖励和认可创造自信和协作？\n4. 创造性引导在组织变革中可以发挥什么作用？\n\n---\n\n*下一章：第5章 - 工作坊设计原则*"
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
    moduleTitle: 'CreateX 使命与原则',
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
    moduleTitle: 'CreateX Mission & Principles',
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
              <span>35 minutes</span>
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
  </div>    );
}

const MissionPrinciplesPage = withModuleProgress(
  MissionPrinciplesComponent,
  'mission-principles',
  9
);

export default MissionPrinciplesPage;
