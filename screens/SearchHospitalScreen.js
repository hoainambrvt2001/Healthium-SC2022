import React from "react";
import { View, Image, FlatList, Text } from "react-native";
import { Caption, Paragraph, Title } from "react-native-paper";

export const SearchHospitalScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ marginLeft: 10, marginBottom: 10 }}>
        Filter hospital
      </Title>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginBottom: 10,
        }}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return (
              <View
                style={{
                  backgroundColor: "#F8F8F9",
                  width: 70,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}
              >
                <Image source={require("../assets/hospital-icon-v2.png")} />
                <Caption>Name</Caption>
              </View>
            );
          }}
        />
      </View>
      <Title style={{ marginLeft: 10, marginBottom: 10 }}>Injury type</Title>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 18,
          marginBottom: 20,
        }}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return (
              <View
                style={{
                  backgroundColor: "#F8F8F9",
                  minWidth: 80,
                  padding: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  borderWidth: 1,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ fontWeight: "700" }}>Catego</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#F8F8F9",
                  borderRadius: 10,
                  elevation: 5,
                  padding: 10,
                  margin: 10,
                }}
              >
                <Image
                  source={require("../assets/trung-vuong-hospital.png")}
                  style={{ width: 100, height: 100 }}
                  borderRadius={3}
                />
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Title>Trung Vuong Hospital</Title>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Caption style={{ fontSize: 13 }}>Speciality: </Caption>
                    <Paragraph>Da khoa</Paragraph>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Caption style={{ fontSize: 13 }}>
                      From your location:{" "}
                    </Caption>
                    <Paragraph>12km</Paragraph>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Caption style={{ fontSize: 13 }}>Status: </Caption>
                    <Paragraph>Available</Paragraph>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
