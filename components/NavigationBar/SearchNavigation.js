import React from "react";
import { View } from "react-native";
import { Appbar, Searchbar, Title } from "react-native-paper";

const SearchNavigation = ({ navigation, back }) => {
  return (
    <View style={{ backgroundColor: "#00A19D", paddingBottom: 10 }}>
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
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
};

export default SearchNavigation;
