import { backgroundColor } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import Account from "./Account";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Account />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    color: "white",
  },
});
