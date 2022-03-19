import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import AppointmentCard from "components/Utils/AppointmentCard";

const ThirdStep = ({ navigation }) => {
  return (
    <>
      <View style={{ paddingHorizontal: 15 }}>
        <Title>Booked appointment</Title>
      </View>
      <View>
        <AppointmentCard navigation={navigation} />
      </View>
      <View style={{ height: 105 }}></View>
    </>
  );
};

export default ThirdStep;
