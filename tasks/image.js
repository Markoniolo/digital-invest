// yarn add -D gulp-newer gulp-svgmin
const { src, dest, series } = require('gulp')
const newer = require('gulp-newer')
const svgmin = require('gulp-svgmin')

const env = require('./env')
const { browserSync } = require('./browserSync')
const path = {
  svg: 'assets/images/**/*.svg',
  other: 'assets/images/**/*.{png,jpg,ico,webp}',
  watch: 'assets/images/**/*.{png,jpg,svg,ico,webp}'
}

function img () {
  if (env.production) {
    return src(path.other)
      .pipe(newer(`${env.outputFolder}/statics/img`))
      .pipe(dest(`${env.outputFolder}/statics/img`))
  }
  return src(path.other)
    .pipe(newer(`${env.outputFolder}/statics/img`))
    .pipe(dest(`${env.outputFolder}/statics/img`))
}

function svg () {
  if (env.production) {
    return src(path.svg)
      .pipe(newer(`${env.outputFolder}/statics/img`))
      .pipe(svgmin())
      .pipe(dest(`${env.outputFolder}/statics/img`))
  }
  return src(path.svg)
    .pipe(newer(`${env.outputFolder}/statics/img`))
    .pipe(svgmin())
    .pipe(dest(`${env.outputFolder}/statics/img`))
    .on('end', browserSync.reload)
}

module.exports = {
  build: series(img, svg),
  path
}
