import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const uploadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
});

const refreshSession = setContext(async (request, { headers }) => {
  console.log(`refreshSession`);
  console.log(request);
});

const client = new ApolloClient({
  link: refreshSession.concat(uploadLink),
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: { fetchPolicy: "no-cache" },
  //   query: { fetchPolicy: "no-cache" },
  // },
});

export default client;
