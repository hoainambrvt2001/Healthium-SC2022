import React from "react";
import { View, Text } from "react-native";
import { IconButton, Title } from "react-native-paper";

const HealthCard = ({ iconName, typeName, typeUnit, value, measureTime }) => {
  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: "#ffffff",
        height: 160,
        width: 175,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton icon={iconName} size={30} color={"#00a19d"} />
        <View>
          <Text style={{ color: "#00a19d", fontSize: 16 }}>{value}</Text>
          <Text style={{ color: "#00a19d", fontSize: 16 }}>{typeUnit}</Text>
        </View>
      </View>
      <Title>{typeName}</Title>
      {value ? (
        <>
          <Text style={{ color: "#787a7e" }}>Measure at </Text>
          <Text style={{ color: "#787a7e" }}>{measureTime}</Text>
        </>
      ) : null}
    </View>
  );
};

export default HealthCard;
