import * as React from 'react'

export interface IconContext {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
  attrs?: React.SVGAttributes<SVGElement>
  styleValue?: string
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attrs: undefined,
  styleValue: '@twist-space/react-icons-css'
}

export const IconContext: React.Context<IconContext> =
  React.createContext(DefaultContext)
