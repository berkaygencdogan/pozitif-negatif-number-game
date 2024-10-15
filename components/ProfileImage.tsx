import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileImage = () => {
  return (
    <View style={styles.profileImageContainer}>
      <Image src="../assets/images/icon.png" style={styles.profileImage} />
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  profileImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "yellow",
  },
});
