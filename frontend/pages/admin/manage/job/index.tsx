import { Space, Switch, Typography } from "antd";
import Link from "next/link";
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
    <AdminLayout
      title="Manage Jobs -- Jobeet"
      setSearch={setSearchBar}
      enableLocalSearch={false}
    >
      <br />
      <AllJobsWithPagination searchBar={searchBar} />
    </AdminLayout>
  );
};

export default ManageJobs;
