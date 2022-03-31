import { FlatList, View, Text, Image, Dimensions } from "react-native";
import { Title } from "react-native-paper";
import { useState, useEffect } from "react";
import { styles } from "../../styles/MapStyles";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

const CustomCallout = ({ name, rating, photoUrl }) => {
  return (
    <View style={styles.callout}>
      {/* <View style={styles.callout_image}> */}
      {/* <View style={{ width: 100, height: 100, position: "relative" }}> */}
      <Text
        style={{
          position: "relative",
          width: 100,
          height: 200,
          bottom: 50,
        }}
      >
        <Image
          source={{ uri: photoUrl }}
          style={{
            width: 100,
            height: 100,
            // resizeMode: "cover",
            // resizeMode: "center",
            // marginBottom: -50,
          }}
          borderRadius={3}
        />
      </Text>
      {/* </View> */}
      {/* </View> */}
      {/* <Text>haha</Text> */}
      <View
        style={{
          marginLeft: 4,
          width: 200,
        }}
      >
        <Title style={{ flexShrink: 1, fontSize: 14, lineHeight: 15 }}>
          {name}
        </Title>
        <Text style={{ fontSize: 12, lineHeight: 13 }}>Rating: {rating}</Text>
      </View>
    </View>
  );
};

const MyMapView = ({
  hospitalId,
  hospitalName,
  userRating,
  lat,
  lng,
  hospitalPhoto,
}) => {
  const { width } = Dimensions.get("window");
  const latitudeDelta = 0.01;
  const longitudeDelta = latitudeDelta * (width / 225);

  return (
    <View style={{ ...styles.container }}>
      {/* <Title>Map</Title> */}
      <View style={styles.map_wrap}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          <Marker
            // key={hospitalId}
            coordinate={{
              latitude: Number(lat),
              longitude: Number(lng),
            }}
          >
            <Callout>
              <CustomCallout
                name={hospitalName}
                rating={userRating}
                photoUrl={hospitalPhoto}
              />
            </Callout>
          </Marker>
        </MapView>
      </View>
    </View>
  );
};

// MyMapView.defaultProps = {
//   place_id: "ChIJ09_Ur8QudTER54hAhHDo7Pw",
//   name: "Trung Vuong Hospital",
//   rating: 5,
//   // defaultPhoto: require("assets/trung-vuong-hospital.png"),
// };

export default MyMapView;
