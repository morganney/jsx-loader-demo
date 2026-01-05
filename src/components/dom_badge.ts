import { jsx } from '@knighted/jsx'
import type { JsxRenderable } from '@knighted/jsx'

export const DomBadge = (label: JsxRenderable): HTMLElement => {
  let clicks = 0
  const counterText = jsx`<span>Clicked ${clicks} times</span>` as HTMLSpanElement
  const highlights = ['Nested templates', 'DOM mode inlining', 'No wasm at runtime']
  const badge = jsx`
    <article class="dom-badge">
      <header>
        <h2>Lit + DOM with jsx</h2>
        <p data-kind="react">${label}</p>
      </header>
      <ul>
        ${highlights.map(
          entry => jsx`
          <li>${entry}${' '}${jsx`<strong>✓</strong>`}</li>
        `,
        )}
      </ul>
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
    </article>
  ` as HTMLDivElement

  return badge
}
