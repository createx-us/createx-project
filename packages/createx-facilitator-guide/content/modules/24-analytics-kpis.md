# Chapter 24: Analytics & KPIs

**Track:** Case Studies  
**Duration:** 45 min  
**Difficulty:** Advanced  
**Prerequisites:** Chapter 23

## Learning Objectives

- Master the measurement pyramid and core CreateX metrics
- Apply automated data collection and dashboard visualization techniques
- Understand ROI calculation and business case development
- Implement ethical analytics and statistical guardrails

## Overview

Analytics & KPIs transforms workshop activities into measurable impact through systematic data collection, visualization, and business case development that proves value to stakeholders and guides continuous improvement.

## 24.0 Why Measure?

If creativity is the engine, analytics is the dashboard. Data:

1. **Proves impact** to sponsors and skeptics
2. **Guides iteration** by spotlighting bottlenecks
3. **Scales learning** across the CreateX network

Well-chosen KPIs balance user value, business value, and learning velocity.

## 24.1 Measurement Pyramid

```
                    Impact
               (Strategic KPIs)
            -------------------------
           Adoption · Revenue · ROI
          -----------------------------
         Activation · Satisfaction
        ---------------------------------
       Creative Confidence · AoCC · CCD
      -------------------------------------
     Process Health (lead/timebox, NPS)
```

- **Base** = leading indicators you collect during workshops
- **Mid** = product & user metrics in pilot phase
- **Top** = organizational outcomes (e.g., ROI, ESG impact)

## 24.2 Core CreateX Metrics

| Acronym | Formula | Lens | Typical Target |
|---------|---------|------|----------------|
| **AoCC (Acts of Creative Confidence)** | Count of logged ideas, prototypes, tests | Individual/Team | +200 / workshop day |
| **CCD (Creative Confidence Delta)** | CCS-10 post – CCS-10 pre | Individual | ≥ +2.0 |
| **wNPS (Workshop NPS)** | % Promoters – % Detractors | Experience | ≥ +50 |
| **PPR (Prototype→Pilot Rate)** | # pilots / # top concepts | Delivery | ≥ 33% |
| **TtI (Time-to-Insight)** | Minutes from research start to first themed cluster | Velocity | –50% vs. baseline |
| **TtPilot** | Days from workshop end to live pilot | Agility | < 30 days |

## 24.3 Metric Collection Toolkit

| Stage | Instrument | Frequency | AI Assist |
|-------|------------|-----------|-----------|
| **Kickoff** | CCS-10 survey | Pre | Auto-scoring Google Form |
| **All Day** | AoCC logger (BoardX) | Real-time | Prompt to name each act |
| **End of Day** | wNPS + open feedback | Daily | GPT sentiment cluster |
| **Pilot** | Product analytics (Mixpanel / Metabase) | Continuous | LLM anomaly alerts |
| **Reflection** | AAR sticky notes | Post | Theme extraction macro |

## 24.4 Dashboards & Visualisation

| Layer | Tool | Best-Practices |
|-------|------|----------------|
| **Workshop Live** | BoardX KPI Board widget | Display AoCC & energy polls in room |
| **Pilot Dashboard** | Looker Studio | Blend SQL + Google Sheets; traffic-light KPI cards |
| **Portfolio View** | Airtable / Notion | One row per project; roll-up ROI & PPR |

**Quick-Start Template:** createx.us/kpi-dashboard-lookml

## 24.5 ROI & Business-Case Formulas

| Outcome | Formula | Notes |
|---------|---------|-------|
| **Hard ROI** | (Δ Revenue + Δ Cost Savings – Program Cost) / Program Cost | Use 6-month horizon default |
| **Payback Period** | Program Cost / Monthly Net Benefit | < 12 months ideal |
| **CO₂ Reduction per $** | (Baseline CO₂ – Pilot CO₂) / Pilot Cost | ESG reporting |

**AI Prompt:** "Given these baseline + pilot figures, calculate ROI, payback, and CO₂/$; output Markdown table."

## 24.6 Statistical & Ethical Guardrails

| Topic | Guardrail |
|-------|-----------|
| **Sample Size** | Power calc: N ≥ 16 per variant for α 0.05, d 0.8 when A/B testing micro-UX |
| **Data Privacy** | Pseudonymise user IDs; store sensitive logs ≤ 90 days |
| **Bias Audit** | Compare KPI deltas across demographic slices; flag > 15% gap |
| **Transparency** | Publish metric definitions and collection scripts in repo |

## 24.7 AI-Driven Insight Generation Workflow

1. **Extract** raw JSON logs (BoardX, Maze, Mixpanel)
2. **ETL** → cloud warehouse (BigQuery / Snowflake)
3. **GPT-SQL Agent** queries:
   - "List sessions where TtI > 45 min."
   - "Cluster comments by emotional tone."
4. **Auto-generate** KPI slides → push to Recap deck

**Guardrail:** Read-only service account; manual review before external share.

## 24.8 Benchmark Library (2023-25 CreateX Data)

| Metric | 25th % | Median | 75th % | Top 10% |
|--------|--------|--------|---------|---------|
| **AoCC/day** | 110 | 180 | 260 | 320 |
| **CCD** | +1.4 | +2.1 | +2.8 | +3.4 |
| **wNPS** | +38 | +55 | +68 | +78 |
| **PPR** | 18% | 34% | 52% | 66% |

**Use benchmarks to set stretch yet realistic targets; update semi-annually.**

## 24.9 Common Pitfalls & Fixes

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| **Vanity Metrics** | "Likes", "views" quoted | Tie to behavior or revenue; drop fluff |
| **Data Cemetery** | Metrics collected, never viewed | Automate daily email digest |
| **Over-Measuring** | Survey fatigue | Limit to most actionable KPIs; rotate long forms |
| **Attribution Fog** | Can't link workshop to ROI | Capture baseline before sprint; document assumptions |

## Key Takeaways

- **Align KPIs with pyramid layers**—process, confidence, adoption, impact
- **Automate capture** via BoardX & AI scripts, but validate edge cases manually
- **Benchmark against CreateX library** to frame success narratives
- **Use clear formulas** for ROI & payback to secure executive commitment
- **Ethical analytics** = privacy + bias monitoring + transparency

## 24.11 Field Notes & Further Reading

- **Book:** "Lean Analytics" (Croll & Yoskovitz)
- **Paper:** Stanford d.school (2024) "Measuring Creative Confidence at Scale"
- **Toolkit:** createx.us/toolkit/kpi-pack (survey forms, Looker templates, GPT-SQL snippets)
- **Podcast:** Data-In-Action — Ep. 31 "From Workshop Buzz to Boardroom Numbers"

## Facilitator Checklist

☐ Baseline metrics captured pre-workshop  
☐ AoCC logger activated  
☐ Dashboard link shared with sponsors  
☐ ROI calc script templated  
☐ Privacy & bias audit logged

## Reflection Questions

1. Which metrics from the measurement pyramid are most critical for demonstrating value in your context?
2. How will you balance comprehensive data collection with participant privacy and workshop flow?
3. What specific ROI calculations would be most compelling for your stakeholders?

## Further Resources

- **Measurement Framework:** Measurement pyramid, Core CreateX metrics, Benchmark library
- **Collection Systems:** Metric collection toolkit, Dashboard templates, AI-driven workflows
- **Business Impact:** ROI formulas, Business case development, Statistical guardrails
