import RNApkInstaller from '@dominicvonk/react-native-apk-installer';
import { ImageBackground, View } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { useFetchStoreQuery } from '../../../../api';
import { UpdateAppVersion } from '../update-app-version';

export const HeaderApps: React.FC = () => {
  const checkInstallAppPermission = async () => {
    const permission = await RNApkInstaller.haveUnknownAppSourcesPermission();
    if (!permission) {
      RNApkInstaller.showUnknownAppSourcesPermission();
    }
  };

  useFetchStoreQuery();

  useEffect(() => {
    checkInstallAppPermission();
  }, []);

  return (
    <>
      <View alignItems="center" width="$full" justifyContent="center">
        <View width="$2/3">
          <ImageBackground
            w="100%"
            aspectRatio={14 / 1}
            alt="asdas"
            // height="100%"
            source={require('../../../../../assets/banners/banner.jpg')}
          />
        </View>
      </View>
      <UpdateAppVersion />
    </>
  );
};
