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
          padding: 10,
          borderColor: border.interpolate({
            inputRange: [0, 1],
            outputRange: ["#B5B5B5", "#00a19d"],
          }),
          borderWidth: 1,
          borderRadius: 5,
          marginHorizontal: 10,
          shadowColor: "#000000",
          maxWidth: 300,
        }}
      >
        <Avatar.Image
          size={60}
          source={{
            uri:
              doctorAvatar !== ""
                ? doctorAvatar
                : "https://placeimg.com/140/140/any",
          }}
          style={{ marginRight: 10 }}
        />

        <View>
          <Title>{doctorName}</Title>
          <Text>Speciality: {doctorSpeciality}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
