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

const ChatSection = ({ user_id, user_name, curUser_id }) => {
  const [mes, setMes] = useState([]);
  let init = false;
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
      setMes((previousMessages) => {
        return GiftedChat.append(previousMessages, messages);
      });
    },
    [mes]
  );

  const handleSend = async (messages) => {
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
      if (!doc.data().messages) return;

      if (init) {
        const newMessage = {
          ...doc.data().messages[0],
          createdAt: doc.data().messages[0].createdAt.toDate(),
        };
        console.log(newMessage);
        appendMessages(newMessage);
      } else {
        const oldMessage = [...doc.data().messages].map((value) => {
          return { ...value, createdAt: value.createdAt.toDate() };
        });
        init = true;
        appendMessages(oldMessage);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <GiftedChat
      messages={mes}
      onSend={handleSend}
      user={{
        _id: user_id,
        name: user_name,
      }}
      renderMessage={({ currentMessage }) => {
        // console.log(currentMessage);
        // if (currText.indexOf("[x]") === -1) {
        //   return (
        //     <View style={styles.left}>
        // <Text>{currentMessage.currText.replace("[x]", "").trim()}</Text>;
        //     </View>
        //   );
        // }

        return (
          <View
            style={
              currentMessage._id === currentMessage.user.user_id
                ? styles.left
                : styles.right
            }
          >
            <Text>{currentMessage.text}</Text>
          </View>
        );
      }}
    />
  );
};

const random = Math.floor(Math.random() * 2).toString();

ChatSection.defaultProps = {
  user_id: random == 1 ? "1" : "2",
  user_name: random == 1 ? "dat" : "nam",
  curUser_id: random == 1 ? "2" : "1",
};

export default ChatSection;
