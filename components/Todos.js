import React, { useState, useEffect } from "react";
import {
  FlatList,
  // Button,
  View,
  Text,
  // TextInput,
  StyleSheet,
} from "react-native";
import Todo from "./Todo";
import firestore from "@react-native-firebase/firestore";
import {
  Appbar,
  TextInput,
  Button,
  Portal,
  Dialog,
  Provider,
} from "react-native-paper";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const ref = firestore().collection("todos");

  const addTodo = async () => {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo("");
  };

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null; // or a spinner
  }

  return (
    <>
      <Portal>
        <Dialog visible={modal} onDismiss={() => setModal(false)}>
          <Dialog.Title>Edit todo</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={`Edit Todo: ${editTodo.title}`}
              value={todo}
              onChangeText={(todo) => setTodo(todo)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setModal(false);
                ref.doc(editTodo.id).update({
                  title: todo,
                });
                setTodo("");
                setEditTodo({});
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FlatList
        style={styles.listTodos}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Todo {...item} setModal={setModal} setEditTodo={setEditTodo} />
        )}
      />
      <TextInput label={"New Todo"} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
};

const styles = StyleSheet.create({
  listTodos: {
    flex: 1,
  },
});

export default Todos;
