import React from "react";
import { View } from "react-native";
import { Avatar, Title, Paragraph } from "react-native-paper";
import { avatar } from "styles/UserProfileStyles";

const UserAvatar = ({ userInfo }) => {
  return (
    <>
      <View style={avatar.container}>
        <View style={avatar.visualLayer}></View>
        <Avatar.Image
          source={
            userInfo.avatar
              ? { uri: userInfo.avatar }
              : require("assets/avatar.png")
          }
          size={150}
          style={avatar.avatar}
          backgroundColor={"#ffff"}
        />
      </View>
      <View style={{ ...avatar.container, marginTop: 8 }}>
        <Title>{userInfo.name || "Name"}</Title>
        <Paragraph style={{ color: "rgb(155,155,155)" }}>
          {userInfo.email || "email@gmail.com"}
        </Paragraph>
      </View>
    </>
  );
};

export default UserAvatar;
