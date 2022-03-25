import { FlatList, View, Text, Image, Dimensions } from "react-native";
import { Title } from "react-native-paper";
import { useState, useEffect } from "react";
import { styles } from "../../styles/MapStyles";
import MapView, { Marker, Callout } from "react-native-maps";

const CustomCallout = ({ name, rating, photoUrl }) => {
  return (
    <View style={styles.callout}>
      {/* <View style={styles.callout_image}> */}
      <Image
        source={{ uri: photoUrl }}
        style={{ width: 100, height: 100, resizeMode: "cover" }}
        borderRadius={3}
      />
      {/* </View> */}
      {/* <Text>haha</Text> */}
      <View style={{ flex: 1 }}>
        <Title>{name}</Title>
        <Text>Rating: {rating}</Text>
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
