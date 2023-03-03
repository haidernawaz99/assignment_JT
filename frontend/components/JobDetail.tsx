import Link from "next/link";
import React, { useState } from "react";
import { Image, RadioChangeEvent, UploadProps } from "antd";

import {
  Divider,
  Typography,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { Layout, Space } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
import { useMutation, gql } from "@apollo/client";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import client from "../graphql/apollo-client";

type Props = {
  job: {
    company: string;
    position: string;
    location: string;
    jobDescription: string;
    howToApply: string;
    public: boolean;
    email: string;
    type: "Design" | "Development" | "Product" | "Other";
    category: "Category" | "Position" | "Location" | "Company";
    createdAt: Date;
    logo: string;
  };
};

const JobDetail = ({ job }: Props) => {
  return (
    <Layout>
      <div>
        <Title level={3} style={{ marginBottom: 0 }}>
          {job.company}
          <img
            style={{
              marginLeft: "2%",
            }}
            width={150}
            align="right"
            src={"http://localhost:3000/" + job.logo}
          />
        </Title>
        <Paragraph>{job.location}</Paragraph>
        <hr />
        <Paragraph>
          {job.position}
          {" - "} {job.type}
        </Paragraph>

        <hr />
        <Paragraph>{job.jobDescription}</Paragraph>
      </div>
    </Layout>
  );
};

export default JobDetail;
