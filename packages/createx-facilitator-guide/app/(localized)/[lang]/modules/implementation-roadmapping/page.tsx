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

function ImplementationRoadmappingComponent({
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
      "id": "section-13-0",
      "title": "13.0 Why Implementation Matters",
      "type": "content",
      "content": "### The Innovation-Delivery Gap\n\n**The Challenge:**\n- Many great prototypes never reach real users\n- Workshop momentum dissipates without clear next steps\n- Innovation teams struggle to align with delivery teams\n- Resource allocation becomes unclear after initial validation\n\n**Implementation's Role:**\n- **Translates Prototypes**: From concept to working solution\n- **Aligns Resources**: People, budget, and infrastructure\n- **Clarifies Ownership**: Who does what, when, and how\n- **Plots Viable Path**: Shortest route to measurable impact\n\n### Success Metrics for Implementation\n\n**Process Metrics:**\n- Time from prototype to pilot launch\n- Stakeholder alignment scores\n- Resource utilization efficiency\n- Risk mitigation effectiveness\n\n**Outcome Metrics:**\n- User adoption rates\n- Value delivery against targets\n- Sustainability beyond pilot phase\n- Learning integration into next cycles"
    },
    {
      "id": "section-13-1",
      "title": "13.1 From Prototype to Pilot — Decision Matrix",
      "type": "content",
      "content": "### Decision Criteria Framework\n\n| **Criterion** | **Green Light** | **Yellow** | **Red Light** |\n|---------------|-----------------|------------|---------------|\n| **User Value** | SUS ≥ 75, NPS ≥ +30 | Mixed feedback | Clear rejection / low usage |\n| **Feasibility** | Tech ready in ≤ 4 weeks | Moderate refactor | Requires new platform |\n| **Strategic Fit** | Aligns with OKR | Adjacent | Off-strategy |\n| **Risk/Ethics** | No red flags | Mitigatable | High regulatory / bias risk |\n\n**Rule**: Must score green on User + Strategic, and ≤ one yellow elsewhere.\n\n### Decision Process\n\n**Step 1: Assess Each Criterion**\n- Gather evidence for each dimension\n- Use consistent scoring methodology\n- Document reasoning for scores\n- Involve diverse stakeholder perspectives\n\n**Step 2: Apply Decision Rule**\n- Must have green on User Value AND Strategic Fit\n- Maximum one yellow in remaining criteria\n- Any red flag requires addressing before proceeding\n- Clear escalation path for borderline cases\n\n**Step 3: Document Decision**\n- Record rationale for future reference\n- Set review dates for reassessment\n- Communicate decision to all stakeholders\n- Plan next steps based on outcome"
    },
    {
      "id": "section-13-2",
      "title": "13.2 Pilot Planning Canvas",
      "type": "content",
      "content": "### Canvas Framework\n\n| **Block** | **Prompt** |\n|-----------|------------|\n| **Pilot Objective** | Specific KPI (e.g., +15% task completion) |\n| **Scope & Features** | \"Must-have\" list; trim niceties |\n| **User Cohort** | Who, how many, recruitment method |\n| **Success Metrics** | Baseline, target, measurement tool |\n| **Timeline** | Kickoff → Week 1 alpha → Week 4 debrief |\n| **Resources** | People (FTE), budget, infra |\n| **Risks & Mitigations** | Top 3 blockers + action owner |\n\n**Template Link**: createx.us/toolkit/pilot-canvas\n\n### Canvas Completion Guidelines\n\n**Pilot Objective:**\n- SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)\n- Clear connection to business outcomes\n- Testable hypotheses about value creation\n- Alignment with organizational OKRs\n\n**Scope Definition:**\n- MVP feature set only\n- Clear boundaries on what's included/excluded\n- Prioritization based on user value\n- Technical feasibility considerations\n\n**User Cohort:**\n- Representative of target market\n- Manageable size for meaningful feedback\n- Accessible for research and testing\n- Motivated to participate in pilot"
    },
    {
      "id": "section-13-3",
      "title": "13.3 RACI for Cross‑Functional Delivery",
      "type": "content",
      "content": "### RACI Matrix Framework\n\n| **Role** | **Sample Stakeholder** | **Responsibility** |\n|----------|------------------------|-------------------|\n| **R - Responsible** | Product Owner | Drives day-to-day tasks |\n| **A - Accountable** | VP Innovation | Final decision authority |\n| **C - Consulted** | Legal, Data Privacy | Provide guidance |\n| **I - Informed** | Customer Success | Receive status updates |\n\n**Tip**: Map RACI onto a Gantt; surface overloads early.\n\n### RACI Implementation Best Practices\n\n**Clear Definitions:**\n- Only one Accountable per deliverable\n- Multiple Responsible parties with clear coordination\n- Consulted parties provide input when requested\n- Informed parties receive updates at agreed intervals\n\n**Regular Reviews:**\n- Weekly RACI check-ins during pilot\n- Adjust assignments based on workload\n- Escalate conflicts quickly\n- Document changes and rationale"
    },
    {
      "id": "section-13-4",
      "title": "13.4 OKRs & Key Results Cascade",
      "type": "content",
      "content": "### OKR Hierarchy Example\n\n| **Level** | **Objective** | **Key Results** |\n|-----------|---------------|------------------|\n| **Company** | \"Grow AI-assisted revenue streams.\" | KR1: +$2M ARR from AI products by Q4 |\n| **Team** | \"Launch remote onboarding kit pilot.\" | KR1: 200 paid seats, KR2: Churn < 3% |\n| **Individual** | \"Integrate sentiment analytics.\" | KR1: Deploy model with > 85% F1 by June |\n\n**AI Assist**: \"Suggest stretch but realistic KR values based on past cohort data.\"\n\n### OKR Best Practices\n\n**Setting Effective OKRs:**\n- Objectives are inspirational and qualitative\n- Key Results are measurable and time-bound\n- Ambitious but achievable (70% success rate target)\n- Clear ownership and accountability\n\n**Cascade Alignment:**\n- Individual KRs support team objectives\n- Team objectives support company goals\n- Regular check-ins on progress\n- Transparent sharing across organization"
    },
    {
      "id": "section-13-5",
      "title": "13.5 Road‑Map Formats",
      "type": "content",
      "content": "### Format Selection Guide\n\n| **Format** | **Best For** | **Pro** |\n|------------|--------------|---------|\n| **Now / Next / Later** | Fast-moving startups | Simplicity |\n| **Gantt + Swimlanes** | Enterprise compliance | Dependency clarity |\n| **Outcome-Based (OKR Board)** | Mission-driven NGOs | Focus on value vs. output |\n\n**Tooling**: BoardX Road-Map plugin auto-links tasks to BoardX, Jira, Trello.\n\n### Roadmap Development Process\n\n**Now (Current Sprint):**\n- Committed deliverables\n- Clear scope and requirements\n- Assigned resources and timeline\n- Regular progress tracking\n\n**Next (Following 2-3 Sprints):**\n- High-confidence priorities\n- Rough effort estimates\n- Dependencies identified\n- Flexibility for refinement\n\n**Later (Future Vision):**\n- Strategic themes and directions\n- Placeholder for emerging opportunities\n- Alignment with long-term goals\n- Regular reassessment and updating"
    },
    {
      "id": "section-13-6",
      "title": "13.6 Agile Delivery Rhythm",
      "type": "content",
      "content": "### Sprint Cadence\n\n| **Cadence** | **Activity** |\n|-------------|--------------|\n| **Weekly** | Sprint Plan → Build → Demo → Retro |\n| **Daily** | Stand-up: Blockers & next 24h goals |\n| **Mid-Sprint** | AI Assist: Code-gen pair programming, test-coverage bot |\n| **End-Sprint** | Demo: Show working increment to stakeholders |\n\n**Facilitator Role**: Coach product owner in backlog grooming; guard user value perspective.\n\n### Agile Implementation for Innovation\n\n**Sprint Planning:**\n- User story prioritization based on learning goals\n- Capacity planning with innovation time buffer\n- Risk assessment and mitigation planning\n- Clear definition of done criteria\n\n**Daily Standups:**\n- Focus on blockers and learning progress\n- Surface integration challenges early\n- Maintain momentum and alignment\n- Quick decision-making protocols\n\n**Sprint Reviews:**\n- Demo working software to real users\n- Gather feedback for next sprint planning\n- Celebrate progress and learning\n- Adjust course based on evidence"
    },
    {
      "id": "section-13-7",
      "title": "13.7 Change Management & Adoption",
      "type": "content",
      "content": "### Change Management Levers\n\n| **Lever** | **Tactic** |\n|-----------|------------|\n| **Communication** | Pilot launch email → live demo video → FAQ deck |\n| **Training** | Micro-tutorials (< 3 min videos), AI chat helper |\n| **Incentives** | Early-adopter badge, performance bonus tied to KR |\n| **Feedback Loops** | In-app NPS, weekly office hours, AI sentiment scraper |\n\n### Adoption Strategy Framework\n\n**Pre-Launch:**\n- Stakeholder alignment and buy-in\n- Communication strategy development\n- Training material preparation\n- Success metrics definition\n\n**Launch Phase:**\n- Phased rollout to minimize risk\n- Intensive support and training\n- Regular feedback collection\n- Rapid iteration based on user input\n\n**Post-Launch:**\n- Sustained support and improvement\n- Success story documentation and sharing\n- Expansion planning for broader adoption\n- Long-term sustainability planning"
    },
    {
      "id": "section-13-8",
      "title": "13.8 Risk Register & Contingency Matrix",
      "type": "content",
      "content": "### Risk Assessment Framework\n\n| **Risk** | **Probability** | **Impact** | **Owner** | **Mitigation** |\n|----------|----------------|------------|-----------|----------------|\n| **API Rate-Limit** | Med | High | Dev Lead | Implement cache / retries |\n| **Data Privacy Breach** | Low | Critical | DPO | Pen-test, encryption, consent flows |\n| **Adoption Apathy** | High | Med | Change Champ | Champions network, incentive push |\n\n**AI Prompt**: \"Generate top 10 comparable project risks in fintech pilots with mitigation ideas.\"\n\n### Risk Management Process\n\n**Risk Identification:**\n- Brainstorm sessions with diverse stakeholders\n- Historical project analysis\n- Expert consultation and review\n- Continuous monitoring and updating\n\n**Risk Assessment:**\n- Probability scoring (Low/Medium/High)\n- Impact evaluation (Low/Medium/High/Critical)\n- Risk prioritization matrix\n- Mitigation strategy development\n\n**Risk Monitoring:**\n- Regular risk register reviews\n- Early warning indicators\n- Escalation procedures\n- Contingency plan activation"
    },
    {
      "id": "section-13-9",
      "title": "13.9 Handoff & Sustainability",
      "type": "content",
      "content": "### Handoff Package Components\n\n1. **Documentation Pack** — Architecture diagram, setup scripts, design tokens\n2. **Runbook** — Daily ops tasks, escalation paths\n3. **KPI Dashboard** — Live metrics accessible to all stakeholders\n4. **Retrospective Report** — Lessons, ROI, next-phase recs\n5. **Governance Slot** — Assign product manager for post-pilot roadmap\n\n### Sustainability Planning\n\n**Technical Sustainability:**\n- Code quality and documentation standards\n- Automated testing and deployment\n- Monitoring and alerting systems\n- Maintenance and update procedures\n\n**Organizational Sustainability:**\n- Clear ownership and responsibility\n- Ongoing funding and resource allocation\n- Success metrics and review processes\n- Integration with existing systems"
    },
    {
      "id": "section-13-10",
      "title": "13.10 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| **Pitfall** | **Symptom** | **Fix** |\n|-------------|-------------|---------|\n| **\"Prototype = Final\" Assumption** | Skips hardening, scalability | Add tech-debt buffer in roadmap |\n| **Ownership Vacuum** | Tasks stall | RACI clarity + weekly review |\n| **Scope Creep** | Timeline slippage | MoSCoW or Now/Next/Later boards |\n| **KPI Drift** | Success re-defined | Freeze baseline metrics; update only via change-control |\n\n### Additional Implementation Pitfalls\n\n**Insufficient Technical Planning:**\n- **Problem**: Underestimating implementation complexity\n- **Solution**: Technical spike sprints and architecture reviews\n\n**Poor Stakeholder Alignment:**\n- **Problem**: Different expectations across teams\n- **Solution**: Regular stakeholder check-ins and transparent communication\n\n**Inadequate Change Management:**\n- **Problem**: User resistance and low adoption\n- **Solution**: Comprehensive change management strategy from day one"
    },
    {
      "id": "section-13-11",
      "title": "13.11 Key Takeaways",
      "type": "content",
      "content": "- **Move from learning artifact to live pilot** using Pilot Canvas + RACI + OKRs\n- **Visual road-maps and agile cadence** balance speed with governance\n- **Change management is as critical as code**—communicate, train, incentivize\n- **Maintain a risk register and sustainability plan** to ensure impact persists\n\n### Implementation Success Factors\n\n1. **Clear Decision Criteria**: Use structured frameworks for go/no-go decisions\n2. **Strong Project Management**: RACI, OKRs, and agile practices\n3. **Effective Change Management**: Communication, training, and incentives\n4. **Risk Management**: Proactive identification and mitigation\n5. **Sustainability Planning**: Long-term ownership and resource allocation"
    },
    {
      "id": "section-13-12",
      "title": "13.12 Field Notes & Further Reading",
      "type": "content",
      "content": "### Essential Resources\n- **Book**: \"Escaping the Build Trap\" (Melissa Perri)\n- **Paper**: McKinsey (2023) \"Bridging Innovation Delivery Gap in AI Products\"\n- **Toolkit**: createx.us/toolkit/implementation-suite (pilot canvas, RACI sheet, risk matrix)\n- **Podcast**: Product Ops Pulse — Ep. 18 \"OKRs in AI Startups\"\n\n### Community Practice\n- Share your pilot canvases in #implementation-planning\n- Contribute to the risk register template library\n- Join monthly implementation office hours\n- Document successful pilot-to-product transitions"
    },
    {
      "id": "section-13-13",
      "title": "13.13 Practical Application",
      "type": "content",
      "content": "### Implementation Planning Checklist\n\n**Pre-Implementation:**\n- [ ] Pilot Canvas completed & approved\n- [ ] RACI chart circulated and confirmed\n- [ ] OKRs logged in dashboard\n- [ ] Road-map published in BoardX\n- [ ] Risk register initialized and reviewed\n\n**During Implementation:**\n- [ ] Agile ceremonies established and running\n- [ ] Change management activities executed\n- [ ] Risk monitoring and mitigation active\n- [ ] Regular stakeholder communication maintained\n\n**Post-Implementation:**\n- [ ] Handoff package completed\n- [ ] Sustainability plan activated\n- [ ] Success metrics tracked and reported\n- [ ] Lessons learned documented and shared\n\n---\n\n### Facilitator Checklist\n\n- [ ] Pilot Canvas completed & approved\n- [ ] RACI chart circulated\n- [ ] OKRs logged in dashboard\n- [ ] Road-map published in BoardX\n- [ ] Risk register initialized\n- [ ] Change management strategy defined\n- [ ] Sustainability plan documented"
    }
  ];

  // Get sections based on language
  // Chinese sections data
  const chineseSections: Section[] = [
    {
      "id": "section-13-0",
      "title": "13.0 为什么实施很重要",
      "type": "content",
      "content": "### 创新与交付的差距\n\n**挑战：**\n- 许多优秀的原型从未到达真实用户手中\n- 工作坊的动力在没有明确下一步的情况下消散\n- 创新团队难以与交付团队保持一致\n- 初始验证后资源分配变得不明确\n\n**实施的作用：**\n- **转化原型**：从概念到可工作的解决方案\n- **对齐资源**：人员、预算和基础设施\n- **明确所有权**：谁在何时做什么以及如何做\n- **规划可行路径**：通往可衡量影响的最短路线\n\n### 实施的成功指标\n\n**过程指标：**\n- 从原型到试点启动的时间\n- 利益相关者对齐评分\n- 资源利用效率\n- 风险缓解有效性\n\n**结果指标：**\n- 用户采用率\n- 相对于目标的价值交付\n- 试点阶段之后的可持续性\n- 学习整合到下一个周期"
    },
    {
      "id": "section-13-1",
      "title": "13.1 从原型到试点——决策矩阵",
      "type": "content",
      "content": "### 决策标准框架\n\n| **标准** | **绿灯** | **黄色** | **红灯** |\n|---------------|-----------------|------------|---------------|\n| **用户价值** | SUS ≥ 75, NPS ≥ +30 | 混合反馈 | 明确拒绝/低使用率 |\n| **可行性** | 技术在≤4周内准备就绪 | 中等重构 | 需要新平台 |\n| **战略适配** | 与OKR对齐 | 相邻 | 偏离策略 |\n| **风险/道德** | 无红旗 | 可缓解 | 高监管/偏见风险 |\n\n**规则**：必须在用户+战略方面得绿分，其他地方最多一个黄色。\n\n### 决策过程\n\n**步骤1：评估每个标准**\n- 为每个维度收集证据\n- 使用一致的评分方法\n- 记录评分理由\n- 涉及多样化的利益相关者观点\n\n**步骤2：应用决策规则**\n- 必须在用户价值和战略适配上获得绿色\n- 其余标准中最多一个黄色\n- 任何红旗都需要在继续前解决\n- 边界情况的明确升级路径\n\n**步骤3：记录决策**\n- 记录理由供将来参考\n- 设定重新评估的审查日期\n- 向所有利益相关者传达决策\n- 根据结果规划下一步"
    },
    {
      "id": "section-13-2",
      "title": "13.2 试点规划画布",
      "type": "content",
      "content": "### 画布框架\n\n| **板块** | **提示** |\n|-----------|------------|\n| **试点目标** | 具体KPI（例如，任务完成率+15%） |\n| **范围和功能** | \"必须有\"列表；修剪不必要的功能 |\n| **用户群体** | 谁，多少人，招募方法 |\n| **成功指标** | 基线，目标，测量工具 |\n| **时间表** | 启动→第1周alpha→第4周汇报 |\n| **资源** | 人员（FTE），预算，基础设施 |\n| **风险和缓解** | 前3个阻碍因素+行动负责人 |\n\n**模板链接**：createx.us/toolkit/pilot-canvas\n\n### 画布完成指南\n\n**试点目标：**\n- SMART目标（具体、可衡量、可实现、相关、有时限）\n- 与业务结果的明确连接\n- 关于价值创造的可测试假设\n- 与组织OKR的对齐\n\n**范围定义：**\n- 仅MVP功能集\n- 包含/排除内容的明确边界\n- 基于用户价值的优先级\n- 技术可行性考虑\n\n**用户群体：**\n- 目标市场的代表\n- 可管理的规模以获得有意义的反馈\n- 可进行研究和测试\n- 有动力参与试点"
    },
    {
      "id": "section-13-3",
      "title": "13.3 跨职能交付的RACI",
      "type": "content",
      "content": "### RACI矩阵框架\n\n| **角色** | **示例利益相关者** | **责任** |\n|----------|------------------------|-------------------|\n| **R - 负责** | 产品负责人 | 推动日常任务 |\n| **A - 问责** | 创新副总裁 | 最终决策权威 |\n| **C - 咨询** | 法务、数据隐私 | 提供指导 |\n| **I - 告知** | 客户成功 | 接收状态更新 |\n\n**提示**：将RACI映射到甘特图上；提早发现过载。\n\n### RACI实施最佳实践\n\n**明确定义：**\n- 每个可交付成果只有一个问责方\n- 多个负责方有明确协调\n- 咨询方在请求时提供输入\n- 告知方在约定间隔接收更新\n\n**定期审查：**\n- 试点期间每周RACI检查\n- 根据工作负载调整分配\n- 快速升级冲突\n- 记录变更和理由"
    },
    {
      "id": "section-13-4",
      "title": "13.4 OKR和关键结果级联",
      "type": "content",
      "content": "### OKR层次示例\n\n| **级别** | **目标** | **关键结果** |\n|-----------|---------------|------------------|\n| **公司** | \"增长AI辅助收入流。\" | KR1：第四季度AI产品ARR增加200万美元 |\n| **团队** | \"启动远程入职套件试点。\" | KR1：200个付费席位，KR2：流失率<3% |\n| **个人** | \"集成情感分析。\" | KR1：6月前部署F1>85%的模型 |\n\n**AI助手**：\"根据过去群组数据建议有挑战性但现实的KR值。\"\n\n### OKR最佳实践\n\n**设定有效的OKR：**\n- 目标是鼓舞人心和定性的\n- 关键结果是可衡量和有时限的\n- 雄心勃勃但可实现（70%成功率目标）\n- 明确所有权和问责制\n\n**级联对齐：**\n- 个人KR支持团队目标\n- 团队目标支持公司目标\n- 定期检查进展\n- 跨组织透明分享"
    },
    {
      "id": "section-13-5",
      "title": "13.5 路线图格式",
      "type": "content",
      "content": "### 格式选择指南\n\n| **格式** | **最适合** | **优点** |\n|------------|--------------|---------|\n| **现在/下一个/以后** | 快速发展的初创公司 | 简单性 |\n| **甘特图+泳道** | 企业合规 | 依赖关系清晰 |\n| **基于结果（OKR板）** | 使命驱动的NGO | 专注于价值而非产出 |\n\n**工具**：BoardX路线图插件自动链接任务到BoardX、Jira、Trello。\n\n### 路线图开发过程\n\n**现在（当前冲刺）：**\n- 承诺的可交付成果\n- 明确的范围和要求\n- 分配的资源和时间表\n- 定期进度跟踪\n\n**下一个（接下来2-3个冲刺）：**\n- 高置信度优先级\n- 粗略的工作量估计\n- 已识别的依赖关系\n- 细化的灵活性\n\n**以后（未来愿景）：**\n- 战略主题和方向\n- 新兴机会的占位符\n- 与长期目标的对齐\n- 定期重新评估和更新"
    },
    {
      "id": "section-13-6",
      "title": "13.6 敏捷交付节奏",
      "type": "content",
      "content": "### 冲刺节奏\n\n| **节奏** | **活动** |\n|-------------|--------------|\n| **每周** | 冲刺计划→构建→演示→回顾 |\n| **每日** | 站会：阻碍因素和未来24小时目标 |\n| **冲刺中期** | AI助手：代码生成结对编程，测试覆盖机器人 |\n| **冲刺结束** | 演示：向利益相关者展示工作增量 |\n\n**引导师角色**：指导产品负责人进行待办事项梳理；保护用户价值视角。\n\n### 创新的敏捷实施\n\n**冲刺规划：**\n- 基于学习目标的用户故事优先级\n- 带有创新时间缓冲的容量规划\n- 风险评估和缓解规划\n- 明确的完成定义标准\n\n**每日站会：**\n- 专注于阻碍因素和学习进展\n- 提早发现集成挑战\n- 保持动力和对齐\n- 快速决策协议\n\n**冲刺评审：**\n- 向真实用户演示工作软件\n- 收集反馈用于下一次冲刺规划\n- 庆祝进展和学习\n- 基于证据调整路线"
    },
    {
      "id": "section-13-7",
      "title": "13.7 变革管理和采用",
      "type": "content",
      "content": "### 变革管理杠杆\n\n| **杠杆** | **策略** |\n|-----------|------------|\n| **沟通** | 试点启动邮件→实时演示视频→FAQ文档 |\n| **培训** | 微教程（<3分钟视频），AI聊天助手 |\n| **激励** | 早期采用者徽章，与KR相关的绩效奖金 |\n| **反馈循环** | 应用内NPS，每周办公时间，AI情感抓取器 |\n\n### 采用策略框架\n\n**预启动：**\n- 利益相关者对齐和支持\n- 沟通策略开发\n- 培训材料准备\n- 成功指标定义\n\n**启动阶段：**\n- 分阶段推出以最小化风险\n- 密集支持和培训\n- 定期反馈收集\n- 基于用户输入的快速迭代\n\n**启动后：**\n- 持续支持和改进\n- 成功故事记录和分享\n- 更广泛采用的扩展规划\n- 长期可持续性规划"
    },
    {
      "id": "section-13-8",
      "title": "13.8 风险登记册和应急矩阵",
      "type": "content",
      "content": "### 风险评估框架\n\n| **风险** | **概率** | **影响** | **负责人** | **缓解措施** |\n|----------|----------------|------------|-----------|----------------|\n| **API速率限制** | 中 | 高 | 开发负责人 | 实施缓存/重试 |\n| **数据隐私泄露** | 低 | 严重 | DPO | 渗透测试，加密，同意流程 |\n| **采用冷漠** | 高 | 中 | 变革冠军 | 冠军网络，激励推动 |\n\n**AI提示**：\"在金融科技试点中生成前10个可比项目风险和缓解想法。\"\n\n### 风险管理过程\n\n**风险识别：**\n- 与多样化利益相关者的头脑风暴会议\n- 历史项目分析\n- 专家咨询和审查\n- 持续监控和更新\n\n**风险评估：**\n- 概率评分（低/中/高）\n- 影响评估（低/中/高/严重）\n- 风险优先级矩阵\n- 缓解策略开发\n\n**风险监控：**\n- 定期风险登记册审查\n- 早期预警指标\n- 升级程序\n- 应急计划激活"
    },
    {
      "id": "section-13-9",
      "title": "13.9 交接和可持续性",
      "type": "content",
      "content": "### 交接清单\n\n**文档包：**\n- **架构图**：系统设计和数据流\n- **API文档**：端点、参数、示例\n- **用户指南**：功能说明和故障排除\n- **运营手册**：监控、部署、事件响应\n\n**知识转移：**\n- 系统演示和培训会议\n- 代码走查和注释说明\n- 关键决策的历史和理由\n- 已知问题和未来改进机会\n\n### 可持续性规划\n\n**运营准备：**\n- 监控和警报系统\n- 事件响应程序\n- 性能基准和SLA\n- 备份和灾难恢复计划\n\n**持续改进：**\n- 用户反馈循环\n- 性能指标跟踪\n- 功能增强路线图\n- 定期安全和合规审查"
    },
    {
      "id": "section-13-10",
      "title": "13.10 实施反思",
      "type": "interactive",
      "content": "### 个人实践反思\n\n1. **项目成功因素**：\n   - 在您最成功的实施中哪些因素发挥了关键作用？\n   - 如何将这些成功因素系统化以供未来项目使用？\n   - 哪些早期决策对后期成功产生了最大影响？\n\n2. **挑战和学习**：\n   - 您在实施阶段遇到的最大挑战是什么？\n   - 如何改进您的风险识别和缓解方法？\n   - 从失败或延误中学到了什么重要教训？\n\n3. **利益相关者管理**：\n   - 如何更好地使不同利益相关者保持一致？\n   - 什么沟通策略最有效？\n   - 如何平衡创新雄心与实际约束？\n\n### 组织能力建设\n\n1. **流程成熟度**：\n   - 您的组织在实施路线图方面有多成熟？\n   - 需要什么系统和工具来支持更好的实施？\n   - 如何在不同项目间标准化最佳实践？\n\n2. **团队发展**：\n   - 团队需要什么技能来更好地支持实施？\n   - 如何改善跨职能协作？\n   - 什么培训或指导会最有价值？\n\n---\n\n*下一章：第14章 - 敏捷与精益方法*"
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
    moduleTitle: '实施路线图',
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
    moduleTitle: 'Implementation & Roadmapping',
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
                      {uiText.chapter} 13
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
                      href={`/${params.lang}/modules/reflection-learning`}
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

const ImplementationRoadmappingPage = withModuleProgress(
  ImplementationRoadmappingComponent,
  'implementation-roadmapping',
  14
);

export default ImplementationRoadmappingPage;
