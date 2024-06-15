import React from 'react';
import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import { Fragment } from 'react';
import { useFetchStoreQuery } from '../../api';
import { useAppSelector } from '../../hooks';
import { AppItem } from './views/app-item';
import { UpdateAppVersion } from './views/update-app-version';

import { HeaderApps } from './views/header/header-apps';
import { FlashList } from '@shopify/flash-list';
import { CategoryItem } from './views/category-item';
// import { useTVEventHandler } from 'react-native';

export const AppScreen = () => {
  useFetchStoreQuery();

  const appCategories = useAppSelector(s => s.app.store.categories);

  return (
    <View flex={1} bgColor="black">
      <HeaderApps />
      <FlashList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={1}
        data={appCategories}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => {
          return <CategoryItem category={item} />;
        }}
        estimatedItemSize={100}
        ListFooterComponent={<View height={100} />}
      />
    </View>
  );
};
