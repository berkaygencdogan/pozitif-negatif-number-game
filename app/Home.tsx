import BottomBar from "@/components/BottomBar";
import ColorfulText from "@/components/ColorfulText";
import GreenButton from "@/components/GreenButton";
import ProfileImage from "@/components/ProfileImage";
import { backgroundColor } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  // 5 Can olsun reklam izledikçe can alabilsinler. Ya da para ile alsınlar. 1 seçenek de Sınırsız can alma olsun. Reklam izleyip can alsınlar 1 tane
  return (
    <View style={styles.homeContainer}>
      <View style={styles.pointContainer}>
        <Text>Can</Text>
        <Text>Puan</Text>
      </View>
      <View style={styles.profileImageContainer}>
        <ProfileImage />
        <Text style={{ color: "white" }}>Kullanici Adi</Text>
      </View>
      <TouchableOpacity style={styles.gameButtonContainer}>
        <ColorfulText size={40} text={"PLAY"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.howPlayContainer}>
        <ColorfulText size={40} text={"How to Play ?"} />
      </TouchableOpacity>
      <BottomBar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  pointContainer: {
    flex: 0.5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "yellow",
    alignItems: "center",
  },
  profileImageContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  gameButtonContainer: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  howPlayContainer: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
  },
});
