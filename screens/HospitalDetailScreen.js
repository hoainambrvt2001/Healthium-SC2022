import React from "react";
import { View, Text, Image } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import MyMapView from "components/Map/MyMapView";

const HospitalDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          minHeight: 230,
        }}
      >
        <Image
          source={require("assets/background-img.png")}
          style={{ width: "100%" }}
        />
        <View style={{ position: "absolute", top: 80 }}>
          <InfoHospitalCard
            hospitalAddress={"Ho Chi Minh city, Vietnam"}
            hospitalName={"Truong Vuong"}
            hospitalContact={"09123123"}
          />
        </View>
      </View>
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
        <MyMapView />
      </View>
    </View>
  );
};

export default HospitalDetailScreen;
