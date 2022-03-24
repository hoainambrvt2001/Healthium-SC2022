import React from "react";
import { View, Text } from "react-native";

const InfoHospitalCard = ({
  hospitalName,
  hospitalAddress,
  hospitalContact,
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 15,
        elevation: 5,
        marginHorizontal: 30,
        borderRadius: 10,
        zIndex: 2,
        minWidth: 250,
        maxWidth: 350,
      }}
    >
      <Text style={{ marginBottom: 3 }}>Hospital</Text>
      <Text
        style={{
          fontSize: 20,
          color: "#00a19d",
          fontWeight: "bold",
          marginBottom: 6,
        }}
      >
        {hospitalName} Hopistal
      </Text>
      <Text style={{ marginBottom: 6 }} numberOfLines={2}>
        {hospitalAddress}
      </Text>
      <Text>Call: {hospitalContact}</Text>
    </View>
  );
};

InfoHospitalCard.defaultProps = {
  hospitalAddress: "1231123 0asd0Ho Chi Minh city, Vietnam",
  hospitalName: "Truong Vuong",
  hospitalContact: "09123123",
};

export default InfoHospitalCard;
