// Additional public repositories shown as icon tiles. Summaries restate each repository's own description;
// these projects have no case study or evidence review, so no results are claimed here.
export interface MoreProject {
  slug: string; title: string; group: string; summary: string; stack: string[];
}
export const moreProjectGroups = ['Agent systems', 'Retrieval & documents', 'Industrial & ML engineering'] as const;
export const moreProjects: MoreProject[] = [
  { slug: 'linegate', title: 'LineGate', group: 'Industrial & ML engineering',
    summary: 'Bosch production-line failure prediction that refuses the leaderboard’s row-order leak: honest LightGBM on 1.18M parts, a dollars-per-shift cost policy, and agents that must pass leak tests.',
    stack: ['LightGBM', 'Python'] },
  { slug: 'agent-org-chart', title: 'Agent Org Chart', group: 'Agent systems',
    summary: 'A four-level LangGraph hierarchy—CEO, directors, team supervisors, and 18 specialists with 36 tools—behind SDLC gates and a Streamlit UI.',
    stack: ['LangGraph', 'Streamlit'] },
  { slug: 'langgraph_data_analytics_agents', title: 'Data Analytics Agents', group: 'Agent systems',
    summary: 'Conversational data analysis in which router, pandas, charting, search, memory, and code-execution agents are coordinated in LangGraph.',
    stack: ['LangGraph', 'Python'] },
  { slug: 'jev-test-confidence-gate', title: 'Confidence Gate', group: 'Agent systems',
    summary: 'Support-triage benchmark comparing TypeSafe Jev and OpenAI on the same LangGraph workflow, with a confidence gate that routes uncertain cases to a human.',
    stack: ['LangGraph', 'TypeSafe Jev'] },
  { slug: 'agentic-memory-patterns', title: 'Agentic Memory Patterns', group: 'Agent systems',
    summary: 'A multi-agent memory system demonstrating six memory patterns with async state management and durable persistence.',
    stack: ['LangGraph', 'Redis'] },
  { slug: 'docu_scribe_ai', title: 'DocuScribe AI', group: 'Retrieval & documents',
    summary: 'Agent pipeline that turns clinical conversations into SOAP notes, suggests ICD-10 codes, and exports FHIR-compatible data.',
    stack: ['Agents', 'FHIR'] },
  { slug: 'Rag_with_knowledge_graph_neo4j', title: 'Knowledge-Graph RAG', group: 'Retrieval & documents',
    summary: 'Scientific-literature RAG that stores entities and relations in a Neo4j knowledge graph for structured retrieval.',
    stack: ['Neo4j', 'NLP'] },
  { slug: 'colpali_rag', title: 'Multimodal RAG', group: 'Retrieval & documents',
    summary: 'Retrieval over page images with ColPali, answered by Gemini, for documents where layout and figures carry the meaning.',
    stack: ['ColPali', 'Gemini'] },
  { slug: 'financial_doc_analyser', title: 'SEC Filing Analyzer', group: 'Retrieval & documents',
    summary: 'Retrieves 10-K, 10-Q, and 8-K filings by ticker and converts them into a vector store for querying and trend comparison.',
    stack: ['Vector search', 'Streamlit'] },
  { slug: 'reinforcement_learning_based_pump_control_with_edge_deployment', title: 'RL Pump Control', group: 'Industrial & ML engineering',
    summary: 'Closed-loop pump control combining a physics-plus-ML model with reinforcement learning, served at the edge over FastAPI and MQTT.',
    stack: ['RL', 'MQTT'] },
  { slug: 'machine-failure-api-aws-ECR', title: 'Machine Failure API', group: 'Industrial & ML engineering',
    summary: 'Gradient-boosting failure scoring on the AI4I 2020 dataset, packaged as a container service returning probability, threshold, and model version.',
    stack: ['scikit-learn', 'AWS ECR'] },
  { slug: 'llama-2_fine_tune_AWS_deploy', title: 'Llama 2 on AWS', group: 'Industrial & ML engineering',
    summary: 'Fine-tuned a Llama 2 model and deployed it on AWS for inference.',
    stack: ['Llama 2', 'AWS'] },
];
export const repoUrl = (slug: string) => `https://github.com/abh2050/${slug}`;
