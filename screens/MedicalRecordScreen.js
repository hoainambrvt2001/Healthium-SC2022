import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Avatar, FAB, Title } from "react-native-paper";
import MedicalHistory from "components/MedicalRecord/MedicalHistory";
import OverviewSection from "components/MedicalRecord/OverviewSection";
import { getAuth } from "firebase/auth";
import { getMedicalRecord, getUserInfo } from "firebaseServices/firestoreApi";

const getAge = (birthday) => {
  const today = new Date();
  const birthDate = birthday.toDate();
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const MedicalRecordScreen = ({ navigation }) => {
  const [medicalRecord, setMedicalRecord] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [chosenOption, setChosenOption] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getUserInfomation = async () => {
      await getUserInfo(user.uid)
        .then((info) => {
          setUserInfo(info);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserInfomation();

    const getUserMedicalRecord = async () => {
      await getMedicalRecord(user.uid)
        .then((data) => {
          setMedicalRecord(data.medicalRecord);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const unsubscribe = navigation.addListener("focus", () => {
      return getUserMedicalRecord();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#00a19d" }}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Avatar.Image
          source={
            userInfo.avatar
              ? { uri: userInfo.avatar }
              : require("assets/avatar.png")
          }
          backgroundColor={"#ffff"}
        />
        <View style={{ marginHorizontal: 10 }}>
          <Title style={{ color: "#ffffff" }}>{userInfo.name}</Title>
          <Text style={{ color: "#ffffff" }}>
            Me {userInfo.gender ? `-${userInfo.gender}` : null}
            {userInfo.birthday
              ? `- ${getAge(userInfo.birthday)} year olds`
              : null}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "#f5f7fd",
        }}
        showsHorizontalScrollIndicator={false}
      >
        {[
          { title: "Overview" },
          {
            /* { title: "Medical history" },
          { title: "Covid-19 Vacination" }, */
          },
        ].map((item, idx) => {
          return (
            <TouchableWithoutFeedback
              key={idx}
              onPress={() => {
                setChosenOption(idx);
              }}
            >
              <View
                style={{
                  marginRight: 20,
                  borderBottomColor: chosenOption === idx ? "#00a19d" : null,
                  borderBottomWidth: chosenOption === idx ? 3 : null,
                }}
              >
                <Title
                  style={{
                    color: chosenOption === idx ? "#00a19d" : "#000000",
                    height: 40,
                  }}
                >
                  {item.title}
                </Title>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>

      {chosenOption === 0 ? (
        <OverviewSection medicalRecord={medicalRecord} />
      ) : (
        <MedicalHistory />
      )}

      <FAB
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          margin: 16,
          // marginBottom: 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        icon="plus"
        onPress={() => navigation.navigate("CreateMedicalRecord")}
      />
    </View>
  );
};

export default MedicalRecordScreen;
