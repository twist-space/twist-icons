import {
  CSSProperties,
  InjectionKey,
  provide,
  inject,
  SVGAttributes
} from 'vue'

export interface IconContext {
  color?: string
  size?: number
  class?: string
  style?: CSSProperties
  attrs?: SVGAttributes
  styleValue?: string
}

export const IconContextKey = Symbol('IconContextKey') as InjectionKey<IconContext>

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  class: undefined,
  style: undefined,
  attrs: undefined,
  styleValue: '@twist-space/vue3-icons-css'
}

export const useProvideIconContext = (context: IconContext) => {
  provide(IconContextKey, context)
  return context
}

export const useInjectContext = (IconContextKey) => inject(IconContextKey, DefaultContext)
