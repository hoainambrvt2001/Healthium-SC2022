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
        } else if (service.title === "Appointment") {
          navigation.navigate("AppointmentScreen");
        } else {
          navigation.navigate("MedicalService");
        }
      }}
    >
      <View
        style={{
          flex: service.title === "Appointment" ? 1.3 : 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image
            source={service.img}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Paragraph>{service.title}</Paragraph>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceOption;
