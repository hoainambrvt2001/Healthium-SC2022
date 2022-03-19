import React from "react";
import { View, Text } from "react-native";
import { primaryColor } from "styles/globalStyles";

const TimeRangeCard = ({ startTime, endTime }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: primaryColor,
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 8,
      }}
    >
      <Text style={{ color: primaryColor, fontSize: 16 }}>
        {startTime} - {endTime}
      </Text>
    </View>
  );
};

export default TimeRangeCard;
