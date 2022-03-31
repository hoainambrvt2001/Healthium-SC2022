import React from "react";
import {
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
} from "react-native";
import { Title, Paragraph } from "react-native-paper";
import ServiceOption from "components/HomeScreen/ServiceOption";
import NoteCard from "components/HomeScreen/NoteCard";
import { listNotes, listServices } from "components/Utils/CLONEDATA";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          backgroundColor: "#fafafa",
          margin: 10,
          padding: 10,
          elevation: 4,
          borderRadius: 10,
        }}
      >
        {listServices.map((service, idx) => {
          return (
            <ServiceOption
              service={service}
              key={idx}
              navigation={navigation}
            />
          );
        })}
      </View>

      <Title style={{ marginLeft: 10 }}>Medical News</Title>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("NotificationScreen")}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",

            backgroundColor: "#fafafa",
            marginVertical: 10,
            marginHorizontal: 25,
            padding: 10,
            borderRadius: 10,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Image
            source={require("assets/NOTI.png")}
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              marginLeft: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 15,
            }}
          >
            <Paragraph numberOfLines={4}>
              View the latest health news and explore articles on parenting
              medicine, diseases and healthy living,.. with Healthium.
            </Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeScreen;
