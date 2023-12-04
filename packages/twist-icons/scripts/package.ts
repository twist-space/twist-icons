import { normalizeName } from './utils'

export const packageMeta = (framename: string, version: string) => {
  const packageMataBase = {
    author: 'razzh <razzhavenir@163.com>',
    license: 'MIT',
    main: 'lib/cjs/index.js',
    module: 'lib/esm/index.js',
    types: 'lib/esm/index.d.ts',
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
      description: `${normalizeName(framename)} SVG icon components integrated from antd-design-icons and tdesign-icons`,
      ...packageMataBase
    },
    null,
    2
  )
}
