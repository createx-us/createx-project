# Chapter 18: AI Integration Playbook

**Track:** AI & Technology  
**Duration:** 55 min  
**Difficulty:** Advanced  
**Prerequisites:** Chapter 17

## Learning Objectives

- Master AI tool selection and prompt crafting for design thinking workshops
- Apply data ethics and safety protocols for AI integration
- Understand troubleshooting and guardrail implementation
- Implement future-proofing strategies for evolving AI capabilities

## Overview

AI Integration Playbook provides systematic guidance for incorporating generative AI tools into design thinking facilitation while maintaining ethical standards, transparency, and human-centered outcomes.

## 18.0 Why an AI Playbook?

Generative AI can slash busy-work, spark unconventional ideas, and surface hidden insights—but mis-applied it creates bias, noise, or dependency. The AI Integration Playbook ensures facilitators employ AI purposefully, transparently, and ethically at every workshop stage.

## 18.1 Tool-Selection Matrix

| Stage | Job-to-Be-Done | High-Fit Tools (2025) | Offline Fallback |
|-------|----------------|----------------------|------------------|
| **Discover** | Transcribe & translate interviews | OpenAI Whisper-Live, DeepL | Human note-taker |
| **Define** | Cluster themes, draft insights | GPT-4o, Claude 3 Sonnet | Manual affinity |
| **Ideate** | Generate idea sparks & visuals | ChatGPT, Gemini 1.5, Midjourney v7 | SCAMPER cards |
| **Prototype** | Prompt-to-UI, code snippets | Galileo AI, Codeium | Paper prototype |
| **Test** | Sentiment & click-path analytics | Maze AI, VADER | Manual notes grid |
| **Reflect** | Auto-summarize AAR notes | GPT-4o | Facilitator synthesis |

**Decision Filter ("3 L"):** Leverage (10× faster?), Learnability (15 min to onboard?), Licensing (complies with CC-BY-SA?).

## 18.2 Prompt-Crafting Framework ("C-T-E-C-O")

1. **Context** — Explain user, stage, objective
2. **Task** — Imperative verb ("cluster", "rewrite", "brainstorm")
3. **Exemplars** — Show 1-2 examples of desired output
4. **Constraints** — Word count, tone, banned jargon
5. **Output Format** — Bullet list, JSON, Markdown table

**Prompt Template:**
```
You are an AI {role}. Context: {workshop stage & goal}.
Task: {imperative}. Examples: {if any}.
Constraints: {list}.
Output as {format}.
```

## 18.3 Data & Ethics Checklist (run at kickoff + closure)

| Checkpoint | Question | Action if "No" |
|------------|----------|----------------|
| **Consent** | Have participants agreed to AI processing & storage? | Obtain digital consent or bypass tool |
| **PII Scrub** | Does dataset exclude personal identifiers? | Mask / hash fields |
| **Bias Scan** | Output free of protected-class stereotypes? | Re-prompt with neutrality constraints |
| **IP Rights** | Is generated content CC-compatible? | Regenerate or license separately |
| **Audit Trail** | Prompt + output logged? | Save to AI-Trace sheet |

## 18.4 Integration Recipes by Stage

| Stage | Recipe | Time-Save | Quality Gain |
|-------|--------|-----------|--------------|
| **Instant Theme Clustering (Define)** | Feed cleaned transcript → GPT: "Return top 7 themes, quote IDs." | 90 → 5 min | Broad coverage |
| **Wild-Card Ideation Burst (Ideate)** | "Suggest 20 sci-fi remixes of HMW: {text}." | 20 → 3 min | Novelty spike |
| **Figma JSON Generator (Prototype)** | "Generate wireframe JSON for mobile flow of {concept}." → Import to Figma plugin | 2 h → 10 min | Consistent layout |
| **Sentiment Timeline (Test)** | Feed user video → Vision + VAD model → CSV valence by second | Manual coding 4 h → auto 15 min | Hidden frustration spots |

## 18.5 Troubleshooting Guide

| Issue | Symptom | Remedy |
|-------|---------|---------|
| **Hallucination** | Invented data / sources | Add "If unsure, say 'unknown'." constraint; verify manually |
| **Prompt Drift** | Outputs lose focus mid-workshop | Re-paste original prompt scaffold; use system role reset |
| **Rate-Limit** | 429 errors during demo | Local LLM fallback (Mistral 7B) or cached responses |
| **Latency** | 10-second lag kills flow | Pre-generate examples; switch to narrower model (GPT-3.5) |

## 18.6 Facilitator Guardrails

1. **Human-in-the-Loop** — Participants must review & edit AI outputs before adoption
2. **Transparency Tag** — Label AI-generated artifacts with ✦ icon
3. **Skill-Building Balance** — Alternate manual first → AI accelerate to teach underlying method
4. **Privacy Scope** — Use local LLMs for sensitive corp data; no cloud upload

## 18.7 Skill-Up Micro-Lessons (5 min each)

| Topic | Exercise |
|-------|----------|
| **Prompt Refinement** | "Iterate a weak prompt into strong using C-T-E-C-O; compare outputs." |
| **Bias Spotting** | Red-team generated copy for gendered language |
| **AI + HMW Remix** | Feed HMW, get 10 variants, choose inclusive wording |
| **Copilot Pairing** | Voice-dictate idea, AI expands to bullet plan; human edits |

## 18.8 Future-Proofing: Model & Tool Tracking

| Cadence | Action |
|---------|--------|
| **Monthly** | Check model release notes (OpenAI, Anthropic, Google, open-source) |
| **Quarterly** | Re-evaluate tool-selection matrix with L-L-L filter |
| **Ad-hoc** | Test emergent multimodal (audio-vis-code) features in sandbox before field |

**Maintain AI-Playbook Changelog in CreateX Wiki; facilitators subscribe for push alerts.**

## 18.9 Common Pitfalls & Fixes

| Pitfall | Cause | Fix |
|---------|-------|-----|
| **Over-Automation** | Letting AI do empathy tasks | Keep user interviews human-led; AI for summarizing |
| **Trust Erosion** | Undisclosed AI use | Announce tool, purpose, and review step |
| **Monoculture Ideas** | Same model bias | Diversify: mix GPT, Claude, open-source; include manual brainstorm |

## Key Takeaways

- **Choose AI tools fit-for-stage** using Leverage · Learnability · Licensing criteria
- **Craft prompts with C-T-E-C-O** to boost precision, safety, and usable outputs
- **Run Data & Ethics Checklist** at kickoff and closure; maintain audit trail
- **AI is a speed & breadth amplifier**—humans retain judgment, empathy, and ethics

## 18.11 Field Notes & Further Reading

- **Book:** "Prompt Engineering for Everyone" (Chen, 2024)
- **Paper:** Google DeepMind (2024) "Ethical Frameworks for Generative AI Co-Creation"
- **Toolkit:** createx.us/toolkit/ai-playbook (checklists, prompt library, troubleshooting cards)
- **Podcast:** AI in Facilitation — Ep. 12 "From Hype to Habit"

## Facilitator Checklist

☐ Tool-Selection Matrix reviewed  
☐ Prompts drafted using C-T-E-C-O  
☐ Consent & ethics forms signed  
☐ Audit log recording  
☐ Backup offline flows prepared

## Reflection Questions

1. How will you balance AI efficiency gains with maintaining human-centered design principles?
2. What specific ethical safeguards are most important for your workshop contexts?
3. How can you develop your prompt crafting skills to maximize AI tool effectiveness?

## Further Resources

- **Selection Tools:** Tool-Selection Matrix, 3-L Decision Filter, Stage-specific integration recipes
- **Ethics & Safety:** Data & Ethics Checklist, Bias scanning protocols, Consent frameworks
- **Skill Development:** C-T-E-C-O framework, Micro-lessons, Troubleshooting guides
