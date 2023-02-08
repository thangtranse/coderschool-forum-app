const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbConnected = require("../datasource/connection.mongodb");

const schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    properties: {},
  },
  { timestamps: true }
);

// middleware mongo method save
schema.pre("save", async function (next) {
  try {
    console.log("Called before save::", this.phone);
    next();
  } catch (error) {
    next(error);
  }
});

schema.pre("update", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = dbConnected.model("account", schema);
