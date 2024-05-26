import React from 'react';
import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import {
  ButtonText,
  HStack,
  Image,
  ImageBackground,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import { v4 as uuidV4 } from 'uuid';
import { Config } from '../../../config';
import { ApiResponse } from '../../../types';
import { Button } from '@gluestack-ui/themed';

export const AppItem: FC<{
  app: ApiResponse.App;
}> = ({ app }) => {
  const [percent, setPercent] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [isInstalled, setInstalled] = useState<boolean | null>(null);

  // const openApp = () => {
  //   console.log(111);
  //   Linking.openURL('vnd.youtube://');
  // };

  // const check = useCallback(async () => {
  //   try {
  //     await SharedGroupPreferences.isAppInstalledAndroid(app.id);
  //     setInstalled(true);
  //   } catch (e) {
  //     setInstalled(false);
  //   }
  // }, [app.id]);

  // useEffect(() => {
  //   check();
  // }, [check]);

  // useEffect(() => {
  //   Linking.canOpenURL('com.studio.a')
  //     .then(() => {
  //       console.log(44444);
  //     })
  //     .catch(err => {
  //       console.log(55555);
  //     });
  // }, []);

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

  console.log(111, app.bundleId);
  return (
    <View flex={1} backgroundColor="rgba(151, 150, 173, 0.8)">
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
            <HStack rowGap={8} columnGap={8} alignItems="center">
              {/* {isLoading ? (
                <>
                  <CircularProgress
                    radius={14}
                    initialValue={0}
                    showProgressValue={false}
                    value={percent}
                    activeStrokeColor={'#2465FD'}
                    activeStrokeSecondaryColor={'#C25AFF'}
                  />
                </>
              ) : (
                <Button
                  size="sm"
                  onPress={handlePress}
                  borderColor={isFocused ? '$textDark900' : undefined}
                  borderWidth={isFocused ? 2 : undefined}
                  onFocus={() => {
                    onFocus(app.id);
                  }}>
                  <ButtonText>Cài đặt</ButtonText>
                </Button>
              )} */}
            </HStack>
          </View>
        </View>
      </HStack>
    </View>
  );
};
