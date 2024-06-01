import path from 'path'
import { getVueBabelConfig, getReactBabelConfig, slash } from './utils'
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
}

export interface BuildReactConfig extends BuildCommonConfig {
  /**
   * React tsconfig, only emit declaration files
   * @zh react的tsconfig，只生成声明文件
   */
  TSCONFIG: string
  /**
   * react src dir
   * @zh react 组件路径
   */
  SRC: string
  /**
   * build react dir
   * 存放编译后的 react 组件
   */
  BUILD_PATH: string
  /**
   * babel config for React commonjs
   * @zh React commonjs babel 配置
   */
  BABEL_CONFIG_CJS: BabelConfig
  /**
   * babel config for React es module
   * @zh React es module babel 配置
   */
  BABEL_CONFIG_ESM: BabelConfig
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
   * build vue3 components dir
   * @zh build vue3 组件目录
   */
  BUILD_PATH: string
  /**
   * Vue3 src dir
   */
  SRC: string
  /**
   * Vue3 tsconfig path
   */
  TSCONFIG: string
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
export const resolve = (dir: string) => slash(path.resolve(rootDir, dir))
export const READEME_PATH = resolve('../../README.md')

export const ReactBuildConfig: BuildReactConfig = {
  PKG_NAME: '@twist-space/react-icons',
  DIST: resolve('../_react-icons'),
  LIB: resolve('../_react-icons/lib'),
  SRC: resolve('src/react'),
  BUILD_PATH: resolve('build/react'),
  TSCONFIG: resolve('tsconfig.react.json'),
  BABEL_CONFIG_CJS: getReactBabelConfig('cjs'),
  BABEL_CONFIG_ESM: getReactBabelConfig(false),
  REACT_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_react-icons'),
    PKG_NAME: '@twist-space/react-icons'
  }
}

export const Vue3BuildConfig: BuildVue3Config = {
  PKG_NAME: '@twist-space/vue3-icons',
  DIST: resolve('../_vue3-icons'),
  LIB: resolve('../_vue3-icons/lib'),
  BUILD_PATH: resolve('build/vue3'),
  SRC: resolve('src/vue3'),
  TSCONFIG: resolve('tsconfig.vue.json'),
  BABEL_CONFIG_CJS: getVueBabelConfig('cjs', 3),
  BABEL_CONFIG_ESM: getVueBabelConfig(false, 3),
  VUE3_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_vue3-icons'),
    PKG_NAME: '@twist-space/vue3-icons'
  }
}

export const Vue2BuildConfig: BuildVue2Config = {
  DIST: resolve('../_vue2-icons'),
  LIB: resolve('../_vue2-icons/lib'),
  JSX_FILES: resolve('src/vue2/**/*.jsx'),
  BABEL_CONFIG_CJS: getVueBabelConfig('cjs', 2),
  BABEL_CONFIG_ESM: getVueBabelConfig(false, 2),
  VUE2_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_vue2-icons'),
    PKG_NAME: '@twist-space/vue2-icons'
  }
}
