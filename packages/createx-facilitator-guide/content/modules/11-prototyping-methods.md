# Chapter 11:## Overview

Prototyping transforms ideas into testable artifacts that accelerate learning and reduce assumptions. This chapter covers the complete spectrum from paper sketches to AI-powered mockups, emphasizing matching fidelity to learning objectives.

## 11.0 Why Prototype?

Ideas are hypotheses; prototypes are experiments that turn talk into testable evidence. A prototype's fidelity should match the question you need answered—no higher. Rapid, disposable artifacts accelerate learning, reduce gold‑plating, and create a shared "third object" the team can critique without ego.

**Golden Rule:** Prototype to learn, not to validate what you already believe.

## 11.1 Prototype Fidelity Ladder

| Fidelity | Typical Question | Time to Build | Example Tool |
|----------|------------------|---------------|--------------|
| Sketch / Paper | "Does the flow make sense?" | 5–15 min | Pen & Post‑its |
| Click‑Dummy | "Can users navigate it?" | 30–60 min | Figma / BoardX |
| Wizard‑of‑Oz | "Will users pay / respond?" | 1–4 h | Hidden human + scripted UI |
| Functional MVP | "Does it deliver value at scale?" | 1–4 weeks | Bubble, React, low‑code |

**Facilitator Tip:** Start one rung below what the team thinks they need.

## 11.2 Storyboarding

**Purpose:** Visualize user journey and uncover missing steps before building interface.

**When to Use:** Immediately after Concept Poster; when flow, emotion, or setting matters.

**Step‑by‑Step:**
1. 6–8 panels
2. Stick‑figure sketches
3. Caption per panel
4. Group walkthrough

**Remote Tips:** Use BoardX "Storyboard‑6" template; paginate left→right.

**AI Prompt Ideas:** "Generate a one‑sentence caption for each storyboard panel summarizing user intent."

**Pitfalls:** Over‑describing text instead of drawing; remind "pictures first."

**Template:** createx.us/toolkit/storyboard‑sheet

## 11.3 Paper Prototypes

**Purpose:** Test layout/content rapidly; invite easy edits.

**Materials:** Index cards, post‑its, scissors, tape.

**Remote Tips:** Draw on tablet camera; use live‑cursor to move PNG "screens."

**AI Prompt Ideas:** "Suggest microcopy for this login screen text field & error state."

**Pitfalls:** Falling into "pixel‑perfect" trap; set 10‑min timer per screen.

**Template:** createx.us/toolkit/paper‑ui‑frames

## 11.4 Wizard‑of‑Oz (WoZ) Prototype

**Purpose:** Simulate complex tech (AI, IoT) with hidden human to validate desirability before feasibility.

**When to Use:** Costly algorithms, voice assistants, or hardware.

**Step‑by‑Step:**
1. Script responses
2. Hidden "wizard" channel
3. Conduct live session
4. Debrief

**Remote Tips:** Use Slack or WhatsApp back‑channel; mute notifications on screen‑share.

**AI Prompt Ideas:** "Draft 10 plausible chatbot responses for a banking FAQ."

**Pitfalls:** Wizard latency; rehearse response macro keys.

**Template:** createx.us/toolkit/woz‑script‑sheet

## 11.5 Low‑Code & AI Mock‑Ups

| Approach | Tool | Example | What It Proves |
|----------|------|---------|----------------|
| Prompt‑to‑UI | Galileo AI, Uizard | Interface layout | Desirability |
| Auto‑Backend | Retool, Supabase | Data flow & integration | Feasibility |
| Voice / Gen‑AI | Voiceflow, GPT Functions | Conversational logic, tone | Usability |

**AI Prompt Ideas:** "Generate a Figma JSON for a two‑step signup with password strength meter."

**Pitfalls:** Over‑engineering; lock build to ≤ 4 h time‑box.

**Template:** createx.us/toolkit/ai‑mock‑brief

## 11.6 Prototype Testing Quick Loop (30 min)

| Minute | Activity |
|--------|----------|
| 0‑5 | Explain prototype + think‑aloud rules |
| 5‑20 | User tasks (3–5 tasks) |
| 20‑25 | Open Q&A ("What surprised you?") |
| 25‑30 | Team debrief, capture fixes |

**AI Assist:** Live transcription + sentiment gauge flag hesitation spikes.

## 11.7 "Prototype in a Day" Agenda (Hybrid)

| Time | Activity |
|------|----------|
| 09:00 | Storyboard warm‑up |
| 09:30 | Paper prototype screens |
| 10:30 | WoZ script rehearsal |
| 11:00 | Round 1 user tests |
| 12:00 | Lunch & synthesis |
| 13:30 | Low‑code clickable build |
| 15:00 | Round 2 remote tests (5 users) |
| 16:30 | Prioritize fixes (ICE) |
| 17:00 | Go / no‑go decision |

## 11.8 Common Pitfalls & Fixes

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Too High Fidelity | Team spends hours on colors | Force grayscale palette rule |
| User Coaching | Facilitator explains during test | Use "Silent Observer," only clarify task |
| Prototype Hoarding | Team reluctant to discard | Celebrate "learning per dollar minute," archive, move on |
| AI Hallucination | Generated UI copy misleading | Human review; run bias checker |s

**Track:** Design Process  
**Duration:** 60 min  
**Difficulty:** Intermediate  
**Prerequisites:** Chapter 10

## Learning Objectives

- Master key concepts from prototyping methods
- Apply frameworks and methods in practice
- Understand implementation considerations

## Overview

Prototyping Methods provides essential knowledge and practical tools for effective design thinking facilitation.

Chapter 11 — Prototyping Methods 74
11.0 Why Prototype? 74
11.1 Prototype Fidelity Ladder 75
11.2 Storyboarding 75
11.3 Paper Prototypes 76
11.4 Wizard‑of‑Oz (WoZ) Prototype 76
11.5 Low‑Code & AI Mock‑Ups 77
11.6 Prototype Testing Quick Loop (30 min) 78
11.7 “Prototype in a Day” Agenda (Hybrid) 79
11.8 Common Pitfalls & Fixes 79
11.9 Key Takeaways 80
11.10 Field Notes & Further Reading 80
8

--- Page 9 ---

## Key Takeaways

- Match fidelity to question; lower is usually faster and clearer
- Storyboards and paper UI uncover gaps before code
- Wizard‑of‑Oz lets you test desirability of AI magic without building it
- Low‑code & gen‑AI tools compress functional MVPs to hours—but guard time‑boxes
- Always pair prototyping with structured user test loops to lock learning

## Reflection Questions

1. What prototype fidelity level best matches your current project needs?
2. How can you incorporate Wizard-of-Oz testing for AI-powered features?
3. Which prototyping method would accelerate learning most in your context?

## Further Resources

- **Book:** Houde & Hill "What Do Prototypes Prototype?" (classic Xerox PARC paper)
- **Paper:** Rettig (1994) "Prototyping for Tiny Fingers"
- **Toolkit:** createx.us/toolkit/prototyping‑suite (storyboard frames, WoZ script, test plan)
- **Podcast:** Design Better — Ep. 78 "Rapid Prototyping with AI"

### Facilitator Checklist

☐ Prototype question defined  
☐ Fidelity ladder discussed  
☐ Materials / templates ready  
☐ User recruit list set  
☐ AI copy + bias check completed
