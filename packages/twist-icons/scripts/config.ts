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
  forrmatter: (name: string) => string
}

export interface FrameworksConfig {
  dir: string
  scope: string
  descriptionPrefix: string
  keywords: string[]
}

export const iconConfig: IconConfig[] = [
  {
    id: 'ai',
    prefix: 'ant-design',
    name: 'Ant design Icons',
    forrmatter: (name) => `Ai${normalizeName(name)}`
  },
  {
    id: 'ti',
    prefix: 'tdesign',
    name: 'TDesign Icons',
    forrmatter: (name) => `Ti${normalizeName(name)}`
  },
  {
    id: 'mi',
    prefix: 'material-symbols',
    name: 'Material Icons',
    forrmatter: (name) => `Mi${normalizeName(name)}`
  },
  {
    id: 'si',
    prefix: 'svg-spinners',
    name: 'SVG Spinners',
    forrmatter: (name) => `Si${normalizeName(name)}`
  },
  {
    id: 'ion',
    prefix: 'ion',
    name: 'IonIcons',
    forrmatter: (name) => `Ion${normalizeName(name)}`
  },
  {
    id: 'ta',
    prefix: 'tabler',
    name: 'Tabler Icons',
    forrmatter: (name) => `Ta${normalizeName(name)}`
  },
  {
    id: 'bi',
    prefix: 'bi',
    name: 'Bootstrap Icons',
    forrmatter: (name) => `Bi${normalizeName(name)}`
  },
  {
    id: 'mdi',
    prefix: 'mdi',
    name: 'Material Design Icons',
    forrmatter: (name) => `Mdi${normalizeName(name)}`
  },
  {
    id: 'ra',
    prefix: 'radix-icons',
    name: 'Radix Icons',
    forrmatter: (name) => `Ra${normalizeName(name)}`
  },
  {
    id: 'sk',
    prefix: 'skill-icons',
    name: 'Skill Icons',
    forrmatter: (name) => `Sk${normalizeName(name)}`
  },
  {
    id: 'gg',
    prefix: 'gg',
    name: 'css.gg',
    forrmatter: (name) => `Gg${normalizeName(name)}`
  },
  {
    id: 'so',
    prefix: 'solar',
    name: 'Solar',
    forrmatter: (name) => `So${normalizeName(name)}`
  },
  {
    id: 'ep',
    prefix: 'ep',
    name: 'Element Plus',
    forrmatter: (name) => `Ep${normalizeName(name)}`
  },
  {
    id: 'su',
    prefix: 'system-uicons',
    name: 'system-uicons',
    forrmatter: (name) => `Su${normalizeName(name)}`
  },
  {
    id: 'ph',
    prefix: 'ph',
    name: 'Phosphor',
    forrmatter: (name) => `Ph${normalizeName(name)}`
  },
  {
    id: 'te',
    prefix: 'twemoji',
    name: 'Twitter Emoji',
    forrmatter: (name) => `Te${normalizeName(name)}`
  },
  {
    id: 'lu',
    prefix: 'lucide',
    name: 'Lucide',
    forrmatter: (name) => `Lu${normalizeName(name)}`
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
