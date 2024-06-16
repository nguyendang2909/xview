import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppStore } from '../../types';
import { RootState } from '@reduxjs/toolkit/query';

const initialState: AppStore.CacheState = {
  focusedAppId: null,
};

export const cacheSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFocusAppId: (state, { payload }: PayloadAction<string | null>) => {
      state.focusedAppId = payload;
    },
  },
});

export const selectFocusedAppId = (state: AppStore.RootState) =>
  state.cache.focusedAppId;

export const { setFocusAppId } = cacheSlice.actions;

export const cacheReducer = cacheSlice.reducer;
