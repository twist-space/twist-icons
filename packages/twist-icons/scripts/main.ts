import minimist from 'minimist'
import fs from 'fs-extra'
import { generateDir } from './generate-dir'
import { buildComponents } from './build'
import { iconConfig } from './config'
import {
  ReactBuildConfig,
  Vue3BuildConfig,
  Vue2BuildConfig
} from './build.config'
import { generateIconsModule } from './generate-icons'
import { generateManifest } from './generate-manifest'
import { spinner } from './utils'
import type { FrameNameType } from './types'

async function task(name: string, fn: () => Promise<void> | void) {
  const s = spinner(name).start()
  try {
    await fn()
    s.succeed(`${name} successfully`)
  } catch (error) {
    s.fail(error)
    throw error
  }
}

async function generateReactIcons() {
  const { DIST } = ReactBuildConfig
  await task('Initialize react icons', async () => {
    await generateDir(ReactBuildConfig, 'react')
    await generateManifest(ReactBuildConfig)
  })
  await task('Generate react icons module', async () => {
    iconConfig.map((config) => generateIconsModule(config, DIST, 'react'))
  })
  await task('Build react icons', async () => {
    await buildComponents()
  })
}

async function generateVue3Icons() {
  const { DIST } = Vue3BuildConfig
  await task('Initialize vue3 icons', async () => {
    await generateDir(Vue3BuildConfig, 'vue3')
    await generateManifest(Vue3BuildConfig)
  })
  await task('Generate vue3 icons module', async () => {
    iconConfig.map((config) => generateIconsModule(config, DIST, 'vue3'))
  })
  await task('Build vue3 icons', async () => {
    await buildComponents('vue3')
  })
}

async function generateVue2Icons() {
  const { DIST } = Vue2BuildConfig
  await task('Initialize vue2 icons', async () => {
    await generateDir(Vue2BuildConfig, 'vue2')
    await generateManifest(Vue2BuildConfig)
  })
  await task('Generate vue2 icons module', async () => {
    iconConfig.map((config) => generateIconsModule(config, DIST, 'vue2'))
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

  await emptyDirs()
  vue2 && await generateVue2Icons()
  vue3 && await generateVue3Icons()
  react && await generateReactIcons()
}

main()
