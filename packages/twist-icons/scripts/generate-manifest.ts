import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'
import { locate } from '@iconify/json'
import { config, type IconConfig } from './config'
import { getTemplate } from './utils'
import type { BuildCommonConfig } from './build.config'

export interface IconManifestType {
  id: string
  name: string
  author: string
  license: string
  licenseUrl: string
  projectUrl: string
}

export async function generateManifest(
  buildConfig: BuildCommonConfig
) {
  const manifestTemplate = getTemplate('icon-types-manifest.ejs')
  const { LIB_ESM, LIB_CJS } = buildConfig

  await Promise.all(
    config.map(async (icon: IconConfig) => {
      const iconifyPath = await locate(icon.prefix)
      const { info: { author, license } } = await fse.readJson(iconifyPath)

      return {
        id: icon.id,
        name: icon.name,
        author: author.name,
        license: license.title,
        licenseUrl: license.url
      }
    })
  ).then(
    async (iconManifest) => {
      const IconManifest = JSON.stringify(iconManifest, null, 2)

      // generate esm manifest.js
      await fs.writeFile(
        path.resolve(LIB_ESM, 'iconsManifest.js'),
        `export var IconsManifest = ${IconManifest}`
      )

      // generate cjs manifest.js
      await fs.writeFile(
        path.resolve(LIB_CJS, 'iconsManifest.js'),
        `module.exports.IconsManifest = ${IconManifest}`
      )

      // generate esm dir manifest.d.ts
      await fs.writeFile(
        path.resolve(LIB_ESM, 'iconsManifest.d.ts'),
        manifestTemplate()
      )

      // generate lib dir manifest.d.ts
      await fs.writeFile(
        path.resolve(LIB_CJS, 'iconsManifest.d.ts'),
        manifestTemplate()
      )
    }
  )
}
