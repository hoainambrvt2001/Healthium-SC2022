import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, DefaultTheme } from "react-native-paper";
import { primaryColor, defaultBackgroundColor } from "./styles/globalStyles";

import NavigationBar from "./components/NavigationBar";
import StartScreen from "./screens/StartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

import MainScreenRoutes from "./screens/MainScreenRoutes";
import MedicalServiceScreen from "./screens/MedicalServiceScreen";
import HospitalDetailScreen from "./screens/HospitalDetailScreen";
import MedicalRecordScreen from "./screens/MedicalRecordScreen";
import ChatScreen from "./screens/ChatScreen";
import NotificationScreen from "screens/NotificationScreen";

// Firebase:
import "./firebaseServices/firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    background: defaultBackgroundColor,
  },
};

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (pending) setPending(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (pending) return null;

  return (
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="MainScreens"
          screenOptions={{
            header: (props) => <NavigationBar {...props} />,
          }}
        >
          {currentUser ? (
            <>
              <Stack.Screen name="MainScreens" component={MainScreenRoutes} />
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
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
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
