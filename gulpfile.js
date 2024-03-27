// yarn add cross-env
// yarn add -D gulp
'use strict'
const gulp = require('gulp')

const clean = require('./tasks/clean')
const font = require('./tasks/font')
const files = require('./tasks/files')
const view = require('./tasks/view')
const style = require('./tasks/style')
const script = require('./tasks/script')
const scriptLibs = require('./tasks/scriptLibs')
const img = require('./tasks/image')
const { runServe } = require('./tasks/browserSync')

gulp.task('watch', () => {
  gulp.watch(view.path.watch, gulp.series(view.build))
  gulp.watch(style.watch, gulp.series(style.build))
  gulp.watch(script.path.watch, gulp.series(script.build))
  gulp.watch(scriptLibs.path, gulp.series(scriptLibs.build))
  gulp.watch(img.path.watch, gulp.series(img.build))
})

gulp.task('build', gulp.series(
  clean.all,
  font.build,
  files.build,
  style.build,
  script.build,
  scriptLibs.build,
  img.build,
  view.build
))

gulp.task('default', gulp.series(
  'build', gulp.parallel('watch', runServe)
))
