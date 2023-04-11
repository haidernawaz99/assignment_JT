import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {  Row } from "antd";
import DetailSection from "./DetailSection";
import DetailHeader from "./DetailHeader";
import EditButton from "./EditButton";
import { Job } from "../../interfaces/job";

type Props = {
  job: Job;
  isAdmin?: boolean;
};

const JobDetail = ({ job, isAdmin = false }: Props) => {
  return (
    <>
      <EditButton job={job} isAdmin={isAdmin} />
      <Card
        sx={{
          maxWidth: 1100,
        }}
      >
        <CardContent>
          <Row>
            <DetailHeader job={job} />

            <DetailSection job={job} />
          </Row>
        </CardContent>
      </Card>
    </>
  );
};

export default JobDetail;
