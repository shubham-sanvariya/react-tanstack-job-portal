import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {errorNotification} from "../components/notification/notification.tsx";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

let refreshTokenPromise: Promise<AxiosResponse<string>> | null = null;

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenPromise) {
                refreshTokenPromise = api.post(`/auth/refresh-token`)
                    .finally(() => {
                        refreshTokenPromise = null;
                    })
            }

            try {
                await refreshTokenPromise;
                return api(originalRequest);
            } catch (refreshError) {
                errorNotification("Session Expired", "Please Login again.")
                localStorage.removeItem("user");

                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 3000)
                console.log(refreshError);

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)
