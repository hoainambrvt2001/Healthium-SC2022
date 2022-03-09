import React from "react";
import GoogleSignIn from "../components/GoogleSignIn";
import { View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <GoogleSignIn navigation={navigation} />
    </View>
  );
};

export default SigninScreen;
