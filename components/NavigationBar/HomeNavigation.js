import React from "react";
import { View, Image } from "react-native";
import { Headline, Subheading } from "react-native-paper";

const HomeNavigation = ({ userName }) => {
  return (
    <View
      style={{
        backgroundColor: "#00A19D",
        paddingBottom: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}
    >
      <View style={{ alignItems: "flex-end" }}>
        <Image
          source={require("assets/home-page-icon.png")}
          style={{ right: 40, top: 10 }}
        />
      </View>
      <View style={{ marginLeft: 25 }}>
        <Subheading style={{ color: "white" }}>Hello</Subheading>
      </View>
      <View style={{ marginLeft: 25 }}>
        <Headline style={{ color: "white", fontWeight: "700" }}>
          {userName}
        </Headline>
      </View>
    </View>
  );
};

export default HomeNavigation;
