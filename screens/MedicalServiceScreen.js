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
  const [chooseType, setChooseType] = useState(0);
  // const [isInit, setIsInit] = useState(false);

  const serviceDict = {
    all: "All services",
    // athome: "At home",
    generaltest: "General test",
    covidtest: "Covid test",
    prenatalcare: "Pregnant test",
    bloodgiving: "Blood giving",
    // hospital: "Hospital",
    // polyclinic: "Clinic",
    // // drugstore: "Drugstore",
    // gp: "General Practicioner",
    // dental: "Dental Care",
    // pharmacy: "Pharmacy",
    // // physiotherapist: "Physical recovery",
    // polyclinic: "Polyclinic",
    childrencare: "Children test",
    dental: "Detal implant",
    thyroidtest: "Thyroid test",
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
    else if (type === "prenatalcare")
      setQueryList({ ...queryList, type: "prenatal-care" });
    // else if (type === "bloodgiving") setQueryList({ ...queryList, type: "" });
    // else if (type === "generaltest") setQueryList({ ...queryList, type: "" });
    // else if (type === "covidtest") setQueryList({ ...queryList, type: "" });
    // else if (type === "thyroidtest") setQueryList({ ...queryList, type: "" });
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
          renderItem={({ item: [type, serviceName], index }) => {
            return (
              <PopularService
                onPress={() => {
                  handleSetQuery(type);
                  setChooseType(index);
                }}
                isChose={chooseType == index ? 1 : 0}
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
          <Text></Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item) => item.hospitalId}
            renderItem={({ item, index }) => {
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
              // if (index % (Math.floor(Math.random)))

              let name = "";
              if (queryList.type === "bloodgiving") name = "Blood giving";
              else if (queryList.type === "generaltest") name = "General test";
              else if (queryList.type === "covidtest") name = "Covid test";
              else if (queryList.type === "childrencare")
                name = "Children test";
              else if (queryList.type === "denta") name = "Detal implant";
              else if (queryList.type === "thyroidtest") name = "Thyroid test";
              else if (queryList.type === "athome") name = "At home";
              else if (queryList.type === "prenatal-care")
                name = "Pregnant test";
              else name = "";

              // console.log("service:");
              // console.log(serviceName);
              if (
                ["athome", "prenatalcare", "dental"].includes(queryList.type)
              ) {
                if (
                  item.hospitalSpeciality
                    .toLowerCase()
                    .includes(queryList.type) &&
                  item.hospitalName
                    .toLowerCase()
                    .includes(route.params.searchText.toLowerCase())
                ) {
                  return (
                    <HospitalCard
                      {...item}
                      navigation={navigation}
                      serviceName={name}
                      price={Math.floor(Math.random() * 100) + 20}
                    />
                  );
                } else return null;
              } else {
                if (
                  item.hospitalName
                    .toLowerCase()
                    .includes(route.params.searchText.toLowerCase())
                ) {
                  return (
                    <HospitalCard
                      {...item}
                      navigation={navigation}
                      serviceName={name}
                      price={Math.floor(Math.random() * 100) + 20}
                    />
                  );
                }
                return null;
              }
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
