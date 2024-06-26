import { Config } from '../config';
import { API_METHODS } from '../constants';
import { ApiResponse } from '../types';
import { api } from './api';

const appStoreApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchStore: builder.query<ApiResponse.AppStore, void>({
      query: () => {
        return {
          url: 'https://sapi.mttn.vn/app-store/categories',
          method: API_METHODS.GET,
        };
      },
    }),
  }),
});

export const { endpoints: appStoreEndpoints, useFetchStoreQuery } = appStoreApi;
