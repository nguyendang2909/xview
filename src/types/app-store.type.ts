import { store } from '../store';
import { ApiResponse } from './fe.type';

export declare namespace AppStore {
  type RootState = ReturnType<typeof store.getState>;

  type AppDispatch = typeof store.dispatch;

  type AppState = {
    store: ApiResponse.AppStore;
  };

  type CacheState = { focusedAppId: string | null };
}
