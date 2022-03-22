import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

const TitleNavigation = ({ navigation, mainRoute, route, back }) => {
  let routeTitle;
  if (mainRoute === "AppointmentScreen") {
    routeTitle = "Appointments";
  } else if (mainRoute === "UserProfileScreen") {
    routeTitle = "Profile";
  } else if (route.name === "MedicalService") {
    routeTitle = "Medical Service";
  } else if (route.name === "HospitalDetail") {
    routeTitle = "Hospital Detail";
  } else if (route.name === "MedicalRecord") {
    routeTitle = "Medical Record";
  } else if (route.name === "CreatePatient") {
    routeTitle = "Patient Information";
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      {back ? (
        <IconButton
          icon="arrow-left"
          onPress={navigation.goBack}
          color="#ffffff"
          style={{ position: "absolute", left: 0 }}
        />
      ) : null}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: "#ffffff",
        }}
      >
        {routeTitle}
      </Text>
    </View>
  );
};

export default TitleNavigation;