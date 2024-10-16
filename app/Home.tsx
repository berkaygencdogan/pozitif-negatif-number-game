import BottomBar from "@/components/BottomBar";
import ColorfulText from "@/components/ColorfulText";
import HowPlayModal from "@/components/HowPlayModal";
import ModModal from "@/components/ModModal";
import ProfileImage from "@/components/ProfileImage";
import { backgroundColor } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [isHowPlay, setIsHowPlay] = useState(false);
  // 5 Can olsun reklam izledikçe can alabilsinler. Ya da para ile alsınlar. 1 seçenek de Sınırsız can alma olsun. Reklam izleyip can alsınlar 1 tane
  return (
    <View style={styles.homeContainer}>
      <View style={styles.pointContainer}>
        <TouchableOpacity style={styles.points}>
          <AntDesign name="heart" size={24} color="red" />
          {<Text style={styles.pointsText}>20:42</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.points}>
          <AntDesign name="star" size={24} color="yellow" />
          {<Text style={styles.pointsText}>123.232</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageContainer}>
        <ProfileImage />
        <Text style={{ color: "white" }}>Kullanici Adi</Text>
      </View>
      <TouchableOpacity
        style={styles.gameButtonContainer}
        onPress={() => setIsPlay(true)}
      >
        <ColorfulText size={40} text={"PLAY"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.howPlayContainer}
        onPress={() => setIsHowPlay(true)}
      >
        <ColorfulText size={40} text={"How to Play ?"} />
      </TouchableOpacity>
      {isPlay && <ModModal setIsPlay={setIsPlay} />}
      {isHowPlay && <HowPlayModal setIsHowPlay={setIsHowPlay} />}
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
  points: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "yellow",
  },
  pointsText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
});
