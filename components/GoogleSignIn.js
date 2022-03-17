import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Image, View } from "react-native";
import { Button } from "react-native-paper";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "455009546602-chjlga7kqak4bp469h8q1sgqmlbvp0aa.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
        icon={({ direction }) => (
          <Image
            source={require("assets/google-icon.png")}
            style={[
              {
                transform: [{ scaleX: direction === "rtl" ? -1 : 1 }],
              },
              {
                width: 22,
                height: 22,
              },
            ]}
          />
        )}
        mode="contained"
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          paddingVertical: 3,
          elevation: 2,
        }}
        labelStyle={{ color: "#000000" }}
      >
        Sign in with Google
      </Button>
    </View>
  );
};

export default GoogleSignIn;
