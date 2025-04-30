import { Crumb, UserRoleEnum } from '~/types'

export type UserRole =
  | UserRoleEnum.Admin
  | UserRoleEnum.User
  | UserRoleEnum.Moderator

export type SwitchContent = {
  text: string
  tooltip?: string
}

export type SwitchOptions = {
  [key in 'left' | 'right']?: SwitchContent
}
export type Crumbfunc = (data: unknown) => Crumb
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
