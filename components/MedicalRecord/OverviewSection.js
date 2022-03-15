import React from "react";
import { View } from "react-native";
import HealthCard from "./HealthCard";

const OverviewSection = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#f5f7fd",
      }}
    >
      {[
        {
          iconName: "thermometer-lines",
          typeName: "Temperature",
          typeUnit: "oC",
        },
        {
          iconName: "heart-pulse",
          typeName: "SPO2",
          typeUnit: "%",
        },

        {
          iconName: require("../../assets/analytic-icon.png"),
          typeName: "Heart rate",
          typeUnit: "beats/minute",
        },
        {
          iconName: require("../../assets/blood-sample.png"),
          typeName: "Blood sugar",
          typeUnit: "mg/DL",
        },
        {
          iconName: require("../../assets/blood-pressure.png"),
          typeName: "Blood pressure",
          typeUnit: "mmHg",
        },
        {
          iconName: "human-male-height",
          typeName: "Height",
          typeUnit: "Cm",
          value: 174.0,
          measureTime: {
            time: "15:41",
            date: "20/01/2022",
          },
        },
      ].map((item, idx) => {
        return (
          <View style={{ alignItems: "baseline", width: "50%" }} key={idx}>
            <HealthCard
              iconName={item.iconName}
              typeName={item.typeName}
              typeUnit={item.typeUnit}
              value={item.value ? item.value : null}
              measureTime={item.measureTime ? item.measureTime : null}
            />
          </View>
        );
      })}
    </View>
  );
};

export default OverviewSection;
