import { normalizeName } from './utils'
import { iconConfig } from './config'
import type { FrameNameType } from './types'

function generatePeerDependencies(frameName: FrameNameType) {
  let peerDependencies: Record<string, string>

  if (frameName === 'react') {
    peerDependencies = {
      react: '*'
    }
  }

  if (frameName === 'vue3') {
    peerDependencies = {
      vue: '>=3.0.3'
    }
  }

  if (frameName === 'vue2') {
    peerDependencies = {
      vue: '>=2.5.0',
      'vue-template-compiler': '>=2.5.0'
    }
  }

  return peerDependencies
}

export const packageMeta = (framename: FrameNameType, version: string) => {
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

  // generate exports
  const hasTypes = framename === 'react' || framename === 'vue3'
  const defalutExports = (hasTypes: boolean) => ({
    ...(hasTypes && { types: './index.d.ts' }),
    require: './index.js',
    import: './index.mjs',
    default: './index.mjs'
  })
  const libExports = (hasTypes: boolean) => ({
    ...(hasTypes && { types: './lib/index.d.ts' }),
    require: './lib/index.js',
    import: './lib/index.mjs',
    default: './lib/index.mjs'
  })
  const exports: Record<string, Record<string, string>> = {}

  exports['.'] = defalutExports(hasTypes)
  exports['./lib'] = libExports(hasTypes)

  iconConfig.forEach(({ id }) => {
    exports[`./${id}`] = {
      types: `./${id}/index.d.ts`,
      require: `./${id}/index.js`,
      import: `./${id}/index.mjs`,
      defalut: `./${id}/index.mjs`
    }
  })

  const peerDependencies = generatePeerDependencies(framename)

  const devDependencies = framename === 'vue2'
    ? { '@vue/babel-helper-vue-jsx-merge-props': '^1.4.0' }
    : undefined

  if (framename === 'vue2') {
    Reflect.deleteProperty(packageMataBase, 'types')
  }

  return JSON.stringify(
    {
      name: `@twist-space/${framename}-icons`,
      version,
      description: `${normalizeName(framename)} SVG icon packs powered by Iconify`,
      ...packageMataBase,
      peerDependencies,
      exports,
      devDependencies
    },
    null,
    2
  )
}
