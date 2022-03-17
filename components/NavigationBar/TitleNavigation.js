import React from "react";
import { Appbar } from "react-native-paper";

const TitleNavigation = ({ navigation, mainRoute, route, back }) => {
  let routeTitle;
  if (mainRoute === "AppointmentScreen") {
    routeTitle = "Manage Appointment";
  } else if (mainRoute === "SettingsScreen") {
    routeTitle = "Settings";
  } else if (route.name === "MedicalService") {
    routeTitle = "Medical Service";
  } else if (route.name === "HospitalDetail") {
    routeTitle = "Hospital Detail";
  } else if (route.name === "MedicalRecord") {
    routeTitle = "Medical Record";
  }
  return (
    <Appbar>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={routeTitle} />
    </Appbar>
  );
};

export default TitleNavigation;
