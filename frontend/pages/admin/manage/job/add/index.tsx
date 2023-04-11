import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import AdminLayout from "../../../../../components/admin/AdminLayout";
import JobForm from "../../../../../components/JobForm";
import { Card, CardContent, Typography } from "@mui/material";
import UserLayout from "../../../../../layouts/UserLayout";
import Link from "@mui/material/Link";

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
    <>
      <Typography variant="h5">
        <Link>Create a Job</Link>
      </Typography>
      <Typography variant="body2">
        An asterisk (*) denotes a mandatory field.
      </Typography>

      <br />
      <JobForm
        uploadFormdata={uploadFormdata}
        isUpdating={false}
        data={data}
        isAdmin
      />
    </>
  );
};

export default PostJob;

PostJob.getLayout = (page) => {
  return (
    <UserLayout>
      <Card>
        <CardContent>{page}</CardContent>
      </Card>
    </UserLayout>
  );
};
