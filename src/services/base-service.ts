import { isAxiosError, type RawAxiosRequestHeaders } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { type ErrorResponse, type HttpMethod } from '~/types'

type RequestParams = {
  data?: unknown
  headers?: RawAxiosRequestHeaders
  method: HttpMethod
  timeout?: number
  url: string
}

class ResponseError extends Error {
  code?: string
  status?: number

  constructor({ code, message, status }: Partial<ErrorResponse>) {
    super(message)
    this.code = code
    this.status = status
  }
}

export const baseService = {
  request: async <T = unknown>({
    data,
    headers,
    method,
    timeout,
    url
  }: RequestParams): Promise<T> => {
    try {
      const response = await axiosClient.request<T>({
        data,
        headers,
        method,
        timeout,
        url
      })

      return response.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response.data as ErrorResponse
      }

      throw new ResponseError({
        code: 'UNKNOWN_ERROR',
        message: 'UNKNOWN_ERROR_MESSAGE'
      })
    }
  },

  get: async <T = unknown>(
    url: string,
    headers?: RawAxiosRequestHeaders,
    timeout?: number
  ): Promise<T> => {
    return baseService.request<T>({
      method: 'GET',
      url,
      headers,
      timeout
    })
  },

  post: async <T = unknown>(
    url: string,
    data: unknown,
    headers?: RawAxiosRequestHeaders,
    timeout?: number
  ): Promise<T> => {
    return baseService.request<T>({
      method: 'POST',
      url,
      data,
      headers,
      timeout
    })
  },

  patch: async <T = unknown>(
    url: string,
    data: unknown,
    headers?: RawAxiosRequestHeaders,
    timeout?: number
  ): Promise<T> => {
    return baseService.request<T>({
      method: 'PATCH',
      url,
      data,
      headers,
      timeout
    })
  },

  delete: async <T = unknown>(
    url: string,
    headers?: RawAxiosRequestHeaders,
    timeout?: number
  ): Promise<T> => {
    return baseService.request<T>({
      method: 'DELETE',
      url,
      headers,
      timeout
    })
  },
  put: async <T = unknown>(
    url: string,
    data: unknown,
    headers?: RawAxiosRequestHeaders,
    timeout?: number
  ): Promise<T> => {
    return baseService.request<T>({
      method: 'PUT',
      url,
      data,
      headers,
      timeout
    })
  }
}
