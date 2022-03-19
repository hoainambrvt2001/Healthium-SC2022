import React from "react";
import { View, Text } from "react-native";
import { Title, Avatar } from "react-native-paper";

const DoctorCard = ({ doctorAvatar, doctorName, doctorSpeciality }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        borderColor: "#B5B5B5",
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000000",
        maxWidth: 300,
      }}
    >
      <Avatar.Image
        size={60}
        source={doctorAvatar}
        style={{ marginRight: 10 }}
      />

      <View>
        <Title>{doctorName}</Title>
        <Text>Speciality: {doctorSpeciality}</Text>
      </View>
    </View>
  );
};

export default DoctorCard;
