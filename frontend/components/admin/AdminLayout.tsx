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

import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import UserLayout from "../../layouts/UserLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
  const [searchBarOption, setSearchBarOption] = useState<string>("Category");
  const router = useRouter();
  // const { data: session, status } = useSession();

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

      <div></div>

      <Card>
        <CardContent> {children}</CardContent>
      </Card>

      {/* <footer className={styles.footer}>
        <hr />
        <Link href="/">About Jobeet</Link> |{" "}
        <Link href="/about">Full RSS Feed</Link> |{" "}
        
      </footer> */}
    </div>
  );
};

export default AdminLayout;
