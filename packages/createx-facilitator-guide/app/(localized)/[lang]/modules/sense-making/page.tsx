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

function SenseMakingComponent({
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
      "id": "section-8-0",
      "title": "8.0 Why Sense‑Making?",
      "type": "content",
      "content": "### The Bridge Between Data and Design\n\nSense-making is the critical translation layer that:\n- **Reveals Hidden Patterns**: Surfaces insights invisible in individual data points\n- **Creates Shared Understanding**: Builds team alignment around key insights\n- **Generates Design Opportunities**: Converts problems into actionable challenges\n- **Validates Assumptions**: Tests hunches against real evidence\n\n### The Speed Challenge\n\nTraditional analysis can take weeks. CreateX methods compress synthesis into hours through:\n- **Structured Workflows**: Clear steps from data to insight\n- **AI Acceleration**: Automated clustering and pattern recognition\n- **Collaborative Processing**: Team-based analysis for speed and buy-in"
    },
    {
      "id": "section-8-1",
      "title": "8.1 Affinity Clustering (K‑J Method)",
      "type": "content",
      "content": "### Method Card\n\n| **Section** | **Details** |\n|-------------|-------------|\n| **Purpose** | Reveal hidden themes across dozens–hundreds of data points. |\n| **When to Use** | Immediately post-research or mid-project to tame data sprawl. |\n| **Step-by-Step** | 1) One insight per sticky. 2) Silent, intuitive grouping. 3) Label clusters (nouns + verbs). 4) Dot-vote top 5 clusters. |\n| **Remote Tips** | BoardX \"huddle\" mode auto-arranges stickies via cosine similarity; switch to manual for nuance. |\n| **AI Prompt Ideas** | \"Group these 120 interview quotes into 6–8 thematic buckets; output JSON with theme, member IDs, sample quote.\" |\n| **Pitfalls** | Anchoring bias from first cluster label; randomize order before grouping. |\n| **Template** | createx.us/toolkit/affinity-board |\n\n### Facilitator Checklist\n\n- [ ] Raw data digitized\n- [ ] Affinity session scheduled  \n- [ ] AI clustering vetted for bias\n- [ ] Insight statements peer-reviewed\n- [ ] Top HMWs ready for Ideation stage\n- [ ] Quality standards communicated to team"
    },
    {
      "id": "section-8-2",
      "title": "8.2 Journey Mapping & System Mapping",
      "type": "content",
      "content": "### Journey Maps: The User Timeline\n\n**Purpose**: Visualize user experience across touchpoints to identify pain points and opportunities.\n\n**When to Use**: When you have sequential user data (interviews, observations, diary studies).\n\n**CreateX Enhancement**: AI can auto-generate journey stages from interview transcripts.\n\n### System Maps: The Ecosystem View\n\n**Purpose**: Map stakeholder relationships, information flows, and system dynamics.\n\n**Key Components**:\n- **Actors**: People, organizations, technologies\n- **Connections**: Information, money, influence flows\n- **Boundaries**: What's in/out of scope\n- **Feedback Loops**: Reinforcing or balancing dynamics\n\n### AI-Assisted Mapping\n\n```\nPrompt Template: \"From these 15 user interviews about [topic], create a journey map with: stages, actions, thoughts, emotions, pain points, and opportunities. Output as structured JSON.\"\n```\n\n### Workshop Format (90 minutes)\n\n1. **Data Review** (15 min) - Project key quotes\n2. **Individual Mapping** (20 min) - Each person maps their understanding  \n3. **Merge & Debate** (30 min) - Combine individual maps\n4. **AI Validation** (15 min) - Cross-check with LLM analysis\n5. **Prioritization** (10 min) - Vote on high-impact zones"
    },
    {
      "id": "section-8-3",
      "title": "8.3 Insight Distillation",
      "type": "content",
      "content": "### From Observation to Insight\n\nAn **observation** is what happened. An **insight** is why it matters.\n\n| **Observation** | **Insight** |\n|-----------------|-------------|\n| \"Users abandon cart at shipping page\" | \"Unexpected costs destroy purchase intent\" |\n| \"Participants struggled with password reset\" | \"Security friction creates learned helplessness\" |\n| \"Teams prefer Slack over email for urgent items\" | \"Urgency signals require immediate visibility\" |\n\n### The Insight Quality Bar\n\nStrong insights are:\n- **Surprising**: Challenges assumptions\n- **Actionable**: Points to design opportunities  \n- **Human**: Connects to emotions and motivations\n- **Evidence-backed**: Supported by multiple data points\n\n### Insight Writing Templates\n\n**Pattern Template**: \"We noticed [pattern] which suggests [deeper truth] because [underlying reason].\"\n\n**Tension Template**: \"Users want [X] but also need [Y], creating tension around [Z].\"\n\n**Jobs-to-be-Done Template**: \"When [situation], users hire [solution] to [functional job] so they can [emotional outcome].\"\n\n### AI Insight Generation\n\n```\nPrompt: \"From this research data, generate 10 insights using the pattern: 'We noticed [observation] which suggests [interpretation] because [hypothesis about user motivation].' Rank by novelty and actionability.\"\n```"
    },
    {
      "id": "section-8-4",
      "title": "8.4 Opportunity Mapping",
      "type": "interactive",
      "content": "### The Opportunity Landscape\n\nTransform insights into design opportunities using the **Impact vs. Effort Matrix**.\n\n### Exercise: Opportunity Prioritization (45 minutes)\n\n**Step 1: Opportunity Generation** (15 min)\n- Convert each insight into \"How might we...\" questions\n- Aim for 20-30 opportunities\n- Keep phrasing optimistic and specific\n\n**Step 2: Impact Assessment** (15 min)\n- Rate each opportunity: High/Medium/Low user impact\n- Consider: frequency, pain level, business value\n- Use dot voting for team consensus\n\n**Step 3: Effort Estimation** (15 min)\n- Rate implementation complexity: High/Medium/Low\n- Consider: technical, design, operational effort\n- Include time-to-market factors\n\n### Digital Template\n\nUse the CreateX Opportunity Canvas: **createx.us/toolkit/opportunity-map**\n\n### AI Enhancement\n\n```\nPrompt: \"Given these insights [paste insights], generate HMW questions and plot them on impact vs effort matrix. Consider technical feasibility, user value, and business goals.\"\n```\n\n### Facilitator Notes\n\n- Keep energy high with short time boxes\n- Encourage wild ideas before filtering\n- Document all opportunities, even \"low priority\" ones\n- Plan follow-up ideation sessions for top opportunities"
    },
    {
      "id": "section-8-5",
      "title": "8.5 Data Storytelling",
      "type": "content",
      "content": "### Turning Data into Narrative\n\nRaw insights don't change minds. Stories do. Effective data storytelling combines:\n\n- **Context**: Why this research mattered\n- **Conflict**: What problem/tension emerged\n- **Resolution**: What this means for design\n\n### The Research Story Arc\n\n1. **Setup**: Research questions and methods\n2. **Journey**: Key findings and surprises\n3. **Climax**: The \"aha!\" moment or critical insight\n4. **Resolution**: Design implications and next steps\n\n### Stakeholder-Specific Narratives\n\n| **Audience** | **Leading with...** | **Supporting with...** |\n|--------------|---------------------|------------------------|\n| **Executives** | Business impact, ROI | User quotes, metrics |\n| **Designers** | User emotions, journeys | Personas, scenarios |\n| **Engineers** | Technical constraints | System diagrams, flows |\n| **Product** | Feature opportunities | Prioritization frameworks |\n\n### Visual Storytelling Tools\n\n- **Quote Walls**: Powerful user statements\n- **Insight Posters**: One insight per slide with evidence\n- **Journey Comics**: Visual narratives of user experience\n- **Before/After Scenarios**: Current vs. ideal states\n\n### AI Story Enhancement\n\n```\nPrompt: \"Create a compelling research narrative from these insights [paste data]. Structure as: situation, complication, resolution. Include specific user quotes and actionable recommendations for [specific audience].\"\n```"
    },
    {
      "id": "section-8-6",
      "title": "8.6 Collaborative Synthesis Sessions",
      "type": "content",
      "content": "### Why Synthesize Together?\n\nSynthesis isn't just analysis—it's **collective sensemaking**. Benefits include:\n\n- **Shared Understanding**: Everyone hears the same insights\n- **Diverse Perspectives**: Multiple interpretations enrich findings\n- **Buy-in Building**: Participation creates ownership\n- **Real-time Validation**: Gut-check insights as they emerge\n\n### Session Structure (2-3 hours)\n\n**Pre-work (Individual, 30 min)**\n- Review raw data independently\n- Note initial observations\n- Come with questions and hypotheses\n\n**Opening (Team, 15 min)**\n- Align on research goals\n- Review session agenda\n- Set collaboration norms\n\n**Data Immersion (45 min)**\n- Present key quotes/observations\n- Silent sticky-note generation\n- No judgement, just capture\n\n**Pattern Recognition (60 min)**\n- Affinity clustering in small groups\n- Cross-pollinate findings between groups\n- Identify themes and tensions\n\n**Insight Development (45 min)**\n- Transform patterns into insights\n- Test insights against data\n- Rate insight quality collectively\n\n**Opportunity Mapping (30 min)**\n- Generate \"How might we\" questions\n- Prioritize opportunities\n- Plan next steps\n\n### Remote Facilitation Tips\n\n- Use breakout rooms for small group work\n- Leverage digital whiteboard tools (Miro, BoardX)\n- Record sessions for async team members\n- Create shared artifact libraries"
    },
    {
      "id": "section-8-7",
      "title": "8.7 AI-Enhanced Analysis",
      "type": "content",
      "content": "### The AI Sensemaking Toolkit\n\nAI accelerates synthesis without replacing human judgment. Key capabilities:\n\n### Pattern Detection\n\n**LLM Clustering**: Group qualitative data by semantic similarity\n```\nPrompt: \"Analyze these 50 user interview quotes. Group into 5-7 themes. For each theme, provide: theme name, key characteristics, representative quotes, and potential design implications.\"\n```\n\n**Sentiment Analysis**: Track emotional patterns across user groups\n```\nPrompt: \"Analyze sentiment in these customer feedback entries. Report: overall sentiment distribution, key drivers of negative sentiment, and emotional journey patterns.\"\n```\n\n### Content Generation\n\n**Insight Generation**: AI proposes insights from raw data\n```\nPrompt: \"From this user research data, generate 10 insights using this format: 'We learned that [finding] which matters because [implication] and suggests we should [action].' Rank by importance.\"\n```\n\n**Persona Creation**: Auto-generate user archetypes\n```\nPrompt: \"Based on this interview data, create 3 user personas. Include: demographics, goals, frustrations, behaviors, and representative quotes. Format as design-ready persona cards.\"\n```\n\n### Quality Assurance\n\n**Bias Detection**: Check for research blind spots\n```\nPrompt: \"Review this research summary for potential biases: sampling bias, confirmation bias, and cultural assumptions. Suggest areas for follow-up research.\"\n```\n\n**Cross-validation**: Verify insights against multiple data sources\n\n### AI Ethics in Research\n\n- Always validate AI insights with human judgment\n- Be transparent about AI assistance in reports\n- Protect participant privacy in AI prompts\n- Don't let AI speed compromise research rigor"
    },
    {
      "id": "section-8-8",
      "title": "8.8 Synthesis Quality Standards",
      "type": "content",
      "content": "### The Synthesis Quality Framework\n\nGreat synthesis balances **rigor** and **relevance**. Use these standards:\n\n### Rigor Standards\n\n**Traceability**: Every insight traces back to specific data\n- Link insights to participant IDs, quotes, or observations\n- Maintain evidence trails for stakeholder questions\n- Document dissenting opinions and edge cases\n\n**Completeness**: Analysis covers all research goals\n- Address original research questions\n- Acknowledge areas where data is thin\n- Identify gaps requiring follow-up research\n\n**Objectivity**: Minimize researcher bias\n- Include contradictory evidence\n- Separate observations from interpretations\n- Have insights reviewed by team members\n\n### Relevance Standards\n\n**Actionability**: Insights drive design decisions\n- Connect findings to product/service opportunities\n- Prioritize insights by business impact\n- Provide specific next steps for each insight\n\n**Audience Alignment**: Delivery matches stakeholder needs\n- Use language and formats familiar to audience\n- Include appropriate level of detail\n- Address stakeholder concerns and questions\n\n### Quality Checklist\n\n**Before Sharing Synthesis:**\n- [ ] All insights supported by evidence\n- [ ] Findings address research objectives\n- [ ] Opportunities clearly prioritized\n- [ ] Recommendations are specific and actionable\n- [ ] Stakeholder concerns anticipated and addressed\n- [ ] Visual design supports comprehension\n- [ ] Next steps clearly defined\n\n### Peer Review Process\n\n1. **Internal Review**: Team validates insights and evidence\n2. **Stakeholder Preview**: Share summary with key stakeholders\n3. **Participant Validation**: When possible, verify findings with research participants\n4. **Final Documentation**: Create permanent research archive"
    },
    {
      "id": "section-8-9",
      "title": "8.9 Common Synthesis Pitfalls",
      "type": "content",
      "content": "### The Seven Deadly Sins of Synthesis\n\n### 1. Cherry-Picking Evidence\n**Problem**: Selecting only data that supports preconceptions\n**Solution**: Actively seek disconfirming evidence; assign a \"devil's advocate\"\n\n### 2. Over-Generalizing from Limited Data\n**Problem**: \"All users want...\" based on 3 interviews\n**Solution**: Qualify findings (\"Some users we spoke with...\"); note sample limitations\n\n### 3. Conflating Correlation with Causation\n**Problem**: \"Users who use feature X are happier\" → \"Feature X makes users happy\"\n**Solution**: Use cautious language; test causal hypotheses separately\n\n### 4. Insight Overwhelm\n**Problem**: 47 insights with no prioritization\n**Solution**: Limit to 5-7 key insights; create parking lot for secondary findings\n\n### 5. Solution Bias\n**Problem**: Framing insights to support predetermined solutions\n**Solution**: Focus on problems first; generate solutions later\n\n### 6. Analysis Paralysis\n**Problem**: Perfect synthesis prevents progress\n**Solution**: Set synthesis deadlines; \"good enough\" beats \"perfect but late\"\n\n### 7. Context Collapse\n**Problem**: Stripping insights of situational context\n**Solution**: Include when, where, why for each insight; preserve rich context\n\n### Warning Signs Your Synthesis Needs Work\n\n- Insights sound like marketing copy\n- No surprises or challenging findings\n- Stakeholders ask \"So what?\"\n- Recommendations are generic\n- Team can't agree on priorities\n- Findings confirm everything you already believed\n\n### Recovery Strategies\n\n- Return to raw data for fresh perspective\n- Involve outside perspectives in review\n- Test insights with research participants\n- Focus on user needs, not feature ideas"
    },
    {
      "id": "section-8-10",
      "title": "8.10 Synthesis Delivery Formats",
      "type": "content",
      "content": "### Choosing Your Synthesis Format\n\nDifferent audiences need different delivery mechanisms:\n\n### Executive Briefing (15 minutes)\n**Format**: Slide deck + verbal presentation\n**Content**: Top 3 insights, business implications, recommended actions\n**AI Assist**: Generate executive summary from detailed analysis\n\n### Design Team Workshop (2 hours)\n**Format**: Interactive session + shared artifacts\n**Content**: Full insights, user journeys, opportunity areas\n**AI Assist**: Pre-generate \"How might we\" questions for ideation\n\n### Research Repository Entry\n**Format**: Structured documentation + searchable tags\n**Content**: Complete methodology, findings, evidence, implications\n**AI Assist**: Auto-tag insights for future discoverability\n\n### Stakeholder Report (Self-serve)\n**Format**: Written document + supporting materials\n**Content**: Context, findings, recommendations, appendices\n**AI Assist**: Generate different sections for different audiences\n\n### Visual Synthesis Gallery\n**Format**: Posters, infographics, journey maps\n**Content**: Key insights as memorable visuals\n**AI Assist**: Generate data visualizations and insight graphics\n\n### Quick Wins Memo (1 page)\n**Format**: Brief written summary\n**Content**: Immediate opportunities requiring minimal effort\n**AI Assist**: Extract actionable quick wins from complex analysis\n\n### Template Library\n\n- **Insight Canvas**: createx.us/toolkit/insight-canvas\n- **Journey Map Template**: createx.us/toolkit/journey-map\n- **Opportunity Matrix**: createx.us/toolkit/opportunity-matrix\n- **Research Summary**: createx.us/toolkit/research-summary\n\n### Delivery Best Practices\n\n- Match format to audience attention span\n- Lead with most important findings\n- Include \"what's next\" in every format\n- Make artifacts reusable for future reference\n- Plan follow-up sessions for deeper discussion"
    },
    {
      "id": "section-8-11",
      "title": "8.11 Field Notes & Further Reading",
      "type": "content",
      "content": "### Practitioner Insights\n\n**\"Synthesis is where research becomes real.\"** — *Emma Rodriguez, Design Research Lead*\n\n**\"The best insights feel obvious in retrospect but surprising in the moment.\"** — *James Chen, UX Strategy*\n\n**\"AI helps with the 'what' but humans are still needed for the 'so what.'\"** — *Dr. Sarah Kim, Research Methods*\n\n### Advanced Techniques\n\n**Synthesis Sprints**: Time-boxed analysis sessions (2-4 hours)\n**Cross-study Synthesis**: Finding patterns across multiple research projects\n**Longitudinal Synthesis**: Tracking insights evolution over time\n**Meta-synthesis**: Synthesizing synthesis reports\n\n### Recommended Reading\n\n**Books**:\n- *\"Observing the User Experience\"* by Kuniavsky\n- *\"Mental Models\"* by Indi Young  \n- *\"The Ethnographic Interview\"* by Spradley\n\n**Articles**:\n- \"The Anatomy of an Insight\" (Design Research Society)\n- \"AI-Assisted Qualitative Analysis\" (CHI 2024)\n- \"Synthesis at Scale\" (UX Research Methods)\n\n### Community Resources\n\n**Research Ops Community**: Best practices for synthesis workflows\n**Mixed Methods Slack**: Real-time synthesis tips and tricks\n**CreateX Community Hub**: Share synthesis templates and case studies\n\n### Tools & Software\n\n**Analysis**: NVivo, Atlas.ti, Dedoose\n**Collaboration**: Miro, Figjam, BoardX\n**AI-Enhanced**: Otter.ai, Notion AI, GPT-4\n**Visualization**: Tableau, D3.js, Observable\n\n### Next Steps in Your Synthesis Journey\n\n1. **Practice**: Run synthesis on your next research project\n2. **Experiment**: Try AI assistance in one part of your workflow\n3. **Share**: Contribute synthesis templates to CreateX community\n4. **Evolve**: Adapt methods to your team's specific context\n\n**Ready for the next phase?** Module 9 covers **Framing & Prioritization** — turning insights into actionable design challenges."
    }
  ];

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      // TODO: Add Chinese translations
      return englishSections;
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
    moduleTitle: 'Sense Making',
    completed: '已完成',
    minutes: '分钟',
    intermediate: 'Intermediate',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: 'Sense Making',
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
                      {uiText.chapter} 8
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
                      href={`/${params.lang}/modules/framing-prioritization`}
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

const SenseMakingPage = withModuleProgress(
  SenseMakingComponent,
  'sense-making',
  12
);

export default SenseMakingPage;
