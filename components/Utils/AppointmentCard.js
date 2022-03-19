import React from "react";
import { View, Text } from "react-native";
import { Avatar, Divider, Paragraph, Title, Button } from "react-native-paper";

const AppointmentCard = ({
  doctorName,
  doctorSpeciality,
  appointmentDate,
  appointmentTime,
  appointmentPlace,
  navigation,
  contactInfo,
}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        margin: 15,
        backgroundColor: "#f7f7f8",
        paddingBottom: 15,
        elevation: 4,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View>
          <Title
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 0,
            }}
          >
            {doctorName}
          </Title>
          <Paragraph style={{ marginTop: 0 }}>{doctorSpeciality}</Paragraph>
        </View>
        <View>
          <Avatar.Image
            source={require("assets/doctor-avatar.png")}
            style={{ backgroundColor: "#003145" }}
            size={50}
          />
        </View>
      </View>
      <Divider
        style={{
          backgroundColor: "#003145",
          height: 1,
          marginHorizontal: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 10,
        }}
      >
        <Button icon="calendar" color="#00A2B6">
          <Text style={{ color: "black", textTransform: "none" }}>
            {appointmentDate}
          </Text>
        </Button>
        <Button icon="clock-outline" color="#00A2B6">
          <Text style={{ color: "black", textTransform: "none" }}>
            {appointmentTime}
          </Text>
        </Button>
        <Button icon="map-marker-outline" color="#00A2B6">
          <Text style={{ color: "black", textTransform: "none" }}>
            {appointmentPlace}
          </Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {contactInfo ? (
          <Button
            mode="contained"
            color="#54A9D3"
            labelStyle={{ color: "white", textTransform: "none" }}
            style={{ borderRadius: 50, width: 100 }}
            onPress={() => {
              navigation.navigate("Chat");
            }}
          >
            Contact
          </Button>
        ) : null}
        <Button
          mode="contained"
          color="#54A9D3"
          labelStyle={{ color: "white", textTransform: "none" }}
          style={{ borderRadius: 50, width: contactInfo ? 130 : 150 }}
        >
          Join meet
        </Button>
        <Button
          mode="contained"
          color="#BEBDC5"
          labelStyle={{ color: "white", textTransform: "none" }}
          style={{ borderRadius: 50, width: contactInfo ? 100 : 150 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

AppointmentCard.defaultProps = {
  doctorName: "Dr.Khoa Tran",
  doctorSpeciality: "Dentist Specialist",
  appointmentDate: "March 10th 2022",
  appointmentTime: "9:00 - 11:00 AM",
  appointmentPlace: "Trung Vuong Hospital",
};

export default AppointmentCard;
