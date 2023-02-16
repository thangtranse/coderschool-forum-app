const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { voteSchema } = require("./ext.schema");
const dbConnected = require("../datasource/connection.mongodb");
const schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "account", required: true },
    tags: [{ type: String }],
    upvotes: voteSchema,
    downvotes: voteSchema,
  },
  { timestamps: true }
);

schema.index({ author: 1 });
// middleware mongo method save
schema.pre("save", async function (next) {
  try {
    next();
  } catch (error) {
    next(error);
  }
});

schema.pre("update", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = dbConnected.model("post", schema);
