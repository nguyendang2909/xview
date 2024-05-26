import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiResponse } from './fe.type';

export type HomeTabParamList = {
  APP: undefined;
  INSTALLED_APP: undefined;
};

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  APP_DETAIL: {
    app: ApiResponse.App;
  };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
