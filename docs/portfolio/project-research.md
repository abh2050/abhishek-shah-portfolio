# Project research

Six repositories were investigated at the commits below (checkouts kept outside the portfolio). Each case study links to evidence at that exact commit. Generated from `src/content/projects.ts` and `docs/portfolio/research-lock.json`.

| # | Project | Status label | Commit | License | Claims | Figures |
|---|---|---|---|---|---|---|
| 1 | [Enterprise RAG on AWS](https://github.com/abh2050/enterprise-rag-aws) | Recorded AWS deployment | `e7a4f5b08c35` | none declared | 3 | 2 |
| 2 | [YieldLoop](https://github.com/abh2050/yieldloop-wafer-triage-with-HIL) | Evaluated prototype | `a635a3f71abf` | NOASSERTION | 3 | 2 |
| 3 | [Edge AI Inspection Gates](https://github.com/abh2050/edge-ai-inspection-gates) | Research experiment | `84d9fc9c21e8` | none declared | 3 | 2 |
| 4 | [Sentinel AI](https://github.com/abh2050/sentinel-ai) | Working demonstrator | `cdcce6965018` | Apache-2.0 | 3 | 2 |
| 5 | [Fault Triage AI](https://github.com/abh2050/fault-triage-ai) | Evaluated research system | `cebf685a09ed` | none declared | 3 | 2 |
| 6 | [MLX SFT on PubMedQA](https://github.com/abh2050/mlx-sft-pubmedqa) | Research experiment | `33771f9271cb` | none declared | 3 | 2 |

## Enterprise RAG on AWS

*Permissions travel with the answer.* — Hybrid retrieval and document lifecycle controls, with authoritative access checks before evidence reaches a model.

- **Status:** Recorded AWS deployment · viewer: Project documentation (https://abh2050.github.io/enterprise-rag-aws/)
- **Stack:** AWS Bedrock, OpenSearch, DynamoDB, FastAPI
- **Evidence:** [docs/verification/README.md](https://github.com/abh2050/enterprise-rag-aws/blob/e7a4f5b08c35ffa666e4c1d45b47208c6a96462a/docs/verification/README.md)
- **Card finding:** Recorded AWS verification on synthetic documents. Dev stack now torn down.

**Problem.** Knowledge workers need useful answers without letting stale permissions, cached responses, or replaced documents leak information. Search quality is only one part of that problem.

**Contribution.** Built the research interface, API, hybrid retrieval, document-ingestion pipeline, bounded model gateway, and modular AWS infrastructure. The recorded dev deployment exercised actual Bedrock calls and managed data stores.

**Architecture.** OpenSearch retrieves candidates; DynamoDB remains authoritative for permissions and the current document version. A checkpointed ingestion workflow stages revisions before publication. The model gateway checks classification, routes requests, and bounds retries and spend.

**Protocol.** The live report records synthetic document and principal identities inside an AWS job. Separate deterministic fixture runs exist, but their dataset and inference paths differ; this is not a controlled model comparison.

**Decisions**
- Recheck access after retrieval — [source](https://github.com/abh2050/enterprise-rag-aws/blob/e7a4f5b08c35ffa666e4c1d45b47208c6a96462a/packages/rag/erp_rag/retrieval.py)
- Keep fixture and live evaluation separate — [source](https://github.com/abh2050/enterprise-rag-aws/blob/e7a4f5b08c35ffa666e4c1d45b47208c6a96462a/docs/verification/README.md)

**Tradeoffs**
- Authoritative checks add datastore reads but make access revocation independent of search-index cleanup.
- Hybrid retrieval supports lexical identifiers and semantic queries; no controlled lexical-only versus hybrid quality uplift is claimed.
- The dev environment prioritized inspectability and cost over production high availability.

**Limitations (shown on the page)**
- The AWS dev stack was destroyed after verification; the linked page is documentation, not an active model service.
- Real Entra sign-in, Graph overage, SharePoint, and Purview integrations remain unverified.
- The judge is uncalibrated. Valid citation references do not prove the answer is correct.
- Production load, full restore drills, and remediation of recorded container findings remain open.

**Before production use.** Validate identity and Microsoft integrations with a real tenant, calibrate against human-reviewed examples, exercise restore and concurrent load, address container findings, and agree on operational ownership and service objectives.

## YieldLoop

*Know when to ask an engineer.* — Calibrated wafer classification with active learning, blind review, and evidence-constrained root-cause hypotheses.

- **Status:** Evaluated prototype · viewer: Project diagrams (https://abh2050.github.io/yieldloop-wafer-triage-with-HIL/)
- **Stack:** PyTorch, FastAPI, PostgreSQL, React
- **Evidence:** [eval_report.md](https://github.com/abh2050/yieldloop-wafer-triage-with-HIL/blob/a635a3f71abf2416b08cb1a7b9fc669f8dca16a3/eval_report.md)
- **Card finding:** Lot-separated holdout. Derived process events are not observed fab telemetry.

**Problem.** Wafer-map volume exceeds engineering review capacity, while rare defect classes carry the most useful signal. Confident but incorrect suggestions can also bias the humans providing new labels.

**Contribution.** Implemented the classifier, calibration, confidence-based routing, entropy-and-diversity sampler, keyboard review console, audit trail, and guarded hypothesis path. Reviewer labels return to training without crossing dataset splits.

**Architecture.** A local CNN classifies wafer maps. Postgres stores review decisions, provenance, and the audit trail. The language-model path receives a retrieved evidence bundle rather than wafer images; grounding checks gate its returned hypotheses.

**Protocol.** Training, calibration, and holdout are separated by lot. Temperature scaling is fit on validation. Active learning is compared with random acquisition at matched label budgets and a shared seed; the initial seed set is identical.

**Decisions**
- Withhold predictions below the confidence floor — [source](https://github.com/abh2050/yieldloop-wafer-triage-with-HIL/blob/a635a3f71abf2416b08cb1a7b9fc669f8dca16a3/src/yieldloop/guardrails/thresholds.py)
- Reject unsupported hypotheses whole — [source](https://github.com/abh2050/yieldloop-wafer-triage-with-HIL/blob/a635a3f71abf2416b08cb1a7b9fc669f8dca16a3/src/yieldloop/guardrails/grounding.py)

**Tradeoffs**
- A small spatial CNN keeps iteration practical; calibrated confidence governs review load.
- Entropy plus embedding diversity avoids spending an entire labeling round on near-duplicates.
- Conservative grounding sacrifices coverage; it checks reference validity rather than causal truth.

**Limitations (shown on the page)**
- WM811K supplies wafer maps and labels, not observed tool, chamber, recipe, or production-timestamp telemetry. Derived process events are explicitly marked.
- The hypothesis evaluation lacks reviewer resolutions, so root-cause precision is unmeasured.
- Reviewer decisions are too few and incomplete across visibility regimes to establish an anchoring effect.
- Recorded holdout performance does not establish generalization to another fab or acquisition process.

**Before production use.** Validate against site-specific wafer maps, collect enough independent reviewer decisions, evaluate actual root-cause outcomes, and agree on thresholds, reviewer ownership, and drift responses before production use.

## Edge AI Inspection Gates

*Fast enough is only the first gate.* — Measured vision inference on Apple silicon, evaluated against recall, sustained latency, and quality-cost constraints.

- **Status:** Research experiment · viewer: Results dashboard (https://abh2050.github.io/edge-ai-inspection-gates/)
- **Stack:** ONNX Runtime, Python, CoreML, Apple silicon
- **Evidence:** [docs/scorecard.md](https://github.com/abh2050/edge-ai-inspection-gates/blob/84d9fc9c21e82f36634d0e27062590e2b6fdb565/docs/scorecard.md)
- **Card finding:** Latency passed; frozen-threshold recall failed. Commercial release remains unqualified.

**Problem.** An inspection model must meet the line cycle and catch enough defects without scrapping too many good parts. A fast microbenchmark alone cannot justify placing it on a production line.

**Contribution.** Built the anomaly-detector export path, precision parity checks, hardware measurement harness, sustained-run protocol, expected-cost analysis, and read-only evidence dashboard. Measurements are preserved with artifact hashes.

**Architecture.** Acceptance gates link dataset provenance, model export, accuracy, provider placement, sustained timing, and cost selection. The dashboard reads recorded results. The optional agent is outside inference timing and factory actuation.

**Protocol.** Batch-one measurements cover preprocessing, synchronous inference, and postprocessing on decoded images. Warmup is excluded. Sustained runs use fixed pacing and report each minute’s p99, missed deadlines, and thermal observations.

**Decisions**
- Measure placement instead of trusting provider availability — [source](https://github.com/abh2050/edge-ai-inspection-gates/blob/84d9fc9c21e82f36634d0e27062590e2b6fdb565/docs/decisions/0007-coreml-diagnostic-provider.md)
- Separate a research threshold from qualification — [source](https://github.com/abh2050/edge-ai-inspection-gates/blob/84d9fc9c21e82f36634d0e27062590e2b6fdb565/docs/decisions/0003-evaluation-and-cost.md)

**Tradeoffs**
- Quantized and mixed-precision artifacts are measured independently; performance is not inferred from bit width.
- The maximum-F1 comparator and constrained cost rule selected equivalent points in this run, so no superiority claim is justified.
- The frozen validation threshold is a separate result from the retrospective research operating point.

**Limitations (shown on the page)**
- Frozen-threshold recall misses the configured floor; the selected retrospective point has a high false-reject rate.
- Economics are illustrative assumptions, not customer-line measurements.
- Neural Engine execution was not observed. Results cover one host and one dataset category.
- MVTec AD is noncommercial research data. Customer data rights, independent validation, production signing, and shift-soak acceptance remain unresolved.

**Before production use.** Use customer-owned data, choose a threshold on independent validation, measure the full camera-to-actuator cycle, implement production signing, and pass untouched customer acceptance and shift-soak tests.

## Sentinel AI

*Investigate. Validate. Let a human decide.* — Correlated telemetry becomes an inspectable investigation, sandbox-tested patch, and human-gated pull request.

- **Status:** Working demonstrator · no live viewer advertised
- **Stack:** FastAPI, Python, React, Telemetry
- **Evidence:** [DEPLOYMENT.md](https://github.com/abh2050/sentinel-ai/blob/cdcce69650180b588c5f0a01851736248683c2f3/DEPLOYMENT.md)
- **Card finding:** Default traffic, monitored service, and pull requests are simulated.

**Problem.** A retrieval service can remain available while cost, latency, and answer quality deteriorate together. Engineers need the context behind the regression and a reviewable change—not just another alarm.

**Contribution.** Implemented canonical telemetry ingestion, correlated anomaly detection, diagnosis, deterministic remediation, sandbox validation, policy checks, and a review interface. Real integration paths exist alongside explicit demonstration defaults.

**Architecture.** Telemetry sources converge into a validated canonical stream. The investigation follows detection, diagnosis, remediation, validation, and PR creation. Each action checks policy; deployment approval remains outside agent authority.

**Protocol.** The published incident contrasts healthy, injected-fault, and remediated behavior inside the demo simulator. Sandbox validation runs the actual test suite, but simulated before/after metrics do not establish performance against real production traffic.

**Decisions**
- Enforce permission at the action boundary — [source](https://github.com/abh2050/sentinel-ai/blob/cdcce69650180b588c5f0a01851736248683c2f3/sentinel_core/safety_policy.py)
- Patch only the known configuration contract — [source](https://github.com/abh2050/sentinel-ai/blob/cdcce69650180b588c5f0a01851736248683c2f3/sentinel_core/agents/remediation_agent.py)

**Tradeoffs**
- Sequential stages make dependencies and approval boundaries clear.
- Read-only diagnosis tools constrain the effect of a mistaken model explanation.
- Deterministic patching is inspectable but intentionally narrower than arbitrary code repair.

**Limitations (shown on the page)**
- The default RAG service, traffic, and incident injection are simulated; PRs are simulated unless GitHub is configured.
- Remediation supports a known parameter set, not arbitrary incident classes.
- Incident state and metric windows are in memory; the deployment guide requires a single instance.
- Application policy is not a substitute for authenticated users, least-privilege integration credentials, or protected branches.

**Before production use.** Connect actual telemetry, tune baselines to real traffic, persist incident state, enforce authenticated human review, and validate remediation against the target service before enabling real PR creation.

## Fault Triage AI

*Make the evidence stronger than the explanation.* — Deterministic process measurements and bounded agents, tested against simpler diagnosis and soft-sensor baselines.

- **Status:** Evaluated research system · viewer: Results explorer (https://abh2050.github.io/fault-triage-ai/)
- **Stack:** Python, scikit-learn, Pydantic, React
- **Evidence:** [docs/gates.md](https://github.com/abh2050/fault-triage-ai/blob/cebf685a09eda62890d7af809bb02ab0e1e82721/docs/gates.md)
- **Card finding:** The agent chain did not beat the deterministic diagnosis baseline.

**Problem.** A process operator needs to know what changed, which fault is plausible, and whether a product-quality estimate remains trustworthy. A convincing explanation is useful only if its measurements and limits are inspectable.

**Contribution.** Built a run-separated simulation-data pipeline, detection and diagnosis models, soft sensors, deterministic evidence tools, bounded investigation agents, evaluation records, and a static results explorer.

**Architecture.** Offline training and deterministic tools produce measurements. Agents interpret tool outputs through typed contracts. Selected copied measurements are validated before the incident report is exported as static JSON for the browser. The system has no plant-control connection.

**Protocol.** Evaluation uses Tennessee Eastman process simulation runs held apart from training and calibration. Diagnosis is scored at the defined post-onset investigation window; end-of-run classification is a different task and cannot be substituted as its baseline.

**Decisions**
- Keep arithmetic in deterministic tools — [source](https://github.com/abh2050/fault-triage-ai/blob/cebf685a09eda62890d7af809bb02ab0e1e82721/docs/adr/0004-agents-do-not-compute.md)
- Split complete simulation runs — [source](https://github.com/abh2050/fault-triage-ai/blob/cebf685a09eda62890d7af809bb02ab0e1e82721/docs/adr/0001-run-level-split.md)

**Tradeoffs**
- The agent layer adds structured records and inspectability, but its final diagnosis accuracy is lower than the ranker.
- A physical constraint reduces relative out-of-envelope degradation while worsening in-envelope error. Neither soft sensor beats the mean baseline.
- Selective corroboration is a possible next experiment, not an implemented improvement.

**Limitations (shown on the page)**
- Inputs are historical process simulation data, not production plant telemetry.
- The agent workflow did not improve diagnosis accuracy; the quality estimators did not beat a simple baseline.
- No live ingestion, plant-control integration, prospective operator trial, or operational saving is established.
- A hash chain helps detect changes but does not protect against rewriting the entire ledger.

**Before production use.** Establish useful estimator performance, validate on site-specific data, test selective agent involvement, and define an authenticated operator workflow with prospective evaluation before operational adoption.

## MLX SFT on PubMedQA

*Train locally. Evaluate beyond the loss curve.* — On-device LoRA fine-tuning with held-out comparisons, checkpoint analysis, and explicit memory and class-level limitations.

- **Status:** Research experiment · no live viewer advertised
- **Stack:** MLX, LoRA, Qwen, Apple silicon
- **Evidence:** [results/metrics.json](https://github.com/abh2050/mlx-sft-pubmedqa/blob/33771f9271cb4110e049dbc50189c3902799fe64/results/metrics.json)
- **Card finding:** Test accuracy improved, but the maybe class remains unlearned.

**Problem.** Can a small local language model learn a domain-specific classification task within a laptop memory budget—and do lower validation losses actually identify better task checkpoints?

**Contribution.** Ran local supervised LoRA training, deterministic evaluation, checkpoint comparisons, and memory instrumentation. Published accuracy, class-level metrics, confusion matrices, loss curves, and the split contract.

**Architecture.** Committed dataset splits feed a completion-masked training pipeline. MLX trains adapters locally; a deterministic generation-and-parsing evaluator scores answers. Checkpoint selection analysis uses validation, while final configurations receive held-out test evaluation.

**Protocol.** PubMedQA examples are assigned to fixed training, validation, and test splits with a shared seed. Base and adapter configurations use greedy decoding and the same answer parser. Each final configuration is tested separately; the checkpoint sweep uses validation only.

**Decisions**
- Track task accuracy separately from token loss — [source](https://github.com/abh2050/mlx-sft-pubmedqa/blob/33771f9271cb4110e049dbc50189c3902799fe64/results/checkpoint_sweep.json)
- Use completion masking and bounded memory — [source](https://github.com/abh2050/mlx-sft-pubmedqa/blob/33771f9271cb4110e049dbc50189c3902799fe64/src/train.py)

**Tradeoffs**
- Small-model training makes local experimentation practical but limits the reasoning capacity being evaluated.
- Increasing adapter capacity did not improve held-out accuracy in this experiment.
- A parser keeps scoring reproducible, but a changed prompt or response format needs validation.

**Limitations (shown on the page)**
- The maybe class has zero F1 across recorded configurations. Higher aggregate accuracy does not mean all labels were learned.
- A single seed and a small test sample do not establish statistical significance or generalization.
- The task is biomedical question classification, not a validated clinical decision tool.
- Training and evaluation memory figures are specific to the recorded Apple hardware and software.

**Before production use.** Repeat across seeds, address class imbalance, measure uncertainty, and validate on a representative target dataset. Any clinical application would require a separate domain-specific evaluation and governance process.
