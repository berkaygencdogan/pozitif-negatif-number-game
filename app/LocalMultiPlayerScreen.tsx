import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import generateRandomNumber from "../backend/numberGenerator"; // Rastgele sayı üreten fonksiyonu import et
import checkGuess from "../backend/gameLogic"; // Tahmin kontrol fonksiyonunu import et

const LocalMultiplayerScreen = () => {
  const [isPlayerOneReady, setIsPlayerOneReady] = useState(false);
  const [isPlayerTwoReady, setIsPlayerTwoReady] = useState(false);
  const [targetNumberPlayerOne, setTargetNumberPlayerOne] = useState("");
  const [targetNumberPlayerTwo, setTargetNumberPlayerTwo] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [guessesPlayerOne, setGuessesPlayerOne] = useState([]); // 1. oyuncunun tahminlerini tutmak için
  const [guessesPlayerTwo, setGuessesPlayerTwo] = useState([]); // 2. oyuncunun tahminlerini tutmak için
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü için
  const [modalMessage, setModalMessage] = useState(""); // Modal mesajı
  const [attemptsPlayerOne, setAttemptsPlayerOne] = useState(0); // 1. oyuncunun deneme sayısını tut
  const [attemptsPlayerTwo, setAttemptsPlayerTwo] = useState(0); // 2. oyuncunun deneme sayısını tut
  const [isGameFinished, setIsGameFinished] = useState(false); // Oyun bitti mi
  // 1. oyuncunun sayısını oluştur
  const handlePlayerOneReady = () => {
    const number = generateRandomNumber();
    setTargetNumberPlayerOne(number);
    setIsPlayerOneReady(true);
  };

  // 2. oyuncunun sayısını oluştur
  const handlePlayerTwoReady = () => {
    const number = generateRandomNumber();
    setTargetNumberPlayerTwo(number);
    setIsPlayerTwoReady(true);
    setModalVisible(false);
  };

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

    // Hangi oyuncunun tahmin yaptığını kontrol et
    if (isPlayerOneReady && !isGameFinished) {
      const { plus, minus } = checkGuess(guess, targetNumberPlayerOne);
      setFeedback(`${plus} doğru yerde, ${minus} yanlış yerde.`);
      setAttemptsPlayerOne((prev) => {
        console.log("Önceki attemptsPlayerOne:", prev);
        return prev + 1;
      });
      setGuessesPlayerOne((prev) => [...prev, { guess, plus, minus }]);

      if (plus === 4 || (attemptsPlayerOne >= 1 && !isPlayerTwoReady)) {
        const message =
          plus === 4
            ? `1. oyuncu ${attemptsPlayerOne + 1}. tahminde doğru yanıtı buldu!`
            : `1. oyuncu 8 tahmin hakkını doldurdu, doğru yanıtı bulamadı!`;
        setModalMessage(message);
        setModalVisible(true);
      }
    } else if (isPlayerTwoReady && !isGameFinished) {
      const { plus, minus } = checkGuess(guess, targetNumberPlayerTwo);
      setFeedback(`${plus} doğru yerde, ${minus} yanlış yerde.`);

      // attemptsPlayerTwo değerini artırırken console.log ile kontrol et
      setAttemptsPlayerTwo((prev) => {
        console.log("Önceki attemptsPlayerTwo:", prev);
        return prev + 1;
      });

      setGuessesPlayerTwo((prev) => [...prev, { guess, plus, minus }]);

      if (plus === 4 || attemptsPlayerTwo >= 1) {
        setIsGameFinished(true);
        handleDetermineWinner();
      }
    }

    setGuess(""); // Girişi sıfırla
  };

  const handleContinueToPlayerTwo = () => {
    setIsPlayerOneReady(false);
    setIsGameFinished(false);
    setAttemptsPlayerOne(0);
    setGuessesPlayerOne([]);
    setGuess("");
    handlePlayerTwoReady(); // 2. oyuncunun sayısını oluştur
  };

  const handlePlayAgain = () => {
    setModalVisible(false);
    setIsPlayerOneReady(false);
    setIsPlayerTwoReady(false);
    setTargetNumberPlayerOne("");
    setTargetNumberPlayerTwo("");
    setGuessesPlayerOne([]);
    setGuessesPlayerTwo([]);
    setGuess("");
    setAttemptsPlayerOne(0);
    setAttemptsPlayerTwo(0);
    setIsGameFinished(false);
  };

  const handleDetermineWinner = () => {
    if (attemptsPlayerOne < attemptsPlayerTwo) {
      setModalMessage("1. oyuncu kazandı!");
    } else if (attemptsPlayerTwo < attemptsPlayerOne) {
      setModalMessage("2. oyuncu kazandı!");
    } else {
      setModalMessage("Beraberlik!");
    }
    setModalVisible(true);
  };

  const handleGoToMainMenu = () => {
    Alert.alert("Ana Menüye Dön", "Ana menüye dönme işlemi burada yapılacak.");
  };

  return (
    <View style={styles.container}>
      {!isPlayerOneReady && !isPlayerTwoReady && (
        <View>
          <Text style={styles.title}>1. Oyuncu Hazır Ol</Text>
          <Button title="Hazırım" onPress={handlePlayerOneReady} />
        </View>
      )}

      {isPlayerOneReady && !isGameFinished && (
        <View>
          <Text style={styles.title}>1. Oyuncu Tahmininizi Girin</Text>
          <TextInput
            style={styles.input}
            placeholder="Tahmininizi girin"
            keyboardType="numeric"
            value={guess}
            onChangeText={setGuess}
          />
          <Button title="Tahmin Et" onPress={handleGuess} />
          <FlatList
            data={guessesPlayerOne}
            renderItem={({ item }) => (
              <Text
                style={styles.guessText}
              >{`${item.guess} -> ${item.plus} doğru yerde, ${item.minus} yanlış yerde`}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.guessList}
          />
        </View>
      )}

      {isPlayerTwoReady && !isGameFinished && (
        <View>
          <Text style={styles.title}>2. Oyuncu Tahmininizi Girin</Text>
          <TextInput
            style={styles.input}
            placeholder="Tahmininizi girin"
            keyboardType="numeric"
            value={guess}
            onChangeText={setGuess}
          />
          <Button title="Sayıyı Onayla" onPress={handleGuess} />
          <FlatList
            data={guessesPlayerTwo}
            renderItem={({ item }) => (
              <Text
                style={styles.guessText}
              >{`${item.guess} -> ${item.plus} doğru yerde, ${item.minus} yanlış yerde`}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.guessList}
          />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          handleGoToMainMenu();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>

            {/* 1. oyuncu bitince sadece "Devam Et" butonu gözükecek */}
            {!isPlayerTwoReady && (
              <Button title="Devam Et" onPress={handleContinueToPlayerTwo} />
            )}

            {/* 2. oyuncu bitince "Tekrar Oyna" ve "Ana Menüye Dön" butonları gözükecek */}
            {isGameFinished && (
              <>
                <Button title="Tekrar Oyna" onPress={handlePlayAgain} />
                <Button title="Ana Menüye Dön" onPress={handleGoToMainMenu} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocalMultiplayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  guessList: {
    marginTop: 20,
    width: "100%",
  },
  guessText: {
    fontSize: 16,
    marginVertical: 5,
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
