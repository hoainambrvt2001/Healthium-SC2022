import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { getUserInfo } from "firebaseServices/firestoreApi";

const HomeNavigation = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getUserInfo(user.uid)
      .then((infos) => {
        setUsername(infos.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {username}
        </Headline>
      </View>
    </View>
  );
};

export default HomeNavigation;
