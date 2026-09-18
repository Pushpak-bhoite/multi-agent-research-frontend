import { useState, type FormEvent } from 'react'

const SUGGESTIONS = [
  'Latest breakthroughs in solid-state batteries',
  'Impact of AI agents on software engineering jobs',
  'State of quantum error correction in 2026',
]

interface Props {
  isRunning: boolean
  onSubmit: (topic: string) => void
  onStop: () => void
}

export function TopicForm({ isRunning, onSubmit, onStop }: Props) {
  const [topic, setTopic] = useState('')
  const tooShort = topic.trim().length < 3

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!tooShort && !isRunning) onSubmit(topic)
  }

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <div className="topic-field">
        <input
          type="text"
          value={topic}
          maxLength={300}
          placeholder="What should the agents research?"
          onChange={(event) => setTopic(event.target.value)}
          disabled={isRunning}
          aria-label="Research topic"
        />
        {isRunning ? (
          <button type="button" className="btn btn-ghost" onClick={onStop}>
            Stop
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={tooShort}>
            Run research
          </button>
        )}
      </div>

      <div className="suggestions">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="chip"
            disabled={isRunning}
            onClick={() => setTopic(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  )
}
