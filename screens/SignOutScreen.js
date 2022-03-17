import React from "react";
import { Button } from "react-native-paper";

// Firebase:
// import auth from "@react-native-firebase/auth";
import { getAuth, signOut } from "firebase/auth";

const SignOutScreen = () => {
  return (
    <Button
      onPress={() => {
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log("User has signed-out successful!");
        });
      }}
    >
      Loggout
    </Button>
  );
};

export default SignOutScreen;
