import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import InfoHospitalCard from "components/Utils/InfoHospitalCard";
import MyMapView from "components/Map/MyMapView";

const HospitalDetailScreen = ({
  route: {
    params: { place_id, photoUrl },
  },
  hospitalBackground,
}) => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getinfo = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=address_component,formatted_address,name,geometry,photo,rating,opening_hours/open_now,international_phone_number,formatted_phone_number&key=AIzaSyAWaAtaKV8BYTY2nDCmVtA5WW0M4yyi4Y0`;

      setLoading(true);
      const result = await fetch(url)
        .then((response) => response.json())
        .catch((e) => console.log(e));

      setInfo({ ...result.result });
      setLoading(false);
    };
    getinfo();
  }, []);

  // console.log("info");
  // console.log(info);
  console.log("photo url");
  console.log(photoUrl);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          minHeight: 230,
        }}
      >
        <Image
          source={photoUrl ? { uri: photoUrl } : hospitalBackground}
          style={{ width: "100%", height: 160 }}
        />
        <View style={{ position: "absolute", top: 80 }}>
          <InfoHospitalCard
            hospitalAddress={info.formatted_address}
            hospitalName={info.name}
            hospitalContact={
              info.formatted_phone_number ||
              info.international_phone_number ||
              "unknown"
            }
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Title>Overview</Title>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Paragraph>
        <Title>Location</Title>
        <Paragraph>{info.formatted_address}</Paragraph>
        <Title>Map</Title>
        {loading ? (
          <Text>loading</Text>
        ) : (
          <MyMapView
            place_id={place_id}
            name={info.name}
            rating={info.rating}
            geometry={info.geometry}
            photoUrl={photoUrl}
          />
        )}
      </View>
    </View>
  );
};

HospitalDetailScreen.defaultProps = {
  route: {
    params: {
      place_id: "ChIJ09_Ur8QudTER54hAhHDo7Pw",
      photoUrl: undefined,
      // place Id of Trung vuong hospital
    },
  },
  hospitalBackground: require("assets/background-img.png"),
};

export default HospitalDetailScreen;
