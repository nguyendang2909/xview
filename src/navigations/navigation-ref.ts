import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from '../types/navigation.type';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function goBack<RouteName extends keyof AppStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends AppStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: AppStackParamList[RouteName]]
      : [screen: RouteName, params: AppStackParamList[RouteName]]
    : never
) {
  if (!navigationRef.isReady()) {
    return;
  }
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
    return;
  }
  navigationRef.navigate(...args);
}

export const { navigate } = navigationRef;
