const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = {
  users: [{ type: Schema.Types.ObjectId, ref: "account" }],
  count: {
    type: Number,
    default: 0,
  },
};

module.exports = { voteSchema };
