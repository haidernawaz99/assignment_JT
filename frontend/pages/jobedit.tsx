import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Typography } from "antd";
import JobForm from "../components/JobForm";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Error from "next/error";
const { Title } = Typography;

const QUERY = gql`
  query fetchJobs($input: GetJobInputParams!) {
    jobs(input: $input) {
      location
      position
      company
      category
      id
      type
      jobDescription
      logo
      url
    }
  }
`;

const MUTATION = gql`
  mutation editJob($input: JobUpdateInput!) {
    editJob(input: $input) {
      company
      id
      editToken
      url
    }
  }
`;

const EditJob = () => {
  const router = useRouter();
  let { editToken } = router.query;

  const [
    updateFormdata,
    { data: mutatedData, loading: mutatedLoading, error: mutatedError },
  ] = useMutation(MUTATION, {
    //TODO: make this work!
    // refetchQueries: ["QUERY"],
  });
  const [fetchData, { data, loading, error, refetch }] = useLazyQuery(QUERY);
  useEffect(() => {
    fetchData({
      variables: {
        input: {
          editToken,
        },
      },
    });
  }, [editToken]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    console.error(error);
    return <Error statusCode={404} title="Invalid Job Edit Token" />;
  }

  if (data) {
    console.log(data);
  }

  return (
    data && (
      <Layout title="Edit a Job" enableLocalSearch={false}>
        <Title level={3}>Edit a Job</Title>
        <JobForm
          uploadFormdata={updateFormdata}
          data={data.jobs[0]}
          isUpdating={true}
          editToken={editToken as string}
        />
      </Layout>
    )
  );
};

export default EditJob;
