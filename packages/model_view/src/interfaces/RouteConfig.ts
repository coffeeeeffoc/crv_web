import { FC } from 'react'

export interface RouteConfig {
  path?: string
  exact?: boolean
  to?: string | string[] | object
  children?: []
  component?: FC<ComponentProps>
  routes?: RouteConfig[]
}

interface ComponentProps {
  routes?: RouteConfig[]
  [propName: string]: any
}

export default RouteConfig
