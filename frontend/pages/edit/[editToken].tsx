import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Alert, Button, Typography } from "antd";
import JobForm from "../../components/JobForm";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Error from "next/error";
import expiresAtDays from "../../utils/expiresAtDay";
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
      expiresAt
    }
  }
`;

const EXTEND_JOB = gql`
  mutation extendExpiresAt($input: JobExtendInput!) {
    extendExpiresAt(input: $input) {
      company
      id
      editToken
      expiresAt
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
  const [jobExtendedSuccessfully, setJobExtendedSuccessfully] = useState(false);

  const [
    updateFormdata,
    { data: mutatedData, loading: mutatedLoading, error: mutatedError },
  ] = useMutation(MUTATION, {
    //TODO: make this work!
    // refetchQueries: ["QUERY"],
  });

  const [
    extendJob,
    { data: extendJobData, loading: extendJobLoading, error: extendJobError },
  ] = useMutation(EXTEND_JOB, {
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

  if (error || data?.jobs[0]?.length === 0 || editToken === null) {
    console.error(error);
    return <Error statusCode={404} title="Invalid Job Edit Token" />;
  }

  if (!data) {
    return <h2>Loading...</h2>;
  }
  // if (editToken === null) {
  //   console.log(editToken);
  //   return <h2>Invalid Job Edit Token</h2>;
  // }
  // if (error) {
  //   console.error(error);
  //   return <Error statusCode={404} title="Invalid Job Edit Token" />;
  // }

  if (data) {
    console.log(data);
  }

  const extendJobRequest = () => {
    console.log(editToken);
    extendJob({
      variables: {
        input: {
          editToken,
        },
      },
    });
    if (!extendJobLoading && !extendJobError)
      console.log(extendJobData?.extendExpiresAt?.expiresAt);
    setJobExtendedSuccessfully(true);
  };

  return (
    data && (
      <Layout title="Edit a Job" enableLocalSearch={false}>
        <Title level={3}>Edit a Job</Title>
        {jobExtendedSuccessfully && (
          <Alert
            message="Job Extended Successfully"
            closable
            description={
              <div>
                Your job post has been extended successfully. This post will now
                expire on{" "}
                <strong>
                  {new Date(
                    extendJobData?.extendExpiresAt?.expiresAt
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {"."}
                </strong>
              </div>
            }
            type="success"
            showIcon
          />
        )}
        {expiresAtDays(data?.jobs[0]?.expiresAt) < 5 &&
          expiresAtDays(data?.jobs[0]?.expiresAt) > 0 && (
            <Alert
              message="Warning"
              description={
                <div>
                  This Job is about to expire in{" "}
                  <strong>
                    {expiresAtDays(data?.jobs[0]?.expiresAt)} day(s){" "}
                  </strong>
                  . Please click on <strong> 'Extend' </strong> to extend the
                  job post.
                </div>
              }
              type="warning"
              showIcon
              closable
              action={
                <Button size="large" onClick={() => extendJobRequest()}>
                  Extend
                </Button>
              }
            />
          )}
        {expiresAtDays(data?.jobs[0]?.expiresAt) < 5 &&
          expiresAtDays(data?.jobs[0]?.expiresAt) <= 0 && (
            <Alert
              message="Warning"
              description={
                <div>
                  This Job expired{" "}
                  <strong>
                    {Math.abs(expiresAtDays(data?.jobs[0]?.expiresAt))} day(s){" "}
                  </strong>
                  ago. Please click on <strong> 'Reactivate' </strong> to
                  Republish the job post.
                </div>
              }
              type="error"
              showIcon
              action={
                <Button size="large" danger onClick={() => extendJobRequest()}>
                  Reactivate
                </Button>
              }
            />
          )}
        <br /> <br />
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
