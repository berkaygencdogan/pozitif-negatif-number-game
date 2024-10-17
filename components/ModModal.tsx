import { backgroundColor } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ModCards from "./ModCards";

const ModModal = ({ setIsPlay }) => {
  const router = useRouter();
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.exitBtn} onPress={() => setIsPlay(false)}>
        <FontAwesome6 name="circle-xmark" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.gameMods}>
        <TouchableOpacity
          style={styles.mods}
          onPress={() => router.push("/MultiPlayerScreen")}
        >
          <ModCards text={"Online"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mods}
          onPress={() => router.push("/SinglePlayerScreen")}
        >
          <ModCards text={"Offline"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mods}
          onPress={() => router.push("/LocalMultiPlayerScreen")}
        >
          <ModCards text={"2 Kişi"} />
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
    height: "80%",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  },
  mods: {
    width: "100%",
    height: "30%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
});
