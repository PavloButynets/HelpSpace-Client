import { SxProps, Theme } from '@mui/material'
import {ResponseError} from "~/utils/response-error";

export const spliceSx = (
    defaultStyles?: SxProps<Theme>,
    newStyles?: SxProps<Theme>
) => ({
    ...defaultStyles,
    ...newStyles
})
export const parseJwt = <T,>(token: string): T => {
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
export const isEqual = <T,>(x: T, y: T): boolean => {
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

