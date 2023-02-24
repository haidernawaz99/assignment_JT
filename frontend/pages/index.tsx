import Link from "next/link";
import Layout from "../components/Layout";
import RecentJobInfo from "../components/RecentJobInfo";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import Users from "../components/Users";

const IndexPage = () => (
  <ApolloProvider client={client}>
    <Layout title="Home | Next.js + TypeScript Example">
      <RecentJobInfo category="Design" />
      <RecentJobInfo category="Programming" />
      <Users />
    </Layout>
  </ApolloProvider>
);

export default IndexPage;
