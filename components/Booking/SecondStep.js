import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Title, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import TimeRangeCard from "./TimeRangeCard";
import DoctorCard from "./DoctorCard";
import moment from "moment";

const SecondStep = ({
  navigation,
  doctorList,
  time,
  appointmentInfo,
  setAppointmentInfo,
}) => {
  const [bookingDate, setBookingDate] = useState(false);
  const [show, setShow] = useState(false);
  const [appointTime, setAppointTime] = useState(-1);
  const [doctorChoice, setDoctorChoice] = useState(-1);

  useEffect(() => {
    if (!bookingDate) return;
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
    if (doctorChoice == -1) return;
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
    setDoctorChoice(index);
  };

  return (
    <>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Title>Choose date</Title>
      </View>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Button onPress={showDatepicker} mode="contained">
          {bookingDate
            ? moment(bookingDate).format("LL")
            : "Prefered Date for Appointment"}
        </Button>
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
    </>
  );
};

export default SecondStep;
