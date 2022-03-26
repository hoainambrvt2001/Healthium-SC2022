import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
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
import { addPatient } from "firebaseServices/firestoreApi";

const BoxDivider = ({ height }) => {
  return <View style={{ height: height }}></View>;
};

const CreatePatientScreen = ({
  navigation,
  route: {
    params: { setToggle, toggle },
  },
}) => {
  const [checked, setChecked] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const patientSchema = Yup.object({
    patientName: Yup.string().required("Full name is a required field."),
    patientBirthday: Yup.date().required("Birthday is a required field."),
    patientIdCardNo: Yup.string().required(
      "Id card number is a required field."
    ),
    patientGender: Yup.string().required("Gender is a required field."),
    patientTel: Yup.number().required("Phone number is a required field."),
    patientAddress: Yup.string().required("Address is a required field."),
  });

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
      <Formik
        initialValues={{
          patientName: "",
          patientBirthday: "",
          patientIdCardNo: "",
          patientGender: "Male",
          patientTel: "",
          patientAddress: "",
        }}
        initialTouched={{
          patientName: false,
          patientBirthday: false,
          patientIdCardNo: false,
          patientGender: false,
          patientTel: false,
          patientAddress: false,
        }}
        validationSchema={patientSchema}
        onSubmit={async (values, actions) => {
          addPatient(values, user.uid);
          actions.setSubmitting(false);
          if (setToggle) setToggle(!toggle);
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
              <BoxDivider height={15} />
              <View style={{ alignItems: "center" }}>
                <Avatar.Image
                  size={100}
                  source={
                    values.patientGender === "Male"
                      ? require("assets/man-icon.png")
                      : require("assets/woman-icon.png")
                  }
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#CCCDC6",
                    borderWidth: 1,
                  }}
                />
              </View>
              <BoxDivider height={15} />
              <Title>Basic Detail</Title>
              <Text>Full name</Text>
              <TextInput
                value={values.patientName}
                mode="outlined"
                onChangeText={handleChange("patientName")}
                onBlur={handleBlur("patientName")}
                outlineColor="#CCCDC6"
              />
              <HelperText
                type="error"
                visible={
                  touched.patientName && errors.patientName !== undefined
                }
                padding="none"
              >
                {errors.patientName}
              </HelperText>
              <Text>Date of birth</Text>
              <BoxDivider height={5} />
              <Button
                onPress={() => {
                  setShowDatePicker(true);
                  setFieldTouched("patientBirthday", true);
                }}
                mode="outlined"
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#CCCDC6",
                }}
              >
                {values.patientBirthday
                  ? moment(values.patientBirthday).format("LL")
                  : "Set date"}
              </Button>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    values.patientBirthday ? values.patientBirthday : new Date()
                  }
                  mode={"date"}
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    let currentDate = selectedDate;
                    if (currentDate) {
                      setFieldValue("patientBirthday", selectedDate);
                    }
                  }}
                  maximumDate={new Date()}
                />
              )}
              <HelperText
                type="error"
                visible={touched.patientBirthday && errors.patientBirthday}
                padding="none"
              >
                {errors.patientBirthday}
              </HelperText>
              <Text>ID Card Number</Text>
              <TextInput
                value={values.patientIdCardNo}
                mode="outlined"
                onChangeText={handleChange("patientIdCardNo")}
                onBlur={handleBlur("patientIdCardNo")}
                outlineColor="#CCCDC6"
              />
              <HelperText
                type="error"
                visible={
                  touched.patientIdCardNo &&
                  errors.patientIdCardNo !== undefined
                }
                padding="none"
              >
                {errors.patientIdCardNo}
              </HelperText>
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
                      setFieldValue("patientGender", "Male");
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
                      setFieldValue("patientGender", "Female");
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
                value={values.patientTel}
                mode="outlined"
                onChangeText={handleChange("patientTel")}
                onBlur={handleBlur("patientTel")}
                outlineColor="#CCCDC6"
                keyboardType="numeric"
              />
              <HelperText
                type="error"
                visible={touched.patientTel && errors.patientTel !== undefined}
                padding="none"
              >
                {errors.patientTel}
              </HelperText>
              <Text>Address</Text>
              <TextInput
                value={values.patientAddress}
                mode="outlined"
                onChangeText={handleChange("patientAddress")}
                onBlur={handleBlur("patientAddress")}
                outlineColor="#CCCDC6"
              />
              <HelperText
                type="error"
                visible={touched.patientAddress && errors.patientAddress}
                padding="none"
              >
                {errors.patientAddress}
              </HelperText>
              <BoxDivider height={10} />
              <Button mode="contained" onPress={handleSubmit}>
                Submit
              </Button>
              <BoxDivider height={30} />
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreatePatientScreen;
