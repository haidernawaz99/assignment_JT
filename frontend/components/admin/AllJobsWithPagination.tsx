import Link from "next/link";

import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useLayoutEffect, useState } from "react";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";

import search from "../../utils/search";
import PaginationTable from "./PaginationTable";

type Props = {
  searchBar: SearchBarQuery;
};

const GET_JOBS_BY_PAGINATION_ADMIN = gql`
  query getJobByPaginationAdmin($input: GetJobPaginationAdminInputParams!) {
    getJobByPaginationAdmin(input: $input) {
      job {
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
      jobCount
    }
  }
`;

const AllJobsWithPagination = ({ searchBar }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading, error, refetch } = useQuery(
    GET_JOBS_BY_PAGINATION_ADMIN,
    {
      variables: {
        input: {
          limit: 20,
          skip: (currentPage - 1) * 20,
        },
      },
    }
  );

  // if user deletes a job, and current page is the last page, and the last job on the page is deleted, then the page will be empty. Thus show second last page now.
  if (data?.getJobByPaginationAdmin?.job?.length <= 0 && currentPage > 1)
    setCurrentPage(currentPage - 1);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      <div>
        {search(data.getJobByPaginationAdmin.job, searchBar).length > 0 && (
          <PaginationTable
            data={search(data.getJobByPaginationAdmin.job, searchBar) as any}
            setCurrentPage={setCurrentPage}
            totalDataCount={data.getJobByPaginationAdmin.jobCount}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default AllJobsWithPagination;
