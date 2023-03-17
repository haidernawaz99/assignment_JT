import { gql, useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Form, InputNumber, Typography } from "antd";
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

import client from "../../graphql/apollo-client";
const { Title, Paragraph, Text } = Typography;

const GET_ADMIN_CONFIG = gql`
  query getAdminConfig($input: GetAdminConfigInputParams!) {
    getAdminConfig(input: $input) {
      days
    }
  }
`;

const SET_ADMIN_MUTATION = gql`
  mutation updateAdminConfig($input: SetAdminConfigInputParams!) {
    updateAdminConfig(input: $input) {
      days
    }
  }
`;
const Config = () => {
  const [uploaded, setUploaded] = useState(false);
  const [extensionDate, setExtensionDate] = useState(0);
  const [form] = Form.useForm();
  const { data, loading, error, refetch } = useQuery(GET_ADMIN_CONFIG, {
    variables: {
      input: {
        authToken: null,
      },
    },
  });

  const [
    setAdminConfig,
    {
      data: setAdminConfigData,
      loading: setAdminConfigLoading,
      error: setAdminConfigErrorr,
    },
  ] = useMutation(SET_ADMIN_MUTATION);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <AdminLayout title="Website Configuration" enableLocalSearch={false}>
      <Title level={3} style={{ marginBottom: 0 }}>
        Website Configuration
      </Title>
      {uploaded && (
        <Alert
          message="Updated Extension Period"
          closable
          description={
            <div>
              Successfully Updated Extension Period to{" "}
              <strong> {form.getFieldValue("extensionPeriod")}</strong> days.
            </div>
          }
          type="success"
          showIcon
        />
      )}
      <Form
        form={form}
        onFinish={(values) => {
          setUploaded(false);
          setAdminConfig({
            variables: {
              input: {
                days: values.extensionPeriod,
              },
            },
          });
          values.days = data?.updateAdminConfig?.days;
          client.resetStore();
          setUploaded(true);
        }}
        initialValues={{ remember: true }}
      >
        <br />
        <Form.Item
          label="Extension Period"
          name="extensionPeriod"
          rules={[{ required: true }]}
          initialValue={data.getAdminConfig.days}
        >
          <InputNumber
            min={1}
            max={100}
            addonAfter="days"
            onChange={() => setUploaded(false)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            type={"primary"}
            size={"large"}
            htmlType="submit"
            disabled={uploaded}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};

export default Config;
