import React from "react";
import NotificationLst from "../components/NotificationLst";
import { View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const NotificationScreen = ({ navigation }) => {
  return (
    // <View style={globalStyles.container}>
    <NotificationLst />
    // </View>
  );
};

export default NotificationScreen;
