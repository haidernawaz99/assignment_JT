import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const getTimeDifferenceInSeconds = (date1: Date, date2: Date): number => {
  const difference = date1.getTime() - date2.getTime();
  return difference / 1000;
};
const uploadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
});

const reloadSession = async () => {
  // const currentSessionExpiresAt = (await getSession())?.expires;
  // if (currentSessionExpiresAt) {
  //   const currentTimeDifferenceInSeconds = getTimeDifferenceInSeconds(
  //     new Date(currentSessionExpiresAt),
  //     new Date()
  //   );
  //   console.log(currentTimeDifferenceInSeconds);
  //   // Do not request for a new token if the current token expires in more than 3 seconds
  //   if (currentTimeDifferenceInSeconds > 3) {
  //     console.log("heheh");
  //     return;
  //   }
  // }
  console.log("refreshing session");

  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

const refreshSession = setContext(async (request, { headers }) => {
  // only ask for a new token if the current token expires in less than 3 seconds
  // console.log((await getSession())?.expires);
  // if (request.operationName !== "login") {
  //   await reloadSession();
  // }
});

const authLink = setContext(async (request, { headers }) => {
  const session = await getSession();
  // get the authentication token from next-auth provider if it exists

  const token = session?.accessToken;

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
