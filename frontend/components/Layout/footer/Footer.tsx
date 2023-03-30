import { Col, Layout, Row } from "antd";
import Link from "next/link";
import styles from "./Footer.module.css";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className={styles.footerMainDiv}>
      <Row justify={"center"} align={"middle"}>
        <Col className={styles.copyrightDiv} xs={24}>
          Copyright © 2023 Jobeet - Jobs in Pakistan - All Rights Reserved.
        </Col>
        <Col className={styles.copyrightDiv}>
          <Link className={styles.links} href="/">
            About Jobeet
          </Link>{" "}
          |{" "}
          <Link className={styles.links} href="/about">
            Full RSS Feed
          </Link>{" "}
          |{" "}
          <Link className={styles.links} href="/affiliate/apply">
            Affiliates
          </Link>{" "}
          |{" "}
          <Link className={styles.links} href="/admin">
            Admin
          </Link>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
