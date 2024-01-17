import { normalizeName } from './utils'

export interface IconManifest {
  id: string
  name: string
  author: string
  license: string
  licenseUrl: string
  projectUrl: string
}

export interface IconConfig {
  id: string
  // read icon json when use iconify locate
  prefix: string
  name: string
  description: (name: string) => string
  forrmatter: (name: string) => string
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
    prefix: 'ant-design',
    name: 'Ant design Icons',
    description: (prefix) =>
      `${prefix} integrated from https://github.com/ant-design/ant-design-icons`,
    forrmatter: (name) => `Ai${normalizeName(name)}`
  },
  {
    id: 'ti',
    prefix: 'tdesign',
    name: 'TDesign Icons',
    description: (prefix) =>
      `${prefix} integrated from https://github.com/Tencent/tdesign-icons`,
    forrmatter: (name) => `Ti${normalizeName(name)}`
  },
  {
    id: 'mi',
    prefix: 'material-symbols',
    name: 'Material Icons',
    description: (prefix) =>
      `${prefix} integrated from https://github.com/google/material-design-icons`,
    forrmatter: (name) => `Mi${normalizeName(name)}`
  },
  {
    id: 'si',
    prefix: 'svg-spinners',
    name: 'SVG Spinners',
    description: (prefix) =>
      `${prefix} integrated from https://github.com/n3r4zzurr0/svg-spinners`,
    forrmatter: (name) => `Si${normalizeName(name)}`
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
