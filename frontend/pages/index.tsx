import Link from "next/link";
import Layout from "../components/Layout";
import RecentJobInfo from "../components/RecentJobInfo";

import Users from "../components/Users";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <RecentJobInfo category="Design" />
    <RecentJobInfo category="Programming" />
    <Users />
  </Layout>
);

export default IndexPage;
