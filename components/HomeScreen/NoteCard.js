import React from "react";
import { Card, Paragraph } from "react-native-paper";

const NoteCard = ({ item, minHeight }) => {
  return (
    <Card
      mode="elevated"
      style={{
        marginHorizontal: 10,
        backgroundColor: "#fafafa",
        borderRadius: 10,
        elevation: 4,
        minHeight: minHeight,
        marginTop: item.id != 1 ? 8 : 0,
        marginBottom: 8,
        backgroundColor: "#FFFAFA",
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
