import { Config } from '../config';
import { API_METHODS } from '../constants';
import { ApiResponse } from '../types';
import { api } from './api';

const appStoreApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchStore: builder.query<ApiResponse.AppStore, void>({
      query: () => ({
        url: `${Config.STORAGE_BASE_URL}/app-store/app-store.json`,
        method: API_METHODS.GET,
      }),
    }),
  }),
});

export const { endpoints: appStoreEndpoints, useFetchStoreQuery } = appStoreApi;
