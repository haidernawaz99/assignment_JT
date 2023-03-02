import { Space, Switch, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import RecentJobs from "../components/RecentJobs";
import RecentJobTable from "../components/RecentJobTable";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import Users from "../components/Users";
import { SearchBarQuery } from "../interfaces/searchBarQuery";
const { Paragraph } = Typography;

const IndexPage = () => {
  const [checked, setChecked] = useState(true);
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });

  const onSwitchChange = (checked: boolean) => {
    setChecked(checked);
    console.log(`switch to ${checked}`);
  };

  return (
    <Layout title="Jobeet" setSearch={setSearchBar}>
      <br />

      <Paragraph>
        Fetch data for each category:{" "}
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
          onChange={onSwitchChange}
          title="Fetch for all categories?"
        />
      </Paragraph>

      <RecentJobs getAllCategories={checked} searchBar={searchBar} />
    </Layout>
  );
};

export default IndexPage;
