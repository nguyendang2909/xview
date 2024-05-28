import { createSlice } from '@reduxjs/toolkit';
import { appStoreEndpoints } from '../../api';
import { AppStore } from '../../types';

const initialState: AppStore.AppState = {
  store: {
    categories: [
      {
        id: '86d5f422-8683-4d1e-8897-e2d011e11c4e',
        name: 'Giải trí',
        apps: [
          {
            name: 'VeboTV',
            iconUrl:
              'app-store/images/f0d4b863-a72b-447d-a3c7-036e80644675.webp',
            url: 'app-store/apps/2c5aa7ed-2afd-4515-9892-7e88f9231303.apk',
            id: 'f333161c-e62c-4c4a-902d-3600eca6d1bf',
            bundleId: '1.0',
            description: 'asdasdasdasda',
            bannerUrl:
              'app-store/banner/c6f5fa33-d1a3-411a-8261-e2533b960aa2.webp',
          },
          {
            name: 'Xem tivi free',
            iconUrl:
              'app-store/images/8643f8fe-fd64-4ece-9519-7701f41bd1f4.webp',
            url: 'app-store/apps/7f008ecf-1811-4def-8ba0-d22c904655b5.apk',
            id: '2b378085-0bc4-42f0-96be-190e2c5cb3c9',
            bundleId: '2.0',
            description: 'asdasdasd',
            bannerUrl:
              'app-store/banner/be5f09b2-68d4-4d71-ba33-36f0be3ca77e.webp',
          },
          {
            name: 'Bỏng ngô Tv',
            iconUrl:
              'app-store/images/66cbd6e0-a423-43d8-b518-7edbcfec7faf.webp',
            url: 'app-store/apps/03a67838-26a4-42e8-940c-d801e1e42770.apk',
            id: 'd4503c0c-0980-40bc-8d75-f42a682bb71b',
            bundleId: '3.0',
            description: 'asdasdasd3',
            bannerUrl:
              'app-store/banner/8580df61-8461-42cf-8987-fdc7580b6b59.webp',
          },
          {
            name: 'aa',
            description: 'ss',
            iconUrl:
              'app-store/images/d153f7c3-c773-4326-887f-351cf07ae540.webp',
            url: 'app-store/apps/8ec80006-74f3-4db7-835c-efe9daf42112.apk',
            id: 'a49a5fc6-13b1-4340-8dd9-7ee6e7f0c36c',
            bannerUrl:
              'app-store/banner/9640dce7-a8cb-4f0d-9755-f95cc3f3b4b7.webp',
          },
          {
            name: 'asdasd',
            description: 'asdasd',
            iconUrl:
              'app-store/images/124baa5b-726b-46bd-ab6c-4edd2ed7ab65.webp',
            url: 'app-store/apps/96fed5fc-544f-4abc-86dd-2e372255671e.apk',
            id: '8e3952f7-3fa6-47da-a124-e93d39c33d58',
            bannerUrl:
              'app-store/banner/630b23cd-98ab-433c-b6a2-e644c4335a5e.webp',
          },
        ],
      },
      {
        id: '8c0d7725-cb74-4847-b200-ebfa3c68576f',
        name: 'Xem phim',
        apps: [
          {
            name: 'xxxxxx',
            bundleId: '4.0',
            description: 'asdasd',
            iconUrl:
              'app-store/images/1a407a29-6704-400b-8f56-d0d2cec0d34e.webp',
            url: 'app-store/apps/f3bfc0d0-4517-4139-8039-6fefbbbe3768.apk',
            id: 'bb756bbc-73e8-4e07-8586-e2fa1dcf6f69',
            bannerUrl:
              'app-store/banner/f70e5b20-639d-48f4-af57-98b09fc4f304.webp',
          },
        ],
      },
      { id: '3850820b-8dd0-4a40-914b-2223788234c6', name: 'ssss', apps: [] },
    ],
    url: '',
    version: '1.0',
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
