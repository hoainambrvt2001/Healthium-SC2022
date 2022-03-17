import React from "react";
import { View, Image, Text } from "react-native";
import SignIn from "components/SignIn";
import { Button } from "react-native-paper";

const SignInScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("assets/AppLogo.png")}
          style={{ right: 130, bottom: 50, height: 100, width: 100 }}
        />
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 6 }}>
          Welcome back!
        </Text>
        <Text style={{ color: "#909090" }}>
          Log in to your existant account of UCare
        </Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <SignIn />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, marginRight: -10 }}>
          Don't have an account?
        </Text>
        <Button
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          labelStyle={{ fontWeight: "bold" }}
        >
          Sign up
        </Button>
      </View>
    </View>
  );
};

export default SignInScreen;
