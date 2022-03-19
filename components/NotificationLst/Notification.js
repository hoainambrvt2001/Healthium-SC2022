import { FlatList, View } from "react-native";
import { Card, Text, Subheading, Paragraph, Avatar } from "react-native-paper";
import { styles } from "../../styles/NotificationScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome5";

const Pill = ({ name, period, amount }) => {
  return (
    <View style={styles.pill_card}>
      <View style={styles.md_6}>
        <Icon
          name="check"
          size={16}
          color="#53D769"
          style={styles.check_icon}
        />
        <Subheading style={styles.sub_title}>{name}</Subheading>
      </View>
      <View style={styles.md_6}>
        <Paragraph style={styles.note}>{period}</Paragraph>
        <Paragraph style={styles.note}>{amount}</Paragraph>
      </View>
    </View>
  );
};

const Notification = ({ id, name, desc, pills }) => {
  return (
    <View style={styles.wrap}>
      <Card style={styles.card}>
        <Card.Title
          title={name}
          left={(props) => (
            <Icon
              name="tablets"
              size={16}
              color="#0658FD"
              style={styles.pill_icon}
            />
          )}
          style={styles.title}
        ></Card.Title>
        <Card.Content style={styles.content}>
          {/* <Title>{name}</Title> */}
          <Paragraph style={styles.para}>{desc}</Paragraph>
          <View style={styles.pill_lst}>
            <FlatList
              data={pills}
              renderItem={({ item }) => <Pill {...item} />}
              keyExtractor={(item) => item.id}
              style={{ backgroundColor: "white" }}
            ></FlatList>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Notification;
