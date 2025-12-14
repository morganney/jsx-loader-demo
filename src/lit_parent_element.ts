import { reactJsx } from '@knighted/jsx/react'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { DomBadge } from './components/dom_badge.js'
import { ReactBadge } from './components/react_badge.js'
import { ReactShell } from './components/react_shell.js'
import { reactModeStyles } from './react_mode_demo.styles.js'

@customElement('react-mode-demo')
export class ReactModeDemo extends LitElement {
  private reactRoot?: Root

  static styles = reactModeStyles

  private mountReact() {
    const host = this.renderRoot.querySelector('.react-slot')

    if (!host) return
    if (!this.reactRoot) {
      this.reactRoot = createRoot(host)
    }

    const tree = reactJsx`
      <div className="react-stage">
        <${ReactShell}>
          <${ReactBadge} heading="Lit + React with reactJsx" />
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
        <header>
          <h1>Lit + React + DOM with @knighted/jsx/loader</h1>
        </header>
        <p data-kind="lit">
          Lit provides the container for rendering the React tree in a slot and the DOM
          badge via the jsx helper.
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
