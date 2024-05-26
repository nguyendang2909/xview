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
import {
  Pressable,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constants';
// import { useTVEventHandler } from 'react-native';

export const AppScreen = () => {
  const [focusedAppId, setFocusedAppId] = useState<string | null>(null);
  const navigation = useNavigation();
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
        {appCategories?.map(category => {
          return (
            <Fragment key={category.id}>
              <View pt={16}>
                <Text bold fontSize={28} lineHeight={34} color="$white">
                  {category.name}
                </Text>
              </View>
              <View py={16}>
                <View flexDirection="row" flexWrap="wrap" flex={1}>
                  {category.apps.map(app => {
                    return (
                      <View
                        borderColor="$white"
                        as={Pressable}
                        // @ts-ignore
                        onFocus={() => {
                          setFocusedAppId(app.id);
                        }}
                        onPress={() => {
                          navigation.navigate(SCREENS.APP_DETAIL, { app });
                        }}
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
                          <AppItem app={app} />
                        </View>
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
