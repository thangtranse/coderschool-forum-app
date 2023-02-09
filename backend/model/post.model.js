const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbConnected = require("../datasource/connection.mongodb");

const schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "account", required: true },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
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

module.exports = dbConnected.model("post", schema);
