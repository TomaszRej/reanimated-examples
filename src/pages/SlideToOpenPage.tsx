import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  interpolateColor,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import { clamp } from "react-native-redash";
import { colors } from "../utils/colors";

interface IProps {
  answered: Animated.SharedValue<boolean>;
}

const AnimatedContent: React.FC<IProps> = ({ answered }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = withTiming(answered.value ? 1 : 0, { duration: 700 });
    return {
      opacity,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    };
  });
  return (
    <Animated.View style={animatedStyles}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </Animated.View>
  );
};

const CIRCLE_WIDTH = 90;

export const SlideToOpenPage = () => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(1);
  const answered = useSharedValue(false);
  const [answeredJS, setAnsweredJS] = React.useState(false);


  const drag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
    }
    >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      if (!answered.value) {
        const val = ctx.offsetX + event.translationX;
        translateX.value = clamp(val, 0, width - 100);
      }
    },
    onEnd: () => {
      if (!answered.value) {
        if (translateX.value > 70) {
          // translateX.value = withTiming(width);

          // translateX.value = withSequence(withTiming(width), withSpring(150));
          translateX.value = withTiming(
            width - 100,
            { duration: 150 },
            (isFinished) => {
              if (isFinished) {
                // marginRight.value = withTiming(150, { duration: 300 });
                // runOnJS(updateAnswered)();
                answered.value = true;
                translateX.value = withSpring(width / 2 - CIRCLE_WIDTH / 2);
              }
            }
          );
          // runOnJS(updateMargin)();
        } else {
          translateX.value = withTiming(0);
        }
      }
    },
  });

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: width - translateX.value,
      // opacity: withTiming(answered.value ? 0 : 1),
      backgroundColor: answered.value ? colors.transparent : colors.gray,
    };
  });

  const animatedSecond = useAnimatedStyle(() => {
    return {
      marginRight: withTiming(answered.value ? 400 : 0),
      backgroundColor: answered.value ? "red" : "green",
      transform: [
        {
          rotate: `${translateX.value / 50}rad`,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      <Text>SOMEONE IS CALLING</Text>
      <AnimatedContent answered={answered} />
      <PanGestureHandler onGestureEvent={drag}>
        <Animated.View style={[styles.outerShape, animatedWidth]}>
          <Animated.View style={[styles.circle, animatedSecond]}>
            <View style={styles.square} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.white
  },
  outerShape: {
    backgroundColor: "pink",
    borderRadius: 50,
    height: 100,
    padding: 5,
    overflow: "hidden",
    alignSelf: "flex-end",
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: 100,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 35,
    height: 35,
    backgroundColor: "white",
  },
  box: {
    borderColor: "gray",
    borderWidth: 1,
    height: 80,
    width: 80,
    margin: 15,
  },
});

export default SlideToOpenPage;
