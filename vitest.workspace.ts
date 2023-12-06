// eslint-disable-next-line import/no-unresolved
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([{
  test: {
    name: 'vue2-test',
    include: ['packages/vue2-test/tests/*.{test,spec}.js'],
    environment: 'jsdom'
  }
}])
