import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001/graphql"
    : "https://ops-service.main.gettenga.app";
export const TOKEN_str = "soko-token-web";

const httpLink = createHttpLink({
  uri: URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //   const token = localStorage.getItem(TOKEN_str);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      //   "soko-web-token": token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
