import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Divider, Form, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Router from "next/router";
import { useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import UserLayout from "../../../../layouts/UserLayout";
import { PlusOutlined } from "@ant-design/icons";

const GET_ALL_AFFILIATES = gql`
  query getAllAffiliates($input: GetAllAffiliatesInputParams!) {
    getAllAffiliates(input: $input) {
      email
      status
      name
      siteURL
      id
    }
  }
`;

const APPROVE_AFFILIATE = gql`
  mutation approveAffiliate($input: ApproveAffiliatesInputParams!) {
    approveAffiliate(input: $input) {
      email
      status
      name
      id
    }
  }
`;

const DELETE_AFFILIATE = gql`
  mutation ($input: DeleteAffiliatesInputParams!) {
    deleteAffiliate(input: $input) {
      email
      status
      name
      id
    }
  }
`;

const DISABLE_AFFILIATE = gql`
  mutation ($input: DisableAffiliatesInputParams!) {
    disableAffiliate(input: $input) {
      email
      status
      name
      id
    }
  }
`;

const ENABLE_AFFILIATE = gql`
  mutation ($input: EnableAffiliatesInputParams!) {
    enableAffiliate(input: $input) {
      email
      status
      name
      id
    }
  }
`;

interface DataType {
  id: string;
  name: string;
  email: string;
  siteURL: string;
  affiliateToken: string;
  status: "Unapproved" | "Disabled" | "Enabled";
}

const Index = () => {
  const [uploaded, setUploaded] = useState(false);

  const [extensionDate, setExtensionDate] = useState(0);
  const [form] = Form.useForm();
  const { data, loading, error, refetch } = useQuery(GET_ALL_AFFILIATES, {
    variables: {
      input: {
        authToken: null,
      },
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
      key: "name",
      align: "center",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      align: "center",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Site URL",
      dataIndex: "siteURL",
      key: "siteURL",
      ellipsis: true,
      align: "center",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      ellipsis: true,
      align: "center",
      render: (_, record) => (
        <>
          {record.status === "Unapproved" && (
            <Tag style={{ padding: "2%", fontSize: 13 }} color="geekblue">
              Unapproved
            </Tag>
          )}

          {record.status === "Disabled" && (
            <Tag color="volcano" style={{ padding: "2%", fontSize: 13 }}>
              Disabled
            </Tag>
          )}
          {record.status === "Enabled" && (
            <Tag color="green" style={{ padding: "2%", fontSize: 13 }}>
              Enabled
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => deleteAffiliate(record)}>
            Delete
          </Button>
          {record.status === "Unapproved" && (
            <Button onClick={() => approveAffiliate(record)}>Approve</Button>
          )}
          {record.status === "Enabled" && (
            <Button onClick={() => disableAffiliate(record)}>Disable</Button>
          )}
          {record.status === "Disabled" && (
            <Button onClick={() => enableAffiliate(record)}>Enable</Button>
          )}
        </Space>
      ),
    },
  ];

  const [
    approveAffiliateRequest,
    {
      data: approveAffiliateRequestData,
      loading: approveAffiliateRequestLoading,
      error: approveAffiliateRequestError,
    },
  ] = useMutation(APPROVE_AFFILIATE);

  const [
    deleteAffiliateRequest,
    {
      data: deleteAffiliateRequestData,
      loading: deleteAffiliateRequestLoading,
      error: deleteAffiliateRequestError,
    },
  ] = useMutation(DELETE_AFFILIATE);

  const [
    disableAffiliateRequest,
    {
      data: disableAffiliateRequestData,
      loading: disableAffiliateRequestLoading,
      error: disableAffiliateRequestError,
    },
  ] = useMutation(DISABLE_AFFILIATE);

  const [
    enableAffiliateRequest,
    {
      data: enableAffiliateRequestData,
      loading: enableAffiliateRequestLoading,
      error: enableAffiliateRequestError,
    },
  ] = useMutation(ENABLE_AFFILIATE);

  const approveAffiliate = (record: DataType) => {
    approveAffiliateRequest({
      variables: {
        input: {
          id: record.id,
        },
      },
    });
  };

  const deleteAffiliate = (record: DataType) => {
    deleteAffiliateRequest({
      variables: {
        input: {
          id: record.id,
        },
      },
    });
    refetch();
  };

  const disableAffiliate = (record: DataType) => {
    disableAffiliateRequest({
      variables: {
        input: {
          id: record.id,
        },
      },
    });
    refetch();
  };

  const enableAffiliate = (record: DataType) => {
    enableAffiliateRequest({
      variables: {
        input: {
          id: record.id,
        },
      },
    });
    refetch();
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);

    return null;
  }

  if (data) {
    console.log(data);
  }

  return (
    <AdminLayout title="Manage Affiliates -- Jobeet" enableLocalSearch={false}>
      <Typography variant="h5">
        <Link>Affiliates</Link>
      </Typography>
      <Typography variant="body2">Manage Affiliates Here.</Typography>

      <Divider orientation="left" orientationMargin={0}>
        <Row justify={"space-between"}></Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "flex-end",
          }}
        >
          <Button
            onClick={() => Router.push("/admin/manage/affiliates/add")}
            type="primary"
            style={{ marginBottom: 16 }}
            icon={<PlusOutlined />}
          >
            Add an Affiliate
          </Button>
        </div>

        <hr />
        <Table
          columns={columns}
          dataSource={data.getAllAffiliates}
          tableLayout="fixed"
          rowKey={(record) => record.id}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 20,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                //   Router.push(`/job/${encodeURIComponent(record.id)}`);
                null;
              },
            };
          }}
        />
      </Divider>
    </AdminLayout>
  );
};

export default Index;
