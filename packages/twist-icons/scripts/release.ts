import path from 'path'
import fs from 'fs-extra'
import { execa } from 'execa'
import minimist from 'minimist'
import { config, frameworksConfig, IconConfig } from './config'
import { versionVue, versionVueNext, versionReact } from './version'
import { getTemplate } from './util'
import print from './print'
import { allIconsDir } from './constants'

export type frameType = 'vue' | 'vue-next' | 'react'
const args = minimist<frameType>(process.argv.slice(2))
const versionMap = {
  vue: versionVue,
  'vue-next': versionVueNext,
  react: versionReact
}

async function release(iconConfig: IconConfig, frameName: frameType) {
  const {
    dir: frameworkDir,
    scope,
    descriptionPrefix,
    keywords
  } = frameworksConfig.find((item) => item.dir === frameName)

  const scopedPackageName = `@${scope}/${iconConfig.name}`
  const scopedPackagePath = path.resolve(allIconsDir, `${iconConfig.name}-icons/${frameworkDir}`)
  const description = iconConfig.description(descriptionPrefix)
  const readmeTemplate = getTemplate('readme.md.ejs')
  const packageMeta = {
    name: scopedPackageName,
    version: versionMap[frameworkDir],
    description,
    author: 'razzh7 <razzhavenir@163.com>',
    license: 'MIT',
    main: 'lib/index.js',
    module: 'es/index.js',
    types: 'es/index.d.ts',
    exports: {
      '.': {
        types: './es/index.d.ts',
        import: './es/index.js',
        require: './lib/index.js'
      },
      './package.json': './package.json'
    },
    sideEffects: false,
    repository: {
      type: 'git',
      url: 'https://github.com/razzh7/twist-icons.git',
      directory: `packages/${iconConfig.name}-icons/${frameworkDir}`
    },
    files: ['lib', 'es', 'README.md'],
    keywords: ['icon'].concat(keywords),
    peerDependencies: {},
    devDependencies: {}
  }

  if (frameworkDir === 'vue') {
    packageMeta.peerDependencies = {
      vue: '^2.6.0'
    }
    packageMeta.devDependencies = {
      '@vue/babel-helper-vue-jsx-merge-props': '^1.4.0'
    }
    delete packageMeta.types
    delete packageMeta.exports['.'].types
  }

  if (frameworkDir === 'vue-next') {
    packageMeta.peerDependencies = {
      vue: '^3.0.0'
    }
  }

  if (frameworkDir === 'react') {
    packageMeta.peerDependencies = {
      react: '>=16.13.1',
      'react-dom': '>=16.13.1'
    }
    delete packageMeta.devDependencies
  }

  // generate package.json
  fs.writeFileSync(
    path.resolve(scopedPackagePath, 'package.json'),
    JSON.stringify(packageMeta, null, 2)
  )
  // generate README.md
  fs.writeFileSync(
    path.resolve(scopedPackagePath, 'README.md'),
    readmeTemplate({ name: scopedPackageName, description })
  )

  try {
    print.cyan(`Publishing ${scopedPackageName}...`)
    await execa('npm', ['publish', '--access=public'], {
      cwd: scopedPackagePath
    })
    print.success(`Publishing ${scopedPackageName + packageMeta.version} successfully!`)
  } catch (err) {
    print.error(err)
  }
}

async function main() {
  const { vue, 'vue-next': vueNext, react } = args
  for (const iconConfig of config) {
    if (vue) {
      await release(iconConfig, 'vue')
    }

    if (vueNext) {
      await release(iconConfig, 'vue-next')
    }

    if (react) {
      await release(iconConfig, 'react')
    }
  }
}

main()
