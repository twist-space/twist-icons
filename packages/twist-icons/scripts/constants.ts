import path from 'path'
import { fileURLToPath } from 'url'

export const filePath = fileURLToPath(import.meta.url)
export const dirname = path.dirname(filePath)
export const allIconsDir = path.resolve(dirname, '../../', 'icons')
export const rootDir = path.resolve(dirname, '..')
