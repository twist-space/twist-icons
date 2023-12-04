import * as React from 'react'
import { IconContext, DefaultContext } from './IconContext'
import { useInsertStyles } from './useInsertStyles'

export interface AbstractNode {
  tag: string
  attrs: Record<string, string>
  children: AbstractNode[]
}

export interface IconProps extends React.SVGAttributes<SVGElement> {
  chidren?: React.ReactNode
  size?: number
  color?: string
  style?: React.CSSProperties
  className?: string
  title?: string
  attrs?: Record<string, string>
  spin?: boolean
  rotate?: number
}

export type IconType = (props: IconProps) => React.JSX.Element

export function IconBase(props: IconProps): React.JSX.Element {
  const {
    attrs,
    size,
    title,
    spin,
    rotate,
    ...svgProps
  } = props
  const GlobalConfig = React.useContext(IconContext)
  const { styleValue } = DefaultContext

  useInsertStyles(GlobalConfig.styleValue || styleValue)
  const elem = (config: IconContext) => {
    const mergedSize = size || config.size || '1em'
    let className = ''
    let msTransform = ''
    let transform = ''

    if (config.className) {
      className = config.className
    }
    if (props.className) {
      className = className ? `${className} ${props.className}` : props.className
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
        strokeWidth="0"
        {...config.attrs}
        {...attrs}
        {...svgProps}
        className={className}
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
        {props.children}
      </svg>
    )
  }

  return GlobalConfig !== undefined ?
    elem(GlobalConfig) :
    elem(DefaultContext)
}

export function renderHelper(node: AbstractNode[]): React.ReactElement[] {
  return (
    node &&
    node.map((node, i) => (
      React.createElement(
        node.tag,
        { key: i, ...node.attrs },
        renderHelper(node.children)
      )
    ))
  )
}

export function GenIcon(node: AbstractNode) {
  return (props: IconProps) => (
    <IconBase attrs={{ ...node.attrs }} {...props}>
      {renderHelper(node.children)}
    </IconBase>
  )
}
