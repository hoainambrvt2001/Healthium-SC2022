import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { View, Image } from "react-native";
import {
  Headline,
  Subheading,
  Appbar,
  Searchbar,
  Title,
} from "react-native-paper";

const NavigationBar = ({ navigation, route, back }) => {
  const mainRoute = getFocusedRouteNameFromRoute(route);

  if (route.name === "SearchHospital") {
    return (
      <View style={{ backgroundColor: "#00A19D", paddingBottom: 10 }}>
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
          <Title style={{ color: "white" }}>Medical Services</Title>
        </View>
      </View>
    );
  }

  if (mainRoute === "AppointmentScreen" || mainRoute === "SettingsScreen") {
    return (
      <Appbar>
        <Appbar.Content title={mainRoute} />
      </Appbar>
    );
  }

  return !back ? (
    <View
      style={{
        backgroundColor: "#00A19D",
        paddingBottom: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      }}
    >
      <View style={{ alignItems: "flex-end" }}>
        <Image
          source={require("../assets/home-page-icon.png")}
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

export default NavigationBar;
