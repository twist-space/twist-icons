import {
  FunctionalComponent,
  PropType,
  SVGAttributes,
  CSSProperties,
  h
} from 'vue'
import { useInjectContext, IconContextKey } from './IconContext'
import { InsertStylesComponent } from './useInsertStyles'

export interface AbstractNode {
  tag: string
  attrs: Record<string, string>
  children?: AbstractNode[]
}

export interface IconProps extends SVGAttributes {
  size?: number
  color?: string
  style?: CSSProperties
  class?: string
  title?: string
  spin?: boolean
  rotate?: number
}

export type IconType = (props: IconProps) => FunctionalComponent<IconProps>

export function IconBase(props: IconProps, { slots, attrs }) {
  const {
    size,
    title,
    spin,
    rotate,
    ...svgProps
  } = props
  const children = slots.default && slots.default()
  const config = useInjectContext(IconContextKey)
  const mergedSize = size || config.size || '1em'
  let className = ''
  let msTransform = ''
  let transform = ''

  if (config.class) {
    className = config.class
  }
  if (props.class) {
    className = className ? `${className} ${props.class}` : props.class
  }
  if (spin) {
    className += ' twist-icon-loading'
  }
  if (rotate) {
    msTransform = `rotate(${rotate}deg)`
    transform = `rotate(${rotate}deg)`
  }

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      {...config.attrs}
      {...attrs}
      {...svgProps}
      class={className}
      style={{
        color: props.color || config.color,
        msTransform,
        transform,
        ...config.style,
        ...props.style
      }}
      width={mergedSize}
      height={mergedSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      {children}
      <InsertStylesComponent />
    </svg>
  )
}

IconBase.props = {
  size: Number as PropType<number>,
  color: String as PropType<string>,
  style: Object as PropType<CSSProperties>,
  class: String as PropType<string>,
  title: String as PropType<string>,
  spin: Boolean as PropType<boolean>,
  rotate: Number as PropType<number>,
  onClick: Function as PropType<(e: MouseEvent) => void>
}

function renderHelper(node: AbstractNode[]) {
  return (
    node &&
    node.map((node, i) =>
      h(node.tag, { key: i, ...node.attrs }, renderHelper(node.children)))
  )
}

export function GenIcon(node: AbstractNode) {
  return (props) => (
    <IconBase {...node.attrs} {...props}>
      {renderHelper(node.children)}
    </IconBase>
  )
}
