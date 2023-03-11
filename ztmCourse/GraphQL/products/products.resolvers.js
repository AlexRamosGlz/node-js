const {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  setNewProduct,
  setReview,
} = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      return getAllProducts();
    },
    productsByPrice: (_, { min, max }) => {
      return getProductsByPrice(min, max);
    },
    productById: (_, { id }) => {
      console.log(getProductById(Number(id)));
      return getProductById(Number(id));
    },
  },

  Mutation: {
    addNewProduct: (_, { id, description, price }) => {
      return setNewProduct(id, description, price);
    },

    addNewReview: (_, { id, rating, comment }) => {
      // console.log(setReview(id, rating, comment), "review");
      return setReview(id, rating, comment);
    },
  },
};
