import CalendarPlus from "mdi-material-ui/CalendarPlus";
import CalendarAlert from "mdi-material-ui/CalendarAlert";
import ShapeOutline from "mdi-material-ui/ShapeOutline";
import StoreClockOutline from "mdi-material-ui/StoreClockOutline";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import ShareIcon from "mdi-material-ui/Share";
import CardActions from "@mui/material/CardActions";
import { Col, Row, Typography } from "antd";
import { getRelativeTime } from "../../utils/getRelativeTime";
import JobTabs from "./JobTab";
import { Job } from "../../interfaces/job";

const { Title, Paragraph, Text } = Typography;

type Props = {
  job: Job;
  isAdmin?: boolean;
};

const DetailSection = ({ job }: Props) => {
  return (
    <Row style={{ marginLeft: 120, width: "100%" }} justify={"space-between"}>
      <Col xs={10} md={6}>
        <StoreClockOutline style={{ color: "gray", marginInlineEnd: 10 }} />
        <Paragraph style={{ fontSize: 12, marginTop: 2 }}>{job.type}</Paragraph>
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
  );
};
export default DetailSection;
