import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { Appbar, Searchbar, Title } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

const SearchNavigation = ({ navigation, route, back }) => {
  // console.log("params nav");
  // console.log(route);

  const [search, setSearch] = useState("");

  useEffect(() => {
    // console.log(search);
    navigation.dispatch(CommonActions.setParams({ searchText: search }));
  }, [search]);

  // console.log(search);

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
        <Searchbar
          style={{ flex: 1 }}
          placeholder={"Search for hospitals"}
          value={search}
          onChangeText={(query) => setSearch(query)}
          // onSubmitEditing={(e) => {
          //   navigation.dispatch(CommonActions.setParams({ search: search }));
          // }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Title style={{ color: "white" }}>Medical Services</Title>
      </View>
    </View>
  );
};

export default SearchNavigation;
