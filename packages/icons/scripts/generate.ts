import fs from 'fs-extra'
import path from 'path'
import { execa } from 'execa'
import { transform } from '@babel/core'
import glob from 'fast-glob'
import minimist from 'minimist'
import print from './print'
import { config } from './config'
import { distDir, dirname } from './constants'
import {
  mkdirSync,
  getTemplate,
  getTSConfig,
  getBabelConfig,
  TSConfig,
  normalizeName
} from './util'

type IconOptions = {
  name: string
  svg: string
}

function babelify(config, filePath, outpath) {
  const fileName = path.basename(
    filePath,
    path.extname(filePath)
  )
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  fs.writeFileSync(
    path.resolve(outpath, `${fileName}.js`),
    transform(fileContent, config).code
  )
}

async function compileVue(
  type: string | boolean,
  tempPath: string,
  outpath: string,
  version: number
) {
  await mkdirSync(outpath)
  const module = type === 'cjs' ? 'commonjs' : false
  const babelConfig = getBabelConfig(module, version)
  const jsxFiles = await glob(`${tempPath}/**/*.jsx`)
  const entryFile = await glob(`${tempPath}/**/index.js`)

  if (jsxFiles.length) {
    jsxFiles.forEach((filePath) => {
      babelify(babelConfig, filePath, outpath)
    })
  }

  if (entryFile.length) {
    entryFile.forEach((filePath) => {
      babelify(babelConfig, filePath, outpath)
    })
  }

  if (version === 3) {
    const typesFiles = await glob(`${tempPath}/**/*.d.ts`)
    if (typesFiles.length) {
      typesFiles.forEach((filePath) => {
        const fileName = path.basename(filePath, '.d.ts')
        const types = fs.readFileSync(filePath, 'utf-8')
        fs.writeFileSync(
          path.resolve(outpath, `${normalizeName(fileName)}.d.ts`),
          types
        )
      })
    }
  }
}

async function compileTS(config: TSConfig, configPath, outpath) {
  const tsConfig = getTSConfig(configPath, config)
  const tsConfigPath = path.resolve(outpath, 'tsconfig.json')

  fs.writeFileSync(
    tsConfigPath,
    JSON.stringify(tsConfig, null, 2)
  )

  await execa('npx', ['tsc', '-p', tsConfigPath])
  fs.unlinkSync(tsConfigPath)
}

async function generateEntry(outpath, iconNames, template, ext = 'ts') {
  fs.writeFileSync(
    path.resolve(outpath, `index.${ext}`),
    iconNames.map((name) => template({ name })).join('\n')
  )
}

// generate Vue2 Icon Components
async function generateVue(icons, iconNames, iconSetName, basePath) {
  const vueTempalate = getTemplate('vue.jsx.ejs')
  const indexTemplate = getTemplate('index.ts.ejs')
  const tempPath = path.resolve(basePath, '_vue')
  const vuePath = path.resolve(basePath, 'vue')
  await mkdirSync(tempPath)
  await mkdirSync(vuePath)

  for (const {
    name,
    svg
  } of icons) {
    fs.writeFileSync(
      path.resolve(tempPath, `${name}.jsx`),
      vueTempalate({
        name,
        svg: svg.replace(/(<svg[^>]*)(>)/, '$1 {...svgProps} $2')
      })
    )
  }

  try {
    print.cyan(`Generating ${iconSetName} entry...`)
    // generate index.jsx
    await generateEntry(tempPath, iconNames, indexTemplate, 'js')
    print.cyan(`  compiling ${iconSetName} vue2 cjs components...`)
    // compile jsx to cjs code
    await compileVue('cjs', tempPath, `${vuePath}/lib`, 2)
    print.cyan(`  compiling ${iconSetName} vue2 esm components...`)
    // compile jsx to esm code
    await compileVue(false, tempPath, `${vuePath}/es`, 2)
    // remove _vue temp folder
    await fs.remove(tempPath)
    print.success(`${iconSetName} vue2 components generated successfully!`)
  } catch (err) {
    print.error(`[compileErrir]: ${err}`)
  }
}

// generate Vue3 Icon Components
async function generateVueNext(icons, iconNames, iconSetName, basePath) {
  const vueNextTempalate = getTemplate('vue-next.tsx.ejs')
  const indexTemplate = getTemplate('index.ts.ejs')
  const tempPath = path.resolve(basePath, '_vue-next')
  const vuePath = path.resolve(basePath, 'vue-next')
  const tempPathEs = path.resolve(basePath, '_vue-next/es')
  const tempPathLib = path.resolve(basePath, '_vue-next/lib')
  await mkdirSync(tempPath)
  await mkdirSync(vuePath)
  for (const {
    name,
    svg
  } of icons) {
    fs.writeFileSync(
      path.resolve(tempPath, `${name}.tsx`),
      vueNextTempalate({
        name,
        svg: svg.replace(/(<svg[^>]*)(>)/, '$1 {...attrs} $2')
      })
    )
  }

  // compile tsx to jsx and generaete d.ts
  const TSConfigCjs = {
    include: ['_vue-next/**/*'],
    compilerOptions: {
      module: 'commonjs',
      outDir: '_vue-next/lib'
    }
  }

  const TSConfigEsm = {
    include: ['_vue-next/**/*'],
    compilerOptions: {
      module: 'esnext',
      outDir: '_vue-next/es'
    }
  }
  const tsConfigPath = path.resolve(dirname, '../tsconfig.vue.json')

  try {
    print.cyan(`Generating ${iconSetName} entry...`)
    // generate index.jsx
    await generateEntry(tempPath, iconNames, indexTemplate, 'ts')
    print.cyan(`  compiling ${iconSetName} vue3 cjs components...`)
    // compile jsx to cjs code
    await compileTS(TSConfigCjs, tsConfigPath, basePath)
    await compileVue('cjs', tempPathLib, `${vuePath}/lib`, 3)
    print.cyan(`  compiling ${iconSetName} vue3 esm components...`)
    // compile jsx to esm code
    await compileTS(TSConfigEsm, tsConfigPath, basePath)
    await compileVue(false, tempPathEs, `${vuePath}/es`, 3)
    // remove _vue temp folder
    await fs.remove(tempPath)
    print.success(`${iconSetName} vue3 components generated successfully!`)
  } catch (err) {
    print.error(`[compileError]: ${err}`)
  }
}

async function generateReact(icons, iconNames, iconSetName, basePath) {
  const reactTemplate = getTemplate('react.ts.ejs')
  const indexTemplate = getTemplate('index.ts.ejs')
  const tempPath = path.resolve(basePath, '_react')
  const tsConfigPath = path.resolve(dirname, '../tsconfig.react.json')
  await mkdirSync(tempPath)

  // generate react components
  for (const {
    name,
    svg
  } of icons) {
    await fs.writeFileSync(
      path.resolve(tempPath, `${name}.tsx`),
      reactTemplate({
        name,
        svg: svg.replace(/(<svg[^>]*)(>)/, '$1 {...props} ref={ref} $2')
      })
    )
  }
  // compile tsx to cjs and esm
  const TSConfigCjs = {
    include: ['_react/**/*'],
    compilerOptions: {
      module: 'commonjs',
      outDir: 'react/lib'
    }
  }
  const TSConfigEsm = {
    include: ['_react/**/*'],
    compilerOptions: {
      module: 'esnext',
      outDir: 'react/es'
    }
  }

  try {
    print.cyan(`Generating ${iconSetName} entry...`)
    // generate index.ts
    await generateEntry(tempPath, iconNames, indexTemplate)
    print.cyan(`  compiling ${iconSetName} react cjs components...`)
    // compile ts to cjs code
    await compileTS(TSConfigCjs, tsConfigPath, basePath)
    print.cyan(`  compiling ${iconSetName} react esm components...`)
    // compile ts to esm code
    await compileTS(TSConfigEsm, tsConfigPath, basePath)
    // remove _react temp folder
    await fs.remove(tempPath)
    print.success(`${iconSetName} react components generated successfully!`)
  } catch (err) {
    print.error(`[compileError]: ${err}`)
  }
}

async function generateSnapshots(icons, iconSetName) {
  await mkdirSync(path.resolve(dirname, '../snapshots'))
  const snapTemplate = getTemplate('snapshots.ts.ejs')
  fs.writeFileSync(
    path.resolve(dirname, `../snapshots/${iconSetName}.spec.ts`),
    snapTemplate({
      identifier: iconSetName,
      snapshots: JSON.stringify(icons)
    })
  )
}

async function generateIcons() {
  const {
    vue,
    'vue-next': vueNext,
    react
  } = minimist<'vue' | 'vue-next' | 'react'>(process.argv.slice(2))

  await mkdirSync(distDir)
  const svgError = []
  for (const IconConfig of config) {
    const icons: IconOptions[] = []
    const {
      name: iconSetName,
      iconifyPath,
      normalizeName
    } = IconConfig
    const outputPath = path.resolve(distDir, `${iconSetName}-icons`)
    const iconify = fs.readJsonSync(iconifyPath)
    await mkdirSync(outputPath)

    if (iconify) {
      const {
        icons: iconifyIcons,
        width: generalWidth,
        height: generalHeight
      } = iconify

      Object.keys(iconifyIcons).forEach((iconKey) => {
        const { body, width, height } = iconifyIcons[iconKey]
        const mergedWidth = width || generalWidth
        const mergeHeight = height || generalHeight

        if (mergedWidth === undefined || mergeHeight === undefined) {
          svgError.push({
            name: iconSetName,
            errorMsg: `Icon ${iconKey} has no width or height`
          })
        }
        icons.push({
          name: normalizeName(iconKey),
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mergedWidth} ${mergeHeight}" width="1em" height="1em" focusable="false">${body}</svg>`
        })
      })

      if (svgError.length) {
        svgError.forEach(({ name, errorMsg }) => {
          print.warning(`[${name}]: ${errorMsg}`)
        })
      }

      const iconNames = icons.map((icon) => icon.name)
      await generateSnapshots(icons, iconSetName)
      vue && await generateVue(icons, iconNames, iconSetName, outputPath)
      vueNext && await generateVueNext(icons, iconNames, iconSetName, outputPath)
      react && await generateReact(icons, iconNames, iconSetName, outputPath)
    } else {
      print.error(`[generateIcons]: ${iconifyPath} not found`)
    }
  }
}

generateIcons()
