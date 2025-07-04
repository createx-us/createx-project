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

function TestingFeedbackComponent({
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
      "id": "section-12-0",
      "title": "12.0 Why Testing?",
      "type": "content",
      "content": "### The Truth-Revealing Function\n\n**What Testing Accomplishes:**\n- **Reveals Hidden Assumptions**: Surfaces gaps between designer intent and user reality\n- **Validates Desirability**: Tests whether users actually want the proposed solution\n- **Confirms Usability**: Ensures users can successfully complete intended tasks\n- **Measures Viability**: Assesses whether the solution delivers target outcomes\n\n### The Cost of Skipping Tests\n\n**Risks of Not Testing:**\n- Scaling defects across entire user base\n- Wasting development resources on unwanted features\n- Eroding stakeholder trust through failed launches\n- Missing critical usability issues until after deployment\n\n### CreateX Testing Philosophy\n\n**Lean + High-Signal:**\n- Small sample sizes with high-quality insights\n- AI-accelerated analysis without losing human nuance\n- Rapid cycles over perfect protocols\n- Actionable feedback that drives immediate iteration"
    },
    {
      "id": "section-12-1",
      "title": "12.1 Think‑Aloud Usability Test",
      "type": "content",
      "content": "### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Surface friction points by hearing users verbalize thoughts while performing tasks. |\n| **When to Use** | First pass on any clickable or paper prototype. |\n| **Step-by-Step** | 1) Recruit representative user (N = 5 covers ~85% issues). 2) Explain \"think aloud\" rule. 3) Give task one at a time. 4) Observe; take structured notes. 5) Debrief user. |\n| **Remote Tips** | Use BoardX split-view: prototype on left, live transcript on right. |\n| **AI Prompt Ideas** | \"Highlight hesitations (> 2s pause) and summarize in a table with timestamp & screen ID.\" |\n| **Pitfalls** | Coaching the user; write task cards & stay silent. |\n| **Template** | createx.us/toolkit/think-aloud-script |\n\n### Think-Aloud Process (45 minutes)\n\n**Setup (5 minutes):**\n- Brief participant on think-aloud protocol\n- Set recording permissions and start tools\n- Remind about no \"right\" answers\n- Position observer to avoid interfering\n\n**Task Execution (30 minutes):**\n- Present one task at a time on cards\n- Stay silent during task performance\n- Take structured notes on behavior\n- Mark timestamps for key moments\n\n**Debrief (10 minutes):**\n- Ask about confusing moments\n- Explore emotional reactions\n- Understand mental models\n- Gather improvement suggestions\n\n### Observation Framework\n\n**What to Track:**\n- **Verbal**: Confusion statements, confidence indicators\n- **Behavioral**: Hesitations, backtracking, errors\n- **Emotional**: Frustration, delight, surprise reactions\n- **Task Success**: Completion rate, time to complete\n\n**Note-Taking Template:**\n```\nTime | Screen | Action | Verbalization | Observer Notes\n-----|--------|--------|---------------|---------------\n1:23 | Login  | Pause  | \"Where's...\"  | Looking for obvious button\n```"
    },
    {
      "id": "section-12-2",
      "title": "12.2 Heuristic Review (10 Usability Heuristics)",
      "type": "content",
      "content": "### Nielsen's 10 Heuristics Quick Reference\n\n| **Nielsen Heuristic** | **Guiding Question** |\n|----------------------|----------------------|\n| **Visibility of System Status** | Is feedback immediate & clear? |\n| **Match Between System & Real World** | Uses familiar language/icons? |\n| **User Control & Freedom** | Easy undo/redo? |\n| **Consistency & Standards** | Follows platform conventions? |\n| **Error Prevention** | Prevents mistakes before they happen? |\n| **Recognition > Recall** | Makes objects/actions visible? |\n| **Flexibility & Efficiency** | Shortcuts for expert users? |\n| **Aesthetic & Minimalist Design** | No irrelevant information? |\n| **Help Users with Errors** | Clear error messages with solutions? |\n| **Help & Documentation** | Context-sensitive help available? |\n\n### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Expert audit to catch foundational usability issues before user testing. |\n| **When to Use** | After first interactive prototype; pre-development. |\n| **Process** | 2-3 reviewers score each screen 0-4 severity; aggregate heat-map. |\n| **AI Assist** | Computer-vision checker flags low-contrast text, tiny targets. |\n| **Pitfalls** | Over-reliance on heuristics; still run live user tests. |\n| **Template** | createx.us/toolkit/heuristic-scorecard |\n\n### Severity Rating Scale\n\n**0 - No Problem**: No usability issue\n**1 - Cosmetic**: Minor issue, fix if time permits\n**2 - Minor**: Low priority usability problem\n**3 - Major**: Important to fix, high priority\n**4 - Catastrophic**: Must fix before release\n\n### Heuristic Review Process (90 minutes)\n\n**Individual Review (60 min):**\n- Each reviewer independently evaluates interface\n- Score every screen against all 10 heuristics\n- Document specific violations with screenshots\n- Note severity ratings for each issue\n\n**Aggregation Session (30 min):**\n- Combine individual findings\n- Discuss disagreements on severity\n- Create consolidated priority list\n- Plan fixes for high-severity issues"
    },
    {
      "id": "section-12-3",
      "title": "12.3 Remote Un‑Moderated Test Platforms",
      "type": "content",
      "content": "### Platform Comparison\n\n| **Platform** | **Strength** | **Watch-out** |\n|--------------|--------------|---------------|\n| **Maze / UsabilityHub** | Fast, quantitative path metrics | Limited qualitative depth |\n| **PlaybookUX** | AI transcripts + sentiment | Must pre-script tasks tightly |\n| **Custom BoardX Flow** | Full integration with CreateX canvas | Manual recruit required |\n\n**AI Prompt Ideas**: \"Analyze click-map heat to find abandonment points; output CSV with step # & drop-off %.\"\n\n### When to Use Remote Testing\n\n**Best For:**\n- Large sample sizes (N > 20)\n- Quantitative metrics needed\n- Geographically distributed users\n- First-time user experiences\n\n**Not Ideal For:**\n- Complex task flows requiring guidance\n- Emotional response understanding\n- Detailed behavior observation\n- Prototype debugging sessions"
    },
    {
      "id": "section-12-4",
      "title": "12.4 A/B & Multivariate \"Fake Door\" Tests",
      "type": "content",
      "content": "### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Validate desirability or pricing by measuring click intent on concept variants. |\n| **When to Use** | After a WoZ shows promise; before building full feature. |\n| **Implementation** | Landing page or in-app banner → logs click; then \"Coming Soon\" message + survey. |\n| **AI Prompt Ideas** | \"Predict sample size needed for 95% confidence given baseline 8% click-through.\" |\n| **Pitfalls** | User frustration—provide opt-in wait-list to soften. |\n| **Template** | createx.us/toolkit/fake-door-plan |\n\n### Fake Door Implementation\n\n**Setup Process:**\n1. Create variant landing pages/buttons\n2. Set up analytics tracking for clicks\n3. Design \"coming soon\" message\n4. Create waitlist signup option\n5. Plan follow-up survey for clickers\n\n**Ethical Considerations:**\n- Clear communication about test nature\n- Genuine intention to build if validated\n- Waitlist signup to show commitment\n- Follow-up with participants about results"
    },
    {
      "id": "section-12-5",
      "title": "12.5 Sentiment & Emotion Mining",
      "type": "content",
      "content": "### AI-Powered Analysis Tools\n\n| **Tool** | **Signal** | **Example Metric** |\n|----------|------------|-------------------|\n| **OpenAI Sentiment API / VADER** | Valence (–1 → +1) | Avg 0.42 during onboarding |\n| **Computer Vision (Facial)** | Confusion lag, joy spikes | Confusion frames per min |\n| **Keystroke / Cursor** | Hover delay, rage-clicks | Avg hover > 1.5s indicates friction |\n\n**Ethics Note**: Secure explicit consent for video or biometric capture; anonymize before cloud upload.\n\n### Implementation Guidelines\n\n**Data Collection:**\n- Always obtain explicit consent\n- Anonymize data before cloud processing\n- Store locally when possible\n- Clear retention and deletion policies\n\n**Analysis Approach:**\n- Combine multiple signal sources\n- Validate AI sentiment with human review\n- Look for patterns, not individual outliers\n- Use for direction, not absolute truth"
    },
    {
      "id": "section-12-6",
      "title": "12.6 Rapid Test‑Synthesis Framework (\"FIVE\")",
      "type": "content",
      "content": "### The FIVE Framework\n\n| **Letter** | **Action** |\n|------------|-----------|\n| **F** | **Frame** the test goal (\"We need to learn…\") |\n| **I** | **Invite** target users (screen with 1-2 qualifiers) |\n| **V** | **Validate** tasks & tech (pilot internal run) |\n| **E** | **Execute** sessions (≤ 20 min each) |\n| **S** | **Synthesize** within 24h (affinity + AI digest) |\n\n### FIVE Implementation Timeline\n\n**Day 1: Frame & Invite**\n- Define learning objectives clearly\n- Create user screening criteria\n- Begin recruitment process\n- Draft task scenarios\n\n**Day 2: Validate & Prepare**\n- Internal pilot test run\n- Fix technical issues\n- Finalize task scripts\n- Prepare analysis tools\n\n**Day 3: Execute**\n- Run 5-8 user sessions\n- Take structured notes\n- Record key moments\n- Maintain consistent conditions\n\n**Day 4: Synthesize**\n- Affinity cluster findings\n- Use AI for initial pattern detection\n- Human validation of insights\n- Create actionable recommendations"
    },
    {
      "id": "section-12-7",
      "title": "12.7 Learning Metrics Board",
      "type": "content",
      "content": "### Key Metrics Dashboard\n\n| **Metric** | **Target** | **Source** |\n|------------|------------|------------|\n| **Task Success %** | ≥ 80% | Think-Aloud logs |\n| **SUS Score (1-100)** | ≥ 75 | Post-test survey |\n| **Time on Task** | -20% vs. baseline | Screen recording |\n| **Net Emotional Valence** | +0.3↑ | Sentiment API |\n\n**AI Assist**: Auto-populate dashboard; flag any metric below threshold in red.\n\n### Metrics Implementation\n\n**Real-Time Tracking:**\n- Automated data collection where possible\n- Regular manual check-ins for qualitative metrics\n- Daily dashboard updates during testing cycles\n- Alert system for metrics falling below thresholds\n\n**Analysis and Action:**\n- Weekly metric review meetings\n- Clear escalation procedures for red metrics\n- Rapid iteration based on metric trends\n- Documentation of metric improvements over time"
    },
    {
      "id": "section-12-8",
      "title": "12.8 Multi‑Cycle Test Plan (1‑Week Sprint)",
      "type": "content",
      "content": "### Weekly Testing Sprint\n\n| **Day** | **Activity** |\n|---------|--------------|\n| **Mon AM** | Heuristic Review (2h) |\n| **Mon PM** | Revise prototype |\n| **Tue** | Think-Aloud tests × 5 |\n| **Wed AM** | Synthesize issues → priority list |\n| **Wed PM** | Fix P1 issues |\n| **Thu** | Remote un-moderated test (N = 20) |\n| **Fri** | Decide: Ready for pilot? |\n\n### Sprint Success Criteria\n\n**Monday Goals:**\n- Complete heuristic review with severity scores\n- Identify and fix critical usability violations\n- Prepare revised prototype for user testing\n\n**Tuesday-Wednesday Goals:**\n- Complete 5 think-aloud sessions\n- Synthesize findings into prioritized action list\n- Implement high-priority fixes\n\n**Thursday-Friday Goals:**\n- Execute large-sample remote testing\n- Analyze quantitative metrics\n- Make go/no-go decision for pilot"
    },
    {
      "id": "section-12-9",
      "title": "12.9 Common Pitfalls & Fixes",
      "type": "content",
      "content": "| **Pitfall** | **Symptom** | **Fix** |\n|-------------|-------------|---------|\n| **Testing Wrong Fidelity** | Users react to polish over flow | Use grayscale wireframes early. |\n| **Observer Bias** | Leading body language / \"good job\" | Mute mic & camera; use scripted prompts. |\n| **Analysis Paralysis** | Endless video reviews | Log live notes + AI summaries; focus on high-severity. |\n| **Ignoring Negative Findings** | Cherry-picking positive quotes | Severity matrix forces addressing P1/P2 before launch. |\n\n### Additional Pitfalls\n\n**Insufficient Sample Size**:\n- **Problem**: Making decisions based on 1-2 users\n- **Solution**: Aim for 5-8 users minimum for qualitative, 20+ for quantitative\n\n**Wrong Participants**:\n- **Problem**: Testing with internal team or wrong user segments\n- **Solution**: Invest in proper recruitment with screener surveys\n\n**Leading Questions**:\n- **Problem**: Asking \"Do you like...\" instead of observing behavior\n- **Solution**: Focus on task completion and behavior observation"
    },
    {
      "id": "section-12-10",
      "title": "12.10 Key Takeaways",
      "type": "content",
      "content": "- **Test early, test small, test often**—5 users catch majority of usability issues\n- **Combine expert (heuristic), qualitative (think-aloud), and quantitative (remote analytics)** lenses\n- **AI accelerates transcription, sentiment, and pattern-finding**—humans still interpret nuance\n- **Rapid synthesis and visible metrics** drive timely iteration and accountability\n\n### Testing Success Factors\n\n1. **Clear Learning Objectives**: Know what you need to learn before testing\n2. **Right Participants**: Test with your actual target users\n3. **Appropriate Methods**: Match testing method to research questions\n4. **Rapid Synthesis**: Convert findings to actions within 24 hours\n5. **Continuous Iteration**: Build testing into regular development cycles"
    },
    {
      "id": "section-12-11",
      "title": "12.11 Field Notes & Further Reading",
      "type": "content",
      "content": "### Essential Resources\n- **Book**: Krug \"Don't Make Me Think\" (usability classic)\n- **Paper**: Nielsen (2000) \"Why You Only Need 5 Users\"\n- **Toolkit**: createx.us/toolkit/testing-bundle (scripts, scorecards, dashboard template)\n- **Podcast**: UX Cake — Ep. 81 \"Remote Testing at Warp Speed\"\n\n### Community Practice\n- Share your testing templates in #testing-methods\n- Contribute to the usability heuristics library\n- Join weekly testing office hours\n- Document successful testing sprint examples"
    },
    {
      "id": "section-12-12",
      "title": "12.12 Practical Application",
      "type": "content",
      "content": "### Testing Planning Checklist\n\n**Pre-Testing:**\n- [ ] Test goal framed using FIVE framework\n- [ ] Recruit list confirmed with proper screening\n- [ ] Prototype fidelity matched to questions\n- [ ] AI transcription & sentiment tools ready\n- [ ] Synthesis session scheduled within 24h\n\n**During Testing:**\n- [ ] Consistent protocol followed across sessions\n- [ ] Structured note-taking maintained\n- [ ] Technical issues documented and resolved\n- [ ] Participant comfort and consent maintained\n\n**Post-Testing:**\n- [ ] Rapid synthesis completed within 24 hours\n- [ ] Findings prioritized by severity and impact\n- [ ] Action plan created with owners and timelines\n- [ ] Metrics updated and stakeholders informed\n\n---\n\n### Facilitator Checklist\n\n- [ ] Test goal framed (FIVE)\n- [ ] Recruit list confirmed\n- [ ] Prototype fidelity matched to questions\n- [ ] AI transcription & sentiment tools ready\n- [ ] Synthesis session scheduled within 24h\n- [ ] Heuristic review completed before user testing\n- [ ] Success metrics defined and tracking ready"
    }
  ];

  // Chinese sections data
  const chineseSections: Section[] = [
    {
      id: "section-12-0",
      title: "12.0 为什么要测试？",
      type: "content",
      content: "### 真相揭示功能\n\n**测试实现的目标：**\n- **揭示隐藏假设**：发现设计者意图与用户现实之间的差距\n- **验证期望性**：测试用户是否真正想要所提议的解决方案\n- **确认可用性**：确保用户能够成功完成预期任务\n- **衡量可行性**：评估解决方案是否能提供目标结果\n\n### 跳过测试的成本\n\n**不测试的风险：**\n- 将缺陷扩大到整个用户群体\n- 在不想要的功能上浪费开发资源\n- 通过失败的发布破坏利益相关者的信任\n- 直到部署后才发现关键可用性问题\n\n### CreateX测试理念\n\n**精益+高信号：**\n- 小样本量获得高质量洞察\n- AI加速分析而不失去人文细致\n- 快速循环胜过完美协议\n- 可操作的反馈驱动即时迭代"
    },
    {
      id: "section-12-1",
      title: "12.1 出声思考可用性测试",
      type: "content",
      content: "### 方法卡片\n\n| **部分** | **详情** |\n|----------|----------|\n| **目的** | 通过听取用户在执行任务时言语化思考来发现摩擦点。 |\n| **使用时机** | 任何可点击或纸质原型的首次测试。 |\n| **步骤详解** | 1）招募代表性用户（N=5覆盖约85%问题）。2）解释\"出声思考\"规则。3）逐一给出任务。4）观察；做结构化笔记。5）与用户汇报。 |\n| **远程提示** | 使用BoardX分屏视图：左侧原型，右侧实时转录。 |\n| **AI提示想法** | \"突出犹豫（>2秒暂停）并在表格中总结时间戳和屏幕ID。\" |\n| **陷阱** | 指导用户；写任务卡并保持沉默。 |\n| **模板** | createx.us/toolkit/think-aloud-script |\n\n### 出声思考过程（45分钟）\n\n**设置（5分钟）：**\n- 向参与者简要介绍出声思考协议\n- 设置录制权限并启动工具\n- 提醒没有\"正确\"答案\n- 定位观察者以避免干扰\n\n**任务执行（30分钟）：**\n- 在卡片上逐一呈现任务\n- 在任务执行过程中保持沉默\n- 对行为做结构化笔记\n- 标记关键时刻的时间戳\n\n**汇报（10分钟）：**\n- 询问困惑时刻\n- 探索情感反应\n- 理解心理模型\n- 收集改进建议\n\n### 观察框架\n\n**跟踪内容：**\n- **言语**：困惑陈述、信心指标\n- **行为**：犹豫、回溯、错误\n- **情感**：沮丧、愉悦、惊讶反应\n- **任务成功**：完成率、完成时间\n\n**笔记模板：**\n```\n时间 | 屏幕 | 动作 | 言语化 | 观察者笔记\n-----|------|------|-------|----------\n1:23 | 登录 | 暂停 | \"哪里是...\" | 寻找明显按钮\n```"
    },
    {
      id: "section-12-2",
      title: "12.2 启发式评审（10个可用性启发式）",
      type: "content",
      content: "### Nielsen的10个启发式快速参考\n\n| **Nielsen启发式** | **指导问题** |\n|-------------------|---------------|\n| **系统状态可见性** | 反馈是否即时明确？ |\n| **系统与真实世界匹配** | 使用熟悉的语言/图标？ |\n| **用户控制与自由** | 容易撤销/重做？ |\n| **一致性与标准** | 遵循平台约定？ |\n| **错误预防** | 在错误发生前预防？ |\n| **识别>回忆** | 使对象/动作可见？ |\n| **灵活性与效率** | 为专家用户提供快捷方式？ |\n| **美观简约设计** | 没有无关信息？ |\n| **帮助用户处理错误** | 错误消息清晰并有解决方案？ |\n| **帮助与文档** | 有上下文相关帮助？ |\n\n### 方法卡片\n\n| **部分** | **详情** |\n|----------|----------|\n| **目的** | 专家审计，在用户测试前捕获基础可用性问题。 |\n| **使用时机** | 第一个交互原型后；开发前。 |\n| **过程** | 2-3个评审员对每个屏幕评分0-4严重性；汇总热图。 |\n| **AI辅助** | 计算机视觉检查器标记低对比度文本、微小目标。 |\n| **陷阱** | 过度依赖启发式；仍需运行实时用户测试。 |\n| **模板** | createx.us/toolkit/heuristic-scorecard |\n\n### 严重性评级量表\n\n**0 - 无问题**：无可用性问题\n**1 - 表面的**：小问题，如有时间可修复\n**2 - 轻微**：低优先级可用性问题\n**3 - 主要**：重要需修复，高优先级\n**4 - 灾难性**：发布前必须修复\n\n### 启发式评审过程（90分钟）\n\n**个人评审（60分钟）：**\n- 每位评审员独立评估界面\n- 对所有10个启发式为每个屏幕评分\n- 用截图记录具体违规\n- 记录每个问题的严重性评级\n\n**汇总会议（30分钟）：**\n- 合并个人发现\n- 讨论严重性分歧\n- 创建合并的优先级列表\n- 计划高严重性问题的修复"
    },
    {
      id: "section-12-3",
      title: "12.3 远程无主持测试平台",
      type: "content",
      content: "### 平台比较\n\n| **平台** | **优势** | **注意事项** |\n|----------|----------|---------------|\n| **Maze / UsabilityHub** | 快速、定量路径指标 | 定性深度有限 |\n| **PlaybookUX** | AI转录+情感分析 | 必须严格预设任务脚本 |\n| **自定义BoardX流程** | 与CreateX画布完全集成 | 需要手动招募 |\n\n**AI提示想法**：\"分析点击图热图找到放弃点；输出带步骤#和流失%的CSV。\"\n\n### 何时使用远程测试\n\n**最适合：**\n- 大样本量（N > 20）\n- 需要定量指标\n- 地理分布的用户\n- 首次用户体验\n\n**不理想：**\n- 需要指导的复杂任务流程\n- 情感反应理解\n- 详细行为观察\n- 原型调试会议"
    },
    {
      id: "section-12-4",
      title: "12.4 A/B和多变量\"虚假门\"测试",
      type: "content",
      content: "### 方法卡片\n\n| **部分** | **详情** |\n|----------|----------|\n| **目的** | 通过测量概念变体的点击意图来验证期望性或定价。 |\n| **使用时机** | WoZ显示希望后；构建完整功能前。 |\n| **实施** | 着陆页或应用内横幅→记录点击；然后\"即将推出\"消息+调查。 |\n| **AI提示想法** | \"预测在基准8%点击率下95%置信度所需的样本量。\" |\n| **陷阱** | 用户沮丧——提供选择加入等待列表以缓解。 |\n| **模板** | createx.us/toolkit/fake-door-plan |\n\n### 虚假门实施\n\n**设置过程：**\n1. 创建变体着陆页/按钮\n2. 设置点击分析跟踪\n3. 设计\"即将推出\"消息\n4. 创建等待列表注册选项\n5. 计划点击者的后续调查\n\n**伦理考虑：**\n- 清楚传达测试性质\n- 如果验证成功真正打算构建\n- 等待列表注册显示承诺\n- 向参与者跟进结果"
    },
    {
      id: "section-12-5",
      title: "12.5 情感与情绪挖掘",
      type: "content",
      content: "### AI驱动分析工具\n\n| **工具** | **信号** | **示例指标** |\n|----------|----------|---------------|\n| **OpenAI情感API / VADER** | 情感价（-1→+1） | 入职过程中平均0.42 |\n| **计算机视觉（面部）** | 困惑延迟、喜悦峰值 | 每分钟困惑帧数 |\n| **按键/光标** | 悬停延迟、愤怒点击 | 平均悬停>1.5秒表示摩擦 |\n\n**伦理说明**：视频或生物识别捕获需明确同意；云上传前匿名化。\n\n### 实施指南\n\n**数据收集：**\n- 始终获得明确同意\n- 云处理前匿名化数据\n- 尽可能本地存储\n- 明确保留和删除政策\n\n**分析方法：**\n- 结合多个信号源\n- 用人工审查验证AI情感\n- 寻找模式，不是个别异常值\n- 用于方向，不是绝对真理"
    },
    {
      id: "section-12-6",
      title: "12.6 快速测试综合框架（\"FIVE\"）",
      type: "content",
      content: "### FIVE框架\n\n| **字母** | **行动** |\n|----------|----------|\n| **F** | **框架**测试目标（\"我们需要了解...\"） |\n| **I** | **邀请**目标用户（用1-2个限定词筛选） |\n| **V** | **验证**任务和技术（内部试点运行） |\n| **E** | **执行**会议（每个≤20分钟） |\n| **S** | **综合**在24小时内（亲和性+AI摘要） |\n\n### FIVE实施时间表\n\n**第1天：框架和邀请**\n- 明确定义学习目标\n- 创建用户筛选标准\n- 开始招募过程\n- 起草任务场景\n\n**第2天：验证和准备**\n- 内部试点测试运行\n- 修复技术问题\n- 最终确定任务脚本\n- 准备分析工具\n\n**第3天：执行**\n- 运行5-8个用户会议\n- 做结构化笔记\n- 记录关键时刻\n- 保持一致条件\n\n**第4天：综合**\n- 亲和性聚类发现\n- 使用AI进行初始模式检测\n- 洞察的人工验证\n- 创建可操作建议"
    },
    {
      id: "section-12-7",
      title: "12.7 学习指标仪表板",
      type: "content",
      content: "### 关键指标仪表板\n\n| **指标** | **目标** | **来源** |\n|----------|----------|----------|\n| **任务成功率%** | ≥80% | 出声思考日志 |\n| **SUS评分（1-100）** | ≥75 | 测试后调查 |\n| **任务时间** | 比基准-20% | 屏幕录制 |\n| **净情感价** | +0.3↑ | 情感API |\n\n**AI辅助**：自动填充仪表板；将低于阈值的任何指标标记为红色。\n\n### 指标实施\n\n**实时跟踪：**\n- 尽可能自动化数据收集\n- 定性指标的定期手动检查\n- 测试周期中的每日仪表板更新\n- 低于阈值指标的警报系统\n\n**分析和行动：**\n- 每周指标审查会议\n- 红色指标的明确升级程序\n- 基于指标趋势的快速迭代\n- 记录指标随时间的改进"
    },
    {
      id: "section-12-8",
      title: "12.8 多周期测试计划（1周冲刺）",
      type: "content",
      content: "### 每周测试冲刺\n\n| **日期** | **活动** |\n|----------|----------|\n| **周一上午** | 启发式评审（2小时） |\n| **周一下午** | 修订原型 |\n| **周二** | 出声思考测试×5 |\n| **周三上午** | 综合问题→优先级列表 |\n| **周三下午** | 修复P1问题 |\n| **周四** | 远程无主持测试（N=20） |\n| **周五** | 决定：准备试点？ |\n\n### 冲刺成功标准\n\n**周一目标：**\n- 完成带严重性评分的启发式评审\n- 识别并修复关键可用性违规\n- 为用户测试准备修订原型\n\n**周二-周三目标：**\n- 完成5个出声思考会议\n- 将发现综合为优先行动列表\n- 实施高优先级修复\n\n**周四-周五目标：**\n- 执行大样本远程测试\n- 分析定量指标\n- 对试点做出进行/停止决定"
    },
    {
      id: "section-12-9",
      title: "12.9 常见陷阱和解决方案",
      type: "content",
      content: "| **陷阱** | **症状** | **解决方案** |\n|----------|----------|---------------|\n| **测试错误保真度** | 用户对精致度而非流程的反应 | 早期使用灰度线框图。 |\n| **观察者偏见** | 引导性肢体语言/\"做得好\" | 静音麦克风和摄像头；使用脚本提示。 |\n| **分析瘫痪** | 无休止的视频审查 | 实时笔记+AI摘要；专注于高严重性。 |\n| **忽略负面发现** | 挑选正面引用 | 严重性矩阵强制在发布前处理P1/P2。 |\n\n### 额外陷阱\n\n**样本量不足**：\n- **问题**：基于1-2个用户做决定\n- **解决方案**：定性测试至少5-8个用户，定量测试20+个\n\n**错误参与者**：\n- **问题**：与内部团队或错误用户群体测试\n- **解决方案**：投资适当招募，使用筛选调查\n\n**引导性问题**：\n- **问题**：问\"你喜欢...\"而非观察行为\n- **解决方案**：专注于任务完成和行为观察"
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
    moduleTitle: '测试与反馈',
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
    moduleTitle: 'Testing & Feedback',
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
                      {uiText.chapter} 12
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
                      href={`/${params.lang}/modules/implementation-roadmapping`}
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

const TestingFeedbackPage = withModuleProgress(
  TestingFeedbackComponent,
  'testing-feedback',
  13
);

export default TestingFeedbackPage;
