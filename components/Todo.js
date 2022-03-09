import React from "react";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { List } from "react-native-paper";

const Todo = ({ id, title, complete, setModal, setEditTodo }) => {
  const toggleComplete = async () => {
    await firestore().collection("todos").doc(id).update({
      complete: !complete,
    });
  };

  return (
    <List.Item
      title={title}
      onPress={() => toggleComplete()}
      onLongPress={async () => {
        Alert.alert("Task management", "Do you want to delete this task ?", [
          {
            text: "Edit",
            onPress: () => {
              setModal(true);
              setEditTodo({ id: id, title: title });
            },
          },
          {
            text: "Deny",
            onPress: () => console.log("Deny Pressed"),
          },
          {
            text: "Accept",
            onPress: async () => {
              await firestore().collection("todos").doc(id).delete();
            },
          },
        ]);
      }}
      left={(props) => (
        <List.Icon {...props} icon={complete ? "check-outline" : "cancel"} />
      )}
    />
  );
};

export default Todo;
