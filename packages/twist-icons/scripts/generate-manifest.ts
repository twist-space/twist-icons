import fs from 'fs/promises'
import path from 'path'
import { config, type IconManifest } from './config'
import { getTemplate } from './utils'
import type { BuildCommonConfig } from './build.config'

export async function generateManifest(
  buildConfig: BuildCommonConfig
) {
  const manifestTemplate = getTemplate('icon-types-manifest.ejs')
  const { LIB_ESM, LIB_CJS } = buildConfig

  const iconInfo = config.map((icon: IconManifest) => {
    return {
      id: icon.id,
      name: icon.name,
      license: icon.license,
      licenseUrl: icon.licenseUrl,
      projectUrl: icon.projectUrl
    }
  })
  const IconManifest = JSON.stringify(iconInfo, null, 2)

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
