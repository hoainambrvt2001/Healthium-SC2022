import { StyleSheet } from "react-native";
import { primaryColor } from "./globalStyles";

const defaultBackgroundColor = "#e5ecf8";

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
    fontWeight: "700",
    paddingBottom: 8,
  },
  logout: {
    width: "100%",
    backgroundColor: "white",
    padding: 8,
    textAlignVertical: "center",
    marginTop: 24,
    marginBottom: 16,
    fontWeight: "700",
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
    backgroundColor: "white",
    padding: 16,
    marginTop: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
