import { gql } from "@apollo/client";

const HASHTAG_RECOMMENT = gql`
  query Recomment_hashtag($search: String) {
    recomment_hashtag(search: $search) {
      hashtag
    }
  }
`;

export { HASHTAG_RECOMMENT };
