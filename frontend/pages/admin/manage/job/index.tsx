import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Typography } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";

import AllJobsWithPagination from "../../../../components/admin/AllJobsWithPagination";
import { SearchBarQuery } from "../../../../interfaces/searchBarQuery";

const { Paragraph } = Typography;

const ManageJobs = () => {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });

  return (
    <>
      <Row justify={"end"}>
        <Col>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              Router.push("/admin/manage/job/add");
            }}
          >
            Post a Job
          </Button>
        </Col>
      </Row>
      <AllJobsWithPagination searchBar={searchBar} />
    </>
  );
};

export default ManageJobs;
