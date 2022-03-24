import React from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { Paragraph } from "react-native-paper";
// import { CommonActions } from "@react-navigation/native";

const ServiceOption = ({ service, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (service.title === "Medical record") {
          navigation.navigate("MedicalRecord");
        } else if (service.title === "Treatment and Care") {
          navigation.navigate("TreatmentCare");
        } else {
          // navigation.dispatch(CommonActions.setParams({ testAnother: true }));
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
