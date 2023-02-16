const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConnected = require("../datasource/connection.mongodb");
const schema = new Schema(
  {
    hashtag: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.index({ hashtag: 1 });
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

module.exports = dbConnected.model("hashtag", schema);
