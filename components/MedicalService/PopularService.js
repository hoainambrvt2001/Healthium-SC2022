import React, { useRef, useEffect } from "react";
import { View, Image, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Caption, Button } from "react-native-paper";

const PopularService = ({ onPress, serviceName, isChose }) => {
  const transition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(transition, {
      duration: 300,
      toValue: isChose,
      useNativeDriver: false,
    }).start();
  }, [isChose]);
  // color
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={{
          backgroundColor: "#F8F8F9",
          borderWidth: 2,
          borderColor: transition.interpolate({
            inputRange: [0, 1],
            outputRange: ["#F8F8F9", "#3AD8D4"],
          }),
          width: 80,
          height: 80,
          padding: 3,
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: 10,
          marginHorizontal: 5,
        }}
      >
        {/* <Image source={require("assets/hospital-icon-v2.png")} /> */}
        <Icon name="hospital-box-outline" size={28} />
        <Caption style={{ textAlign: "center" }}>{serviceName}</Caption>
      </Animated.View>
    </TouchableOpacity>
  );
};

PopularService.defaultProps = {
  serviceName: "Service",
  onPress: () => {},
};

export default PopularService;
