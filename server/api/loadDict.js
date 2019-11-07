const fs = require('fs')

export function loadDict() {
  const contents = fs.readFileSync(
    process.cwd() + '/server/dictionary/config.json'
  )

  const jsonContents = JSON.parse(contents)
  return {
    names: Object.keys(jsonContents),
    filenames: jsonContents
  }
}
