import React from "react";
import GoogleSignIn from "../components/GoogleSignIn";
import { StyleSheet, View } from "react-native";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <GoogleSignIn navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SigninScreen;
