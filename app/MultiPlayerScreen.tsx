import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { io } from "socket.io-client"; // Socket.io-client importu

const SERVER_URL = "http://192.168.1.201:3000"; // Backend'in çalıştığı adres
const socket = io(SERVER_URL); // Socket bağlantısını kur

const MultiplayerScreen = () => {
  const [roomId, setRoomId] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [playerId, setPlayerId] = useState(""); // Oyuncu ID'si
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");

  // Socket olaylarını dinle
  useEffect(() => {
    socket.on("gameStart", () => {
      setIsGameStarted(true);
      Alert.alert("Oyun Başladı!", "Oyuna hoş geldiniz.");
    });

    socket.on("newGuess", ({ playerId, guess, plus, minus }) => {
      setFeedback((prev) => [
        ...prev,
        `${playerId}: ${guess} -> ${plus} doğru yerde, ${minus} yanlış yerde.`,
      ]);

      if (plus === 4) {
        setWinnerMessage(`${playerId} kazandı!`);
        setIsGameOver(true);
        setIsGameStarted(false);
        setFeedback([]);
        setGuess("");
      }
    });

    socket.on("gameOver", (message) => {
      setWinnerMessage(message);
      setIsGameOver(true);
      setIsGameStarted(false);
      setFeedback([]);
      setGuess("");
    });

    socket.on("error", (message) => {
      Alert.alert("Hata", message); // Hata mesajını burada göster
    });

    socket.on("playerLeft", (message) => {
      Alert.alert("Bilgilendirme", message);
      setIsGameStarted(false);
      setFeedback([]);
      setGuess("");
    });

    return () => {
      socket.off("gameStart");
      socket.off("newGuess");
      socket.off("gameOver");
      socket.off("error");
      socket.off("playerLeft");
    };
  }, []);

  // Oda oluştur
  const createRoom = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/create-room`);
      const data = await response.json();
      setRoomId(data.roomId);
      Alert.alert("Oda Oluşturuldu", `Oda ID: ${data.roomId}`);

      // Odaya otomatik olarak katıl
      socket.emit("joinRoom", data.roomId, socket.id);
      setPlayerId(socket.id);
    } catch (error) {
      console.error("Oda oluşturulurken hata:", error);
    }
  };

  // Odaya katıl
  const joinRoom = () => {
    if (!roomId) {
      Alert.alert("Hata", "Lütfen geçerli bir oda ID'si girin.");
      return;
    }
    socket.emit("joinRoom", roomId, socket.id);
    setPlayerId(socket.id); // Oyuncu ID'sini ayarlayın
  };

  // Tahmin yap
  const handleGuess = () => {
    if (guess.length !== 4) {
      Alert.alert("Hata", "Lütfen 4 basamaklı bir sayı girin.");
      return;
    }
    socket.emit("guess", { roomId, guess, playerId }); // playerId burada geçerlidir
    setGuess(""); // Girdi temizle
  };

  // Odayı kapat
  const leaveRoom = () => {
    if (roomId) {
      setIsGameOver(false);
      socket.emit("leaveRoom", roomId);
      setRoomId(""); // Oda ID'sini temizle
    }
  };

  // // Oyuna yeniden başla
  // const restartGame = () => {
  //   setFeedback([]); // Geri bildirimleri temizle
  //   setGuess(""); // Tahmin girişini temizle
  //   setIsGameOver(false);
  //   setIsGameStarted(true);
  //   // Odaya yeniden katılın
  //   socket.emit("joinRoom", roomId, socket.id);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sayı Tahmin Oyunu</Text>
      {!isGameStarted && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Oda ID'sini girin"
            value={roomId}
            onChangeText={setRoomId}
          />
          <Button title="Oda Oluştur" onPress={createRoom} />
          <Button title="Odaya Katıl" onPress={joinRoom} />
        </>
      )}
      {isGameStarted && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Tahmininizi girin (4 basamaklı)"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
          />
          <Button title="Tahmin Gönder" onPress={handleGuess} />
          {/* Odayı kapatma butonunu burada açabilirsiniz */}
          {/* <Button title="Odayı Kapat" onPress={leaveRoom} /> */}
        </View>
      )}
      <FlatList
        data={feedback}
        renderItem={({ item }) => <Text style={styles.feedback}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={isGameOver}
        onRequestClose={() => setIsGameOver(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{winnerMessage}</Text>
            {/* <Button title="Tekrar Oyna" onPress={restartGame} /> */}
            <Button title="Odadın Ayrıl" onPress={leaveRoom} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  feedback: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default MultiplayerScreen;
