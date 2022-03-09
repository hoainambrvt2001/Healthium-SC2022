import React, { useState, useEffect } from "react";
import { Provider } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import SigninScreen from "./screens/SigninScreen";

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
      <SigninScreen />
    </Provider>
  );
};

export default App;
