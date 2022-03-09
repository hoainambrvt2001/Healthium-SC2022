import React from "react";
import GoogleSignIn from "../components/GoogleSignIn";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const SigninScreen = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <GoogleSignIn navigation={navigation} />
      <Button mode="text" onPress={() => navigation.navigate("Home")}>
        Navigate to Home
      </Button>
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
