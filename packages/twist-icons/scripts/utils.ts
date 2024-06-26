import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'
import template from 'lodash.template'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import ora from 'ora'

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
