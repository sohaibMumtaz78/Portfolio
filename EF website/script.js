function orderNow(product) {
  let phone = "923023310413"; // apna number dalna
  let message = "I want to order: " + product;

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}