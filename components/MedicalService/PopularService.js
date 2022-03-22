import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Caption, Button } from "react-native-paper";

const PopularService = ({ onPress, serviceName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#F8F8F9",
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: 5,
      }}
    >
      <Image source={require("assets/hospital-icon-v2.png")} />
      <Caption>{serviceName}</Caption>
    </TouchableOpacity>
  );
};

PopularService.defaultProps = {
  serviceName: "Service",
  onPress: () => {},
};

export default PopularService;
