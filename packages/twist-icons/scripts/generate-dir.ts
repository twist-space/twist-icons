import fs from 'fs/promises'
import path from 'path'
import { config } from './config'
import { rmDirRecursive } from './utils'
import { packageMeta } from './package'
import { versionReact, versionVue3, versionVue2 } from './version'
import type { FrameNameType } from './types'

export async function generateDir(
  dirPath: { DIST: string, LIB: string },
  frameName: FrameNameType
) {
  const { DIST, LIB } = dirPath

  const ignore = (err: NodeJS.ErrnoException) => {
    if (err.code === 'EEXIST') return
    throw err
  }
  const version = (frameName: FrameNameType) => {
    switch (frameName) {
    case 'vue3':
      return versionVue3
    case 'vue2':
      return versionVue2
    default:
      return versionReact
    }
  }

  const generatePackageJson = () =>
    fs.writeFile(
      path.resolve(DIST, 'package.json'),
      packageMeta(frameName, version(frameName))
    )
  const generateLibPackageJson = () =>
    fs.writeFile(
      path.resolve(LIB, 'package.json'),
      JSON.stringify({
        main: 'cjs/index.js',
        module: 'esm/index.js'
      }, null, 2)
    )
  const generateFileHeader = (file: string) =>
    fs.writeFile(
      path.resolve(DIST, file),
      '// AUTO GENERATED FILE, DO NOT EDIT\n'
    )

  await rmDirRecursive(DIST).catch((err) => {
    if (err.code === 'ENOENT') return
    throw err
  })
  await fs.mkdir(DIST).catch(ignore)
  await fs.mkdir(LIB).catch(ignore)
  await fs.mkdir(path.resolve(LIB, 'esm')).catch(ignore)
  await fs.mkdir(path.resolve(LIB, 'cjs')).catch(ignore)
  await generatePackageJson().catch(ignore)
  await generateLibPackageJson().catch(ignore)
  const initFiles = frameName === 'vue2'
    ? ['index.js', 'index.esm.js']
    : ['index.js', 'index.esm.js', 'index.d.ts']
  for (const { id } of config) {
    await fs.mkdir(path.resolve(DIST, id))
  }

  for (const file of initFiles) {
    await generateFileHeader(file)
  }
}
