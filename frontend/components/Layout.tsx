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
import client from "../graphql/apollo-client";
import { SearchBarQuery } from "../interfaces/searchBarQuery";
const { Paragraph } = Typography;
const { Option } = Select;
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
      </nav> */}
      </header>
      <div>
        <Typography>
          <Title>
            <Link href={"/"}>Jobeet</Link>
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
                type="primary"
                onClick={() => {
                  Router.push("/postjob");
                }}
              >
                Post a Job
              </Button>
            </Col>
          </Row>
        </Typography>
      </div>
      {children}
      <footer>
        <hr />
        <Link href="/">About Jobeet</Link> |{" "}
        <Link href="/about">Full RSS Feed</Link> |{" "}
        <Link href="/admin/manage/affiliates/view">Jobeet API</Link> |{" "}
        <Link href="/admin/manage/affiliates/view">Affiliates</Link> |{" "}
      </footer>
    </div>
  );
};

export default Layout;
