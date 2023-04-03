import React from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Router from "next/router";

type Props = {
  category: string;
  data: DataType[];
  setCurrentPage?: (page: number) => void;
  totalDataCount?: number;
  currentPage?: number;
  isEditable?: boolean;
};

interface DataType {
  __typename: string;
  location: string;
  position: string;
  company: string;
  category: string;
  id: string;
  editToken?: string;
}

const RecentJobTable = ({
  category,
  data,
  setCurrentPage,
  totalDataCount,
  currentPage,
  isEditable = false,
}: Props) => {
  // console.log(data);

  const columns: ColumnsType<DataType> = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      ellipsis: true,
      key: "position",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Company",
      dataIndex: "company",
      ellipsis: true,
      key: "company",
      render: (text) => <a>{text}</a>,
    },
    ...(isEditable
      ? ([
          {
            title: "Action",
            key: "action",
            // ellipsis: true,

            align: "center",

            render: (_, record) => (
              <Space size="middle">
                <Button
                  type="primary"
                  onClick={() =>
                    Router.push(`/job/${encodeURIComponent(record.id)}`)
                  }
                >
                  View
                </Button>

                <Button
                  type="default"
                  disabled={!record.editToken}
                  onClick={() => {
                    Router.push(
                      `/admin/manage/job/edit?editToken=${record.editToken}`
                    );
                  }}
                >
                  Edit
                </Button>
              </Space>
            ),
          },
        ] as ColumnsType<DataType>)
      : []),
  ];
  return (
    <Divider orientation="left" orientationMargin={0}>
      <Row justify={"space-between"}>
        <Col>
          <Link href={`/category/${encodeURIComponent(category)}`}>
            {category}
          </Link>
        </Col>

        <Col>
          <Link href="/users/[id]">RSS Field</Link>
        </Col>
      </Row>
      <hr />

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        tableLayout="fixed"
        dataSource={data}
        pagination={{
          hideOnSinglePage: true,
          current: currentPage,
          pageSize: 20,
          onChange: (page) => setCurrentPage(page),
          responsive: true,
          total: totalDataCount,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onRow={(record, rowIndex) => {
          if (!isEditable)
            return {
              onClick: () => {
                Router.push(`/job/${encodeURIComponent(record.id)}`);
              },
            };
        }}
      />
    </Divider>
  );
};

export default RecentJobTable;
