import { jsx } from '@knighted/jsx'
import { reactJsx } from '@knighted/jsx/react'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { DomBadge } from './components/dom_badge.js'
import { ReactBadge } from './components/react_badge.js'
import { ReactShell } from './components/react_shell.js'

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
          <${ReactBadge} heading="React + Lit via @knighted/jsx" />
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
      <section class="lit-shell">
        <p data-kind="lit">
          Lit renders this section and provides a slot for React children below.
        </p>
        <div class="react-slot"></div>
        ${DomBadge('Rendered with jsx (DOM runtime) via Lit')}
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'react-mode-demo': ReactModeDemo
  }
}
