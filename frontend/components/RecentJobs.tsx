import Link from "next/link";
import Layout from "../components/Layout";
import RecentJobTable from "../components/RecentJobTable";

import Users from "../components/Users";

import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

type Props = {
  getAllCategories: boolean;
};

const QUERY = gql`
  query fetchJobs($input: GetJobInputParams!) {
    jobs(input: $input) {
      location
      position
      company
      category
      id
    }
  }
`;

const RecentJobs = ({ getAllCategories }: Props) => {
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      input: {
        categories: getAllCategories
          ? ["Design", "Development", "Product", "Other"]
          : null,

        limit: 10,
      },
    },
  });
  console.log("dasdasdas");

  //   useEffect(() => {
  //     refetch();
  //   }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  const filterJobsByCategory = () => {
    let jobs = data.jobs;
    // map object's id to key
    jobs = data.jobs.map((job) => ({ ...job, key: job.id }));
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
        {filterJobsByCategory().designJobs.length > 0 && (
          <RecentJobTable
            category={"Design"}
            data={filterJobsByCategory().designJobs}
          />
        )}
        {filterJobsByCategory().developmentJobs.length > 0 && (
          <RecentJobTable
            category={"Development"}
            data={filterJobsByCategory().developmentJobs}
          />
        )}
        {filterJobsByCategory().productJobs.length > 0 && (
          <RecentJobTable
            category={"Product"}
            data={filterJobsByCategory().productJobs}
          />
        )}
        {filterJobsByCategory().otherJobs.length > 0 && (
          <RecentJobTable
            category={"Other"}
            data={filterJobsByCategory().otherJobs}
          />
        )}
      </div>
    </>
  );
};

export default RecentJobs;
