import React from "react";
import { View, Text } from "react-native";
import { Title } from "react-native-paper";

const MedicalHistory = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: "#f5f7fd",
        paddingHorizontal: 20,
      }}
    >
      {[
        { title: "Medical history" },
        { title: "Surgery history" },
        { title: "Allergy history" },
      ].map((item, idx) => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
            key={idx}
          >
            <Title>{item.title}</Title>
            <Text style={{ color: "#00a19d", fontSize: 16 }}>Add new</Text>
          </View>
        );
      })}

      <View>
        <Title style={{ marginBottom: 5 }}>General Diagonise</Title>
        <View
          style={{
            borderColor: "#d9d9d9",
            borderWidth: 1,
            padding: 10,
            paddingHorizontal: 15,
            backgroundColor: "#f5f3ff",
            borderRadius: 5,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
        >
          <Text>
            Do ullamco ex velit anim do proident exercitation et anim tempor.
            Lorem sunt deserunt labore non excepteur venia
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MedicalHistory;
