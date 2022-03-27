import React, { useState, useEffect } from "react";
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
import { Timestamp } from "firebase/firestore";

const FirstStep = ({
  navigation,
  userInfo,
  setUserInfo,
  services,
  appointmentInfo,
  setAppointmentInfo,
}) => {
  const [patientChoice, setPatientChoice] = useState(appointmentInfo.patientNo);
  const [init, setInit] = useState(false);
  const [serviceChoice, setServiceChoice] = useState([]);

  useEffect(() => {
    if (patientChoice === -1) return;
    setAppointmentInfo({
      ...appointmentInfo,
      patientNo: userInfo.patients[patientChoice].no,
    });
  }, [patientChoice]);

  useEffect(() => {
    // if (!serviceChoice.length && appointmentInfo.services.length) {
    //   const value = services.map(({ name }, index) => {
    //     const [isInclude] = appointmentInfo.services.map((ele) => {
    //       if (ele.name === name) return true;
    //     });
    //     if (isInclude) return index;
    //     return -1;
    //   });
    //   setServiceChoice(value.filter((ele) => ele > -1));

    //   return;
    // }
    const value = [];
    serviceChoice.forEach((ele) => value.push(services[ele]));
    setAppointmentInfo({ ...appointmentInfo, services: value });
  }, [serviceChoice]);

  useEffect(() => {
    if (!init) {
      const value = services.map(({ name }, index) => {
        let isInclude = false;
        appointmentInfo.services.map((ele) => {
          if (ele.name === name) isInclude = true;
        });
        if (isInclude) return index;
        return -1;
      });
      setServiceChoice(value.filter((ele) => ele > -1));
      setInit(true);
    }
  }, [init]);

  const handleChoosePatient = (index) => {
    setPatientChoice(index);
  };

  const handleChooseService = (index) => {
    const temp = serviceChoice;
    const indexOf = temp.indexOf(index);
    if (indexOf === -1) {
      setServiceChoice([...temp, index]);
    } else {
      temp.splice(indexOf, 1);
      setServiceChoice([...temp]);
    }
  };

  return (
    <>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Select patient</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={userInfo.patients}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item, index }) => {
            return (
              <PatientCard
                handlePress={() => handleChoosePatient(index)}
                isChose={patientChoice === index ? 1 : 0}
                patientName={item.patientName}
                patientGender={item.patientGender}
                patientId={item.patientIdCardNo}
                patientBirthday={
                  item.patientBirthday instanceof Timestamp
                    ? new Date(item.patientBirthday.toDate())
                    : new Date(item.patientBirthday)
                }
                patientAddress={item.patientAddress}
                patientPhone={item.patientTel}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <FAB
                icon="plus"
                onPress={() =>
                  navigation.navigate("CreatePatient", {
                    userInfo: userInfo,
                    setUserInfo: setUserInfo,
                  })
                }
                style={{ marginBottom: 10, marginRight: 10 }}
              />
            );
          }}
          ListFooterComponentStyle={{ justifyContent: "center" }}
        />
      </View>
      {/* <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
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
      </View> */}
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Services</Title>
      </View>
      <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
        {services.map((hospitalService, idx) => {
          const temp = serviceChoice;
          const isChose = temp.includes(idx);
          return (
            <ServiceCard
              key={idx}
              index={idx}
              isChose={isChose ? 1 : 0}
              handlePress={() => handleChooseService(idx)}
              serviceName={hospitalService.name}
              servicePrice={hospitalService.price}
            />
          );
        })}
      </View>
    </>
  );
};

export default FirstStep;
