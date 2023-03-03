import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Typography } from "antd";
import JobForm from "../components/JobForm";
const { Title } = Typography;

const PostJob = () => {
  return (
    <Layout title="Post a Job" enableLocalSearch={false}>
      <Title level={3}>Post a Job</Title>
      <JobForm />
    </Layout>
  );
};

export default PostJob;
