import React from 'react';
import { Stack } from './stack';
import { SCREENS } from './constants';
import { AppScreen } from './screens/app/app.screen';

export const MainStack: React.FC = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // navigationBarColor: colors.background,
          orientation: 'landscape',
        }}
        // initialRouteName={SCREENS.Main}
        initialRouteName={SCREENS.Home}>
        <Stack.Group>
          <Stack.Screen name={SCREENS.Home} component={AppScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};
