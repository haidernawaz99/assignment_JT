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
import Footer from "./footer/Footer";

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
      <div className={styles.pageContainer}>
        <div className={styles.contentWrap}>
          <header>
            <Navbar />
          </header>

          {children}

          {/* <footer className={styles.footer}>
        <hr />
        <Link href="/">About Jobeet</Link> |{" "}
        <Link href="/about">Full RSS Feed</Link> |{" "}
        <Link href="/affiliate/apply">Affiliates</Link> |{" "}
        <Link href="/admin">Admin</Link> |{" "}
      </footer> */}
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
