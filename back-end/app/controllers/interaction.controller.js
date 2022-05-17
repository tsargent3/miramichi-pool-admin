const db = require("../models");
const Interaction = db.interactions;
const User = db.users;

exports.get = (req, res) => {
    Interaction.find({
      customerId: req.params.customer_id
    })
      .exec((err, interactions) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (interactions.length < 1) {
          return res.status(404).send({ message: "No interactions found." });
        }
        
        res.status(200).send({
          interactions,
        });
      });
  };

  exports.create = (req, res) => {
    const interaction = new Interaction({
      customerId: req.body.customerId,
      message: req.body.message,
      important: req.body.important,
    });
    
    interaction.save((err, interaction) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(req.body.userId){
        User.findOne({_id: req.body.userId},
          (err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if(!user){
              return res.status(404).send({ message: "User not found." });
            }
  
            interaction.authorName = user.firstName + " " + user.lastName;
            interaction.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "Interaction was created successfully!", interaction});
            });
          }
        );
      }else{
        res.status(500).send({message: "Author not found when creating interaction. Please ensure you are logged in."});
      }
    });
    
  };

  exports.delete = (req, res) => {
      Interaction.findOneAndDelete({
        _id: req.params.interaction_id
      })
        .exec((err, interaction) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!interaction) {
            return res.status(404).send({ message: "Interaction not found." });
          }
          else {
              res.send({ message: "Interaction was deleted successfully!" });
          }
      });
  };