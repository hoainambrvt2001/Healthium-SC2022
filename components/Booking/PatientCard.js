import React from "react";
import { View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";

const PatientCard = ({
  patientName,
  patientGender,
  patientId,
  patientBirthday,
  patientPhone,
  patientAddress,
}) => {
  return (
    <View
      style={{
        width: 300,
        flexDirection: "row",
        alignItems: "flex-start",
        borderColor: "#C4C4C4",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={
            patientGender === "Male"
              ? require("assets/man-icon.png")
              : require("assets/woman-icon.png")
          }
          style={{ width: 110, height: 110, marginBottom: 10 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{patientName}</Text>
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon="card-account-details-outline"
            style={{ margin: 0 }}
          />
          <Text>{patientId}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton icon="cake" style={{ margin: 0 }} />
          <Text>{patientBirthday}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton icon="phone" style={{ margin: 0 }} />
          <Text>{patientPhone}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton icon="home-city-outline" style={{ margin: 0 }} />
          <Text>{patientAddress}</Text>
        </View>
      </View>
    </View>
  );
};

PatientCard.defaultProps = {
  patientName: "Nam Hoai",
  patientId: "1955555",
  patientBirthday: "28/03/1999",
  patientAddress: "Ho Chi Minh city",
  patientPhone: "0337331442",
};

export default PatientCard;
