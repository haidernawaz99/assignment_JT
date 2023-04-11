import React, { useRef, useState } from "react";
import Link from "next/link";
import { Divider, Row, Col, Space, Table, Button, InputRef, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import Router from "next/router";
import { gql, useMutation } from "@apollo/client";
import client from "../../graphql/apollo-client";
import { FilterConfirmProps, SorterResult } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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
  editToken: string;
  createdAt: string;
  expiresAt: string;
  type: string;
}

const DELETE_JOB = gql`
  mutation deleteJob($input: DeleteJobInputParams!) {
    deleteJob(input: $input) {
      id
    }
  }
`;

type DataIndex = keyof DataType;

const PaginationTable = ({ data }: Props) => {
  // console.log(data);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [
    deleteJobRequest,
    { data: deleteJobData, loading: deleteJobLoad, error: deleteJobError },
  ] = useMutation(DELETE_JOB);

  const columns: ColumnsType<DataType> = [
    {
      title: "Category",
      dataIndex: "category",
      ellipsis: true,
      key: "category",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => (a.category > b.category ? 1 : -1),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      ellipsis: true,
      key: "position",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      ellipsis: true,

      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("company"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ellipsis: true,

      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },
      render: (text) => <a>{text}</a>,
      filters: [
        { text: "Full Time", value: "Full Time" },
        { text: "Part Time", value: "Part Time" },
        { text: "Contract", value: "Contract" },
        { text: "Internship", value: "Internship" },
        { text: "Freelance", value: "Freelance" },
      ],
      onFilter: (value: string, record) => record.type.includes(value),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,

      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },

      render: (text) => (
        <a>
          {new Date(text).toLocaleDateString("en-pk", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </a>
      ),

      sorter: (a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
    },
    {
      title: "Expires At",
      dataIndex: "expiresAt",
      key: "expiresAt",
      ellipsis: true,

      align: "center",
      onCell: (record) => {
        return {
          onClick: (event) => {
            Router.push(`/admin/job/${encodeURIComponent(record.id)}`);
          },
        };
      },
      render: (text) => (
        <a>
          {new Date(text).toLocaleDateString("en-pk", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </a>
      ),
      sorter: (a, b) =>
        new Date(a.expiresAt) > new Date(b.expiresAt) ? 1 : -1,
    },
    {
      title: "Action",
      key: "action",
      ellipsis: true,

      align: "center",

      render: (_, record) => (
        <Space size="middle">
          <Button danger size="small" onClick={() => deleteJob(record.id)}>
            Delete
          </Button>

          <Button
            type="primary"
            size="small"
            onClick={() => {
              Router.push(`/admin/manage/job/edit/${record.editToken}`);
            }}
          >
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
      fieldName: "getAllJobsAdmin",
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
        tableLayout="fixed"
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 20,

          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => {
        //       Router.push(`/job/${encodeURIComponent(record.id)}`);
        //     },
        //   };
        // }}
      />
    </Divider>
  );
};

export default PaginationTable;
