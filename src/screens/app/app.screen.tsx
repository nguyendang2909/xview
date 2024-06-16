import React from 'react';

import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';

import { useAppSelector } from '../../hooks';
import { AppItem } from './views/app-item';
import { UpdateAppVersion } from './views/update-app-version';

import { HeaderApps } from './views/header/header-apps';

export const AppScreen = () => {
  const appCategories = useAppSelector(s => s.app.store.categories);

  return (
    <View flex={1} bgColor="black">
      <HeaderApps />
      <ScrollView
        px={16}
        mb={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {appCategories?.map(category => {
          return (
            <View key={category.id}>
              <View pt={16} px={8}>
                <Text bold fontSize="$lg" lineHeight={34} color="$white">
                  {category.name}
                </Text>
              </View>
              <View py={16}>
                <View flexDirection="row" flexWrap="wrap" flex={1}>
                  {category.apps.map(app => {
                    return <AppItem app={app} />;
                  })}
                </View>
              </View>
              <Divider />
            </View>
          );
        })}
      </ScrollView>

      <UpdateAppVersion />
    </View>
  );
};
