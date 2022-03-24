import React from "react";
import { View } from "react-native";
import { Avatar, Title, Paragraph } from "react-native-paper";
import { avatar } from "styles/UserProfileStyles";

const UserAvatar = ({ name, mail }) => {
  return (
    <>
      <View style={avatar.container}>
        <View style={avatar.visualLayer}></View>
        <Avatar.Image
          source={require("assets/avatar.png")}
          size={150}
          style={avatar.avatar}
          backgroundColor={"#ffff"}
        />
      </View>
      <View style={{ ...avatar.container, marginTop: 8 }}>
        <Title>{name}</Title>
        <Paragraph style={{ color: "rgb(155,155,155)" }}>{mail}</Paragraph>
      </View>
    </>
  );
};

UserAvatar.defaultProps = {
  name: "Name",
  mail: "email@gmail.com",
};

export default UserAvatar;
