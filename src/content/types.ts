export interface Claim {
  id: string; repository: string; sha: string; path: string; label: string; value: string;
  scope: string; limitation: string; evaluationDate: string; reviewed: string;
  evidenceType: string; publicationDecision: string; source: string;
}
export interface Project {
  slug: string; title: string; category: string; kicker: string; summary: string;
  status: string; stack: string[]; visuals: string[]; metrics: string[]; cardFinding: string;
  problem: string; contribution: string; architecture: string;
  decisions: {title: string; body: string; path: string; source: string}[];
  protocol: string; tradeoffs: string[]; limitations: string[]; production: string;
  viewer: string | null; viewerLabel: string | null; evidencePath: string;
  repository: string; sha: string; reviewed: string; evidenceUrl: string;
}
