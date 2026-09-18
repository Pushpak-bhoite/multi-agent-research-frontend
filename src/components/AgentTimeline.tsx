import { useState } from 'react'
import type { StepState } from '../types'

interface Props {
  steps: StepState[]
}

export function AgentTimeline({ steps }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <ol className="timeline">
      {steps.map((step, index) => {
        const isOpen = expanded === step.id
        return (
          <li key={step.id} className={`timeline-item ${step.status}`}>
            <span className="timeline-marker" aria-hidden>
              {step.status === 'done' ? '✓' : index + 1}
            </span>
            <div className="timeline-body">
              <div className="timeline-head">
                <strong>{step.label}</strong>
                <span className={`status-pill ${step.status}`}>{step.status}</span>
              </div>
              <p className="muted">{step.description}</p>
              {step.output && (
                <>
                  <button type="button" className="link-btn" onClick={() => setExpanded(isOpen ? null : step.id)}>
                    {isOpen ? 'Hide raw output' : 'View raw output'}
                  </button>
                  {isOpen && <pre className="raw-output">{step.output}</pre>}
                </>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
