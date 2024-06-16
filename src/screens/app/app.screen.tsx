import React from 'react';
import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import { Fragment, useEffect, useState } from 'react';
import { useFetchStoreQuery } from '../../api';
import { useAppSelector } from '../../hooks';
import { AppItem } from './views/app-item';
import { UpdateAppVersion } from './views/update-app-version';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constants';
import { ImageBackground } from '@gluestack-ui/themed';

export const AppScreen = () => {
  const navigation = useNavigation();

  const checkInstallAppPermission = async () => {
    const permission = await RNApkInstaller.haveUnknownAppSourcesPermission();
    if (!permission) {
      RNApkInstaller.showUnknownAppSourcesPermission();
    }
  };

  useFetchStoreQuery();

  const appCategories = useAppSelector(s => s.app.store.categories);

  useEffect(() => {
    checkInstallAppPermission();
  }, []);

  return (
    <View flex={1} bgColor="black">
      <ScrollView
        px={16}
        mb={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View alignItems="center" width="$full" justifyContent="center">
          <View width="$2/3">
            <ImageBackground
              w="100%"
              aspectRatio={14 / 1}
              alt="asdas"
              // height="100%"
              source={require('../../../assets/banners/banner.jpg')}
            />
          </View>
        </View>
        {appCategories?.map(category => {
          return (
            <Fragment key={category.id}>
              <View pt={16}>
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
            </Fragment>
          );
        })}
      </ScrollView>

      <UpdateAppVersion />
    </View>
  );
};
