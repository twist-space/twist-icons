import fs from 'fs-extra'
import path from 'path'
import template from 'lodash.template'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import { dirname } from './constants'

export interface TSConfig {
  include: string[]
  compilerOptions: Record<string, string | boolean | string[]>
}

export type modules = 'commonjs' | 'cjs' | false
export type PresetType = [string, Record<string, modules>]

export function normalizeName(name: string) {
  return upperFirst(camelCase(name))
}

export function mkdirSync(path: string) {
  if (!fs.pathExistsSync(path)) {
    fs.mkdirSync(path)
  }
}

export function getTSConfig(
  tsconfigPath = path.resolve(dirname, '../tsconfig.json'),
  extendsConfig: TSConfig = {
    include: [],
    compilerOptions: {}
  }
) {
  if (fs.pathExistsSync(tsconfigPath)) {
    const config = fs.readJsonSync(tsconfigPath)
    extendsConfig.compilerOptions = { ...config.compilerOptions, ...extendsConfig.compilerOptions }
    Object.assign(config, extendsConfig)
    return config
  }

  return { ...extendsConfig }
}

export function getTemplate(name: string): (data: Record<string, string>) => string {
  const templatePath = path.resolve(dirname, `../templates/${name}`)
  const content = fs.readFileSync(templatePath, 'utf-8')
  const executor = template(content)
  return executor
}

/**
 * @param modules
 * false -> es6
 * cjs -> commonjs
 */
export function getBabelConfig(
  modules: modules,
  version: number
) {
  const plugins = version === 3 ? ['@vue/babel-plugin-jsx'] : []
  const presets: PresetType[] = [['@babel/preset-env', { modules }]]
  if (version === 2) {
    presets.push(['@vue/babel-preset-jsx', { enableObjectSlots: false }])
  }

  return {
    presets,
    plugins
  }
}
