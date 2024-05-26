import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import {
  Button,
  ButtonText,
  HStack,
  Image,
  ImageBackground,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { Dimensions, useTVEventHandler } from 'react-native';
import RNFS from 'react-native-fs';
import { AppStackScreenProps } from '../../types/navigation.type';
import { Config } from '../../config';
import Toast from 'react-native-toast-message';
import 'react-native-get-random-values';
import { v4 as uuidV4 } from 'uuid';
import * as Progress from 'react-native-progress';

type FCProps = AppStackScreenProps<'APP_DETAIL'>;

export const AppDetailScreen: React.FC<FCProps> = ({ route }) => {
  const [isFocused, setFocus] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);
  const app = route.params.app;
  const myTVEventHandler = evt => {
    // switch (evt.eventType) {
    //   case 'up':
    //     setFocusedElement();
    // }
    // console.log(2222, evt.eventType);
    // setLastEventType(evt.eventType);
  };

  useTVEventHandler(myTVEventHandler);

  const { width: screenWidth } = Dimensions.get('screen');

  const checkInstallAppPermission = async () => {
    const permission = await RNApkInstaller.haveUnknownAppSourcesPermission();
    if (!permission) {
      RNApkInstaller.showUnknownAppSourcesPermission();
    }
  };

  useEffect(() => {
    checkInstallAppPermission();
  }, []);

  const handlePress = async () => {
    setLoading(true);
    const filePath = RNFS.DocumentDirectoryPath + '/' + uuidV4() + '.apk';
    const download = RNFS.downloadFile({
      fromUrl: Config.STORAGE_BASE_URL + '/' + app.url,
      toFile: filePath,
      progress: res => {
        const currentPercent =
          +(res.bytesWritten / res.contentLength).toFixed(2) * 100;
        setPercent(currentPercent);
      },
      progressDivider: 1,
    });
    download.promise
      .then(result => {
        if (result.statusCode >= 400) {
          Toast.show({ text1: 'Lỗi khi tải, vui lòng thử lại' });
          return;
        }
        RNApkInstaller.install(filePath);
      })
      .finally(() => {
        setPercent(0);
        setLoading(false);
      });
  };

  return (
    <View flex={1} bgColor="#303030" px={32} py={32}>
      <VStack>
        <HStack justifyContent="space-between">
          <View>
            <Text color="$white" size="3xl" bold>
              {app.name}
            </Text>
            <Text color="$white">{app.description}</Text>
          </View>
          <View>
            <Image
              height={64}
              width={64}
              source={{
                uri: `${Config.STORAGE_BASE_URL}/${app.iconUrl}`,
              }}
              borderRadius={8}
              alt={app.name}
            />
          </View>
        </HStack>
        <HStack mt={16}>
          <Button
            size="sm"
            onPress={handlePress}
            borderColor={isFocused ? '$amber100' : undefined}
            borderWidth={isFocused ? 2 : undefined}
            onFocus={() => {
              setFocus(true);
            }}>
            <ButtonText>Cài đặt</ButtonText>
          </Button>
        </HStack>
        {!!percent && (
          <View mt={16}>
            <Progress.Bar
              progress={percent / 100}
              height={10}
              width={screenWidth - 64}
              color="white"
            />
          </View>
        )}
      </VStack>
      <View flex={1}>
        <HStack flexDirection="row" flexWrap="wrap" flex={1} mt={32}>
          <View width="20%">
            <View flex={1}>
              <ImageBackground
                resizeMode="cover"
                style={{ width: '100%' }}
                aspectRatio={2 / 1}
                source={{
                  uri: `${Config.STORAGE_BASE_URL}/${app.bannerUrl}`,
                }}
                alt={app.name}
              />
            </View>
          </View>
        </HStack>
      </View>
    </View>
  );
};
