const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
          username: {
            type: String,
            required: true,
          },
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          password: {
            type: String,
            required: true,
          },
          roles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
            }
          ]
        },
        { timestamps: true }
      );

const User = mongoose.model("User", userSchema);
module.exports = User;