import React from 'react';

import { View } from '@gluestack-ui/themed';

import { HeaderApps } from './views/header/header-apps';
import { ContentApps } from './views/content-apps';

export const AppScreen = () => {
  return (
    <View flex={1} bgColor="black">
      <HeaderApps />
      <ContentApps />
    </View>
  );
};
