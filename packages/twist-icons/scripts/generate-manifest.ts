import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'
import { locate } from '@iconify/json'
import { config, type IconConfig } from './config'
import type { BuildCommonConfig } from './build.config'

export interface IconManifestType {
  id: string
  name: string
  author: string
  license: string
  licenseUrl: string
  projectUrl: string
  total: number
}

export async function generateManifest(
  buildConfig: BuildCommonConfig
) {
  const { LIB } = buildConfig

  await Promise.all(
    config.map(async (icon: IconConfig) => {
      const iconifyPath = await locate(icon.prefix)
      const { info: { author, license, total } } = await fse.readJson(iconifyPath)
      const iconManifest: IconManifestType = {
        id: icon.id,
        name: icon.name,
        author: author.name,
        projectUrl: author.url,
        license: license.title,
        licenseUrl: license.url,
        total
      }

      return iconManifest
    })
  ).then(
    async (iconManifest) => {
      const IconManifest = JSON.stringify(iconManifest, null, 2)

      // generate esm manifest.js
      await fs.writeFile(
        path.resolve(LIB, 'iconsManifest.mjs'),
        `export var IconsManifest = ${IconManifest}`
      )

      // generate cjs manifest.js
      await fs.writeFile(
        path.resolve(LIB, 'iconsManifest.js'),
        `module.exports.IconsManifest = ${IconManifest}`
      )
    }
  )
}
