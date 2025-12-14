import { css } from 'lit'

export const reactModeStyles = css`
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
