import fs from 'fs/promises'
import path from 'path'
import { config } from './config'
import { rmDirRecursive } from './utils'
import { packageMeta } from './package'
import { versionReact, versionVue3, versionVue2 } from './version'
import type { FrameNameType } from './types'
import type { BuildCommonConfig } from './build.config'

export async function generateDir(
  buildConfig: BuildCommonConfig,
  frameName: FrameNameType
) {
  const { DIST, LIB } = buildConfig

  const ignore = (err: NodeJS.ErrnoException) => {
    if (err.code === 'EEXIST') return
    throw err
  }
  const getVersion = (frameName: FrameNameType) => {
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
      packageMeta(frameName, getVersion(frameName))
    )
  const generateLibPackageJson = () =>
    fs.writeFile(
      path.resolve(LIB, 'package.json'),
      JSON.stringify({
        main: './index.js',
        module: './index.mjs'
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
  await fs.mkdir(LIB).catch(ignore)
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
