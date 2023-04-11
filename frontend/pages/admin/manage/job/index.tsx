import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch } from "antd";

import Router from "next/router";
import { useState } from "react";

import AllJobsWithPagination from "../../../../components/admin/AllJobsWithPagination";
import { SearchBarQuery } from "../../../../interfaces/searchBarQuery";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ManageJobs = () => {
  const [searchBar, setSearchBar] = useState<SearchBarQuery>({
    text: "",
    option: "Position" as "Position" | "Company" | "Location" | "Category",
  });

  return (
    <Card>
      <CardContent>
        <Grid item xs={12}>
          <Typography variant="h5">
            <Link>Jobs</Link>
          </Typography>
          <Typography variant="body2">Manage Jobs here.</Typography>
        </Grid>
        <Row justify={"end"}>
          <Col>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                Router.push(`/admin/manage/job/add`);
              }}
            >
              Post a Job
            </Button>
          </Col>
        </Row>

        <AllJobsWithPagination searchBar={searchBar} />
      </CardContent>
    </Card>
  );
};

export default ManageJobs;
