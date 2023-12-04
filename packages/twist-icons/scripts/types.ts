import { TransformOptions } from '@babel/core'

export type FrameNameType = 'vue2' | 'vue3' | 'react'
export type modules = 'commonjs' | 'cjs' | false
export type BabelConfig = TransformOptions
