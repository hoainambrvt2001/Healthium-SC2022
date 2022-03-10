import React from "react";
import { View, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Headline, Button } from "react-native-paper";
import GoogleSignIn from "../components/GoogleSignIn";

const SigninScreen = () => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Image
          source={require("../assets/AppLogo.png")}
          style={{ right: 130, bottom: 50, height: 100, width: 100 }}
        />
        <Headline style={globalStyles.headerFont}> Welcome To UCare</Headline>
        <Button mode="text" onPress={() => auth().signOut()}></Button>
      </View>
      <View style={globalStyles.container}>
        <GoogleSignIn />
      </View>
    </View>
  );
};

export default SigninScreen;
