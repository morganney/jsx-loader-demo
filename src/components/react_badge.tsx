import { useState } from 'react'

export type ReactBadgeProps = {
  heading: string
}

export const ReactBadge = ({ heading }: ReactBadgeProps) => {
  const [clicks, setClicks] = useState(0)

  return (
    <article className="react-card">
      <header>
        <h2>{heading}</h2>
        <p data-kind="react">Rendered with reactJsx</p>
      </header>
      <button type="button" onClick={() => setClicks(value => value + 1)}>
        Clicked {clicks} times
      </button>
    </article>
  )
}
