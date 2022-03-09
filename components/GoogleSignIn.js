import React from "react";
import { Button } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "384455020533-sai940m1k4rtbqg5q9hlntfk39fe4ud8.apps.googleusercontent.com",
});

const GoogleSignIn = () => {
  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log("Signed in with Google!"))
      }
    />
  );
};

export default GoogleSignIn;
