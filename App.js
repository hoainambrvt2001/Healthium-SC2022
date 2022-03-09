import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoScreen from "./screens/TodoScreen";
import SigninScreen from "./screens/SigninScreen";
import { Appbar, Provider } from "react-native-paper";
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();

const CustomNavigationBar = ({ navigation, back, route }) => {
  console.log(route);
  return (
    <Appbar>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action
        icon="logout-variant"
        onPress={() => {
          try {
            auth()
              .signOut()
              .then(() => console.log("User signed out!"));
          } catch (error) {
            console.log("Error to Sign Out");
          }
        }}
      />
    </Appbar>
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
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Sign In"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          {user ? (
            <Stack.Screen name="Home" component={TodoScreen} />
          ) : (
            <Stack.Screen name="Sign In" component={SigninScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
