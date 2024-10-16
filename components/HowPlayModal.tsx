import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
        <TouchableOpacity style={styles.mods}>
          <Text style={{ color: "white" }}>
            4 Basamaklı rakamları birbirinden farklı bir sayı seç
          </Text>
          <Text style={{ color: "white" }}>X 2334 3578 tik</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mods}>
          <Text style={{ color: "white" }}>
            Rakibinin tuttuğu sayıyı tahmin et ve dönen değere göre tahminini
            güncelle.
          </Text>
          <Text style={{ color: "white" }}>
            4321 -3 1234 +2 -1 3254 +3 3284 +4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mods}>
          <Text style={{ color: "white" }}>Doğru tahmin edip oyunu kazan</Text>
          <Text style={{ color: "white" }}>3284 +4 Tik</Text>
        </TouchableOpacity>
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
