import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Button, Subheading, Snackbar } from "react-native-paper";
import UserAvatar from "components/UserProfileScreen/UserAvatar";
import Option from "components/UserProfileScreen/Option";
import { styles } from "styles/UserProfileStyles";

// Firebase:
import { getAuth, signOut } from "firebase/auth";
import { getUserInfo } from "firebaseServices/firestoreApi";

const auth = getAuth();

const general = [
  {
    name: "Profile settings",
    desc: "Update and modify your profile",
  },
  {
    name: "Privacy",
    desc: "Change your password",
  },
  {
    name: "Payments",
    desc: "Add your payment method",
  },
];

const support = [
  {
    name: "About us",
    desc: "Know more about our team and goal",
  },
];

const SignOutButton = () => {
  return (
    <Button
      onPress={() => {
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

const UserProfileScreen = ({ navigation, route }) => {
  const [visibleNotify, setVisibleNotify] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const user = auth.currentUser;

  const onDismissSnackBar = () => setVisibleNotify(false);

  useEffect(() => {
    if (route.params) setVisibleNotify(route.params?.resetPasswordStatus);
  }, [route.params]);

  useEffect(() => {
    const getUserInfomation = async () => {
      await getUserInfo(user.uid)
        .then((infos) => {
          setUserInfo(infos);
        })
        .catch((errors) => {
          console.log(errors);
        });
    };

    const unsubscribe = navigation.addListener("focus", () => {
      return getUserInfomation();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <UserAvatar userInfo={userInfo} />
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
        <Snackbar
          visible={visibleNotify}
          duration={10000}
          onDismiss={onDismissSnackBar}
          style={{
            height: 55,
            width: "95%",
            position: "absolute",
            left: 0,
            bottom: 30,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            Reset password email has been sent!
          </Text>
        </Snackbar>
      </View>
      <View style={styles.wrap}>
        <SignOutButton />
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;
