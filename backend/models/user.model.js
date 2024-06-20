const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
