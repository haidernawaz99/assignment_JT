import Link from "next/link";
import React, { useState } from "react";
import type { RadioChangeEvent, UploadProps } from "antd";
import Layout from "./Layout";
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
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
import { useMutation, gql } from "@apollo/client";

const fileUploadProps: UploadProps = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
};

// const MUTATION = gql`
//   mutation {
//     createJob(input: $input) {
//       company
//       id
//     }
//   }
// `;

const MUTATION = gql`
  mutation createJob($input: JobCreateInput!) {
    createJob(input: $input) {
      company
      id
    }
  }
`;

const JobForm = () => {
  const [jobType, setJobType] = useState("Full Time");
  const [uploadFormdata, { data, loading, error }] = useMutation(MUTATION);

  const onJobTypeChange = (e: RadioChangeEvent) => {
    setJobType(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log(values);
    uploadFormdata({
      variables: {
        input: {
          company: values.Company,
          position: values.Position,
          location: values.Location,
          jobDescription: values.JobDescription,
          howToApply: values.HowToApply || "",
          public: true,
          email: values.Email || "null@null.com",
          type: jobType,
          category: values.Category,
        },
      },
    });
  };
  const [form] = Form.useForm();
  return (
    <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
      <Row>
        <Col xs={7} sm={12} md={16} lg={18} xl={10}>
          <Form.Item
            name="Category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select allowClear>
              <Option value="Design">Design</Option>
              <Option value="Development">Development</Option>
              <Option value="Product">Product</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="JobType" name="JobType">
            <Radio.Group defaultValue={"Full Time"} onChange={onJobTypeChange}>
              <Radio value={"Full Time"}>Full Time</Radio>
              <Radio value={"Part Time"}>Part Time</Radio>
              <Radio value={"Contract"}>Contract</Radio>
              <Radio value={"Internship"}>Internship</Radio>
              <Radio value={"Freelance"}>Freelance</Radio>

              {/* </Space> */}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Company"
            name="Company"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Logo" name="Logo">
            <Upload {...fileUploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="URL" name="URL">
            <Input
              addonBefore="http://localhost:3000/customURL/"
              addonAfter=".com"
              defaultValue=""
            />
          </Form.Item>
          <Form.Item
            label="Position"
            name="Position"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job Description"
            name="JobDescription"
            rules={[{ required: true }]}
          >
            <TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type={"primary"} size={"large"} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default JobForm;
