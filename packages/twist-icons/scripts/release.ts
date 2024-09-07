import { execa } from 'execa'
import minimist from 'minimist'
import { Vue2BuildConfig, Vue3BuildConfig, ReactBuildConfig } from './build.config'
import { spinner } from './utils'
import { version } from './version'
import type { FrameNameType } from './types'

export interface PublishConfig {
  PKG_NAME: string
  PKG_PATH: string
}

async function release(publishConifg: PublishConfig) {
  const { PKG_NAME, PKG_PATH } = publishConifg
  const s = spinner(`Publishing ${PKG_NAME}`).start()
  try {
    await execa('npm', ['publish', '--access=public'], {
      cwd: PKG_PATH
    })
    s.succeed(`Publishing ${PKG_NAME} v${version} successfully!`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('err', error)
    s.fail(error)
  }
}

async function main() {
  const { vue2, vue3, react } = minimist<FrameNameType>(process.argv.slice(2))
  const { VUE2_PUBLISH_CONFIG } = Vue2BuildConfig
  const { VUE3_PUBLISH_CONFIG } = Vue3BuildConfig
  const { REACT_PUBLISH_CONFIG } = ReactBuildConfig

  vue2 && await release(VUE2_PUBLISH_CONFIG)
  vue3 && await release(VUE3_PUBLISH_CONFIG)
  react && await release(REACT_PUBLISH_CONFIG)
}

main()
