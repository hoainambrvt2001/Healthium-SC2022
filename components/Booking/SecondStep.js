import React, { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import {
  Title,
  Button,
  Dialog,
  Portal,
  Paragraph,
  IconButton,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import TimeRangeCard from "./TimeRangeCard";
import DoctorCard from "./DoctorCard";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import { primaryColor } from "styles/globalStyles";

const SecondStep = ({
  navigation,
  doctorList,
  time,
  appointmentInfo,
  setAppointmentInfo,
  doctorExp,
}) => {
  const [bookingDate, setBookingDate] = useState(false);
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [appointTime, setAppointTime] = useState(-1);
  const [doctorChoice, setDoctorChoice] = useState(-1);
  const [isOpen, setIsOpen] = useState(-1);
  const [init, setInit] = useState(false);

  const background = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (init) return;

    doctorList.map(({ doctorId }, index) => {
      if (doctorId === appointmentInfo.doctorId) setDoctorChoice(index);
    });

    time.map(({ start }, index) => {
      const infoStartDate =
        appointmentInfo.time.start instanceof Timestamp
          ? new Date(appointmentInfo.time.start.toDate()).getTime()
          : new Date(appointmentInfo.time.start).getTime();
      // console.log(ele);
      const startTime =
        start instanceof Timestamp
          ? new Date(start.toDate()).getTime()
          : new Date(start).getTime();
      if (startTime === infoStartDate) setAppointTime(index);
    });

    if (appointmentInfo.time.date !== "") {
      if (appointmentInfo.time.date instanceof Timestamp) {
        setBookingDate(new Date(appointmentInfo.time.date.toDate()));
      } else setBookingDate(new Date(appointmentInfo.time.date));
    }

    setInit(true);
  }, [init]);

  useEffect(() => {
    if (!bookingDate) {
      Animated.timing(background, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    Animated.timing(background, {
      duration: 300,
      toValue: 1,
      useNativeDriver: false,
    }).start();
    setAppointmentInfo({
      ...appointmentInfo,
      time: { ...appointmentInfo.time, date: new Date(bookingDate).getTime() },
    });
  }, [bookingDate]);

  useEffect(() => {
    if (appointTime == -1) return;
    setAppointmentInfo({
      ...appointmentInfo,
      time: {
        ...appointmentInfo.time,
        start: time[appointTime].start.getTime(),
        end: time[appointTime].end.getTime(),
      },
    });
  }, [appointTime]);

  useEffect(() => {
    if (doctorChoice == -1) {
      setAppointmentInfo({
        ...appointmentInfo,
        doctorId: "",
        doctorAvatar: "",
        doctorName: "",
        doctorSpeciality: "",
      });
      return;
    }
    // console.log("doctor");
    // console.log(doctorList[doctorChoice]);
    setAppointmentInfo({
      ...appointmentInfo,
      doctorId: doctorList[doctorChoice].doctorId,
      doctorAvatar: doctorList[doctorChoice].docAvatar,
      doctorName: doctorList[doctorChoice].docName,
      doctorSpeciality: doctorList[doctorChoice].docSpeciality,
    });
  }, [doctorChoice]);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate;
    // console.log(Date(currentDate));
    if (currentDate) {
      setBookingDate(currentDate);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleChangeAppointTime = (index) => {
    setAppointTime(index);
  };

  const handleChangeDoctorChoice = (index) => {
    setIsOpen(index);
  };

  return (
    <ScrollView>
      <Portal>
        <Dialog visible={isOpen !== -1} onDismiss={() => setIsOpen(-1)}>
          <Dialog.Title>Doctor information</Dialog.Title>
          {isOpen === -1 ? null : (
            <>
              <Dialog.Content>
                <Title style={{ fontSize: 18, marginTop: 2, lineHeight: 20 }}>
                  Doctor name:{" "}
                  <Paragraph>{doctorList[isOpen].docName}</Paragraph>
                </Title>
                <Title style={{ fontSize: 18, marginTop: 8, lineHeight: 20 }}>
                  Doctor speciality:{" "}
                  <Paragraph>{doctorList[isOpen].docSpeciality}</Paragraph>
                </Title>
                <Title style={{ fontSize: 18, marginTop: 8, lineHeight: 20 }}>
                  Description:
                </Title>
                <Paragraph numberOfLines={3}>
                  {doctorList[isOpen].description}
                </Paragraph>
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                  <Text>{showMore ? "Show less" : "Show more"}</Text>
                </TouchableOpacity>

                <Title style={{ fontSize: 18, marginTop: 8, lineHeight: 20 }}>
                  Experience:
                </Title>
                {doctorExp.map((exp) => {
                  return <Paragraph>- {exp}</Paragraph>;
                })}
              </Dialog.Content>
            </>
          )}

          <Dialog.Actions>
            <Button
              color="#54A9D3"
              onPress={() => {
                const index = isOpen;
                setDoctorChoice(index);
                setIsOpen(-1);
              }}
            >
              Book this doctor
            </Button>

            <IconButton
              size={25}
              icon="phone-forward"
              onPress={() => {}}
              color="#F2F2F2"
              style={{
                backgroundColor: "#00b3b0",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
            />
            <IconButton
              color="#F2F2F2"
              icon="chat"
              size={25}
              onPress={() => {}}
              style={{
                backgroundColor: "#54A9D3",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
            />
            <IconButton
              size={25}
              icon="close"
              color="#F2F2F2"
              onPress={() => {
                setIsOpen(-1);
                setDoctorChoice(-1);
              }}
              style={{
                backgroundColor: "#BEBDC5",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Choose date</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Animated.View
          style={{
            backgroundColor: background.interpolate({
              inputRange: [0, 1],
              outputRange: ["#C4C4C4", "#00a19d"],
            }),
            padding: 4,
            borderRadius: 6,
          }}
        >
          <Button
            onPress={showDatepicker}
            mode="contained"
            color="#fff"
            style={{ elevation: 0 }}
          >
            <Text style={{ color: "#000" }}>
              {bookingDate
                ? moment(bookingDate).format("LL")
                : "Prefered Date for Appointment"}
            </Text>
          </Button>
        </Animated.View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={bookingDate ? bookingDate : new Date()}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Time</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={time}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item, index }) => (
            <TimeRangeCard
              handlePress={() => handleChangeAppointTime(index)}
              isChose={appointTime === index ? 1 : 0}
              startTime={moment(item.start).format("LT")}
              endTime={moment(item.end).format("LT")}
            />
          )}
        />
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Doctor</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={doctorList}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item, index }) => (
            <DoctorCard
              handlePress={() => handleChangeDoctorChoice(index)}
              isChose={doctorChoice === index ? 1 : 0}
              doctorAvatar={item.docAvatar}
              doctorName={item.docName}
              doctorSpeciality={item.docSpeciality}
            />
          )}
        />
        <View style={{ height: 60 }}></View>
      </View>
    </ScrollView>
  );
};

SecondStep.defaultProps = {
  doctorExp: [
    "Award 1st place",
    "Certificate at 18 years old",
    "Work as a main surgeon doctor at 22 years old",
  ],
};

export default SecondStep;
