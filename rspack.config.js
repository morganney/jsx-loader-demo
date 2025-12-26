import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { rspack } from '@rspack/core'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production'

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    publicPath: process.env.GITHUB_PAGES ? '/jsx-loader-demo/' : '/',
  },
  target: 'web',
  devtool: isProduction ? false : 'source-map',
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
        include: [resolve(__dirname, 'src')],
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
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    host: 'localhost',
    port: 5174,
    open: true,
    hot: true,
  },
}

export default config
