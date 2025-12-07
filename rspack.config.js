import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rspack } from '@rspack/core'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import("@rspack/cli").Configuration} */
const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts', '.tsx'],
    },
  },
  plugins: [
    new rspack.ProvidePlugin({
      React: ['react'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                  decoratorMetadata: true,
                },
              },
            },
          },
          {
            loader: '@knighted/jsx/loader',
            options: {
              tags: ['jsx', 'reactJsx'],
              tagModes: {
                reactJsx: 'react',
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    host: 'localhost',
    port: 5174,
    open: true,
    hot: true,
  },
}

export default config
