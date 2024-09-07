export type FrameNameType = 'vue2' | 'vue3' | 'react'
export type modules = 'commonjs' | 'cjs' | false
export type entryFileTypes = 'cjs' | 'esm' | 'dts'
export interface entryFiles {
  entry: 'index.mjs' | 'index.js' | 'index.d.ts',
  type: entryFileTypes
}
