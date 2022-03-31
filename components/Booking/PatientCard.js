import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";

const PatientCard = ({
  handlePress,
  isChose,
  patientName,
  patientGender,
  patientId,
  patientBirthday,
  patientPhone,
  patientAddress,
}) => {
  const transition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(transition, {
      duration: 300,
      toValue: isChose,
      useNativeDriver: false,
    }).start();
  }, [isChose]);
  // console.log(patientBirthday);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handlePress();
      }}
    >
      <Animated.View
        style={{
          width: 300,
          flexDirection: "row",
          alignItems: "flex-start",
          // borderWidth: 2,
          borderRadius: 10,
          padding: 4,
          marginHorizontal: 10,
          // borderColor: transition.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: ["#C4C4C4", "#00a19d"],
          // }),
          backgroundColor: transition.interpolate({
            inputRange: [0, 1],
            outputRange: ["#C4C4C4", "#00a19d"],
          }),
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            flex: 1,
            padding: 6,
            borderRadius: 10,
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
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {patientName}
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <IconButton
                icon="card-account-details-outline"
                style={{ margin: 0 }}
              />
              <Text>{patientId}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="cake" style={{ margin: 0 }} />
              <Text>{patientBirthday.toLocaleDateString("en-US")}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton icon="phone" style={{ margin: 0 }} />
              <Text>{patientPhone}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton icon="home-city-outline" style={{ margin: 0 }} />
              <Text numberOfLines={1} style={{ flex: 1 }}>
                {patientAddress}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
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
