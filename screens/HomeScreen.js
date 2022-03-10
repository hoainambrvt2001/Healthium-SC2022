import React from "react";
import { View, Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { Card, Title, Subheading, Paragraph } from "react-native-paper";

const listServices = [
  {
    img: require("../assets/hospital-icon.png"),
    title: "Find hospital",
  },
  {
    img: require("../assets/record-icon.png"),
    title: "Medical record",
  },
  {
    img: require("../assets/analytic-icon.png"),
    title: "Treatment & Care",
  },
  {
    img: require("../assets/calendar-icon.png"),
    title: "Appointment",
  },
];
const listNotes = [
  {
    id: 1,
    date: "March 2",
    title: "Trung Vuong Hospital",
    description: "Health check",
  },
  {
    id: 2,
    date: "March 2",
    title: "Trung Vuong Hospital",
    description: "Health check",
  },
];

const ServiceOptions = ({ service, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("SearchHospital");
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image source={service.img} style={{ width: 25, height: 25 }} />
        </View>
        <View>
          <Paragraph>{service.title}</Paragraph>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
            <ServiceOptions
              service={service}
              key={idx}
              navigation={navigation}
            />
          );
        })}
      </View>

      <Title style={{ marginLeft: 10 }}>Notifications</Title>

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
          source={require("../assets/sms-icon.png")}
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

      <Title style={{ marginLeft: 10 }}>Your health note</Title>

      <View
        style={{
          flex: 1,
          marginVertical: 10,
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
              return (
                <Card
                  mode="elevated"
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: "#fafafa",
                    borderRadius: 10,
                    elevation: 4,
                    minHeight: 150,
                    marginTop: item.id != 1 ? 8 : 0,
                    marginBottom: 8,
                  }}
                >
                  <Card.Title title={item.date} />
                  <Card.Content>
                    <Subheading>{item.title}</Subheading>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>
                </Card>
              );
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
              return (
                <Card
                  mode="elevated"
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: "#fafafa",
                    borderRadius: 10,
                    elevation: 4,
                    minHeight: 250,
                    marginTop: item.id != 1 ? 8 : 0,
                    marginBottom: 8,
                  }}
                >
                  <Card.Title title={item.date} />
                  <Card.Content>
                    <Subheading>{item.title}</Subheading>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>
                </Card>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
