import { execa, execaCommand } from 'execa'
import path from 'path'
import fs from 'fs/promises'
import fse from 'fs-extra'
import print from './print'
import { ReactBuildConfig, Vue3BuildConfig, Vue2BuildConfig } from './build.config'

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

async function buildReactWithBable() {
  const {
    SRC,
    LIB,
    BUILD_PATH,
    TSCONFIG
  } = ReactBuildConfig
  try {
    // clear build dir
    await fse.emptydir(BUILD_PATH)
    // only emit declaration files
    await execa('npx', ['tsc', '-p', TSCONFIG])
    // then use babel transform code to build dir
    await Promise.all(
      [
        execaCommand(
          'npx babel --config-file ./config/babel.react.esm.json --extensions=.ts,.tsx ./src/react --ignore "**/*.d.ts" --out-dir ./build/react --out-file-extension .mjs',
          { shell: true }
        ),
        execaCommand(
          'npx babel --config-file ./config/babel.react.cjs.json --extensions=.ts,.tsx ./src/react --ignore "**/*.d.ts" --out-dir ./build/react --out-file-extension .js',
          { shell: true }
        )
      ]
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
    TSCONFIG
  } = Vue3BuildConfig

  try {
    // clear build dir
    await fse.emptydir(BUILD_PATH)
    // only emit declaration files
    await execa('npx', ['tsc', '-p', TSCONFIG])
    // then use babel transform code to build dir
    await Promise.all([
      execaCommand(
        'npx babel --config-file ./config/babel.vue3.esm.json --extensions=.ts,.tsx ./src/vue3 --ignore "**/*.d.ts" --out-dir ./build/vue3 --out-file-extension .mjs',
        { shell: true }
      ),
      execaCommand(
        'npx babel --config-file ./config/babel.vue3.cjs.json --extensions=.ts,.tsx ./src/vue3 --ignore "**/*.d.ts" --out-dir ./build/vue3 --out-file-extension .js',
        { shell: true }
      )
    ])
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
  const { LIB, BUILD_PATH } = Vue2BuildConfig
  await Promise.all([
    execaCommand(
      'npx babel --config-file ./config/babel.vue2.esm.json --extensions=.js,.jsx ./src/vue2 --ignore "**/*.d.ts" --out-dir ./build/vue2 --out-file-extension .mjs',
      { shell: true }
    ),
    execaCommand(
      'npx babel --config-file ./config/babel.vue2.cjs.json --extensions=.js,.jsx ./src/vue2 --ignore "**/*.d.ts" --out-dir ./build/vue2 --out-file-extension .js',
      { shell: true }
    )
  ])
  // copy build dir files to lib dir
  await copyRecursive(BUILD_PATH, LIB)
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
