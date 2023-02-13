import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation loginMutation($input: AccountInput) {
    login(input: $input) {
      access_token
      refresh_token
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation createAccount($input: AccountInput) {
    createAccount(input: $input) {
      _id
      email
    }
  }
`;

const GET_PROFILE = gql`
  query Profile {
    profile {
      _id
      email
    }
  }
`;

export { LOGIN_MUTATION, GET_PROFILE, REGISTER_MUTATION };
