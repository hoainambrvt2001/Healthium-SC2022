import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Activity = ({ activityName, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#F8F8F9",
        minWidth: 80,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        borderWidth: 1,
        marginHorizontal: 5,
      }}
      onPress={onPress}
    >
      <Text style={{ fontWeight: "700" }}>{activityName}</Text>
    </TouchableOpacity>
  );
};

Activity.defaultProps = {
  activityName: "Act",
};

export default Activity;
