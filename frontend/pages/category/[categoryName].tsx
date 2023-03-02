import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import RecentJobTable from "../../components/RecentJobTable";
import { useQuery, gql, ApolloClient, ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../graphql/apollo-client";
import search from "../../utils/search";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";

const GET_DATA_BY_PAGINATION = gql`
  query getJobByPagination($input: GetJobPaginationInputParams!) {
    getJobByPagination(input: $input) {
      job {
        location
        position
        company
        id
      }
      jobCount
    }
  }
`;

const Post = () => {
  const router = useRouter();
  const { categoryName } = router.query as { categoryName: string };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });

  const { data, loading, error, refetch } = useQuery(GET_DATA_BY_PAGINATION, {
    variables: {
      input: {
        category: categoryName,
        skip: (currentPage - 1) * 20,
        limit: 20,
      },
    },
  });
  const getJobsandCount = () => {
    let jobs = data.getJobByPagination.job;
    jobs = data.getJobByPagination.job.map((job) => ({ ...job, key: job.id }));
    const jobCount = data.getJobByPagination.jobCount;
    if (searchBar.text === "") {
      // if search bar is empty, return all jobs
      return { jobs, jobCount };
    }

    const searchResults = search(jobs, searchBar); // if search bar is not empty, return search results
    return { jobs: searchResults, jobCount };
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(searchBar);

  console.log(currentPage);

  return (
    <Layout categoryEnabled={false} setSearch={setSearchBar}>
      <RecentJobTable
        // currentPage={currentPage}
        category={categoryName}
        data={getJobsandCount().jobs}
        setCurrentPage={setCurrentPage}
        totalDataCount={getJobsandCount().jobCount}
      />
    </Layout>
  );
};

export default Post;
