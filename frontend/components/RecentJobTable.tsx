import React from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

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
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
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
          pageSize: 20,
          onChange: (page) => setCurrentPage(page),
          total: totalDataCount,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Divider>
  );
};

export default RecentJobTable;
