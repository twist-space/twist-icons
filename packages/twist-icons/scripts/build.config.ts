import path from 'path'
import { getBabelConfig } from './utils'

export const rootDir = path.resolve(__dirname, '../')

export function resolve(dir: string) {
  return path.resolve(rootDir, dir)
}

export const READEME_PATH = resolve('../../README.md')
export const ReactBuildConfig = {
  PKG_NAME: '@twist-space/react-icons',
  DIST: resolve('../_react-icons'),
  LIB: resolve('../_react-icons/lib'),
  LIBESM: resolve('../_react-icons/lib/esm'),
  LIBCJS: resolve('../_react-icons/lib/cjs'),
  BUILDESM: resolve('build/react/esm'),
  BUILDCJS: resolve('build/react/cjs'),
  TSCONFIG_CJS: resolve('tsconfig.react.cjs.json'),
  TSCONFIG_ESM: resolve('tsconfig.react.esm.json'),
  REACT_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_react-icons'),
    PKG_NAME: '@twist-space/react-icons'
  }
}

export const Vue3BuildConfig = {
  PKG_NAME: '@twist-space/vue3-icons',
  DIST: resolve('../_vue-icons'),
  LIB: resolve('../_vue-icons/lib'),
  LIB_ESM: resolve('../_vue-icons/lib/esm'),
  LIB_CJS: resolve('../_vue-icons/lib/cjs'),
  BUILD_ESM: resolve('build/vue/esm'),
  BUILD_CJS: resolve('build/vue/cjs'),
  JSXFILES_CJS: resolve('build/vue/cjs/**/*.jsx'),
  JSX_FILES_ESM: resolve('build/vue/esm/*.jsx'),
  JS_FILES_ESM: resolve('build/vue/esm/*.js'),
  JS_FILES_CJS: resolve('build/vue/cjs/*.js'),
  TYPES_FILES_ESM: resolve('build/vue/esm/*.d.ts'),
  TYPES_FILES_CJS: resolve('build/vue/cjs/*.d.ts'),
  TSCONFIG_CJS: resolve('tsconfig.vue.cjs.json'),
  TSCONFIG_ESM: resolve('tsconfig.vue.esm.json'),
  BABEL_CONFIG_CJS: getBabelConfig('cjs', 3),
  BABEL_CONFIG_ESM: getBabelConfig(false, 3),
  VUE3_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_vue3-icons'),
    PKG_NAME: '@twist-space/vue3-icons'
  }
}

export const Vue2BuildConfig = {
  DIST: resolve('../_vue2-icons'),
  LIB: resolve('../_vue2-icons/lib'),
  LIB_ESM: resolve('../_vue2-icons/lib/esm'),
  LIB_CJS: resolve('../_vue2-icons/lib/cjs'),
  JSX_FILES: resolve('src/vue2/**/*.jsx'),
  BABEL_CONFIG_CJS: getBabelConfig('cjs', 2),
  BABEL_CONFIG_ESM: getBabelConfig(false, 2),
  VUE2_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_vue2-icons'),
    PKG_NAME: '@twist-space/vue2-icons'
  }
}
