import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, TextInput, Title, Button } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { Formik } from "formik";
import {
  addMedicalRecord,
  getMedicalRecord,
} from "firebaseServices/firestoreApi";

const BoxDivider = ({ height }) => {
  return <View style={{ height: height }}></View>;
};

const CreateMedicalRecordScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [medicalRecord, setMedicalRecord] = useState({
    temperature: "",
    temperatureMeasureTime: "",
    SPO2: "",
    SPO2MeasureTime: "",
    heartRate: "",
    heartRateMeasureTime: "",
    bloodSugar: "",
    bloodSugarMeasureTime: "",
    bloodPressure: "",
    bloodPressureMeasureTime: "",
    height: "",
    heightMeasureTime: "",
  });
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getMR = async () => {
      await getMedicalRecord(user.uid)
        .then((data) => {
          if (data) {
            setMedicalRecord(data.medicalRecord);
            setUserAvatar(data.userAvatar);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMR();
  }, []);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
      <Formik
        initialValues={medicalRecord}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          addMedicalRecord(values, user.uid);
          actions.setSubmitting(false);
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => {
          return (
            <>
              <BoxDivider height={15} />
              <View style={{ alignItems: "center" }}>
                <Avatar.Image
                  size={100}
                  source={
                    userAvatar
                      ? { uri: userAvatar }
                      : require("assets/avatar.png")
                  }
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#CCCDC6",
                    borderWidth: 1,
                  }}
                />
              </View>
              <BoxDivider height={15} />
              <Title>Temperature (oC)</Title>
              <Text>Measure value:</Text>
              <TextInput
                value={values.temperature}
                mode="outlined"
                onChangeText={handleChange("temperature")}
                onBlur={handleBlur("temperature")}
                outlineColor="#CCCDC6"
              />
              <Text>Measure time: </Text>
              <TextInput
                value={values.temperatureMeasureTime}
                mode="outlined"
                onChangeText={handleChange("temperatureMeasureTime")}
                onBlur={handleBlur("temperatureMeasureTime")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={10} />
              <Title>SPO2 (%)</Title>
              <Text>Measure value:</Text>
              <TextInput
                value={values.SPO2}
                mode="outlined"
                onChangeText={handleChange("SPO2")}
                onBlur={handleBlur("SPO2")}
                outlineColor="#CCCDC6"
              />
              <Text>Measure time: </Text>
              <TextInput
                value={values.SPO2MeasureTime}
                mode="outlined"
                onChangeText={handleChange("SPO2MeasureTime")}
                onBlur={handleBlur("SPO2MeasureTime")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={10} />
              <Title>Heart rate (beats/minute)</Title>
              <Text>Measure value:</Text>
              <TextInput
                value={values.heartRate}
                mode="outlined"
                onChangeText={handleChange("heartRate")}
                onBlur={handleBlur("heartRate")}
                outlineColor="#CCCDC6"
              />
              <Text>Measure time: </Text>
              <TextInput
                value={values.heartRateMeasureTime}
                mode="outlined"
                onChangeText={handleChange("heartRateMeasureTime")}
                onBlur={handleBlur("heartRateMeasureTime")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={10} />
              <Title>Blood sugar (mg/DL)</Title>
              <Text>Measure value:</Text>
              <TextInput
                value={values.bloodSugar}
                mode="outlined"
                onChangeText={handleChange("bloodSugar")}
                onBlur={handleBlur("bloodSugar")}
                outlineColor="#CCCDC6"
              />
              <Text>Measure time: </Text>
              <TextInput
                value={values.bloodSugarMeasureTime}
                mode="outlined"
                onChangeText={handleChange("bloodSugarMeasureTime")}
                onBlur={handleBlur("bloodSugarMeasureTime")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={10} />
              <Title>Blood presssure (mmHg)</Title>
              <Text>Measure value:</Text>
              <TextInput
                value={values.bloodPressure}
                mode="outlined"
                onChangeText={handleChange("bloodPressure")}
                onBlur={handleBlur("bloodPressure")}
                outlineColor="#CCCDC6"
              />
              <Text>Measure time: </Text>
              <TextInput
                value={values.bloodPressureMeasureTime}
                mode="outlined"
                onChangeText={handleChange("bloodPressureMeasureTime")}
                onBlur={handleBlur("bloodPressureMeasureTime")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={10} />
              <Title>Height (Cm)</Title>
              <Text>Measure value:</Text>
              <TextInput
                value={values.height}
                mode="outlined"
                onChangeText={handleChange("height")}
                onBlur={handleBlur("height")}
                outlineColor="#CCCDC6"
              />
              <Text>Measure time: </Text>
              <TextInput
                value={values.heightPressureMeasureTime}
                mode="outlined"
                onChangeText={handleChange("heightMeasureTime")}
                onBlur={handleBlur("heightMeasureTime")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={40} />
              <Button mode="contained" onPress={handleSubmit}>
                Save
              </Button>
              <BoxDivider height={30} />
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreateMedicalRecordScreen;
