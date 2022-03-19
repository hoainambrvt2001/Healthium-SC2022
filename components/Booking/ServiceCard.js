import React from "react";
import { View } from "react-native";
import { Caption, IconButton } from "react-native-paper";

const ServiceCard = ({ serviceName, servicePrice }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#B5B5B5",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
      }}
    >
      <Caption style={{ fontSize: 16, width: 150 }}>{serviceName}</Caption>
      <Caption style={{ fontSize: 16 }}>{servicePrice}</Caption>
      <IconButton icon="hospital-box-outline" size={25} />
    </View>
  );
};

export default ServiceCard;
