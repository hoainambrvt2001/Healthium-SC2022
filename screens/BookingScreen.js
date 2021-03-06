import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { primaryColor } from "styles/globalStyles";

import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import StepSection from "components/Booking/StepSection";
import FirstStep from "components/Booking/FirstStep";
import SecondStep from "components/Booking/SecondStep";
import ThirdStep from "components/Booking/ThirdStep";
import {
  getCurUser,
  getService,
  getDoctors,
  getTime,
  getUserRef,
  firestore,
  addAppointment,
  addChat,
} from "firebaseServices/firestoreApi";

const BookingScreen = ({
  navigation,
  route: {
    params: { hospitalAddress, hospitalName, hospitalId, hospitalHotline },
  },
}) => {
  const [step, setStep] = useState(0);
  // console.log(hospitalAddress, hospitalName, hospitalId, hospitalHotline);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState([]);
  const [services, setServices] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState({
    userId: "",
    patientNo: -1,
    doctorId: "",
    doctorName: "",
    doctorAvatar: "",
    doctorSpeciality: "",
    note: "",
    services: [],
    time: {
      date: "",
      start: "",
      end: "",
    },
    hospitalName: hospitalName,
  });

  const openToggleSnackBar = () => setIsOpenSnackbar(true);

  const onDismissSnackBar = () => setIsOpenSnackbar(false);

  useEffect(() => {
    const getData = async () => {
      if (step === 0) {
        if (userInfo["email"]) return;
        setLoading(true);
        await getCurUser().then((data) => {
          setAppointmentInfo({ ...appointmentInfo, userId: data.userId });
          setUserInfo({ ...data });
        });
        await getService(hospitalId).then((data) => setServices([...data]));
        setLoading(false);
      } else if (step === 1) {
        if (time.length) return;
        setLoading(true);
        await getTime(hospitalId).then((data) => setTime([...data]));
        await getDoctors(hospitalId).then((data) => setDoctorList([...data]));
        setLoading(false);
      }
    };

    getData();
  }, [step]);

  // useEffect(() => {
  //   const unsubscribe = async () => {
  //     if (!userInfo.userId) return;
  //     const userRef = await getUserRef(userInfo.userId).then((data) => data);
  //     onSnapshot(userRef, (doc) => {
  //       setUserInfo({ ...doc.data() });
  //     });
  //   };
  //   return () => unsubscribe();
  // }, [toggle]);

  // useEffect(() => {
  //   console.log("appoint");
  //   console.log(appointmentInfo);
  // }, [appointmentInfo]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "relative" }}>
        <View
          style={{
            alignItems: "center",
            // backgroundColor: primaryColor,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "50%",
              backgroundColor: primaryColor,
              position: "absolute",
              top: 0,
            }}
          ></View>
          <InfoHospitalCard
            hospitalAddress={hospitalAddress}
            hospitalName={hospitalName}
            hospitalContact={hospitalHotline}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10, marginTop: 20 }}>
        <StepSection step={step} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View>
            <Text></Text>
          </View>
        ) : step === 0 ? (
          <FirstStep
            navigation={navigation}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            services={[...services]}
            appointmentInfo={appointmentInfo}
            setAppointmentInfo={setAppointmentInfo}
          />
        ) : step === 1 ? (
          <SecondStep
            navigation={navigation}
            doctorList={doctorList}
            time={time}
            appointmentInfo={appointmentInfo}
            setAppointmentInfo={setAppointmentInfo}
          />
        ) : (
          <ThirdStep
            navigation={navigation}
            appointmentInfo={appointmentInfo}
            setAppointmentInfo={setAppointmentInfo}
          />
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
            onPress={() => {
              if (step === 0) navigation.goBack();
              else setStep(step - 1);
            }}
          >
            Back
          </Button>
          <Button
            mode="contained"
            style={{ width: "45%" }}
            onPress={async () => {
              if (step === 0) {
                if (
                  appointmentInfo.patientNo !== -1 &&
                  appointmentInfo.services.length
                ) {
                  setStep(1);
                } else {
                  openToggleSnackBar();
                }
              } else if (step === 1) {
                if (
                  appointmentInfo.doctorId !== "" &&
                  appointmentInfo.time.date !== "" &&
                  appointmentInfo.time.start !== ""
                ) {
                  setStep(2);
                } else {
                  openToggleSnackBar();
                }
              } else {
                await addAppointment(appointmentInfo).then((data) => {
                  // console.log(data)
                });
                await addChat(appointmentInfo).then((data) => {
                  // console.log(data)
                });
                navigation.replace("AppointmentScreen");
              }
            }}
          >
            {step !== 2 ? "Next" : "Confirm"}
          </Button>
        </View>
        <Snackbar
          visible={isOpenSnackbar}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Hide",
            onPress: () => {
              // Do something
            },
          }}
        >
          {appointmentInfo.patientNo === -1
            ? "You should choose the patient needed examine"
            : !appointmentInfo.services.length
            ? "You should choose the service(s)"
            : appointmentInfo.time.date == ""
            ? "You should choose date to book appointment"
            : appointmentInfo.time.start == ""
            ? "You should choose the time to examine"
            : "You should choose which doctor to examine"}
        </Snackbar>
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
