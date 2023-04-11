import { gql, useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Form, InputNumber } from "antd";
import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

import client from "../../../graphql/apollo-client";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { SaveFilled } from "@ant-design/icons";

const GET_ADMIN_CONFIG = gql`
  query getExpirationPeriod {
    getExpirationPeriod {
      days
    }
  }
`;

const SET_ADMIN_MUTATION = gql`
  mutation setExpirationPeriod($input: SetExpirationInputParams!) {
    setExpirationPeriod(input: $input) {
      days
    }
  }
`;
const Expiration = () => {
  const [uploaded, setUploaded] = useState(false);
  const [extensionDate, setExtensionDate] = useState(0);
  const [form] = Form.useForm();
  const { data, loading, error, refetch } = useQuery(GET_ADMIN_CONFIG);

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
      <Typography variant="h5">
        <Link>Expiration Period</Link>
      </Typography>
      <Typography variant="body2">Manage Expiration Period Here.</Typography>

      {uploaded && (
        <>
          <br />
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
        </>
      )}
      <br />
      <hr />
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
          values.days = data?.getExpirationPeriod?.days;
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
          initialValue={data.getExpirationPeriod.days}
        >
          <InputNumber
            min={1}
            max={100}
            addonAfter="days"
            onChange={() => setUploaded(false)}
          />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type={"primary"}
            size={"large"}
            htmlType="submit"
            disabled={uploaded}
            icon={<SaveFilled />}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};

export default Expiration;
