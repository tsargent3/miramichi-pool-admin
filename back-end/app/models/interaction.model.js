const mongoose = require("mongoose");

const Interaction = mongoose.model(
  "Interaction",
  new mongoose.Schema({
    customerId: String,
    authorName: String,
    message: String,
    important: Boolean,
  },
    { timestamps: true }
  )
);

module.exports = Interaction;