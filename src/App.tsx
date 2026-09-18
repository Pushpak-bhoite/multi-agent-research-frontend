import { AgentTimeline } from './components/AgentTimeline'
import { CritiqueCard } from './components/CritiqueCard'
import { ReportView } from './components/ReportView'
import { SourcesList } from './components/SourcesList'
import { TopicForm } from './components/TopicForm'
import { useResearchRun } from './hooks/useResearchRun'
import type { StepState } from './types'

export default function App() {
  const run = useResearchRun()
  const isRunning = run.status === 'running'
  const hasStarted = run.status !== 'idle'

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-dot" aria-hidden />
          <div>
            <h1>Multi-Agent Researcher</h1>
            <p className="muted">Search → Read → Write → Critique, powered by Gemini + Tavily</p>
          </div>
        </div>
        {hasStarted && (
          <button type="button" className="btn btn-ghost" onClick={run.reset} disabled={isRunning}>
            New research
          </button>
        )}
      </header>

      <main className="app-main">
        <section className="hero">
          {run.topic && (
            <>
              <p className="eyebrow">Topic</p>
              <h2 className="topic-title">{run.topic}</h2>
            </>
          )}
          <TopicForm isRunning={isRunning} onSubmit={run.start} onStop={run.stop} />
        </section>

        {hasStarted && (
          <div className="layout">
            <aside className="sidebar">
              <section className="card">
                <header className="card-head">
                  <h2>Pipeline</h2>
                  {isRunning && <span className="spinner" aria-label="running" />}
                </header>
                <AgentTimeline steps={run.steps} />
              </section>
              <SourcesList sources={run.sources} />
            </aside>

            <div className="content">
              {run.error && (
                <div className="card error-card" role="alert">
                  <strong>Run failed</strong>
                  <p>{run.error}</p>
                </div>
              )}

              {run.report ? (
                <ReportView topic={run.topic} report={run.report} />
              ) : (
                !run.error && <WaitingCard steps={run.steps} />
              )}

              {run.feedback && <CritiqueCard feedback={run.feedback} score={run.score} />}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function WaitingCard({ steps }: { steps: StepState[] }) {
  const active = steps.find((step) => step.status === 'running')
  return (
    <section className="card placeholder">
      <span className="spinner big" aria-hidden />
      <h2>{active ? active.label : 'Starting agents'}</h2>
      <p className="muted">{active ? active.description : 'Warming up the pipeline…'}</p>
      <div className="skeleton-lines">
        <span />
        <span />
        <span />
      </div>
    </section>
  )
}
