const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.log({ pass: this.password, user: this.user });
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
