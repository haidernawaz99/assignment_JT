import Link from "next/link";
import Layout from "./Layout/Layout";
import RecentJobTable from "../components/RecentJobTable";

import Users from "../components/Users";

import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { SearchBarQuery } from "../interfaces/searchBarQuery";
import search from "../utils/search";
import filterJobsByCategory from "../utils/filterJobsByCategory";

type Props = {
  getAllCategories: boolean;
  searchBar: SearchBarQuery;
};

const QUERY = gql`
  query fetchJobs($input: GetJobInputParams!) {
    jobs(input: $input) {
      location
      position
      company
      category
      id
      expiresAt
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      categories
    }
  }
`;

const RecentJobs = ({ getAllCategories, searchBar }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORIES);
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      input: {
        categories: getAllCategories ? ["all"] : null,

        limit: 10,
      },
    },
  });

  //   useEffect(() => {
  //     refetch();
  //   }, []);

  if (!data) {
    console.log(loading);
    return <h2>Loading ...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  // const filterJobsByCategory = () => {
  //   let jobs = data.jobs;
  //   // map object's id to key
  //   jobs = data.jobs.map((job) => ({ ...job, key: job.id }));

  //   if (searchBar.text !== "") {
  //     // if search bar is not empty, factor that in!
  //     const searchResults = search(jobs, searchBar);
  //     jobs = searchResults;
  //   }

  //   const designJobs = jobs.filter((job) => job.category === "Design");
  //   const developmentJobs = jobs.filter(
  //     (job) => job.category === "Development"
  //   );
  //   const productJobs = jobs.filter((job) => job.category === "Product");
  //   const otherJobs = jobs.filter((job) => job.category === "Other");

  //   return {
  //     designJobs,
  //     developmentJobs,
  //     productJobs,
  //     otherJobs,
  //   };
  // };

  console.log(data);

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

        {
          // Object.keys(filterJobsByCategory(data, searchBar)).length>0 && (
          Object.keys(filterJobsByCategory(data.jobs, searchBar)).map(
            (category) => {
              return (
                <RecentJobTable
                  category={category}
                  data={filterJobsByCategory(data.jobs, searchBar)[category]}
                  setCurrentPage={setCurrentPage}
                />
              );
            }
          )
        }
        {/* {filterJobsByCategory(data, searchBar).designJobs.length > 0 && (
          <RecentJobTable
            category={"Design"}
            data={filterJobsByCategory(data, searchBar).designJobs}
            setCurrentPage={setCurrentPage}
          />
        )}
        {filterJobsByCategory(data, searchBar).developmentJobs.length > 0 && (
          <RecentJobTable
            category={"Development"}
            data={filterJobsByCategory(data, searchBar).developmentJobs}
            setCurrentPage={setCurrentPage}
          />
        )}
        {filterJobsByCategory(data, searchBar).productJobs.length > 0 && (
          <RecentJobTable
            category={"Product"}
            data={filterJobsByCategory(data, searchBar).productJobs}
            setCurrentPage={setCurrentPage}
          />
        )}
        {filterJobsByCategory(data, searchBar).otherJobs.length > 0 && (
          <RecentJobTable
            category={"Other"}
            data={filterJobsByCategory(data, searchBar).otherJobs}
            setCurrentPage={setCurrentPage}
          />
        )} */}
      </div>
    </>
  );
};

export default RecentJobs;
