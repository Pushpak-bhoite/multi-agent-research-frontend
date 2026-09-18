import { useState, type FormEvent } from 'react'
import { btnGhost, btnPrimary } from '../ui'

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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="text"
          value={topic}
          maxLength={300}
          placeholder="What should the agents research?"
          onChange={(event) => setTopic(event.target.value)}
          disabled={isRunning}
          aria-label="Research topic"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
        />
        {isRunning ? (
          <button type="button" className={`${btnGhost} h-[52px] shrink-0 px-6`} onClick={onStop}>
            Stop
          </button>
        ) : (
          <button type="submit" className={`${btnPrimary} h-[52px] shrink-0`} disabled={tooShort}>
            Run research
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={isRunning}
            onClick={() => setTopic(suggestion)}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:border-brand-400 hover:text-brand-600 disabled:opacity-45 dark:border-white/10 dark:text-slate-400 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  )
}
