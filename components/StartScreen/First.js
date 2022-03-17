import React from "react";
import { View, Image } from "react-native";
import { Text, Title, Button } from "react-native-paper";
import { styles, first as localStyle } from "styles/StartScreenStyles";

const First = ({ setPage }) => {
  return (
    <View style={{ ...styles.wrapper, ...localStyle.screen }}>
      <Image
        style={localStyle.centerImage}
        source={require("assets/Start/screen1.png")}
        resizeMode="contain"
      />
      <View style={styles.paging}>
        <View
          style={{ ...styles.pageItem, ...localStyle.li, ...localStyle.active }}
        ></View>
        <View
          style={{ ...styles.pageItem, ...styles.notFirst, ...localStyle.li }}
        ></View>
        <View
          style={{ ...styles.pageItem, ...styles.notFirst, ...localStyle.li }}
        ></View>
      </View>
      <View style={styles.paragraph}>
        <Title style={styles.title}>Take the test</Title>
        <Text style={styles.text}>
          This test allows you to determine your risk of corona virus infection.
        </Text>
      </View>
      <Button style={styles.button} color="#4B4C4D" onPress={() => setPage(1)}>
        Next
      </Button>
    </View>
  );
};

export default First;
