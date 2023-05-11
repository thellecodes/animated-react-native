import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,interpolate
} from "react-native-reanimated";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
export const COLOR_WIDTH = width / 3;
const RADIUS = 45;

interface ColorProps {
  color: {
    start: string;
    end: string;
  };
  key: number;
  translateX: Animated.SharedValue<number>;
  onPress: (position: { x: number; y: number }) => void;
}

const styles = StyleSheet.create({
  container: {
    width: COLOR_WIDTH,
    alignContent: "center",
  },
  gradient: {
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderWidth: 6,
    borderColor: "white",
  },
});

function Color({ color, translateX, key, onPress }: ColorProps) {
  const inputRange = [
    -COLOR_WIDTH * (key + 1),
    -COLOR_WIDTH * key,
    -COLOR_WIDTH * (key - 1),
  ];

  const onGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onActive: ({ absoluteX: x, absoluteY: y }) => {
        onPress({ x, y });
      },
    });

  const style = useAnimatedStyle(() => {
    const angle = interpolate(
      translateX.value,
      inputRange,
      [100, Math.PI / 2, Math.PI],
      Extrapolate.CLAMP
    );
    const translateY = 100 * Math.cos(angle);
    console.log(translateY)

    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <TapGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          <LinearGradient
            colors={[color.start, color.end]}
            style={styles.gradient}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
}

export default Color;
