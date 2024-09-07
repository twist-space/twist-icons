import fse from 'fs-extra'
import { parseXml, XmlElement } from '@rgrove/parse-xml'
import path from 'path'
import camelCase from 'lodash.camelcase'
import { locate } from '@iconify/json'
import { type IconConfig } from './config'
import {
  cjsModuleTemplate,
  esmModuleTemplate,
  typesModuleTemplate,
  cjsModuleTemplateVue2,
  esmModuleTemplateVue2
} from './utils'
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

// generate icons module
export async function generateIconsModule(
  iconConfig: IconConfig,
  DIST: string,
  type: FrameNameType
) {
  const exists = new Set() // for remove duplicate
  const {
    id,
    prefix,
    forrmatter
  } = iconConfig
  const iconifyPath = await locate(prefix)
  const {
    icons: iconify,
    width: generalWidth,
    height: generalHeight,
    info
  } = await fse.readJson(iconifyPath)
  const cjsModules: string[] = []
  const esmModules: string[] = []
  const typesModules: string[] = []

  if (iconify) {
    await Promise.all(
      Object.keys(iconify).map(async (iconKey) => {
        const { body, width, height } = iconify[iconKey]
        const pascalIconName = forrmatter(iconKey)
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

        /**
         * avoid to many files operation in for-loop
         * generate modules to memory is better than fs
         */
        if (type === 'react' || type === 'vue3') {
          cjsModules.push(cjsModuleTemplate({
            name: pascalIconName,
            abstractNode: JSON.stringify(abstractNode)
          }))

          esmModules.push(esmModuleTemplate({
            name: pascalIconName,
            abstractNode: JSON.stringify(abstractNode)
          }))

          typesModules.push(typesModuleTemplate({
            name: pascalIconName
          }))
        }

        if (type === 'vue2') {
          cjsModules.push(cjsModuleTemplateVue2({
            name: pascalIconName,
            abstractNode: JSON.stringify({
              name: pascalIconName,
              abstractNode
            })
          }))

          esmModules.push(esmModuleTemplateVue2({
            name: pascalIconName,
            abstractNode: JSON.stringify({
              name: pascalIconName,
              abstractNode
            })
          }))
        }
      })
    )

    // Write to files in one go
    await fse.appendFile(
      path.resolve(DIST, id, 'index.js'),
      cjsModules.join('\n')
    )

    await fse.appendFile(
      path.resolve(DIST, id, 'index.mjs'),
      esmModules.join('\n')
    )

    if (type !== 'vue2') {
      await fse.appendFile(
        path.resolve(DIST, id, 'index.d.ts'),
        typesModules.join('\n')
      )
    }
  }
}
