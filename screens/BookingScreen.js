import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { primaryColor } from "styles/globalStyles";

import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import StepSection from "components/Booking/StepSection";
import FirstStep from "components/Booking/FirstStep";
import SecondStep from "components/Booking/SecondStep";
import ThirdStep from "components/Booking/ThirdStep";

const BookingScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 160 }}>
        <View
          style={{
            height: 80,
            alignItems: "center",
            backgroundColor: primaryColor,
          }}
        >
          <InfoHospitalCard
            hospitalAddress={"Ho Chi Minh city, Vietnam"}
            hospitalName={"Truong Vuong"}
            hospitalContact={"09123123"}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <StepSection step={step} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {step === 0 ? (
          <FirstStep navigation={navigation} />
        ) : step === 1 ? (
          <SecondStep navigation={navigation} />
        ) : (
          <ThirdStep navigation={navigation} />
        )}
        <View
          style={{
            paddingHorizontal: 25,
            marginBottom: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            mode="contained"
            style={{
              width: "45%",
              backgroundColor: "#E4E4E7",
            }}
            labelStyle={{ color: "#000000" }}
            onPress={() => setStep(step - 1)}
          >
            Back
          </Button>
          <Button
            mode="contained"
            style={{ width: "45%" }}
            onPress={() => setStep(step + 1)}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
