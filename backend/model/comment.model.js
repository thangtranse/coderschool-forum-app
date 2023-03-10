const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { voteSchema } = require("./ext.schema");
const dbConnected = require("../datasource/connection.mongodb");
const schema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
    childComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    upvotes: voteSchema,
    downvotes: voteSchema,
  },
  { timestamps: true }
);

schema.index({ post: 1, createdAt: -1 });
schema.pre("update", function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = dbConnected.model("comment", schema);
