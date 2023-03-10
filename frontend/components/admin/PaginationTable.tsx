import React from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Router from "next/router";
import { gql, useMutation } from "@apollo/client";
import client from "../../graphql/apollo-client";

type Props = {
  data: DataType[];
  setCurrentPage?: (page: number) => void;
  totalDataCount?: number;
  currentPage?: number;
};
interface DataType {
  __typename: string;
  location: string;
  position: string;
  company: string;
  category: string;
  id: string;
}

const DELETE_JOB = gql`
  mutation deleteJob($input: DeleteJobInputParams!) {
    deleteJob(input: $input) {
      id
    }
  }
`;

const PaginationTable = ({
  data,
  setCurrentPage,
  totalDataCount,
  currentPage,
}: Props) => {
  // console.log(data);
  const [
    deleteJobRequest,
    { data: deleteJobData, loading: deleteJobLoad, error: deleteJobError },
  ] = useMutation(DELETE_JOB);

  const columns: ColumnsType<DataType> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => (
        <a>
          {new Date(text).toLocaleDateString("en-pk", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </a>
      ),
    },
    {
      title: "Expires At",
      dataIndex: "expiresAt",
      key: "expiresAt",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/jobdetails?jobID=${record.id}`);
          },
        };
      },
      render: (text) => (
        <a>
          {new Date(text).toLocaleDateString("en-pk", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => deleteJob(record.id)}>
            Delete
          </Button>

          <Button type="primary" onClick={() => {}}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const deleteJob = async (id: string) => {
    deleteJobRequest({
      variables: {
        input: {
          id: id,
        },
      },
    });
    client.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "getJobByPagination",
      broadcast: true,
    });

    client.cache.gc();
  };

  return (
    <Divider orientation="left" orientationMargin={0}>
      <Row justify={"space-between"}>
        <Col>
          <Link href="/users/[id]">RSS Field</Link>
        </Col>
      </Row>
      <hr />

      <Table
        columns={columns}
        bordered
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          current: currentPage,
          hideOnSinglePage: true,
          pageSize: 20,
          onChange: (page) => {
            setCurrentPage(page);
          },

          total: totalDataCount,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => {
        //       Router.push(`/jobdetails?jobID=${record.id}`);
        //     },
        //   };
        // }}
      />
    </Divider>
  );
};

export default PaginationTable;
