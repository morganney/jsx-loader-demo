# `@knighted/jsx/loader` Demo

Minimal Rspack + Lit + React project that demonstrates how to use `@knighted/jsx` inside a bundle. A Lit custom element (`lit_parent_element.ts`) renders standard React components by combining the DOM-focused `jsx` helper with the React runtime `reactJsx` helper.

## Prerequisites

- Node.js 22+
- npm 10+

## Installation

```bash
npm install
npx @knighted/jsx init
```

> [!NOTE]
> `npx @knighted/jsx init` downloads and wires up the OXC WASM parser (`@oxc-parser/binding-wasm32-wasi`) and related runtime pieces automatically.

### Manual install (optional)

Prefer to manage the WASM bits yourself? Run the existing helper script after install:

```bash
npm run setup:wasm
```

> **Why the extra step exists:** the `@oxc-parser/binding-wasm32-wasi` package ships with a CPU guard (`"cpu": ["wasm32"]`), so npm skips it on macOS/Linux by default. `setup:wasm` downloads and unpacks the binding manually so bundler builds can parse JSX templates. If you prefer, you can replace the script with `npm_config_ignore_platform=true npm install -D @oxc-parser/binding-wasm32-wasi@0.101.0` in your own workflow.

#### Dev dependencies pulled in automatically

- `@napi-rs/wasm-runtime`
- `@emnapi/core`
- `@emnapi/runtime`

These power the WASM binding and are listed in `devDependencies` so you don’t have to install them separately.

## Project layout

```
src/
├─ components/
│  ├─ react_badge.tsx    # React component (returns JSX)
│  └─ react_shell.tsx    # React wrapper that provides styling
│  └─ dom_badge.ts       # DOM-only badge built with `jsx` (no Lit/React)
├─ lit_parent_element.ts # Lit element that embeds React + DOM components
└─ main.ts               # Mounts the Lit component and bootstraps the app
```

`lit_parent_element.ts` renders its own DOM with Lit, embeds a DOM-only badge from `dom_badge.ts` (built with the DOM `jsx` helper), and uses `` reactJsx`…` `` to produce the React element hierarchy that gets mounted with `ReactDOM.createRoot`. The components in `src/components/` show both React code and plain DOM utilities living alongside Lit.

## Approaches: `@lit/react` vs `@knighted/jsx/loader`

You can use the loader from [`@knighted/jsx`](https://www.npmjs.com/package/@knighted/jsx) as an alternative to [`@lit/react`](https://www.npmjs.com/package/@lit/react).

| Approach               | How it works                                                                                                               | Pros                                                                                             | Cons                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `@lit/react`           | Wrap a React component in a Lit wrapper that mounts via ReactDOM under the hood. Author normal TSX/JSX.                    | Familiar React authoring; no template literals; minimal setup.                                   | Requires wrapper components; less flexible for mixing DOM/React in one template.                         |
| `@knighted/jsx/loader` | Use tagged templates: ` jsx`` ` returns DOM nodes for Lit; ` reactJsx`` ` returns React elements you render with ReactDOM. | Mix Lit DOM and React elements in the same file; works in `.ts` with helpers; no wrapper needed. | Needs loader + WASM parser setup; JSX lives in template literals; must mount the React subtree manually. |

## Development

```bash
npm run dev
```

This starts Rspack’s dev server at http://localhost:5174/ and opens the demo page.

## Production build

```bash
npm run build
```

Outputs `dist/main.js` plus the copied `dist/index.html`. Serve the `dist/` folder to preview the bundled demo.

## Scripts

- `npm run dev` – start the dev server with HMR
- `npm run build` – production bundle + static HTML copy
- `npm run setup:wasm` – re-install the OXC parser binding (run after any `npm install`)
- `npm run check-types` – `tsc --noEmit`
- `npm run prettier` – format sources
