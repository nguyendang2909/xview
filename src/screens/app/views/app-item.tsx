import React, { useCallback, useMemo } from 'react';
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
  selectFocusedAppId,
  setFocusAppId,
} from '../../../store/app/cache.store';
import { dispatch } from '../../../store';
import { SCREENS } from '../../../constants';
import { navigate } from '../../../navigations/navigation-ref';

export const AppItem: FC<{
  app: ApiResponse.App;
}> = ({ app }) => {
  const focusedAppId = useAppSelector(selectFocusedAppId);

  const isFocused = useMemo(
    () => focusedAppId === app.id,
    [app.id, focusedAppId],
  );

  const handleFocus = useCallback(() => {
    console.log(1111);
    dispatch(setFocusAppId(app.id));
  }, [app.id]);

  const handlePress = useCallback(() => {
    navigate(SCREENS.APP_DETAIL, { app });
  }, [app]);

  return (
    <View
      width="20%"
      {...(isFocused ? { px: 0, py: 0 } : { px: 8, py: 8 })}
      aspectRatio={1.5}>
      <Pressable
        flex={1}
        borderRadius={24}
        overflow="hidden"
        onFocus={handleFocus}
        onPress={handlePress}
        borderWidth={1}
        borderColor={isFocused ? '$blue700' : '$white'}>
        <View width="$full" height="$3/5">
          <ImageBackground
            w="$full"
            h="$full"
            resizeMode="stretch"
            flex={1}
            source={{
              uri: `${Config.STORAGE_BASE_URL}/${app.bannerUrl}`,
            }}
            alt={app.name}
          />
        </View>
        <View flex={1}>
          <HStack flex={1} gap={8} px={8}>
            <View h="$full" alignItems="center" justifyContent="center">
              <Image
                resizeMode="stretch"
                h="$2/3"
                aspectRatio={3 / 2}
                source={{
                  uri: `${Config.STORAGE_BASE_URL}/${app.iconUrl}`,
                }}
                borderRadius={8}
                alt={app.name}
              />
            </View>

            <View h="$full" justifyContent="center" alignItems="center">
              <VStack>
                <Text
                  bold
                  color="$white"
                  fontSize={12}
                  lineHeight={12}
                  numberOfLines={1}>
                  {app.name}
                </Text>
                <Text
                  bold
                  color="$white"
                  fontSize={10}
                  lineHeight={10}
                  numberOfLines={1}>
                  {app.bundleId}
                </Text>
              </VStack>
              <HStack rowGap={8} columnGap={8} alignItems="center" />
            </View>
          </HStack>
        </View>
      </Pressable>
    </View>
  );
};
