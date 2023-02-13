import { gql } from "@apollo/client";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
      _id
      title
      content
      tags
      author {
        _id
        email
      }
      upvotes
      downvotes
      createdAt
      updatedAt
    }
  }
`;

const GET_POSTS_QUERY = gql`
  query Posts($limit: Int, $hasNextPage: Float) {
    posts(limit: $limit, hasNextPage: $hasNextPage) {
      data {
        _id
        title
        createdAt
        content
        author {
          _id
          email
        }
        upvotes
        downvotes
        tags
      }
      pageInfo {
        total
        hasNextPage
      }
    }
  }
`;

export { CREATE_POST_MUTATION, GET_POSTS_QUERY };
