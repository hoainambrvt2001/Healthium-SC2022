import React from "react";
import { View, Text } from "react-native";
import ChatSection from "components/ChatSection";

const ChatScreen = ({ navigation, route: { params } }) => {
  return (
    // <View>
    <ChatSection {...params} />
    // </View>
  );
};

export default ChatScreen;
