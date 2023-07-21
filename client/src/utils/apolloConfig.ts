import { ApolloClient, InMemoryCache } from "@apollo/client";

const link = "http://localhost:4000";

export const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache(),
});
