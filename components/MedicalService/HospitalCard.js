import React from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Caption, Paragraph, Title, Subheading } from "react-native-paper";

const HospitalCard = ({
  hospitalId,
  hospitalName,
  hospitalPhoto,
  hospitalAddress,
  hospitalSpeciality,
  hospitalDistance,
  hospitalHotline,
  hospitalDescription,
  lat,
  lng,
  userRating,
  carefulConsultRating,
  facilityRating,
  fastMedicalExamineProcessRating,
  patientCareRating,
  status,
  navigation,
  serviceName,
  price,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("HospitalDetail", {
          hospitalId: hospitalId,
          hospitalName: hospitalName,
          hospitalPhoto: hospitalPhoto,
          hospitalAddress: hospitalAddress,
          hospitalHotline: hospitalHotline,
          hospitalDescription: hospitalDescription,
          lat: lat,
          lng: lng,
          userRating: userRating,
          carefulConsultRating: carefulConsultRating,
          facilityRating: facilityRating,
          fastMedicalExamineProcessRating: fastMedicalExamineProcessRating,
          patientCareRating: patientCareRating,
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
          source={{ uri: hospitalPhoto }}
          style={{ width: 100, height: 100 }}
          borderRadius={3}
        />
        <View
          style={{
            flex: 1,
            width: "100%",
            marginLeft: 8,
          }}
        >
          <Title style={{ color: "#00a19d", marginTop: -8, lineHeight: 28 }}>
            {hospitalName}
          </Title>
          {serviceName === "" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Subheading style={{ fontSize: 13, fontWeight: "700" }}>
                Average price:{" "}
              </Subheading>
              <Paragraph>${price}</Paragraph>
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Subheading style={{ fontSize: 13, fontWeight: "700" }}>
                  Service:{" "}
                </Subheading>
                <Paragraph style={{ textTransform: "capitalize" }}>
                  {serviceName}
                </Paragraph>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Subheading style={{ fontSize: 13, fontWeight: "700" }}>
                  Price:{" "}
                </Subheading>
                <Paragraph>${price}</Paragraph>
              </View>
            </>
          )}

          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Caption style={{ fontSize: 13 }}>Speciality: </Caption>
            <Paragraph style={{ textTransform: "capitalize" }}>
              {hospitalSpeciality}
            </Paragraph>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Caption style={{ fontSize: 13 }}>From your location: </Caption>
            <Paragraph>{hospitalDistance}</Paragraph>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Caption style={{ fontSize: 13 }}>Status: </Caption>
            <Paragraph style={{ textTransform: "capitalize" }}>
              {status}
            </Paragraph>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

HospitalCard.defaultProps = {
  hospitalId: "ChIJyaazF8IudTERwnq3Lqfig8s",
  hospitalName: "Trung Vuong Hospital",
  hospitalPhoto:
    "https://lh5.googleusercontent.com/p/AF1QipO58edXeYn_JXO4Xkh3oi5UXruumBxKfT4qnV8t=w408-h306-k-no",
  hospitalSpeciality: "polyclinic",
  hospitalDistance: "12km",
  status: "available",
};

export default HospitalCard;
