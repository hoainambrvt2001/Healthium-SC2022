import { TouchableWithoutFeedback, View } from "react-native";
import { Text, Title, Avatar, Subheading } from "react-native-paper";
import { styles } from "../../styles/ChatStyles";
import Icon from "react-native-vector-icons/Feather";
import { useState, useEffect, useCallback } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";
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

const ChatSection = ({
  userId,
  doctorId,
  doctorName,
  doctorAvatar,
  doctorSpeciality,
}) => {
  const [mes, setMes] = useState([]);
  let init = false;
  const chatsRef = doc(db, "chats", `${userId}-${doctorId}`);

  const avatar = doctorAvatar ? doctorAvatar : undefined;

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
      if (!doc.data()) return;

      if (init) {
        const newMessage = {
          ...doc.data().messages[0],
          createdAt: doc.data().messages[0].createdAt.toDate(),
        };
        // console.log(newMessage);
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
          source={
            avatar ? { uri: avatar } : require("assets/doctor-avatar.png")
          }
          style={{ marginLeft: 32, borderColor: "white", borderWidth: 1 }}
        />
        <View style={styles.detail}>
          <Title style={styles.text}>{doctorName}</Title>
          <Subheading style={styles.text}>{doctorSpeciality}</Subheading>
        </View>
      </View>
      <GiftedChat
        messages={mes}
        onSend={handleSend}
        user={{
          _id: userId,
        }}
        renderAvatar={null}
        renderBubble={({ currentMessage }) => {
          const viewStyle =
            currentMessage.user._id === userId ? styles.left : styles.right;
          const textStyle =
            currentMessage.user._id === userId
              ? styles.leftText
              : styles.rightText;

          const dateStyle =
            currentMessage.user._id === userId
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

// const random = Math.floor(Math.random() * 2).toString();

// ChatSection.defaultProps = {
//   doctorId: random == 1 ? "1" : "2",
//   user_name: random == 1 ? "dat" : "nam",
//   userId: random == 1 ? "2" : "1",
// };

export default ChatSection;
