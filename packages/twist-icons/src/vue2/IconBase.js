import { IconContextKey } from './IconContext'

const renderHelper = (h, node) =>
  node &&
  node.map((child, i) =>
    h(
      child.tag,
      { key: i, attrs: { ...child.attrs } },
      child.children
        ? renderHelper(h, child.children)
        : []
    ))

export const GenIcon = (icon) => {
  const IconBase = {
    name: icon.name,
    inheritAttrs: false,
    props: {
      class: String,
      style: Object,
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
    computed: {
      mergedSize() {
        const { size, config } = this
        return size || config.size || '1em'
      },
      computedSpin() {
        const { spin } = this
        if (spin) {
          return 'twist-vue2-icon--spin'
        }
        return undefined
      },
      mergedStyles() {
        const { config, rotate, color } = this
        const _styles = {}

        if (rotate) {
          _styles.msTransform = `rotate(${rotate}deg)`
          _styles.transform = `rotate(${rotate}deg)`
        }

        if (color || config?.color) {
          _styles.color = color || config?.color
        }

        return _styles
      }
    },
    render(h) {
      const {
        class: cls,
        $attrs,
        title,
        mergedSize,
        computedSpin,
        mergedStyles
      } = this
      const { abstractNode } = this.icon
      const _attrs = {
        width: mergedSize,
        height: mergedSize,
        ...abstractNode?.attrs,
        ...$attrs
      }
      const titleTag = title ? h('title', [title]) : null

      return h(
        'svg',
        {
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            ..._attrs,
            width: mergedSize,
            height: mergedSize
          },
          class: [cls, computedSpin],
          style: mergedStyles
        },
        [
          titleTag,
          renderHelper(h, abstractNode?.children)
        ]
      )
    }
  }

  return IconBase
}
