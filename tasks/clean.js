// yarn add -D del
const del = require('del')
const env = require('./env')

function cleanAll () {
  return del(env.outputFolder)
}

module.exports = {
  all: cleanAll
}
