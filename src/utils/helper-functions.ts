import { SxProps, Theme } from '@mui/material'
import { ResponseError } from '~/utils/response-error'
import { FormatedDate } from '~/types'
import i18next from 'i18next'
import { formatDistanceToNow, isValid, parseISO } from 'date-fns'

export const spliceSx = (
  defaultStyles?: SxProps<Theme>,
  newStyles?: SxProps<Theme>
) => ({
  ...defaultStyles,
  ...newStyles
})
export const parseJwt = <T>(token: string): T => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload) as T
}
export const isEqual = <T>(x: T, y: T): boolean => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => isEqual(x[key as keyof T], y[key as keyof T]))
    : x === y
}
export const getEmptyValues = <T extends object, R>(
  initialValues: T,
  defaultValue: R
) => {
  return Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: defaultValue }),
    {} as Record<keyof T, R>
  )
}

interface ErrorResponse {
  code: string
}

export const getErrorKey = (error?: ErrorResponse | ResponseError) =>
  `errors.${error?.code ? error.code : 'UNKNOWN_ERROR'}`

export const createUrlPath = (
  URL: string,
  params: string | null = '',
  query = {}
) => {
  let trimmedUrl = URL
  while (trimmedUrl?.endsWith('/')) {
    trimmedUrl = trimmedUrl.slice(0, -1)
  }

  const queryParams = createQueryParamsString(query)
  const queryParamsString = queryParams ? `?${queryParams}` : ''
  const paramsString = params ? `/${params.replace(/^\/+/g, '')}` : ''

  return `${trimmedUrl}${paramsString}${queryParamsString}`
}
const createQueryParamsString = (query: { [key: string]: string }) => {
  const queryParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value)
    }
  })

  return queryParams.toString()
}

export const getInitials = (firstName: string, lastName: string) =>
  firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : ''

const mapper: Record<string, string> = {
  en: 'en-US',
  uk: 'uk-UA'
}
export const getFormattedDate = ({
  date,
  locales = 'en-US',
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  isCurrentDayHours = false,
  includeOrdinal = false
}: FormatedDate): string => {
  const getLanguage = i18next.language
  const languageKey = mapper[getLanguage]
  const currentDate = new Date()
  const formattedDate = new Date(date).toLocaleString(languageKey, options)

  if (
    isCurrentDayHours &&
    currentDate.toDateString() === new Date(date).toDateString()
  ) {
    return new Date(date).toLocaleString(locales, {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (includeOrdinal) {
    const day = new Date(date).getDate()
    const month = new Date(date).toLocaleString(locales, { month: 'long' })
    const year = new Date(date).getFullYear()
    return `${addOrdinalSuffix(day)} ${month} ${year}`
  }

  return formattedDate
}

const addOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return `${day}th`
  }
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}
export const ellipsisTextStyle = (linesCount: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export type FilterFromQuery = {
  [key: string]: string | string[]
}

export const parseQueryParams = <T extends object>(
  searchParams: URLSearchParams,
  defaultFilters: T
): FilterFromQuery | null => {
  const filtersFromQuery: FilterFromQuery = {}
  searchParams.forEach((value, key) => {
    if (key in defaultFilters) {
      filtersFromQuery[key] = value
    }
  })

  const result = Object.keys(filtersFromQuery).length ? filtersFromQuery : null

  return result
}
export const normalizeArrayValue = <T>(
  value: T | T[] | null | undefined
): T[] => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.includes(','))
    return value.split(',') as T[]
  return [value]
}

export const formatMessageTime = (dateString: string): string => {
  try {
    if (!dateString) return 'No timestamp'

    // Спробуйте спочатку розпарсити ISO дату
    const date = parseISO(dateString)

    // Перевірка чи вдалося розпарсити дату та чи вона валідна
    if (!isValid(date)) {
      console.warn('Invalid date format:', dateString)
      return 'Invalid date'
    }

    // Якщо дата в майбутньому, відносно поточної системної дати
    if (date > new Date()) {
      // Використовуємо просте форматування для дат з майбутнього
      return new Date(dateString).toLocaleString()
    }

    // Для валідних дат в минулому або теперішньому використовуємо formatDistanceToNow
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    console.error('Error formatting time:', error, dateString)
    return 'Time error'
  }
}
