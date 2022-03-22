import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

// Firebase:
// import auth from "@react-native-firebase/auth";
import { getAuth, signOut } from "firebase/auth";

const signOutButton = () => {
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

const UserProfileScreen = () => {
  return <View></View>;
};

export default UserProfileScreen;
