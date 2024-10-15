import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const BottomBarButtons = ({ icon, place }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => router.push(`/${place}`)}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default BottomBarButtons;

const styles = StyleSheet.create({
  iconContainer: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
