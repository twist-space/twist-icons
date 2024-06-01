import { normalizeName } from './utils'
import type { FrameNameType } from './types'

export const packageMeta = (framename: FrameNameType, version: string) => {
  const devDependencies = framename === 'vue2'
    ? { '@vue/babel-helper-vue-jsx-merge-props': '^1.4.0' }
    : undefined
  const packageMataBase = {
    author: 'razzh <razzhavenir@163.com>',
    license: 'MIT',
    main: 'lib/index.js',
    module: 'lib/index.mjs',
    types: 'lib/index.d.ts',
    sideEffects: false,
    repository: {
      type: 'git',
      url: 'https://github.com/twist-space/twist-icons.git'
    },
    bugs: {
      url: 'https://github.com/twist-space/twist-icons/issues'
    },
    homepage: 'https://github.com/twist-space/twist-icons#readme'
  }

  return JSON.stringify(
    {
      name: `@twist-space/${framename}-icons`,
      version,
      description: `${normalizeName(framename)} SVG icon packs powered by Iconify`,
      ...packageMataBase,
      devDependencies
    },
    null,
    2
  )
}
