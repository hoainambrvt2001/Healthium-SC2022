import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Paragraph, Subheading } from "react-native-paper";
import { option, textColor, titleColor } from "styles/UserProfileStyles";
import Icon from "react-native-vector-icons/AntDesign";

const Option = ({ name, desc, navigation, border }) => {
  return (
    <TouchableOpacity style={[option.container, border]}>
      <View>
        <Subheading style={{ color: titleColor, fontWeight: "700" }}>
          {name}
        </Subheading>
        <Paragraph style={{ color: textColor }}>{desc}</Paragraph>
      </View>
      <Icon name="right" size={24} color={textColor} />
    </TouchableOpacity>
  );
};

Option.defaultProps = {
  name: "",
  desc: "",
};

export default Option;
