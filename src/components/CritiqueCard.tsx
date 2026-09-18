import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { card, cardHeading } from '../ui'

interface Props {
  feedback: string
  score: number | null
}

const TONES = {
  good: 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-400',
  ok: 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-400',
  bad: 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-400/40 dark:bg-rose-400/10 dark:text-rose-400',
}

export function CritiqueCard({ feedback, score }: Props) {
  const body = feedback.replace(/^\s*Score:\s*\d+(\.\d+)?\s*\/\s*10\s*/i, '').trim()
  const tone = score === null ? null : score >= 8 ? 'good' : score >= 5 ? 'ok' : 'bad'

  return (
    <section className={`${card} p-5 sm:p-7`}>
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 className={cardHeading}>Critic Review</h2>
        {tone && (
          <span className={`rounded-full border px-3 py-1 text-sm font-bold ${TONES[tone]}`}>{score}/10</span>
        )}
      </header>

      <div className="prose-report text-sm leading-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </section>
  )
}
