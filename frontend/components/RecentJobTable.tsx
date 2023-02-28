import React from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

type Props = {
  category: String;
  data: DataType[];
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

const RecentJobTable = ({ category, data }: Props) => {
  console.log(data);

  return (
    <Divider orientation="left" orientationMargin={0}>
      <Row justify={"space-between"}>
        <Col>
          <Link href="/users/[id]">{category}</Link>
        </Col>

        <Col>
          <Link href="/users/[id]">RSS Field</Link>
        </Col>
      </Row>
      <hr />

      <Table columns={columns} dataSource={data} pagination={false} />
    </Divider>
  );
};

export default RecentJobTable;
