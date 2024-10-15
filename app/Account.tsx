import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { backgroundColor } from "@/constants/Colors";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useRouter } from "expo-router";

const Account = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <View style={styles.accountContainer}>
      {isLogin ? (
        <Login isLogin={setIsLogin} router={router} />
      ) : (
        <Register isRegister={setIsLogin} />
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
