import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
