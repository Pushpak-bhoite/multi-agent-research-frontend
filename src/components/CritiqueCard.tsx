import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  feedback: string
  score: number | null
}

export function CritiqueCard({ feedback, score }: Props) {
  const body = feedback.replace(/^\s*Score:\s*\d+(\.\d+)?\s*\/\s*10\s*/i, '').trim()
  const tone = score === null ? 'neutral' : score >= 8 ? 'good' : score >= 5 ? 'ok' : 'bad'

  return (
    <section className="card critique-card">
      <header className="card-head">
        <h2>Critic Review</h2>
        {score !== null && <span className={`score ${tone}`}>{score}/10</span>}
      </header>
      <div className="markdown compact">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </section>
  )
}
