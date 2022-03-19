import { SafeAreaView, FlatList } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Notification from "./Notification";

const NotificationLst = () => {
  const cloneData = [
    {
      id: 0,
      name: "Medical reminder 1",
      desc: "Don't forget to take your daily pills today. Here's what you need to take.",
      pills: [
        { id: 0, name: "Ibuprofen", period: "Morning", amount: "3g" },
        { id: 1, name: "Ibuprofen", period: "Morning", amount: "3g" },
      ],
    },
    {
      id: 1,
      name: "Medical reminder 2",
      desc: "Don't forget to take your daily pills today. Here's what you need to take.",
      pills: [
        { id: 0, name: "Ibuprofen", period: "Morning", amount: "3g" },
        { id: 1, name: "Ibuprofen", period: "Morning", amount: "3g" },
      ],
    },
    {
      id: 2,
      name: "Medical reminder 3",
      desc: "Don't forget to take your daily pills today. Here's what you need to take.",
      pills: [
        { id: 0, name: "Ibuprofen", period: "Morning", amount: "3g" },
        { id: 1, name: "Ibuprofen", period: "Morning", amount: "3g" },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={{
        ...globalStyles.container,
        height: "100%",
      }}
    >
      <FlatList
        data={cloneData}
        renderItem={({ item }) => <Notification {...item} />}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "white" }}
      ></FlatList>
    </SafeAreaView>
  );
};

export default NotificationLst;
