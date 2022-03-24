import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Paragraph, Title, Button } from "react-native-paper";
import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import MyMapView from "components/Map/MyMapView";
import { getInfo } from "firebaseServices/firestoreAPI";

const HospitalDetailScreen = ({
  navigation,
  route: {
    params: { place_id, photoUrl },
  },
  hospitalBackground,
}) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfo(place_id, setInfo, setLoading);
  }, []);

  // console.log("info");
  // console.log(info);
  console.log("photo url");
  console.log(photoUrl);

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 16 }}>
      <View
        style={{
          alignItems: "center",
          minHeight: 230,
        }}
      >
        <Image
          source={photoUrl ? { uri: photoUrl } : hospitalBackground}
          style={{ width: "100%", height: 160 }}
        />
        <View style={{ position: "absolute", top: 80 }}>
          <InfoHospitalCard
            hospitalAddress={info.formatted_address}
            hospitalName={info.name}
            hospitalContact={
              info.formatted_phone_number || info.international_phone_number
            }
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
        <Paragraph>{info.formatted_address}</Paragraph>
        <Title>Map</Title>
        {loading ? (
          <Text>loading</Text>
        ) : (
          <MyMapView
            place_id={place_id}
            name={info.name}
            rating={info.rating}
            geometry={info.geometry}
            photoUrl={photoUrl}
          />
        )}
      </View>
      <View>
        <Button
          style={{
            backgroundColor: "#00a19d",
            marginTop: 50,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("Booking")}
        >
          <Title style={{ color: "white" }}>Book appointment</Title>
        </Button>
      </View>
    </ScrollView>
  );
};

HospitalDetailScreen.defaultProps = {
  route: {
    params: {
      place_id: "ChIJ09_Ur8QudTER54hAhHDo7Pw",
      photoUrl: undefined,
      // place Id of Trung vuong hospital
    },
  },
  hospitalBackground: require("assets/background-img.png"),
};

export default HospitalDetailScreen;
