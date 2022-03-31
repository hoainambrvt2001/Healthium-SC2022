import React from "react";
import { View, TextInput } from "react-native";
import { Title } from "react-native-paper";
import AppointmentCard from "components/Utils/AppointmentCard";

const ThirdStep = ({ navigation, appointmentInfo, setAppointmentInfo }) => {
  // const [changeText, setChangeText] = useState(appointmentInfo.note)

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
      <View style={{ paddingHorizontal: 15 }}>
        <Title>Any notes for doctor?</Title>
        <TextInput
          placeholder="Symptom note"
          style={{
            height: 40,
            marginTop: 12,
            borderWidth: 1,
            padding: 10,
          }}
          numberOfLines={3}
          onChangeText={(newText) =>
            setAppointmentInfo({ ...appointmentInfo, note: newText })
          }
          defaultValue={""}
          // value={text}
        />
      </View>
      <View style={{ height: 105 }}></View>
    </>
  );
};

export default ThirdStep;
