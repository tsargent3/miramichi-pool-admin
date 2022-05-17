const db = require("../models");
const Customer = db.customers;

exports.create = (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    status: "good",
    address: req.body.address,
    postalCode: req.body.postalCode,
    phone: req.body.phone,
    email: req.body.email,
  });

  customer.save((err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Customer was created successfully!", customer_id: customer._id});
  });
};

exports.notifyUpdate = (req, res) => {
  Customer.findOne({
    _id: req.params.customer_id
  })
    .exec((err, customer) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!customer) {
        return res.status(404).send({ message: "Customer not found." });
      }
      else {
          customer.updatedAt = req.body.timestamp;
          customer.save((err, customer) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Customer last updated time updated successfully!", customer});
          });
      }
  });
};

exports.update = (req, res) => {
    Customer.findOne({
      _id: req.params.customer_id
    })
      .exec((err, customer) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!customer) {
          return res.status(404).send({ message: "Customer not found." });
        }
        else {
            customer.firstName = req.body.firstName;
            customer.lastName = req.body.lastName;
            customer.address = req.body.address;
            customer.postalCode = req.body.postalCode;
            customer.email = req.body.email;
            customer.phone = req.body.phone;

            customer.save((err, customer) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "Customer was updated successfully!", customer});
            });
        }
    });
};

exports.updateStatus = (req, res) => {
    Customer.findOne({
      _id: req.params.customer_id
    })
      .exec((err, customer) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!customer) {
          return res.status(404).send({ message: "Customer not found." });
        }
        else {
            customer.status = req.body.status;

            customer.save((err, customer) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "Customer status was updated successfully!", customer});
            });
        }
    });
};

exports.delete = (req, res) => {
    Customer.findOneAndDelete({
      _id: req.params.customer_id
    })
      .exec((err, customer) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!customer) {
          return res.status(404).send({ message: "Customer not found." });
        }
        else {
            res.send({ message: "Customer" + customer.firstName + " " + customer.lastName + " was deleted successfully!" });
        }
    });
};

exports.get = (req, res) => {
  Customer.findOne({
    _id: req.params.customer_id
  })
    .exec((err, customer) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!customer) {
        return res.status(404).send({ message: "Customer not found." });
      }
      
      res.status(200).send({
        customer_id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        postalCode: customer.postalCode,
        phone: customer.phone,
        status: customer.status,
        lastUpdated: customer.updatedAt,
      });
    });
};

exports.getAll = (req, res) => {
  Customer.find({})
    .exec((err, customers) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!customers) {
        return res.status(204).send({ message: "No customers found." });
      }
      
      res.status(200).send({
        customers: customers,
      });
    });
};