import React, { useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Title, Avatar } from "react-native-paper";

const DoctorCard = ({
  doctorAvatar,
  doctorName,
  doctorSpeciality,
  handlePress,
  isChose,
}) => {
  const border = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(border, {
      duration: 300,
      toValue: isChose,
      useNativeDriver: false,
    }).start();
  }, [isChose]);

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Animated.View
        style={{
          flexDirection: "row",
          padding: 3,
          backgroundColor: border.interpolate({
            inputRange: [0, 1],
            outputRange: ["#C4C4C4", "#00a19d"],
          }),
          borderRadius: 5,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 6,
            borderRadius: 5,
            backgroundColor: "white",
          }}
        >
          <Avatar.Image
            size={60}
            source={
              doctorAvatar !== ""
                ? {
                    uri: doctorAvatar,
                  }
                : require("assets/doctor-avatar.png")
            }
            style={{ marginRight: 10 }}
          />

          <View>
            <Title>{doctorName}</Title>
            <Text>Speciality: {doctorSpeciality}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
