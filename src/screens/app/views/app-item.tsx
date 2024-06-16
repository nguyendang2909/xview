import React, { useCallback } from 'react';
import {
  HStack,
  Image,
  ImageBackground,
  Pressable,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import { FC } from 'react';
import { Config } from '../../../config';
import { ApiResponse } from '../../../types';
import { useAppSelector } from '../../../hooks';
import {
  cacheActions,
  selectFocusedAppId,
  setFocusAppId,
} from '../../../store/app/cache.store';
import { dispatch } from '../../../store';
import { SCREENS } from '../../../constants';
import { navigate, navigationRef } from '../../../navigations/navigation-ref';

export const AppItem: FC<{
  app: ApiResponse.App;
}> = ({ app }) => {
  const focusedAppId = useAppSelector(selectFocusedAppId);

  const handleFocus = useCallback(() => {
    dispatch(setFocusAppId(app.id));
  }, [app.id]);

  const handlePress = useCallback(() => {
    navigate(SCREENS.APP_DETAIL, { app });
  }, [app]);

  return (
    <Pressable
      borderColor="$white"
      // @ts-ignore
      onFocus={handleFocus}
      onPress={handlePress}
      width="20%"
      key={app.id}
      px={8}
      py={8}>
      <View
        {...(focusedAppId === app.id
          ? {
              borderWidth: 2,
              borderColor: '$amber500',
            }
          : {
              borderWidth: 2,
              borderColor: '$white',
            })}>
        <View flex={1}>
          <View flex={1}>
            <ImageBackground
              resizeMode="cover"
              flex={1}
              style={{ width: '100%', height: '100%' }}
              aspectRatio={2 / 1}
              source={{
                uri: `${Config.STORAGE_BASE_URL}/${app.bannerUrl}`,
              }}
              alt={app.name}
            />
          </View>
          <HStack flex={1} gap={8} px={8} py={8}>
            <View>
              <Image
                height={40}
                width={40}
                source={{
                  uri: `${Config.STORAGE_BASE_URL}/${app.iconUrl}`,
                }}
                borderRadius={8}
                alt={app.name}
              />
            </View>
            <View>
              <View columnGap={8} rowGap={8}>
                <VStack>
                  <Text
                    bold
                    color="$white"
                    lineHeight={22}
                    fontSize={14}
                    numberOfLines={1}>
                    {app.name}
                  </Text>
                  <Text
                    bold
                    color="$white"
                    lineHeight={18}
                    fontSize={12}
                    numberOfLines={1}>
                    {app.bundleId}
                  </Text>
                </VStack>
                <HStack rowGap={8} columnGap={8} alignItems="center" />
              </View>
            </View>
          </HStack>
        </View>
      </View>
    </Pressable>
  );
};
