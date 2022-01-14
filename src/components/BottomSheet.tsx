import React, {FC, useEffect} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import type {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { OFFSET, ANIM_CONFIG } from "../utils/utils";

interface IProps {
  open: boolean;
}

const BottomSheet: FC<IProps> = ({open}) => {
  const {height} = useWindowDimensions();
  const top = useSharedValue(height);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {y: number}
  >({
    onStart: (_, ctx) => {
      ctx.y = top.value;
    },
    onActive: ({translationY}, ctx) => {
      top.value = ctx.y + translationY;
    },
    onEnd: () => {
      if (top.value <= 380) {
        top.value = top.value > 250 ? height / 2 : height / 8;
      } else {
        top.value = top.value > height / 2 + OFFSET ? height : height / 2;
      }
    },
  });

  useEffect(() => {
    top.value = open ? height / 8 : height;
  }, [open, height]);

  const topStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, ANIM_CONFIG),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sheet, topStyle]}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={[styles.handle]} />
            </PanGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  handle: {
    margin: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 100,
  },
});
