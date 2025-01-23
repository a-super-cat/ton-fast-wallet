'use client'

import axios from 'axios';

type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});


export default axiosInstance;

export const defineRequest = <P= Record<string, any>,R= Record<string, any>>(url: string, option: HttpMethod | {
  method?: HttpMethod,
  cb?: (params?: P , result?: R) => R | any,
} ) => async (params?: P): Promise<R> => {
  const method = typeof option === 'string' ? option : option?.method || 'GET';
  const result = await axiosInstance.request({
    url,
    method: method.toLowerCase(),
    ...(method === 'GET' ? {params} : {data: params}),
  });
  if ( typeof option !== 'string') {
    option.cb?.(params, result.data);
  }
  return result.data
}
