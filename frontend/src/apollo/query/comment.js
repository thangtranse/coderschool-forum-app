import { gql } from "@apollo/client";

const COMMENT_QUERY = gql`
  query Comment($commentId: ID!) {
    comment(id: $commentId) {
      id
      content
      author {
        email
        _id
      }
      parentComment {
        id
      }
      post {
        _id
      }
      childComments {
        comments {
          id
          content
          childComments {
            count
          }
          parentComment {
            id
          }
          post {
            _id
          }
          author {
            email
            _id
          }
          upvotes {
            users {
              _id
            }
            count
          }
          downvotes {
            users {
              _id
            }
            count
          }
        }
      }
      upvotes {
        users {
          _id
        }
        count
      }
      downvotes {
        users {
          _id
        }
        count
      }
    }
  }
`;

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($input: CreateCommentInput!) {
    addComment(input: $input) {
      id
      author {
        _id
        email
      }
      content
      createdAt
      parentComment {
        id
      }
      post {
        _id
      }
    }
  }
`;

export { COMMENT_QUERY, ADD_COMMENT_MUTATION };
