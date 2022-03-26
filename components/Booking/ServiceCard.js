import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Caption, IconButton } from "react-native-paper";

const ServiceCard = ({ serviceName, servicePrice, handlePress, isChose }) => {
  const transition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(transition, {
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
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
          marginBottom: 10,
          borderColor: transition.interpolate({
            inputRange: [0, 1],
            outputRange: ["#B5B5B5", "#00a19d"],
          }),
        }}
      >
        <Caption
          style={{ fontSize: 16, width: 150, textTransform: "capitalize" }}
        >
          {serviceName}
        </Caption>
        <Caption style={{ fontSize: 16, textTransform: "capitalize" }}>
          {servicePrice}
        </Caption>
        <IconButton icon="hospital-box-outline" size={25} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
