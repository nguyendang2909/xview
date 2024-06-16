import { Divider, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { ApiResponse } from '../../../../types';
import { AppItem } from '../app-item';

export const CategoryItem: React.FC<{ category: ApiResponse.AppCategory }> = ({
  category,
}) => {
  return (
    <>
      <View pt={16} px={8}>
        <Text bold fontSize="$lg" lineHeight={34} color="$white">
          {category.name}
        </Text>
      </View>
      <View py={16}>
        <View flexDirection="row" flexWrap="wrap" flex={1}>
          {category.apps.map(app => {
            return <AppItem key={app.id} app={app} />;
          })}
        </View>
      </View>
      <Divider />
    </>
  );
};
