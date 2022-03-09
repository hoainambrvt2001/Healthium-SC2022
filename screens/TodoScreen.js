import React, { useState, useEffect } from "react";
import Todos from "../components/Todos";
import UploadImageScreen from "./UploadImageScreen";
import { BottomNavigation } from "react-native-paper";

const TodoScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "todos", title: "Todos", icon: "clipboard-list-outline" },
    { key: "albums", title: "Upload Images", icon: "tooltip-image-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    todos: Todos,
    albums: UploadImageScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default TodoScreen;
