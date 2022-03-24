import { TouchableWithoutFeedback, View } from "react-native";
import { Text, Title, Avatar, Subheading } from "react-native-paper";
import { styles } from "../../styles/ChatStyles";
import Icon from "react-native-vector-icons/Feather";
import { useState, useEffect, useCallback } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const avatar = "https://placeimg.com/140/140/any";

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
    <>
      <View style={styles.info}>
        <Avatar.Image
          size={72}
          source={{ uri: avatar }}
          style={{ marginLeft: 32 }}
        />
        <View style={styles.detail}>
          <Title style={styles.text}>Name</Title>
          <Subheading style={styles.text}>Speciality</Subheading>
        </View>
      </View>
      <GiftedChat
        messages={mes}
        onSend={handleSend}
        user={{
          _id: user_id,
          name: user_name,
        }}
        renderBubble={({ currentMessage }) => {
          const viewStyle =
            currentMessage.user._id === curUser_id ? styles.left : styles.right;
          const textStyle =
            currentMessage.user._id === curUser_id
              ? styles.leftText
              : styles.rightText;

          const dateStyle =
            currentMessage.user._id === curUser_id
              ? styles.dateLeft
              : styles.dateRight;

          const option = {
            hour: "numeric",
            minute: "numeric",
          };

          const time = new Date(currentMessage.createdAt)
            .toLocaleTimeString("en-US", option)
            .replace(/(:\d{2}| [AP]M)$/, "");

          return (
            <View style={viewStyle}>
              <Text style={textStyle}>{currentMessage.text}</Text>
              <Text style={dateStyle}>
                {time} {time >= 12 ? "PM" : "AM"}
              </Text>
            </View>
          );
        }}
        renderSend={(props) => {
          return (
            <Send {...props}>
              <Icon
                size={36}
                name="corner-down-right"
                style={styles.send}
                color="#00a19d"
              />
            </Send>
          );
        }}
      />
    </>
  );
};

const random = Math.floor(Math.random() * 2).toString();

ChatSection.defaultProps = {
  user_id: random == 1 ? "1" : "2",
  user_name: random == 1 ? "dat" : "nam",
  curUser_id: random == 1 ? "2" : "1",
};

export default ChatSection;
