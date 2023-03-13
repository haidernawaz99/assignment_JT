import Link from "next/link";
import React, { useState } from "react";
import { Typography } from "antd";

import { gql, useMutation } from "@apollo/client";
import AdminLayout from "../../../../components/admin/AdminLayout";
import JobForm from "../../../../components/JobForm";

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
    <AdminLayout title="Post a Job" enableLocalSearch={false}>
      <Title level={3}>Post a Job</Title>
      <JobForm uploadFormdata={uploadFormdata} isUpdating={false} data={data} />
    </AdminLayout>
  );
};

export default PostJob;
