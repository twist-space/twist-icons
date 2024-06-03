import fse from 'fs-extra'
import { parseXml, XmlElement } from '@rgrove/parse-xml'
import path from 'path'
import camelCase from 'lodash.camelcase'
import { locate } from '@iconify/json'
import { IconConfig } from './config'
import { getTemplate } from './utils'
import type { FrameNameType } from './types'

export interface AbstractNode {
  tag: string
  attrs: {
    [key: string]: string
  }
  children?: AbstractNode[]
}
export interface IconDefinition {
  name: string
  abstractNode: AbstractNode
}

export function element2AbstractNode(svgIconNode: XmlElement, type: FrameNameType) {
  const node:AbstractNode = {
    tag: '',
    attrs: {}
  }
  if (Object.keys(svgIconNode).length) {
    const { name: tag, children, attributes } = svgIconNode
    node.tag = tag
    node.attrs = Object.keys(attributes)
      .reduce((obj, name: string) => {
        const nameKey = type === 'react' ? camelCase(name) : name
        obj[nameKey] = attributes[name]
        return obj
      }, {} as Record<string, string>)
    node.children = children && children.length ?
      children.map((child: XmlElement) =>
        element2AbstractNode(child, type)) :
      undefined
  }

  return node
}

// generate vue3 or react icons module
export async function generateIconsModule(
  IconConfig: IconConfig,
  DIST: string,
  type: FrameNameType
) {
  const exists = new Set() // for remove duplicate
  const iconCjsModuleTemplate = getTemplate('icon-cjs-module.ejs')
  const iconCjsHeaderTemplate = getTemplate('icon-cjs-header.ejs')
  const iconEsmModuleTemplate = getTemplate('icon-esm-module.ejs')
  const iconEsmHeaderTemplate = getTemplate('icon-esm-header.ejs')
  const iconTypesHeaderTemplate = getTemplate('icon-types-header.ejs')
  const iconTypesTemplate = getTemplate('icon-types-module.ejs')
  const {
    id,
    prefix,
    forrmatter
  } = IconConfig
  const iconifyPath = await locate(prefix)
  const {
    icons: iconify,
    width: generalWidth,
    height: generalHeight,
    info
  } = await fse.readJson(iconifyPath)

  if (iconify) {
    await Promise.all(
      Object.keys(iconify).map(async (iconNameRaw) => {
        const { body, width, height } = iconify[iconNameRaw]
        const pascalIconName = forrmatter(iconNameRaw)
        const mergedWidth = width || generalWidth || info?.height
        const mergeHeight = height || generalHeight || info?.height
        const rawIcon = `<svg viewBox="0 0 ${mergedWidth} ${mergeHeight}">${body}</svg>`
        const svgIconNode = parseXml(rawIcon)

        const abstractNode = element2AbstractNode(
          svgIconNode.children[0] as XmlElement,
          type
        )

        if (exists.has(pascalIconName)) return
        exists.add(pascalIconName)

        // generate cjs icon module
        await fse.writeFile(
          path.resolve(DIST, id, 'index.js'),
          iconCjsHeaderTemplate()
        )
        await fse.appendFile(
          path.resolve(DIST, id, 'index.js'),
          iconCjsModuleTemplate({
            name: pascalIconName,
            abstractNode: JSON.stringify(abstractNode)
          })
        )

        // generate esm icon module
        await fse.writeFile(
          path.resolve(DIST, id, 'index.mjs'),
          iconEsmHeaderTemplate()
        )
        await fse.appendFile(
          path.resolve(DIST, id, 'index.mjs'),
          iconEsmModuleTemplate({
            name: pascalIconName,
            abstractNode: JSON.stringify(abstractNode)
          })
        )

        // generate d.ts
        await fse.writeFile(
          path.resolve(DIST, id, 'index.d.ts'),
          iconTypesHeaderTemplate()
        )

        await fse.appendFile(
          path.resolve(DIST, id, 'index.d.ts'),
          iconTypesTemplate({
            name: pascalIconName
          })
        )

        // generate icon module package.json
        await fse.writeFile(
          path.resolve(DIST, id, 'package.json'),
          JSON.stringify({
            main: './index.js',
            module: './index.mjs',
            types: './index.d.ts',
            sideEffects: false
          }, null, 2)
        )
      })
    )
  }
}

export async function generateIconsModuleForVue2(IconConfig: IconConfig, DIST: string) {
  const exists = new Set() // for remove duplicate
  const iconCjsModuleTemplate = getTemplate('icon-cjs-module.vue2.ejs')
  const iconCjsHeaderTemplate = getTemplate('icon-cjs-header.ejs')
  const iconEsmModuleTemplate = getTemplate('icon-esm-module.vue2.ejs')
  const iconEsmHeaderTemplate = getTemplate('icon-esm-header.ejs')
  const {
    id,
    prefix,
    forrmatter
  } = IconConfig
  const iconifyPath = await locate(prefix)
  const {
    icons: iconify,
    width: generalWidth,
    height: generalHeight
  } = await fse.readJson(iconifyPath)

  if (iconify) {
    await Promise.all(
      Object.keys(iconify).map(async (iconNameRaw) => {
        const { body, width, height } = iconify[iconNameRaw]
        const pascalIconName = forrmatter(iconNameRaw)
        const mergedWidth = width || generalWidth
        const mergeHeight = height || generalHeight
        const rawIcon = `<svg viewBox="0 0 ${mergedWidth} ${mergeHeight}">${body}</svg>`
        const svgIconNode = parseXml(rawIcon)

        const abstractNode = element2AbstractNode(
          svgIconNode.children[0] as XmlElement,
          'vue2'
        )
        const Icon: IconDefinition = {
          name: pascalIconName,
          abstractNode
        }

        if (exists.has(pascalIconName)) return
        exists.add(pascalIconName)

        // generate cjs icon module
        await fse.writeFile(
          path.resolve(DIST, id, 'index.js'),
          iconCjsHeaderTemplate()
        )
        await fse.appendFile(
          path.resolve(DIST, id, 'index.js'),
          iconCjsModuleTemplate({
            name: pascalIconName,
            abstractNode: JSON.stringify(Icon)
          })
        )

        // generate esm icon module
        await fse.writeFile(
          path.resolve(DIST, id, 'index.mjs'),
          iconEsmHeaderTemplate()
        )
        await fse.appendFile(
          path.resolve(DIST, id, 'index.mjs'),
          iconEsmModuleTemplate({
            name: pascalIconName,
            abstractNode: JSON.stringify(Icon)
          })
        )

        // generate icon module package.json
        await fse.writeFile(
          path.resolve(DIST, id, 'package.json'),
          JSON.stringify({
            main: './index.js',
            module: './index.mjs',
            sideEffects: false
          }, null, 2)
        )
      })
    )
  }
}
