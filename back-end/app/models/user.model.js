module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          username: String,
          firstName: String,
          lastName: String,
          password: String
        },
        { timestamps: true }
      )
    );
    return User;
  };