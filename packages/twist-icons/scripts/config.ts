import { locate } from '@iconify/json'
import { normalizeName } from './utils'

export interface IconConfig {
  id: string
  name: string
  description: (name: string) => string
  forrmatter: (name: string) => string
  iconifyPath: string
  keywords: string[]
}

export interface FrameworksConfig {
  dir: string
  scope: string
  descriptionPrefix: string
  keywords: string[]
}

export const config: IconConfig[] = [
  {
    id: 'ai',
    name: 'antd',
    description: (prefix) =>
      `${prefix} integrated from https://github.com/ant-design/ant-design-icons`,
    forrmatter: (name) => `Ai${normalizeName(name)}`,
    iconifyPath: locate('ant-design') as string,
    keywords: ['antd', 'ant-design', 'ant-design-icons']
  },
  {
    id: 'ti',
    name: 'tdesign',
    description: (prefix) =>
      `${prefix} integrated from https://github.com/Tencent/tdesign-icons`,
    forrmatter: (name) => `Ti${normalizeName(name)}`,
    iconifyPath: locate('tdesign') as string,
    keywords: ['tdesign', 'tdesign', 'tdesign-icons']
  }
]

export const frameworksConfig: FrameworksConfig[] = [
  {
    dir: 'react',
    scope: 'twist-icons-react',
    descriptionPrefix: 'React SVG icon components',
    keywords: ['react', 'react-icon', 'react-icon-component']
  },
  {
    dir: 'vue',
    scope: 'twist-icons-vue',
    descriptionPrefix: 'Vue 2 SVG icon components',
    keywords: ['vue', 'vue-icon', 'vue-icon-component']
  },
  {
    dir: 'vue-next',
    scope: 'twist-icons-vue3',
    descriptionPrefix: 'Vue 3 SVG icon components',
    keywords: ['vue3', 'vue3-icon', 'vue3-icon-component']
  }
]
