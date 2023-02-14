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
      childComments {
        comments {
          id
          content
          childComments {
            count
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

export { COMMENT_QUERY };
