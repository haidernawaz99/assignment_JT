import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import JobDetail from "../components/JobDetail";
import Layout from "../components/Layout";
import { SearchBarQuery } from "../interfaces/searchBarQuery";
import Error from "next/error";

const FETCH_JOB_DETAILS = gql`
  query fetchJobs($input: GetJobInputParams!) {
    jobs(input: $input) {
      company
      position
      location
      jobDescription
      howToApply
      public
      email
      type
      category
      createdAt
      logo
      expiresAt
    }
  }
`;

export default function GlobalSearch() {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });
  const router = useRouter();
  let { jobID } = router.query;

  console.log(jobID);

  const [getJobDetails, { data, loading, error, refetch }] =
    useLazyQuery(FETCH_JOB_DETAILS);

  useLayoutEffect(() => {
    // I could've used useQuery and no useEffect, but it was fetching all the data on component mount.

    getJobDetails({
      variables: {
        input: {
          id: jobID,
        },
      },
    });
  }, [jobID]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <Error statusCode={404} title="Invalid Job ID" />;
  }

  if (data) {
    console.log(data);
    return (
      <Layout
        title={data.position}
        setSearch={setSearchBar}
        enableLocalSearch={false}
      >
        <JobDetail job={data.jobs[0]} />
      </Layout>
    );
  }
}
