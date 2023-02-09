const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const dbConnected = require("../datasource/connection.mongodb");

const schema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unquie: true },
    password: { type: String, required: true },
    name: { type: String }
  },
  { timestamps: true }
);

// middleware mongo method save
schema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

schema.pre("update", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

schema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

module.exports = dbConnected.model("account", schema);
