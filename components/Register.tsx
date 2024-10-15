import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import GradientText from "react-native-gradient-texts";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const Register = ({ isRegister }) => {
  const [mailValue, setMailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isMailFocused, setIsMailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  return (
    <View style={styles.registerContainer}>
      <View style={styles.gameName}>
        <GradientText
          text={"NUMBER GAME"}
          fontSize={40}
          isGradientFill
          isGradientStroke
          strokeWidth={2}
          gradientColors={["#9E01B7", "#14E585"]}
          fontFamily={"Gill Sans"}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.registerTitle}>Create Your Account</Text>
      </View>
      <View style={styles.emailContainer}>
        <Feather
          name="mail"
          size={24}
          color="white"
          style={{ position: "absolute", zIndex: 1, top: 15, left: 10 }}
        />
        <TextInput
          style={styles.inputs}
          placeholder={isMailFocused || mailValue ? "" : "Email"}
          onFocus={() => setIsMailFocused(true)}
          onBlur={() => setIsMailFocused(false)}
          value={mailValue}
          onChangeText={setMailValue}
          inlineImageLeft="search_icon"
        />
      </View>
      <View style={styles.passContainer}>
        <AntDesign
          name="lock"
          size={24}
          color="white"
          style={{ position: "absolute", zIndex: 1, top: 15, left: 10 }}
        />
        <TextInput
          style={styles.inputs}
          placeholder={isPassFocused || passValue ? "" : "Password"}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          value={passValue}
          onChangeText={setPassValue}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUp}>
        <TouchableOpacity onPress={() => isRegister(true)}>
          <Text style={{ color: "white", height: 50 }}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
  },
  gameName: {
    flex: 2,
  },
  title: {
    flex: 1,
  },
  registerTitle: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  inputs: {
    width: "95%",
    height: 56,
    backgroundColor: "#3A3F4D",
    borderRadius: 20,
    paddingLeft: 40,
    color: "white",
  },
  registerButtonContainer: {
    flex: 2,
  },
  registerButton: {
    width: "95%",
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#14E585",
  },
  emailContainer: {
    flex: 1,
  },
  passContainer: {
    flex: 1,
  },
  signUp: {
    flex: 1,
    alignItems: "center",
  },
});
