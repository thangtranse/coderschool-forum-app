import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPH_QL_PATH,
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_QL_PATH,
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink),
});

export default client;
