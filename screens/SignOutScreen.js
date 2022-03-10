import React from "react";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";

const SignOutScreen = () => {
  return (
    <Button
      onPress={() => {
        auth().signOut();
      }}
    >
      Loggout
    </Button>
  );
};

export default SignOutScreen;
