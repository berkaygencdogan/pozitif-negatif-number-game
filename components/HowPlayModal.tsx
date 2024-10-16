import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { backgroundColor } from "@/constants/Colors";

const HowPlayModal = ({ setIsHowPlay }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.exitBtn}
        onPress={() => setIsHowPlay(false)}
      >
        <FontAwesome6 name="circle-xmark" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.gameMods}>
        <Image
          src="https://i.hizliresim.com/88bzjbg.png?_gl=1*3ervhy*_ga*MzEzNTI0MTU5LjE3MjY5NDcyNTg.*_ga_M9ZRXYS2YN*MTcyOTExMDU5MS43LjAuMTcyOTExMDU5MS42MC4wLjA."
          style={styles.howImages}
        />
        <Image
          src="https://i.hizliresim.com/djgxffm.png?_gl=1*v7265m*_ga*MzEzNTI0MTU5LjE3MjY5NDcyNTg.*_ga_M9ZRXYS2YN*MTcyOTExMDU5MS43LjEuMTcyOTExMDYyNS4yNi4wLjA."
          style={styles.howImages}
        />
        <Image
          src="https://i.hizliresim.com/5njotpa.png?_gl=1*1ep4rvy*_ga*MzEzNTI0MTU5LjE3MjY5NDcyNTg.*_ga_M9ZRXYS2YN*MTcyOTExMDU5MS43LjEuMTcyOTExMDYyNi4yNS4wLjA."
          style={styles.howImages}
        />
      </View>
    </View>
  );
};

export default HowPlayModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: backgroundColor,
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
    height: "90%",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  },
  howImages: {
    width: "90%",
    height: "30%",
    overflow: "hidden",
    resizeMode: "contain",
  },
});
