import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Input, Col, Row, Typography, Button, Select, InputNumber } from "antd";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { SearchBarQuery } from "../interfaces/searchBarQuery";
const { Option } = Select;

const { Search } = Input;
const { Title } = Typography;

type Props = {
  children?: ReactNode;
  title?: string;
  categoryEnabled?: boolean;
  setSearch?: ({}: SearchBarQuery) => any;
};

const Layout = ({
  children,
  title = "This is the default title",
  categoryEnabled = true,
  setSearch = () => {},
}: Props) => (
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
                onChange={(value: String) =>
                  setSearch((prevState) => ({
                    ...prevState,
                    option: value,
                  }))
                }
              >
                <Option
                  disabled={categoryEnabled ? false : true}
                  value="Category"
                >
                  Category
                </Option>
                <Option value="Position">Position</Option>
                <Option value="Location">Location</Option>
                <Option value="Company">Company</Option>
              </Select>
              <Search
                placeholder="Live Search"
                onSearch={(value: String) =>
                  setSearch((prevState) => ({
                    ...prevState,
                    text: value,
                  }))
                }
                style={{ width: "50%" }}
                enterButton
              />
            </Input.Group>
          </Col>
          <Col>
            <Button type="primary">
              <Link href="/postjob">Post a Job</Link>
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
      <Link href="/users">Jobeet API</Link> |{" "}
      <a href="/api/users">Affiliates</a>
    </footer>
  </div>
);

export default Layout;
