import React from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Router from "next/router";

type Props = {
  category: string;
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
const columns: ColumnsType<DataType> = [
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    render: (text) => <a>{text}</a>,
  },
];

const RecentJobTable = ({
  category,
  data,
  setCurrentPage,
  totalDataCount,
  currentPage,
}: Props) => {
  // console.log(data);

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
        dataSource={data}
        pagination={{
          hideOnSinglePage: true,
          current: currentPage,
          pageSize: 20,
          onChange: (page) => setCurrentPage(page),
          total: totalDataCount,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              Router.push(`/jobdetails?jobID=${record.id}`);
            },
          };
        }}
      />
    </Divider>
  );
};

export default RecentJobTable;
