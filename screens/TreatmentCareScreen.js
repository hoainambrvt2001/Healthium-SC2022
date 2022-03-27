import React, { useState, useEffect } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Title, Paragraph, Avatar } from "react-native-paper";
import { styles } from "styles/TreatmentCareStyle";
import Icon from "react-native-vector-icons/AntDesign";
import { getContactList } from "firebaseServices/firestoreApi";

const TreatmentCareScreen = ({ navigation }) => {
  // const contactList = [
  //   {
  //     name: "Nam 1",
  //     specility: "asd",
  //     avatar: "https://placeimg.com/140/140/any",
  //   },
  //   {
  //     name: "Nam 2",
  //     specility: "asd",
  //     avatar: "https://placeimg.com/140/140/any",
  //   },
  //   {
  //     name: "Nam 3",
  //     specility: "asd",
  //     avatar: "https://placeimg.com/140/140/any",
  //   },
  //   {
  //     name: "Nam 4",
  //     specility: "asd",
  //     avatar: "https://placeimg.com/140/140/any",
  //   },
  // ];

  // getContactList();

  const [loading, setLoading] = useState(true);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      await getContactList().then((data) => setContactList([...data]));
    };
    getList();
  }, []);

  return (
    <FlatList
      data={contactList}
      keyExtractor={(item) => item.doctorId}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate("Chat", {
                userId: item.userId,
                doctorId: item.doctorId,
                doctorName: item.doctorName,
                doctorAvatar: item.doctorAvatar,
                doctorSpeciality: item.doctorSpeciality,
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image
                source={
                  item.doctorAvatar !== ""
                    ? { uri: item.doctorAvatar }
                    : require("assets/doctor-avatar.png")
                }
                size={60}
              />
              <View style={styles.info}>
                <Title>{item.doctorName}</Title>
                <Paragraph>{item.doctorSpeciality}</Paragraph>
              </View>
            </View>
            <Icon name="right" size={24} color="rgb(230,230,230)" />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default TreatmentCareScreen;
