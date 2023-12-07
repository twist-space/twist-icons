import {
  CSSProperties,
  provide,
  SVGAttributes,
  renderSlot,
  defineComponent,
  PropType
} from 'vue'

export type IconContext = {
  color?: string
  size?: number
  class?: string
  style?: CSSProperties
  attrs?: SVGAttributes
}
export const IconContextKey = Symbol('IconContextKey')

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  class: undefined,
  style: undefined,
  attrs: undefined
}

export const IconConfigProvider = defineComponent({
  name: 'IconConfigProvider',
  props: {
    color: String,
    size: Number,
    class: String,
    style: Object as PropType<CSSProperties>,
    attrs: String as PropType<SVGAttributes>,
    styleValue: String
  },
  setup(props, { slots }) {
    provide(IconContextKey, props)
    return () => renderSlot(slots, 'default')
  }
})
