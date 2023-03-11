const { getAllOrders } = require("./orders.model");

module.exports = {
  Query: {
    orders: async () => {
      return await getAllOrders();
    },
  },
};
