const fs = require('fs')
const path = require('path')
module.exports = {
  getJsonFile (filePath) {
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    return JSON.parse(json)
  }

}
