import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import AppointmentCard from "components/Utils/AppointmentCard";
import { getAppointments } from "firebaseServices/firestoreApi";

const AppointmentScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [choice, setChoice] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      await getAppointments().then((data) => {
        console.log("data");
        console.log(data);
        setAppointments([...data]);
      });
    };
    getData();
  }, []);

  // console.log("appointment");
  // console.log(appointments);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#8EB3FC",
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            Upcomming
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#F6F6F6",
            paddingVertical: 6,
            paddingHorizontal: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Completed</Text>
        </View>
        <View
          style={{
            backgroundColor: "#F6F6F6",
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Canceled</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Portal>
          <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)}>
            <Dialog.Title>
              Contact doctor{" "}
              {choice === -1 ? "" : appointments[choice].doctorName}
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph>You have to pay $1</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsOpen(false)}>Cancel</Button>
              <Button
                onPress={() => {
                  navigation.navigate("Chat", {
                    userId: appointments[choice].userId,
                    doctorId: appointments[choice].doctorId,
                    doctorName: appointments[choice].doctorName,
                    doctorAvatar: appointments[choice].doctorAvatar,
                    doctorSpeciality: appointments[choice].doctorSpeciality,
                  });
                  setIsOpen(false);
                }}
              >
                Accept
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <AppointmentCard
                navigation={navigation}
                doctorName={item.doctorName}
                doctorSpeciality={item.doctorSpeciality}
                appointmentTime={item.time}
                handleContact={() => {
                  setChoice(index);
                  setIsOpen(true);
                }}
                appointmentPlace={item.hospitalName}
                doctorAvatar={item.doctorAvatar}
                contactInfo={true}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default AppointmentScreen;
