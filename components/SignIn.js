import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import md5 from "md5";

// Firebase:
// import auth from "@react-native-firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignIn = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, md5(password))
      .then(() => {
        console.log("User has signed in successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
          />
        }
      />
      <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
        <Text>Forgot Password?</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button
          mode="contained"
          style={{ padding: 2 }}
          labelStyle={{ fontSize: 16 }}
          onPress={handleSignIn}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default SignIn;
