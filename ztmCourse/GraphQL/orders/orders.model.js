const orders = [
  {
    date: "2005-05-05",
    subtotal: 90.92,
    items: [
      {
        product: {
          id: 1,
          description: "algo",
          price: 26.6,
        },
        quantity: 2,
      },
    ],
  },
];

function getAllOrders() {
  return orders;
}

module.exports = {
  getAllOrders,
};
