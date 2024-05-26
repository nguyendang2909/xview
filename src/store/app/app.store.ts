import { createSlice } from '@reduxjs/toolkit';
import { appStoreEndpoints } from '../../api';
import { AppStore } from '../../types';

const initialState: AppStore.AppState = {
  store: {
    categories: [],
    version: '1.0',
    url: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      appStoreEndpoints.fetchStore.matchFulfilled,
      (state, { payload }) => {
        state.store = payload;
      },
    );
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
