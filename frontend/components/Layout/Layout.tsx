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
import client from "../../graphql/apollo-client";
import { SearchBarQuery } from "../../interfaces/searchBarQuery";
const { Paragraph } = Typography;
const { Option } = Select;
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "./Layout.module.css";
import Navbar from "../navbar/Navbar";

const { Search } = Input;
const { Title } = Typography;

type Props = {
  children?: ReactNode;
  title?: string;
  categoryEnabled?: boolean;
  setSearch?: (prevState: any) => any;
  enableLocalSearch?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  categoryEnabled = true,
  setSearch = () => {},
  enableLocalSearch = true,
}: Props) => {
  const [globalSearch, setGlobalSearch] = useState(true);
  const [searchBarOption, setSearchBarOption] = useState<String>("Category");
  const router = useRouter();

  const onSwitchChange = (checked: boolean) => {
    setGlobalSearch(checked);
    console.log(`switch to ${checked}`);
  };
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
        
      // </nav> */}
        <Navbar />
      </header>
      <div>
        <Typography>
          {/* <Title>
            <Link href={"/"}>Jobeet</Link>
          </Title> */}

          {/* <div className="search">
            <Row justify={"space-between"}>
              <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <Select
                  style={{ minWidth: "100%" }}
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
              </Col>
              <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                <Search
                  placeholder="Live Search"
                  onSearch={(value: String) => {
                    if (globalSearch) {
                      router.push(
                        `/search/${searchBarOption.toLowerCase()}/${value}`
                      );
                    } else {
                      setSearch((prevState: SearchBarQuery) => ({
                        ...prevState,
                        text: value,
                      }));
                    }
                    //means perform global search
                  }}
                  enterButton
                />
              </Col>

              <Col>
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
            </Row>
          </div> */}
        </Typography>
      </div>
      {children}
      <footer className={styles.footer}>
        <hr />
        <Link href="/">About Jobeet</Link> |{" "}
        <Link href="/about">Full RSS Feed</Link> |{" "}
        <Link href="/affiliate/apply">Affiliates</Link> |{" "}
        <Link href="/admin">Admin</Link> |{" "}
      </footer>
    </div>
  );
};

export default Layout;
