import React from "react";
import { View } from "react-native";
import HealthCard from "./HealthCard";

const OverviewSection = ({ medicalRecord }) => {
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
          value: medicalRecord.temperature || "",
          measureTime: medicalRecord.temperatureMeasureTime || "",
        },
        {
          iconName: "heart-pulse",
          typeName: "SPO2",
          typeUnit: "%",
          value: medicalRecord.SPO2 || "",
          measureTime: medicalRecord.SPO2MeasureTime || "",
        },

        {
          iconName: require("assets/analytic-icon.png"),
          typeName: "Heart rate",
          typeUnit: "beats/minute",
          value: medicalRecord.heartRate || "",
          measureTime: medicalRecord.heartRateMeasureTime || "",
        },
        {
          iconName: require("assets/blood-sample.png"),
          typeName: "Blood sugar",
          typeUnit: "mg/DL",
          value: medicalRecord.bloodSugar || "",
          measureTime: medicalRecord.bloodSugarMeasureTime || "",
        },
        {
          iconName: require("assets/blood-pressure.png"),
          typeName: "Blood pressure",
          typeUnit: "mmHg",
          value: medicalRecord.bloodPressure || "",
          measureTime: medicalRecord.bloodPressureMeasureTime || "",
        },
        {
          iconName: "human-male-height",
          typeName: "Height",
          typeUnit: "Cm",
          value: medicalRecord.height || "",
          measureTime: medicalRecord.heightMeasureTime || "",
        },
      ].map((item, idx) => {
        return (
          <View style={{ alignItems: "baseline", width: "50%" }} key={idx}>
            <HealthCard
              iconName={item.iconName}
              typeName={item.typeName}
              typeUnit={item.typeUnit}
              value={item.value}
              measureTime={item.measureTime}
            />
          </View>
        );
      })}
    </View>
  );
};

export default OverviewSection;
