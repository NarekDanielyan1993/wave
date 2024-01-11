import { config } from '@utils/config';
import axios from 'axios';
export const apiRequest = axios.create({
    baseURL: config.BASE_URL,
    timeout: 30000,
});
type UrlMethodTypes = 'get' | 'post' | 'delete' | 'update' | 'patch';

// export const apiSagaRequest = (
//     method: UrlMethodTypes,
//     url: string,
//     data: any,
//     options = {}
// ) => {
//     console.log(data);
//     const abortController = new AbortController();
//     const hasData = method === 'get';
//     const settings: AxiosRequestConfig = hasData ? data : options;
//     settings.cancelToken = abortController.signal;
//     const request = hasData
//         ? (axiosInstance as any)[method](url, settings)
//         : (axiosInstance as any)[method](url, data, settings);
//     request[CANCEL] = () => abortController.abort();

//     return request;
// };

// export const apiRequest = async <T>(
//     method: UrlMethodTypes,
//     url: string,
//     data: T,
//     options?: AxiosRequestConfig
// ): Promise<T> => {
//     const abortController = new AbortController();
//     let bodyData = data;
//     if (method === 'get') {
//         bodyData = { params: data };
//     }
//     const requestOptions: AxiosRequestConfig = {
//         ...bodyData,
//         signal: abortController.signal,
//         cancelToken: abortController.abort,
//     };

//     return (axiosInstance as any)[method](url, data, requestOptions);
// };
