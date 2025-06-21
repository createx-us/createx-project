# Chapter 22: Case Study: Non-Profit Social Impact Lab "Water4All"

**Track:** Case Studies  
**Duration:** 35 min  
**Difficulty:** Intermediate  
**Prerequisites:** Chapter 21

## Learning Objectives

- Analyze remote-only design thinking facilitation across multiple time zones
- Apply low-tech, high-impact solution development for resource-constrained contexts
- Understand community-driven development and trust-building strategies
- Implement ethical AI approaches for social impact initiatives

## Overview

Case Study: Non-Profit Social Impact Lab "Water4All" demonstrates how remote design thinking can address critical social challenges across global time zones, using accessible technology and community-centered approaches.

## 22.0 Snapshot

| Item | Detail |
|------|---------|
| **Initiative** | Water4All — grass-roots coalition tackling unsafe drinking water in informal settlements |
| **Format** | 3-day remote-only CreateX sprint across Cape Town, Mumbai, São Paulo & Manila (UTC ± 5 h spread) |
| **Challenge** | Give 18,000 low-income households actionable, real-time water-quality alerts without smartphones |
| **Participants** | 32 community volunteers, 6 NGO program leads, 4 municipal engineers, 3 data scientists |
| **Facilitators** | 3 CreateX leads (rotating time-zone coverage) |
| **Outcome Highlights** | • Launched SMS/USSD alert pilot → reached 18,213 households in 90 days<br>• CO₂-neutral sprint (100% virtual)<br>• Creative Confidence +3.1 (largest ∆ in 2025 data set) |

## 22.1 Context & Pre-Sprint Alignment

**Problem Nuance:** Many residents rely on feature phones; literacy levels vary  
**Data Source:** Municipal IoT sensors push hourly turbidity & E. coli metrics  
**Success KPI:** ≥ 60% households read alert within 2 h of hazard spike

**Scoping Highlights:**
- **Stakeholder Constellation Call (T-21 d)** set "water-quality alert within 30 min of threshold breach" as non-negotiable requirement
- **Accessibility Audit** ensured SMS content < 160-chars, plain language, dual-language (ENG + local)
- **Tech Charter** approved use of open-source LLM (Mistral 7B-Instruct) hosted on NGO server → no PII leaves region

## 22.2 Remote Sprint Agenda (3× 4-h windows)

| UTC Block | Major Activities | AI Assist | Output |
|-----------|------------------|-----------|---------|
| **Day 1 14:00–18:00** | Empathy mini-docs & AEIOU observation debriefs | Whisper + GPT summariser | 12 insight clusters |
| **Day 2 05:00–09:00** | HMW reframing · Brainwriting 6-3-5 · SCAMPER | Gemini ideation boost | 96 ideas, top 6 concepts |
| **Day 2 14:00–18:00** | Paper USSD flow · Quick Figma clickable | Galileo UI prompt-to-mock | 3 prototype paths |
| **Day 3 05:00–09:00** | Remote think-aloud (community reps) | Sentiment heat-map | Issue log, priority fixes |
| **Day 3 14:00–18:00** | Pilot Canvas · RACI · AAR recap deck | GPT recap deck | Pilot plan + recap deck |

**Time-Zone Tactic:** Two overlapping cohorts (Asia-Pac AM / Africa-LatAm PM) handed off artefacts via BoardX; asynchronous video diaries filled gaps.

## 22.3 Prototype & Pilot Results

**Concept:** USSD + SMS hybrid: users dial *120 code → receive local water risk score (green/yellow/red) plus simple mitigation tips (boil, filter, chlorinate)

**Wizard-of-Oz:** LLM answered USSD queries; NGO ops team sent SMS via Twilio

**90-Day Pilot Data (n = 18,213 households):**

| Metric | Target | Achieved | Notes |
|--------|--------|----------|-------|
| **Alert Open Rate (2 h)** | 60% | 74% | Auto-sent repeated SMS for non-opens |
| **Reported GI Cases (self-report)** | -10% | -14.7% | Correlation, not causal proof |
| **Cost / Household / yr** | <$0.50 | $0.31 | Bulk SMS discount |
| **Community Trust Index*** | Baseline 3.2 | 4.6 | Likert 1–5 (*proxy for perception) |

## 22.4 Creative Confidence Impact

| Region | CCS-10 Pre | CCS-10 Post | Δ |
|--------|------------|-------------|---|
| **Cape Town** | 5.2 | 8.5 | +3.3 |
| **Mumbai** | 5.9 | 9.1 | +3.2 |
| **São Paulo** | 6.1 | 9.0 | +2.9 |
| **Manila** | 5.4 | 8.6 | +3.2 |
| **Overall** | 5.7 | 8.8 | +3.1 |

**"I never guessed I could co-design tech from a rural kiosk."** — Community Volunteer, Western Cape

## 22.5 Lessons Learned

| Theme | Insight | Action |
|-------|---------|--------|
| **Low-Tech Wins** | USSD outranked smartphone app 4:1 in engagement | Default to lowest common tech early |
| **Language Simplicity** | Messages ≤ 120 chars had 12% higher open rate | Run readability checker (grade ≤ 5) |
| **Trust Anchors** | Including local health worker's name in SMS ↑ credibility | Add variable {local_contact} token in template |
| **Model Choice** | On-prem Mistral kept latency < 500 ms, alleviating privacy concerns | Maintain fine-tuned checkpoint for updates |

## 22.6 Replication Tips for NGOs

1. **Decentralize Facilitation** — Assign Regional Co-Leads to bridge time-zones & culture
2. **Pre-Translate Assets** — Load bilingual sticky note packs before sprint
3. **Leverage Community Radio** as backup broadcast; integrate in pilot scope
4. **Use Airtime Incentives** — Reward survey completion with micro-top-ups; 3× response rate

## 22.7 Toolkit Links

- **USSD flow Figma file**
- **SMS message library (15 languages)**
- **Mistral fine-tune recipe (.yaml)**
- **Impact dashboard template (Metabase)**

**(Bundle: createx.us/case-water4all)**

## Key Takeaways

- **Remote-only sprints can deliver high-stakes social impact** when handoff rituals & time-zone overlaps are engineered deliberately
- **Combining ultra-low-tech channels with on-prem AI** met accessibility and privacy demands simultaneously
- **Clear, early success metrics** (alert read-rate) kept diverse NGOs laser-focused
- **Community trust and creative confidence surged** when local volunteers co-led testing and messaging

## Facilitator Checklist Extract

☐ Time-zone hand-off schedule logged  
☐ Telecom partner pre-configured  
☐ Bilingual assets imported  
☐ On-prem model tested  
☐ Pilot KPI dashboard live

## Reflection Questions

1. How can you adapt remote facilitation techniques to bridge significant time zone and cultural differences?
2. What low-tech solutions might be more appropriate and accessible than high-tech alternatives in your context?
3. How will you build community trust and ensure local ownership in social impact initiatives?

## Further Resources

- **Remote Facilitation:** Time-zone coordination strategies, Asynchronous handoff protocols, Global team management
- **Social Impact Design:** Community-driven development, Trust-building frameworks, Accessible technology approaches
- **Ethical AI:** On-premises deployment, Privacy-preserving techniques, Community consent protocols
