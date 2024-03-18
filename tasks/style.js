// yarn add -D gulp-sass gulp-autoprefixer gulp-group-css-media-queries gulp-clean-css gulp-header sass
const { src, dest, series } = require('gulp')
const header = require('gulp-header')
const sass = require('gulp-sass')(require('sass'))
const autoPrefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')

const env = require('./env')
const { browserSync } = require('./browserSync')

const path = {
  pages: 'assets/styles/pages/*.sass',
  watch: 'assets/styles/**/*.sass',
}

const style = function () {
  if (env.production) {
    return src(path.pages)
      .pipe(header('@import "../variables"\n'))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoPrefixer())
      .pipe(gcmq())
      .pipe(cleanCSS({ level: 2 }))
      .pipe(dest(`${env.outputFolder}/statics/css`))
  }
  return src(path.pages)
    .pipe(header('@import "../variables"\n'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(gcmq())
    .pipe(cleanCSS({
      level: 2,
      format: 'beautify'
    }))
    .pipe(dest(`${env.outputFolder}/statics/css`))
    .on('end', () => browserSync.reload('*.css'))
}

module.exports = {
  build: series(style),
  watch: path.watch
}
