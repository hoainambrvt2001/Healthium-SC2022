import { StyleSheet } from "react-native";

export const primaryColor = "#00a19d";

export const defaultBackgroundColor = "#ffffff";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    backgroundColor: primaryColor,
  },
});
