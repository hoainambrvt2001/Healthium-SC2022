import React from "react";
import { View, Image } from "react-native";
import { Caption } from "react-native-paper";

const PopularService = ({ serviceName }) => {
  return (
    <View
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
      <Image source={require("../../assets/hospital-icon-v2.png")} />
      <Caption>{serviceName}</Caption>
    </View>
  );
};

PopularService.defaultProps = {
  serviceName: "Service",
};

export default PopularService;
