import React from "react";
import {
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  Linking,
} from "react-native";
import { Title, Paragraph } from "react-native-paper";
import ServiceOption from "components/HomeScreen/ServiceOption";
import NoteCard from "components/HomeScreen/NoteCard";
import { listNotes, listServices } from "components/Utils/CLONEDATA";

const Noti = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        // onPress={() => navigation.navigate("NotificationScreen")}
        onPress={() =>
          Linking.openURL(
            "https://edition.cnn.com/2022/03/24/health/evusheld-unused/index.html"
          )
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",

            backgroundColor: "#fafafa",
            marginVertical: 10,
            marginHorizontal: 25,
            padding: 10,
            borderRadius: 10,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        >
          <Image
            source={require("assets/sms-icon.png")}
            style={{ width: 20, height: 20, marginLeft: 5 }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          >
            <Title>Health Check</Title>
            <Paragraph numberOfLines={4}>
              Vulnerable Americans are desperate to find this Covid-19 drug.
              Thousands of boxes are sitting around unused.
            </Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        // onPress={() => navigation.navigate("NotificationScreen")}
        onPress={() =>
          Linking.openURL(
            "https://edition.cnn.com/2022/03/24/health/evusheld-unused/index.html"
          )
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",

            backgroundColor: "#fafafa",
            marginVertical: 10,
            marginHorizontal: 25,
            padding: 10,
            borderRadius: 10,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        >
          <Image
            source={require("assets/sms-icon.png")}
            style={{ width: 20, height: 20, marginLeft: 5 }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          >
            <Title>Health Check</Title>
            <Paragraph numberOfLines={4}>
              Vulnerable Americans are desperate to find this Covid-19 drug.
              Thousands of boxes are sitting around unused.
            </Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Noti;
