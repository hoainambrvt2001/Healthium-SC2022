import React from "react";
import { View, FlatList } from "react-native";
import { FAB, Title } from "react-native-paper";
import {
  listNotes,
  listPatients,
  listHospitalServices,
} from "components/Utils/CLONEDATA";

import NoteCard from "components/HomeScreen/NoteCard";
import PatientCard from "components/Booking/PatientCard";
import ServiceCard from "components/Booking/ServiceCard";

const FirstStep = ({ navigation }) => {
  return (
    <>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Select patient</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listPatients}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item }) => {
            return (
              <PatientCard
                patientName={item.patientName}
                patientGender={item.patientGender}
                patientId={item.patientId}
                patientBirthday={item.patientBirthday}
                patientAddress={item.patientAddress}
                patientPhone={item.patientPhone}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <FAB
                icon="plus"
                onPress={() => navigation.navigate("CreatePatient")}
              />
            );
          }}
          ListFooterComponentStyle={{ justifyContent: "center" }}
        />
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Update your symptom</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listNotes}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item }) => {
            return <NoteCard item={item} minHeight={100} />;
          }}
          ListFooterComponent={() => {
            return <FAB icon="plus" onPress={() => console.log("Pressed")} />;
          }}
          ListFooterComponentStyle={{ justifyContent: "center" }}
        />
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Services</Title>
      </View>
      <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
        {listHospitalServices.map((hospitalService, idx) => {
          return (
            <ServiceCard
              key={idx}
              serviceName={hospitalService.serviceName}
              servicePrice={hospitalService.servicePrice}
            />
          );
        })}
      </View>
    </>
  );
};

export default FirstStep;
