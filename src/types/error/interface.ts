import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ErrorResponse } from "~/types";

export interface AxiosResponseError extends AxiosError<ErrorResponse> {
  config: InternalAxiosRequestConfig & { _isRetry: boolean };
}
