import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, test, expect } from 'vitest'
import { IconProvider } from '../../_vue-icons'
import { AiAudioFilled, AiAudioTwotone } from '../../_vue-icons/ai'

describe('@twist-space/vue3-icons', () => {
  test('Icon component directly render', () => {
    const Icon = mount(AiAudioFilled)
    expect(Icon.html()).toMatchSnapshot()
  })

  test('Two tone Icon render', () => {
    const TwotoneIcon = mount(AiAudioTwotone)
    expect(TwotoneIcon.html()).toMatchSnapshot()
    // Two tone icon path must than one path
    expect(TwotoneIcon.findAll('path')).not.toHaveLength(1)
  })

  test('Icon component props <size, color, title>', () => {
    const Icon = mount(AiAudioFilled, {
      props: {
        size: 20,
        color: 'red',
        title: 'twist-vue3-icon'
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.html()).toContain('style="color: red;"')
    expect(Icon.html()).toContain('width="20" height="20"')
    expect(Icon.html()).toContain('<title>twist-vue3-icon</title>')
  })

  test('Icon component props <spin>', () => {
    const Icon = mount(AiAudioFilled, {
      props: {
        spin: true
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.classes('twist-icon-loading')).toBe(true)
  })

  test('Icon component props <rotate>', () => {
    const Icon = mount(AiAudioFilled, {
      props: {
        rotate: 60
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.html()).toContain('style="transform: rotate(60deg);"')
  })
})

describe('IconConfigProvider and Icon component render priority test', () => {
  test('Icon props hsa a higher priority than IconConfigProvider props', () => {
    const AiAudioFilledIcon = h(AiAudioFilled, { size: 200, color: 'green' })
    const Icon = mount(IconProvider, {
      props: {
        size: 100,
        color: 'black'
      },
      slots: {
        default: AiAudioFilledIcon
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.html()).toContain('width="200" height="200"')
    expect(Icon.html()).toContain('style="color: green;"')
  })
})
