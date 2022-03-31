import { StyleSheet } from "react-native";

export const primaryColor = "#00a19d";

export const defaultBackgroundColor = "#ffffff";

export const styles = StyleSheet.create({
  left: {
    backgroundColor: "rgb(240,240,240)",
    maxWidth: "60%",
    padding: 8,
    borderRadius: 8,
  },
  right: {
    backgroundColor: primaryColor,
    maxWidth: "60%",
    padding: 8,
    borderRadius: 8,
  },
  leftText: {
    fontSize: 16,
  },
  rightText: {
    fontSize: 16,
    color: "white",
    textAlign: "right",
  },
  dateLeft: {
    fontSize: 10,
    color: "rgb(155,155,155)",
  },
  dateRight: {
    fontSize: 10,
    color: "white",
  },
  info: {
    paddingBottom: 16,
    backgroundColor: primaryColor,
    flexDirection: "row",
  },
  detail: {
    marginLeft: 8,
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "white",
  },
  send: {
    padding: 4,
  },
});
