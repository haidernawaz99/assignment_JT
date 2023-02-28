import Link from "next/link";
import Layout from "../components/Layout";
import RecentJobTable from "../components/RecentJobTable";

import Users from "../components/Users";

import { useQuery, gql } from "@apollo/client";
const QUERY = gql`
  query {
    jobs(input: { limit: 10 }) {
      location
      position
      company
      category
    }
  }
`;

const RecentJobs = () => {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  const filterJobsByCategory = () => {
    const jobs = data.jobs;
    const designJobs = jobs.filter((job) => job.category === "Design");
    const developmentJobs = jobs.filter(
      (job) => job.category === "Development"
    );
    const productJobs = jobs.filter((job) => job.category === "Product");
    const otherJobs = jobs.filter((job) => job.category === "Other");

    return {
      designJobs,
      developmentJobs,
      productJobs,
      otherJobs,
    };
  };

  return (
    <>
      <div>
        {/* {jobs.map((job) => (
          <div>
            <h3>{job.id}</h3>
            <h3>{job.position}</h3>
            <RecentJobTable category={job.category} />
          </div>
        ))} */}
        <RecentJobTable
          category={"Design"}
          data={filterJobsByCategory().designJobs}
        />
        <RecentJobTable
          category={"Development"}
          data={filterJobsByCategory().developmentJobs}
        />
        <RecentJobTable
          category={"Product"}
          data={filterJobsByCategory().productJobs}
        />
        <RecentJobTable
          category={"Other"}
          data={filterJobsByCategory().otherJobs}
        />
      </div>
    </>
  );
};

export default RecentJobs;
