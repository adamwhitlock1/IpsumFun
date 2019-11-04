const fs = require('fs')

export function loadDict() {
  const contents = fs.readFileSync(
    '/Users/adamwhitlock/Documents/GitHub/IpsumFun/server/dictionary/config.json'
  )

  const jsonContents = JSON.parse(contents)
  return {
    names: Object.keys(jsonContents),
    filenames: jsonContents
  }
}
