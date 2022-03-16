import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import validator from "validator";
import md5 from "md5";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (
      validator.isEmail(email) &&
      validator.isStrongPassword(password, {
        minSymbols: 0,
      }) &&
      confirmPassword === password
    ) {
      auth()
        .createUserWithEmailAndPassword(email, md5(password))
        .then(() => {
          console.log("User has sign up successfully!");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
          }
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }
          console.log(error);
        });
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 15 }}>
        <TextInput
          label="Name"
          value={name}
          mode="outlined"
          onChangeText={(name) => setName(name)}
          left={<TextInput.Icon name="account" color="#00A2B6" />}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={(email) => setEmail(email)}
          left={<TextInput.Icon name="email" color="#00A2B6" />}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={(password) => setPassword(password)}
          left={<TextInput.Icon name="lock" color="#00A2B6" />}
        />
      </View>

      <View style={{ marginBottom: 40 }}>
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          mode="outlined"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
          left={<TextInput.Icon name="lock-check" color="#00A2B6" />}
        />
      </View>

      <Button
        mode="contained"
        labelStyle={{ fontSize: 16 }}
        style={{ padding: 2 }}
        onPress={handleSignUp}
      >
        Create
      </Button>
    </View>
  );
};

export default SignUp;
