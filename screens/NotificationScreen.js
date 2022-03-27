import React from "react";
import NotificationLst from "../components/NotificationLst";
import Noti from "../components/Notification_list_udpate/Noti";
import { View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const NotificationScreen = ({ navigation }) => {
  return (
    // <View style={globalStyles.container}>
    <Noti />

    // </View>
  );
};

export default NotificationScreen;
