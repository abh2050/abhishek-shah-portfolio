import type { Project } from "./types";
export const projects: Project[] = [
  {
    "slug": "enterprise-rag-aws",
    "title": "Enterprise RAG on AWS",
    "category": "Enterprise AI",
    "kicker": "Permissions travel with the answer.",
    "summary": "Hybrid retrieval and document lifecycle controls, with authoritative access checks before evidence reaches a model.",
    "status": "Recorded AWS deployment",
    "stack": [
      "AWS Bedrock",
      "OpenSearch",
      "DynamoDB",
      "FastAPI"
    ],
    "visuals": [
      "rag-system",
      "rag-auth"
    ],
    "metrics": [
      "rag-eval",
      "rag-scenarios",
      "rag-lifecycle"
    ],
    "cardFinding": "Recorded AWS verification on synthetic documents. Dev stack now torn down.",
    "problem": "Knowledge workers need useful answers without letting stale permissions, cached responses, or replaced documents leak information. Search quality is only one part of that problem.",
    "contribution": "Built the research interface, API, hybrid retrieval, document-ingestion pipeline, bounded model gateway, and modular AWS infrastructure. The recorded dev deployment exercised actual Bedrock calls and managed data stores.",
    "architecture": "OpenSearch retrieves candidates; DynamoDB remains authoritative for permissions and the current document version. A checkpointed ingestion workflow stages revisions before publication. The model gateway checks classification, routes requests, and bounds retries and spend.",
    "decisions": [
      {
        "title": "Recheck access after retrieval",
        "body": "Search filters narrow the candidate set, but index metadata can lag behind a revocation. The retriever rechecks each candidate against DynamoDB before reranking or generation, and uses the authoritative sensitivity label.",
        "path": "packages/rag/erp_rag/retrieval.py",
        "source": "https://github.com/abh2050/enterprise-rag-aws/blob/e7a4f5b08c35ffa666e4c1d45b47208c6a96462a/packages/rag/erp_rag/retrieval.py"
      },
      {
        "title": "Keep fixture and live evaluation separate",
        "body": "Deterministic fixtures test control flow cheaply. They cannot establish model quality. The portfolio uses the live AWS evidence and does not turn mixed cached latency into a fresh-generation benchmark.",
        "path": "docs/verification/README.md",
        "source": "https://github.com/abh2050/enterprise-rag-aws/blob/e7a4f5b08c35ffa666e4c1d45b47208c6a96462a/docs/verification/README.md"
      }
    ],
    "protocol": "The live report records synthetic document and principal identities inside an AWS job. Separate deterministic fixture runs exist, but their dataset and inference paths differ; this is not a controlled model comparison.",
    "tradeoffs": [
      "Authoritative checks add datastore reads but make access revocation independent of search-index cleanup.",
      "Hybrid retrieval supports lexical identifiers and semantic queries; no controlled lexical-only versus hybrid quality uplift is claimed.",
      "The dev environment prioritized inspectability and cost over production high availability."
    ],
    "limitations": [
      "The AWS dev stack was destroyed after verification; the linked page is documentation, not an active model service.",
      "Real Entra sign-in, Graph overage, SharePoint, and Purview integrations remain unverified.",
      "The judge is uncalibrated. Valid citation references do not prove the answer is correct.",
      "Production load, full restore drills, and remediation of recorded container findings remain open."
    ],
    "production": "Validate identity and Microsoft integrations with a real tenant, calibrate against human-reviewed examples, exercise restore and concurrent load, address container findings, and agree on operational ownership and service objectives.",
    "viewer": "https://abh2050.github.io/enterprise-rag-aws/",
    "viewerLabel": "Project documentation",
    "evidencePath": "docs/verification/README.md",
    "repository": "https://github.com/abh2050/enterprise-rag-aws",
    "sha": "e7a4f5b08c35ffa666e4c1d45b47208c6a96462a",
    "reviewed": "2026-10-01",
    "evidenceUrl": "https://github.com/abh2050/enterprise-rag-aws/blob/e7a4f5b08c35ffa666e4c1d45b47208c6a96462a/docs/verification/README.md"
  },
  {
    "slug": "yieldloop-wafer-triage-with-HIL",
    "title": "YieldLoop",
    "category": "Industrial ML",
    "kicker": "Know when to ask an engineer.",
    "summary": "Calibrated wafer classification with active learning, blind review, and evidence-constrained root-cause hypotheses.",
    "status": "Evaluated prototype",
    "stack": [
      "PyTorch",
      "FastAPI",
      "PostgreSQL",
      "React"
    ],
    "visuals": [
      "yieldloop-review",
      "yieldloop-loop"
    ],
    "metrics": [
      "yield-f1",
      "yield-accuracy",
      "yield-routing"
    ],
    "cardFinding": "Lot-separated holdout. Derived process events are not observed fab telemetry.",
    "problem": "Wafer-map volume exceeds engineering review capacity, while rare defect classes carry the most useful signal. Confident but incorrect suggestions can also bias the humans providing new labels.",
    "contribution": "Implemented the classifier, calibration, confidence-based routing, entropy-and-diversity sampler, keyboard review console, audit trail, and guarded hypothesis path. Reviewer labels return to training without crossing dataset splits.",
    "architecture": "A local CNN classifies wafer maps. Postgres stores review decisions, provenance, and the audit trail. The language-model path receives a retrieved evidence bundle rather than wafer images; grounding checks gate its returned hypotheses.",
    "decisions": [
      {
        "title": "Withhold predictions below the confidence floor",
        "body": "The routing function distinguishes auto-commit, visible-prediction review, and blind review. The low-confidence API omits prediction fields so the interface cannot accidentally expose them. Reviewer decisions record which regime was visible.",
        "path": "src/yieldloop/guardrails/thresholds.py",
        "source": "https://github.com/abh2050/yieldloop-wafer-triage-with-HIL/blob/a635a3f71abf2416b08cb1a7b9fc669f8dca16a3/src/yieldloop/guardrails/thresholds.py"
      },
      {
        "title": "Reject unsupported hypotheses whole",
        "body": "Every cited evidence ID must belong to the retrieved context. A hypothesis with an unresolved reference is dropped rather than repaired by removing its bad citation. If no hypothesis survives, the system abstains.",
        "path": "src/yieldloop/guardrails/grounding.py",
        "source": "https://github.com/abh2050/yieldloop-wafer-triage-with-HIL/blob/a635a3f71abf2416b08cb1a7b9fc669f8dca16a3/src/yieldloop/guardrails/grounding.py"
      }
    ],
    "protocol": "Training, calibration, and holdout are separated by lot. Temperature scaling is fit on validation. Active learning is compared with random acquisition at matched label budgets and a shared seed; the initial seed set is identical.",
    "tradeoffs": [
      "A small spatial CNN keeps iteration practical; calibrated confidence governs review load.",
      "Entropy plus embedding diversity avoids spending an entire labeling round on near-duplicates.",
      "Conservative grounding sacrifices coverage; it checks reference validity rather than causal truth."
    ],
    "limitations": [
      "WM811K supplies wafer maps and labels, not observed tool, chamber, recipe, or production-timestamp telemetry. Derived process events are explicitly marked.",
      "The hypothesis evaluation lacks reviewer resolutions, so root-cause precision is unmeasured.",
      "Reviewer decisions are too few and incomplete across visibility regimes to establish an anchoring effect.",
      "Recorded holdout performance does not establish generalization to another fab or acquisition process."
    ],
    "production": "Validate against site-specific wafer maps, collect enough independent reviewer decisions, evaluate actual root-cause outcomes, and agree on thresholds, reviewer ownership, and drift responses before production use.",
    "viewer": "https://abh2050.github.io/yieldloop-wafer-triage-with-HIL/",
    "viewerLabel": "Project diagrams",
    "evidencePath": "eval_report.md",
    "repository": "https://github.com/abh2050/yieldloop-wafer-triage-with-HIL",
    "sha": "a635a3f71abf2416b08cb1a7b9fc669f8dca16a3",
    "reviewed": "2026-10-01",
    "evidenceUrl": "https://github.com/abh2050/yieldloop-wafer-triage-with-HIL/blob/a635a3f71abf2416b08cb1a7b9fc669f8dca16a3/eval_report.md"
  },
  {
    "slug": "edge-ai-inspection-gates",
    "title": "Edge AI Inspection Gates",
    "category": "Edge vision",
    "kicker": "Fast enough is only the first gate.",
    "summary": "Measured vision inference on Apple silicon, evaluated against recall, sustained latency, and quality-cost constraints.",
    "status": "Research experiment",
    "stack": [
      "ONNX Runtime",
      "Python",
      "CoreML",
      "Apple silicon"
    ],
    "visuals": [
      "edge-summary",
      "edge-latency"
    ],
    "metrics": [
      "edge-latency",
      "edge-recall",
      "edge-cost"
    ],
    "cardFinding": "Latency passed; frozen-threshold recall failed. Commercial release remains unqualified.",
    "problem": "An inspection model must meet the line cycle and catch enough defects without scrapping too many good parts. A fast microbenchmark alone cannot justify placing it on a production line.",
    "contribution": "Built the anomaly-detector export path, precision parity checks, hardware measurement harness, sustained-run protocol, expected-cost analysis, and read-only evidence dashboard. Measurements are preserved with artifact hashes.",
    "architecture": "Acceptance gates link dataset provenance, model export, accuracy, provider placement, sustained timing, and cost selection. The dashboard reads recorded results. The optional agent is outside inference timing and factory actuation.",
    "decisions": [
      {
        "title": "Measure placement instead of trusting provider availability",
        "body": "CoreML availability did not establish Neural Engine execution. Placement and power evidence left those rows diagnostic, preventing a provider label from becoming an unsupported acceleration claim.",
        "path": "docs/decisions/0007-coreml-diagnostic-provider.md",
        "source": "https://github.com/abh2050/edge-ai-inspection-gates/blob/84d9fc9c21e82f36634d0e27062590e2b6fdb565/docs/decisions/0007-coreml-diagnostic-provider.md"
      },
      {
        "title": "Separate a research threshold from qualification",
        "body": "The cost curve reuses cached test predictions. Its selected threshold is explicitly retrospective. A customer release requires new validation and untouched acceptance data.",
        "path": "docs/decisions/0003-evaluation-and-cost.md",
        "source": "https://github.com/abh2050/edge-ai-inspection-gates/blob/84d9fc9c21e82f36634d0e27062590e2b6fdb565/docs/decisions/0003-evaluation-and-cost.md"
      }
    ],
    "protocol": "Batch-one measurements cover preprocessing, synchronous inference, and postprocessing on decoded images. Warmup is excluded. Sustained runs use fixed pacing and report each minute’s p99, missed deadlines, and thermal observations.",
    "tradeoffs": [
      "Quantized and mixed-precision artifacts are measured independently; performance is not inferred from bit width.",
      "The maximum-F1 comparator and constrained cost rule selected equivalent points in this run, so no superiority claim is justified.",
      "The frozen validation threshold is a separate result from the retrospective research operating point."
    ],
    "limitations": [
      "Frozen-threshold recall misses the configured floor; the selected retrospective point has a high false-reject rate.",
      "Economics are illustrative assumptions, not customer-line measurements.",
      "Neural Engine execution was not observed. Results cover one host and one dataset category.",
      "MVTec AD is noncommercial research data. Customer data rights, independent validation, production signing, and shift-soak acceptance remain unresolved."
    ],
    "production": "Use customer-owned data, choose a threshold on independent validation, measure the full camera-to-actuator cycle, implement production signing, and pass untouched customer acceptance and shift-soak tests.",
    "viewer": "https://abh2050.github.io/edge-ai-inspection-gates/",
    "viewerLabel": "Results dashboard",
    "evidencePath": "docs/scorecard.md",
    "repository": "https://github.com/abh2050/edge-ai-inspection-gates",
    "sha": "84d9fc9c21e82f36634d0e27062590e2b6fdb565",
    "reviewed": "2026-10-01",
    "evidenceUrl": "https://github.com/abh2050/edge-ai-inspection-gates/blob/84d9fc9c21e82f36634d0e27062590e2b6fdb565/docs/scorecard.md"
  },
  {
    "slug": "sentinel-ai",
    "title": "Sentinel AI",
    "category": "Agent reliability",
    "kicker": "Investigate. Validate. Let a human decide.",
    "summary": "Correlated telemetry becomes an inspectable investigation, sandbox-tested patch, and human-gated pull request.",
    "status": "Working demonstrator",
    "stack": [
      "FastAPI",
      "Python",
      "React",
      "Telemetry"
    ],
    "visuals": [
      "sentinel-incident",
      "sentinel-review"
    ],
    "metrics": [
      "sentinel-latency",
      "sentinel-policy",
      "sentinel-remediation"
    ],
    "cardFinding": "Default traffic, monitored service, and pull requests are simulated.",
    "problem": "A retrieval service can remain available while cost, latency, and answer quality deteriorate together. Engineers need the context behind the regression and a reviewable change—not just another alarm.",
    "contribution": "Implemented canonical telemetry ingestion, correlated anomaly detection, diagnosis, deterministic remediation, sandbox validation, policy checks, and a review interface. Real integration paths exist alongside explicit demonstration defaults.",
    "architecture": "Telemetry sources converge into a validated canonical stream. The investigation follows detection, diagnosis, remediation, validation, and PR creation. Each action checks policy; deployment approval remains outside agent authority.",
    "decisions": [
      {
        "title": "Enforce permission at the action boundary",
        "body": "The policy enforcer permits investigation and pull-request creation while refusing autonomous merge, deployment, and unknown actions. It records the decision. This does not replace authenticating the person making a human-authorized request.",
        "path": "sentinel_core/safety_policy.py",
        "source": "https://github.com/abh2050/sentinel-ai/blob/cdcce69650180b588c5f0a01851736248683c2f3/sentinel_core/safety_policy.py"
      },
      {
        "title": "Patch only the known configuration contract",
        "body": "The remediation implementation updates both field declarations and reset defaults. It returns no change when expected patterns are absent or the fix is already applied, avoiding a misleading empty pull request.",
        "path": "sentinel_core/agents/remediation_agent.py",
        "source": "https://github.com/abh2050/sentinel-ai/blob/cdcce69650180b588c5f0a01851736248683c2f3/sentinel_core/agents/remediation_agent.py"
      }
    ],
    "protocol": "The published incident contrasts healthy, injected-fault, and remediated behavior inside the demo simulator. Sandbox validation runs the actual test suite, but simulated before/after metrics do not establish performance against real production traffic.",
    "tradeoffs": [
      "Sequential stages make dependencies and approval boundaries clear.",
      "Read-only diagnosis tools constrain the effect of a mistaken model explanation.",
      "Deterministic patching is inspectable but intentionally narrower than arbitrary code repair."
    ],
    "limitations": [
      "The default RAG service, traffic, and incident injection are simulated; PRs are simulated unless GitHub is configured.",
      "Remediation supports a known parameter set, not arbitrary incident classes.",
      "Incident state and metric windows are in memory; the deployment guide requires a single instance.",
      "Application policy is not a substitute for authenticated users, least-privilege integration credentials, or protected branches."
    ],
    "production": "Connect actual telemetry, tune baselines to real traffic, persist incident state, enforce authenticated human review, and validate remediation against the target service before enabling real PR creation.",
    "viewer": null,
    "viewerLabel": null,
    "evidencePath": "DEPLOYMENT.md",
    "repository": "https://github.com/abh2050/sentinel-ai",
    "sha": "cdcce69650180b588c5f0a01851736248683c2f3",
    "reviewed": "2026-10-01",
    "evidenceUrl": "https://github.com/abh2050/sentinel-ai/blob/cdcce69650180b588c5f0a01851736248683c2f3/DEPLOYMENT.md"
  },
  {
    "slug": "fault-triage-ai",
    "title": "Fault Triage AI",
    "category": "Industrial ML",
    "kicker": "Make the evidence stronger than the explanation.",
    "summary": "Deterministic process measurements and bounded agents, tested against simpler diagnosis and soft-sensor baselines.",
    "status": "Evaluated research system",
    "stack": [
      "Python",
      "scikit-learn",
      "Pydantic",
      "React"
    ],
    "visuals": [
      "fault-architecture",
      "fault-workflow"
    ],
    "metrics": [
      "fault-ranker",
      "fault-chain",
      "fault-sensor"
    ],
    "cardFinding": "The agent chain did not beat the deterministic diagnosis baseline.",
    "problem": "A process operator needs to know what changed, which fault is plausible, and whether a product-quality estimate remains trustworthy. A convincing explanation is useful only if its measurements and limits are inspectable.",
    "contribution": "Built a run-separated simulation-data pipeline, detection and diagnosis models, soft sensors, deterministic evidence tools, bounded investigation agents, evaluation records, and a static results explorer.",
    "architecture": "Offline training and deterministic tools produce measurements. Agents interpret tool outputs through typed contracts. Selected copied measurements are validated before the incident report is exported as static JSON for the browser. The system has no plant-control connection.",
    "decisions": [
      {
        "title": "Keep arithmetic in deterministic tools",
        "body": "Agents receive finished measurements. Reported detection delay, envelope distance, and residuals are checked against tool values. Mismatches fail the incident instead of becoming plausible prose.",
        "path": "docs/adr/0004-agents-do-not-compute.md",
        "source": "https://github.com/abh2050/fault-triage-ai/blob/cebf685a09eda62890d7af809bb02ab0e1e82721/docs/adr/0004-agents-do-not-compute.md"
      },
      {
        "title": "Split complete simulation runs",
        "body": "Neighboring process observations are correlated. Assigning entire run identifiers to a split prevents the model from seeing nearly the same trajectory during both training and evaluation.",
        "path": "docs/adr/0001-run-level-split.md",
        "source": "https://github.com/abh2050/fault-triage-ai/blob/cebf685a09eda62890d7af809bb02ab0e1e82721/docs/adr/0001-run-level-split.md"
      }
    ],
    "protocol": "Evaluation uses Tennessee Eastman process simulation runs held apart from training and calibration. Diagnosis is scored at the defined post-onset investigation window; end-of-run classification is a different task and cannot be substituted as its baseline.",
    "tradeoffs": [
      "The agent layer adds structured records and inspectability, but its final diagnosis accuracy is lower than the ranker.",
      "A physical constraint reduces relative out-of-envelope degradation while worsening in-envelope error. Neither soft sensor beats the mean baseline.",
      "Selective corroboration is a possible next experiment, not an implemented improvement."
    ],
    "limitations": [
      "Inputs are historical process simulation data, not production plant telemetry.",
      "The agent workflow did not improve diagnosis accuracy; the quality estimators did not beat a simple baseline.",
      "No live ingestion, plant-control integration, prospective operator trial, or operational saving is established.",
      "A hash chain helps detect changes but does not protect against rewriting the entire ledger."
    ],
    "production": "Establish useful estimator performance, validate on site-specific data, test selective agent involvement, and define an authenticated operator workflow with prospective evaluation before operational adoption.",
    "viewer": "https://abh2050.github.io/fault-triage-ai/",
    "viewerLabel": "Results explorer",
    "evidencePath": "docs/gates.md",
    "repository": "https://github.com/abh2050/fault-triage-ai",
    "sha": "cebf685a09eda62890d7af809bb02ab0e1e82721",
    "reviewed": "2026-10-01",
    "evidenceUrl": "https://github.com/abh2050/fault-triage-ai/blob/cebf685a09eda62890d7af809bb02ab0e1e82721/docs/gates.md"
  },
  {
    "slug": "mlx-sft-pubmedqa",
    "title": "MLX SFT on PubMedQA",
    "category": "Model engineering",
    "kicker": "Train locally. Evaluate beyond the loss curve.",
    "summary": "On-device LoRA fine-tuning with held-out comparisons, checkpoint analysis, and explicit memory and class-level limitations.",
    "status": "Research experiment",
    "stack": [
      "MLX",
      "LoRA",
      "Qwen",
      "Apple silicon"
    ],
    "visuals": [
      "mlx-accuracy",
      "mlx-checkpoints"
    ],
    "metrics": [
      "mlx-base",
      "mlx-lora",
      "mlx-time"
    ],
    "cardFinding": "Test accuracy improved, but the maybe class remains unlearned.",
    "problem": "Can a small local language model learn a domain-specific classification task within a laptop memory budget—and do lower validation losses actually identify better task checkpoints?",
    "contribution": "Ran local supervised LoRA training, deterministic evaluation, checkpoint comparisons, and memory instrumentation. Published accuracy, class-level metrics, confusion matrices, loss curves, and the split contract.",
    "architecture": "Committed dataset splits feed a completion-masked training pipeline. MLX trains adapters locally; a deterministic generation-and-parsing evaluator scores answers. Checkpoint selection analysis uses validation, while final configurations receive held-out test evaluation.",
    "decisions": [
      {
        "title": "Track task accuracy separately from token loss",
        "body": "The output combines a decision and rationale. Token loss evaluates the sequence, while accuracy evaluates the decision. The recorded checkpoint sweep shows that the two signals need not select the same checkpoint.",
        "path": "results/checkpoint_sweep.json",
        "source": "https://github.com/abh2050/mlx-sft-pubmedqa/blob/33771f9271cb4110e049dbc50189c3902799fe64/results/checkpoint_sweep.json"
      },
      {
        "title": "Use completion masking and bounded memory",
        "body": "The training path masks prompt tokens and supports gradient accumulation and cache clearing. This makes the experiment feasible locally without treating memory measurements as portable hardware guarantees.",
        "path": "src/train.py",
        "source": "https://github.com/abh2050/mlx-sft-pubmedqa/blob/33771f9271cb4110e049dbc50189c3902799fe64/src/train.py"
      }
    ],
    "protocol": "PubMedQA examples are assigned to fixed training, validation, and test splits with a shared seed. Base and adapter configurations use greedy decoding and the same answer parser. Each final configuration is tested separately; the checkpoint sweep uses validation only.",
    "tradeoffs": [
      "Small-model training makes local experimentation practical but limits the reasoning capacity being evaluated.",
      "Increasing adapter capacity did not improve held-out accuracy in this experiment.",
      "A parser keeps scoring reproducible, but a changed prompt or response format needs validation."
    ],
    "limitations": [
      "The maybe class has zero F1 across recorded configurations. Higher aggregate accuracy does not mean all labels were learned.",
      "A single seed and a small test sample do not establish statistical significance or generalization.",
      "The task is biomedical question classification, not a validated clinical decision tool.",
      "Training and evaluation memory figures are specific to the recorded Apple hardware and software."
    ],
    "production": "Repeat across seeds, address class imbalance, measure uncertainty, and validate on a representative target dataset. Any clinical application would require a separate domain-specific evaluation and governance process.",
    "viewer": null,
    "viewerLabel": null,
    "evidencePath": "results/metrics.json",
    "repository": "https://github.com/abh2050/mlx-sft-pubmedqa",
    "sha": "33771f9271cb4110e049dbc50189c3902799fe64",
    "reviewed": "2026-10-01",
    "evidenceUrl": "https://github.com/abh2050/mlx-sft-pubmedqa/blob/33771f9271cb4110e049dbc50189c3902799fe64/results/metrics.json"
  }
];
