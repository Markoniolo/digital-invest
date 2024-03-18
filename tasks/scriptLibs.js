const { src, dest, series } = require('gulp')
const concat = require('gulp-concat');
const env = require('./env')
const { browserSync } = require('./browserSync')

const path = 'assets/scripts/libs/*.js'

const scriptLibs = function () {
  if (env.production) {
    return src(path)
      .pipe(concat('libs.js'))
      .pipe(dest(`${env.outputFolder}/statics/js`))
  }
  return src(path)
    .pipe(concat('libs.js'))
    .pipe(dest(`${env.outputFolder}/statics/js`))
    .on('end', browserSync.reload)
}

module.exports = {
  build: series(scriptLibs),
  path
}
