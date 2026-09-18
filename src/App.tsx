import { AgentTimeline } from './components/AgentTimeline'
import { CritiqueCard } from './components/CritiqueCard'
import { ReportView } from './components/ReportView'
import { SourcesList } from './components/SourcesList'
import { ThemeToggle } from './components/ThemeToggle'
import { TopicForm } from './components/TopicForm'
import { useResearchRun } from './hooks/useResearchRun'
import { useTheme } from './hooks/useTheme'
import type { StepState } from './types'
import { btnGhost, card, cardHeading } from './ui'

export default function App() {
  const run = useResearchRun()
  const { theme, toggle } = useTheme()
  const isRunning = run.status === 'running'
  const hasStarted = run.status !== 'idle'

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-20 sm:px-6">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="size-9 shrink-0 rounded-xl bg-gradient-to-br from-brand-500 to-sky-400 shadow-lg shadow-brand-500/30"
          />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl dark:text-white">
              Multi-Agent Researcher
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Search → Read → Write → Critique, powered by Gemini + Tavily
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {hasStarted && (
            <button type="button" className={`${btnGhost} hidden sm:inline-flex`} onClick={run.reset} disabled={isRunning}>
              New research
            </button>
          )}
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>
      </header>

      <main className="flex flex-col gap-7 pt-7">
        <section className="flex flex-col gap-3">
          {run.topic && (
            <>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-slate-400 uppercase dark:text-slate-500">
                Topic
              </p>
              <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl dark:text-white">{run.topic}</h2>
            </>
          )}
          <TopicForm isRunning={isRunning} onSubmit={run.start} onStop={run.stop} />
        </section>

        {hasStarted && (
          <div className="grid items-start gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="flex flex-col gap-5 lg:sticky lg:top-6">
              <section className={`${card} p-5`}>
                <header className="mb-4 flex items-center justify-between gap-3">
                  <h2 className={cardHeading}>Pipeline</h2>
                  {isRunning && <Spinner />}
                </header>
                <AgentTimeline steps={run.steps} />
              </section>
              <SourcesList sources={run.sources} />
            </aside>

            <div className="flex min-w-0 flex-col gap-5">
              {run.error && (
                <div
                  role="alert"
                  className="rounded-2xl border border-rose-300 bg-rose-50 p-5 dark:border-rose-400/40 dark:bg-rose-500/10"
                >
                  <strong className="text-sm font-semibold text-rose-700 dark:text-rose-300">Run failed</strong>
                  <p className="mt-1 text-sm break-words text-rose-600 dark:text-rose-200/80">{run.error}</p>
                </div>
              )}

              {run.report ? (
                <ReportView topic={run.topic} report={run.report} />
              ) : (
                !run.error && <WaitingCard steps={run.steps} />
              )}

              {run.feedback && <CritiqueCard feedback={run.feedback} score={run.score} />}

              {hasStarted && (
                <button type="button" className={`${btnGhost} sm:hidden`} onClick={run.reset} disabled={isRunning}>
                  New research
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function Spinner({ className = 'size-4 border-2' }: { className?: string }) {
  return (
    <span
      aria-label="running"
      className={`inline-block animate-spin rounded-full border-slate-200 border-t-brand-500 dark:border-white/15 dark:border-t-brand-400 ${className}`}
    />
  )
}

function WaitingCard({ steps }: { steps: StepState[] }) {
  const active = steps.find((step) => step.status === 'running')

  return (
    <section className={`${card} flex flex-col items-center gap-2.5 px-6 py-14 text-center`}>
      <Spinner className="size-8 border-[3px]" />
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        {active ? active.label : 'Starting agents'}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {active ? active.description : 'Warming up the pipeline…'}
      </p>

      <div className="mt-5 flex w-full max-w-lg flex-col gap-2.5">
        {['w-full', 'w-[85%]', 'w-3/5'].map((width) => (
          <span
            key={width}
            className={`h-2.5 animate-shimmer rounded-full bg-[length:200%_100%] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-white/5 dark:via-white/15 dark:to-white/5 ${width}`}
          />
        ))}
      </div>
    </section>
  )
}
