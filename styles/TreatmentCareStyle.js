import { StyleSheet } from "react-native";

export const defaultBackgroundColor = "#ffffff";

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(220,220,220)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    marginLeft: 8,
  },
});
