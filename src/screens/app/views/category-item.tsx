import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { ApiResponse } from '../../../types';
import { AppItem } from './app-item';
import { FlashList } from '@shopify/flash-list';

export const CategoryItem: React.FC<{
  category: ApiResponse.AppCategory;
}> = ({ category }) => {
  return (
    <>
      <View pt={16}>
        <Text bold fontSize="$lg" lineHeight={34} color="$white">
          {category.name}
        </Text>
      </View>
      <View py={16}>
        <View flexDirection="row" flexWrap="wrap" flex={1}>
          {/* <FlashList
            style={{
              height: 100,
              flex: 1,
            }}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            data={category.apps}
            keyExtractor={(item, index) => item.id || index.toString()}
            renderItem={({ item }) => {
              return <AppItem app={item} />;
            }}
            estimatedItemSize={100}
            ListFooterComponent={<View height={100} />}
          /> */}
          {/* <ScrollView
            flex={1}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          /> */}
          {category.apps.map(app => {
            return <AppItem app={app} />;
          })}
        </View>
      </View>
      <Divider />
    </>
  );
};
