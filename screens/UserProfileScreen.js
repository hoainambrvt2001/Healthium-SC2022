import React from "react";
import { View, ScrollView, Text } from "react-native";
import { Button, Subheading } from "react-native-paper";
import UserAvatar from "components/UserProfileScreen/UserAvatar";
import Option from "components/UserProfileScreen/Option";
import { styles } from "styles/UserProfileStyles";

// Firebase:
import { getAuth, signOut } from "firebase/auth";

const SignOutButton = () => {
  return (
    <Button
      onPress={() => {
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log("User has signed-out successful!");
        });
      }}
      style={styles.logout}
    >
      <Text
        style={{
          color: "#29272e",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: 18,
        }}
      >
        Log out
      </Text>
    </Button>
  );
};

const UserProfileScreen = ({ navigation }) => {
  const general = [
    {
      name: "Profile settings",
      desc: "Update and modify your profile",
    },
    {
      name: "Privacy",
      desc: "Change your password",
    },
  ];

  const support = [
    {
      name: "About us",
      desc: "Know more about our team and goal",
    },
  ];

  const system = [
    {
      name: "Log out",
      desc: "",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <UserAvatar />
      <View style={styles.wrap}>
        <Subheading style={styles.subtitle}>General</Subheading>
        <View
          style={{
            borderRadius: 8,
          }}
        >
          {general.map((value, idx) => {
            const border = {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            };
            if (idx === 0) {
              border.borderTopLeftRadius = 8;
              border.borderTopRightRadius = 8;
            }
            if (idx === general.length - 1) {
              border.borderBottomLeftRadius = 8;
              border.borderBottomRightRadius = 8;
            }
            return (
              <Option
                key={idx}
                {...value}
                navigation={navigation}
                border={border}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.wrap}>
        <Subheading style={styles.subtitle}>Support</Subheading>
        <View
          style={{
            borderRadius: 8,
          }}
        >
          {support.map((value, idx) => {
            const border = {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            };
            if (idx === 0) {
              border.borderTopLeftRadius = 8;
              border.borderTopRightRadius = 8;
            }
            if (idx === support.length - 1) {
              border.borderBottomLeftRadius = 8;
              border.borderBottomRightRadius = 8;
            }
            return (
              <Option
                key={idx}
                {...value}
                navigation={navigation}
                border={border}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.wrap}>
        <SignOutButton />
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;
