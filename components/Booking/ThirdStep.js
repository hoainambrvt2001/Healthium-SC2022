import React from "react";
import { View, TextInput } from "react-native";
import { Title } from "react-native-paper";
import AppointmentCard from "components/Utils/AppointmentCard";

const ThirdStep = ({ navigation, appointmentInfo }) => {
  const props = {
    doctorName: appointmentInfo.doctorName,
    doctorSpeciality: appointmentInfo.doctorSpeciality,
    appointmentTime: appointmentInfo.time,
    appointmentPlace: appointmentInfo.hospitalName,
    navigation: navigation,
  };
  return (
    <>
      <View style={{ paddingHorizontal: 15 }}>
        <Title>Booked appointment</Title>
      </View>
      <View>
        <AppointmentCard {...props} />
      </View>
      <TextInput
        placeholder="Symptom note"
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        // onChangeText={onChangeText}
        // value={text}
      />
      <View style={{ height: 105 }}></View>
    </>
  );
};

export default ThirdStep;
