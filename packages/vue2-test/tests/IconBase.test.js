import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { IconProvider } from '../../_vue2-icons'
import { AiAudioFilled, AiAudioTwotone } from '../../_vue2-icons/ai'

describe('@twist-space/vue2-icons Icon test', () => {
  test('Icon component direct render', () => {
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
      propsData: {
        size: 20,
        color: 'red',
        title: 'twist-vue2-icon'
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.html()).toContain('style="color: red;"')
    expect(Icon.html()).toContain('width="20" height="20"')
    expect(Icon.html()).toContain('<title>twist-vue2-icon</title>')
  })

  test('Icon component props <spin>', () => {
    const Icon = mount(AiAudioFilled, {
      propsData: {
        spin: true
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.classes('twist-icon-loading')).toBe(true)
  })

  test('Icon component props <rotate>', () => {
    const Icon = mount(AiAudioFilled, {
      propsData: {
        rotate: 60
      }
    })

    expect(Icon.html()).toMatchSnapshot()
    expect(Icon.html()).toContain('style="transform: rotate(60deg);"')
  })
})

describe('@twist-space/vue2-icons IconProvider test', () => {
  test('IconProvider direct render', () => {
    const IconProviderWrapper = mount(IconProvider)
    expect(IconProviderWrapper.html()).toMatchSnapshot()
  })
})

describe('IconProvider and Icon component render', () => {
  test('IconProvider nest a Icon component', () => {
    // IconProvider component contains a Icon component,
    // Icon component has a higher priority than IconProvider props
    const Icon = {
      render(h) {
        return h(AiAudioFilled, {
          props: {
            size: 26,
            color: 'green'
          }
        })
      }
    }
    const IconProviderWrapper = mount(IconProvider, {
      propsData: {
        size: 60
      },
      slots: {
        default: Icon
      }
    })

    expect(IconProviderWrapper.html()).toMatchSnapshot()
    expect(IconProviderWrapper.html()).toContain('width="26" height="26"')
    expect(IconProviderWrapper.html()).toContain('color: green;')
  })
})
