import React from 'react'
import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { IconProvider } from '../../_react-icons'
import { AiAudioFilled, AiAudioTwotone } from '../../_react-icons/ai'

describe('@twistify/react-icons', () => {
  test('Icon component directly render', () => {
    const { asFragment } = render(<AiAudioFilled />)
    expect(asFragment()).toMatchSnapshot()
    expect(asFragment().firstElementChild?.getAttribute('class')).toBeNull()
  })

  test('should path must than one', () => {
    const { asFragment } = render(<AiAudioTwotone />)
    const TwoToneIcon = asFragment()
    // TwoToneIcon path must than one
    expect(TwoToneIcon.querySelectorAll('path').length).toBeGreaterThan(1)
  })

  test('should be show color: rgb(0, 0, 0), width、height attributes and title tag', () => {
    const { asFragment } = render(
      <AiAudioFilled size={20} color="rgb(0, 0, 0)" title="twist-react-icon" />
    )
    const Icon = asFragment()

    // test color style
    const iconElement = Icon.firstElementChild
    const computedStyle = window.getComputedStyle(iconElement)
    const colorStyle = computedStyle.getPropertyValue('color')
    expect(colorStyle).toBe('rgb(0, 0, 0)')

    // test width、height attributes
    const width = iconElement.getAttribute('width')
    const height = iconElement.getAttribute('height')
    expect(width).toBe('20')
    expect(height).toBe('20')

    // test title tag
    const title = iconElement.querySelector('title')
    expect(title).toBeDefined()
    expect(title?.textContent).toBe('twist-react-icon')
  })

  test('should be show twist-icon-loading in class name', () => {
    const { asFragment } = render(<AiAudioFilled spin />)
    const Icon = asFragment()
    const iconElement = Icon.firstElementChild
    expect(iconElement?.classList.contains('twist-icon-loading')).toBeTruthy()
  })

  test('should be show style rotate 90deg', () => {
    const { asFragment } = render(
      <AiAudioFilled rotate={90} />
    )
    const Icon = asFragment()

    const iconElement = Icon.firstElementChild
    const computedStyle = window.getComputedStyle(iconElement)
    const transformStyle = computedStyle.getPropertyValue('transform')
    expect(transformStyle).toBe('rotate(90deg)')
  })
})

describe('IconProvider and Icon component render props test', () => {
  test('Icon props hsa a higher priority than IconProvider props', () => {
    const { asFragment } = render(
      <IconProvider value={{ color: 'rgb(0, 0, 0)', size: 20 }}>
        <AiAudioFilled size={30} color="rgb(255, 255, 255)" />
      </IconProvider>
    )
    const Icon = asFragment()

    // test color style
    const iconElement = Icon.firstElementChild
    const computedStyle = window.getComputedStyle(iconElement)
    const colorStyle = computedStyle.getPropertyValue('color')
    expect(colorStyle).toBe('rgb(255, 255, 255)')

    // test width、height attributes
    const width = iconElement.getAttribute('width')
    const height = iconElement.getAttribute('height')
    expect(width).toBe('30')
    expect(height).toBe('30')
  })
})
