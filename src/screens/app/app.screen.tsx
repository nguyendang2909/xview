import React from 'react';
import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import {
  Divider,
  HStack,
  ScrollView,
  StatusBar,
  Text,
  View,
} from '@gluestack-ui/themed';
import { Fragment, useEffect, useState } from 'react';
import { useFetchStoreQuery } from '../../api';
import { useAppSelector } from '../../hooks';
import { AppItem } from './views/app-item';
import { UpdateAppVersion } from './views/update-app-version';

export const AppScreen = () => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
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
    <>
      <StatusBar barStyle="default" />

      <ScrollView px={16}>
        {appCategories.map(category => {
          return (
            <Fragment key={category.id}>
              <View pt={16}>
                <Text bold fontSize={28} lineHeight={34}>
                  {category.name}
                </Text>
              </View>
              <View py={16}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <HStack flex={1} gap={16}>
                    {category.apps.map(app => {
                      return (
                        <AppItem
                          key={app.id}
                          app={app}
                          isFocused={focusedElement === app.id}
                          onFocus={setFocusedElement}
                        />
                      );
                    })}
                  </HStack>
                </ScrollView>
              </View>
              <Divider />
            </Fragment>
          );
        })}
      </ScrollView>

      <UpdateAppVersion />
    </>
  );
};
