import * as React from 'react'

export interface IconContext {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
  attrs?: React.SVGAttributes<SVGElement>
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attrs: undefined
}

export const IconContext: React.Context<IconContext> =
  React.createContext(DefaultContext)

export const IconProvider = IconContext.Provider
