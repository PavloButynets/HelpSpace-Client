import {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios";
import { axiosClient } from "~/plugins/axiosClient";
import i18n from "~/plugins/i18n";
import { checkAuth } from "~/redux/reducer";
import { store } from "~/redux/store";
import { router } from "~/router/router";
import { AxiosResponseError } from "~/types";
import { authRoutes } from "~/router/constants/authRoutes";

export const setupInterceptors = (): void => {
  axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = AxiosHeaders.concat(config.headers, {
      "Accept-Language": i18n.language,
    });

    return config;
  });

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosResponseError) => {
      if (error.response?.data.code !== "UNAUTHORIZED") {
        return Promise.reject(
          new AxiosError(
            error.message,
            error.code,
            error.config,
            error.request,
            error.response,
          ),
        );
      }

      const originalRequest = error.config as InternalAxiosRequestConfig;
      if (
        error.response?.data.code === "UNAUTHORIZED" &&
        error.config &&
        !error.config._isRetry
      ) {
        error.config._isRetry = true;
        await store.dispatch(checkAuth());
        return axiosClient.request(originalRequest);
      } else {
        router.navigate(authRoutes.accountMenu.logout.path);
        return Promise.resolve(error);
      }
    },
  );
};
