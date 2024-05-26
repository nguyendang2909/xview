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
import { TouchableOpacity } from 'react-native';
// import { useTVEventHandler } from 'react-native';

export const AppScreen = () => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  // const myTVEventHandler = evt => {
  //   switch (evt.eventType) {
  //     case 'up':
  //       setFocusedElement();
  //   }
  //   console.log(2222, evt.eventType);
  //   setLastEventType(evt.eventType);
  // };

  // useTVEventHandler(myTVEventHandler);

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
    <View flex={1} bgColor="#303030">
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
                <View flexDirection="row" flexWrap="wrap" flex={1}>
                  {category.apps.map(app => {
                    return (
                      <View
                        as={TouchableOpacity}
                        width="20%"
                        key={app.id}
                        px={8}
                        py={8}>
                        <AppItem
                          app={app}
                          isFocused={focusedElement === app.id}
                        />
                      </View>
                    );
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
