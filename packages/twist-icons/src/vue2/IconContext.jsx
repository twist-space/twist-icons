import Vue from 'vue'

export const IconContextKey = Symbol('twist_icons_vue2_provider')
export const IconProvider = Vue.extend({
  name: 'IconProvider',
  props: {
    color: String,
    size: Number,
    attrs: Object,
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
})
