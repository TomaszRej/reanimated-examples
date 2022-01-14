import React from 'react';
import {Route} from "../components/Route";
import {MyTabBar} from '../components/MyTabBar';
import {TABS} from "../navigation/tabs";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabsPage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={TABS.home}
        component={Route}
        initialParams={{name: TABS.home}}
      />
      <Tab.Screen
        name={TABS.settings}
        component={Route}
        initialParams={{name: TABS.settings}}
      />
      <Tab.Screen
        name={TABS.about}
        component={Route}
        initialParams={{name: TABS.about}}
      />
    </Tab.Navigator>
  );
};

export default TabsPage;
