import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { btnGhost, card, cardHeading } from '../ui'

interface Props {
  topic: string
  report: string
}

export function ReportView({ topic, report }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function download() {
    const blob = new Blob([`# ${topic}\n\n${report}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${topic.slice(0, 60).replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') || 'report'}.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className={`${card} p-5 sm:p-7`}>
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
        <h2 className={cardHeading}>Research Report</h2>
        <div className="flex gap-2">
          <button type="button" className={btnGhost} onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className={btnGhost} onClick={download}>
            Download .md
          </button>
        </div>
      </header>

      <article className="prose-report">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          }}
        >
          {report}
        </ReactMarkdown>
      </article>
    </section>
  )
}
