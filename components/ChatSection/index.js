import { FlatList, View } from "react-native";
import { Card, Text, Subheading, Paragraph, Avatar } from "react-native-paper";
import { styles } from "../../styles/ChatStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import app from "../../firebaseServices/firebaseApp";
import { getDatabase } from "firebase/database";
import {
  doc,
  getDoc,
  collection,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

// Get a reference to the database service
const db = getFirestore();

const ChatSection = ({ user_id, curUser_id }) => {
  const [mes, setMes] = useState([]);
  const [user, setUser] = useState("");
  const chatsRef =
    user_id < curUser_id
      ? doc(db, "chats", `${user_id}-${curUser_id}`)
      : doc(db, "chats", `${curUser_id}-${user_id}`);

  // const readUser = async () => {
  //   const user = await AsyncStorage.getItem("user");
  //   if (user) {
  //     console.log("user");
  //     console.log(user);
  //     setUser(JSON.parse(user));
  //   } else {
  //     console.log("not user");
  //     const _id = Math.random().toString(36).substring(7);
  //     const user = { _id, name: _id.substring(0, 4) };
  //     // console.log(user);
  //     await AsyncStorage.setItem("user", JSON.stringify(user));
  //     setUser(user);
  //   }
  // };

  const appendMessages = useCallback(
    (messages) => {
      console.log(messages);
      setMes((previousMessages) => {
        console.log("previous");
        console.log(previousMessages);
        return GiftedChat.append(previousMessages, messages);
      });
    },
    [mes]
  );

  const handleSend = async (messages) => {
    console.log("here");
    const writes = messages.map((m) =>
      setDoc(chatsRef, {
        messages: [m, ...mes],
      })
    );
    await Promise.all(writes);
  };

  useEffect(() => {
    // readUser();
    const unsubscribe = onSnapshot(chatsRef, (doc) => {
      console.log("doc");
      console.log(doc.data());
      if (!doc.data().messages) return;

      if (mes.length) {
        const newMessage = {
          ...doc.data().messages[0],
          createdAt: doc.data().messages[0].createdAt.toDate(),
        };
        appendMessages(newMessage);
      } else {
        const oldMessage = [...doc.data().messages].map((value) => {
          // if ()
          return { ...value, createdAt: value.createdAt.toDate() };
        });
        appendMessages(oldMessage);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("mes");
    console.log(mes);
  }, [mes]);

  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   console.log("message");
  //   console.log(messages);
  // }, [messages]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello 1",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "Hello 2",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 3,
  //       text: "Hello 3",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 4,
  //       text: "Hello 4",
  //       createdAt: new Date().setMinutes(50),
  //       user: {
  //         _id: 1,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 5,
  //       text: "Hello 5",
  //       createdAt: new Date().setMinutes(50),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  return (
    <GiftedChat
      messages={mes}
      onSend={handleSend}
      user={{
        _id: user_id,
      }}
      // renderMessage={({ currentMessage }) => {
      //   console.log(currentMessage);
      //   // if (currText.indexOf("[x]") === -1) {
      //   //   return (
      //   //     <View style={styles.left}>
      // <Text>{currentMessage.currText.replace("[x]", "").trim()}</Text>
      //   //     </View>
      //   //   );
      //   // }

      //   return (
      //     <View>
      //       <Text>haha </Text>
      //     </View>
      //   );
      // }}
    />
  );
};

ChatSection.defaultProps = {
  user_id: "1",
  curUser_id: "2",
};

export default ChatSection;
