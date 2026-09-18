export type StepId = 'search' | 'read' | 'write' | 'critique'

export type StepStatus = 'pending' | 'running' | 'done'

export interface StepMeta {
  id: StepId
  label: string
  description: string
}

export interface StepState extends StepMeta {
  status: StepStatus
  output?: string
}

export interface Source {
  title: string
  url: string
}

export type ResearchEvent =
  | { type: 'start'; topic: string; steps: StepMeta[] }
  | { type: 'step'; step: StepId; status: 'running' | 'done'; output?: string }
  | { type: 'sources'; sources: Source[] }
  | { type: 'report'; report: string }
  | { type: 'critique'; feedback: string; score: number | null }
  | { type: 'done' }
  | { type: 'error'; message: string }
