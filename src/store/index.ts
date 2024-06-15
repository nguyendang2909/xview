import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { thunk } from 'redux-thunk';

import { api } from '../api';
import { appReducer } from './app/app.store';
import { cacheReducer } from './app';

const reducers = combineReducers({
  // theme,
  [api.reducerPath]: api.reducer,
  app: appReducer,
  cache: cacheReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['theme', 'app'],
  },
  reducers,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActionPaths: [
        //   'meta.createdAt',
        //   'payload.createdAt',
        //   'createdAt',
        //   'meta.baseQueryMeta.request',
        // ],
        // ignoredPaths: ['meta.baseQueryMeta.request'],
      },
    }).concat(api.middleware, thunk);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export const { getState, dispatch } = store;
