import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import generateRandomNumber from "../backend/numberGenerator"; // Rastgele sayı üreten fonksiyonu import et
import checkGuess from "../backend/gameLogic"; // Tahmin kontrol fonksiyonunu import et
import ColorfulText from "@/components/ColorfulText";
import { backgroundColor } from "@/constants/Colors";
import GreenButton from "@/components/GreenButton";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const MAX_ATTEMPTS = 8; // Maksimum tahmin hakkı

const SinglePlayerScreen = () => {
  const [targetNumber, setTargetNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [guesses, setGuesses] = useState([]); // Tahminleri tutmak için
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü için
  const [attempts, setAttempts] = useState(0); // Deneme sayısını tut
  const [plus, setPlus] = useState(0); // Doğru yer sayısını saklamak için
  const [minus, setMinus] = useState(0); // Yanlış yer sayısını saklamak için

  // Sayıyı oluştur
  useEffect(() => {
    const number = generateRandomNumber();
    setTargetNumber(number);
  }, []);

  const handleGuess = () => {
    if (guess.length !== 4) {
      Alert.alert("Hata", "Lütfen 4 basamaklı bir sayı girin.");
      return;
    }

    // İlk rakamın 0 olup olmadığını kontrol et
    if (guess[0] === "0") {
      Alert.alert("Hata", "İlk rakam 0 olamaz.");
      return;
    }

    // Rakamların birbirinden farklı olup olmadığını kontrol et
    const uniqueDigits = new Set(guess);
    if (uniqueDigits.size !== 4) {
      Alert.alert(
        "Hata",
        "Tüm rakamların birbirinden farklı olması gerekmektedir."
      );
      return;
    }

    // Tahmin kontrolü
    const { plus: newPlus, minus: newMinus } = checkGuess(guess, targetNumber);
    setPlus(newPlus); // Doğru yer sayısını güncelle
    setMinus(newMinus); // Yanlış yer sayısını güncelle
    setFeedback(`${newPlus} sayı doğru yerde, ${newMinus} sayı yanlış yerde.`);
    setAttempts((prevAttempts) => prevAttempts + 1); // Deneme sayısını artır

    // Tahmin ve geri bildirimleri diziye ekle
    setGuesses((prevGuesses) => [
      ...prevGuesses,
      { guess, plus: newPlus, minus: newMinus },
    ]);

    // Doğru tahmin kontrolü
    if (newPlus === 4) {
      setModalVisible(true); // Modalı göster
    } else if (attempts >= MAX_ATTEMPTS - 1) {
      Alert.alert(
        "Oyun Bitti",
        `Maksimum tahmin hakkını doldurdunuz. Doğru sayı: ${targetNumber}`
      );
      setModalVisible(true); // Modalı göster
    }

    setGuess(""); // Girişi sıfırla
  };

  const handlePlayAgain = () => {
    setModalVisible(false);
    setGuesses([]);
    setGuess("");
    setAttempts(0);
    setPlus(0); // Doğru yer sayısını sıfırla
    setMinus(0); // Yanlış yer sayısını sıfırla
    setFeedback(""); // Geri bildirimi sıfırla
    setTargetNumber(generateRandomNumber()); // Yeni sayı oluştur
  };

  const handleGoToMainMenu = () => {
    // Ana menüye dönme işlemi burada yapılacak
    Alert.alert("Ana Menüye Dön", "Ana menüye dönme işlemi burada yapılacak.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ColorfulText size={25} text={"TEK OYUNCU MODU"} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Tahmininizi girin"
        keyboardType="numeric"
        value={guess}
        placeholderTextColor={"white"}
        onChangeText={setGuess}
      />
      <GreenButton name={"Tahmin Et"} router={router} onpress={handleGuess} />
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      {/* Tahminleri listele */}
      <FlatList
        data={guesses}
        renderItem={({ item }) => (
          <LinearGradient
            colors={["#9E01B7", "#14E585"]} // Gradient renkleri
            start={{ x: 0, y: 1 }}
            style={styles.guessContainer}
          >
            <View style={styles.guessViewLeft}>
              <Text style={styles.guessText}>{item.guess}</Text>
            </View>
            <View style={styles.guessView}>
              <Entypo name="plus" size={30} color="green" />
              <Text style={styles.guessText}>{item.plus}</Text>
            </View>
            <View style={styles.guessView}>
              <AntDesign name="minus" size={30} color="red" />
              <Text style={styles.guessText}>{item.minus}</Text>
            </View>
          </LinearGradient>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.guessList}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {plus === 4 ? (
              <Text style={styles.modalText}>
                Tebrikler! Doğru yanıtı {attempts + 1}. tahminde buldunuz.
              </Text>
            ) : (
              <Text style={styles.modalText}>
                Maksimum tahmin hakkını doldurdunuz. Doğru sayı: {targetNumber}
              </Text>
            )}
            <Button title="Tekrar Oyna" onPress={handlePlayAgain} />
            <Button title="Ana Menüye Dön" onPress={handleGoToMainMenu} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SinglePlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: backgroundColor,
  },
  title: {
    width: "100%",
    height: "10%",
    top: "-5%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  guessList: {
    marginTop: 20,
    width: "100%",
  },
  guessContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    marginBottom: 5,
  },
  guessView: {
    width: "30%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderLeftWidth: 1,
    borderColor: "red",
    marginBottom: 5,
  },
  guessViewLeft: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  guessText: {
    fontSize: 16,
    marginVertical: 5,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Arka planı koyu yap
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
