import Link from "next/link";

import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useLayoutEffect, useState } from "react";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";

import search from "../../utils/search";
import PaginationTable from "./PaginationTable";

type Props = {
  searchBar: SearchBarQuery;
};

const GET_ALL_JOBS_ADMIN = gql`
  query getAllJobsAdmin {
    getAllJobsAdmin {
      location
      position
      company
      category
      id
      expiresAt
      createdAt
      type
      editToken
    }
  }
`;

const AllJobsWithPagination = ({ searchBar }: Props) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_JOBS_ADMIN);

  // if user deletes a job, and current page is the last page, and the last job on the page is deleted, then the page will be empty. Thus show second last page now.

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      <div>
        {search(data.getAllJobsAdmin, searchBar).length > 0 && (
          <PaginationTable
            data={search(data.getAllJobsAdmin, searchBar) as any}
          />
        )}
      </div>
    </>
  );
};

export default AllJobsWithPagination;
