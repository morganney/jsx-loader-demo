import { reactJsx } from '@knighted/jsx/react'
import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { DomBadge } from './components/dom_badge.js'
import { ReactBadge } from './components/react_badge.js'
import { ReactShell } from './components/react_shell.js'

@customElement('react-mode-demo')
export class ReactModeDemo extends LitElement {
  private reactRoot?: Root

  static styles = css`
    :host {
      display: block;
    }
    .lit-shell {
      border-radius: 12px;
      padding: 1.5rem;
      background: #1b1f27;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      max-width: 720px;
      width: 100%;
    }
    .lit-shell header {
      margin-bottom: 1rem;
    }
    .lit-shell h2 {
      margin: 0 0 0.35rem;
      font-size: 1.25rem;
    }
    .lit-shell p[data-kind='react'] {
      margin: 0;
      color: #9aa3b5;
      font-size: 0.95rem;
    }
    .lit-shell p[data-kind='lit'] {
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #2f374a;
      margin: 0 0 1rem;
    }
    .react-slot {
      margin: 1.25rem 0;
    }
    .dom-badge {
      margin-top: 1rem;
    }
    button {
      border: none;
      border-radius: 999px;
      padding: 0.75rem 1.25rem;
      cursor: pointer;
      font-size: 1rem;
      color: #0f1115;
      background: linear-gradient(135deg, #7df3ff, #8ad6ff);
      box-shadow: 0 10px 30px rgba(126, 243, 255, 0.35);
      transition:
        transform 120ms ease,
        box-shadow 120ms ease;
    }
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 36px rgba(126, 243, 255, 0.45);
    }
    button:active {
      transform: translateY(0);
      box-shadow: 0 8px 20px rgba(126, 243, 255, 0.3);
    }
  `

  private mountReact() {
    const host = this.renderRoot.querySelector('.react-slot') as HTMLElement | null

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
