import { Space, Switch, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import RecentJobs from "../components/RecentJobs";
import RecentJobTable from "../components/RecentJobTable";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import Users from "../components/Users";
const { Paragraph } = Typography;

const IndexPage = () => {
  const [checked, setChecked] = useState(false);

  const onSwitchChange = (checked: boolean) => {
    setChecked(checked);
    console.log(`switch to ${checked}`);
  };

  return (
    <Layout title="Jobeet">
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

      <RecentJobs />
    </Layout>
  );
};

export default IndexPage;
