import { card, cardHeading } from '../ui'
import type { Source } from '../types'

interface Props {
  sources: Source[]
}

export function SourcesList({ sources }: Props) {
  if (sources.length === 0) return null

  return (
    <section className={`${card} p-5`}>
      <header className="mb-3.5 flex items-center justify-between gap-3">
        <h2 className={cardHeading}>Sources</h2>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
          {sources.length}
        </span>
      </header>

      <ul className="flex flex-col gap-3">
        {sources.map((source) => (
          <li key={source.url} className="flex flex-col gap-0.5">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              {source.title}
            </a>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {new URL(source.url).hostname.replace(/^www\./, '')}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
