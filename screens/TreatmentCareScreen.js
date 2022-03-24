import React from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Title, Paragraph, Avatar } from "react-native-paper";
import { styles } from "styles/TreatmentCareStyle";
import Icon from "react-native-vector-icons/AntDesign";

const TreatmentCareScreen = ({ curUser_id }) => {
  const contactList = [
    {
      name: "Nam 1",
      specility: "asd",
      avatar: "https://placeimg.com/140/140/any",
    },
    {
      name: "Nam 2",
      specility: "asd",
      avatar: "https://placeimg.com/140/140/any",
    },
    {
      name: "Nam 3",
      specility: "asd",
      avatar: "https://placeimg.com/140/140/any",
    },
    {
      name: "Nam 4",
      specility: "asd",
      avatar: "https://placeimg.com/140/140/any",
    },
  ];

  return (
    <FlatList
      data={contactList}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image source={{ uri: item.avatar }} size={60} />
              <View style={styles.info}>
                <Title>{item.name}</Title>
                <Paragraph>{item.specility}</Paragraph>
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
