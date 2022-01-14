import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import { colors } from "../utils/colors";
import { TABS } from "../navigation/tabs";

export function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const circleAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withTiming(translateX.value)},
        {translateY: withTiming(translateY.value)},
      ],
    };
  });

  const onPress = (routeName) => {
    navigation.navigate({ name: routeName });

    if (routeName === TABS.settings) {
      translateY.value = withSequence(
        withTiming(1500),
        withTiming(0, {}, () => {
          translateX.value = width / 3;
          translateY.value = 0;
        }),
      );
    } else if (routeName === TABS.about) {
      translateY.value = withSequence(
        withTiming(1500),
        withTiming(0, {}, () => {
          translateX.value = width / 1.5;
          translateY.value = 0;
        }),
      );
    } else {
      translateY.value = withSequence(
        withTiming(-1000),
        withTiming(0, {}, () => {
          translateX.value = 0;
          translateY.value = 0;
        }),
      );
    }
  };

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          {
            width: width / 3,
            height: width / 3,
            borderRadius: width / 3,
          },
          styles.circleStyles,
          circleAnimatedStyles,
        ]}
      />
      <View style={styles.wrapper}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => onPress(route.name)}
              style={styles.tabItem}>
              <Text style={{ color: isFocused ? colors.white : colors.black }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  circleStyles: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
