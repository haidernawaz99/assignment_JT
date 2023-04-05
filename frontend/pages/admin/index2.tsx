import { Space, Switch, Typography } from "antd";

import Link from "next/link";
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AllJobsWithPagination from "../../components/admin/AllJobsWithPagination";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";

const { Paragraph } = Typography;
const { Title } = Typography;

const ManageJobs = () => {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });

  return (
    <AdminLayout
      title="Admin Dashboard -- Jobeet"
      setSearch={setSearchBar}
      enableLocalSearch={false}
    >
      <Title level={3}>Manage</Title>
      <ul>
        <li>
          {" "}
          <Link href="/admin/manage/job">Jobs</Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/admin/manage/affiliates">Affiliates</Link>{" "}
        </li>
        <li>
          {" "}
          <Link href="/admin/config/categories">Categories</Link>{" "}
        </li>
      </ul>
      <br />
    </AdminLayout>
  );
};

export default ManageJobs;
