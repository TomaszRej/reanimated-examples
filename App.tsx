import React from 'react';
import { View } from 'react-native'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomSheetExamplePage} from './src/pages/BottomSheetExamplePage';
import {MainPage} from './src/pages/MainPage';
import SlideToOpenPage from './src/pages/SlideToOpenPage';
import {SliderPage} from './src/pages/SliderPage';
import TabsPage from './src/pages/TabsPage';
import HeaderPage from "./src/pages/HeaderPage";



const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Examples" component={MainPage} />
        <Stack.Screen name="Bottom sheet" component={BottomSheetExamplePage} />
        <Stack.Screen name="Slide to open" component={SlideToOpenPage} />
        <Stack.Screen name="Slider" component={SliderPage} />
        <Stack.Screen name="Tabs" component={TabsPage} />
        <Stack.Screen
          name="Header"
          component={HeaderPage}
          options={{ headerTitle:  () => <View/> }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
