import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent, UploadProps } from "antd";
import Layout from "./Layout/Layout";
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
  Modal,
  Space,
} from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
import { useMutation, gql, useLazyQuery, useQuery } from "@apollo/client";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import client from "../graphql/apollo-client";
import SuccessfulModal from "./SuccessfulModal";
import Router from "next/router";

type Props = {
  uploadFormdata: (input: any) => void;
  data?: any;
  isUpdating: boolean;
  editToken?: string;
};

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      categories
    }
  }
`;
const MUTATION = gql`
  mutation createJob($input: JobCreateInput!) {
    createJob(input: $input) {
      company
      id
      editToken
    }
  }
`;

const IS_CUSTOM_URL_UNIQUE = gql`
  query uniqueEmail($input: GetJobInputParams!) {
    uniqueEmail(input: $input) {
      company
    }
  }
`;

const JobForm = ({ uploadFormdata, data, isUpdating, editToken }: Props) => {
  const [isCustomURLUnqiueRequest] = useLazyQuery(IS_CUSTOM_URL_UNIQUE);
  const {
    data: categoriesResponse,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES);
  const isCustomURLUnqiue = async (customURL: string) => {
    const customURLResponse = await isCustomURLUnqiueRequest({
      variables: {
        input: {
          customURL,
        },
      },
    });

    if (customURLResponse.data.uniqueEmail == null) {
      // setCustomURL("success"); // unique
      return "success";
    } else {
      // setCustomURL("error"); // not unique
      return "error";
    }
  };
  const imageInitialVal = data?.logo
    ? [
        {
          uid: "-1",
          name: `${data.logo}`,
          status: "done",
          url: `http://localhost:3000/${data.logo}`,
        },
      ]
    : [];

  const [jobType, setJobType] = useState("Full Time");

  const [fileList, setFileList] = useState<UploadFile[]>(
    imageInitialVal as UploadFile[]
  );
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fileUploadProps: UploadProps = {
    multiple: false,
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        message.error(`${file.name} is not a valid image file`);
        return false; //escape so that the line below doesnt run
      }
      setFileList([file]);
    },

    fileList,
  };
  const onJobTypeChange = (e: RadioChangeEvent) => {
    setJobType(e.target.value);
  };

  const onFinish = (values: any) => {
    setShowModal(false);
    setUploading(true);
    const input = {
      company: values.Company,
      position: values.Position,
      location: values.Location,
      jobDescription: values.JobDescription,
      howToApply: values.HowToApply || "",
      public: true,
      email: values.Email || "null@null.com",
      type: jobType,
      category: values.Category,
      image: imageInitialVal[0] === fileList[0] ? null : fileList[0],
      url: values.url || "",
    };

    // if we are updating, add the editToken to the input
    if (isUpdating && editToken) {
      input["editToken"] = editToken;
    }
    uploadFormdata({
      variables: { input },
    });
    // update the cache store
    client.resetStore();
    setUploading(false);
    console.log(data);
    setShowModal(true);
    console.log(showModal);
  };

  useEffect(() => {
    console.log("categoriesResponse: ", categoriesResponse);
  }, [categoriesLoading]);

  const [form] = Form.useForm();
  return (
    <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
      <Row>
        <Col xs={7} sm={12} md={16} lg={18} xl={10}>
          <Form.Item
            name="Category"
            label="Category"
            rules={[{ required: true }]}
            initialValue={isUpdating ? data.category : ""}
          >
            <Select allowClear>
              {categoriesResponse?.getCategories.categories.map(
                ({ category }) => (
                  <Option value={category}>{category}</Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="JobType"
            name="JobType"
            initialValue={isUpdating ? data.type : "Full Time"}
          >
            <Radio.Group onChange={onJobTypeChange}>
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
            initialValue={isUpdating ? data.company : ""}
          >
            <Input placeholder="Enter Company Name Here" />
          </Form.Item>
          <Form.Item label="Logo" name="Logo">
            <Upload
              {...fileUploadProps}
              listType={isUpdating ? "picture-card" : undefined}
            >
              <Button icon={<UploadOutlined />}>
                {uploading ? "Uploading" : "Select File"}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Custom URL"
            name="url"
            initialValue={isUpdating ? (data?.url ? data.url : "") : ""}
            // validateStatus={customURL}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  if (
                    (await isCustomURLUnqiue(value)) === "success" ||
                    data?.url === value
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Looks like someone has already taken this URL!")
                  );
                },
              }),
            ]}
          >
            <Input
              addonBefore="http://localhost:3000/customURL/"
              // addonAfter=".com"
              placeholder="Enter Custom URL Here"
              // onBlur={(e) => {
              //   isCustomURLUnqiue(e.target.value);
              // }}
            />
          </Form.Item>

          <Form.Item
            label="Position"
            name="Position"
            rules={[{ required: true }]}
            initialValue={isUpdating ? data.position : ""}
          >
            <Input placeholder="Enter Position Here" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="Location"
            rules={[{ required: true }]}
            initialValue={isUpdating ? data.location : ""}
          >
            <Input placeholder="Enter Location Here" />
          </Form.Item>
          <Form.Item
            label="Job Description"
            name="JobDescription"
            rules={[{ required: true }]}
            initialValue={isUpdating ? data.jobDescription : ""}
          >
            <TextArea
              showCount
              maxLength={700}
              placeholder="Enter Job Description Here"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button
              type={"primary"}
              size={"large"}
              htmlType="submit"
              disabled={uploading}
            >
              Submit
            </Button>
          </Form.Item>
          {data && (
            <SuccessfulModal
              showModal={showModal}
              isUpdating={isUpdating}
              redirectTo={`/jobdetails?jobID=${
                data?.createJob?.id || data?.id
              }`}
              editToken={data?.createJob?.editToken}
            />
          )}
        </Col>
      </Row>
    </Form>
  );
};
export default JobForm;
