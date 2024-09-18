import {
  defineComponent,
  inject,
  CSSProperties,
  h,
  VNode,
  computed,
  PropType
} from 'vue'
import { IconContextKey, DefaultContext } from './IconContext'
import type { IconContext, IconProps } from './interface'

export type Numberish = string | number | undefined
export interface AbstractNode {
  tag: string
  attrs: Record<string, string>
  children?: AbstractNode[]
}

export const IconBase = defineComponent({
  name: 'IconBase',
  inheritAttrs: false,
  props: {
    size: [String, Number] as PropType<string | number | undefined>,
    color: String as PropType<string>,
    style: Object as PropType<CSSProperties>,
    class: String as PropType<string>,
    title: String as PropType<string>,
    spin: Boolean as PropType<boolean>,
    rotate: Number as PropType<number>
  },
  setup(props, { slots, attrs }) {
    const config = inject<IconContext>(IconContextKey, DefaultContext)
    const mergedSize = computed<Numberish>(() => props.size || config.size || '1em')
    const mergedClass = computed<string | undefined>(() => {
      let classnames
      if (config.class) {
        classnames = config.class
      }

      if (props.class) {
        classnames = classnames
          ? `${classnames} ${props.class}`
          : props.class
      }

      if (props.spin) {
        classnames
          ? classnames += 'twist-icon-loading'
          : classnames = 'twist-icon-loading'
      }
      return classnames
    })
    const mergedStyles = computed<CSSProperties>(() => {
      const styles = {}
      if (props.rotate) {
        Reflect.set(styles, 'msTransform', `rotate(${props.rotate}deg)`)
        Reflect.set(styles, 'transform', `rotate(${props.rotate}deg)`)
      }

      props.color
        ? Reflect.set(styles, 'color', props.color)
        : Reflect.set(styles, 'color', config.color)

      return {
        ...styles,
        ...config?.style,
        ...props?.style
      }
    })

    const titleTag = props.title ? h('title', props.title) : null

    return () => h(
      'svg',
      {
        ...attrs,
        class: mergedClass.value,
        style: mergedStyles.value,
        width: mergedSize.value,
        height: mergedSize.value
      },
      [
        titleTag,
        slots.default && slots.default()
      ]
    )
  }
})

export function renderHelper(node: AbstractNode[]): VNode[] | undefined {
  return (
    node &&
    node.map((node, i) => h(
      node.tag,
      { key: i, ...node.attrs },
      node.children
        ? renderHelper(node.children)
        : []
    ))
  )
}

export function GenIcon(node: AbstractNode) {
  return (props: IconProps) => h(
    IconBase,
    { ...node.attrs, ...props },
    { default: () => renderHelper(node.children ?? []) }
  )
}
