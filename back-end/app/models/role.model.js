const mongoose = require("mongoose");
const roleSchema = mongoose.model(
  "Role",
  new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
    })
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
