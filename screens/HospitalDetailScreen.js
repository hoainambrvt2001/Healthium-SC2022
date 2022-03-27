import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Paragraph, Title, Button } from "react-native-paper";
import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import MyMapView from "components/Map/MyMapView";
import { getCurFacility } from "firebaseServices/firestoreApi";

const HospitalDetailScreen = ({
  navigation,
  route: {
    params: {
      hospitalId,
      hospitalName,
      hospitalAddress,
      hospitalPhoto,
      hospitalHotline,
      hospitalDescription,
      lat,
      lng,
      userRating,
    },
  },
}) => {
  // const [item, setItem] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(async () => {
  //   setLoading(true);
  //   await getCurFacility(setItem, hospitalId);
  //   setLoading(false);
  // }, []);

  // console.log("item");
  // console.log(item);

  // if (loading)
  //   return (
  //     <View>
  //       <Text>loading</Text>
  //     </View>
  //   );

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 16 }}>
      <View
        style={{
          alignItems: "center",
          minHeight: 230,
        }}
      >
        <Image
          source={{ uri: hospitalPhoto }}
          style={{ width: "100%", height: 160, position: "absolute", top: 0 }}
        />
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 100,
            paddingBottom: 20,
            width: "100%",
            borderColor: "#C4C4C4",
            borderWidth: 3,
          }}
        >
          <InfoHospitalCard
            hospitalAddress={hospitalAddress}
            hospitalName={hospitalName}
            hospitalContact={hospitalHotline}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Title>Overview</Title>
        <Paragraph>{hospitalDescription}</Paragraph>
        <Title>Location</Title>
        <Paragraph>{hospitalAddress}</Paragraph>
        <Title>Map</Title>

        <MyMapView
          hospitalId={hospitalId}
          hospitalName={hospitalName}
          userRating={userRating}
          lat={lat}
          lng={lng}
          hospitalPhoto={hospitalPhoto}
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
          onPress={() =>
            navigation.navigate("Booking", {
              hospitalId: hospitalId,
              hospitalName: hospitalName,
              hospitalHotline: hospitalHotline,
              hospitalAddress: hospitalAddress,
            })
          }
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
