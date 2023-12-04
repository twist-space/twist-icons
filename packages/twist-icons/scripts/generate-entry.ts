import fs from 'fs/promises'
import path from 'path'
import { READEME_PATH } from './build.config'

export async function generateEntry(
  dist: string,
  type: boolean = true
) {
  const generateEntryCjs = () => 'module.exports = require(\'./lib/cjs/index.js\');'
  const generateEntryMjs = (filename = 'index.js') => `import * as x from './lib/esm/${filename}';
export default x;`

  // generate entry file
  await fs.appendFile(
    path.resolve(dist, 'index.js'),
    generateEntryCjs(),
    'utf-8'
  )

  await fs.appendFile(
    path.resolve(dist, 'index.esm.js'),
    generateEntryMjs(),
    'utf-8'
  )

  // copy README.md file to entry root
  await fs.copyFile(READEME_PATH, path.resolve(dist, 'README.md'))

  // generate .d.ts file in entry
  if (type) {
    await fs.appendFile(
      path.resolve(dist, 'index.d.ts'),
      generateEntryMjs('index.d.ts'),
      'utf-8'
    )
  }
}
