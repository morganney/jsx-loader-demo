import { jsx } from '@knighted/jsx'

export const DomBadge = (label: string) => {
  let clicks = 0
  const counterText = jsx`<span>Clicked ${clicks} times</span>` as HTMLSpanElement
  const badge = jsx`
    <div class="react-card dom-card">
      <p data-kind="react">${label}</p>
      <button
        type="button"
        data-kind="dom-counter"
        onClick=${() => {
          clicks += 1
          counterText.textContent = `Clicked ${clicks} times`
        }}
      >
        ${counterText}
      </button>
    </div>
  ` as HTMLDivElement

  return badge
}
