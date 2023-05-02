import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import MaskedView from "@react-native-community/masked-view";
import { Vector } from "react-native-redash";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;

// 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
const C = 0.5522847498;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x: number, y: number) => {
  "worklet";
  return { x, y };
};
const curve = (c1: Vector, c2: Vector, to: Vector) => {
  "worklet";
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

interface WaveProps {
  side: Side;
  children: ReactNode;
  position: Vector<Animated.SharedValue<number>>;
}

const Wave = ({ side, position, children }: WaveProps) => {
  const animatedProps = useAnimatedProps(() => {
    const R = MARGIN_WIDTH - MIN_LEDGE;
    const stepX = R / 2;
    const stepY = R;
    const p1 = vec2(position.x.value, position.y.value - 2 * stepY);
    const p2 = vec2(p1.x + stepX, p1.y + stepY);
    const p3 = vec2(p2.x + stepX, p2.y + stepY);
    const p4 = vec2(p3.x - stepX, p3.y + stepY);
    const p5 = vec2(p4.x - stepX, p4.y + stepY);

    const d = ["M 0 0", `H ${position.x.value}`, `V ${HEIGHT}`, "H 0", "Z"];
    // const d = [
    //   "M 0 0",
    //   `H ${p1.x}`,
    //   `V ${p1.y}`,
    //   `L ${p2.x} ${p2.y}`,
    //   `L ${p3.x} ${p3.y}`,
    //   `L ${p4.x} ${p4.y}`,
    //   `L ${p5.x} ${p5.y}`,
    //   `V ${HEIGHT}`,
    //   "H 0",
    //   "Z",
    // ];
    return {
      d: d.join(" "),
    };
  });

  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={
        <Svg
          style={
            (StyleSheet.absoluteFill,
            {
              transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
            })
          }
        >
          <AnimatedPath animatedProps={animatedProps} fill={"black"} />
        </Svg>
      }
    >
      {children}
    </MaskedView>
  );
};

export default Wave;
