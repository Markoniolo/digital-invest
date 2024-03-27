const { src, dest, series } = require('gulp')
const env = require('./env')

const path = 'assets/files/*.*'

function files () {
  if (env.production) {
    return src(path)
      .pipe(dest(`${env.outputFolder}/statics/files`))
  }
  return src(path)
    .pipe(dest(`${env.outputFolder}/statics/files`))
}

module.exports = {
  build: series(files)
}
