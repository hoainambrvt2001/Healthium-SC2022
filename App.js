import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, DefaultTheme } from "react-native-paper";

import NavigationBar from "./components/NavigationBar";
import MedicalServiceScreen from "./screens/MedicalServiceScreen";
import SignInScreen from "./screens/SignInScreen";
import StartScreen from "./screens/StartScreen";
import HomeScreen from "./screens/HomeScreen";
import SignOutScreen from "./screens/SignOutScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import HospitalDetailScreen from "./screens/HospitalDetailScreen";
import MedicalRecordScreen from "./screens/MedicalRecordScreen";
import ChatScreen from "./screens/ChatScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  colors: {
    ...DefaultTheme.colors,
    primary: "#00a19d",
    background: "#ffffff",
  },
};

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
        name="AppointmentScreen"
        component={AppointmentScreen}
        options={{
          tabBarLabel: "Appointment",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SignOutScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (init) setInit(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (init) return null;

  return (
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="HomeStack"
          screenOptions={{
            header: (props) => <NavigationBar {...props} />,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="HomeStack" component={HomeStackScreen} />
              <Stack.Screen
                name="MedicalService"
                component={MedicalServiceScreen}
              />
              <Stack.Screen
                name="HospitalDetail"
                component={HospitalDetailScreen}
              />
              <Stack.Screen
                name="MedicalRecord"
                component={MedicalRecordScreen}
              />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
