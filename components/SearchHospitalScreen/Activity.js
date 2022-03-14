import React from "react";
import { View, Text } from "react-native";

const Activity = ({ activityName }) => {
  return (
    <View
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
    >
      <Text style={{ fontWeight: "700" }}>{activityName}</Text>
    </View>
  );
};

Activity.defaultProps = {
  activityName: "Act",
};

export default Activity;
