const mongoose = require("mongoose");
const {
  count,
  createHashtag,
  getAll,
  findOneByHashtag,
  findOneAndUpdateHashtag,
} = require("../../store/hashtag.store");

const countHashtag = async (filter) => {
  return await count(filter);
};

const updateHashTag = async (hashtag, postId) => {
  return await findOneAndUpdateHashtag(hashtag, postId);
};

const updateHashTags = async (hashtags, postId) => {
  hashtags.forEach(async (hashtag) => {
    try {
      const existingHashtag = await findOneByHashtag(hashtag);
      if (existingHashtag) {
        existingHashtag.posts.push(postId);
        existingHashtag.count++;
        await existingHashtag.save();
      } else {
        await createHashtag({
          hashtag,
          posts: [postId],
          count: 1,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const recommentHashTag = async (keyHashtag) => {
  return await getAll({
    filter: {
      hashtag: { $regex: new RegExp(`^${keyHashtag}`, 'i') },
    },
    limit: 3,
  });
};

module.exports = {
  updateHashTag,
  updateHashTags,
  recommentHashTag,
  countHashtag,
};
