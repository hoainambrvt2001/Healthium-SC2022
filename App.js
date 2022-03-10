import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import SigninScreen from "./screens/SigninScreen";
import StartScreen from "./screens/StartScreen";
import HomeScreen from "./screens/HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import {
  Provider,
  Headline,
  Subheading,
  Appbar,
  Searchbar,
  Title,
} from "react-native-paper";
import SignOutScreen from "./screens/SignOutScreen";
import { SearchHospitalScreen } from "./screens/SearchHospitalScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const CustomNavigationBar = ({ navigation, route, back }) => {
  if (route.name === "StartScreen" || route.name === "SignIn") {
    return null;
  }
  if (route.name === "SearchHospital") {
    return (
      <View style={{ backgroundColor: "#0088CC", paddingBottom: 10 }}>
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          {back ? (
            <Appbar.BackAction
              onPress={navigation.goBack}
              color={"white"}
              size={25}
              style={{ marginLeft: -10 }}
            />
          ) : null}
          <Searchbar style={{ flex: 1 }} placeholder={"Search for hospitals"} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Title style={{ color: "white" }}>Hospital & services</Title>
        </View>
      </View>
    );
  }

  return !back ? (
    <View
      style={{
        backgroundColor: "#0088CC",
        paddingBottom: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}
    >
      <View style={{ alignItems: "flex-end" }}>
        <Image
          source={require("./assets/home-page-icon.png")}
          style={{ right: 40, top: 10 }}
        />
      </View>
      <View style={{ marginLeft: 25 }}>
        <Subheading style={{ color: "white" }}>Hello</Subheading>
      </View>
      <View style={{ marginLeft: 25 }}>
        <Headline style={{ color: "white", fontWeight: "700" }}>
          Nam Vo
        </Headline>
      </View>
    </View>
  ) : (
    <Appbar>
      <Appbar.BackAction onPress={navigation.goBack} />
      <Appbar.Content title={route.name} />
    </Appbar>
  );
};

const App = () => {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log(user);
    if (init) setInit(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (init) return null;

  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeStack"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="HomeStack" component={HomeStackScreen} />
              <Stack.Screen
                name="SearchHospital"
                component={SearchHospitalScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="SignIn" component={SigninScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
