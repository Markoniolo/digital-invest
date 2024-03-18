// yarn add -D gulp-pug gulp-plumber gulp-typograf gulp-data
const { src, dest, series } = require('gulp')
const pug = require('gulp-pug')
const data = require("gulp-data")
const plumber = require('gulp-plumber')
const formatHtml = require('gulp-format-html')

const env = require('./env')
const { browserSync } = require('./browserSync')

const path = {
  pages: 'assets/views/pages/**/*.pug',
  error: 'assets/views/pages/404.pug',
  siteMap: 'assets/views/pages/_site-map.pug',
  watch: 'assets/views/**/*.pug',
}

function dataView (file) {
  return {
    PRODUCTION: env.production,
    VIEW: file.stem
  }
}

function view () {
  return src(path.pages)
    .pipe(plumber())
    .pipe(data(dataView))
    .pipe(pug({ pretty: true }))
    .pipe(formatHtml())
    .pipe(dest(env.outputFolder))
      .on('end', () => browserSync.reload())
}

module.exports = {
  build: series(view),
  path
}
