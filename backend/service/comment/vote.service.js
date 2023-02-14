const { getById } = require("../../store/comment.store");

const upvote = async (commentId, userId) => {
  const comment = await getById(commentId);
  console.log("comment", commentId);
  const index = comment.downvotes.users.indexOf(userId);
  if (index !== -1) {
    comment.downvotes.users.splice(index, 1);
    comment.downvotes.count -= 1;
  }
  if (!comment.upvotes.users.includes(userId)) {
    comment.upvotes.users.push(userId);
    comment.upvotes.count += 1;
  }
  return await comment.save();
};

const downvote = async (commentId, userId) => {
  const comment = await getById(commentId);
  const index = comment.upvotes.users.indexOf(userId);
  if (index !== -1) {
    comment.upvotes.users.splice(index, 1);
    comment.upvotes.count -= 1;
  }
  if (!comment.downvotes.users.includes(userId)) {
    comment.downvotes.users.push(userId);
    comment.downvotes.count += 1;
  }
  return await comment.save();
};

module.exports = { upvote, downvote };
