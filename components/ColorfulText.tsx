import React from "react";
import { StyleSheet } from "react-native";
import GradientText from "react-native-gradient-texts";

const ColorfulText = ({ text, size }) => {
  return (
    <GradientText
      text={text}
      fontSize={size}
      isGradientFill
      isGradientStroke
      strokeWidth={2}
      gradientColors={["#9E01B7", "#14E585"]}
      fontFamily={"Gill Sans"}
    />
  );
};

export default ColorfulText;

const styles = StyleSheet.create({});
