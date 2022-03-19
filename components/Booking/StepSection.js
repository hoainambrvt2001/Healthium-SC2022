import React from "react";
import { View, Text } from "react-native";
import { Badge } from "react-native-paper";
import { primaryColor } from "styles/globalStyles";

const StepSection = ({ step }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {[
        { title: "Choose patient" },
        { title: "Add Info" },
        { title: "Confirm" },
      ].map((item, idx) => {
        return (
          <View
            key={idx}
            style={{
              flex: 1,
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                borderBottomColor: step === idx ? primaryColor : "#C4C4C4",
                borderBottomWidth: 2,
                width: "85%",
                marginRight: -5,
              }}
            >
              <Text
                style={{
                  color: step === idx ? primaryColor : "#C4C4C4",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </View>
            <Badge
              size={28}
              style={{
                backgroundColor: step === idx ? primaryColor : "#C4C4C4",
                zIndex: 2,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default StepSection;
