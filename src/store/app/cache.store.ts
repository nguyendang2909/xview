import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppStore } from '../../types';

const initialState: AppStore.CacheState = {
  focusedAppId: null,
};

export const cache = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setFocusAppId: (state, { payload }: PayloadAction<string | null>) => {
      state.focusedAppId = payload;
    },
  },
});

export const selectFocusedAppId = (state: AppStore.RootState) =>
  state.cache.focusedAppId;

export const { setFocusAppId } = cache.actions;

export const cacheReducer = cache.reducer;
