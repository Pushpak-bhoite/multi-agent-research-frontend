import { useState } from 'react'
import type { StepState } from '../types'

const MARKER_STYLES: Record<StepState['status'], string> = {
  pending: 'border-slate-200 bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500',
  running: 'border-brand-500 bg-brand-600 text-white animate-pulse',
  done: 'border-emerald-400 bg-emerald-50 text-emerald-600 dark:border-emerald-400/50 dark:bg-emerald-400/10 dark:text-emerald-400',
}

const PILL_STYLES: Record<StepState['status'], string> = {
  pending: 'border-slate-200 text-slate-400 dark:border-white/10 dark:text-slate-500',
  running: 'border-brand-400 text-brand-600 dark:text-brand-300',
  done: 'border-emerald-300 text-emerald-600 dark:border-emerald-400/40 dark:text-emerald-400',
}

interface Props {
  steps: StepState[]
}

export function AgentTimeline({ steps }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const isOpen = expanded === step.id
        const isLast = index === steps.length - 1
        return (
          <li key={step.id} className="relative flex gap-3 pb-5 last:pb-0">
            {!isLast && (
              <span
                aria-hidden
                className={`absolute top-8 bottom-0 left-[13px] w-0.5 ${
                  step.status === 'done' ? 'bg-emerald-400/50' : 'bg-slate-200 dark:bg-white/10'
                }`}
              />
            )}
            <span
              aria-hidden
              className={`z-10 grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${MARKER_STYLES[step.status]}`}
            >
              {step.status === 'done' ? '✓' : index + 1}
            </span>

            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-sm font-semibold text-slate-900 dark:text-white">{step.label}</strong>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[0.62rem] font-medium uppercase tracking-wider ${PILL_STYLES[step.status]}`}
                >
                  {step.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{step.description}</p>

              {step.output && (
                <>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : step.id)}
                    className="self-start text-xs font-medium text-brand-600 hover:underline dark:text-brand-300"
                  >
                    {isOpen ? 'Hide raw output' : 'View raw output'}
                  </button>
                  {isOpen && (
                    <pre className="mt-1.5 max-h-56 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-[0.7rem] leading-relaxed break-words whitespace-pre-wrap text-slate-600 dark:border-white/10 dark:bg-black/40 dark:text-slate-400">
                      {step.output}
                    </pre>
                  )}
                </>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
