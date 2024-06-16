import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import { useAppSelector } from '../../../hooks';
import { AppItem } from './app-item';

export const ContentApps = () => {
  const appCategories = useAppSelector(s => s.app.store.categories);

  return (
    <>
      <ScrollView
        px={16}
        mb={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {appCategories?.map(category => {
          return (
            <View key={category.id}>
              <View pt={16} px={8}>
                <Text bold fontSize="$lg" lineHeight={34} color="$white">
                  {category.name}
                </Text>
              </View>
              <View py={16}>
                <View flexDirection="row" flexWrap="wrap" flex={1}>
                  {category.apps.map(app => {
                    return <AppItem key={app.id} app={app} />;
                  })}
                </View>
              </View>
              <Divider />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};
