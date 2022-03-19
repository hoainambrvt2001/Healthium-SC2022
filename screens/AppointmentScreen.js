import React from "react";
import { View, Text, FlatList } from "react-native";
import AppointmentCard from "components/Utils/AppointmentCard";

const AppointmentScreen = ({ navigation }) => {
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return (
              <AppointmentCard navigation={navigation} contactInfo={true} />
            );
          }}
        />
      </View>
    </View>
  );
};

export default AppointmentScreen;
