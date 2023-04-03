import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Input,
  Col,
  Row,
  Typography,
  Button,
  Select,
  InputNumber,
  Switch,
} from "antd";
import { ApolloProvider } from "@apollo/client";
import { useSession } from "next-auth/react";
const { Paragraph } = Typography;
const { Option } = Select;
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";
import styles from "./AdminLayout.module.css";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

const { Search } = Input;
const { Title } = Typography;

type Props = {
  children?: ReactNode;
  title?: string;
  categoryEnabled?: boolean;
  setSearch?: (prevState: any) => any;
  enableLocalSearch?: boolean;
};

const AdminLayout = ({
  children,
  title = "This is the default title",
  categoryEnabled = true,
  setSearch = () => {},
  enableLocalSearch = true,
}: Props) => {
  const [globalSearch, setGlobalSearch] = useState(true);
  const [searchBarOption, setSearchBarOption] = useState<String>("Category");
  const router = useRouter();
  // const { data: session, status } = useSession();
  const { collapseSidebar } = useProSidebar();

  const onSwitchChange = (checked: boolean) => {
    setGlobalSearch(checked);
    console.log(`switch to ${checked}`);
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status !== "authenticated" && typeof window !== "undefined") {
  //   router.push("/api/auth/signin");
  //   // return <a href="/api/auth/signin">Sign in</a>;
  // }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        {/* <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
        <Link href="/users">Users List</Link> |{" "}
        <a href="/api/users">Users API</a>
      </nav> */}
      </header>

      <div>
        <Typography>
          <Title>
            <Link href={"/"}>Jobeet Admin</Link>
          </Title>

          <Row justify={"space-between"}>
            <Col xs={24} sm={12} md={6} lg={8} xl={10}>
              <Input.Group compact>
                <Select
                  defaultValue={categoryEnabled ? "Category" : "Position"}
                  onChange={(value: String) => {
                    setSearch((prevState: SearchBarQuery) => ({
                      ...prevState,
                      option: value,
                    }));
                    setSearchBarOption(value); // seperate state for global search
                  }}
                >
                  <Option disabled={!categoryEnabled} value="Category">
                    Category
                  </Option>
                  <Option value="Position">Position</Option>
                  <Option value="Location">Location</Option>
                  <Option value="Company">Company</Option>
                </Select>
                <Search
                  placeholder="Live Search"
                  onSearch={(value: String) => {
                    if (globalSearch) {
                      Router.push(
                        `/admin/search/${searchBarOption.toLowerCase()}/${value}`
                      );
                    } else {
                      setSearch((prevState: SearchBarQuery) => ({
                        ...prevState,
                        text: value,
                      }));
                    }
                    //means perform global search
                  }}
                  style={{ width: "50%" }}
                  enterButton
                />
              </Input.Group>
              {enableLocalSearch && (
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
        </Typography>
      </div>
      {children}
      <footer className={styles.footer}>
        <hr />
        <Link href="/">About Jobeet</Link> |{" "}
        <Link href="/about">Full RSS Feed</Link> |{" "}
        {/* <Link href="/admin/manage/affiliates">Jobeet API</Link> |{" "}
          <Link href="/admin/manage/affiliates">Affiliates</Link> |{" "} */}
      </footer>
    </div>
  );
};

export default AdminLayout;
