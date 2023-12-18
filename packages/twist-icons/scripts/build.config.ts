import path from 'path'
import { getBabelConfig } from './utils'
import type { BabelConfig } from './types'

export interface BuildCommonConfig {
  /**
   * package.json name
   * @zh package.json name
   */
  PKG_NAME?: string
  /**
   * dist dir
   * @zh dist 目录
   */
  DIST: string
  /**
   * lib dir
   * @zh lib 目录
   */
  LIB: string
  /**
   * lib/esm dir
   * @zh lib/esm 目录
   */
  LIB_ESM: string
  /**
   * lib/cjs dir
   * @zh lib/cjs 目录
   */
  LIB_CJS: string
}

export interface BuildReactConfig extends BuildCommonConfig {
  /**
   * build react es module dir
   * @zh 打包 react es module 目录
   */
  BUILD_ESM: string
  /**
   * build react commonjs dir
   * @zh 打包 react commonjs 目录
   */
  BUILD_CJS: string
  /**
   * tsconfig.react.cjs.json path
   * @zh tsconfig.react.cjs.json 路径
   */
  TSCONFIG_CJS: string
  /**
   * tsconfig.react.esm.json path
   * @zh tsconfig.react.esm.json 路径
   */
  TSCONFIG_ESM: string
  /**
   * react publish config
   * @zh react 发布配置
   */
  REACT_PUBLISH_CONFIG: {
    /**
     * package path
     * @zh package 路径
     */
    PKG_PATH: string
    /**
     * package name
     * @zh package 名称
     */
    PKG_NAME: string
  }
}

export interface BuildVue3Config extends BuildCommonConfig {
  /**
   * build Vue3 es module dir
   * @zh 打包 Vue3 es module 目录
   */
  BUILD_ESM: string
  /**
   * build Vue3 commonjs dir
   * @zh 打包 Vue3 commonjs 目录
   */
  BUILD_CJS: string
  /**
   * build Vue3 commonjs jsx files
   * @zh 打包 Vue3 commonjs jsx 文件
   */
  JSXFILES_CJS: string
  /**
   * build Vue3 es module jsx files
   * @zh 打包 Vue3 es module jsx 文件
   */
  JSX_FILES_ESM: string
  /**
   * build Vue3 commonjs js files
   * @zh 打包 Vue3 commonjs js 文件
   */
  JS_FILES_CJS: string
  /**
   * build Vue3 es module js files
   * @zh 打包 Vue3 es module js 文件
   */
  JS_FILES_ESM: string
  /**
   * tsconfig.vue.cjs.json path
   * @zh tsconfig.vue.cjs.json 路径
   */
  /**
   * build Vue3 commonjs types files
   * @zh 打包 Vue3 commonjs types 文件
   */
  TYPES_FILES_CJS: string
  /**
   * build Vue3 es module types files
   * @zh 打包 Vue3 es module types 文件
   */
  TYPES_FILES_ESM: string
  TSCONFIG_CJS: string
  /**
   * tsconfig.vue.esm.json path
   * @zh tsconfig.vue.esm.json 路径
   */
  TSCONFIG_ESM: string
  /**
   * babel config for Vue3 commonjs
   * @zh Vue3 commonjs babel 配置
   */
  BABEL_CONFIG_CJS: BabelConfig
  /**
   * babel config for Vue3 es module
   * @zh Vue3 es module babel 配置
   */
  BABEL_CONFIG_ESM: BabelConfig
  /**
   * Vue3 publish config
   * @zh Vue3 发布配置
   */
  VUE3_PUBLISH_CONFIG: {
    /**
     * package path
     * @zh package 路径
     */
    PKG_PATH: string
    /**
     * package name
     * @zh package 名称
     */
    PKG_NAME: string
  }
}

export interface BuildVue2Config extends BuildCommonConfig {
  JSX_FILES: string
  /**
   * babel config for Vue2 commonjs
   * @zh Vue2 commonjs babel 配置
   */
  BABEL_CONFIG_CJS: BabelConfig
  /**
   * babel config for Vue2 es module
   * @zh Vue2 es module babel 配置
   */
  BABEL_CONFIG_ESM: BabelConfig
  /**
   * Vue2 publish config
   * @zh Vue2 发布配置
   */
  VUE2_PUBLISH_CONFIG: {
    /**
     * package path
     * @zh package 路径
     */
    PKG_PATH: string
    /**
     * package name
     * @zh package 名称
     */
    PKG_NAME: string
  }
}

export const rootDir = path.resolve(__dirname, '../')
export const resolve = (dir: string) => path.resolve(rootDir, dir)
export const READEME_PATH = resolve('../../README.md')

export const ReactBuildConfig: BuildReactConfig = {
  PKG_NAME: '@twist-space/react-icons',
  DIST: resolve('../_react-icons'),
  LIB: resolve('../_react-icons/lib'),
  LIB_ESM: resolve('../_react-icons/lib/esm'),
  LIB_CJS: resolve('../_react-icons/lib/cjs'),
  BUILD_ESM: resolve('build/react/esm'),
  BUILD_CJS: resolve('build/react/cjs'),
  TSCONFIG_CJS: resolve('tsconfig.react.cjs.json'),
  TSCONFIG_ESM: resolve('tsconfig.react.esm.json'),
  REACT_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_react-icons'),
    PKG_NAME: '@twist-space/react-icons'
  }
}

export const Vue3BuildConfig: BuildVue3Config = {
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
    PKG_PATH: resolve('../_vue-icons'),
    PKG_NAME: '@twist-space/vue3-icons'
  }
}

export const Vue2BuildConfig: BuildVue2Config = {
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
