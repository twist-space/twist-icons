import minimist from 'minimist'
import fs from 'fs-extra'
import { generateDir } from './generate-dir'
import { generateEntry } from './generate-entry'
import { buildComponents } from './build'
import { config } from './config'
import type { FrameNameType } from './types'
import {
  ReactBuildConfig,
  Vue3BuildConfig,
  Vue2BuildConfig
} from './build.config'
import {
  generateIconsModule,
  generateIconsModuleForVue2
} from './generate-icons'
import { generateManifest } from './generate-manifest'
import { checkIconifyVersion, checkNodeVersion } from './check-version'
import { spinner } from './utils'

async function task(name: string, fn: () => Promise<void>) {
  const s = spinner(name).start()
  try {
    await fn()
    s.succeed(`${name} successfully`)
  } catch (error) {
    s.fail(error)
    process.exit(1)
  }
}

async function generateReactIcons() {
  const { DIST } = ReactBuildConfig
  await task('Initialize react icons', async () => {
    await generateDir(ReactBuildConfig, 'react')
    await generateEntry(DIST)
    await generateManifest(ReactBuildConfig)
  })
  await task('Generate react icons module', async () => {
    await Promise.all(
      config.map((IconConfig) => generateIconsModule(IconConfig, DIST, 'react'))
    )
  })
  await task('Build react icons', async () => {
    await buildComponents()
  })
}

async function generateVue3Icons() {
  const { DIST } = Vue3BuildConfig
  await task('Initialize vue3 icons', async () => {
    await generateDir(Vue3BuildConfig, 'vue3')
    await generateEntry(DIST)
    await generateManifest(Vue3BuildConfig)
  })
  await task('Generate vue3 icons module', async () => {
    await Promise.all(
      config.map((IconConfig) => generateIconsModule(IconConfig, DIST, 'vue3'))
    )
  })
  await task('Build vue3 icons', async () => {
    await buildComponents('vue3')
  })
}

async function generateVue2Icons() {
  const { DIST } = Vue2BuildConfig
  await task('Initialize vue2 icons', async () => {
    await generateDir(Vue2BuildConfig, 'vue2')
    await generateEntry(DIST, false)
    await generateManifest(Vue2BuildConfig)
  })
  await task('Generate vue2 icons module', async () => {
    await Promise.all(
      config.map((IconConfig) => generateIconsModuleForVue2(IconConfig, DIST))
    )
  })
  await task('Build vue2 icons', async () => {
    await buildComponents('vue2')
  })
}

async function emptyDirs() {
  await fs.emptydir(ReactBuildConfig.DIST)
  await fs.emptyDir(Vue3BuildConfig.DIST)
  await fs.emptyDir(Vue2BuildConfig.DIST)
}

async function main() {
  const {
    vue2,
    vue3,
    react
  } = minimist<FrameNameType>(process.argv.slice(2))

  await checkNodeVersion()
  await checkIconifyVersion()
  await emptyDirs()
  vue2 && await generateVue2Icons()
  vue3 && await generateVue3Icons()
  react && await generateReactIcons()
}

main()
