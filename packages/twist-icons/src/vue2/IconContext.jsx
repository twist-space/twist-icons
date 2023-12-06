export const IconContextKey = Symbol('IconContextKey')

export const IconProvider = {
  name: 'IconProvider',
  props: {
    color: String,
    size: Number,
    styleValue: String
  },
  provide() {
    return {
      [IconContextKey]: this
    }
  },
  render(h) {
    return h('div', undefined, this.$slots.default)
  }
}
