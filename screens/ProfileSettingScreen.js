import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Avatar,
  RadioButton,
  TextInput,
  Title,
  Button,
  HelperText,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import {
  getUserAvatar,
  getUserInfo,
  updateUserInfo,
} from "firebaseServices/firestoreApi";
import * as ImagePicker from "expo-image-picker";

const BoxDivider = ({ height }) => {
  return <View style={{ height: height }}></View>;
};

const ProfileSettingScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    birthday: "",
    idCardNumber: "",
    gender: "",
    phoneNumber: "",
    address: "",
  });
  const [userAvatar, setUserAvatar] = useState("");
  const [checked, setChecked] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getUserInfomation = async () => {
      await getUserInfo(user.uid)
        .then((infos) => {
          setUserInfo({
            name: infos.name,
            birthday: infos.birthday ? infos.birthday.toDate() : "",
            idCardNumber: infos.idCardNumber,
            gender: infos.gender,
            phoneNumber: infos.phoneNumber,
            address: infos.address,
          });
          setUserAvatar(infos.avatar);
        })
        .catch((errors) => {
          console.log(errors);
        });
    };
    getUserInfomation();
  }, []);

  const userInfoSchema = Yup.object({
    name: Yup.string().required("Full name is a required field."),
    birthday: Yup.date(),
    idCardNumber: Yup.string(),
    gender: Yup.string(),
    phoneNumber: Yup.number(),
    address: Yup.string(),
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserAvatar(result.uri);
    }
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
      <Formik
        initialValues={userInfo}
        enableReinitialize={true}
        initialTouched={{
          name: false,
        }}
        validationSchema={userInfoSchema}
        onSubmit={(values, actions) => {
          updateUserInfo(values, user.uid, userAvatar);
          actions.setSubmitting(false);
          navigation.goBack();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          values,
          errors,
          touched,
        }) => {
          return (
            <>
              <View
                style={{
                  paddingVertical: 15,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity activeOpacity={0.6} onPress={pickImage}>
                  <View>
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
                    <Avatar.Icon
                      size={26}
                      icon="camera"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: "10%",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Title>Basic Detail</Title>
              <Text>Name</Text>
              <TextInput
                value={values.name}
                mode="outlined"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                outlineColor="#CCCDC6"
              />
              <HelperText
                type="error"
                visible={touched.name && errors.name !== undefined}
                padding="none"
              >
                {errors.name}
              </HelperText>
              <Text>Date of birth</Text>
              <BoxDivider height={5} />
              <Button
                onPress={() => {
                  setShowDatePicker(true);
                  setFieldTouched("birthday", true);
                }}
                mode="outlined"
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#CCCDC6",
                }}
              >
                {values.birthday
                  ? moment(values.birthday).format("LL")
                  : "Set date"}
              </Button>
              {showDatePicker && (
                <DateTimePicker
                  value={values.birthday ? values.birthday : new Date()}
                  mode={"date"}
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    let currentDate = selectedDate;
                    if (currentDate) {
                      setFieldValue("birthday", selectedDate);
                    }
                  }}
                  maximumDate={new Date()}
                />
              )}
              <BoxDivider height={15} />
              <Text>ID Card Number</Text>
              <TextInput
                value={values.idCardNumber}
                mode="outlined"
                onChangeText={handleChange("idCardNumber")}
                onBlur={handleBlur("idCardNumber")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={15} />
              <Text>Gender</Text>
              <BoxDivider height={5} />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#CCCDC6",
                  }}
                >
                  <RadioButton.Item
                    value="male"
                    status={checked === 0 ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(0);
                      setFieldValue("gender", "Male");
                    }}
                    label="Male"
                    position="leading"
                  />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#CCCDC6",
                    marginHorizontal: 10,
                  }}
                >
                  <RadioButton.Item
                    value="female"
                    status={checked === 1 ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(1);
                      setFieldValue("gender", "Female");
                    }}
                    label="Female"
                    position="leading"
                  />
                </View>
              </View>
              <BoxDivider height={15} />
              <Title>Contact Detail</Title>
              <Text>Mobile number</Text>
              <TextInput
                value={values.phoneNumber}
                mode="outlined"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                outlineColor="#CCCDC6"
                keyboardType="numeric"
              />
              <BoxDivider height={15} />
              <Text>Address</Text>
              <TextInput
                value={values.address}
                mode="outlined"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                outlineColor="#CCCDC6"
              />
              <BoxDivider height={30} />
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

export default ProfileSettingScreen;
