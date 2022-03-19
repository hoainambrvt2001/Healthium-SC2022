import React from "react";
import { View, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { Title, Paragraph } from "react-native-paper";
import ServiceOption from "components/HomeScreen/ServiceOption";
import NoteCard from "components/HomeScreen/NoteCard";
import { listNotes, listServices } from "components/HomeScreen/CLONEDATA";

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

      <Title style={{ marginLeft: 10 }}>Notifications</Title>

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
            source={require("assets/sms-icon.png")}
            style={{ width: 20, height: 20, marginHorizontal: 5 }}
          />
          <View
            style={{
              marginLeft: 5,
              minHeight: 100,
            }}
          >
            <Title>Doctor A</Title>
            <Paragraph numberOfLines={3}>
              Do ullamco ex velit anim do proident exercitation et anim tempor.
              Lorem sunt deserunt labore non excepteur venia
            </Paragraph>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Title style={{ marginLeft: 10, marginBottom: 10 }}>
        Your health note
      </Title>

      <View
        style={{
          flex: 1,
          marginBottom: 5,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listNotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <NoteCard item={item} minHeight={150} />;
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listNotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <NoteCard item={item} minHeight={250} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
