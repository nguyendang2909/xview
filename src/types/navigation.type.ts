import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeTabParamList = {
  APP: undefined;
  INSTALLED_APP: undefined;
};

export type AppStackParamList = {
  EditInfoHeight: undefined;
  EDIT_INFO_LOCATION: undefined;
  EditInfoNickname: undefined;
  EditInfoWeight: undefined;
  DATING_NEARBY_FILTER: undefined;
  CREATE_BASIC_PROFILE: undefined;
  CREATE_BASIC_PHOTOS: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedMe: undefined;

  Main: undefined;

  ProfileEdit: undefined;

  ProfileSetting: undefined;
  SelectRelationshipGoal: undefined;
  SignIn: undefined;

  SignInWithPhoneNumber: undefined;
  Welcome: undefined;

  SUBJECTS: undefined;
  SUBJECT: {
    subject: string;
  };
  CREATE_PRODUCT: undefined;

  CREATE_ORDER: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
