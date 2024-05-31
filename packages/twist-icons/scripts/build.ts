import { execa } from 'execa'
import path from 'path'
import fs from 'fs/promises'
import fse from 'fs-extra'
import { transformSync } from '@babel/core'
import glob from 'fast-glob'
import print from './print'
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

async function babelify(config: BabelConfig, filePath: string, outpath: string) {
  const fileName = path.basename(
    filePath,
    path.extname(filePath)
  )
  const fileContent = await fs.readFile(filePath, 'utf-8')
  try {
    await fs.writeFile(
      path.resolve(outpath, `${fileName}.js`),
      transformSync(fileContent, config).code
    )
  } catch (error) {
    print.error(error)
  }
}

async function buildReact() {
  const {
    LIB_ESM,
    LIB_CJS,
    BUILD_CJS,
    BUILD_ESM,
    TSCONFIG_CJS,
    TSCONFIG_ESM
  } = ReactBuildConfig
  try {
    // clear build dir
    await fse.emptydir(BUILD_CJS)
    await fse.emptyDir(BUILD_ESM)
    // build cjs
    await execa('npx', ['tsc', '-p', TSCONFIG_CJS])
    await copyRecursive(
      BUILD_CJS,
      LIB_CJS
    )
    // build esm
    await execa('npx', ['tsc', '-p', TSCONFIG_ESM])
    await copyRecursive(
      BUILD_ESM,
      LIB_ESM
    )
  } catch (error) {
    print.error(error)
  }
}

async function buildVue3() {
  const {
    LIB_ESM,
    LIB_CJS,
    BUILD_CJS,
    BUILD_ESM,
    JSXFILES_CJS,
    JSX_FILES_ESM,
    TYPES_FILES_CJS,
    TYPES_FILES_ESM,
    TSCONFIG_CJS,
    TSCONFIG_ESM,
    BABEL_CONFIG_CJS,
    BABEL_CONFIG_ESM
  } = Vue3BuildConfig

  try {
    // clear build dir
    await fse.emptydir(BUILD_CJS)
    await fse.emptyDir(BUILD_ESM)
    await execa('npx', ['tsc', '-p', TSCONFIG_CJS])
    await execa('npx', ['tsc', '-p', TSCONFIG_ESM])
    const jsxFilesCjs = await glob(JSXFILES_CJS)
    const jsxFilesEsm = await glob(JSX_FILES_ESM)
    const typeFilesCjs = await glob(TYPES_FILES_CJS)
    const typeFilesEsm = await glob(TYPES_FILES_ESM)
    await Promise.all([
      ...jsxFilesCjs.map((filePath) => babelify(BABEL_CONFIG_CJS, filePath, LIB_CJS)),
      ...jsxFilesEsm.map((filePath) => babelify(BABEL_CONFIG_ESM, filePath, LIB_ESM)),
      ...typeFilesCjs.map((filePath) => fs.copyFile(
        filePath,
        path.resolve(LIB_CJS, path.basename(filePath))
      )),
      ...typeFilesEsm.map((filePath) => fs.copyFile(
        filePath,
        path.resolve(LIB_ESM, path.basename(filePath))
      ))
    ])
  } catch (error) {
    print.error(error)
  }
}

async function buildVue2() {
  const {
    LIB_ESM,
    LIB_CJS,
    JSX_FILES,
    BABEL_CONFIG_CJS,
    BABEL_CONFIG_ESM
  } = Vue2BuildConfig
  const jsxFiles = await glob(JSX_FILES)
  try {
    await Promise.all(
      jsxFiles.map((filePath) => {
        babelify(BABEL_CONFIG_CJS, filePath, LIB_CJS)
        babelify(BABEL_CONFIG_ESM, filePath, LIB_ESM)
      })
    )
  } catch (error) {
    print.error(error)
  }
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
    await buildReact()
  }
}
