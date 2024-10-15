import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomBarButtons from "./BottomBarButtons";

const BottomBar = () => {
  return (
    <View style={styles.bottomBarContainer}>
      <View style={styles.bar}>
        <BottomBarButtons
          place={"Home"}
          icon={<FontAwesome name="home" size={40} color="white" />}
        />
        <BottomBarButtons
          place={"BestPlayer"}
          icon={<Entypo name="bar-graph" size={40} color="white" />}
        />
        <BottomBarButtons
          place={"Settings"}
          icon={<Ionicons name="settings" size={40} color="white" />}
        />
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBarContainer: {
    flex: 1,
    width: "100%",
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "30%",
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    left: 0,
  },
});
