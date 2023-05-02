import React from "react";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";

import { products } from "./Model";
import Card, { CARD_HEIGHT } from "./Card";
import Products from "./Products";
import Cards from "./components/Cards";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from "react-native-reanimated";
// import { interpolatePath } from "react-native-redash";

const { width } = Dimensions.get("window");
const snapToOffsets = [0, CARD_HEIGHT];
const styles = StyleSheet.create({
  slider: { height: CARD_HEIGHT },
});

const PhilzCoffee = () => {
  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
    },
  });
  const style = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: interpolateColor(
      translateX.value,
      products.map((_, i) => width * i),
      products.map((prod) => prod.color2)
    ),
  }));

  return (
    <Animated.View style={style}>
      <ScrollView
        snapToOffsets={snapToOffsets}
        bounces={false}
        decelerationRate={"fast"}
        showsVerticalScrollIndicator={false}
        snapToEnd={false}
      >
        <View style={styles.slider}>
          <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            horizontal
            snapToInterval={width}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
          >
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </Animated.ScrollView>
          <Products x={translateX} />
        </View>
        <Cards />
      </ScrollView>
    </Animated.View>
  );
};

export default PhilzCoffee;
