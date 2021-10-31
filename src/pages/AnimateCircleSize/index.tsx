import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

const SIZE = 100;

const CircleSize = 50;

export default function AnimateCircleSize() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const size = useSharedValue(CircleSize);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * SIZE,
      width: size.value,
      height: size.value,
      transform: [{ scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    progress.value = withTiming(0.5, { duration: 5000 });
    scale.value = withSpring(1);
  }, []);

  const handleGrowButton = useCallback(() => {
    size.value = withSpring(size.value * 1.5);
  }, []);

  const handleShrink = useCallback(() => {
    size.value = withSpring(size.value / 1.5);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "blue" },
          reanimatedStyle,
        ]}
      />
      <TouchableOpacity style={styles.growUpButton} onPress={handleGrowButton}>
        <Text style={styles.labelButton}>Grow up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.growUpButton, { backgroundColor: "rgb(256,150,0)" }]}
        onPress={handleShrink}
      >
        <Text style={styles.labelButton}>Grow down</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  growUpButton: {
    width: "60%",
    height: 40,
    backgroundColor: "rgba(0,150,256,1)",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    borderRadius: 8,
  },
  labelButton: {
    color: "#FFF",
  },
});
