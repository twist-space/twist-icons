import * as React from 'react'
import { IconContext, DefaultContext } from './IconContext'

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
    color,
    ...svgProps
  } = props

  const elem = (config: IconContext) => {
    const mergedSize = size || config.size || '1em'
    let className
    let msTransform = ''
    let transform = ''

    if (config.className) {
      className = config.className
    }
    if (props.className) {
      className = className ? `${className} ${props.className}` : props.className
    }
    if (spin) {
      className ? className += ' twist-icon-loading' : className = 'twist-icon-loading'
    }
    if (rotate) {
      msTransform = `rotate(${rotate}deg)`
      transform = `rotate(${rotate}deg)`
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...config.attrs}
        {...attrs}
        {...svgProps}
        className={className}
        style={{
          color: color || config.color,
          msTransform,
          transform,
          ...config.style,
          ...props.style
        }}
        width={mergedSize}
        height={mergedSize}
      >
        {title && <title>{title}</title>}
        {props.children}
      </svg>
    )
  }

  return IconContext !== undefined ? (
    <IconContext.Consumer>
      {(conf: IconContext) => elem(conf)}
    </IconContext.Consumer>
  ) : (
    elem(DefaultContext)
  )
}

export function normalizeStyle(styleString: string) {
  const styleObj: Record<string, string> = {}
  const styles = styleString.split(';')

  for (const style of styles) {
    const [property, value] = style.split(':')
    if (property && value) {
      // Convert camelCase to JSX style
      const formattedProperty = property.trim().replace(/-./g, (match) =>
        match.charAt(1).toUpperCase())
      styleObj[formattedProperty] = value.trim()
    }
  }

  return styleObj
}

export function renderHelper(node: AbstractNode[]): React.ReactElement[] {
  return (
    node &&
    node.map((node, i) => (
      React.createElement(
        node.tag,
        {
          ...node.attrs,
          key: i,
          style: node.attrs.style
            ? normalizeStyle(node.attrs.style)
            : null
        },
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
