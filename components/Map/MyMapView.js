import { FlatList, View, Text, Image } from "react-native";
import { Title } from "react-native-paper";
import { useState, useEffect } from "react";
import { styles } from "../../styles/MapStyles";
import MapView, { Marker, Callout } from "react-native-maps";

const CustomCallout = ({ name, rating }) => {
  return (
    <View style={styles.callout}>
      {/* <View style={styles.callout_image}> */}
      <Image
        source={require("assets/trung-vuong-hospital.png")}
        style={styles.callout_image}
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

const MyMapView = ({ initLat, initLng }) => {
  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;
  const [hosLst, setHosLst] = useState([]);

  //   type Camera = {
  //   //   center: {
  //   //      latitude: number,
  //   //      longitude: number,
  //   //  },
  //   //  pitch: number,
  //   //  heading: number,

  //    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
  //    altitude: 8,

  //    // Only when using Google Maps.
  //    zoom: 15
  // }

  useEffect(() => {
    const initMap = () => {
      const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
      const location = `location=${initLat},${initLng}`;
      const radius = "&radius=2000";
      const type = "&keyword=hospital";
      const key = "&key=AIzaSyAWaAtaKV8BYTY2nDCmVtA5WW0M4yyi4Y0";
      const hospitalSearchUrl = url + location + radius + type + key;
      console.log(hospitalSearchUrl);
      fetch(hospitalSearchUrl)
        .then((response) => response.json())
        .then(({ results }) => setHosLst(results));
    };
    initMap();
  }, []);

  return (
    <View style={{ ...styles.container }}>
      {/* <Title>Map</Title> */}
      <View style={styles.map_wrap}>
        {hosLst.length === 0 ? (
          <Text>Loading</Text>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: hosLst[0].geometry.location.lat,
              longitude: hosLst[0].geometry.location.lng,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            initialCamera={{
              center: {
                latitude: hosLst[0].geometry.location.lat,
                longitude: hosLst[0].geometry.location.lng,
              },
              zoom: 15,
            }}
          >
            {hosLst.map(
              ({ geometry: { location }, name, rating, place_id }) => (
                <Marker
                  key={place_id}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                >
                  <Callout>
                    <CustomCallout name={name} rating={rating} />
                  </Callout>
                </Marker>
              )
            )}
          </MapView>
        )}
      </View>
    </View>
  );
};

MyMapView.defaultProps = {
  initLat: 37.78825,
  initLng: -122.4324,
};

export default MyMapView;
