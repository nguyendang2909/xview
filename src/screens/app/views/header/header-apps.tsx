import { ImageBackground, View } from '@gluestack-ui/themed';
import React from 'react';

export const HeaderApps: React.FC = () => {
  return (
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
  );
};
