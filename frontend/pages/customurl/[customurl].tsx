import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import Error from "next/error";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";
import Layout from "../../components/Layout/Layout";
import JobDetail from "../../components/JobDetail";

// const reloadSession = () => {
//   const event = new Event("visibilitychange");
//   document.dispatchEvent(event);
// };

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

export default function CustomURL() {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });
  const router = useRouter();
  let { customurl } = router.query;

  console.log(customurl);

  const [getJobDetails, { data, loading, error, refetch }] =
    useLazyQuery(FETCH_JOB_DETAILS);

  // useEffect(() => {
  //   reloadSession();
  // }, []);

  useEffect(() => {
    // I could've used useQuery and no useEffect, but it was fetching all the data on component mount.

    getJobDetails({
      variables: {
        input: {
          customURL: customurl,
        },
      },
    });
  }, [customurl]);

  if (error || data?.jobs[0]?.length === 0) {
    console.error(error);
    return <Error statusCode={404} title="Invalid Custom URL" />;
  }

  if (!data) {
    return <h2>Loading...</h2>;
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
