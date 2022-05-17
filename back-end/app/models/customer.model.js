const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    status: String,
    email: String,
    phone: String,
    address: String,
    postalCode: String,
  },
    { timestamps: true }
  )
);

module.exports = Customer;