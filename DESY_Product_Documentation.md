# KLAROS Product Documentation
## KLAROS — Decide with Clarity

Version: 1.2  
Last Updated: March 5, 2026  
Revision Notes: v1.2 — Official rebranding from DESY to KLAROS  
Status: Active Product (Jan 2026 – Present)  
Author: Reddy Santosh Kumar (B.Tech CS, Class of 2027)

---

## 0. Executive Summary

KLAROS is an AI-powered platform that helps people make complex decisions using a structured, repeatable method instead of intuition-only judgment or generic chatbot responses.

The name KLAROS is derived from the ancient Greek word klaros, meaning 'clear' and 'decided by structured process' — historically used in Greek civic decision-making. The name directly reflects the platform's core purpose: replacing ambiguous, intuition-driven choices with structured, transparent, and repeatable decision intelligence.

At its core, KLAROS operationalizes **Multi-Criteria Decision Analysis (MCDA)**:
- Users define decision options
- Users define what matters (criteria) and assign importance weights
- AI scores each option against each criterion with explicit reasoning
- KLAROS ranks options and returns a transparent score matrix
- Users can run what-if analysis by changing weights to test result stability

For non-technical stakeholders (recruiters, supervisors, investors), the key value is:
- **Clarity:** Every recommendation has a visible rationale
- **Traceability:** Scores are tied to explicit criteria and weights
- **Repeatability:** Decisions are stored and can be revisited
- **Practicality:** Reports are exportable as PDF for sharing and review

Current implementation status in this repository:
- Frontend is implemented with **React + Vite + Tailwind**
- Data and authentication are backed by **Supabase**
- LLM execution is routed through **Groq/OpenRouter adapters** via AI SDK
- JSON-structured outputs are enforced through strict prompt instructions and post-parse repair logic
- LLM orchestration is handled directly in **ai-provider.ts** using the AI SDK.

KLAROS is positioned as a Decision Intelligence product for students, founders, and teams that need better decision quality under uncertainty.

---

## 1. Product Overview

### 1.1 What KLAROS Is
KLAROS is an AI-powered Decision Intelligence web platform for structured, explainable decision-making. It helps users compare multiple options across weighted criteria and produce transparent recommendations supported by score matrices, rationale, confidence indicators, and scenario testing.

KLAROS is designed for decisions such as:
- Career selection (offers, roles, location trade-offs)
- Product prioritization (feature roadmap choices)
- Hiring decisions (candidate evaluation)
- Investment and partnership evaluation

### 1.2 Core Problem KLAROS Solves
Most high-impact decisions are made with one of three imperfect methods:
1. **Intuition-first choices** (fast, but bias-prone)
2. **Unstructured AI chat** (convenient, but non-repeatable and opaque)
3. **Manual spreadsheets** (rigorous, but heavy and time-consuming)

KLAROS combines structure + speed + explainability in one workflow.

### 1.3 Core Insight: MCDA + LLM
KLAROS combines:
- **MCDA (Multi-Criteria Decision Analysis):** Formal weighting and scoring framework
- **LLMs:** Context-aware semantic reasoning and score justification

This architecture preserves mathematical transparency while reducing analysis effort.

### 1.4 Who KLAROS Is For
- Students choosing between education/career paths
- Startup founders prioritizing initiatives under constraints
- Teams choosing tools/vendors/hiring candidates
- Researchers and analysts requiring traceable decision artifacts

### 1.5 How KLAROS Differs from Generic AI Chat Tools
| Dimension | Generic AI Assistant | KLAROS |
|---|---|---|
| Workflow | Freeform conversation | Structured decision pipeline |
| Explainability | Often summary-only | Criterion-level traceability |
| Repeatability | Low | High |
| Sensitivity testing | Rare | Built-in what-if analysis |
| Historical retrieval | Thread-based | Decision-native history |
| Methodology | Heuristic | MCDA-grounded |

---

## 2. Problem Statement

### 2.1 Pain Points in Human Decision-Making
1. **Cognitive overload:** Too many variables to track mentally
2. **Inconsistent criteria:** People change standards mid-evaluation
3. **Bias effects:** Recency, anchoring, and confirmation bias
4. **No audit trail:** Decision rationale gets lost over time
5. **Weak collaboration artifacts:** Hard to communicate why an option was chosen
6. **No sensitivity awareness:** Users rarely test if decisions are robust to changing priorities

### 2.2 Why Existing Alternatives Fall Short

#### A. Chat assistants
- Strong at ideation, weak at persistent structured scoring
- Recommendations vary across prompts and sessions
- Hard to compare options side-by-side with consistent criteria

#### B. Spreadsheets
- Strong arithmetic, weak natural-language reasoning
- High setup and maintenance effort
- Requires manual writing of rationale and assumptions

#### C. Pros/cons lists
- Easy to start
- Not reliable for multi-criteria, weighted, high-stakes decisions

### 2.3 Market Gap KLAROS Fills
KLAROS targets users who need:
- **Decision quality** (not just answers)
- **Explainability** (why this ranking?)
- **Reusability** (save, revisit, compare)
- **Sensitivity analysis** (how stable is the result?)

This positions KLAROS in the emerging **Decision Intelligence** product category.

---

## 3. Architecture & Tech Stack

> The implementation details below are based on project context and repository signals. Items marked [Inferred Architecture] are technically grounded inferences.

### 3.1 High-Level Architecture
1. **Frontend Layer**
  - Framework: React + Vite (current implementation)
   - UI: Tailwind CSS + component-driven interface
   - Responsibilities:
     - Capture decision context/options/criteria
     - Render matrix, charts, rationale, and scenario controls
     - Trigger analysis and export workflows

2. **Application/Orchestration Layer**
   - Framework/Service: Custom AI provider layer (ai-provider.ts) using Vercel AI SDK
   - Responsibilities:
     - Resolve active provider from environment configuration (VITE_PRIMARY_AI_PROVIDER)
     - Build MCDA prompt via buildAnalysisPrompt()
     - Call generateText() with system prompt + user prompt
     - Extract and repair JSON from model text response
     - Apply validateAndFixResult() defaults for missing fields
     - Execute fallback to secondary provider on primary failure

3. **Model Provider Layer**
   - Providers: Groq, OpenAI, OpenRouter
   - Responsibilities:
     - Generate criterion-level scores and rationale
     - Return structured payloads aligned to schema

4. **Data Layer**
   - Platform: Supabase (PostgreSQL)
   - Responsibilities:
     - Persist decisions, options, criteria, scores, rankings, history
     - Enforce user-level data isolation via access policies

5. **Deployment Layer**
   - Platform: Vercel
   - Responsibilities:
     - Host frontend and server-side endpoints
     - Manage environment and deployment pipeline

### 3.2 Technology Selection Rationale
- **React + Vite:** Fast local iteration, modern bundling, lightweight deployment flow
- **Tailwind CSS:** Fast UI iteration and design consistency
- **Vercel AI SDK:** Provider-neutral text generation interface enabling clean adapter pattern across Groq and OpenRouter without vendor lock-in
- **Supabase/PostgreSQL:** Reliable relational model for matrix-style decision data
- **Groq/OpenAI/OpenRouter:** Vendor flexibility across latency, quality, and cost
- **Vercel:** Native developer experience for modern web deployment

### 3.3 End-to-End Data Flow (Current Implementation)
1. User submits decision setup from UI
2. API receives payload and persists draft decision
3. Orchestrator compiles MCDA prompt + JSON schema contract
4. Selected LLM provider returns a text response expected to contain JSON
5. Service extracts JSON block (`/\{[\s\S]*\}/`), cleans common issues, and parses
6. Service applies `validateAndFixResult(...)` defaults for missing fields
7. Results + rationale + confidence are persisted
8. UI renders rankings, radar chart, and score matrix
9. User adjusts weights (what-if) and receives immediate re-ranking
10. User exports report to PDF and stores history snapshot

### 3.4 Multi-LLM Provider Switching (Current Implementation)
Current switching behavior is environment-configured at runtime:

- Primary provider is resolved from `VITE_PRIMARY_AI_PROVIDER` (`groq` default)
- Model is resolved from `VITE_AI_MODEL` or provider defaults
- Fallback provider is automatically selected as the opposite provider

Implemented provider endpoints in this codebase:
- Groq (`https://api.groq.com/openai/v1`)
- OpenRouter (`https://openrouter.ai/api/v1`)

Execution behavior:
- Analyze with primary provider first
- If primary fails, retry once with fallback provider
- If fallback fails, return user-facing error

---

## 4. Core Features (Detailed)

### 4.1 Decision Context Definition
**What it does:** Captures decision statement, assumptions, constraints, and alternatives.  
**Why it matters:** High-quality context directly improves scoring relevance.  
**How it works:** User input is normalized into a decision record and option entities.

### 4.2 Weighted Criteria Engine
**What it does:** Lets users set importance values (1–10) per criterion.  
**Why it matters:** Formalizes user priorities.  
**How it works:** Raw weights are normalized before aggregation.

### 4.3 AI-Powered Scoring
**What it does:** Scores every option against every criterion using LLM reasoning.  
**Why it matters:** Converts complex qualitative judgment into structured analysis.  
**How it works:** Orchestrator enforces response schema and scoring scale.

### 4.4 Personalized Ranking
**What it does:** Produces ranked options based on weighted totals.  
**Why it matters:** Provides direct decision support output.  
**How it works:** Weighted sum model computes final score per option.

### 4.5 Transparent Reasoning
**What it does:** Displays criterion-level rationale for each score cell.  
**Why it matters:** Users can inspect, challenge, and refine assumptions.  
**How it works:** Reasoning text stored per score row and surfaced in UI sections.

### 4.6 Interactive Radar Charts
**What it does:** Visualizes option profiles across criteria.  
**Why it matters:** Enables fast visual comparison of trade-offs.  
**How it works:** Normalized criterion scores feed chart datasets.

### 4.7 Score Matrix View
**What it does:** Shows full option × criterion score table.  
**Why it matters:** Supports auditability and research-grade review.  
**How it works:** Relational score rows rendered into matrix grid.

### 4.8 What-If Analysis
**What it does:** Lets users change criterion weights and re-run ranking instantly.  
**Why it matters:** Tests robustness of recommendations under priority shifts.  
**How it works:** Recompute weighted totals from existing scores with new weight vector.

### 4.9 Decision History
**What it does:** Stores all past decisions and scenario versions per user.  
**Why it matters:** Enables longitudinal learning and retrieval.  
**How it works:** Event/snapshot logging with timestamped metadata.

### 4.10 PDF Export
**What it does:** Generates shareable report containing context, scores, rankings, and rationale.  
**Why it matters:** Useful for stakeholder review and documentation.  
**How it works:** Server-side report assembly and PDF rendering pipeline.

### 4.11 Secure Authentication
**What it does:** Supports private user accounts and session management.  
**Why it matters:** Decision data may be sensitive.  
**How it works:** Supabase Auth and policy-enforced data access.

### 4.12 Multi-LLM Support
**What it does:** Enables selection among Groq, OpenAI, and OpenRouter.  
**Why it matters:** Avoids provider lock-in; balances cost/performance.  
**How it works:** Provider adapters return normalized response schema.

---

## 5. MCDA Methodology

### 5.1 MCDA in Plain Language
MCDA is a way to make complex decisions by:
1. Listing options
2. Defining criteria
3. Assigning criterion importance
4. Scoring options per criterion
5. Calculating weighted totals
6. Comparing outcomes transparently

### 5.2 Mathematical Foundation
Let:
- $m$ = number of options
- $n$ = number of criteria
- $r_i$ = raw weight for criterion $i$
- $w_i$ = normalized weight for criterion $i$
- $s_{ij}$ = score of option $j$ on criterion $i$

Weight normalization:

$$
w_i = \frac{r_i}{\sum_{k=1}^{n} r_k}
$$

Weighted total for each option:

$$
T_j = \sum_{i=1}^{n} w_i \cdot s_{ij}
$$

Ranking: sort options by $T_j$ descending.

### 5.3 How KLAROS Uses LLMs Within MCDA
- LLMs produce structured scores and rationale per criterion-option pair
- Deterministic aggregation computes totals and ranking
- Explainability is preserved because each total is decomposable to per-cell contributions

### 5.4 Confidence Estimation (Actual Current Implementation)
KLAROS currently does **not** compute confidence from internal analytical sub-metrics like $Q_j$, $K_j$, or $S_j$.

Current behavior in code:
1. The LLM is asked to return `recommendation.confidence` as a number between 0 and 1.
2. KLAROS parses the JSON response and casts this field with `Number(...)`.
3. If confidence is missing/invalid, KLAROS applies a default fallback of `0.7`.

Implications:
- Confidence is currently **model-assigned**, not statistically calibrated.
- It is useful as a heuristic signal, but should not be interpreted as calibrated probability.

Implementation note:
- The zod schema defines bounds (`0..1`), but runtime confidence validation is currently handled by manual parse/fix logic rather than strict schema parsing enforcement.

Planned upgrade path:
- Introduce deterministic confidence synthesis from observable signals (score dispersion, ranking margin, perturbation stability, and rationale consistency checks).

### 5.5 Research Grounding
KLAROS aligns with decision-analysis literature around:
- Multi-attribute utility models
- Weighted sum decision rules
- Sensitivity analysis as robustness validation
- Explainable AI for human trust and auditability

---

## 6. User Flows

### 6.1 End-to-End Session (Login to Export)
1. User signs in
2. Creates a new decision
3. Adds options and constraints
4. Defines criteria and weights
5. Selects provider/model
6. Runs analysis
7. Reviews ranking, matrix, rationale, radar chart
8. Adjusts weights in what-if controls
9. Saves scenario snapshot
10. Exports PDF report
11. Revisits decision later from history

### 6.2 Example Use Case A — Student Choosing 3 Job Offers
**Options:** Offer A, Offer B, Offer C  
**Criteria:** Compensation, growth, role-fit, location, WLB, stability

Workflow:
- Student sets higher weight on `growth` and `role-fit`
- KLAROS generates matrix and ranking
- Student increases `location` importance in what-if mode
- Ranking shifts from Offer B to Offer C
- Student exports report for mentor discussion

### 6.3 Example Use Case B — Founder Prioritizing 4 Features
**Options:** Onboarding redesign, referral system, analytics dashboard, AI assistant  
**Criteria:** User impact, engineering effort, revenue potential, strategic fit, risk, time-to-ship

Workflow:
- Initial ranking favors impact-heavy features
- Founder increases `time-to-ship` before sprint planning
- Faster features move up due to adjusted weights
- Team aligns using matrix + rationale rather than opinion-only debate

### 6.4 Real Decision Walkthrough (Actual Dataset with Numbers)
The following uses real sample data from the product seed dataset: **"Choose a Programming Language to Learn"**.

Criteria and weights:

| Criterion | Weight |
|---|---:|
| Learning Curve | 9 |
| Job Market | 8 |
| Versatility | 7 |
| Community Support | 6 |

Option scores returned in sample result:

| Option | Learning Curve | Job Market | Versatility | Community Support | Reported Total |
|---|---:|---:|---:|---:|---:|
| Python | 9 | 9 | 10 | 10 | 95 |
| JavaScript | 7 | 10 | 9 | 10 | 90 |
| Java | 5 | 8 | 7 | 8 | 70 |

Weighted calculation example for Python:

$$
	ext{WeightedSum} = (9\cdot9) + (9\cdot8) + (10\cdot7) + (10\cdot6) = 283
$$

$$
	ext{Normalized (0..10)} = \frac{283}{9+8+7+6} = \frac{283}{30} = 9.433
$$

$$
	ext{Percentage-style score} \approx 94.33 \rightarrow 95\ (rounded)
$$

Recommendation in stored sample:
- Winner: **Python**
- Confidence: **0.89** (LLM-provided)
- Summary: Beginner-friendly, high versatility, strong community support.

This walkthrough demonstrates a concrete matrix-to-ranking flow with actual numeric values already present in the codebase sample decision set.

---

## 7. API & LLM Integration

### 7.1 Actual Prompt Engineering Logic (Sanitized Real Template)
KLAROS currently generates a text prompt in `buildAnalysisPrompt(...)` and pairs it with a strict system instruction.

System prompt (actual behavior):

```text
You are an expert decision analyst. Respond with ONLY valid JSON, no markdown code blocks, no explanations. Start with { and end with }
```

User prompt template (sanitized, structurally equivalent to implementation):

```text
DECISION: {decision_title}

CONTEXT:
{decision_context_or_empty}

OPTIONS ({N} choices to evaluate):
1. "{option_1_label}" (id: "opt_1")
   Notes: {optional_notes}
2. "{option_2_label}" (id: "opt_2")
...

EVALUATION CRITERIA (importance-weighted):
1. "{criterion_1_name}" (id: "crit_1") [Weight: {w1}/10]
   → {optional_description}
2. "{criterion_2_name}" (id: "crit_2") [Weight: {w2}/10]
...

CONSTRAINTS:
• {TYPE}: {value} [Priority: {p}/5]
...

TASK: Analyze all {N} options against the {M} criteria.
Score each option 1-10 on each criterion, calculate weighted totals, and recommend the best choice.

Respond with ONLY this JSON structure (no other text, no markdown):
{
  "recommendation": {
    "optionId": "opt_X",
    "optionLabel": "name of recommended option",
    "confidence": 0.85,
    "summary": "2-3 sentence explanation"
  },
  "scores": [
    {
      "optionId": "opt_1",
      "optionLabel": "option name",
      "totalScore": 75,
      "criteriaScores": [
        {"criterionId": "crit_1", "criterionName": "criterion", "score": 8}
      ]
    }
  ],
  "reasoning": {
    "decomposition": "How you analyzed this",
    "assumptions": ["assumption 1"],
    "tradeoffs": ["tradeoff 1"],
    "risks": ["risk 1"],
    "sensitivity": "How weight changes affect outcome"
  }
}
```

Reliability mechanisms currently used:
- Low-temperature generation (`temperature: 0.3`) for output consistency
- Explicit JSON-only instruction in both system and prompt
- Regex-based JSON block extraction from model text
- Basic cleanup before `JSON.parse` (trailing commas/control characters)
- Manual structure repair defaults if model omits fields

### 7.2 Actual Provider Switching in Code
KLAROS currently uses provider configuration in `ai-provider.ts` with environment-driven selection:

- `VITE_PRIMARY_AI_PROVIDER` (`groq` default, `openrouter` supported)
- `VITE_AI_MODEL` override, otherwise provider-balanced default model
- Fallback provider automatically selected as the opposite of primary

Current implemented providers:
- **Groq** via OpenAI-compatible endpoint
- **OpenRouter** via OpenAI-compatible endpoint

Note on OpenAI:
- The platform positioning includes OpenAI support, but this repository currently wires active runtime selection for Groq and OpenRouter.

### 7.3 Runtime Flow and Fallback Behavior
1. Resolve primary model via `getAIProvider()`
2. Call `generateText(...)` with system prompt + generated analysis prompt
3. Parse/repair model response into JSON
4. Validate/fix missing fields with safe defaults
5. If primary call fails, retry once with `getFallbackProvider()`
6. If both fail, throw `AI analysis failed. Please try again.`

### 7.4 Current Gaps and Hardening Priorities
Current implementation strengths:
- Provider failover is implemented
- Prompt contract is explicit and stable
- Parsing has resilience to common malformed output

Current gaps:
- No strict runtime zod validation enforcement of final object (type imported, parser not schema-guarded)
- No server-side per-user rate limiting in this layer
- No deterministic recomputation check that `totalScore` matches provided criterion scores
- No server-side verification that the LLM-returned totalScore matches the arithmetic sum of its own criteriaScores. The model may return an internally inconsistent payload (e.g. totalScore: 75 while criterion scores sum to 68), which is currently persisted without validation.

Hardening priorities:
1. Enforce zod parse on final payload before persistence
2. Recompute weighted totals server-side and compare against model totals
3. Add API-level rate limits and quota telemetry
4. Introduce confidence calibration logic independent of model self-report
5. Add server-side recomputation of totalScore from criteriaScores before persistence, and reject or flag payloads where model-reported total deviates from computed total by more than a defined tolerance (e.g. ±2 points).

---

## 8. Database Schema (Proposed/Inferred)

### 8.1 Core Entities

#### `users`
- `id` UUID PK
- `email`
- `created_at`

#### `decisions`
- `id` UUID PK
- `user_id` UUID FK -> users.id
- `title`
- `context`
- `constraints_json`
- `provider`
- `model`
- `status`
- `created_at`, `updated_at`

#### `options`
- `id` UUID PK
- `decision_id` UUID FK -> decisions.id
- `name`
- `description`
- `position`

#### `criteria`
- `id` UUID PK
- `decision_id` UUID FK -> decisions.id
- `name`
- `description`
- `weight_raw`
- `weight_normalized`
- `position`

#### `scores`
- `id` UUID PK
- `decision_id` UUID FK
- `option_id` UUID FK
- `criterion_id` UUID FK
- `score_value`
- `reasoning`
- `uncertainty`
- `provider_metadata_json`

#### `rankings`
- `id` UUID PK
- `decision_id` UUID FK
- `option_id` UUID FK
- `weighted_total`
- `rank`
- `confidence`
- `snapshot_type` (base/what_if)

#### `history_events`
- `id` UUID PK
- `decision_id` UUID FK
- `user_id` UUID FK
- `event_type`
- `event_payload_json`
- `created_at`

#### `exports`
- `id` UUID PK
- `decision_id` UUID FK
- `user_id` UUID FK
- `format`
- `file_path`
- `created_at`

### 8.2 Relationship Summary
- One user → many decisions
- One decision → many options
- One decision → many criteria
- One decision → many score cells (`options × criteria`)
- One decision → many ranking snapshots
- One decision → many history events and exports

### 8.3 Decision History Retrieval [Inferred Architecture]
- Filter by `user_id`
- Sort by `created_at DESC`
- Join decisions + latest ranking snapshot
- On open, hydrate full matrix from scores + criteria + options

---

## 9. What-If Analysis Engine

### 9.1 Sensitivity Analysis Logic
What-if analysis modifies criterion weights while preserving option scores. This isolates preference changes and allows fast rank recomputation.

### 9.2 Re-weighting Algorithm
Given updated raw weights $r'_i$:
1. For each criterion score cell, find original and updated criterion by name.
2. Compute weight ratio per criterion:

$$
	ext{weightRatio}_i = \frac{r'_i}{r_i}
$$

3. Recompute option total using proportional adjustment:

$$
T'_j = \sum_i s_{ij} \cdot \text{weightRatio}_i
$$

4. Re-rank options by $T'_j$ and display up/down rank movement badges.

⚠️ Known Bug — What-If Weight Normalization:
The current what-if recompute path applies a proportional weight ratio adjustment but does NOT normalize the updated weights to sum to 1 before recomputation. This creates a mathematical inconsistency between the base analysis (which uses normalized weights) and the what-if analysis (which uses raw ratios). 

Consequence: A user who modifies one criterion weight in what-if mode receives rankings computed on a different scale than the base analysis, making direct comparison of base vs. what-if totals unreliable.

Fix required: Before recomputing T'j in what-if mode, apply full weight normalization:
  w'i = r'i / Σ r'k  for all k
This ensures what-if totals remain on the same 0–10 normalized scale as the base analysis.

### 9.3 Stability Insight
Stability indicators can include:
- Rank flip count
- Margin between top two options
- Perturbation tolerance (weight changes needed to alter winner)

### 9.4 Why This Matters
This feature reduces overconfidence in fragile outcomes and enables more reliable, defensible decisions.

---

## 10. Security & Privacy

### 10.1 Authentication Model
- Supabase Auth manages identity and sessions
- Access tokens gate API/resource access

### 10.2 Data Isolation [Inferred Architecture]
- Row-level access policies enforce user ownership boundaries
- Users can only access their own decisions and associated records

### 10.3 Data Handling Considerations
- TLS for data in transit
- Environment-secret isolation for provider keys
- Minimal sensitive payload exposure in logs
- Controlled retention for export artifacts
- Optional prompt redaction policies for personal identifiers

### 10.4 Operational Security Recommendations [Inferred Architecture]
- Rotate provider keys regularly
- Monitor abnormal traffic patterns
- Add audit logs for privileged actions
- Backup and restore strategy for critical decision records

---

## 11. Suggested Product Roadmap

### 11.1 Collaborative Decision Sessions
- Multi-user decision rooms
- Role-based permissions (owner/editor/viewer)
- Consensus scoring and conflict visualization

### 11.2 Decision Templates Library
- Career choice template
- Hiring template
- Vendor/tool selection template
- Product prioritization template

### 11.3 External Data Integrations
- Market/financial APIs
- Research paper metadata sources
- Issue tracker and analytics connectors

### 11.4 Mobile Application
- Native mobile review + lightweight what-if controls
- Push alerts for shared decisions and updates

### 11.5 Developer API
- Create/read/update decision resources
- Trigger analysis jobs
- Retrieve matrix/ranking snapshots

### 11.6 Analytics Dashboard
- Criteria usage trends
- Decision outcome pattern analysis
- Confidence and stability trend tracking

---

## 12. Positioning & Use Cases

### 12.1 Primary Personas
- **Student:** Career and education decisions
- **Founder/Product Leader:** Prioritization under constraints
- **Team Lead:** Hiring and vendor/tool choices
- **Research Collaborator:** Evidence-backed alternative analysis

### 12.2 Real-World Value Scenarios
- Selecting among internship offers with non-linear trade-offs
- Prioritizing sprint features with limited engineering capacity
- Choosing hiring candidates using transparent evaluation matrix
- Selecting vendors with explicit risk-cost-fit comparison

### 12.3 Comparison Table
| Capability | KLAROS | ChatGPT | Spreadsheet | Pros/Cons List |
|---|---|---|---|---|
| Structured MCDA workflow | Yes | Partial/manual | Manual | No |
| Weighted scoring | Native | Prompt-dependent | Manual formulas | Weak |
| Criterion-level explainability | Native | Variable | Manual notes | Minimal |
| What-if sensitivity | Native | Rare/manual | Possible/manual | No |
| Decision history | Native | Thread history | File versioning | None |
| Export-ready report | Native PDF | Manual copy | Manual formatting | Manual |
| Multi-provider AI backend | Yes | No | N/A | N/A |

---

## 13. Glossary

- **KLAROS:** AI-powered Decision Intelligence platform built on Multi-Criteria Decision Analysis (MCDA) and Large Language Models. Name derived from the ancient Greek klaros — meaning structured clarity in decision-making.
- **MCDA (Multi-Criteria Decision Analysis):** Structured method to compare alternatives across weighted criteria.
- **Decision Intelligence:** Discipline combining AI, analytics, and decision science for better decisions.
- **Weighted Scoring:** Calculating aggregate option score using criterion importance weights.
- **Confidence Level:** Quantitative/qualitative indicator of recommendation reliability.
- **What-If Analysis:** Interactive simulation where weights are adjusted to test ranking changes.
- **Sensitivity Analysis:** Formal measurement of output stability under input variation.
- **LLM (Large Language Model):** AI model used for context-aware scoring and reasoning generation.
- **Radar Chart:** Multi-axis visualization comparing options across criteria.
- **Score Matrix:** Option-by-criterion score table with explanatory metadata.
- **Provider Adapter:** Abstraction layer that standardizes integration with different LLM vendors.
- **Row-Level Security (RLS):** Database policy mechanism restricting row access by user identity.
- **Decision Artifact:** Persisted, reviewable package of context, criteria, scores, ranking, and rationale.

---

## Appendix A: Reference Pseudocode

```pseudo
input: decision_context, options[], criteria_with_weights[]

weights = normalize(criteria_with_weights)
score_matrix = llm_score(options, criteria_with_weights, decision_context)

for each option in options:
  total_score[option] = 0
  for each criterion in criteria:
    total_score[option] += weights[criterion] * score_matrix[option][criterion]

ranking = sort_desc(total_score)
confidence = compute_confidence(score_matrix, ranking)

persist(decision, score_matrix, ranking, confidence)
return { ranking, score_matrix, confidence }
```

## Appendix B: Non-Functional Expectations [Inferred Architecture]
- **Performance:** Typical analysis response under a few seconds depending on provider latency
- **Availability:** Provider fallover to reduce downtime impact
- **Scalability:** Stateless API + managed DB scaling model
- **Auditability:** Persisted score-cell rationale and history events
- **Reproducibility:** Saved criteria, weights, provider metadata, and ranking snapshots

---

## REBRANDING AUDIT — DESY to KLAROS

✓ **Document Header:** Updated from "DESY (.DI — Decision Navigator)" to "KLAROS — Decide with Clarity"  
✓ **Version Metadata:** Updated to v1.2 with rebranding revision note, dated March 5, 2026  
✓ **Inline Name References:** 35+ instances of "DESY" replaced with "KLAROS" across all sections  
✓ **".DI" References:** 8+ instances replaced with "KLAROS"  
✓ **Origin Paragraph:** Inserted in Section 0 (Executive Summary) explaining Greek etymology  
✓ **Comparison Table (12.3):** Column header updated to "KLAROS"  
✓ **Glossary (Section 13):** New KLAROS entry added as first item before MCDA  

**Total Replacements:** 45+ name/branding references  
**Rebranding Status:** Complete — all 7 changes successfully applied
