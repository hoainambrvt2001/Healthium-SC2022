import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Title } from "react-native-paper";
import HospitalCard from "components/MedicalService/HospitalCard";
import PopularService from "components/MedicalService/PopularService";
import Activity from "components/MedicalService/Activity";
import {
  getPlaces,
  getImage,
  getFacilities,
} from "firebaseServices/firestoreApi";

const MedicalServiceScreen = ({ navigation, route }) => {
  // console.log("params in body");
  // console.log(route);

  const [queryList, setQueryList] = useState({
    type: "",
    activity: "",
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isInit, setIsInit] = useState(false);

  const serviceDict = {
    all: "All services",
    hospital: "Hospital",
    polyclinic: "Clinic",
    // drugstore: "Drugstore",
    gp: "General Practicioner",
    dental: "Dental Care",
    pharmacy: "Pharmacy",
    // physiotherapist: "Physical recovery",
    athome: "At home",
    polyclinic: "Polyclinic",
    prenentalcare: "Prenental Care",
    childrencare: "Children Care",
  };

  const activityDict = {
    nearby: "Near by",
    mostrating: "Most rating",
    recently: "Recently visit",
    insurance: "Insurance app",
  };
  // name:"Nutrition Support"},
  // {name:"At-home Service"},
  // {name:"Physical recovery"},
  // {name:"Blood Giving"},{name:"Hospital"},
  // {name:"Dental Care"},
  // {name:"Mental Care"},
  // {name:"Prenal Care"},

  // getFacilities(setItems);

  useEffect(() => {
    const getInit = async () => {
      // if (isInit) return;
      setLoading(true);
      await getFacilities().then((data) => setItems([...data]));
      setLoading(false);
      // setIsInit(true);
    };
    getInit();
  }, []);

  const handleSetQuery = (type) => {
    if (type === "athome") setQueryList({ ...queryList, type: "at-home" });
    else if (type === "childrencare")
      setQueryList({ ...queryList, type: "children-care" });
    else if (type === "all") setQueryList({ ...queryList, type: "" });
    else setQueryList({ ...queryList, type: type });
  };

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
                onPress={() => handleSetQuery(type)}
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
          data={Object.entries(activityDict)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item: [type, activityName] }) => {
            return (
              <Activity
                activityName={activityName}
                onPress={() => {
                  setQueryList({ ...queryList, activity: type });
                }}
              />
            );
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
            keyExtractor={(item) => item.hospitalId}
            renderItem={({ item }) => {
              // console.log("photots");
              // console.log(photos);
              // const photoUrl = photos
              //   ? getImage({
              //       photo_reference: photos[0].photo_reference,
              //     })
              //   : undefined;
              // console.log("here");
              // console.log(queryList.type);
              // console.log(route.params.searchText);
              if (
                item.hospitalSpeciality
                  .toLowerCase()
                  .includes(queryList.type) &&
                item.hospitalName
                  .toLowerCase()
                  .includes(route.params.searchText.toLowerCase())
              ) {
                // console.log("in if");
                return <HospitalCard {...item} navigation={navigation} />;
              }
              return null;
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
