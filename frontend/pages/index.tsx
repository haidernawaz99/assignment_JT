import Link from "next/link";
import Layout from "../components/Layout";
import RecentJobs from "../components/RecentJobs";
import RecentJobTable from "../components/RecentJobTable";

import Users from "../components/Users";

const IndexPage = () => {
  return (
    <Layout title="Jobeet">
      <RecentJobs />
    </Layout>
  );
};

export default IndexPage;
