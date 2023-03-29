import {
  Space,
  Switch,
  Typography,
  Select,
  Col,
  Row,
  Input,
  Button,
} from "antd";
import Link from "next/link";

import { useState } from "react";

import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const { Search } = Input;

const { Paragraph } = Typography;
import Router, { useRouter } from "next/router";
import Layout from "../Layout/Layout";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";
import RecentJobs from "../RecentJobs";
import styles from "./Home.module.css";
import Image from "next/image";
import jobYouLove from "./images/job-you-love.svg";
import Process from "./process/Process";

const IndexPage = () => {
  const [checked, setChecked] = useState(true);
  const [globalSearch, setGlobalSearch] = useState(true);
  const [searchBarOption, setSearchBarOption] = useState<String>("Category");
  const [searchValue, setSearchValue] = useState<String>("");

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
      <div className={styles.search}>
        <Row justify={"center"} gutter={[10, 10]}>
          <Col xs={24} className={styles.searchHeaderImage}>
            <Image src={jobYouLove} alt="Job you love" />
          </Col>

          <Col xs={20} lg={8}>
            <Input
              placeholder="Type something..."
              size="large"
              className={styles.searchBar}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </Col>
          <Col xs={20} lg={3}>
            <Select
              style={{ width: "100%", marginLeft: 4 }}
              size="large"
              defaultValue={"Category"}
              onChange={(value: String) => {
                // setSearch((prevState: SearchBarQuery) => ({
                //   ...prevState,
                //   option: value,
                // }));
                setSearchBarOption(value); // seperate state for global search
              }}
            >
              <Option value="Category">Category</Option>
              <Option value="Position">Position</Option>
              <Option value="Location">Location</Option>
              <Option value="Company">Company</Option>
            </Select>
          </Col>
          <Col>
            {false && (
              <Paragraph>
                Perform Global Search:{" "}
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                  onChange={onSwitchChange}
                  title="Perform Global Search?"
                />
              </Paragraph>
            )}
          </Col>
          <Col xs={20} lg={3}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              style={{ width: "100%", marginBottom: "10vh" }}
              size="large"
              onClick={() => {
                Router.push(
                  `/search/${searchBarOption.toLowerCase()}/${searchValue}`
                );
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>

      <Process />

      {/* <Paragraph>
        Fetch data for each category:{" "}
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
          onChange={onSwitchChange}
          title="Fetch for all categories?"
        />
      </Paragraph> */}

      <RecentJobs getAllCategories={checked} searchBar={searchBar} />
    </Layout>
  );
};

export default IndexPage;
