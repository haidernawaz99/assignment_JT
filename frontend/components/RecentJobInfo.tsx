import React from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

type Props = {
  category: String;
};
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const RecentJobInfo = ({ category }: Props) => (
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

export default RecentJobInfo;
