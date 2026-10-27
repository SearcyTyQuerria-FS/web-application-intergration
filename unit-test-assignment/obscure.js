const obscure = (cardNumber) => {
  if (cardNumber.length < 12 || cardNumber.length > 16) {
    return "Invalid Credit Card";
  }
  const lastFour = cardNumber.slice(-4);
  const stars = "*".repeat(cardNumber.length - 4);
  return stars + lastFour;
};

module.exports = obscure;
