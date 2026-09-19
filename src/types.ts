export type StepId = 'search' | 'read' | 'write' | 'critique'

export type StepStatus = 'pending' | 'running' | 'done'

export interface StepState {
  id: StepId
  label: string
  description: string
  status: StepStatus
  output?: string
}

export interface Source {
  title: string
  url: string
}

/** Shape returned by POST /api/research (the pipeline's final state dict). */
export interface ResearchResponse {
  topic: string
  search_results: string
  scraped_content: string
  report: string
  feedback: string
}
