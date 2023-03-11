const products = [
  {
    id: 1,
    description: "red shoe",
    price: 23.42,
    reviews: [],
  },
  {
    id: 2,
    description: "blue jean",
    price: 31.21,
    reviews: [],
  },
];

function getAllProducts() {
  return products;
}

function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price > min && product.price < max;
  });
}

function getProductById(id) {
  return products.find((product) => {
    return product.id === id;
  });
}

function setNewProduct(id, description, price) {
  const newProduct = { id, description, price, reviews: [] };
  products.push(newProduct);

  return newProduct;
}

function setReview(id, rating, comment) {
  const productToReview = getProductById(Number(id));
  if (!productToReview) throw Error("Product not found!");

  productToReview.reviews.push({ rating, comment });
  return { rating, comment };
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  setNewProduct,
  setReview,
};
