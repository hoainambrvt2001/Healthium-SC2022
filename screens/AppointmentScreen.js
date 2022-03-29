import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Button,
  Snackbar,
} from "react-native-paper";
import AppointmentCard from "components/Utils/AppointmentCard";
import {
  getAppointments,
  deleteAppointment,
} from "firebaseServices/firestoreApi";

const AppointmentScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [choice, setChoice] = useState(-1);
  const [deleteChoice, setDeleteChoice] = useState(-1);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await getAppointments().then((data) => {
        // console.log("data");
        // console.log(data);
        setAppointments([...data]);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (choice === -1) return;
    navigation.navigate("Chat", {
      userId: appointments[choice].userId,
      doctorId: appointments[choice].doctorId,
      doctorName: appointments[choice].doctorName,
      doctorAvatar: appointments[choice].doctorAvatar,
      doctorSpeciality: appointments[choice].doctorSpeciality,
    });
  }, [choice]);

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
            Upcoming
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
            <Dialog.Title>Cancel appointment</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Do you want to cancel this appointment?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsOpen(false)}>Cancel</Button>
              <Button
                onPress={async () => {
                  // navigation.navigate("Chat", {
                  //   userId: appointments[choice].userId,
                  //   doctorId: appointments[choice].doctorId,
                  //   doctorName: appointments[choice].doctorName,
                  //   doctorAvatar: appointments[choice].doctorAvatar,
                  //   doctorSpeciality: appointments[choice].doctorSpeciality,
                  // });
                  await deleteAppointment(
                    appointments[deleteChoice].userId,
                    appointments[deleteChoice].id
                  ).then(() => {
                    console.log(temp);
                    const temp = appointments;
                    temp.splice(deleteChoice, 1);
                    setAppointments([...temp]);
                    setDeleteChoice(-1);
                    setDeleted(true);
                  });
                  setIsOpen(false);
                }}
              >
                Accept
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {/* <Portal>
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
        </Portal> */}
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
                handleContact={async () => {
                  setChoice(index);
                  // setIsOpen(true);
                }}
                handleCancel={() => {
                  setDeleteChoice(index);
                  setIsOpen(true);
                }}
                appointmentPlace={item.hospitalName}
                doctorAvatar={item.doctorAvatar}
                contactInfo={true}
              />
            );
          }}
        />
        <Snackbar
          visible={deleted}
          onDismiss={() => setDeleted(false)}
          action={{
            label: "Hide",
            onPress: () => {
              // Do something
              setDeleted(false);
            },
          }}
        >
          Cancel appointment success!
        </Snackbar>
      </View>
    </View>
  );
};

export default AppointmentScreen;
