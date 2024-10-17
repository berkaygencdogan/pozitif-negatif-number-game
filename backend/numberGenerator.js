// numberGenerator.js

const generateRandomNumber = () => {
  let digits = new Set();

  // İlk rakamı 1-9 arasında rastgele seç
  const firstDigit = Math.floor(Math.random() * 9) + 1; // 1-9
  digits.add(firstDigit);

  // Diğer 3 rakamı 0-9 arasında rastgele seç
  while (digits.size < 4) {
    const digit = Math.floor(Math.random() * 10); // 0-9 arasında rastgele bir rakam
    digits.add(digit);
  }

  return Array.from(digits).join("");
};

module.exports = generateRandomNumber; // Export'u değiştirdik
