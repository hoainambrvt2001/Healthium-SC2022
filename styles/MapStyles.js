import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 225,
  },
  map_wrap: {
    marginTop: 8,
  },
  map: {
    width: "100%",
    height: "100%",
    alignContent: "center",
  },
  callout: {
    flexDirection: "row",
    // justifyContent: "space-between",
    width: 300,
    padding: 2,
    height: 100,
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
