import { config } from '@utils/config';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { CANCEL } from 'redux-saga';
export const apiRequest = axios.create({
    baseURL: config.NEXT_PUBLIC_BASE_URL,
    timeout: 30000,
});

export const request = axios.create({
    timeout: 30000,
});

type UrlMethodTypes = 'get' | 'post' | 'delete' | 'update' | 'patch';

export const apiSagaRequest = (
    method: UrlMethodTypes,
    url: string,
    data: any,
    options = {}
) => {
    const abortController = new AbortController();
    const hasData = method === 'get';
    const settings: AxiosRequestConfig = hasData ? data : options;
    settings.signal = abortController.signal;
    const request = hasData
        ? (apiRequest as any)[method](url, settings)
        : (apiRequest as any)[method](url, data, settings);
    request[CANCEL] = () => abortController.abort();

    return request;
};

export const axiosInstance = async <T>(
    method: Method,
    url: string,
    data: T,
    options?: AxiosRequestConfig
): Promise<T> => {
    const abortController = new AbortController();
    let bodyData = data;
    if (method === 'get') {
        bodyData = { params: data };
    }
    const requestOptions: AxiosRequestConfig = {
        ...bodyData,
        ...options,
        signal: abortController.signal,
    };
    const request = (axios as any)[method](url, data, requestOptions);
    return request;
};
