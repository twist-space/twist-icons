import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'
import { iconConfig } from './config'
import {
  rmDirRecursive,
  cjsHeaderTemplate,
  esmHeaderTemplate,
  typesHeaderTemplate,
  cjsLibEntryTemplate,
  esmLibEntryTemplate,
  dtsLibEntryTemplate
} from './utils'
import { packageMeta } from './package'
import { versionReact, versionVue3, versionVue2 } from './version'
import { READEME_PATH } from './build.config'
import type { FrameNameType, entryFileTypes, entryFiles } from './types'
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

  await rmDirRecursive(DIST).catch((err) => {
    if (err.code === 'ENOENT') return
    throw err
  })
  await fs.mkdir(DIST).catch(ignore)
  await fs.mkdir(LIB).catch(ignore)
  await generatePackageJson().catch(ignore)
  await generateLibPackageJson().catch(ignore)

  const packageRaw = {
    main: './index.js',
    module: './index.mjs',
    types: './index.d.ts',
    sideEffects: false
  }

  if (frameName === 'vue2') {
    Reflect.deleteProperty(packageRaw, 'types')
  }

  // generate icons module entry files
  for (const { id } of iconConfig) {
    await fs.mkdir(path.resolve(DIST, id))
    // generate files header
    await fse.writeFile(
      path.resolve(DIST, id, 'index.js'),
      cjsHeaderTemplate()
    )
    await fse.writeFile(
      path.resolve(DIST, id, 'index.mjs'),
      esmHeaderTemplate()
    )

    // generate d.ts header
    await fse.writeFile(
      path.resolve(DIST, id, 'index.d.ts'),
      typesHeaderTemplate()
    )

    // generate icon module package.json
    await fse.writeFile(
      path.resolve(DIST, id, 'package.json'),
      JSON.stringify(packageRaw)
    )
  }

  const generateFramewrokEntryFileHeader = async (file: string, type: entryFileTypes) => {
    if (type === 'cjs') {
      await fs.writeFile(
        path.resolve(DIST, file),
        `// AUTO GENERATED FILE, DO NOT EDIT\n${cjsLibEntryTemplate}`
      )
    }

    if (type === 'esm') {
      await fs.writeFile(
        path.resolve(DIST, file),
        `// AUTO GENERATED FILE, DO NOT EDIT\n${esmLibEntryTemplate}`
      )
    }

    if (type === 'dts') {
      await fs.writeFile(
        path.resolve(DIST, file),
        `// AUTO GENERATED FILE, DO NOT EDIT\n${dtsLibEntryTemplate}`
      )
    }
  }

  let entryFiles: entryFiles[] = [
    {
      type: 'cjs',
      entry: 'index.js'
    },
    {
      type: 'esm',
      entry: 'index.mjs'
    }
  ]

  if (frameName === 'react' || frameName === 'vue3') {
    entryFiles = entryFiles.concat([{ type: 'dts', entry: 'index.d.ts' }])
  }

  for (const { entry, type } of entryFiles) {
    generateFramewrokEntryFileHeader(entry, type)
  }

  // copy README.md file to entry root
  await fs.copyFile(READEME_PATH, path.resolve(DIST, 'README.md'))
}
