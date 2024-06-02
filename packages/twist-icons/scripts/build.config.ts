import path from 'path'
import { slash } from './utils'

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
   * Babel transfrom output path
   * @zh Vue2 Babel转义后的输出路径
   */
  BUILD_PATH: string
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
  VUE3_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_vue3-icons'),
    PKG_NAME: '@twist-space/vue3-icons'
  }
}

export const Vue2BuildConfig: BuildVue2Config = {
  DIST: resolve('../_vue2-icons'),
  LIB: resolve('../_vue2-icons/lib'),
  BUILD_PATH: resolve('build/vue2'),
  JSX_FILES: resolve('src/vue2/**/*.jsx'),
  VUE2_PUBLISH_CONFIG: {
    PKG_PATH: resolve('../_vue2-icons'),
    PKG_NAME: '@twist-space/vue2-icons'
  }
}
