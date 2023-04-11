import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {
  Divider,
  Typography,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { Layout, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Domain from "mdi-material-ui/Domain";
import MapMarkerRadiusOutline from "mdi-material-ui/MapMarkerRadiusOutline";
import CalendarPlus from "mdi-material-ui/CalendarPlus";
import CalendarAlert from "mdi-material-ui/CalendarAlert";
import ShapeOutline from "mdi-material-ui/ShapeOutline";
import StoreClockOutline from "mdi-material-ui/StoreClockOutline";
import Router from "next/router";
import { getRelativeTime } from "../../utils/getRelativeTime";
import JobTabs from "./JobTab";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

type Props = {
  job: {
    company: string;
    position: string;
    location: string;
    jobDescription: string;
    howToApply: string;
    public: boolean;
    email: string;
    type: "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";
    category: string;
    createdAt: Date;
    logo: string;
    editToken: string;
    expiresAt: Date;
  };
  isAdmin?: boolean;
};

const JobDetail = ({ job, isAdmin = false }: Props) => {
  return (
    <>
      {/* <MuiTypography variant="body2">Manage Jobs here.</MuiTypography> */}

      {isAdmin && (
        <Row justify={"end"}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => {
                Router.push(`/admin/manage/job/edit/${job.editToken}`);
              }}
            >
              Edit this Job
            </Button>
          </Col>
        </Row>
      )}
      <Card
        sx={{
          maxWidth: 1100,
          margin: "auto",
        }}
      >
        <CardContent>
          <Row>
            <br />

            <Col>
              <img
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "20%",
                  marginTop: 6,
                }}
                width={100}
                src={
                  job.logo
                    ? "http://localhost:3000/" + job.logo
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                }
                alt="company logo"
              />
            </Col>

            <Col xs={17} sm={18} md={19} lg={20} style={{ marginLeft: 20 }}>
              <Title level={3}>{job.position}</Title>
              <Row style={{ marginTop: "-1vh" }}>
                <Domain style={{ color: "gray" }} />
                <Paragraph style={{ marginLeft: 15 }}>{job.company}</Paragraph>
              </Row>
              <Row style={{ marginTop: "-1vh" }}>
                <MapMarkerRadiusOutline style={{ color: "gray" }} />
                <Paragraph style={{ marginLeft: 15 }}>{job.location}</Paragraph>
              </Row>
            </Col>

            <Row
              style={{ marginLeft: 120, width: "100%" }}
              justify={"space-between"}
            >
              <Col xs={10} md={6}>
                <StoreClockOutline
                  style={{ color: "gray", marginInlineEnd: 10 }}
                />
                <Paragraph style={{ fontSize: 12, marginTop: 2 }}>
                  {job.type}
                </Paragraph>
              </Col>
              {/* <hr
                style={{
                  marginBottom: 4,
                }}
              /> */}
              <Col xs={10} md={6}>
                <ShapeOutline style={{ color: "gray", marginInlineEnd: 10 }} />
                <Paragraph style={{ fontSize: 12, marginTop: 2 }}>
                  {job.category}
                </Paragraph>
              </Col>
              <Col xs={10} md={6}>
                <CalendarPlus style={{ color: "gray", marginInlineEnd: 10 }} />
                <Paragraph style={{ fontSize: 12, marginTop: 2 }}>
                  Posted {getRelativeTime(new Date(job.createdAt).getTime())}
                </Paragraph>
              </Col>
              <Col xs={10} md={6}>
                <CalendarAlert style={{ color: "gray", marginInlineEnd: 10 }} />
                <Paragraph style={{ fontSize: 12, marginTop: 2 }}>
                  Expires {getRelativeTime(new Date(job.expiresAt).getTime())}
                </Paragraph>
              </Col>

              <JobTabs
                jobDescription={job.jobDescription}
                howToApply={job.howToApply}
                aboutUs={job.email}
              />
            </Row>
          </Row>
        </CardContent>
      </Card>
    </>
  );
};

export default JobDetail;
