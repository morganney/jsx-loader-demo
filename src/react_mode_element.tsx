import { jsx } from '@knighted/jsx'
import { reactJsx } from '@knighted/jsx/react'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { useState, type ReactNode } from 'react'

const ReactBadge = ({ heading }: { heading: string }) => {
  const [clicks, setClicks] = useState(0)

  return reactJsx`
    <article className="react-card">
      <header>
        <h2>{${heading}}</h2>
        <p data-kind="react">Rendered with reactJsx</p>
      </header>
      <button type="button" onClick={${() => setClicks(value => value + 1)}}>
        Clicked {${clicks}} times
      </button>
    </article>
  `
}

const ReactShell = ({ children }: { children: ReactNode }) =>
  reactJsx`
    <div className="react-shell">${children}</div>
  `

@customElement('react-mode-demo')
export class ReactModeDemo extends LitElement {
  private reactRoot?: Root

  private mountReact() {
    const host = this.renderRoot.querySelector('.react-slot') as HTMLElement | null
    if (!host) return

    if (!this.reactRoot) {
      this.reactRoot = createRoot(host)
    }

    const tree = reactJsx`
      <div className="react-stage">
        <${ReactShell}>
          <${ReactBadge} heading={${'React + Lit via @knighted/jsx'}} />
        </${ReactShell}>
      </div>
    `

    this.reactRoot.render(tree)
  }

  disconnectedCallback(): void {
    this.reactRoot?.unmount()
    this.reactRoot = undefined
    super.disconnectedCallback()
  }

  firstUpdated(): void {
    this.mountReact()
  }

  updated(): void {
    this.mountReact()
  }

  render() {
    return html`
      ${jsx`
        <section className="lit-shell">
          <p data-kind="lit">
            Lit renders this section and provides a slot for React children below.
          </p>
          <div className="react-slot"></div>
        </section>
      `}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'react-mode-demo': ReactModeDemo
  }
}
