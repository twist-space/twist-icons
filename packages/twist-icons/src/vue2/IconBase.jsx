import { IconContextKey } from './IconContext'

const renderHelper = (h, node) => node &&
  node.map((child, i) =>
    h(
      child.tag,
      { key: i, attrs: { ...child.attrs } },
      renderHelper(h, child.children)
    ))

export const GenIcon = (icon) => {
  const IconBase = {
    name: icon.name,
    props: {
      size: Number,
      color: String,
      title: String,
      spin: Boolean,
      rotate: Number
    },
    inject: {
      config: {
        from: IconContextKey,
        default: null
      }
    },
    data() {
      return {
        icon
      }
    },
    render(h) {
      const { config, $attrs: attrs, $props: props } = this
      const { size, color, title, spin, rotate } = props
      const { abstractNode } = this.icon
      const mergeSize = size || config?.size || '1em'
      let className
      let msTransform = ''
      let transform = ''

      if (config?.class) {
        className = config.class
      }
      if (spin) {
        className ? className += ' twist-icon-loading' : className = 'twist-icon-loading'
      }
      if (rotate) {
        msTransform = `rotate(${rotate}deg)`
        transform = `rotate(${rotate}deg)`
      }

      const svgProps = {
        attrs: {
          ...config?.$attrs,
          ...abstractNode?.attrs,
          ...attrs
        }
      }

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          {...svgProps}
          class={className}
          style={{
            color: color || config?.color,
            msTransform,
            transform,
            ...(config?.style)
          }}
          width={mergeSize}
          height={mergeSize}
        >
          {title && <title>{title}</title>}
          {renderHelper(h, abstractNode.children)}
        </svg>
      )
    }
  }
  IconBase.inheritAttrs = false

  return IconBase
}
