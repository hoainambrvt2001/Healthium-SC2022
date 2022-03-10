import React from "react";
import { View, Image } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { styles, third as localStyle } from "../../styles/StartScreenStyles";

const Third = ({ navigation }) => {
  return (
    <View style={{ ...styles.wrapper, ...localStyle.screen }}>
      <Image
        style={localStyle.centerImage}
        source={require("../../assets/Start/screen3.png")}
        resizeMode="contain"
      />
      <View style={styles.paging}>
        <View style={{ ...styles.pageItem, ...localStyle.li }}></View>
        <View
          style={{
            ...styles.pageItem,
            ...styles.notFirst,
            ...localStyle.li,
          }}
        ></View>
        <View
          style={{
            ...styles.pageItem,
            ...styles.notFirst,
            ...localStyle.li,
            ...localStyle.active,
          }}
        ></View>
      </View>
      <View style={styles.paragraph}>
        <Title style={styles.title}>Take actions</Title>
        <Text style={styles.text}>
          This test allows you to determine your risk of corona virus infection.
        </Text>
      </View>
      <Button
        style={styles.button}
        color="#4B4C4D"
        onPress={() => navigation.navigate("SignIn")}
      >
        Next
      </Button>
    </View>
  );
};

export default Third;
