import { StatusBar } from '@gluestack-ui/themed';
import React from 'react';
import { AppNavigator } from './app-navigator';

export const Main: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFF" />
      <AppNavigator />
    </>
  );
};
