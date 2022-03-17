import React, { useState } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Avatar, FAB, Title } from "react-native-paper";
import MedicalHistory from "components/MedicalRecord/MedicalHistory";
import OverviewSection from "components/MedicalRecord/OverviewSection";

const MedicalRecordScreen = () => {
  const [chosenOption, setChosenOption] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "#00a19d" }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Avatar.Image
          source={require("assets/avatar.png")}
          backgroundColor={"#ffff"}
        />
        <View style={{ marginHorizontal: 10 }}>
          <Title style={{ color: "#ffffff" }}>Kamisato Ayaka</Title>
          <Text style={{ color: "#ffffff" }}>Me - Female - 18 years old</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "#f5f7fd",
          maxHeight: 50,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {[
          { title: "Overview" },
          { title: "Medical history" },
          { title: "Covid-19 Vacination" },
        ].map((item, idx) => {
          return (
            <TouchableWithoutFeedback
              key={idx}
              onPress={() => {
                setChosenOption(idx);
              }}
            >
              <View
                style={{
                  marginRight: 20,
                  borderBottomColor: chosenOption === idx ? "#00a19d" : null,
                  borderBottomWidth: chosenOption === idx ? 3 : null,
                }}
              >
                <Title
                  style={{
                    color: chosenOption === idx ? "#00a19d" : "#000000",
                  }}
                >
                  {item.title}
                </Title>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>

      {chosenOption === 0 ? <OverviewSection /> : <MedicalHistory />}

      <FAB
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: 16,
          marginBottom: 70,
          elevation: 5,
        }}
        icon="plus"
      />
    </View>
  );
};

export default MedicalRecordScreen;
