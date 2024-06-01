import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'
import template from 'lodash.template'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import ora from 'ora'
import type { modules, BabelConfig } from './types'

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

/**
 * @description Vue2/3 babel config
 * @param modules
 * false -> es6
 * cjs -> commonjs
 */
export function getVueBabelConfig(
  modules: modules,
  version: number
): BabelConfig {
  const plugins: BabelConfig['plugins'] =
    version === 3
      ? [['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }]]
      : []
  const presets: BabelConfig['presets'] = [['@babel/preset-env', { modules }]]

  if (version === 3) {
    presets.push(['@babel/preset-typescript', { isTSX: true, allExtensions: true }])
  }
  if (version === 2) {
    presets.push(['@vue/babel-preset-jsx', { enableObjectSlots: false }])
  }

  return {
    presets,
    plugins
  }
}

/**
 * @description React babel config
 * @param modules
 * false -> es6
 * cjs -> commonjs
 */
export function getReactBabelConfig(modules: modules): BabelConfig {
  return {
    presets: [
      ['@babel/preset-env', { modules }],
      '@babel/preset-react',
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
    ]
  }
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
