import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 8,
  },
  card: {
    // borderStyle: "solid",
    // borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 55,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOpacity: 0.05,
    elevation: 8,
    borderRadius: 16,
  },
  title: {},
  content: {
    width: "100%",
  },
  pill_icon: {
    backgroundColor: "rgba(6, 88, 253, 0.2)",
    width: 34,
    height: 34,
    borderRadius: 17,
    textAlign: "center",
    textAlignVertical: "center",
  },
  para: {
    color: "#8F92A1",
    fontWeight: "500",
  },
  pill_lst: {
    marginTop: 16,
  },
  pill_card: {
    backgroundColor: "#DDF7E1",
    borderRadius: 4,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  md_6: {
    maxWidth: "50%",
    // flexBasis: "50%",
    flexDirection: "row",
  },
  check_icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  sub_title: {
    fontWeight: "700",
    marginLeft: 8,
    lineHeight: 20,
    textAlignVertical: "center",
  },
  note: {
    lineHeight: 20,
    marginLeft: 12,
    color: "#A5A8B4",
    fontWeight: "500",
    textAlign: "right",
    textAlignVertical: "center",
  },
});
