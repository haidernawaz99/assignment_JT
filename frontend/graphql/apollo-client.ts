import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const uploadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
});

const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

const refreshSession = setContext(async (request, { headers }) => {
  console.log(`refreshSession`);
  if (request.operationName !== "login") {
    reloadSession();
  }

  console.log(`AC - refreshSession`);
  console.log(request);
});

const authLink = setContext(async (request, { headers }) => {
  const session = await getSession();
  // get the authentication token from next-auth provider if it exists

  const token = session?.accessToken;
  console.log("`````````````````````````````````````");
  console.log(session);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: refreshSession.concat(authLink.concat(uploadLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
