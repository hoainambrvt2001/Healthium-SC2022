import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Caption, Button } from "react-native-paper";

const PopularService = ({ onPress, serviceName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#F8F8F9",
        width: 80,
        // height: 70,
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
    </TouchableOpacity>
  );
};

PopularService.defaultProps = {
  serviceName: "Service",
  onPress: () => {},
};

export default PopularService;
