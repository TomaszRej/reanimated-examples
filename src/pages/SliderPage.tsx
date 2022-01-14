import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  interpolateColor,
} from 'react-native-reanimated';
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {colors} from '../utils/colors';
import {clamp} from 'react-native-redash';

export const SliderPage = () => {
  const [translateYState, setTranslateYState] = React.useState(0);
  const translateY = useSharedValue(1);

  const handleAddHeight = () => {
    translateY.value = withTiming(translateY.value + 50);
    setTranslateYState(translateY.value + 50);
  };
  const handleSubtractHeight = () => {
    translateY.value = withTiming(translateY.value - 50);
  };

  const update = (val: number) => {
    setTranslateYState(val);
  };

  const drag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offsetY: number}
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      const val = ctx.offsetY + -event.translationY;
      runOnJS(update)(val);
      translateY.value = clamp(val, 0, 500);
    },
  });

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: translateY.value,
    };
  });

  const animatedContainer = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateY.value,
      [0, 500],
      [colors.black, colors.white],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <Text>{translateYState}</Text>
      <PanGestureHandler onGestureEvent={drag}>
        <Animated.View style={styles.outerShape}>
          <Animated.View style={[styles.fill, animatedHeight]} />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="+" onPress={handleAddHeight} />
        </View>
        <View style={styles.button}>
          <Button title="-" onPress={handleSubtractHeight} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerShape: {
    backgroundColor: colors.pink,
    borderRadius: 50,
    width: 200,
    height: 500,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  button: {
    backgroundColor: colors.pink,
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    backgroundColor: colors.blue,
    width: '100%',
  },
});
