# `@knighted/jsx/loader` Demo

Minimal Rspack + Lit + React project that demonstrates how to use `@knighted/jsx` inside a bundle. A Lit custom element (`lit_parent_element.ts`) renders standard React components by combining the DOM-focused `jsx` helper with the React runtime `reactJsx` helper. Both helpers compile at build time (`tagModes` set to `dom` and `react`), so the browser bundle does not include a JSX parser or WASM runtime.

## Prerequisites

- Node.js 22+
- npm 10+

## Installation

```bash
npm install
```

> [!NOTE]
> With `tagModes` set to `dom` and `react`, the loader compiles templates ahead-of-time using the native OXC binding inside `oxc-parser`. The WASM parser (`@oxc-parser/binding-wasm32-wasi`) is only needed if you opt into the runtime/browser parser mode.

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

### Why the TypeScript configs are split

This demo intentionally mixes three “JSX” flavors—traditional React components, DOM-mode tagged templates via `jsx`, and React-mode tagged templates via `reactJsx`. Each flavor needs different `jsxImportSource` values so TypeScript uses the right intrinsic element typings. To keep squiggles accurate without forcing React files to adopt the DOM runtime (or vice versa), the repo ships a shared `tsconfig.base.json` plus two entry points:

- `tsconfig.react.json` – standard React JSX config (default `tsc` run and CI check)
- `tsconfig.dom.json` – overrides `jsxImportSource` to `@knighted/jsx` and only includes the DOM-tagged template files

If your own project sticks with a single runtime—only React, or only the DOM helper—you can delete the extra config and rely on one `tsconfig.json` with the matching `jsxImportSource`. The split here is strictly to support the hybrid Lit + React + DOM example.

## Approaches: `@lit/react` vs `@knighted/jsx/loader`

You can use the loader from [`@knighted/jsx`](https://www.npmjs.com/package/@knighted/jsx) as an alternative to [`@lit/react`](https://www.npmjs.com/package/@lit/react).

| Approach               | How it works                                                                                                               | Pros                                                                                             | Cons                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `@lit/react`           | Wrap a React component in a Lit wrapper that mounts via ReactDOM under the hood. Author normal TSX/JSX.                    | Familiar React authoring; no template literals; minimal setup.                                   | Requires wrapper components; less flexible for mixing DOM/React in one template.         |
| `@knighted/jsx/loader` | Use tagged templates: ` jsx`` ` returns DOM nodes for Lit; ` reactJsx`` ` returns React elements you render with ReactDOM. | Mix Lit DOM and React elements in the same file; works in `.ts` with helpers; no wrapper needed. | Needs the loader; JSX lives in template literals; must mount the React subtree manually. |

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
- `npm run typecheck` – `tsc --noEmit`
- `npm run prettier` – format sources
