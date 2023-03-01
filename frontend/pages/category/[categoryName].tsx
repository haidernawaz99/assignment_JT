import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import RecentJobTable from "../../components/RecentJobTable";
import { useQuery, gql, ApolloClient, ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../graphql/apollo-client";

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
  const [currentPage, setCurrentPage] = useState(1);

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
    return { jobs, jobCount };
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(currentPage);

  return (
    <Layout>
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
