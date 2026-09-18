import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    <section className="card report-card">
      <header className="card-head">
        <h2>Research Report</h2>
        <div className="card-actions">
          <button type="button" className="btn btn-ghost" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={download}>
            Download .md
          </button>
        </div>
      </header>
      <article className="markdown">
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
