import React from "react";
import { View, Text, Image } from "react-native";
import { Paragraph, Title } from "react-native-paper";

const HospitalCard = () => {
  return (
    <View
      style={{
        alignItems: "center",
        minHeight: 230,
      }}
    >
      <Image
        source={require("../assets/background-img.png")}
        style={{ width: "100%" }}
      />
      <View
        style={{
          position: "absolute",
          top: 80,
          alignItems: "center",
          backgroundColor: "white",
          padding: 20,
          elevation: 5,
          marginHorizontal: 30,
          borderRadius: 10,
          zIndex: 2,
        }}
      >
        <Text style={{ marginBottom: 3 }}>Hospital</Text>
        <Text
          style={{
            fontSize: 20,
            color: "#00a19d",
            fontWeight: "bold",
            marginBottom: 3,
          }}
        >
          Truong Vuong Hospital
        </Text>
        <Text style={{ marginBottom: 3 }}>
          235 Nguyen Van Cu Phuong 12341234
        </Text>
        <Text>Call: 09123123</Text>
      </View>
    </View>
  );
};

const HospitalDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <HospitalCard />
      <View style={{ paddingHorizontal: 20 }}>
        <Title>Overview</Title>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Paragraph>
        <Title>Location</Title>
        <Paragraph>235 Nguyen Van Cu, District 5, HCMC</Paragraph>
        <Title>Map</Title>
        <View>
          <Text>Integrated Map Here</Text>
        </View>
      </View>
    </View>
  );
};

export default HospitalDetailScreen;
