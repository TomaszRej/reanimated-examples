import React from 'react';
import {View, Button} from 'react-native';
import {ROUTES} from '../navigation/routes';

export const MainPage = ({navigation}) => {
  return (
    <View>
      <Button
        title="Bottom sheet"
        onPress={() => navigation.navigate(ROUTES.bottomSheet)}
      />
      <Button
        title="Slide to open"
        onPress={() => navigation.navigate(ROUTES.slideToOpen)}
      />
      <Button
        title="Slider"
        onPress={() => navigation.navigate(ROUTES.slider)}
      />
      <Button
        title="Tabs"
        onPress={() => navigation.navigate(ROUTES.tabs)}
      />
      <Button
        title="Header"
        onPress={() => navigation.navigate(ROUTES.header)}
      />
    </View>
  );
};
