import { gql, useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import client from "../../../graphql/apollo-client";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { SaveFilled } from "@ant-design/icons";

const GET_ADMIN_CONFIG = gql`
  query getUserView {
    getUserView {
      key
      value
    }
  }
`;

const SET_ADMIN_MUTATION = gql`
  mutation setUserView($input: SetUserViewInputParams!) {
    setUserView(input: $input) {
      key
      value
    }
  }
`;
const UserView = () => {
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
    <AdminLayout title="Manage User View" enableLocalSearch={false}>
      <Typography variant="h5">
        <Link>User View</Link>
      </Typography>
      <Typography variant="body2">Manage User View Here.</Typography>

      {uploaded && (
        <>
          <br />
          <Alert
            message="Updated User View"
            closable
            description={
              <div>Successfully Updated User View</div>
              //   <div>
              //     Successfully Updated Extension Period to{" "}
              //     <strong> {form.getFieldValue("extensionPeriod")}</strong> days.
              //   </div>
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
                extensionPeriod: values.extensionPeriod.toString(),
                sort: values.sort,
                order: values.order,
                limit: values.limit.toString(),
              },
            },
          });

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
          initialValue={parseInt(data.getUserView[0].value)}
          style={{ maxWidth: 335 }}
        >
          <InputNumber
            min={1}
            max={100}
            addonAfter="days"
            onChange={() => setUploaded(false)}
          />
        </Form.Item>

        <Form.Item
          label="Sort"
          name="sort"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "20vw" }}
          initialValue={data.getUserView[1].value}
        >
          <Select>
            <Select.Option value="createdAt">Created At</Select.Option>
            <Select.Option value="expiresAt">Expires At</Select.Option>
          </Select>
        </Form.Item>

        <span
          style={{
            display: "inline-block",
            width: "5vw",
            lineHeight: "32px",
            textAlign: "center",
          }}
        ></span>

        <Form.Item
          label="Order"
          name="order"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "20vw" }}
          initialValue={data.getUserView[2].value}
        >
          <Select>
            <Select.Option value="1">Ascending</Select.Option>
            <Select.Option value="-1">Descending</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Limit"
          name="limit"
          rules={[{ required: true }]}
          initialValue={data.getUserView[3].value}
          style={{ maxWidth: 400 }}
        >
          <InputNumber
            min={20}
            max={100}
            addonAfter="records"
            onChange={() => setUploaded(false)}
          />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type={"primary"}
            size={"large"}
            htmlType="submit"
            // disabled={uploaded}
            icon={<SaveFilled />}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};

export default UserView;
