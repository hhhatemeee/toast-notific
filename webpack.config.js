const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/components/ToastModule/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx']

  },
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{ loader: "style-loader" },  // to inject the result into the DOM as a style block
        { loader: "css-modules-typescript-loader" },  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
        { loader: "css-loader", options: { modules: true, import: true } }],  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  }
}