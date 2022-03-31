import React, { useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";

const TimeRangeCard = ({ startTime, endTime, isChose, handlePress }) => {
  const background = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animated.parallel([
    Animated.timing(background, {
      duration: 300,
      toValue: isChose,
      useNativeDriver: false,
    }).start();
  }, [isChose]);

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress();
      }}
    >
      <Animated.View
        style={{
          // borderWidth: 1,
          padding: 3,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: background.interpolate({
            inputRange: [0, 1],
            outputRange: ["#C4C4C4", "#00a19d"],
          }),
        }}
      >
        <View
          style={{
            padding: 6,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 16,
            }}
          >
            {startTime} - {endTime}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TimeRangeCard;
