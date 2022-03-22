import React from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { Caption, Paragraph, Title } from "react-native-paper";

const HospitalCard = ({
  place_id,
  hospitalImage,
  photoUrl,
  hospitalName,
  hospitalSpeciality,
  hospitalDistance,
  hospitalStatus,
  navigation,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("HospitalDetail", {
          place_id: place_id,
          photoUrl: photoUrl,
        });
      }}
    >
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
          source={photoUrl ? { uri: photoUrl } : hospitalImage}
          style={{ width: 100, height: 100 }}
          borderRadius={3}
        />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Title style={{ color: "#00a19d" }}>{hospitalName}</Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Caption style={{ fontSize: 13 }}>Speciality: </Caption>
            <Paragraph>{hospitalSpeciality}</Paragraph>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Caption style={{ fontSize: 13 }}>From your location: </Caption>
            <Paragraph>{hospitalDistance}</Paragraph>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Caption style={{ fontSize: 13 }}>Status: </Caption>
            <Paragraph>
              {hospitalStatus ? "Available" : "Not available"}
            </Paragraph>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

HospitalCard.defaultProps = {
  hospitalImage: require("assets/trung-vuong-hospital.png"),
  hospitalName: "Trung Vuong Hospital",
  hospitalSpeciality: "Da khoa",
  hospitalDistance: "12km",
  hospitalStatus: "Available",
};

export default HospitalCard;
