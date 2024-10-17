const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const generateRandomNumber = require("./numberGenerator"); // Rakam üreteci
const checkGuess = require("./gameLogic"); // Tahmin kontrol fonksiyonu

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;
const rooms = {};
const roomsData = {};

app.get("/create-room", (req, res) => {
  const roomId = uuidv4(); // Benzersiz bir ID oluştur
  const targetNumber = generateRandomNumber();
  rooms[roomId] = { players: [], guesses: [] };
  roomsData[roomId] = { targetNumber }; // Oda için hedef sayıyı sakla
  res.json({ roomId, targetNumber });
});

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı:", socket.id);

  socket.on("joinRoom", (roomId, playerId) => {
    if (!rooms[roomId]) {
      socket.emit("error", "Oda bulunamadı.");
      return;
    }

    socket.join(roomId);
    rooms[roomId].players.push(playerId); // Burada playerId'yi kullanın
    console.log(`${playerId} katıldı: ${roomId}`);

    if (rooms[roomId].players.length === 2) {
      io.to(roomId).emit("gameStart", "Oyun başladı!");
    }
  });

  //   socket.on("restartGame", (roomId) => {
  //     if (!rooms[roomId]) return;

  //     // Yeni bir hedef sayı oluştur
  //     const targetNumber = generateRandomNumber();
  //     roomsData[roomId].targetNumber = targetNumber; // Yeni hedef sayıyı sakla
  //     rooms[roomId].guesses = []; // Önceki tahminleri sıfırla

  //     io.to(roomId).emit("gameStart", "Oyun tekrar başladı!");
  //   });

  socket.on("guess", ({ roomId, guess, playerId }) => {
    if (!rooms[roomId]) return;

    // Her oyuncunun kaç tahmin yaptığını takip et
    const playerGuesses = rooms[roomId].guesses.filter(
      (g) => g.playerId === playerId
    ).length;

    if (playerGuesses >= 8) {
      socket.emit("error", "Tahmin hakkınız doldu.");
      return; // Eğer tahmin hakkı dolmuşsa, tahmini kabul etme
    }

    // Tahmin kontrolü
    const { targetNumber } = roomsData[roomId];
    const { plus, minus } = checkGuess(guess, targetNumber);

    rooms[roomId].guesses.push({ playerId, guess, plus, minus });
    io.to(roomId).emit("newGuess", { playerId, guess, plus, minus });

    // Oyun bitimi kontrolü
    if (plus === 4) {
      io.to(roomId).emit("gameOver", `${playerId} kazandı!`);
      return; // Oyunu bitir
    }

    // Eğer iki oyuncunun toplam tahmin sayısı 4'e ulaştıysa, oyun bitmiştir
    if (rooms[roomId].guesses.length === 4) {
      const winners = rooms[roomId].guesses.filter((g) => g.plus === 4);
      if (winners.length > 0) {
        io.to(roomId).emit("gameOver", `${winners[0].playerId} kazandı!`);
      } else {
        io.to(roomId).emit("gameOver", "Oyun bitti! Beraberlik.");
      }
    }
  });

  socket.on("leaveRoom", (roomId) => {
    if (!rooms[roomId]) return;

    // Oyuncuyu odadan çıkar
    socket.leave(roomId);
    rooms[roomId].players = rooms[roomId].players.filter(
      (id) => id !== socket.id
    );

    // Diğer oyunculara bilgi gönder
    const playerId = socket.id; // Ayrılan oyuncunun ID'si
    socket.to(roomId).emit("playerLeft", `${playerId} odadan ayrıldı.`);

    // Oda boşsa odayı silin
    if (rooms[roomId].players.length === 0) {
      delete rooms[roomId];
      delete roomsData[roomId];
    }
  });

  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
