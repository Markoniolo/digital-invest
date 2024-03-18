// yarn add -D browser-sync
const browserSync = require('browser-sync').create()

function runServe () {
  browserSync.init({
    server: {
      baseDir: 'dev',
      index: "_site-map.html"
    }
  })
}

module.exports = {
  runServe,
  browserSync
}
