import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ColorfulText from "./ColorfulText";

const ModCards = ({ text }) => {
  return (
    <LinearGradient
      colors={["#D4A5FF", "#FFC4E1"]}
      style={styles.colorful}
      start={[0, 0]}
    >
      <ColorfulText size={40} text={text} />
    </LinearGradient>
  );
};

export default ModCards;

const styles = StyleSheet.create({
  colorful: {
    width: "60%",
    height: "80%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
