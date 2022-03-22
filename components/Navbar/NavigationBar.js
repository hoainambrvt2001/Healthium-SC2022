import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "styles/globalStyles";
import HomeNavigation from "../NavigationBar/HomeNavigation";
import SearchNavigation from "../NavigationBar/SearchNavigation";
import TitleNavigation from "../NavigationBar/TitleNavigation";

const NavigationBar = ({ navigation, route, back }) => {
  const mainRoute = getFocusedRouteNameFromRoute(route);
  let navBar;
  // console.log("here");
  // console.log(route);

  if (
    (route.name === "MainScreens" && !mainRoute) ||
    mainRoute === "HomeScreen"
  ) {
    navBar = <HomeNavigation userName={"Nam Vo"} />;
  } else if (route.name === "MedicalService") {
    // console.log("in if");
    // console.log(route);
    navBar = (
      <SearchNavigation navigation={navigation} route={route} back={back} />
    );
  } else {
    navBar = (
      <TitleNavigation
        navigation={navigation}
        mainRoute={mainRoute}
        route={route}
        back={back}
      />
    );
  }

  return <SafeAreaView style={globalStyles.safeArea}>{navBar}</SafeAreaView>;
};

export default NavigationBar;
