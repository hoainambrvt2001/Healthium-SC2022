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
            alignItems: "baseline",
            elevation: 4,
            backgroundColor: "#fafafa",
            marginVertical: 10,
            marginHorizontal: 25,
            padding: 10,
            borderRadius: 10,
            
          }}
        >
          <Image
            source={require("assets/NOTI.png")}
            style={{ width: 70, height: 70, marginHorizontal: 5 }}
          />
          <View
            style={{
              marginLeft: 5,
              minHeight: 60,
              
            }}
          >
           
            <Paragraph numberOfLines={3}>
            View the latest health news and explore articles on parenting medicine, diseases and healthy living,.. with Healthium.
            </Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeScreen;

