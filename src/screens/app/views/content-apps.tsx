import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import { useAppSelector } from '../../../hooks';
import { AppItem } from './app-item';
import React from 'react';
import { CategoryItem } from './category/category-item';

export const ContentApps: React.FC = () => {
  const appCategories = useAppSelector(s => s.app.store.categories);

  return (
    <>
      <ScrollView
        px={16}
        mb={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {appCategories?.map(category => {
          return (
            <View key={category.id}>
              <CategoryItem category={category} />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};
