import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import queryString from 'query-string';

import { API_ENDPOINTS, Config } from '../config';
import { API_METHODS, ARR_PROVIDE_TAGS } from '../constants';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, unknown>) => {
    return queryString.stringify(params);
  },
  baseUrl: Config.API_URL,
  timeout: 15000,
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

export const api = createApi({
  baseQuery: async (args, baseQueryApi, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, baseQueryApi, extraOptions);
    if (process.env.NODE_ENV === 'development') {
      if (result.error) {
        console.log(
          `Request ${JSON.stringify(args)} ${JSON.stringify(
            baseQueryApi,
          )} error: ${JSON.stringify(result.error.data)}`,
        );
      }
    }
    if (result.error && (result.error.status as number) === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshToken = 'aaa';
          const refreshResult = (await baseQuery(
            {
              method: API_METHODS.POST,
              url: API_ENDPOINTS.AUTH.REFRESH_TOKENS,
              body: {
                refreshToken,
              },
            },
            baseQueryApi,
            extraOptions,
          )) as any;
          const refreshData = refreshResult.data;
          if (refreshData?.data) {
            result = await baseQuery(args, baseQueryApi, extraOptions);
          } else {
            baseQueryApi.dispatch(api.util.resetApiState());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, baseQueryApi, extraOptions);
      }
    }

    return result;
  },
  tagTypes: ARR_PROVIDE_TAGS,
  endpoints: _builder => ({}),
});

export const { endpoints } = api;
