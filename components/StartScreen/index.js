import React, { useState } from "react";
import { View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

const Start = ({ navigation }) => {
  const [page, setPage] = useState(0);

  const currentPage =
    page === 0 ? (
      <First setPage={setPage} />
    ) : page === 1 ? (
      <Second setPage={setPage} />
    ) : (
      <Third navigation={navigation} />
    );

  return <View style={globalStyles.container}>{currentPage}</View>;
};

export default Start;
