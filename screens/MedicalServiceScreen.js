import React from "react";
import { View, FlatList } from "react-native";
import { Title } from "react-native-paper";
import HospitalCard from "components/MedicalService/HospitalCard";
import PopularService from "components/MedicalService/PopularService";
import Activity from "components/MedicalService/Activity";

const MedicalServiceScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Title style={{ marginLeft: 10, marginVertical: 10 }}>
        Popular services
      </Title>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginBottom: 10,
        }}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return <PopularService />;
          }}
        />
      </View>
      <Title style={{ marginLeft: 10, marginBottom: 10 }}>Activities</Title>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 18,
          marginBottom: 20,
        }}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return <Activity />;
          }}
        />
      </View>
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item}
          renderItem={() => {
            return <HospitalCard navigation={navigation} />;
          }}
        />
      </View>
    </View>
  );
};

export default MedicalServiceScreen;
