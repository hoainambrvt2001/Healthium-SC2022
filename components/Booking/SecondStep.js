import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Title, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import TimeRangeCard from "./TimeRangeCard";
import DoctorCard from "./DoctorCard";
import { listDoctors, listTimeRanges } from "components/Utils/CLONEDATA";
import moment from "moment";

const SecondStep = ({ navigation }) => {
  const [bookingDate, setBookingDate] = useState(false);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate;
    if (currentDate) {
      setBookingDate(currentDate);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
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
          data={listTimeRanges}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item }) => (
            <TimeRangeCard startTime={item.startTime} endTime={item.endTime} />
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
          data={listDoctors}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item }) => (
            <DoctorCard
              doctorAvatar={item.doctorAvatar}
              doctorName={item.doctorName}
              doctorSpeciality={item.doctorSpeciality}
            />
          )}
        />
        <View style={{ height: 60 }}></View>
      </View>
    </>
  );
};

export default SecondStep;
