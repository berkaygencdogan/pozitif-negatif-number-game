import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ModModal = ({ setIsPlay }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.exitBtn} onPress={() => setIsPlay(false)}>
        <FontAwesome6 name="circle-xmark" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.gameMods}>
        <TouchableOpacity style={styles.mods}>
          <Text style={{ color: "white" }}>Online</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mods}>
          <Text style={{ color: "white" }}>Offline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mods}>
          <Text style={{ color: "white" }}>2 Kişili</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "blue",
    zIndex: 2,
  },
  exitBtn: {
    width: "90%",
    height: "10%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  gameMods: {
    width: "100%",
    height: "80%",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  },
  mods: {
    width: "60%",
    height: "30%",
    backgroundColor: "red",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
