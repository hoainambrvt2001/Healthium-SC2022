import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Caption } from "react-native-paper";

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
    <TouchableWithoutFeedback
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
          // borderWidth: 1,
          borderRadius: 10,
          padding: 4,
          marginBottom: 12,
          // borderColor: transition.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: ["#B5B5B5", "#00a19d"],
          // }),
          backgroundColor: transition.interpolate({
            inputRange: [0, 1],
            outputRange: ["#B5B5B5", "#00a19d"],
          }),
        }}
      >
        <View
          style={{
            flex: 1,

            padding: 8,
            borderRadius: 8,

            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Caption
            style={{
              fontSize: 16,
              width: 150,
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {serviceName}
          </Caption>
          <Caption
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              lineHeight: 20,
            }}
          >
            {servicePrice}
          </Caption>
          {/* <IconButton icon="hospital-box-outline" size={25} /> */}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceCard;
