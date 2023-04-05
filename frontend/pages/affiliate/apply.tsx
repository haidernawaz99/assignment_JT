import Link from "next/link";
import React, { useState } from "react";
import type { RadioChangeEvent, UploadProps } from "antd";

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
import { useMutation, gql } from "@apollo/client";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import Router from "next/router";
import client from "../../graphql/apollo-client";
import Layout from "../../components/Layout/Layout";
import SuccessfulModal from "../../components/SuccessfulModal";

type Props = {};

const APPLY_AFFILIATE_MUTATION = gql`
  mutation createAffiliate($input: CreateAffiliateInputParams!) {
    createAffiliate(input: $input) {
      name
      email
      siteURL
    }
  }
`;

const BecomeAffiliate = () => {
  const [uploadAffiliateFormdata, { data, loading, error }] = useMutation(
    APPLY_AFFILIATE_MUTATION,
    {
      //TODO: make this work!
      // refetchQueries: ["QUERY"],
      errorPolicy: "none",
      onError(error, clientOptions) {
        console.log(error);
        message.error(
          "Looks like we have already received your application. Please wait for our response.",
          10 // 10 seconds
        );
      },
    }
  );
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addonBefore, setAddonBefore] = useState("http://");
  const [addonAfter, setAddonAfter] = useState(".com");

  const onFinish = async (values: any) => {
    setShowModal(false);
    setUploading(true);
    const input = {
      email: values.email,
      name: values.name,
      siteURL: `${addonBefore}${values.url}${addonAfter}`,
    };

    uploadAffiliateFormdata({
      variables: { input },
    });

    // update the cache store
    client.resetStore();
    setUploading(false);
    console.log(data);
    setShowModal(true);
  };

  const URLSelectBefore = (
    <Select
      defaultValue={addonBefore}
      onChange={(value) => setAddonBefore(value)}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const URLSelectAfter = (
    <Select
      defaultValue={addonAfter}
      onChange={(value) => setAddonAfter(value)}
      style={{ width: 80 }}
    >
      <Option value=".com">.com</Option>
      <Option value=".pk">.pk</Option>
      <Option value=".uk">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

  const [form] = Form.useForm();

  return (
    <Layout enableLocalSearch={false}>
      <br />

      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Title level={2}>Affiliate Form</Title>
        <Row>
          <Col xs={14} sm={18} md={16} lg={18} xl={10}>
            <Form.Item
              label="Name"
              name="name"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
            >
              <Input placeholder="Enter Name Here" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              initialValue=""
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter Email Here" />
            </Form.Item>

            <Form.Item
              label="Site URL"
              name="url"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your site url",
                },
              ]}
            >
              <Input
                addonBefore={URLSelectBefore}
                addonAfter={URLSelectAfter}
                placeholder="Enter Site URL Here"
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
                isUpdating={true}
                redirectTo={`/`}
                modalTitle={"Affiliate Application Submitted"}
              />
            )}
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};
export default BecomeAffiliate;
BecomeAffiliate.getLayout = (page) => {
  return <>{page} </>;
};
