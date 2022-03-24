import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Title } from "react-native-paper";
import HospitalCard from "components/MedicalService/HospitalCard";
import PopularService from "components/MedicalService/PopularService";
import Activity from "components/MedicalService/Activity";
import { getPlaces, getImage } from "firebaseServices/firestoreApi";

const MedicalServiceScreen = ({ navigation }) => {
  // console.log("params in body");
  // console.log(route);

  const [queryList, setQueryList] = useState({
    queryType: "nearbysearch",
    lat: 10.7697759,
    lng: 106.6563129,
    pageToken: 5,
    radius: 500,
    rankby: "prominence",
    type: "hospital",
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceDict = {
    hospital: "Hospital",
    doctor: "Clinic",
    drugstore: "Drugstore",
    dental: "Dental Care",
    physiotherapist: "Physical recovery",
  };
  // name:"Nutrition Support"},
  // {name:"At-home Service"},
  // {name:"Physical recovery"},
  // {name:"Blood Giving"},{name:"Hospital"},
  // {name:"Dental Care"},
  // {name:"Mental Care"},
  // {name:"Prenal Care"},

  useEffect(() => {
    getPlaces(queryList, setItems, setLoading);
  }, [queryList]);

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
          data={Object.entries(serviceDict)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item: [type, serviceName] }) => {
            return (
              <PopularService
                onPress={() => setQueryList({ ...queryList, type: type })}
                serviceName={serviceName}
              />
            );
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
        {loading ? (
          <Text>loading</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item) => item.place_id}
            renderItem={({
              item: {
                place_id,
                name,
                photos,
                opening_hours,
                geometry: { location },
              },
            }) => {
              // console.log("photots");
              // console.log(photos);
              const photoUrl = photos
                ? getImage({
                    photo_reference: photos[0].photo_reference,
                  })
                : undefined;
              return (
                <HospitalCard
                  place_id={place_id}
                  hospitalImage={photoUrl}
                  hospitalName={name}
                  photoUrl={photoUrl}
                  hospitalStatus={
                    opening_hours ? opening_hours.open_now : false
                  }
                  navigation={navigation}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

// MedicalServiceScreen.defaultProps = {
//   route: {
//     params: {
//       searchText: "",
//     },
//   },
// };

export default MedicalServiceScreen;
