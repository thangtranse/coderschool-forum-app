import { gql } from "@apollo/client";

const UPVOTE_COMMENT = gql`
  mutation UpvoteComment($id: ID!) {
    upvoteComment(id: $id) {
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

const DOWNVOTE_COMMENT = gql`
  mutation DownvoteComment($id: ID!) {
    downvoteComment(id: $id) {
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

export { UPVOTE_COMMENT, DOWNVOTE_COMMENT };
