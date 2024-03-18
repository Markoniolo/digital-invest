// yarn add -D webpack-stream @babel/core @babel/preset-env babel-loader
const { src, dest, series } = require('gulp')
const webpack = require('webpack-stream')

const env = require('./env')
const { browserSync } = require('./browserSync')

const path = {
  entry: 'assets/scripts/*.js',
  watch: 'assets/scripts/**/*.js'
}

const webpackConfig = function () {
  return {
    mode: env.production ? 'production' : 'development',
    entry: {
      app: './assets/scripts/app.js'
    },
    output: {
      filename: '[name].js',
    },
    devtool: env.production ? '' : 'source-map',
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false,
                useBuiltIns: 'entry',
                corejs: { version: "3.9.1", proposals: true },
              }]
            ],plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }]
    }
  }
}

const script = function () {
  if (env.production) {
    return src(path.entry)
      .pipe(webpack(webpackConfig()))
      .pipe(dest(`${env.outputFolder}/statics/js`))
  }
  return src(path.entry)
  .pipe(webpack(webpackConfig()))
  .pipe(dest(`${env.outputFolder}/statics/js`))
  .on('end', browserSync.reload)
}

module.exports = {
  build: series(script),
  path
}
