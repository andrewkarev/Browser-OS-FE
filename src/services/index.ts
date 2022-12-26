import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../common/constants';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    throw error;
  }
);
