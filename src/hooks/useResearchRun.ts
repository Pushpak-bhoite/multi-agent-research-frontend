import { useCallback, useEffect, useRef, useState } from 'react'
import type { ResearchEvent, Source, StepId, StepState } from '../types'

const DEFAULT_STEPS: StepState[] = [
  { id: 'search', label: 'Search Agent', description: 'Finding reliable sources on the web', status: 'pending' },
  { id: 'read', label: 'Reader Agent', description: 'Scraping the most relevant page', status: 'pending' },
  { id: 'write', label: 'Writer Agent', description: 'Drafting the research report', status: 'pending' },
  { id: 'critique', label: 'Critic Agent', description: 'Reviewing and scoring the report', status: 'pending' },
]

export type RunStatus = 'idle' | 'running' | 'done' | 'error'

interface RunState {
  status: RunStatus
  topic: string
  steps: StepState[]
  sources: Source[]
  report: string
  feedback: string
  score: number | null
  error: string | null
}

const initialState: RunState = {
  status: 'idle',
  topic: '',
  steps: DEFAULT_STEPS,
  sources: [],
  report: '',
  feedback: '',
  score: null,
  error: null,
}

function applyEvent(state: RunState, event: ResearchEvent): RunState {
  switch (event.type) {
    case 'start':
      return {
        ...initialState,
        status: 'running',
        topic: event.topic,
        steps: event.steps.map((step) => ({ ...step, status: 'pending' })),
      }
    case 'step':
      return { ...state, steps: state.steps.map((step) => (step.id === event.step ? { ...step, status: event.status, output: event.output ?? step.output } : step)) }
    case 'sources':
      return { ...state, sources: event.sources }
    case 'report':
      return { ...state, report: event.report }
    case 'critique':
      return { ...state, feedback: event.feedback, score: event.score }
    case 'done':
      return { ...state, status: 'done' }
    case 'error':
      return { ...state, status: 'error', error: event.message }
    default:
      return state
  }
}

export function useResearchRun() {
  const [state, setState] = useState<RunState>(initialState)
  const sourceRef = useRef<EventSource | null>(null)

  const stop = useCallback(() => {
    sourceRef.current?.close()
    sourceRef.current = null
  }, [])

  useEffect(() => stop, [stop])

  const start = useCallback(
    (topic: string) => {
      const trimmed = topic.trim()
      if (trimmed.length < 3) return

      stop()
      setState({ ...initialState, status: 'running', topic: trimmed })

      const source = new EventSource(`/api/research/stream?topic=${encodeURIComponent(trimmed)}`)
      sourceRef.current = source

      source.onmessage = (message) => {
        let event: ResearchEvent
        try {
          event = JSON.parse(message.data) as ResearchEvent
        } catch {
          return
        }
        setState((prev) => applyEvent(prev, event))
        if (event.type === 'done' || event.type === 'error') stop()
      }

      source.onerror = () => {
        stop()
        setState((prev) =>
          prev.status === 'running'
            ? { ...prev, status: 'error', error: 'Lost connection to the research API. Is the backend running on port 8000?' }
            : prev,
        )
      }
    },
    [stop],
  )

  const reset = useCallback(() => {
    stop()
    setState(initialState)
  }, [stop])

  const activeStep: StepId | null = state.steps.find((step) => step.status === 'running')?.id ?? null

  return { ...state, activeStep, start, stop, reset }
}
