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
        upvotes {
          count
        }
        downvotes {
          count
        }
        tags
        comments {
          comments {
            id
            author {
              _id
              email
            }
            content
            childComments {
              count
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
          count
        }
      }
      pageInfo {
        total
        hasNextPage
      }
    }
  }
`;

const UPVOTE_POST = gql`
  mutation UpvotePost($id: ID!) {
    upvotePost(_id: $id) {
      status
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

const DOWNVOTE_POST = gql`
  mutation DownvotePost($id: ID!) {
    downvotePost(_id: $id) {
      status
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

export { CREATE_POST_MUTATION, GET_POSTS_QUERY, UPVOTE_POST, DOWNVOTE_POST };
