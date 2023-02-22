import Link from "next/link";
import Layout from "../components/Layout";
import RecentJobInfo from "../components/RecentJobInfo";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <RecentJobInfo category="Design" />
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
);

export default IndexPage;
