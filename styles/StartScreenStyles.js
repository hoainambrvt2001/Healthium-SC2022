import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  paging: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageItem: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  notFirst: {
    marginLeft: 4,
  },
  paragraph: {
    maxWidth: 290,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    paddingBottom: 36,
    paddingTop: 24,
    lineHeight: 26,
  },
  text: {
    textAlign: "center",
    color: "#4B4C4D",
    fontSize: 14,
    lineHeight: 23,
    paddingBottom: 36,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export const first = {
  screen: {
    backgroundColor: "#CDDEFF",
  },
  li: {
    backgroundColor: "#82ACFE",
  },
  active: {
    backgroundColor: "#0659FD",
    width: 24,
  },
  centerImage: {
    marginRight: "10%",
    width: "110%",
    height: 450,
    // backgroundColor: "red",
  },
};

export const second = {
  screen: {
    backgroundColor: "#EBE1F7",
  },
  li: {
    backgroundColor: "#945CD8",
  },
  active: {
    backgroundColor: "#945CD8",
    width: 24,
  },
  centerImage: {
    width: "140%",
    height: 450,
  },
};

export const third = {
  screen: {
    backgroundColor: "#FFF3DE",
  },
  li: {
    backgroundColor: "#F9B853",
  },
  active: {
    backgroundColor: "#F9B853",
    width: 24,
  },
  centerImage: {
    width: "150%",
    height: 450,
    marginLeft: "25%",
  },
};
