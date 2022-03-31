import React from "react";
import { Card, Paragraph } from "react-native-paper";

const NoteCard = ({ item }) => {
  return (
    <Card
      mode="elevated"
      style={{
        margin: 8,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "#FFFAFA",
        // maxWidth: "50%",
      }}
    >
      <Card.Title title={item.title} titleStyle={{ color: "#7B6BA8" }} />
      <Card.Content>
        <Paragraph style={{ color: "#7B6BA8" }}>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default NoteCard;
