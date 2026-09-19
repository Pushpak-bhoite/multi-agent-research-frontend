import { useCallback, useEffect, useRef, useState } from 'react'
import type { ResearchResponse, Source, StepState } from '../types'

const STEPS: StepState[] = [
  { id: 'search', label: 'Search Agent', description: 'Finding reliable sources on the web', status: 'pending' },
  { id: 'read', label: 'Reader Agent', description: 'Scraping the most relevant page', status: 'pending' },
  { id: 'write', label: 'Writer Agent', description: 'Drafting the research report', status: 'pending' },
  { id: 'critique', label: 'Critic Agent', description: 'Reviewing and scoring the report', status: 'pending' },
]

// tools.web_search formats every hit as "Title: ...\nURL: ...\nSnippet: ..."
const SOURCE_PATTERN = /Title:\s*(.+?)\s*\nURL:\s*(https?:\/\/\S+)/g
const SCORE_PATTERN = /Score:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i

function extractSources(text: string): Source[] {
  const sources: Source[] = []
  const seen = new Set<string>()
  for (const match of text.matchAll(SOURCE_PATTERN)) {
    const url = match[2].replace(/[.,)]+$/, '')
    if (seen.has(url)) continue
    seen.add(url)
    sources.push({ title: match[1], url })
  }
  return sources
}

function extractScore(feedback: string): number | null {
  const match = SCORE_PATTERN.exec(feedback)
  return match ? Number(match[1]) : null
}

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
  steps: STEPS,
  sources: [],
  report: '',
  feedback: '',
  score: null,
  error: null,
}

export function useResearchRun() {
  const [state, setState] = useState<RunState>(initialState)
  const controllerRef = useRef<AbortController | null>(null)

  const stop = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  useEffect(() => stop, [stop])

  const start = useCallback(
    async (topic: string) => {
      const trimmed = topic.trim()
      if (trimmed.length < 3) return

      stop()
      const controller = new AbortController()
      controllerRef.current = controller
      setState({ ...initialState, status: 'running', topic: trimmed })

      try {
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: trimmed }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const detail = await response
            .json()
            .then((body: { detail?: string }) => body.detail)
            .catch(() => null)
          throw new Error(detail || `Research API responded with ${response.status} ${response.statusText}`)
        }

        const data = (await response.json()) as ResearchResponse
        const outputs: Record<string, string> = {
          search: data.search_results,
          read: data.scraped_content,
          write: data.report,
          critique: data.feedback,
        }

        setState((prev) => ({
          ...prev,
          status: 'done',
          steps: prev.steps.map((step) => ({ ...step, status: 'done', output: outputs[step.id] })),
          sources: extractSources(data.search_results ?? ''),
          report: data.report ?? '',
          feedback: data.feedback ?? '',
          score: extractScore(data.feedback ?? ''),
        }))
      } catch (error) {
        if (controller.signal.aborted) {
          setState((prev) => ({ ...prev, status: 'idle' }))
          return
        }
        setState((prev) => ({
          ...prev,
          status: 'error',
          error:
            error instanceof Error
              ? error.message
              : 'Could not reach the research API. Is the backend running on port 8000?',
        }))
      } finally {
        controllerRef.current = null
      }
    },
    [stop],
  )

  const reset = useCallback(() => {
    stop()
    setState(initialState)
  }, [stop])

  return { ...state, start, stop, reset }
}
