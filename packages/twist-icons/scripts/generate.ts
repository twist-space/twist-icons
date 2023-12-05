import minimist from 'minimist'
import print from './print'
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

async function task(name: string, fn: () => Promise<void>) {
  const start = performance.now()
  print.cyan(`================= ${name} =================`)
  await fn()
  const end = performance.now()
  print.cyan(`${name}:${Math.floor(end - start) / 1000} sec`)
}

async function generateReactIcons() {
  const { DIST, LIB } = ReactBuildConfig
  await task('initialize react icons', async () => {
    await generateDir({ DIST, LIB }, 'react')
    await generateEntry(DIST)
  })
  await task('generate react icons module', async () => {
    await Promise.all(
      config.map((IconConfig) => generateIconsModule(IconConfig, DIST, 'react'))
    )
  })
  await task('build react icons', async () => {
    await buildComponents()
  })
}

async function generateVue3Icons() {
  const { DIST, LIB } = Vue3BuildConfig
  await task('initialize vue3 icons', async () => {
    await generateDir({ DIST, LIB }, 'vue3')
    await generateEntry(DIST)
  })
  await task('generate vue3 icons module', async () => {
    await Promise.all(
      config.map((IconConfig) => generateIconsModule(IconConfig, DIST, 'vue3'))
    )
  })
  await task('build vue3 icons', async () => {
    await buildComponents('vue3')
  })
}

async function generateVue2Icons() {
  const { DIST, LIB } = Vue2BuildConfig
  await task('initialize vue2 icons', async () => {
    await generateDir({ DIST, LIB }, 'vue2')
    await generateEntry(DIST, false)
  })
  await task('generate vue2 icons module', async () => {
    await Promise.all(
      config.map((IconConfig) => generateIconsModuleForVue2(IconConfig, DIST))
    )
  })
  await task('build vue2 icons', async () => {
    await buildComponents('vue2')
  })
}

async function main() {
  const {
    vue2,
    vue3,
    react
  } = minimist<FrameNameType>(process.argv.slice(2))

  vue2 && await generateVue2Icons()
  vue3 && await generateVue3Icons()
  react && await generateReactIcons()
}

main()