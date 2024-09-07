import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'
import template from 'lodash.template'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import ora from 'ora'

export interface Template {
  cjsModuleTemplate: (data: object) => string,
  esmModuleTemplate: (data: object) => string,
  typesModuleTemplate: (data: object) => string,
  cjsModuleTemplateVue2: (data: object) => string,
  esmModuleTemplateVue2: (data: object) => string
}

export function normalizeName(name: string) {
  return upperFirst(camelCase(name))
}

export async function rmDirRecursive(dist: string) {
  await fs.rm(dist, { recursive: true, force: true })
}

export function getTemplate(name: string): (data?: Record<string, string>) => string {
  const templatePath = path.resolve(__dirname, `../templates/${name}`)
  const content = fse.readFileSync(templatePath, 'utf-8')
  const executor = template(content)
  return executor
}

export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

export function spinner(str?: string) {
  return ora(str)
}

export function getFileName(filePath: string) {
  return path.basename(filePath, path.extname(filePath))
}

// template modules
export const cjsModuleTemplate = getTemplate('icon-cjs-module.ejs')
export const esmModuleTemplate = getTemplate('icon-esm-module.ejs')
export const typesModuleTemplate = getTemplate('icon-types-module.ejs')
export const cjsModuleTemplateVue2 = getTemplate('icon-cjs-module.vue2.ejs')
export const esmModuleTemplateVue2 = getTemplate('icon-esm-module.vue2.ejs')

// template headers
export const cjsHeaderTemplate = getTemplate('icon-cjs-header.ejs')
export const esmHeaderTemplate = getTemplate('icon-esm-header.ejs')
export const typesHeaderTemplate = getTemplate('icon-types-header.ejs')

// template lib entry
export const cjsLibEntryTemplate = 'module.exports = require(\'./lib/index.js\');'
export const esmLibEntryTemplate = 'export * from \'./lib/index.mjs\';'
export const dtsLibEntryTemplate = 'export * from \'./lib/index.d.ts\';'
