import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../../components/Layout";
import RecentJobTable from "../../../components/RecentJobTable";
import { SearchBarQuery } from "../../../interfaces/searchBarQuery";
import filterJobsByCategory from "../../../utils/filterJobsByCategory";

const GLOBAL_SEARCH = gql`
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

export default function GlobalSearch() {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });
  const router = useRouter();
  let { option, searchText } = router.query;
  let optionParamKey = router.query.option as string; // <== Dynamic Key. this is the key for the input object. It is either "category", "position", "company", or "location".
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [getSearchResult, { data, loading, error, refetch }] =
    useLazyQuery(GLOBAL_SEARCH);

  useLayoutEffect(() => {
    // I could've used useQuery and no useEffect, but it was fetching all the data on component mount.
    if (optionParamKey === "category") {
      // the backend is expecting "categories" as the key for the array of categories. For example, if the user searches for "Design", the backend is expecting "categories: ["Design"]
      optionParamKey = "categories";
      searchText = searchText[0].toUpperCase() + searchText.slice(1);
      searchText = [searchText as string];
      console.log(searchText);
    }
    getSearchResult({
      variables: {
        input: {
          [optionParamKey]: searchText,
        },
      },
    });
  }, [searchText, option]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (data) {
    console.log(data);
    return (
      <Layout title="Global Search" setSearch={setSearchBar}>
        {filterJobsByCategory(data, searchBar).designJobs.length > 0 && (
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
        )}
      </Layout>
    );
  }
}
