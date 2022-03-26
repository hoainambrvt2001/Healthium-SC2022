import React, { useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";

const TimeRangeCard = ({ startTime, endTime, isChose, handlePress }) => {
  const border = useRef(new Animated.Value(0)).current;
  const background = useRef(new Animated.Value(0)).current;
  const color = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(border, {
        duration: 300,
        toValue: isChose,
        useNativeDriver: false,
      }),
      Animated.timing(background, {
        duration: 300,
        toValue: isChose,
        useNativeDriver: false,
      }),
      Animated.timing(color, {
        duration: 300,
        toValue: isChose,
        useNativeDriver: false,
      }),
    ]).start(() => {});
  }, [isChose]);

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress();
      }}
    >
      <Animated.View
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 5,
          marginHorizontal: 8,
          borderColor: border.interpolate({
            inputRange: [0, 1],
            outputRange: ["#00a19d", "#fff"],
          }),
          backgroundColor: background.interpolate({
            inputRange: [0, 1],
            outputRange: ["#fff", "#00a19d"],
          }),
        }}
      >
        <Animated.Text
          style={{
            color: color.interpolate({
              inputRange: [0, 1],
              outputRange: ["#000", "#fff"],
            }),
            fontSize: 16,
          }}
        >
          {startTime} - {endTime}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TimeRangeCard;
