import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Paragraph, Title, Button } from "react-native-paper";
import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import MyMapView from "components/Map/MyMapView";
import { getCurFacility } from "firebaseServices/firestoreApi";

const HospitalDetailScreen = ({
  navigation,
  route: {
    params: { hospitalId },
  },
}) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    await getCurFacility(setItem, hospitalId);
    setLoading(false);
  }, []);

  // console.log("item");
  // console.log(item);

  if (loading)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 16 }}>
      <View
        style={{
          alignItems: "center",
          minHeight: 230,
        }}
      >
        <Image
          source={{ uri: item.hospitalPhoto }}
          style={{ width: "100%", height: 160, position: "absolute", top: 0 }}
        />
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 40,
            paddingBottom: 20,
            width: "100%",
          }}
        >
          <InfoHospitalCard
            hospitalAddress={item.hospitalAddress}
            hospitalName={item.hospitalName}
            hospitalContact={item.hospitalHotline}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Title>Overview</Title>
        <Paragraph>{item.hospitalDescription}</Paragraph>
        <Title>Location</Title>
        <Paragraph>{item.hospitalAddress}</Paragraph>
        <Title>Map</Title>

        <MyMapView
          hospitalId={hospitalId}
          hospitalName={item.hospitalName}
          userRating={item.userRating}
          lat={item.lat}
          lng={item.lng}
          hospitalPhoto={item.hospitalPhoto}
        />
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

// HospitalDetailScreen.defaultProps = {
//   route: {
//     params: {
//       place_id: "ChIJ09_Ur8QudTER54hAhHDo7Pw",
//       photoUrl: undefined,
//       // place Id of Trung vuong hospital
//     },
//   },
//   hospitalBackground: require("assets/background-img.png"),
// };

export default HospitalDetailScreen;
