import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const GreenButton = ({ router, name, onpress }) => {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={
        onpress != ""
          ? onpress
          : () => router.push(name === "Login" ? "/Home" : "/Account")
      }
    >
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default GreenButton;

const styles = StyleSheet.create({
  loginButton: {
    width: "95%",
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#14E585",
    overflow: "hidden",
  },
});
