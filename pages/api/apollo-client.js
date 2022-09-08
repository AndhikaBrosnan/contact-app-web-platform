import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BE_ENDPOINT,
  credentials: "same-origin",
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BE_ENDPOINT,
  link,
  cache: new InMemoryCache(),
});

export default client;
