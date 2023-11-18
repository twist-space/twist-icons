import path from 'path'
import { fileURLToPath } from 'url'

export const filePath = fileURLToPath(import.meta.url)
export const dirname = path.dirname(filePath)
export const distDir = path.resolve(dirname, '..', 'dist')
export const rootDir = path.resolve(dirname, '..')
