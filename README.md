# @knighted/jsx loader demo

Minimal Rspack + Lit + React project that demonstrates how to use `@knighted/jsx` inside a bundle. The Lit component renders a React subtree via the loader’s `reactJsx` helper.

## Prerequisites

- Node.js 22+
- npm 10+

## Installation

```bash
npm install
# Ensure the OXC WASM parser is present (required for the loader)
npm run setup:wasm
```

> **Why the extra step?**
> The `@oxc-parser/binding-wasm32-wasi` package ships with a CPU guard (`"cpu": ["wasm32"]`), so npm skips it on macOS/Linux by default. `setup:wasm` downloads and unpacks the binding manually so bundler builds can parse JSX templates. If you prefer, you can replace the script with `npm_config_ignore_platform=true npm install -D @oxc-parser/binding-wasm32-wasi@0.101.0` in your own workflow.

### Dev dependencies pulled in automatically

- `@napi-rs/wasm-runtime`
- `@emnapi/core`
- `@emnapi/runtime`

These power the WASM binding and are listed in `devDependencies` so you don’t have to install them separately.

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
