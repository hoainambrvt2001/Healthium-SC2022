import { StyleSheet } from "react-native";
import { primaryColor } from "./globalStyles";

const defaultBackgroundColor = "#ffffff";

export const textColor = "#a1adc7";
export const titleColor = "#29272e";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: defaultBackgroundColor,
  },
  subtitle: {
    color: textColor,
    fontWeight: "bold",
  },
  logout: {
    width: "100%",
    backgroundColor: "#fafafa",
    padding: 5,
    textAlignVertical: "center",
    marginTop: 24,
    marginBottom: 16,
    fontWeight: "bold",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  wrap: {
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: defaultBackgroundColor,
  },
});

export const avatar = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  visualLayer: {
    width: "100%",
    height: "50%",
    backgroundColor: primaryColor,
    position: "absolute",
    top: 0,
  },
  avatar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export const option = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fafafa",
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
