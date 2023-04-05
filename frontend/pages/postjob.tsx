import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Typography } from "antd";
import JobForm from "../components/JobForm";
import { gql, useMutation } from "@apollo/client";

const { Title } = Typography;

const MUTATION = gql`
  mutation createJob($input: JobCreateInput!) {
    createJob(input: $input) {
      company
      id
      editToken
    }
  }
`;

const PostJob = () => {
  const [uploadFormdata, { data, loading, error }] = useMutation(MUTATION, {
    //TODO: make this work!
    // refetchQueries: ["QUERY"],
  });

  return (
    <Layout title="Post a Job" enableLocalSearch={false}>
      <Title level={3}>Post a Job</Title>
      <JobForm uploadFormdata={uploadFormdata} isUpdating={false} data={data} />
    </Layout>
  );
};

export default PostJob;
PostJob.getLayout = (page) => {
  return <>{page} </>;
};
