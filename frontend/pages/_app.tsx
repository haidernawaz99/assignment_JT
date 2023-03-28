import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { SessionProvider } from "next-auth/react";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./global.css";

export default function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ApolloProvider client={client}>
        <ProSidebarProvider>
          <Component {...pageProps} />
        </ProSidebarProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
