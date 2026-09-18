import type { Source } from '../types'

interface Props {
  sources: Source[]
}

export function SourcesList({ sources }: Props) {
  if (sources.length === 0) return null

  return (
    <section className="card">
      <header className="card-head">
        <h2>Sources</h2>
        <span className="muted">{sources.length}</span>
      </header>
      <ul className="sources">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
            <span className="muted host">{new URL(source.url).hostname.replace(/^www\./, '')}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
