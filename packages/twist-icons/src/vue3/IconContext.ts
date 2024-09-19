import {
  provide,
  renderSlot,
  defineComponent,
  PropType,
  CSSProperties
} from 'vue'
import type { IconContext } from './interface'

export const IconContextKey = Symbol('IconContextKey')

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined
}

export const IconProvider = defineComponent({
  name: 'IconProvider',
  props: {
    color: String as PropType<string>,
    size: [String, Number] as PropType<string | number | undefined>,
    style: Object as PropType<CSSProperties>,
    class: String as PropType<string>
  },
  setup(props, { slots }) {
    provide(IconContextKey, props)
    return () => renderSlot(slots, 'default')
  }
})
