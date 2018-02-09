import buble from 'rollup-plugin-buble'
import pkg from './package.json'

export default {
  entry: 'index.js',
  output: {
    file: pkg['main'],
    format: 'cjs'
  },
  plugins: [ buble() ]
}
