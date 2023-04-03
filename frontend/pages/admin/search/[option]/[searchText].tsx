import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import RecentJobTable from "../../../../components/RecentJobTable";
import { SearchBarQuery } from "../../../../interfaces/searchBarQuery";
import filterJobsByCategory from "../../../../utils/filterJobsByCategory";

const GLOBAL_SEARCH_ADMIN = gql`
  query searchJobAdmin($input: SearchJobAdminInputParams!) {
    searchJobAdmin(input: $input) {
      location
      position
      company
      category
      id
      expiresAt
      editToken
    }
  }
`;

export default function AdminGlobalSearch() {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });
  const router = useRouter();
  let { option, searchText } = router.query;
  let optionParamKey = router.query.option as string; // <== Dynamic Key. this is the key for the input object. It is either "category", "position", "company", or "location".
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [getSearchResult, { data, loading, error, refetch }] =
    useLazyQuery(GLOBAL_SEARCH_ADMIN);

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

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (data) {
    console.log(data);

    return (
      <AdminLayout title="Global Search" setSearch={setSearchBar}>
        {
          // Object.keys(filterJobsByCategory(data, searchBar)).length>0 && (
          Object.keys(filterJobsByCategory(data.searchJobAdmin, searchBar)).map(
            (category) => {
              return (
                <RecentJobTable
                  category={category}
                  data={
                    filterJobsByCategory(data.searchJobAdmin, searchBar)[
                      category
                    ]
                  }
                  setCurrentPage={setCurrentPage}
                  isEditable={true}
                />
              );
            }
          )
        }
      </AdminLayout>
    );
  }
}
