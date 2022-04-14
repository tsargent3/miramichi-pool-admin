const db = require("../models");
const User = db.users;
// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body.creds) {
      res.status(400).send({ message: "Creds can not be empty!" });
      return;
      }
      // Create a Tutorial
      const user = new User({
      username: req.body.username,
      firstName: 'Tyler',
      lastName: 'Sargent',
      password: req.body.password,
      });
      // Save User in the database
      user
      .save(user)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
          message:
              err.message || "An error occurred while creating the User."
          });
      });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
};
// Find a single User with an id
exports.findOne = (req, res) => {
  
};
// Update a User by the id in the request
exports.update = (req, res) => {
  
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Users
exports.findAllPublished = (req, res) => {
  
};
