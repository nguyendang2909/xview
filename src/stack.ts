import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types/navigation.type';

// Documentation: https://reactnavigation.org/docs/stack-navigator/
export const Stack = createNativeStackNavigator<AppStackParamList>();
