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

      {/* <View
        style={{
          flex: 1,
          marginBottom: 5,
          flexDirection: "row",
        }}
      > */}
      {/* <FlatList
        data={[1]}
        keyExtractor={(item) => item}
        renderItem={() => {
          const listItems = listNotes.map((ele) => {
            return (
              <>
                <View
                  style={{
                    margin: 8,
                    backgroundColor: "#fafafa",
                    borderRadius: 10,
                    elevation: 4,
                    backgroundColor: "#FFFAFA",
                    flexWrap: "wrap",
                    maxWidth: "40%",
                  }}
                >
                  <Text>{ele.title}</Text>
                  <Text>{ele.description}</Text>
                </View>
              </>
            );
          });
          return [...listItems];
        }}
      /> */}
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 16,
          }}
        >
          {listNotes.map((ele, index) => {
            return (
              <>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "#fafafa",
                    borderRadius: 10,
                    elevation: 4,
                    backgroundColor: "#FFFAFA",
                    maxWidth: "80%",
                    marginTop: index === 0 ? 0 : 16,
                  }}
                >
                  <Title style={{ color: "#7B6BA8" }}>{ele.title}</Title>
                  <Paragraph style={{ color: "#7B6BA8" }}>
                    {ele.description}
                  </Paragraph>
                </View>
                {/* <NoteCard item={ele} minHeight={150} /> */}
              </>
            );
          })}
        </View>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={listNotes}
          keyExtractor={(_, idx) => idx}
          renderItem={({ item }) => {
            return <NoteCard item={item} minHeight={150} />;
          }}
        /> */}
      </ScrollView>
      {/* <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listNotes}
            keyExtractor={(_, idx) => idx}
            renderItem={({ item }) => {
              return <NoteCard item={item} minHeight={250} />;
            }}
          />
        </View> */}
      {/* </View> */}
    </View>
  );
};

export default HomeScreen;
