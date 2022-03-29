import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Paragraph, Title, Button } from "react-native-paper";
import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import MyMapView from "components/Map/MyMapView";
// import { getCurFacility } from "firebaseServices/firestoreApi";
import Icon from "react-native-vector-icons/AntDesign";

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
      carefulConsultRating,
      facilityRating,
      fastMedicalExamineProcessRating,
      patientCareRating,
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

  const [showMore, setShowMore] = useState(false);

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

      <View>
        <Button
          style={{
            backgroundColor: "#00a19d",
            marginTop: 20,
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

      <View style={{ paddingHorizontal: 20 }}>
        <Title>Overview</Title>
        <Paragraph numberOfLines={!showMore ? 3 : null}>
          {hospitalDescription}
        </Paragraph>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text
            style={{ color: "rgb(3,122,255)", textDecorationLine: "underline" }}
          >
            {!showMore ? "Show more" : "Show less"}
          </Text>
        </TouchableOpacity>
        <Title>Location</Title>
        <Paragraph>{hospitalAddress}</Paragraph>

        <Title>Rating</Title>
        <Paragraph>
          Careful consulting: <Icon size={20} color="#FFC830" name="star" />{" "}
          <Text style={{ fontWeight: "700" }}>
            {Number(carefulConsultRating).toFixed(1)}{" "}
            {carefulConsultRating == 5
              ? "Brilliant"
              : carefulConsultRating == 4
              ? "Great"
              : carefulConsultRating == 3
              ? "Average"
              : carefulConsultRating == 2
              ? "Bad"
              : "Very bad"}
          </Text>
        </Paragraph>
        <Paragraph>
          Facility: <Icon size={20} color="#FFC830" name="star" />{" "}
          <Text style={{ fontWeight: "700" }}>
            {Number(facilityRating).toFixed(1)}{" "}
            {facilityRating == 5
              ? "Brilliant"
              : facilityRating == 4
              ? "Great"
              : facilityRating == 3
              ? "Average"
              : facilityRating == 2
              ? "Bad"
              : "Very bad"}
          </Text>
        </Paragraph>
        <Paragraph>
          Fast med. examine process:
          <Icon size={20} color="#FFC830" name="star" />{" "}
          <Text style={{ fontWeight: "700" }}>
            {Number(fastMedicalExamineProcessRating).toFixed(1)}{" "}
            {fastMedicalExamineProcessRating == 5
              ? "Brilliant"
              : fastMedicalExamineProcessRating == 4
              ? "Great"
              : fastMedicalExamineProcessRating == 3
              ? "Average"
              : fastMedicalExamineProcessRating == 2
              ? "Bad"
              : "Very bad"}
          </Text>
        </Paragraph>
        <Paragraph>
          Patient care:
          <Icon size={20} color="#FFC830" name="star" />{" "}
          <Text style={{ fontWeight: "700" }}>
            {Number(patientCareRating).toFixed(1)}{" "}
            {patientCareRating == 5
              ? "Brilliant"
              : patientCareRating == 4
              ? "Great"
              : patientCareRating == 3
              ? "Average"
              : patientCareRating == 2
              ? "Bad"
              : "Very bad"}
          </Text>
        </Paragraph>

        <Title>Map</Title>
        <View style={{ marginBottom: 20 }}>
          <MyMapView
            hospitalId={hospitalId}
            hospitalName={hospitalName}
            userRating={userRating}
            lat={lat}
            lng={lng}
            hospitalPhoto={hospitalPhoto}
          />
        </View>
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
