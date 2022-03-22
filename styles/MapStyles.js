import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    width: "100%",
    height: 225,
    // paddingLeft: "5%",
    // paddingRight: "5%",
  },
  map_wrap: {
    marginTop: 8,
    // paddingLeft: "5%",
    // paddingRight: "5%",
  },
  map: {
    width: "100%",
    height: "100%",
    alignContent: "center",
  },
  callout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  callout_image: {
    width: 100,
    height: 100,
    // maxWidth: "40%",
  },
  callout_detail: {
    marginLeft: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
  },
  para: {
    // fontWeight: "700",
    // fontSize: 15,
  },
});
