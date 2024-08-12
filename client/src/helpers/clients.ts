import axios from 'axios';

export type ApiResponse<T> = {
  data: T;
};

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setupInterceptors(store: any, history: any) {
  client.interceptors.request.use(function (config) {
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const e = { ...error };
      console.log('ERROR API-CLIENT: ', e.response);
      if (!error.response && !error.status) {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
}

export default client;
