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
import { useMutation, gql, useLazyQuery, useQuery } from "@apollo/client";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import client from "../graphql/apollo-client";
import SuccessfulModal from "./SuccessfulModal";
import Router from "next/router";
import isEqual from "lodash.isequal";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

type Props = {
  uploadFormdata: (input: any) => void;
  data?: any;
  isUpdating: boolean;
  editToken?: string;
  isAdmin?: boolean;
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

const JobForm = ({
  uploadFormdata,
  data,
  isUpdating,
  editToken,
  isAdmin = false,
}: Props) => {
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

  console.log(imageInitialVal);

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

  const getImage = () => {
    // if (fileList.length > 0) {
    //   return fileList[0];
    // } else {
    //   return null;
    // }

    // add or update the image
    if (!isEqual(imageInitialVal[0], fileList[0])) {
      return fileList[0];
    }

    // remove image
    if (fileList.length === 0) {
      return null;
    }

    // no change -- as initial image
    if (isEqual(imageInitialVal[0], fileList[0])) {
      return null;
    }
  };

  const getLogo = () => {
    // remove image
    if (fileList.length === 0) {
      return null;
    }

    // no change -- as initial image
    if (isEqual(imageInitialVal[0], fileList[0])) {
      return data?.logo;
    }
  };

  const onFinish = (values: any) => {
    setShowModal(false);
    setUploading(true);
    const input = {
      company: values.Company,
      position: values.Position,
      location: values.Location,
      jobDescription: values.JobDescription,
      howToApply: values.howToApply || "",
      public: true,
      email: values.Email || "null@null.com",
      type: jobType,
      category: values.Category,
      image: getImage(),
      logo: getLogo(),
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

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 900 }}
      labelCol={{ span: 8 }}
    >
      <Form.Item
        name="Category"
        label="Category"
        rules={[{ required: true }]}
        initialValue={isUpdating ? data.category : ""}
      >
        <Select allowClear>
          {categoriesResponse?.getCategories.categories.map(({ category }) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Job Type"
        name="JobType"
        initialValue={isUpdating ? data.type : "Full Time"}
      >
        <Radio.Group onChange={onJobTypeChange} optionType="button">
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
      <Form.Item
        label="How To Apply"
        name="howToApply"
        rules={[{ required: true }]}
        initialValue={isUpdating ? data.howToApply : ""}
      >
        <TextArea
          showCount
          maxLength={700}
          placeholder="Enter Instruction for Applying Here"
        />
      </Form.Item>
      <Form.Item style={{ display: "flex", justifyContent: "end" }}>
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
          redirectTo={
            isAdmin
              ? `/admin/job/${data?.createJob?.id || data?.id}`
              : `/job/${data?.createJob?.id || data?.id}`
          }
          editToken={data?.createJob?.editToken}
        />
      )}
    </Form>
  );
};
export default JobForm;
