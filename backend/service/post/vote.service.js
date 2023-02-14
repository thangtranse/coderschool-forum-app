const mongoose = require("mongoose");
const { getById } = require("../../store/post.store");

const upvotePost = async (postId, userId) => {
  const post = await getById(postId);
  const index = post.downvotes.users.indexOf(userId);
  if (index !== -1) {
    post.downvotes.users.splice(index, 1);
    post.downvotes.count -= 1;
  }
  if (!post.upvotes.users.includes(userId)) {
    post.upvotes.users.push(userId);
    post.upvotes.count += 1;
  }
  return await post.save();
};

const downvotePost = async (postId, userId) => {
  const post = await getById(postId);
  const index = post.upvotes.users.indexOf(userId);
  if (index !== -1) {
    post.upvotes.users.splice(index, 1);
    post.upvotes.count -= 1;
  }
  if (!post.downvotes.users.includes(userId)) {
    post.downvotes.users.push(userId);
    post.downvotes.count += 1;
  }
  return await post.save();
};

module.exports = { upvotePost, downvotePost };
