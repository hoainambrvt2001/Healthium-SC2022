import React from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { Paragraph } from "react-native-paper";

const ServiceOption = ({ service, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (service.title === "Medical record") {
          navigation.navigate("MedicalRecord");
        } else {
          navigation.navigate("MedicalService");
        }
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image source={service.img} style={{ width: 25, height: 25 }} />
        </View>
        <View>
          <Paragraph>{service.title}</Paragraph>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceOption;
