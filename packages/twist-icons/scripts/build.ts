import { execa } from 'execa'
import path from 'path'
import fs from 'fs/promises'
import fse from 'fs-extra'
import { transformSync } from '@babel/core'
import glob from 'fast-glob'
import print from './print'
import { getFileName } from './utils'
import { ReactBuildConfig, Vue3BuildConfig, Vue2BuildConfig } from './build.config'
import type { BabelConfig } from './types'

export type buildType = 'react' | 'vue3' | 'vue2'

async function copyRecursive(src: string, dest: string) {
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const sPath = path.join(src, entry.name)
    const dPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyRecursive(sPath, dPath)
    } else {
      await fs.copyFile(sPath, dPath)
    }
  }
}

interface BabelifyOptions {
  config: BabelConfig
  type: 'cjs' | 'esm'
  filePath: string
  outpath: string
}

async function babelify(options: BabelifyOptions): Promise<void> {
  const { config, type, filePath, outpath } = options
  const fileName = getFileName(filePath)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const extname = type === 'cjs' ? 'js' : 'mjs'

  try {
    await fs.writeFile(
      path.resolve(outpath, `${fileName}.${extname}`),
      transformSync(fileContent, config).code
    )
  } catch (error) {
    print.error(error)
    throw error
  }
}

interface BabelConfigs {
  type: 'cjs' | 'esm'
  config: BabelConfig
}

async function buildReactWithBable() {
  const {
    SRC,
    LIB,
    BUILD_PATH,
    TSCONFIG,
    BABEL_CONFIG_CJS,
    BABEL_CONFIG_ESM
  } = ReactBuildConfig
  const BabelConfigs: BabelConfigs[] = [
    { type: 'cjs', config: BABEL_CONFIG_CJS },
    { type: 'esm', config: BABEL_CONFIG_ESM }
  ]
  const transformFiles = await glob(`${SRC}/**/*.{tsx,ts}`, {
    ignore: ['**/*.d.ts']
  })

  try {
    // clear build dir
    await fse.emptydir(BUILD_PATH)
    // only emit declaration files
    await execa('npx', ['tsc', '-p', TSCONFIG])
    // then use babel transform code to build dir
    await Promise.all(
      BabelConfigs.map(async (item) => {
        const { type, config } = item
        await Promise.all(
          transformFiles.map(async (filePath) => {
            const code = await fs.readFile(filePath, 'utf-8')
            const result = transformSync(code, config)
            const fileName = getFileName(filePath)
            const _path = type === 'esm' ? `${BUILD_PATH}/${fileName}.mjs` : `${BUILD_PATH}/${fileName}.js`
            await fs.writeFile(_path, result.code)
          })
        )
      })
    )
    // copy .d.ts files to build dir
    await fse.copyFile(
      `${SRC}/iconsManifest.d.ts`,
      `${BUILD_PATH}/iconsManifest.d.ts`
    )
    // copy build dir files to lib dir
    await copyRecursive(BUILD_PATH, LIB)
  } catch (error) {
    print.error(error)
    throw error
  }
}

async function buildVue3() {
  const {
    SRC,
    LIB,
    BUILD_PATH,
    TSCONFIG,
    BABEL_CONFIG_CJS,
    BABEL_CONFIG_ESM
  } = Vue3BuildConfig
  const BabelConfigs: BabelConfigs[] = [
    { type: 'cjs', config: BABEL_CONFIG_CJS },
    { type: 'esm', config: BABEL_CONFIG_ESM }
  ]
  const transformFiles = await glob(`${SRC}/**/*.{tsx,ts}`, {
    ignore: ['**/*.d.ts']
  })

  try {
    // clear build dir
    await fse.emptydir(BUILD_PATH)
    // only emit declaration files
    await execa('npx', ['tsc', '-p', TSCONFIG])
    // then use babel transform code to build dir
    await Promise.all(
      BabelConfigs.map(async (item) => {
        const { type, config } = item
        await Promise.all(
          transformFiles.map(async (filePath) => {
            await babelify({ config, type, filePath, outpath: BUILD_PATH })
          })
        )
      })
    )
    // copy .d.ts files to build dir
    await fse.copyFile(
      `${SRC}/iconsManifest.d.ts`,
      `${BUILD_PATH}/iconsManifest.d.ts`
    )
    // copy build dir files to lib dir
    await copyRecursive(BUILD_PATH, LIB)
  } catch (error) {
    print.error(error)
    throw error
  }
}

async function buildVue2() {
  const {
    LIB,
    JSX_FILES,
    BABEL_CONFIG_CJS,
    BABEL_CONFIG_ESM
  } = Vue2BuildConfig
  const jsxFiles = await glob(JSX_FILES)

  jsxFiles.map((filePath) => {
    babelify({
      config: BABEL_CONFIG_CJS,
      type: 'cjs',
      filePath,
      outpath: LIB
    })
    babelify({
      config: BABEL_CONFIG_ESM,
      type: 'esm',
      filePath,
      outpath: LIB
    })
  })
}

export async function buildComponents(buildType: buildType = 'react') {
  switch (buildType) {
  case 'vue3':
    await buildVue3()
    break
  case 'vue2':
    await buildVue2()
    break
  default:
    await buildReactWithBable()
  }
}
